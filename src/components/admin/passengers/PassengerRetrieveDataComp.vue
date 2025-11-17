<script setup>
import { ref, computed } from 'vue'
import { usePassengersStore } from '@/stores'
import PhotoComp from '@/components/global/profiles-images/PhotoComp.vue'
import ShowPhoto from '@/components/global/profiles-images/ShowPhoto.vue'
import UploadPhoto from '@/components/global/profiles-images/UploadPhoto.vue'
import AddressPassenger from './AddressPassenger.vue'

const passengersStore = usePassengersStore()
const isEditing = ref(false)
const viewPhotoDialog = ref(false)
const changePhotoDialog = ref(false)

const isStudent = computed(() => {
    return passengersStore.state.selectedPassenger.passenger_data?.student_data !== null
})
</script>

<template>
    <section>
        <div class="photo">
            <PhotoComp
                :src="passengersStore.state.selectedPassenger.picture_file"
                @view="viewPhotoDialog = true"
                @change="changePhotoDialog = true"
            />

            <div class="form-wrapper">
                <div class="form-grid">
                    <v-text-field
                        v-model="passengersStore.state.selectedPassenger.name"
                        label="Nome"
                        variant="outlined"
                        :readonly="true"
                    />

                    <v-text-field
                        v-model="passengersStore.state.selectedPassenger.passenger_data.cpf"
                        label="CPF"
                        variant="outlined"
                        :readonly="!isEditing"
                    />

                    <!-- Campos de estudante (apenas se for estudante) -->
                    <template v-if="isStudent">
                        <v-text-field
                            class="full"
                            v-model="passengersStore.state.selectedPassenger.passenger_data.student_data.registration"
                            label="Matrícula"
                            variant="outlined"
                            :readonly="!isEditing"
                        />

                        <v-text-field
                            class="full"
                            v-model="passengersStore.state.selectedPassenger.passenger_data.student_data.grade"
                            label="Turma"
                            variant="outlined"
                            :readonly="!isEditing"
                        />
                    </template>

                    <!-- Campos para não estudantes -->
                    <template v-else>
                        <v-text-field
                            class="full"
                            v-model="passengersStore.state.selectedPassenger.email"
                            label="Email"
                            variant="outlined"
                            :readonly="!isEditing"
                        />

                        <v-text-field
                            class="full"
                            v-model="passengersStore.state.selectedPassenger.telephone"
                            label="Telefone"
                            variant="outlined"
                            :readonly="!isEditing"
                        />
                    </template>

                </div>
            </div>
        </div>

        <!-- Modais -->
        <ShowPhoto v-model="viewPhotoDialog" :src="passengersStore.state.selectedPassenger.picture_file" />
        <UploadPhoto v-model="changePhotoDialog" :user_id="passengersStore.state.selectedPassenger.id" />
        <AddressPassenger />
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

/* Responsividade */
@media (max-width: 1024px) {
    .photo {
        flex-direction: column;
        align-items: center;
    }
    
    .form-grid {
        grid-template-columns: 1fr;
        gap: 0.5rem;
    }
    
    .full {
        grid-column: span 1;
    }
    
    .edit-button {
        justify-content: space-around;
        margin-top: 1rem;
    }
}
</style>