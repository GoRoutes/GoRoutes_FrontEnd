<script setup>
import { ref, defineProps } from "vue";
const props = defineProps({
    label: String,
    type: String,
    placeholder: String,
    value: String,
    haveSubtext: Boolean,
    subtext: String,
    subtextLink: String,
    paddingProps: String,
});
const text = ref("");
</script>
<template>
    <div>
        <label for="">{{ props.label }}</label>
        <input :type="props.type" :placeholder="props.placeholder" v-model="text" :style="{padding: props.paddingProps}" />
        <a :href="props.subtextLink" v-if="props.haveSubtext" class="subtext"> {{ props.subtext }}</a>
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
    font-size: 1rem;
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
    color: black;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

input::placeholder {
    font-size:1rem;
    color: gray;
    text-align: left;

}

.subtext {
    font-size: 0.8rem;
    margin-top: .25rem;
    text-align: end;
    text-decoration: none;
    cursor: pointer;
}

</style>