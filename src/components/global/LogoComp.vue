<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: Number,
    default: 1,
    validator: value => [1, 2].includes(value)
  }
})

const mainText = computed(() =>
  props.variant === 2
    ? 'Aqui você viaja com conforto e segurança'
    : 'Comece sua jornada com GoRoutes'
)

const heading = computed(() =>
  props.variant === 2
    ? 'Acesse sua conta'
    : 'Crie sua conta'
)

const subtext = computed(() =>
  props.variant === 2
    ? 'Por favor, insira seus dados para acessar sua conta.'
    : 'Por favor, insira seus dados para criar uma conta.'
)
</script>

<template>
  <div class="logo-container">
    <img src="../../assets/images/LogoRemoved.png" alt="Logo" class="logo" />
    <h1>GoRoutes</h1>
  </div>
  <div class="text-container">
    <h1 class="logo-text">{{ mainText }}</h1>
    <h3 class="logo-subtext">{{ heading }}</h3>
    <p class="logo-subtext">{{ subtext }}</p>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Homenaje&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap');

.logo-container {
  display: flex;
  align-items: center;
  justify-content: left;
}

.logo-container img {
  width: 8em;
}

.logo-container h1 {
  color: var(--logo-color);
  font-size: 3rem;
  font-weight: 500;
  margin-left: -12px;
  font-family: "Homenaje", sans-serif;
}

.logo {
  width: 80%;
  margin-left: -12px;
}

.text-container {
  width: 100%;
}

.logo-text {
  margin-top: 0;
  color: var(--primary-color);
  font-size: 2.5rem;
  font-weight: 400;
  text-align: left;
  font-family: "Homenaje", sans-serif;
  letter-spacing: 4px;
  line-height: 100%;
}

h3.logo-subtext {
  color: var(--primary-color);
  font-weight: 700;
  font-size: 1.5rem;
  text-align: left;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-family: "IBM Plex Sans", sans-serif;
}

p.logo-subtext {
  color: var(--comment-color);
  font-weight: 400;
  font-size: 1rem;
  text-align: left;
  font-family: "IBM Plex Sans", sans-serif;
  margin-bottom: 0.5rem;
}
</style>
