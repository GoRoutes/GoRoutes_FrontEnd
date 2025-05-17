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
        </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Homenaje&display=swap');

.logo-container {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    margin: 0 5%;
}
.logo-container h1 {
    color: var(--primary-color);
    text-align: start;
    font-size: 2.2rem;
    font-family: "Homenaje", sans-serif;
}
.logo {
    width: 22%;
    /* height: 30%; */
}
.logo-text {
    margin-top: 5%;
    width: 85%;
    margin: 2% auto;
    color: var(--primary-color);
    font-size: 1.8rem;
    font-weight: 500;
    text-align:  start;
    font-family: "Homenaje", sans-serif;
}
.logo-subtext {
    color: var(--secundary-color);
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    margin-bottom: 1rem;
}
</style>