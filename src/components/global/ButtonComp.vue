<script setup>
defineProps({
    'name': String,
    'padding': String,
    'disabled': {
        type: Boolean,
        default: false
    }
});
</script>
<template>
    <div>
        <button
            class="btn"
            @click="$emit('click')"
            :style="{ padding: padding }"
            :disabled="disabled"
        >
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
    background-color: var(--primary-color);
    color: #fff;
    border-radius: 8px;
    border: none;
    padding: .30rem .25rem;
    width: 100%;
    font-family: "IBM Plex Sans", sans-serif;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid transparent;
    font-size: 0.8rem;
    font-weight: 700;
}

.btn:hover:not(:disabled) {
    background-color: #fff;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    cursor: pointer;
}

.btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
</style>
