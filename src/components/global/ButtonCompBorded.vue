<script setup>
defineProps({
    'name': String,
    'padding': String,
});
</script>
<template>
    <div>
        <button class="btn" @click="$emit('click')" :style="{ padding: padding }">
            {{ name }}
        </button>
    </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap');

div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 1rem auto 0 auto;
}

.btn {
    transition: all 0.3s ease-in-out;
    background-color: transparent;
    color: var(--primary-color);
    border-radius: 8px;
    border: 2px solid var(--primary-color);
    padding: .30rem .25rem;
    width: 100%;
    font-family: "IBM Plex Sans", sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
}

.btn:hover {
    background-color: var(--primary-color);
    color: #fff;
    cursor: pointer;
}
</style>