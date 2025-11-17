<script setup>
import { ref } from 'vue'
import { useDriversStore } from '@/stores'
import PhotoComp from '@/components/global/profiles-images/PhotoComp.vue'
import ShowPhoto from '@/components/global/profiles-images/ShowPhoto.vue'
import UploadPhoto from '@/components/global/profiles-images/UploadPhoto.vue'
import AddressDriver from './AddressDriver.vue'

const driversStore = useDriversStore()
const isEditing = ref(false)
const viewPhotoDialog = ref(false)
const changePhotoDialog = ref(false)
</script>

<template>
  <section>
    <div class="photo">
      <PhotoComp
        :src="driversStore.state.selectedDriver.picture_file"
        @view="viewPhotoDialog = true"
        @change="changePhotoDialog = true"
      />

      <div class="form-wrapper">
        <div class="form-grid">
          <!-- Nome -->
          <v-text-field
            v-model="driversStore.state.selectedDriver.name"
            label="Nome"
            variant="outlined"
            :readonly="!isEditing"
          />

          <!-- CPF -->
          <v-text-field
            v-model="driversStore.state.selectedDriver.driver_data.cpf"
            label="CPF"
            variant="outlined"
            :readonly="!isEditing"
          />

          <!-- CNH -->
          <v-text-field
            v-model="driversStore.state.selectedDriver.driver_data.cnh"
            label="CNH"
            variant="outlined"
            :readonly="!isEditing"
          />

          <!-- Telefone -->
          <v-text-field
            v-model="driversStore.state.selectedDriver.telephone"
            label="Telefone"
            variant="outlined"
            :readonly="!isEditing"
          />

          <!-- Email -->
          <v-text-field
            class="full"
            v-model="driversStore.state.selectedDriver.email"
            label="E-mail"
            variant="outlined"
            :readonly="!isEditing"
          />

        
        </div>
      </div>
    </div>

    <!-- Modais -->
    <ShowPhoto
      v-model="viewPhotoDialog"
      :src="driversStore.state.selectedDriver?.picture_file"
    />
    <UploadPhoto
      v-model="changePhotoDialog"
      :user_id="driversStore.state.selectedDriver.id"
    />
    <AddressDriver />
  </section>
</template>

<style scoped>
.photo {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
  margin: 2rem auto;
}

.form-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.edit-button {
  display: flex;
  align-items: end;
  justify-content: end;
  width: 100%;
  gap: 1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
}

.full {
  grid-column: span 2;
}
</style>
