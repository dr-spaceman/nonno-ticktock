<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <picture>
    <source :srcset="`/gallery/${src}--small.webp`" type="image/webp" />
    <img :src="`/gallery/${src}--small.jpg`" :alt="alt" />
  </picture>
</template>
