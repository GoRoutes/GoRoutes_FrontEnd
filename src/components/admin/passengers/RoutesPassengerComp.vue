<script setup>
import { computed, onMounted, ref, onUnmounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import Map from "vue-material-design-icons/Map.vue"
import MapMarkerCheck from "vue-material-design-icons/MapMarkerCheck.vue"
import MapMarkerRemoveVariant from "vue-material-design-icons/MapMarkerRemoveVariant.vue"
import Car from "vue-material-design-icons/Car.vue"
import AccountGroup from "vue-material-design-icons/AccountGroup.vue"
import MapMarkerDistance from "vue-material-design-icons/MapMarkerDistance.vue"
import Navigation from "vue-material-design-icons/Navigation.vue"
import MapMarker from "vue-material-design-icons/MapMarker.vue"
import AlertCircle from "vue-material-design-icons/AlertCircle.vue"
import { useGoRoutesStore } from "@/stores"

const goRoutesStore = useGoRoutesStore()
const route = useRoute()
const router = useRouter()

const passengerId = computed(() => parseInt(route.params.id))

onMounted(async () => {
    window.addEventListener('resize', handleResize)
    await goRoutesStore.filterMyDriverRoutes()
})

const routesWithPassenger = computed(() =>
    goRoutesStore.state.myDriverRoutes
        .filter(route => 
            route.passengers.some(passenger => passenger.user.id === passengerId.value)
        )
        .map(route => ({
            ...route,
            status: route.is_active ? "active" : "inactive",
            distanceKm: (route.distance / 1000).toFixed(1) + " km",
            passengers: route.passengers,
            passengersCount: route.passengers.length,
            vehicleModel: route.vehicle?.model || "Sem veículo",
            // Informação específica do passageiro nesta rota
            passengerInfo: route.passengers.find(p => p.user.id === passengerId.value)
        }))
)

const hasPassengerInRoutes = computed(() => routesWithPassenger.value.length > 0)

const allRoutes = computed(() =>
    goRoutesStore.state.myDriverRoutes.map(route => ({
        ...route,
        status: route.is_active ? "active" : "inactive",
        distanceKm: (route.distance / 1000).toFixed(1) + " km",
        passengers: route.passengers,
        passengersCount: route.passengers.length,
        vehicleModel: route.vehicle?.model || "Sem veículo"
    }))
)

const hasRoutes = computed(() => allRoutes.value.length > 0)

const windowWidth = ref(window.innerWidth)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const isMobile = () => windowWidth.value <= 1024
</script>

<template>
    <div class="routes-container">
        <div class="page-header">
            <div class="header-content">
                <Map :size="32" class="header-icon" />
                <h2 class="page-title">Rotas do Passageiro #{{ passengerId }}</h2>
            </div>
            <div class="header-stats">
                <div class="stat-item">
                    <span class="stat-number">{{ routesWithPassenger.length }}</span>
                    <span class="stat-label">Rotas com Passageiro</span>
                </div>
            </div>
        </div>

        <div v-if="hasRoutes && !hasPassengerInRoutes" class="no-passenger-routes-container">
            <div class="no-passenger-routes-content">
                <h3 class="no-passenger-routes-title">Passageiro não encontrado</h3>
                <p class="no-passenger-routes-message">
                    O passageiro #{{ passengerId }} não está em nenhuma das rotas cadastradas.
                    <v-btn @click="router.push('/default/admin/routes/create')">Criar Rota</v-btn>
                </p>
            </div>
        </div>

        <div v-else-if="!hasRoutes" class="no-routes-container">
            <div class="no-routes-content">
                <AlertCircle :size="64" class="no-routes-icon" />
                <h3 class="no-routes-title">Nenhuma rota cadastrada</h3>
                <p class="no-routes-message">
                    Você ainda não possui rotas cadastradas. 
                    Entre em contato com a administração para criar suas rotas.
                </p>
            </div>
        </div>

        <div v-else class="routes-grid">
            <v-card v-for="route in routesWithPassenger" :key="route.id" class="route-card" elevation="2"
                :class="{ 'inactive-route': route.status === 'inactive', 'has-passenger': true }">
                
                <v-card-title class="card-header">
                    <div class="route-status">
                        <MapMarkerCheck v-if="route.status === 'active'" :size="24" class="status-icon active" />
                        <MapMarkerRemoveVariant v-else :size="24" class="status-icon inactive" />
                    </div>
                    <div class="route-name">
                        <h3>{{ route.name }}</h3>
                        <div v-if="route.passengerInfo" class="passenger-order">
                            Ordem de coleta: {{ route.passengerInfo.order }}
                        </div>
                    </div>
                </v-card-title>

                <v-card-text class="card-content">
                    <div class="route-details-grid">
                        <div class="detail-item">
                            <Navigation :size="20" class="detail-icon" />
                            <div class="detail-content">
                                <div class="detail-label">Origem</div>
                                <div class="detail-value">{{ route.origin }}</div>
                            </div>
                        </div>

                        <div class="detail-item">
                            <MapMarker :size="20" class="detail-icon" />
                            <div class="detail-content">
                                <div class="detail-label">Destino</div>
                                <div class="detail-value">{{ route.destination }}</div>
                            </div>
                        </div>

                        <div class="detail-item">
                            <MapMarkerDistance :size="20" class="detail-icon" />
                            <div class="detail-content">
                                <div class="detail-label">Distância</div>
                                <div class="detail-value">{{ route.distanceKm }}</div>
                            </div>
                        </div>

                        <div class="detail-item">
                            <AccountGroup :size="20" class="detail-icon" />
                            <div class="detail-content">
                                <div class="detail-label">Passageiros</div>
                                <div class="detail-value">{{ route.passengersCount }}</div>
                            </div>
                        </div>

                        <div class="detail-item">
                            <Car :size="20" class="detail-icon" />
                            <div class="detail-content">
                                <div class="detail-label">Veículo</div>
                                <div class="detail-value">{{ route.vehicleModel }}</div>
                            </div>
                        </div>

                        <div class="detail-item">
                            <div class="detail-content">
                                <div class="detail-label">Status Passageiro</div>
                                <div class="detail-value passenger-status">Presente</div>
                            </div>
                        </div>
                    </div>
                </v-card-text>

                <v-card-actions class="card-actions">
                    <v-btn variant="elevated" color="primary" size="small" rounded="xs" prepend-icon="mdi-map-marker"
                        class="solid-btn" :width="isMobile() ? '100%' : 'auto'">
                        Editar
                    </v-btn>
                    <v-btn variant="elevated" color="primary" size="small" rounded="xs"
                        prepend-icon="mdi-map-marker-check" class="solid-btn" :width="isMobile() ? '100%' : 'auto'">
                        Ver Detalhes
                    </v-btn>
                    <v-spacer />
                  
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<style scoped>
.routes-container {
    padding-top: 1rem;
    padding-bottom: 1rem;
    width: 100%;
    margin: 0 auto;
}

.solid-btn {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    border-bottom: 3px solid rgb(var(--v-theme-primary));
}

span {
    display: flex;
    align-items: center;
    justify-content: center;
}

.header-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.header-icon {
    color: rgb(var(--v-theme-primary));
}

.page-title {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 600;
    color: rgb(var(--v-theme-on-background));
}

.header-stats {
    display: flex;
    gap: 2rem;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.stat-number {
    font-size: 1.5rem;
    font-weight: 700;
    color: rgb(var(--v-theme-primary));
}

.stat-label {
    font-size: 0.875rem;
    color: black;
    margin-top: 0.25rem;
}

/* Estilos para o estado sem rotas */
.no-routes-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    padding: 2rem;
}

.no-routes-content {
    text-align: center;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.no-routes-icon {
    color: rgb(var(--v-theme-warning));
    opacity: 0.7;
}

.no-routes-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: rgb(var(--v-theme-on-surface));
}

.no-routes-message {
    margin: 0;
    font-size: 1rem;
    color:  #c3c3c3;
    line-height: 1.5;
}

.routes-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.route-card {
    transition: all 0.3s ease;
    border-radius: 12px !important;
}

.route-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.inactive-route {
    opacity: 0.8;
}

.card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.25rem 0.75rem 1.25rem !important;
}

.route-status {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgba(var(--v-theme-surface-variant), 0.3);
}

.status-icon.active {
    color: rgb(var(--v-theme-success));
}

.status-icon.inactive {
    color: rgb(var(--v-theme-warning));
}

.route-name {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.route-name h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: rgb(var(--v-theme-on-surface));
}

.card-content {
    padding: 0.75rem 1.25rem !important;
}

.route-details-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem 1.5rem;
    margin-top: 0.5rem;
}

.detail-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
}

.detail-icon {
    color: rgb(var(--v-theme-primary));
    flex-shrink: 0;
}

.detail-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    min-width: 0;
}

.detail-label {
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.card-actions {
    padding: 0.75rem 1.25rem 1.25rem 1.25rem !important;
}

@media screen and (max-width:1024px) {
    .routes-container {
        width: 90%;
        padding: 0;
    }

    .route-details-grid {
        display: flex;
        flex-direction: column;
    }

    .card-actions {
        flex-direction: column;
        gap: 0.5rem;
        padding: 0;
        align-items: flex-start;
    }

    .no-routes-container {
        min-height: 300px;
        padding: 1rem;
    }

    .no-routes-title {
        font-size: 1.25rem;
    }

    .no-routes-message {
        font-size: 0.9rem;
    }
}
</style>