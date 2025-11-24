<script setup>
import { onMounted, ref } from 'vue'
import { DataResponsible } from '@/components'
import AccountCircle from "vue-material-design-icons/AccountCircle.vue"
import { useAuthStore, useDependentStore } from '@/stores'
import route from '@/router'

const authStore = useAuthStore()
const currentResponsible = ref(null)
const dependentsStore = useDependentStore()

onMounted(async () => {
  currentResponsible.value = await authStore.userById(route.currentRoute.value.params.id)
  await dependentsStore.responsibleByStudentFilter(route.currentRoute.value.params.id)
})
</script>

<template>
  <main>
    <h2 class="title-responsible">
      <AccountCircle />
      Dados de {{ currentResponsible?.data.name }}
    </h2>
    <DataResponsible v-if="currentResponsible" :dependent="currentResponsible" />
  </main>
</template>

<style>
main {
  width: 80%;
  margin: 0 auto;
}

.title-responsible {
  font-size: 2rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 2rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
    border-bottom: 2px solid var(--primary-color);

}
</style>
