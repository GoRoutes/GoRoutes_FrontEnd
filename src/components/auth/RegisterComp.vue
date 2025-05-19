<script setup>
import { ref } from "vue";
import LogoComp from "@/components/auth/LogoComp.vue";
import RegisterFirstComp from "./RegisterFirstComp.vue";
import RegisterSecondComp from "./RegisterSecondComp.vue";
import BgImage from "./BgImage.vue";

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
            <LogoComp title="Comece sua jornada com a GoRoutes" subtitle="Crie sua conta" subtext="Por favor, insira seus dados para criar uma conta."/>
            <div class="form-container" ref="firstStep" :class="{ hidden: isSecondStepVisible }">
        <RegisterFirstComp @pass="next" />
      </div>
      <div class="form-container" ref="secondStep" v-show="isSecondStepVisible">
        <RegisterSecondComp @back="back" />
      </div>
        </div>
        <div class="aside">
            <div></div>
            <div></div>
        </div>  
      </div>
      <div class="a">
      <BgImage imagesrc="\public\backgroundImage-register.png" />
      </div>
  <!-- <div class="container">
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
  </div> -->
</template>
<style scoped>
.container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    min-width: 100%;
    padding: 0 4rem 0 4rem;
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

.aside>div {
    width: 100%;
    min-height: 40vh;
    border-radius: 20px;
}

.login-container {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    height: calc(100vh - 7rem);
    width: 40%;
    /* margin-top: 2%; */
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    /* max-width: 400px; */
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
    padding: 0;
  }
  .a{
    display: none;
  }
  .login-container {
    width: 100%;
    padding: 3rem;
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