<script setup>
import { ref, computed, onMounted } from 'vue'
import { useResponsiblesStore } from '@/stores'
import { useRouter } from 'vue-router'
import ShowPhoto from '@/components/global/profiles-images/ShowPhoto.vue'
import AccountSupervisor from 'vue-material-design-icons/AccountSupervisor.vue'
import AlertCircle from 'vue-material-design-icons/AlertCircle.vue'

const responsiblesStore = useResponsiblesStore()
const router = useRouter()
const viewPhotoDialog = ref(false)

const props = defineProps({
    passenger: {
        type: Object,
        required: true
    }
})

const hasResponsible = computed(() => {
    return props.passenger?.passenger_data?.student_data?.responsible !== null && 
           props.passenger?.passenger_data?.student_data?.responsible !== undefined
})

const responsibleId = computed(() => {
    return props.passenger?.passenger_data?.student_data?.responsible
})

const responsible = computed(() => {
    return responsiblesStore.state.selectedResponsible
})

const goToResponsiblePage = () => {
    if (responsible.value?.id) {
        router.push(`/default/admin/responsible/${responsible.value.id}`)
    }
}

onMounted(async () => {
    if (hasResponsible.value && responsibleId.value) {
        await responsiblesStore.getResponsible(responsibleId.value)
    }
})
</script>

<template>
    <div class="responsible-container">
        <!-- Header do componente -->
        <div class="section-header">
            <AccountSupervisor :size="24" class="header-icon" />
            <h3 class="section-title">Responsável</h3>
        </div>

        <!-- Estado quando não tem responsável -->
        <div v-if="!hasResponsible" class="no-responsible-container">
            <div class="no-responsible-content">
                <AlertCircle :size="48" class="no-responsible-icon" />
                <p class="no-responsible-message">
                    Este passageiro não possui um responsável cadastrado.
                </p>
            </div>
        </div>

        <!-- Estado quando tem responsável -->
        <div v-else-if="responsible" class="responsible-card">
            <div class="responsible-content">
                <!-- Foto do responsável em círculo -->
                <div class="responsible-photo" @click="viewPhotoDialog = true">
                    <img 
                        :src="responsible.picture_file" 
                        :alt="responsible.name"
                        class="photo-image"
                    />
                </div>

                <!-- Informações em linha -->
                <div class="responsible-info-line">
                    <div class="info-field">
                        <span class="info-value name">{{ responsible.name || 'Não informado' }}</span>
                    </div>
                    
                    <div class="info-field">
                        <span class="info-value email">{{ responsible.email || 'Não informado' }}</span>
                    </div>
                    
                    <div class="info-field">
                        <span class="info-value telephone">{{ responsible.telephone || 'Não informado' }}</span>
                    </div>
                </div>

                <!-- Botão para ir para a tela do responsável -->
                <div class="responsible-actions">
                    <v-btn
                        variant="elevated"
                        color="primary"
                        size="small"
                        rounded="xs"
                        prepend-icon="mdi-account"
                        @click="goToResponsiblePage"
                    >
                        Ver Detalhes
                    </v-btn>
                </div>
            </div>
        </div>

        <!-- Estado de carregamento -->
        <div v-else class="loading-container">
            <p>Carregando informações do responsável...</p>
        </div>

        <!-- Modal para visualizar foto -->
        <ShowPhoto 
            v-model="viewPhotoDialog" 
            :src="responsible?.picture_file" 
        />
    </div>
</template>

<style scoped>
.responsible-container {
    margin: auto;
}

.section-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid rgb(var(--v-theme-primary));
}

.header-icon {
    color: rgb(var(--v-theme-primary));
}

.section-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: rgb(var(--v-theme-on-surface));
}

/* Estado sem responsável */
.no-responsible-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: rgba(var(--v-theme-surface-variant), 0.1);
    border-radius: 8px;
    border: 1px dashed rgba(var(--v-theme-on-surface), 0.2);
}

.no-responsible-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
}

.no-responsible-icon {
    color: rgb(var(--v-theme-warning));
    opacity: 0.7;
}

.no-responsible-message {
    margin: 0;
    font-size: 0.9rem;
    color: rgba(var(--v-theme-on-surface), 0.7);
}

/* Card do responsável */
.responsible-card {
    background: rgb(var(--v-theme-surface));
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid rgba(var(--v-theme-primary), 0.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.responsible-content {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

/* Foto em círculo */
.responsible-photo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid rgb(var(--v-theme-primary));
    cursor: pointer;
    flex-shrink: 0;
    transition: transform 0.2s ease;
}

.responsible-photo:hover {
    transform: scale(1.05);
}

.photo-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.responsible-info-line {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex: 1;
}

.info-field {
    flex: 1;
    min-width: 0;
}

.info-value {
    font-size: 0.9rem;
    color: rgb(var(--v-theme-on-surface));
    word-break: break-word;
}

.info-value.name {
    font-weight: 600;
    font-size: 1rem;
}

.info-value.email,
.info-value.telephone {
    color: rgba(var(--v-theme-on-surface), 0.8);
}

.responsible-actions {
    flex-shrink: 0;
}

/* Estado de carregamento */
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: rgba(var(--v-theme-surface-variant), 0.1);
    border-radius: 8px;
}

.loading-container p {
    margin: 0;
    color: rgba(var(--v-theme-on-surface), 0.7);
    font-style: italic;
}

/* Responsividade */
@media (max-width: 1024px) {
    .responsible-content {
        flex-wrap: wrap;
        gap: 1rem;
    }
    
    .responsible-info-line {
        flex: 1 1 100%;
        order: 2;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .responsible-actions {
        order: 1;
        margin-left: auto;
    }
}

@media (max-width: 768px) {
    .responsible-info-line {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
    
    .info-field {
        width: 100%;
    }
    
    .responsible-content {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .responsible-actions {
        align-self: flex-end;
        margin-left: 0;
    }
}
</style>