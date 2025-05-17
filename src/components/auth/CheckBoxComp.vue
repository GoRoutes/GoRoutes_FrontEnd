<script setup>
defineProps({
    label: {
        type: String,
        default: "Checkbox"
    },
    value: {
        type: Boolean,
        default: false
    }
})
</script>
<template>
    <div class="container-checkbox">
        <input type="checkbox" id="checkbox" class="checkbox" />
        <label for="checkbox" class="label">{{ label }}</label>
    </div>
</template>
<style scoped>
.container-checkbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* cursor: pointer; */
}
.checkbox {
    border: 2px solid var(--primary-color);
    width: 20px;
    height: 20px;
    border-radius: 5px;
}
.checkbox:checked {
    background-color: var(--primary-color);
    border: 2px solid var(--primary-color);
}
.label {
    font-size: .8rem;
    margin-left: 0.5rem;
    color: var(--secondary-color);
}

</style>