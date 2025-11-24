<script setup>
import { computed } from 'vue';
import { useDependentStore } from '@/stores';
import AccountCircle from 'vue-material-design-icons/AccountCircle.vue';

const dependentStore = useDependentStore();
const dependents = computed(() => dependentStore.state.dependentsByResponsibleId);
</script>

<template>
    <section>
        <div class="header">
            <h2 class="title-responsible">
                <div>
                    <AccountCircle />
                    Dados de Dependentes
                </div>
                
                <v-btn >+ Adicionar Dependente</v-btn>
            </h2>
        </div>

        <div class="dependents-grid">
            <RouterLink v-for="dependent in dependents" :key="dependent.id"
                :to="`/default/admin/passengers/${dependent.id}`" class="dependent-card">
                <div class="card-content">
                    <img :src="dependent.picture_file || 'https://th.bing.com/th/id/R.090b69301cb8a4f034f9bf94488069ea?rik=0J%2ba5Ubmt0AOvg&pid=ImgRaw&r=0'" :alt="`Foto de ${dependent.name}`" class="dependent-picture"
                         />

                    <h3 class="dependent-name">{{ dependent.name }}</h3>

                    <p class="dependent-info">
                        {{ dependent.passenger_data?.student_data?.grade || 'N/A' }}
                    </p>
                    <p class="dependent-info">
                        {{ dependent.email }}
                    </p>
                </div>
            </RouterLink>
        </div>

        <p v-if="!dependents || dependents.length === 0" class="no-dependents">
            Nenhum dependente encontrado.
        </p>
    </section>
</template>

<style scoped>
.title-responsible {
    font-size: 2rem;
    font-weight: 600;
    color: var(--primary-color, #007bff);
    /* Adicionei um fallback */
    margin-bottom: 2rem;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 2px solid var(--primary-color, #007bff);
    display: flex;
    justify-content: space-between;
}

.dependents-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px 0;
}

.dependent-card {
    display: block;
    text-decoration: none;
    color: inherit;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    background-color: #fff;
}

.dependent-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.card-content {
    padding: 15px;
    text-align: center;
}

.dependent-picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
    border: 3px solid var(--primary-color, #007bff);
}

.dependent-name {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 5px;
    color: #333;
}

.dependent-info {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 3px;
}

.no-dependents {
    text-align: center;
    padding: 40px;
    font-size: 1.1rem;
    color: #999;
}
</style>