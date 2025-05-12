<script setup>
defineProps({
    "title": String
});
</script>
<template>
    <div class="logo-container">
        <img src="../../assets/images/LogoRemoved.png" alt="Logo" class="logo" />
        <h1>GoRoutes</h1>
    </div>
    <div class="text-container">
            <h1 class="logo-text">{{ title }}</h1>
            <!-- <p class="logo-subtext">Please enter your details to log in</p> -->
        </div>
</template>
<style scoped>
.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
}
.logo-container h1 {
    color: var(--primary-color);
    font-size: 2.5rem;
    font-weight: 700;
}
.logo {
    width: 80%;
}
.logo-text {
    margin-top: 5%;
    width: 80%;
    margin: 5% auto;
    color: var(--primary-color);
    font-size: 1.7rem;
    font-weight: 500;
    text-align:  center;
}
.logo-subtext {
    color: var(--secundary-color);
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    margin-bottom: 1rem;
}
</style>