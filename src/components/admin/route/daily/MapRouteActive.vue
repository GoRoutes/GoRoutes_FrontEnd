<script setup>
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from "vue";
import { decode } from "@googlemaps/polyline-codec";
import { useGoRoutesStore } from "@/stores";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const goRoutesStore = useGoRoutesStore();

const map = ref(null);
const routePath = ref([]);
const markerPositions = ref([]);
const mapInitialized = ref(false);
const isNavigationMode = ref(false);
const userLocation = ref(null);
const locationWatchId = ref(null);
const userMarker = ref(null);
const userAccuracyCircle = ref(null);
const lastBearing = ref(0);

// Calcular bearing (direção) baseado no movimento
const calculateBearing = (start, end) => {
  const startLat = start.lat * Math.PI / 180;
  const startLng = start.lng * Math.PI / 180;
  const endLat = end.lat * Math.PI / 180;
  const endLng = end.lng * Math.PI / 180;

  const dLng = endLng - startLng;
  const y = Math.sin(dLng) * Math.cos(endLat);
  const x = Math.cos(startLat) * Math.sin(endLat) -
            Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);
  
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
};

// Iniciar tracking de geolocalização
const startLocationTracking = () => {
  if (!navigator.geolocation) {
    console.error('Geolocalização não suportada');
    return;
  }

  let previousLocation = null;

  locationWatchId.value = navigator.geolocation.watchPosition(
    (position) => {
      const newLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
        heading: position.coords.heading // Alguns dispositivos fornecem heading
      };

      // Calcular bearing baseado no movimento
      if (previousLocation) {
        const calculatedBearing = calculateBearing(previousLocation, newLocation);
        lastBearing.value = calculatedBearing;
        newLocation.bearing = calculatedBearing;
      } else if (position.coords.heading !== null) {
        lastBearing.value = position.coords.heading;
        newLocation.bearing = position.coords.heading;
      }

      userLocation.value = newLocation;
      previousLocation = newLocation;
      
      // Atualizar mapa se estiver em modo navegação
      if (isNavigationMode.value && map.value) {
        updateNavigationView();
      }
    },
    (error) => {
      console.error('Erro na geolocalização:', error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  );
};

// Parar tracking de geolocalização
const stopLocationTracking = () => {
  if (locationWatchId.value) {
    navigator.geolocation.clearWatch(locationWatchId.value);
    locationWatchId.value = null;
  }
  if (userMarker.value) {
    userMarker.value.remove();
    userMarker.value = null;
  }
  if (userAccuracyCircle.value) {
    userAccuracyCircle.value.remove();
    userAccuracyCircle.value = null;
  }
  userLocation.value = null;
};

// Atualizar visão de navegação (estilo Google Maps)
const updateNavigationView = () => {
  if (!map.value || !userLocation.value) return;

  // Atualizar marcador do usuário
  updateUserMarker();

  // Animar câmera para seguir o usuário
  const bearing = userLocation.value.bearing || lastBearing.value || 0;
  
  map.value.easeTo({
    center: [userLocation.value.lng, userLocation.value.lat],
    zoom: 18,
    pitch: 65,
    bearing: bearing,
    duration: 1000,
    essential: true
  });
};

// Criar/atualizar marcador do usuário
const updateUserMarker = () => {
  if (!map.value || !userLocation.value) return;

  const el = document.createElement('div');
  el.className = 'user-location-marker';
  
  // SVG de um carro estilizado visto de cima
  el.innerHTML = `
    <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 3px 8px rgba(0,0,0,0.4));">
      <!-- Círculo de fundo pulsante -->
      <circle cx="25" cy="25" r="23" fill="rgba(66, 133, 244, 0.15)" class="pulse-ring"/>
      
      <!-- Corpo do carro -->
      <g transform="translate(25, 25) rotate(0) translate(-25, -25)">
        <!-- Sombra -->
        <ellipse cx="25" cy="28" rx="10" ry="3" fill="rgba(0,0,0,0.2)" opacity="0.5"/>
        
        <!-- Parte traseira -->
        <rect x="20" y="30" width="10" height="8" rx="2" fill="#1a73e8"/>
        
        <!-- Corpo principal -->
        <rect x="18" y="15" width="14" height="15" rx="3" fill="#4285F4"/>
        
        <!-- Teto/cabine -->
        <rect x="20" y="18" width="10" height="10" rx="2" fill="#5a95f5"/>
        
        <!-- Para-brisa -->
        <rect x="21" y="19" width="8" height="4" rx="1" fill="rgba(255,255,255,0.4)"/>
        
        <!-- Janelas laterais -->
        <rect x="19" y="24" width="3" height="4" rx="0.5" fill="rgba(255,255,255,0.3)"/>
        <rect x="28" y="24" width="3" height="4" rx="0.5" fill="rgba(255,255,255,0.3)"/>
        
        <!-- Faróis -->
        <circle cx="21" cy="14" r="1.5" fill="#FFF59D"/>
        <circle cx="29" cy="14" r="1.5" fill="#FFF59D"/>
        
        <!-- Rodas -->
        <circle cx="20" cy="17" r="2" fill="#263238"/>
        <circle cx="30" cy="17" r="2" fill="#263238"/>
        <circle cx="20" cy="32" r="2" fill="#263238"/>
        <circle cx="30" cy="32" r="2" fill="#263238"/>
        
        <!-- Detalhes das rodas -->
        <circle cx="20" cy="17" r="1" fill="#455A64"/>
        <circle cx="30" cy="17" r="1" fill="#455A64"/>
        <circle cx="20" cy="32" r="1" fill="#455A64"/>
        <circle cx="30" cy="32" r="1" fill="#455A64"/>
        
        <!-- Seta de direção no topo -->
        <path d="M 25 8 L 28 13 L 22 13 Z" fill="#34A853" stroke="white" stroke-width="1"/>
      </g>
    </svg>
  `;
  
  el.style.cssText = `
    width: 50px;
    height: 50px;
    transform: translate(-50%, -50%) rotate(${userLocation.value.bearing || lastBearing.value || 0}deg);
    transition: transform 0.5s ease-out;
    position: relative;
    z-index: 1000;
  `;

  // Remover marcador anterior
  if (userMarker.value) {
    userMarker.value.remove();
  }

  // Criar novo marcador
  userMarker.value = new maplibregl.Marker({
    element: el,
    rotationAlignment: 'map',
    pitchAlignment: 'map',
    rotation: userLocation.value.bearing || lastBearing.value || 0
  })
    .setLngLat([userLocation.value.lng, userLocation.value.lat])
    .addTo(map.value);

  // Atualizar círculo de precisão
  updateAccuracyCircle();
};

// Atualizar círculo de precisão
const updateAccuracyCircle = () => {
  if (!map.value || !userLocation.value) return;

  const radiusInMeters = userLocation.value.accuracy || 10;
  const radiusInPixels = radiusInMeters / 0.075; // Aproximação para conversão metros -> pixels no zoom 18

  if (userAccuracyCircle.value) {
    userAccuracyCircle.value.remove();
  }

  const el = document.createElement('div');
  el.style.cssText = `
    width: ${radiusInPixels * 2}px;
    height: ${radiusInPixels * 2}px;
    background: rgba(66, 133, 244, 0.1);
    border: 2px solid rgba(66, 133, 244, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  `;

  userAccuracyCircle.value = new maplibregl.Marker({
    element: el,
    anchor: 'center'
  })
    .setLngLat([userLocation.value.lng, userLocation.value.lat])
    .addTo(map.value);
};

// Alternar modo navegação
const toggleNavigationMode = (enabled) => {
  isNavigationMode.value = enabled;
  
  if (enabled) {
    console.log('🧭 Modo navegação ativado');
    startLocationTracking();
    
    // Solicitar permissão de geolocalização se necessário
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        console.log('Permissão de geolocalização:', result.state);
      });
    }
  } else {
    console.log('🛑 Modo navegação desativado');
    stopLocationTracking();
    
    // Voltar para visão geral da rota
    if (map.value && routePath.value.length) {
      focusOnRoute();
    }
  }
};

// Watch para mudanças no modo navegação
onMounted(() => {
  window.addEventListener('navigation-mode-changed', (event) => {
    console.log('🎯 Evento recebido - Modo navegação:', event.detail.enabled);
    toggleNavigationMode(event.detail.enabled);
  });

  // Sincronizar estado inicial da store ao montar o componente
  const initialNavigationState = goRoutesStore.getNavigationMode();
  if (initialNavigationState) {
    console.log('📍 Restaurando modo navegação do localStorage');
    toggleNavigationMode(true);
  }
});

// Inicializar mapa
const initializeMap = () => {
  const center = mapCenter.value;
  
  map.value = new maplibregl.Map({
    container: 'map',
    style: {
      version: 8,
      sources: {
        'osm': {
          type: 'raster',
          tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '© OpenStreetMap Contributors'
        }
      },
      layers: [{
        id: 'osm',
        type: 'raster',
        source: 'osm'
      }]
    },
    center: [center.lng, center.lat],
    zoom: 13,
    pitch: 0,
    bearing: 0,
    antialias: true
  });

  map.value.on('load', () => {
    mapInitialized.value = true;
    
    // Adicionar controles
    map.value.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-left');
    map.value.addControl(new maplibregl.ScaleControl(), 'bottom-left');
    
    // Adicionar elementos ao mapa
    addRouteToMap();
    addMarkersToMap();
  });
};

// Adicionar rota ao mapa
const addRouteToMap = () => {
  if (!routePath.value.length || !map.value) return;

  const coordinates = routePath.value.map(point => [point.lng, point.lat]);

  map.value.addSource('route', {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: coordinates
      }
    }
  });

  // Linha principal da rota
  map.value.addLayer({
    id: 'route-outline',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#1a73e8',
      'line-width': 8,
      'line-opacity': 0.4
    }
  });

  map.value.addLayer({
    id: 'route',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#4285F4',
      'line-width': 5,
      'line-opacity': 0.9
    }
  });
};

// Atualizar rota no mapa
const updateMapRoute = () => {
  if (!map.value || !map.value.getSource('route') || !routePath.value.length) return;

  const coordinates = routePath.value.map(point => [point.lng, point.lat]);
  map.value.getSource('route').setData({
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: coordinates
    }
  });
};

// Adicionar marcadores ao mapa
const addMarkersToMap = () => {
  if (!markerPositions.value.length || !map.value) return;

  markerPositions.value.forEach((pos) => {
    const el = document.createElement('div');
    el.className = 'passenger-marker';
    el.style.cssText = `
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
      border: 3px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      cursor: pointer;
      transition: transform 0.2s;
      transform: translate(-50%, -50%);
    `;
    el.innerHTML = '👤';

    el.addEventListener('mouseenter', () => {
      el.style.transform = 'translate(-50%, -50%) scale(1.2)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    const marker = new maplibregl.Marker({
      element: el
    })
      .setLngLat([pos.lng, pos.lat])
      .addTo(map.value);

    const popup = new maplibregl.Popup({ offset: 25 })
      .setHTML(`
        <div style="padding: 12px; min-width: 200px;">
          <strong style="color: #022840; font-size: 14px;">👤 ${pos.passenger}</strong><br />
          <p style="margin: 8px 0; font-size: 12px; color: #666;">${pos.address}</p>
          <span style="color: ${pos.status === 'NAO_PEGO' ? '#f44336' : '#4CAF50'}; font-size: 12px; font-weight: bold;">
            Status: ${pos.status === 'NAO_PEGO' ? 'Não pego' : pos.status === 'PRESENTE' ? 'Presente' : pos.status}
          </span>
        </div>
      `);

    marker.setPopup(popup);
  });
};

// Atualizar próximo passageiro
const updateNextPassengerMarker = () => {
  const routeData = goRoutesStore.state.myDailyRouteDriver;
  if (!routeData?.presences?.length) {
    markerPositions.value = [];
    return;
  }

  const nextPassenger = routeData.presences.find(p => 
    p.status !== "PRESENTE" && p.status !== "FALTOU"
  );
  
  if (!nextPassenger) {
    markerPositions.value = [];
    return;
  }

  markerPositions.value = nextPassenger.address_passenger?.map(addr => ({
    lat: parseFloat(addr.latitude),
    lng: parseFloat(addr.longitude),
    address: addr.address,
    passenger: nextPassenger.passenger_name,
    status: nextPassenger.status || "NAO_PEGO",
  })) || [];
};

// Centralizar no próximo passageiro
const focusOnNextPassenger = () => {
  if (!map.value || !markerPositions.value.length || isNavigationMode.value) return;

  const nextPassenger = markerPositions.value[0];
  map.value.flyTo({
    center: [nextPassenger.lng, nextPassenger.lat],
    zoom: 16,
    pitch: 45,
    bearing: 0,
    essential: true,
    duration: 1500
  });
};

// Centralizar na rota completa
const focusOnRoute = () => {
  if (!map.value || !routePath.value.length || isNavigationMode.value) return;

  const bounds = new maplibregl.LngLatBounds();
  routePath.value.forEach(point => {
    bounds.extend([point.lng, point.lat]);
  });

  map.value.fitBounds(bounds, {
    padding: 50,
    pitch: 0,
    bearing: 0,
    duration: 1000
  });
};

// Atualizar rota e marcadores
const updateRouteAndMarkers = async () => {
  await goRoutesStore.takeMyDailyRoute();
  const updatedRouteData = goRoutesStore.state.myDailyRouteDriver;

  if (updatedRouteData?.overview_polyline?.points) {
    routePath.value = decode(updatedRouteData.overview_polyline.points).map(([lat, lng]) => ({ 
      lat: parseFloat(lat), 
      lng: parseFloat(lng) 
    }));
  } else if (typeof updatedRouteData?.overview_polyline === "string") {
    routePath.value = decode(updatedRouteData.overview_polyline).map(([lat, lng]) => ({ 
      lat: parseFloat(lat), 
      lng: parseFloat(lng) 
    }));
  }

  updateNextPassengerMarker();

  if (mapInitialized.value && map.value && map.value.isStyleLoaded()) {
    updateMapRoute();
  }
};

onMounted(async () => {
  await goRoutesStore.takeMyDailyRoute();
  
  const routeData = goRoutesStore.state.myDailyRouteDriver;
  if (!routeData) return;

  if (routeData.overview_polyline?.points) {
    routePath.value = decode(routeData.overview_polyline.points).map(([lat, lng]) => ({ 
      lat: parseFloat(lat), 
      lng: parseFloat(lng) 
    }));
  } else if (typeof routeData.overview_polyline === "string") {
    routePath.value = decode(routeData.overview_polyline).map(([lat, lng]) => ({ 
      lat: parseFloat(lat), 
      lng: parseFloat(lng) 
    }));
  }

  updateNextPassengerMarker();
  
  nextTick(() => {
    initializeMap();
  });
});

// Watch para mudanças nos dados
watch(() => goRoutesStore.state.myDailyRouteDriver, (newRouteData) => {
  if (!newRouteData) return;

  if (newRouteData.overview_polyline?.points) {
    routePath.value = decode(newRouteData.overview_polyline.points).map(([lat, lng]) => ({ 
      lat: parseFloat(lat), 
      lng: parseFloat(lng) 
    }));
  } else if (typeof newRouteData.overview_polyline === "string") {
    routePath.value = decode(newRouteData.overview_polyline).map(([lat, lng]) => ({ 
      lat: parseFloat(lat), 
      lng: parseFloat(lng) 
    }));
  }

  updateNextPassengerMarker();

  if (mapInitialized.value && map.value && map.value.isStyleLoaded()) {
    updateMapRoute();
  }
}, { deep: true });

watch(() => goRoutesStore.state.myDailyRouteDriver?.presences, (newPresences, oldPresences) => {
  if (!newPresences || !oldPresences) return;
  
  const statusChanged = newPresences.some((presence, index) => {
    return presence.status !== oldPresences[index]?.status;
  });
  
  if (statusChanged) {
    console.log('Status alterado, atualizando rota...');
    updateRouteAndMarkers();
  }
}, { deep: true });

onUnmounted(() => {
  stopLocationTracking();
});

const mapCenter = computed(() => {
  if (userLocation.value) return userLocation.value;
  if (routePath.value.length) return routePath.value[0];
  if (markerPositions.value.length) return markerPositions.value[0];
  const routeData = goRoutesStore.state.myDailyRouteDriver;
  if (routeData?.latitude_origin) {
    return { 
      lat: parseFloat(routeData.latitude_origin), 
      lng: parseFloat(routeData.longitude_origin) 
    };
  }
  return { lat: -26.3, lng: -48.8 };
});
</script>

<template>
  <div class="map-container" v-if="routePath.length || markerPositions.length">
    <div id="map"></div>
    
    <!-- Overlay de controles -->
    <div class="map-controls">
      
      <button 
        class="control-btn" 
        @click="focusOnNextPassenger"
        :disabled="!markerPositions.length || isNavigationMode"
        :title="isNavigationMode ? 'Modo navegação ativo' : 'Focar no próximo passageiro'"
      >
        <span class="control-icon">👤</span>
      </button>
      <button 
        class="control-btn" 
        @click="focusOnRoute"
        :disabled="!routePath.length || isNavigationMode"
        :title="isNavigationMode ? 'Modo navegação ativo' : 'Ver rota completa'"
      >
        <span class="control-icon">🗺️</span>
      </button>
      <button 
        class="control-btn" 
        @click="updateRouteAndMarkers"
        title="Atualizar rota"
      >
        <span class="control-icon">🔄</span>
      </button>
    </div>
  </div>

  <div v-else class="loading-container">
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <p>Carregando rota...</p>
    </div>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
  position: relative;
  margin-top: 3rem;
}

#map {
  width: 100%;
  height: 100%;
}

.map-controls {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 10;
}

/* Indicador de navegação */
.navigation-indicator {
  background: linear-gradient(135deg, #4285F4 0%, #34A853 100%);
  color: white;
  padding: 10px 16px;
  border-radius: 24px;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.4);
  animation: pulse-glow 2s infinite;
}

.navigation-pulse {
  width: 10px;
  height: 10px;
  background: #34A853;
  border-radius: 50%;
  animation: blink 1.5s infinite;
  box-shadow: 0 0 10px #34A853;
}

/* Informações de navegação */
.navigation-info {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 12px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
}

.info-icon {
  font-size: 16px;
}

.info-value {
  font-family: 'Courier New', monospace;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 6px;
}

@keyframes blink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}

@keyframes pulse-glow {
  0% { 
    transform: scale(1); 
    box-shadow: 0 4px 12px rgba(66, 133, 244, 0.4);
  }
  50% { 
    transform: scale(1.02); 
    box-shadow: 0 6px 20px rgba(66, 133, 244, 0.6);
  }
  100% { 
    transform: scale(1); 
    box-shadow: 0 4px 12px rgba(66, 133, 244, 0.4);
  }
}

.control-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 2px solid #022840;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.control-btn:hover:not(:disabled) {
  transform: scale(1.1);
  background: #022840;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.control-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.control-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.control-icon {
  font-size: 1.2rem;
  transition: filter 0.3s ease;
}

.control-btn:hover:not(:disabled) .control-icon {
  filter: brightness(0) invert(1);
}

.loading-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.loading-content {
  text-align: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #022840;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-content p {
  color: #022840;
  font-weight: 600;
  margin: 0;
}

/* Estilos para marcadores customizados */
:deep(.user-location-marker) {
  animation: none;
}

:deep(.user-location-marker .pulse-ring) {
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% { 
    r: 18; 
    opacity: 0.6;
  }
  50% { 
    r: 23; 
    opacity: 0.3;
  }
  100% { 
    r: 18; 
    opacity: 0.6;
  }
}

@keyframes pulse-marker {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.1); }
}

:deep(.passenger-marker) {
  transition: all 0.3s ease;
}
</style>