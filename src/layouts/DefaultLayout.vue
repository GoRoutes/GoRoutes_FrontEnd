<script setup>
import { RouterView } from 'vue-router'
import { HeaderMain, AsideMain } from '@/components'
</script>

<template>

    <div class="main-default">
        <div class="header">
            <HeaderMain />
        </div>
        <div class="grid">
            <div class="aside">
                <AsideMain />
            </div>
            <div class="view">
                <RouterView />
            </div>
        </div>
    </div>

</template>

<style scoped>
.main-default {
    display: grid;
    grid-template-rows: 10% 90%;
    height: 100vh;
}

.header {
    width: 100%;
    height: 100%;
}

.grid {
    display: grid;
    grid-template-columns: 13% 87%;
}

/* .main-default div {
    border: 1px solid #000;
} */

@media screen and (max-width: 1024px) {
    .grid {
        display: flex;
    }


}
</style>