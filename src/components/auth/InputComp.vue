<script setup>
import { ref, defineProps } from "vue";

defineProps({
    "label": String,
    "type": String,
    "placeholder": String,
    "value": String,
});
const text = ref("");


</script>
<template>
    <div>
        <label for="">{{ label }}</label>
        <input :type="type" :placeholder="placeholder" v-model="text" />
    </div>
</template>
<style scoped>
div {
    display: flex;
    flex-direction: column;
    /* margin-bottom: 1rem; */
    width: 100%;
    margin: .5rem auto;
    /* padding: .5rem; */
}
label{
    font-size: 1.2rem;
    margin-bottom: .5rem;
    color: var(--primary-color);
    /* font-weight: 600; */
}
input{
    width: 100%;
    height: 2.5rem;
    border-radius: 10px;
    border: 1px solid var(--primary-color);
    padding: 1rem;
    /* font-size: 1rem; */
}
</style>