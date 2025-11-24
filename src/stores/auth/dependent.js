import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { AuthService } from '@/services'
import { useAuthStore } from '@/stores/auth/auth'
import { useAddressStore } from '@/stores/address'

export const useDependentStore = defineStore('Dependent', () => {
  const authStore = useAuthStore()
  const addressStore = useAddressStore()
  const state = reactive({
    cpf: '',
    is_student: true,
    user: {
      username: '',
      name: '',
      email: '',
      password: '',
      telephone: '',
      data_of_birth: '',
    },
    addresses: [
      {
        street: addressStore.state.logradouro,
        city: addressStore.state.localidade,
        state: addressStore.state.uf,
        neighborhood: addressStore.state.bairro,
        number: addressStore.state.number,
        cep: addressStore.state.cep,
        is_main: true,
      },
    ],
    student_data: {
      grade: '',
      registration: '',
      responsible: null,
    },
    dependentsByResponsibleId : [],
  selectedDependentToTrack:  authStore.state.user?.responsible_data?.id || null,
  })

  const registerDependent = async (data) => {
    try {
      const response = await AuthService.registerPassenger(data)
      return response
    } catch (error) {
      return error
    }
  }
  const responsibleByStudentFilter = async (id) => {
    try {
      const response = await AuthService.responsibleByStudentFilter(id)
      state.dependentsByResponsibleId = response.data
      return response
    } catch (error) {
      console.error(error)
      return error
    }
  }

  return {
    state,
    registerDependent,
    responsibleByStudentFilter,
  }
})
