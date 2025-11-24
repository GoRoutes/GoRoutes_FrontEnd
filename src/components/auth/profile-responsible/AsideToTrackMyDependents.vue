<script setup>
import { useDependentStore } from '@/stores';
import { computed, onMounted, ref } from 'vue';

const dependentStore = useDependentStore();
const searchQuery = ref('');

const selectedDependent = computed(() => dependentStore.state.selectedDependentToTrack);

// Computed para filtrar dependentes baseado na pesquisa
const filteredDependents = computed(() => {
  if (!searchQuery.value) {
    return dependentStore.state.dependentsByResponsibleId;
  }
  
  const query = searchQuery.value.toLowerCase();
  return dependentStore.state.dependentsByResponsibleId.filter(dependent => 
    dependent.name.toLowerCase().includes(query) ||
    dependent.email.toLowerCase().includes(query) ||
    dependent.passenger_data?.student_data?.grade?.toLowerCase().includes(query) ||
    dependent.telephone?.includes(query)
  );
});

// Carregar dependentes ao montar
onMounted(async () => {
  try {
    const responsibleId = 1; // Substitua pelo ID real
    await dependentStore.responsibleByStudentFilter(responsibleId);
  } catch (error) {
    console.error('Erro ao carregar dependentes:', error);
  }
});

const selectDependentFromAside = (dependent) => {
  console.log('[Aside] click dependent:', dependent);
  const markerLike = {
    position: {
      lat: parseFloat(dependent?.my_location?.latitude) || -26.2743225,
      lng: parseFloat(dependent?.my_location?.longitude) || -48.8215154,
    },
    dependentName: dependent.name,
    email: dependent.email,
    id_dependent: dependent.id,
    telephone: dependent.telephone,
    grade: dependent.passenger_data?.student_data?.grade || 'N/A',
    registration: dependent.passenger_data?.student_data?.registration || 'N/A',
    cpf: dependent.passenger_data?.cpf || 'N/A',
    icon: dependent.picture_file
      ? { 
          url: dependent.picture_file, 
          scaledSize: { width: 50, height: 50 }, 
          anchor: { x: 25, y: 25 } 
        }
      : undefined,
  };
  console.log('[Aside] setting selectedDependentToTrack:', markerLike);
  dependentStore.state.selectedDependentToTrack = markerLike;
};

// Limpar pesquisa
const clearSearch = () => {
  searchQuery.value = '';
};
</script>

<template>
  <aside class="vehicle-sidebar">
    <h2 class="header">Rastreamento dos Dependentes</h2>

    <div class="search-section">
      <v-text-field
        v-model="searchQuery"
        density="compact"
        variant="outlined"
        placeholder="Pesquisar dependentes..."
        prepend-inner-icon="mdi-magnify"
        clearable
        hide-details
        @click:clear="clearSearch"
        class="search-input"
      />
    </div>

    <div v-if="selectedDependent" class="selected-driver">
      <div class="driver-header">
        <div class="driver-icon">
          <img v-if="selectedDependent.icon?.url" :src="selectedDependent.icon.url" alt="Dependent Icon" />
          <div v-else class="avatar-placeholder">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4
                1.79-4 4 1.79 4 4 4zm0 2c-2.67
                0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
        <div class="driver-info">
          <h2>{{ selectedDependent.dependentName }}</h2>
          <p class="driver-email">{{ selectedDependent.email }}</p>
        </div>
      </div>

      <div class="driver-details">
        <div class="detail-section">
          <h3>Localização</h3>
          <p class="location">
            Lat: {{ selectedDependent.position.lat }},
            Lng: {{ selectedDependent.position.lng }}
          </p>
        </div>

        <div class="extra-info">
          <span class="label">Telefone:</span>
          <span class="value">{{ selectedDependent.telephone }}</span>
        </div>
        <div class="extra-info">
          <span class="label">Status:</span>
          <span class="value">Online</span>
        </div>

        <div class="actions">
          <button class="action-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03
                L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1
                20,12A7,7 0 0,1 13,19C11.07,19
                9.32,18.21 8.06,16.94L6.64,18.36
                C8.27,20 10.5,21 13,21A9,9 0 0,0
                22,12A9,9 0 0,0 13,3Z" />
            </svg>
            Perfil
          </button>
  
          <button class="action-btn">
            📍 Rota
          </button>
        </div>
      </div>
    </div>
    <div v-else class="no-driver">
      <v-icon size="28" color="grey">mdi-alert-circle-outline</v-icon>
      <span class="no-driver-text">Nenhum dependente selecionado</span>
    </div>

    <!-- Lista de Dependentes -->
    <div class="drivers-section">
      <div class="section-header">
        <h3>Meus Dependentes</h3>
        <span class="counter" v-if="filteredDependents.length > 0">
          {{ filteredDependents.length }} de {{ dependentStore.state.dependentsByResponsibleId.length }}
        </span>
      </div>

      <div v-if="filteredDependents.length === 0 && searchQuery" class="no-results">
        <v-icon size="24" color="grey">mdi-magnify</v-icon>
        <p>Nenhum dependente encontrado</p>
        <span class="hint">Tente buscar por nome, email ou série</span>
      </div>

      <ul class="drivers-list">
        <li 
          v-for="dependent in filteredDependents" 
          :key="dependent.id" 
          class="driver-item"
          :class="{ 'active': selectedDependent?.id_dependent === dependent.id }"
          @click="selectDependentFromAside(dependent)"
        >
          <div class="driver-avatar">
            <img v-if="dependent.picture_file" :src="dependent.picture_file" :alt="dependent.name" />
            <div v-else class="avatar-placeholder">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4
                  1.79-4 4 1.79 4 4 4zm0 2c-2.67
                  0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
          <div class="driver-info">
            <span class="driver-name">{{ dependent.name }}</span>
            <span class="driver-status">{{ dependent.passenger_data?.student_data?.grade || 'Estudante' }}</span>
          </div>
          <div class="driver-badge" v-if="selectedDependent?.id_dependent === dependent.id">
            <v-icon size="16" color="white">mdi-check</v-icon>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.vehicle-sidebar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  border-radius: 12px;
  overflow: hidden;
}

/* Seção de pesquisa */
.search-section {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  background: white;
}

.search-input {
  background: white;
}

.search-input :deep(.v-field) {
  border-radius: 8px;
  background: #f8fafc;
}

.search-input :deep(.v-field__outline) {
  border-color: #d1d5db !important;
}

.search-input :deep(.v-field--focused .v-field__outline) {
  border-color: #3b82f6 !important;
}

.selected-driver {
  background: white;
  border-radius: 12px;
  margin: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.driver-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.driver-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.driver-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  color: #9ca3af;
}

.avatar-placeholder svg {
  width: 24px;
  height: 24px;
}

.driver-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.driver-info h2 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.driver-email {
  font-size: 14px;
  opacity: 0.8;
  margin: 0;
}

.driver-details {
  padding: 16px;
}

.detail-section h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.location {
  color: #6b7280;
  font-size: 13px;
  margin: 0 0 12px 0;
}

.extra-info {
  font-size: 13px;
  margin-bottom: 4px;
  display: flex;
  gap: 6px;
}

.label {
  font-size: 11px;
  color: #9ca3af;
  text-transform: uppercase;
}

.value {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.action-btn {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background 0.2s;
}

.action-btn:hover {
  background: #e5e7eb;
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

/* Lista de dependentes */
.drivers-section {
  flex: 1;
  margin: 0 16px 16px 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 12px 0;
}

.section-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
}

.counter {
  font-size: 12px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 4px 8px;
  border-radius: 12px;
}

.drivers-list {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.driver-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.driver-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.driver-item.active {
  border: 2px solid #3b82f6;
  background: #f0f9ff;
}

.driver-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.driver-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.driver-info {
  flex: 1;
  min-width: 0;
}

.driver-name {
  font-weight: 500;
  color: #374151;
  font-size: 14px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.driver-status {
  font-size: 12px;
  color: #6b7280;
  display: block;
}

.driver-badge {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.driver-badge .v-icon {
  font-size: 12px;
}

.no-driver {
  margin: 16px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  font-style: italic;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.no-driver-text {
  font-size: 14px;
}

.no-results {
  padding: 40px 20px;
  text-align: center;
  color: #6b7280;
  background: white;
  border-radius: 8px;
  margin-bottom: 12px;
}

.no-results p {
  margin: 12px 0 8px 0;
  font-size: 14px;
  font-weight: 500;
}

.no-results .hint {
  font-size: 12px;
  opacity: 0.7;
}

.header {
  font-size: 1.2rem;
  font-weight: 600;
  color: #374151;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

/* Scrollbar styling */
.drivers-list::-webkit-scrollbar {
  width: 6px;
}

.drivers-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.drivers-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.drivers-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>