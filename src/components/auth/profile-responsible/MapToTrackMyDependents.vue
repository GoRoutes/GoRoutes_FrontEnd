<script setup>
import { ref, onMounted, watch } from "vue";
import { useDependentStore } from "@/stores";
import router from "@/router";

const dependentStore = useDependentStore();

const dependentMarkers = ref([]);
const selectedMarkerIndex = ref(null);
const infoWindowKey = ref(0);

// Função para criar ícone circular (mesma do exemplo)
const createCircularIcon = (imageUrl) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const size = 50;

  canvas.width = size;
  canvas.height = size;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Desenhar círculo de fundo
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#3b82f6';
      ctx.stroke();

      // Recortar área circular para a imagem
      ctx.save();
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, (size / 2) - 2, 0, 2 * Math.PI);
      ctx.clip();

      // Desenhar imagem redimensionada e centralizada
      ctx.drawImage(img, 0, 0, size, size);
      ctx.restore();

      resolve(canvas.toDataURL());
    };

    img.onerror = () => {
      // Em caso de erro, usar ícone padrão
      resolve("https://cdn-icons-png.flaticon.com/512/744/744465.png");
    };

    img.src = imageUrl;
  });
};

onMounted(async () => {
  try {
    // Carregar dependentes (substitua pelo ID real do responsável)
    const responsibleId = 1;
    await dependentStore.responsibleByStudentFilter(responsibleId);

    const dependents = dependentStore.state.dependentsByResponsibleId
      .filter(d => d.my_location && d.my_location.latitude && d.my_location.longitude);

    const markersWithIcons = await Promise.all(
      dependents.map(async (d) => {
        const hasPhoto = d.picture_file && d.picture_file.length > 0;
        let iconUrl;

        if (hasPhoto) {
          iconUrl = await createCircularIcon(d.picture_file);
        } else {
          iconUrl = "https://cdn-icons-png.flaticon.com/512/744/744465.png";
        }

        return {
          position: {
            lat: parseFloat(d.my_location.latitude),
            lng: parseFloat(d.my_location.longitude),
          },
          dependentName: d.name,
          email: d.email,
          id_dependent: d.id,
          telephone: d.telephone,
          grade: d.passenger_data?.student_data?.grade || 'N/A',
          registration: d.passenger_data?.student_data?.registration || 'N/A',
          icon: {
            url: iconUrl,
            scaledSize: { width: 50, height: 50 },
            anchor: { x: 25, y: 25 },
          },
        };
      })
    );

    dependentMarkers.value = markersWithIcons;
  } catch (error) {
    console.error('Erro ao carregar dependentes:', error);
  }
});

// Função para lidar com o clique no marcador
const handleMarkerClick = (index, item) => {
  selectedMarkerIndex.value = index;
  infoWindowKey.value++;
  dependentStore.state.selectedDependentToTrack = item;
};

// Função para fechar o InfoWindow
const closeInfoWindow = () => {
  selectedMarkerIndex.value = null;
};

// Funções para as ações dos botões
const handleProfile = (id) => {
  router.push(`/profile/dependent/${id}`);
};

const handleRoute = (name) => {
  console.log('Acessar rota para:', name);
  // Implementar lógica de rota
};

// Posição padrão do mapa (Joinville, SC)
const defaultCenter = { lat: -26.3, lng: -48.8 };

// Abrir InfoWindow quando a seleção no store mudar (ex.: clique na aside)
watch(
  () => dependentStore.state.selectedDependentToTrack,
  (selected) => {
    if (!selected) return;
    const selectedId = selected.id_dependent || selected.id;
    const index = dependentMarkers.value.findIndex(m => m.id_dependent == selectedId);
    if (index !== -1 && selectedMarkerIndex.value !== index) {
      selectedMarkerIndex.value = index;
      infoWindowKey.value++;
    }
  }
);
</script>

<template>
  <div class="map-container">
    <GMapMap
      :center="dependentMarkers[0]?.position || defaultCenter"
      :zoom="12"
      map-type-id="roadmap"
      style="width: 100%; height: 100vh"
    >
      <GMapMarker
        v-for="(marker, idx) in dependentMarkers"
        :key="`marker-${idx}`"
        :position="marker.position"
        :icon="marker.icon"
        :title="marker.dependentName"
        @click="handleMarkerClick(idx, marker)"
      />

      <GMapInfoWindow
        :key="infoWindowKey"
        v-if="selectedMarkerIndex !== null && dependentMarkers[selectedMarkerIndex]"
        :position="dependentMarkers[selectedMarkerIndex].position"
        @closeclick="closeInfoWindow"
        :options="{
          disableAutoPan: false,
          pixelOffset: { width: 0, height: -5 }
        }"
      >
        <div class="info-window-content">
          <h3>{{ dependentMarkers[selectedMarkerIndex].dependentName }}</h3>
          <p><strong>Email:</strong> {{ dependentMarkers[selectedMarkerIndex].email }}</p>
          <p><strong>Telefone:</strong> {{ dependentMarkers[selectedMarkerIndex].telephone }}</p>
          <p><strong>Série:</strong> {{ dependentMarkers[selectedMarkerIndex].grade }}</p>
          <div class="action-buttons">
            <button
              class="action-btn primary"
              @click="handleProfile(dependentMarkers[selectedMarkerIndex].id_dependent)"
            >
              Perfil
            </button>
          
            <button
              class="action-btn secondary"
              @click="handleRoute(dependentMarkers[selectedMarkerIndex].dependentName)"
            >
              Acessar Rota
            </button>
          </div>
        </div>
      </GMapInfoWindow>
    </GMapMap>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 90vh;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.info-window-content {
  min-width: 200px;
  padding: 8px;
}

.info-window-content h3 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 16px;
}

.info-window-content p {
  margin: 4px 0;
  color: #666;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.action-btn.primary {
  background-color: #3b82f6;
  color: white;
}

.action-btn.primary:hover {
  background-color: #2563eb;
}

.action-btn.secondary {
  background-color: #6b7280;
  color: white;
}

.action-btn.secondary:hover {
  background-color: #4b5563;
}
</style>