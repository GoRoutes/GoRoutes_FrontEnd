<script setup>
import InputComp from "./InputComp.vue";
import ButtonComp from "./ButtonComp.vue";
import LogoComp from "./LogoComp.vue";
import BgImage from "./BgImage.vue";
import captionComp from "./captionComp.vue";
</script>
<template>
    <div class="container">
        <div class="login-container">
            <LogoComp />
            <div class="form-container">
                <InputComp label="Endereço do email" type="email" placeholder="Enter your email" v-model="email"
                    haveSubtext="false" />
                <InputComp label="Senha" type="password" placeholder="Enter your password" v-model="password"
                    haveSubtext="true" subtext="Esqueci minha senha" style="color: #353DCCE5 !important;"/>
                <ButtonComp name="Criar Conta" @click="handleLogin" padding=".5rem" />
                <captionComp pCaption="Ainda não é nosso cliente?" txtLink="Cadastre-se"/>
            </div>
        </div>
        <div class="aside">
            <div></div>
            <div></div>
        </div>
    </div>
    <BgImage />
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
    margin-top: 7rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    border-radius: 20px;
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
