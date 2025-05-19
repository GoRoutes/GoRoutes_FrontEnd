<script setup>
import { ref, defineProps } from "vue";
defineProps({
    "label": String,
    "type": String,
    "placeholder": String,
    "value": String,
    "haveSubtext": Boolean,
    "subtext": String,
    "subtextLink": String,
});
const text = ref("");
</script>
<template>
    <div>
        <label for="">{{ label }}</label>
        <input :type="type" :placeholder="placeholder" v-model="text" />
        <a :href="subtextLink" v-if="haveSubtext" class="subtext"> {{ subtext }}</a>
    </div>
</template>
<style scoped>
div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: .5rem auto;
}

label {
    font-size: 0.8rem;
    margin-bottom: .3rem;
    font-weight: 500;
    color: var(--primary-color);
}

input {
    width: 100%;
    height: 2rem;
    border-radius: 8px;
    border: 1px solid #00000080;
    padding: 1rem 0.5rem;
    color: black
}

input::placeholder {
    font-size: 0.8rem;
    color: gray;
}

.subtext {
    font-size: 0.8rem;
    margin-top: .25rem;
    text-align: end;
    text-decoration: none;
    cursor: pointer;
}

</style>