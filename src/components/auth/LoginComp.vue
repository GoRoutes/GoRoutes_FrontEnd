<script setup>
import { ref } from "vue";
import InputComp from "./InputComp.vue";
import ButtonComp from "./ButtonComp.vue";
import LogoComp from "./LogoComp.vue";
</script>
<template>
    <div class="login-container">
        <LogoComp />
        <div class="form-container">
            <InputComp label="Email" type="email" placeholder="Enter your email" v-model="email" />
            <InputComp label="Password" type="password" placeholder="Enter your password" v-model="password" />
            <ButtonComp name="Login" @click="handleLogin" />
        </div>
    </div>
</template>
<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 28%;
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
</style>