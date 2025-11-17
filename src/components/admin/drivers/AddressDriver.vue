<script setup>
import { ref, computed } from 'vue'
import { useDriversStore} from '@/stores'
import MapMarker from 'vue-material-design-icons/MapMarker.vue'
import Home from 'vue-material-design-icons/Home.vue'

const driversStore = useDriversStore()
const currentAddressIndex = ref(0)

const driverAddress = computed(() => {
  return driversStore.state.selectedDriver.driver_data.adresses || []
})

const currentAddress = computed(() => {
  return driverAddress.value[currentAddressIndex.value] || {}
})

function nextAddress() {
  if (currentAddressIndex.value < driverAddress.value.length - 1) {
    currentAddressIndex.value++
  }
}

function prevAddress() {
  if (currentAddressIndex.value > 0) {
    currentAddressIndex.value--
  }
}
</script>

<template>
  <section>
    <div class="addresses-container">
      <div v-if="driverAddress.length === 0" class="no-addresses-container">
        <div class="no-addresses-content">
          <MapMarker :size="64" class="no-addresses-icon" />
          <h3 class="no-addresses-title">Nenhum endereço cadastrado</h3>
          <p class="no-addresses-message">
            Você ainda não possui endereços cadastrados.
            Entre em contato com a administração para adicionar seus endereços.
          </p>
        </div>
      </div>

      <!-- Carrossel de endereços -->
      <div v-else class="address-carousel">
        <v-card class="address-card" elevation="2">
          <v-card-title class="card-header">
            <div class="address-status">
              <Home v-if="currentAddress.is_main" :size="24" class="status-icon main" />
              <MapMarker v-else :size="24" class="status-icon secondary" />
            </div>
            <div class="address-title">
              <h3>{{ currentAddress.is_main ? 'Endereço Principal' : 'Endereço' }}</h3>
            </div>
          </v-card-title>

          <v-card-text class="card-content">
            <div class="address-details-grid">
              <!-- Linha 1 -->
              <div class="detail-item">
                <div class="detail-content">
                  <div class="detail-label">Rua</div>
                  <div class="detail-value">{{ currentAddress.street || 'Não informado' }}</div>
                </div>
              </div>

              <div class="detail-item">
                <div class="detail-content">
                  <div class="detail-label">Número</div>
                  <div class="detail-value">{{ currentAddress.number || 'Não informado' }}</div>
                </div>
              </div>

              <div class="detail-item">
                <div class="detail-content">
                  <div class="detail-label">Bairro</div>
                  <div class="detail-value">{{ currentAddress.neighborhood || 'Não informado' }}</div>
                </div>
              </div>

              <!-- Linha 2 -->
              <div class="detail-item">
                <div class="detail-content">
                  <div class="detail-label">Complemento</div>
                  <div class="detail-value">{{ currentAddress.complement || 'Não informado' }}</div>
                </div>
              </div>

              <div class="detail-item">
                <div class="detail-content">
                  <div class="detail-label">Cidade</div>
                  <div class="detail-value">{{ currentAddress.city || 'Não informado' }}</div>
                </div>
              </div>

              <div class="detail-item">
                <div class="detail-content">
                  <div class="detail-label">Estado</div>
                  <div class="detail-value">{{ currentAddress.state || 'Não informado' }}</div>
                </div>
              </div>

              <!-- Linha 3 -->
              <div class="detail-item full-width">
                <div class="detail-content">
                  <div class="detail-label">CEP</div>
                  <div class="detail-value cep">{{ currentAddress.cep || 'Não informado' }}</div>
                </div>
              </div>
            </div>
          </v-card-text>

          <v-card-actions class="card-actions">
            <v-btn 
              @click="prevAddress" 
              variant="outlined" 
              color="primary" 
              :disabled="currentAddressIndex === 0"
              prepend-icon="mdi-chevron-left"
            >
              Anterior
            </v-btn>
            
            <v-spacer />
            
            <v-btn 
              @click="nextAddress" 
              variant="outlined" 
              color="primary" 
              :disabled="currentAddressIndex === driverAddress.length - 1"
              append-icon="mdi-chevron-right"
            >
              Próximo
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.addresses-container {
    padding: 1rem 0;
  width: 100%;
  margin: 0 auto;
}

.no-addresses-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  padding: 2rem;
}

.no-addresses-content {
  text-align: center;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.no-addresses-icon {
  color: rgb(var(--v-theme-warning));
  opacity: 0.7;
}

.no-addresses-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

.no-addresses-message {
  margin: 0;
  font-size: 1rem;
  color: rgb(var(--v-theme-on-surface-variant));
  line-height: 1.5;
}

.address-carousel {
  width: 100%;
  margin: 0 auto;
}

.address-card {
  transition: all 0.3s ease;
  border-radius: 12px !important;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.25rem 0.75rem 1.25rem !important;
}

.address-status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(var(--v-theme-surface-variant), 0.3);
}

.status-icon.main {
  color: rgb(var(--v-theme-primary));
}

.status-icon.secondary {
  color: rgb(var(--v-theme-secondary));
}

.address-title {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.address-title h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

.address-counter {
  font-size: 0.875rem;
  color: rgb(var(--v-theme-on-surface-variant));
}

.card-content {
  padding: 1rem 1.25rem !important;
}

.address-details-grid {
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

.detail-item.full-width {
  grid-column: span 3;
}

.detail-icon {
  color: rgb(var(--v-theme-primary));
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.detail-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  min-width: 0;
  flex: 1;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: black;
}

.detail-value {
  font-size: 1rem;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.4;
}

.cep {
  font-family: monospace;
  font-size: 1.1rem;
  font-weight: 600;
}

.card-actions {
  padding: 1rem 1.25rem 1.25rem 1.25rem !important;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

span{
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-width: 1024px) {
  .address-details-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .detail-item.full-width {
    grid-column: span 2;
  }

  .card-actions {
    flex-direction: column;
  }

  .no-addresses-container {
    min-height: 250px;
    padding: 1rem;
  }

  .no-addresses-title {
    font-size: 1.25rem;
  }

  .no-addresses-message {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .address-carousel {
    max-width: 100%;
  }
  
  .address-details-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .detail-item.full-width {
    grid-column: span 1;
  }

  .detail-item {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .detail-icon {
    align-self: flex-start;
  }
}
</style>