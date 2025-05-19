<script setup>
import { ref } from "vue";
import LogoComp from "@/components/auth/LogoComp.vue";
import RegisterFirstComp from "./RegisterFirstComp.vue";
import RegisterSecondComp from "./RegisterSecondComp.vue";

const firstStep = ref(null)
const secondStep = ref(null)
const isSecondStepVisible = ref(false)
const next = () => {
  firstStep.value.classList.remove('slideInReverse', 'slideOut')
  secondStep.value.classList.remove('slideIn', 'slideOutReverse')
  firstStep.value.classList.add('slideOut')
  setTimeout(() => {
    isSecondStepVisible.value = true
    firstStep.value.style.display = 'none'
    secondStep.value.classList.add('slideIn')
  }, 500)
}
const back = () => {
  secondStep.value.classList.add('slideOutReverse')
  setTimeout(() => {
    isSecondStepVisible.value = false
    firstStep.value.style.display = 'flex'
    secondStep.value.classList.remove('slideOutReverse')
    setTimeout(() => {
      firstStep.value.classList.add('slideInReverse')
    }, 0)
  }, 500)
}
</script>
<template>
  <div class="container">
    <div class="login-container">
      <LogoComp title="Comece sua jornada
com a GoRoutes" />
      <div class="form-container" ref="firstStep" :class="{ hidden: isSecondStepVisible }">
        <RegisterFirstComp @pass="next" />
      </div>
      <div class="form-container" ref="secondStep" v-show="isSecondStepVisible">
        <RegisterSecondComp @back="back" />
      </div>
    </div>
    <div class="aside">
      <img src="/public/backgroundImage-register.png" alt="">
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  min-width: 100%;
}

.aside {
  margin: auto;
  gap: 1rem;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.aside>img {
  width: 100%;
  height: 100%;
}

.aside>div {
  width: 100%;
  min-height: 40vh;
  border-radius: 20px;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 40%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  padding: 0 2rem 1rem 2rem;
  border-radius: 20px;
}

.hidden {
  display: none;
}

.slideOut {
  animation: slideOut 0.5s forwards;
}

.slideIn {
  animation: slideIn 0.5s forwards;
}

.slideInReverse {
  animation: slideInReverse 0.5s forwards;
}

.slideOutReverse {
  animation: slideOutReverse 0.5s forwards;
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }

  to {
    opacity: 0;
    transform: translateX(-100%);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutReverse {
  from {
    opacity: 1;
    transform: translateX(0);
  }

  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

@keyframes slideInReverse {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    height: auto;
  }

  .login-container {
    width: 100%;
    padding: 2rem 0;
  }

  .aside {
    display: none;
  }

  .form-container {
    width: 100%;
    padding: 0 1rem 1rem 1rem;
  }
}
</style>