<template>
  <div v-if="routeData"
       class="bottom-sheet"
       :style="{ height: sheetHeight + 'px' }"
       @touchstart="onTouchStart"
       @touchmove.passive="false"
       @touchmove="onTouchMove"
       @touchend="onTouchEnd">

    <div class="drag-handle"></div>

    <div class="content">
      <div class="route-header">
        <h2 class="route-title">{{ routeData.name }}</h2>
        <div class="route-status" :class="getStatusClass()">{{ getStatusText() }}</div>
      </div>

      <!-- Próximo passageiro -->
      <div v-if="isDriving && getCurrentPassenger()" class="current-passenger-section">
        <div class="current-passenger-header">
          <h3>Próximo Passageiro</h3>
          <div class="passenger-progress">{{ currentPassengerIndex + 1 }} de {{ getUnprocessedPassengers().length }}</div>
        </div>

        <div class="current-passenger-card">
          <div class="passenger-avatar">
            {{ getCurrentPassenger().passenger_name.charAt(0).toUpperCase() }}
          </div>
          <div class="passenger-details">
            <div class="passenger-name">{{ getCurrentPassenger().passenger_name }}</div>
            <div class="passenger-address">
              {{ getCurrentPassenger().address_passenger?.[0]?.address || 'Sem endereço' }}
            </div>
          </div>
        </div>

        <div class="passenger-actions">
          <button class="action-btn missed-btn" @click="markPassengerAsMissed">
            ❌ Faltou
          </button>
          <button class="action-btn picked-btn" @click="markPassengerAsPickedUp">
            ✅ Pego
          </button>
        </div>
      </div>

      <div v-if="isDriving && !getCurrentPassenger()" class="no-passengers-section">
        <div class="no-passengers-card">
          <div class="completion-icon">🎉</div>
          <h3>Rota Concluída!</h3>
          <p>Todos os passageiros foram processados.</p>
        </div>
      </div>

      <div class="driving-toggle-container">
        <div class="driving-toggle-wrapper">
          <span class="toggle-label" :class="{ active: !isDriving }">Parado</span>
          <div class="driving-toggle" :class="{ active: isDriving }" @click="toggleDriving">
            <div class="toggle-slider" :class="{ active: isDriving }"></div>
          </div>
          <span class="toggle-label" :class="{ active: isDriving }">Andando</span>
        </div>
      </div>

      <!-- Informações da rota -->
      <div class="route-info">
        <div class="time-section">
          <div class="time-item">
            <div class="time-label">Saída</div>
            <div class="time-value">{{ routeData.init_hour }}</div>
          </div>
          <div class="time-divider">
            <div class="route-line"></div>
            <div class="route-duration">{{ getDurationText() }}</div>
          </div>
          <div class="time-item">
            <div class="time-label">Chegada</div>
            <div class="time-value">{{ routeData.end_hour }}</div>
          </div>
        </div>

        <div class="location-section">
          <div class="location-item">
            <div class="location-icon origin">📍</div>
            <div class="location-text">
              <div class="location-label">Origem</div>
              <div class="location-address">{{ getShortAddress(routeData.origin) }}</div>
            </div>
          </div>
          <div class="location-item">
            <div class="location-icon destination">🎯</div>
            <div class="location-text">
              <div class="location-label">Destino</div>
              <div class="location-address">{{ getShortAddress(routeData.destination) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de passageiros -->
      <div v-if="sheetHeight === maxHeight" class="passengers-section">
        <div class="passengers-header">
          <h3>Lista de Passageiros</h3>
          <div class="progress-indicator">{{ getPickedUpCount() }} de {{ routeData.presences?.length }} embarcados</div>
        </div>
        <div class="passengers-list">
          <div v-for="(passenger, index) in routeData.presences" :key="passenger.id"
               class="passenger-item"
               :class="{ 'picked-up': passenger.status==='PRESENTE', 'missed': passenger.status==='FALTOU', 'current': isDriving && getCurrentPassenger()?.id===passenger.id }">
            <div class="passenger-checkbox">
              <input type="checkbox" :id="`passenger-${passenger.id}`" :checked="passenger.status==='PRESENTE'" disabled>
              <label :for="`passenger-${passenger.id}`" class="checkbox-custom"></label>
            </div>
            <div class="passenger-info">
              <div class="passenger-name">{{ passenger.passenger_name }}</div>
              <div class="passenger-address">{{ passenger.address_passenger?.[0]?.address || 'Sem endereço' }}</div>
              <div v-if="passenger.status==='FALTOU'" class="passenger-status-badge missed">Faltou</div>
              <div v-if="passenger.status==='PRESENTE'" class="passenger-status-badge picked">Embarcou</div>
            </div>
            <div class="passenger-order">
              #{{ index + 1 }}
              <div v-if="isDriving && getCurrentPassenger()?.id===passenger.id" class="current-indicator">👆 Atual</div>
            </div>
          </div>
        </div>

        <!-- Informações do veículo -->
        <div class="vehicle-section">
          <h4>Informações do Veículo</h4>
          <div class="vehicle-info">
            <div class="vehicle-details">
              <div class="vehicle-model">{{ routeData.vehicle.model }}</div>
              <div class="vehicle-plate">{{ routeData.vehicle.plate }}</div>
              <div class="vehicle-capacity">{{ routeData.vehicle.seats }} assentos</div>
            </div>
            <div class="driver-info">
              <div class="driver-name">{{ routeData.driver.user.name }}</div>
              <div class="driver-contact">{{ routeData.driver.user.telephone }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="loading-msg">Carregando rota...</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useGoRoutesStore } from "@/stores";

const goRoutesStore = useGoRoutesStore();
const routeData = computed(() => goRoutesStore.state.myDailyRouteDriver);

const sheetHeight = ref(400);
const minHeight = 400;
const maxHeight = window.innerHeight * 0.8;
const isDragging = ref(false);
const startY = ref(0);

const isDriving = ref(goRoutesStore.state.isNavigating);
const currentPassengerIndex = ref(0);

const toggleDriving = () => { 
  isDriving.value = goRoutesStore.state.isNavigating; 
  currentPassengerIndex.value = 0;
  goRoutesStore.toggleNavigationMode()
  
  // Emitir evento para o componente do mapa
  window.dispatchEvent(new CustomEvent('navigation-mode-changed', {
    detail: { enabled: isDriving.value }
  }));
}

const onTouchStart = e => { isDragging.value = true; startY.value = e.touches[0].clientY; }
const onTouchMove = e => {
  if (!isDragging.value) return; e.preventDefault();
  const delta = startY.value - e.touches[0].clientY;
  let newHeight = sheetHeight.value + delta;
  if (newHeight < minHeight) newHeight = minHeight;
  if (newHeight > maxHeight) newHeight = maxHeight;
  sheetHeight.value = newHeight;
  startY.value = e.touches[0].clientY;
}
const onTouchEnd = () => { isDragging.value = false; const middle = (minHeight + maxHeight)/2; sheetHeight.value = sheetHeight.value >= middle ? maxHeight : minHeight; }

// Passageiros
const getUnprocessedPassengers = () => routeData.value?.presences?.filter(p=>p.status!=='PRESENTE' && p.status!=='FALTOU')||[];
const getCurrentPassenger = () => getUnprocessedPassengers()[currentPassengerIndex.value] || null;

const markPassengerAsPickedUp = async () => {
  const passenger = getCurrentPassenger();
  if (!passenger) return;

  passenger.status = 'PRESENTE';
  await goRoutesStore.markPresenceOrAbsence({ 
    daily_route: passenger.daily_route, 
    new_status: 'PRESENTE', 
    passenger_route: passenger.passenger_route 
  });

  await goRoutesStore.refreshDailyRouteById(passenger.daily_route);
  currentPassengerIndex.value = 0;
}

const markPassengerAsMissed = async () => {
  const passenger = getCurrentPassenger();
  if (!passenger) return;

  passenger.status = 'FALTOU';
  await goRoutesStore.markPresenceOrAbsence({ 
    daily_route: passenger.daily_route, 
    new_status: 'FALTOU', 
    passenger_route: passenger.passenger_route 
  });

  await goRoutesStore.refreshDailyRouteById(passenger.daily_route);
  currentPassengerIndex.value = 0;
}

// Utils
const getShortAddress = address => address?.split(",").slice(0,2).join(",")||"";
const getDurationText = () => {
  if (!routeData.value?.init_hour || !routeData.value?.end_hour) return "";
  const [h1,m1]=routeData.value.init_hour.split(":").map(Number);
  const [h2,m2]=routeData.value.end_hour.split(":").map(Number);
  return `${(h2*60+m2)-(h1*60+m1)} min`;
}
const getPickedUpCount = () => routeData.value?.presences?.filter(p=>p.status==='PRESENTE').length || 0;
const getStatusClass = () => {
  if (!routeData.value) return "";
  const now = new Date();
  const currentTime = now.getHours()+":"+now.getMinutes().toString().padStart(2,"0");
  if (currentTime < routeData.value.init_hour) return "pending";
  if (currentTime > routeData.value.end_hour) return "completed";
  return "in-progress";
}
const getStatusText = () => {
  switch(getStatusClass()){ case "pending": return "Aguardando"; case "in-progress": return "Em andamento"; case "completed": return "Concluída"; default: return "Indefinido";}
}
</script>

<style scoped>
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  transition: height 0.3s ease;
  overflow-y: auto;
  z-index: 1000;
}

.drag-handle {
  width: 40px;
  height: 5px;
  background: #d1d5db;
  border-radius: 3px;
  margin: 8px auto;
  cursor: grab;
}

.content {
  padding: 0 16px 16px 16px;
}

.route-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.route-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.route-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.route-status.pending {
  background: #fef3c7;
  color: #d97706;
}

.route-status.in-progress {
  background: #dcfce7;
  color: #16a34a;
}

.route-status.completed {
  background: #e5e7eb;
  color: #6b7280;
}

/* Estilos do Toggle Deslizante */
.driving-toggle-container {
  margin-bottom: 20px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.driving-toggle-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.toggle-label {
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  transition: color 0.2s ease;
}

.toggle-label.active {
  color: #1e293b;
}

.driving-toggle {
  position: relative;
  width: 60px;
  height: 32px;
  background: #e2e8f0;
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.driving-toggle.active {
  background: #10b981;
}

.toggle-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-slider.active {
  transform: translateX(28px);
}

.navigation-mode-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
  padding: 8px 16px;
  border-radius: 20px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  animation: pulse 2s infinite;
}

.navigation-icon {
  font-size: 18px;
  animation: rotate 3s linear infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Seção do Passageiro Atual */
.current-passenger-section {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(66, 133, 244, 0.3);
  border: 2px solid var(--primary-color);
}

.current-passenger-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.current-passenger-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.passenger-progress {
  font-size: 12px;
  opacity: 0.9;
}

.current-passenger-card {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  backdrop-filter: blur(10px);
}

.passenger-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
  margin-right: 16px;
}

.passenger-details {
  flex: 1;
}

.passenger-details .passenger-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.passenger-details .passenger-address {
  font-size: 12px;
  opacity: 0.9;
}

.passenger-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.action-btn {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.missed-btn {
  background: rgba(239, 68, 68, 0.9);
  color: white;
}

.missed-btn:hover {
  background: rgba(239, 68, 68, 1);
  transform: translateY(-2px);
}

.picked-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.picked-btn:hover {
  transform: translateY(-2px);
}

/* Seção quando não há passageiros */
.no-passengers-section {
  margin-bottom: 20px;
}

.no-passengers-card {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  color: white;
}

.completion-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.no-passengers-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.no-passengers-card p {
  font-size: 14px;
  opacity: 0.8;
  margin: 0;
}

.time-section {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  background: #f9fafb;
  padding: 16px;
  border-radius: 12px;
}

.time-item {
  text-align: center;
}

.time-label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}

.time-value {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.time-divider {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 16px;
}

.route-line {
  width: 100%;
  height: 2px;
  background: #e5e7eb;
  border-radius: 1px;
  margin-bottom: 4px;
}

.route-duration {
  font-size: 12px;
  color: #6b7280;
}

.location-section {
  margin-bottom: 16px;
}

.location-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.location-item:last-child {
  margin-bottom: 0;
}

.location-icon {
  font-size: 16px;
  margin-right: 12px;
  width: 24px;
}

.location-text {
  flex: 1;
}

.location-label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 2px;
}

.location-address {
  font-size: 14px;
  color: #111827;
  font-weight: 500;
}

.passengers-section {
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
}

.passengers-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.passengers-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.progress-indicator {
  font-size: 12px;
  color: #6b7280;
}

.passengers-list {
  max-height: 300px;
  overflow-y: auto;
}

.passenger-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s;
  position: relative;
}

.passenger-item:last-child {
  border-bottom: none;
}

.passenger-item.picked-up {
  background: #f0fdf4;
}

.passenger-item.missed {
  background: #fef2f2;
}

.passenger-item.current {
  background: #eff6ff;
  border-left: 4px solid #3b82f6;
  padding-left: 8px;
}

.current-indicator {
  font-size: 10px;
  color: #3b82f6;
  font-weight: 600;
  margin-top: 2px;
}

.passenger-checkbox {
  margin-right: 12px;
  position: relative;
}

.passenger-checkbox input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  width: 20px;
  height: 20px;
}

.checkbox-custom {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.passenger-checkbox input[type="checkbox"]:checked + .checkbox-custom {
  background: #10b981;
  border-color: #10b981;
}

.passenger-checkbox input[type="checkbox"]:checked + .checkbox-custom::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.passenger-info {
  flex: 1;
}

.passenger-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 2px;
}

.passenger-address {
  font-size: 12px;
  color: #6b7280;
}

.passenger-status-badge {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 4px;
  display: inline-block;
}

.passenger-status-badge.picked {
  background: #dcfce7;
  color: #16a34a;
}

.passenger-status-badge.missed {
  background: #fef2f2;
  color: #dc2626;
}

.passenger-order {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
  text-align: center;
}

.vehicle-section {
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
  margin-top: 16px;
}

.vehicle-section h4 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #111827;
}

.vehicle-info {
  display: flex;
  justify-content: space-between;
  background: #f9fafb;
  padding: 12px;
  border-radius: 8px;
}

.vehicle-details, .driver-info {
  flex: 1;
}

.vehicle-model, .driver-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 4px;
}

.vehicle-plate, .vehicle-capacity, .driver-contact {
  font-size: 12px;
  color: #6b7280;
}

.loading-msg {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #6b7280;
}
</style>