<script setup>
import { PassengerRetrieveDataComp } from '@/components';
import router from '@/router';
import { usePassengersStore } from '@/stores';
import { onMounted } from 'vue';
const passengersStore = usePassengersStore();
import Car from 'vue-material-design-icons/Car.vue';

onMounted(async () => {
    await passengersStore.getPassenger(router.currentRoute.value.params.id);
});
</script>

<template>
    <main>
        <h2 class="title-drivers">
            <Car />
            Dashboard de {{ passengersStore.state.selectedPassenger?.name }}
        </h2>
        <PassengerRetrieveDataComp v-if="passengersStore.state.selectedPassenger" />
    </main>
</template>

<style>
main {
    width: 90%;
    margin: 0 auto;
}

.title-drivers {
    font-size: 2rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 2rem;
    margin-top: 2rem;
        border-bottom: 2px solid rgb(var(--v-theme-primary));

}
</style>