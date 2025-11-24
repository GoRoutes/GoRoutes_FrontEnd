import { defineStore } from 'pinia'
import { GoRoutesService } from '@/services'
import { reactive, ref } from 'vue'
import { useAuthStore } from '../auth/auth'
import { showErrorToast, showSuccessToast } from '@/utils/toast'
import router from '@/router'
import { useStorage } from '@vueuse/core'

export const useGoRoutesStore = defineStore('goroutes', () => {
  const state = reactive({
    routes: [],
    selectedRoute: null,
    retrieveRoute: null,
    selectedRouteToInit: null,
    activeRoutes: [],
    transiDrivers: [],
    selectedDriverToTrack: null,
    myActiveRoute: null,
    myDriverRoutes: [],
    loading: false,
    error: null,
    myPassengerOpenedRoute: null,
    myDailyRouteDriver: null,
    // Estado de navegação persistente com localStorage
    isNavigating: useStorage('driver-navigation-mode', false)
  })

  const state_create = reactive({
    daily_route: {
      original: ref(true),
      passenger_list: [],
      date: '2024-02-02',
      route: null,
    },

    create_route: {
      name: '',
      origin: '',
      destination: '',
      distance: 0,
      init_hour: null,
      end_hour: null,
      passengers_list: [],
      auto_recalculate: true,
      vehicle: null,
      driver: null,
    },
  })

  const authStore = useAuthStore()

  const getRoutes = async () => {
    state.loading = true
    try {
      const response = await GoRoutesService.getRoutes()
      state.routes = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const getRoute = async (id) => {
    state.loading = true
    try {
      const response = await GoRoutesService.getRoute(id)
      state.retrieveRoute = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const getActiveRoutes = async () => {
    state.loading = true
    try {
      if (authStore.state.user.driver_data) {
        const response = await GoRoutesService.getActiveRoutes()
        state.activeRoutes = response

        let allRoutes = []

        for (const route of state.activeRoutes) {
          allRoutes.push({
            route_id: route.id,
            driver_name: route.driver.user.name,
            driver_id: route.driver.id,
            email: route.driver.user.email,
            icon_driver: route.driver.user.picture?.file,
            my_location: route.driver.user.my_location,
            vehicle: route.vehicle.id,
            route_name: route.name,
          })
        }

        state.transiDrivers = allRoutes
      } else {
        return null
      }
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const getRouteById = async (id) => {
    state.loading = true
    try {
      const response = await GoRoutesService.getRouteById(id)
      state.selectedRoute = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const getRouteByIdToInit = async (id) => {
    state.loading = true
    try {
      const response = await GoRoutesService.getRouteByIdToInit(id)
      state.selectedRouteToInit = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const getRouteByDriverId = async () => {
    state.loading = true
    try {
      const response = await GoRoutesService.getRouteByDriverId(3)
      state.myActiveRoute = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const filterMyDriverRoutes = async () => {
    state.loading = true
    try {
      const response = await GoRoutesService.filterMyDriverRoutes(authStore.state.user?.driver_data?.id)
      state.myDriverRoutes = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const setDailyRouteOriginal = (value) => {
    state_create.daily_route.original = value
    console.log(state_create.daily_route)
  }

  const takeMyDailyRoute = async () => {
    try {
      const response = await GoRoutesService.takeMyDailyRoute(authStore.state.user?.driver_data?.id)
      state.myDailyRouteDriver = response.data?.active_route
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const markPresenceOrAbsence = async (data) => {
    try {
      const response = GoRoutesService.markPresenceOrAbsence(data)
      return response
    } catch (error) {
      console.error(error)
    }
  }

  const refreshDailyRouteById = async (id) => {
    try {
      const response = await GoRoutesService.refreshDailyRouteById(id)
      state.myDailyRouteDriver = response.data
      return response
    } catch (error) {
      console.log(error)
    } finally {
      window.location.reload()
    }
  }

  const createRoute = async (data) => {
    state_create.create_route.vehicle = data.vehicle.id
    try {
      // Validação de horários
      if (data.init_hour && data.end_hour && data.init_hour > data.end_hour) {
        showErrorToast('Horário de início não pode ser depois do horário de fim')
        return false
      }

      if (data.passengers_list.length > data.vehicle.seats) {
        showErrorToast(`O número de passageiros excede o número de lugares do veículo`)
        return false
      } else {
        const response = await GoRoutesService.createRoute(data)
        showSuccessToast(`${response.data.name} criada com sucesso`)
        return response
      }
    } catch (error) {
      console.log(error)
      showErrorToast('Erro ao criar rota')
      return false
    }
  }

  const deleteRoute = async (id) => {
    try {
      const response = await GoRoutesService.deleteRoute(id)
      router.push(`/default/admin/routes/list`)
      showSuccessToast(`Rota deletada com Sucesso`)
      return response
    } catch (error) {
      console.error(error)
    }
  }

  const filterMyOpenedPassengerRoute = async (id) => {
    try {
      const response = await GoRoutesService.filterMyOpenedPassengerRoute(id)

      if (response.data.has_route) {
        state.myPassengerOpenedRoute = response.data.route
        return true
      } else {
        return false
      }

    } catch (error) {
      console.error(error)
    }
  }

  const createDailyRoute = async (data) => {
    try {
      const response = await GoRoutesService.createDailyRoute(data)
      showSuccessToast(`Rota do dia criada com sucesso!`)
      return response
    } catch (error) {
      console.error(error)
    }
  }

  // ========== FUNÇÕES DE NAVEGAÇÃO ==========
  
  /**
   * Alterna o modo de navegação
   */
  const toggleNavigationMode = () => {
    state.isNavigating = !state.isNavigating
    console.log('🧭 Modo navegação alterado:', state.isNavigating)
  }

  /**
   * Define o modo de navegação
   * @param {boolean} value - true para ativar, false para desativar
   */
  const setNavigationMode = (value) => {
    state.isNavigating = value
    console.log('🧭 Modo navegação definido:', state.isNavigating)
  }

  /**
   * Obtém o status atual de navegação
   * @returns {boolean}
   */
  const getNavigationMode = () => {
    return state.isNavigating
  }

  /**
   * Reseta o modo de navegação (útil ao finalizar a rota)
   */
  const resetNavigationMode = () => {
    state.isNavigating = false
    console.log('🛑 Modo navegação resetado')
  }

  return {
    state,
    state_create,
    getRoutes,
    getActiveRoutes,
    getRouteById,
    getRouteByDriverId,
    filterMyDriverRoutes,
    getRouteByIdToInit,
    setDailyRouteOriginal,
    takeMyDailyRoute,
    markPresenceOrAbsence,
    refreshDailyRouteById,
    getRoute,
    createRoute,
    deleteRoute,
    filterMyOpenedPassengerRoute,
    createDailyRoute,
    // Funções de navegação
    toggleNavigationMode,
    setNavigationMode,
    getNavigationMode,
    resetNavigationMode
  }
})