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
</style>
