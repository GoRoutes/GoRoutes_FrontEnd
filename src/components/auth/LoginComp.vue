<script setup>
import InputComp from "./InputComp.vue";
import ButtonComp from "./ButtonComp.vue";
import LogoComp from "./LogoComp.vue";
</script>
<template>
    <div class="container">
    <div class="login-container">
        <LogoComp />
        <div class="form-container">
            <InputComp label="Email" type="email" placeholder="Enter your email" v-model="email" haveSubtext="false" />
            <InputComp label="Password" type="password" placeholder="Enter your password" v-model="password" haveSubtext="true" subtext="Forgot password?" />
            <ButtonComp name="Login" @click="handleLogin" padding=".5rem" />
        </div>
    </div>
    <div class="aside">
        <div></div>
        <div></div>
    </div>
</div>
</template>
<style scoped>
.container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100%;
}
.aside{
    margin: auto;
    gap: 1rem;
    width: 60%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.aside > div{
    width: 100%;
    min-height: 40vh;
    border-radius: 20px;
}
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
@media screen and (max-width: 768px) {
    .container {
        flex-direction: column;
        height: auto;
    }
    .login-container {
        width: 100%;
        padding: 2rem 0;
    }
    .aside{
        display: none;
    }
    .form-container {
        width: 100%;
        padding: 0 1rem 1rem 1rem;
    }  
}
</style>