<script setup>
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
const router = useRouter()
console.log(router)
import LoadingComp from './components/global/LoadingComp.vue'
</script>

<template>
  <RouterView />
  <LoadingComp />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap');


* {
  font-family: 'IBM Plex Sans', sans-serif;
}
</style>
