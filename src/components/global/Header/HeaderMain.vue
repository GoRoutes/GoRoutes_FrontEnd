<script setup>
import { shallowRef, watch, onMounted } from 'vue';
import HeaderDesktop from './HeaderDesktop.vue';
import HeaderMobile from './HeaderMobile.vue';

const header = shallowRef(null);
const widthScreen = shallowRef(window.innerWidth);

const updateHeader = () => {
    header.value = widthScreen.value > 1024 ? HeaderDesktop : HeaderMobile;
};

onMounted(() => {
    updateHeader();
    window.addEventListener('resize', () => {
        widthScreen.value = window.innerWidth;
    });
});

watch(widthScreen, updateHeader);

</script>

<template>
    <component :is="header" />
</template>

<style scoped>
* {
    width: 100%;
    height: 100%;
}
</style>