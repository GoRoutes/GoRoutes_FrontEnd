<script setup>
import { shallowRef, watch, onMounted } from 'vue';
import AsideComp from './AsideComp.vue';
import AsideMobile from './AsideMobile.vue';

const Aside = shallowRef(null);
const widthScreen = shallowRef(window.innerWidth);

const updateAside = () => {
    Aside.value = widthScreen.value > 1024 ? AsideComp : AsideMobile;
};

onMounted(() => {
    updateAside();
    window.addEventListener('resize', () => {
        widthScreen.value = window.innerWidth;
    });
});

watch(widthScreen, updateAside);

</script>

<template>
    <component :is="Aside" />
</template>

<style scoped>
* {
    width: 100%;
    height: 100%;
}
</style>