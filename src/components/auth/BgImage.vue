<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: Number,
    default: 1,
    validator: value => [1, 2].includes(value)
  }
})

const backgroundImage = computed(() => {
  return props.variant === 2
    ? new URL('../../assets/images/BackgroundImgRegister.png', import.meta.url).href
    : new URL('../../assets/images/BackgroundImgLogin.png', import.meta.url).href
})

const imageClass = computed(() => {
  return props.variant === 2 ? 'register-image' : 'login-image'
})
</script>

<template>
  <div class="imgBg">
    <img :src="backgroundImage" :class="imageClass" alt="Background">
  </div>
</template>

<style scoped>
.imgBg {
  z-index: -10;
  position: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  display: flex;
  justify-content: end;
  align-items: end;
}

.login-image {
  width: 100%;
  height: auto;
}

.register-image {
  width: 85%;
  height: auto;
}
</style>
