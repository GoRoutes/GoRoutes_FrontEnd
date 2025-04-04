<script setup>
import { ref, defineProps } from "vue";

defineProps({
    'name': String,
});
</script>
<template>
    <div>
        <button class="btn" @click="$emit('click')">
            {{ name }}
        </button>
    </div>
</template>
<style scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 1rem auto 0 auto;
}
.btn{
    transition: all 0.3s ease-in-out;
    background-color: var(--primary-color);
    color: #fff;
    /* font-size: 1.2rem; */
    border-radius: 10px;
    border: none;
    padding: .25rem;
    width: 100%;
}
.btn:hover{
    background-color: #fff;
    color: var(--primary-color);
    cursor: pointer;
}
</style>