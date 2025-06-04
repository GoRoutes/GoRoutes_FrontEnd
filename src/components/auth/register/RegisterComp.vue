<script setup>
import { ref } from 'vue'
import { ButtonComp, LogoComp } from "../.."
import BgImage from "../BgImage.vue"
import captionComp from "../login/CaptionComp.vue"
import FormCompOne from "./FormCompOne.vue"
import FormCompTwo from "./FormCompTwo.vue"

const currentStep = ref(1)

const nextStep = () => {
    if (currentStep.value < 2) currentStep.value++
}

const prevStep = () => {
    if (currentStep.value > 1) currentStep.value--
}

const handleRegister = () => {
    // ação de cadastro aqui
    console.log("Cadastrar")
}
</script>

<template>
    <div class="container">
        <div class="login-container">
            <LogoComp :variant="1" />
            <div class="form-wrapper">
                <div class="form-container">
                    <transition name="slide" mode="out-in">
                        <div class="form-content" :key="currentStep">
                            <component :is="currentStep === 1 ? FormCompOne : FormCompTwo" />
                        </div>
                    </transition>
                </div>

                <div class="button-group">
                    <transition name="button-fade" mode="out-in">
                        <div class="button-container" :key="currentStep">
                            <ButtonComp v-if="currentStep === 2" name="VOLTAR" @click="prevStep" padding=".5rem" />
                            <ButtonComp v-if="currentStep === 1" name="PRÓXIMO" @click="nextStep" padding=".5rem" />
                            <ButtonComp v-if="currentStep === 2" name="CADASTRAR" @click="handleRegister"
                                padding=".5rem" />
                        </div>
                    </transition>
                </div>

                <captionComp pCaption="Já é nosso cliente?" txtLink="Faça login" link="/blank/login" />
            </div>
        </div>

        <div class="aside">
            <div></div>
            <div></div>
        </div>

        <BgImage :variant="2" />
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    min-width: 100%;
    padding-left: 10rem;
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
    width: 33%;
    margin-top: 4.5rem;
}

.form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    max-width: 400px;
    border-radius: 20px;
}

.form-container {
    width: 100%;
    min-height: 300px;
    position: relative;
    overflow: hidden;
}

.form-content {
    width: 100%;
}

.button-group {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    width: 100%;
}

.button-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
}

.slide-enter-active {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-leave-active {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.slide-enter-from {
    transform: translateX(30px);
    opacity: 0;
}

.slide-leave-to {
    transform: translateX(-30px);
    opacity: 0;
}

/* Animações dos botões */
.button-fade-enter-active,
.button-fade-leave-active {
    transition: all 0.25s ease-in-out;
}

.button-fade-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.button-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

/* Responsividade */
@media screen and (max-width: 768px) {
    .container {
        flex-direction: column;
        height: auto;
        padding-left: 0;
    }

    .login-container {
        width: 100%;
        padding: 2rem;
        margin-top: 2rem;
        height: auto;
    }

    .aside {
        display: none;
    }

    .form-wrapper {
        width: 100%;
        padding: 0;
    }

    .form-container {
        min-height: 250px;
    }
}
</style>