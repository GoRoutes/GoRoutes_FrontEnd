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
label{
    font-size: 1.2rem;
    margin-bottom: .5rem;
    color: var(--primary-color);
}
input{
    width: 100%;
    height: 2.5rem;
    border-radius: 10px;
    border: 1px solid var(--primary-color);
    padding: 1rem;
}
.subtext{
    font-size: 1rem;
    color: var(--primary-color);
    margin-top: .25rem;
    text-align: end;
    text-decoration: none;
    cursor: pointer;
}
</style>