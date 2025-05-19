<script setup>
defineProps({
  imagesrc: String,
})
</script>
<template>
  <div class="imgBg">
    <img :src=imagesrc alt="">
  </div>
</template>
<style>
.imgBg{
    z-index: -10;
    position: fixed;
    bottom: 0;
    top: 0;
    right: 0;
}
</style>
