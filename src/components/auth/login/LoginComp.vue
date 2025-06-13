<script setup>
import BgImage from "@/components/auth/BgImage.vue";
import captionComp from "@/components/auth/login/CaptionComp.vue";
import { InputComp, ButtonComp, LogoComp } from "@/components";
import { useAuthStore } from "@/stores";

import { reactive } from "vue";

const authStore = useAuthStore();

const login = reactive({
    username: "",
    password: ""
});

const handleLogin = () => {
  authStore.login(login.username, login.password);
};

</script>
<template>
    <div class="container">
        <div class="login-container">
            <LogoComp :variant="2" />
            <div class="form-container">
                <InputComp
                    label="Nome de usuário"
                    type="text"
                    placeholder="Enter your username"
                    v-model="login.username"
                    :haveSubtext="false"
                    padding-props="1.3rem"
                />
                <InputComp
                    label="Senha"
                    type="password"
                    placeholder="Enter your password"
                    v-model="login.password"
                    :haveSubtext="true"
                    subtext="Esqueci minha senha"
                    style="color: #353DCCE5 !important;"
                    padding-props="1.3rem"
                />
                <div v-if="authStore.state.error" class="error-message">
                    {{ authStore.state.message }}
                </div>
                <ButtonComp name="LOGIN" @click="handleLogin" padding=".5rem" />
                <captionComp pCaption="Ainda não é nosso cliente?" txtLink="Cadastre-se" link="/blank/register" />
            </div>
        </div>
        <div class="aside">
            <div></div>
            <div></div>
        </div>
    </div>
    <BgImage :variant="1" />
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
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    max-width: 400px;
    border-radius: 20px;
}

.error-message {
    color: #ff0000;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    text-align: center;
    width: 100%;
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
