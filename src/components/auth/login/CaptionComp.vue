<script setup>
import { defineProps } from "vue";
defineProps({
    "pCaption": String,
    "link": String,
    "txtLink": String,
});
</script>
<template>
    <div class="caption">
        <p>{{ pCaption }}</p>
        <router-link :to="link">{{ txtLink }}</router-link>
    </div>
</template>
<style scoped>
.caption {
    display: flex;
}

.caption p {
    font-size: 0.8rem;
    margin-top: .25rem;
    color: var(--comment-color);
}

.caption a {
    font-size: 0.8rem;
    margin-top: .25rem;
    margin-left: 3px;
    text-decoration: none;
    cursor: pointer;
    color: #2D1C5B;
}
</style>