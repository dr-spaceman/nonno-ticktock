<script setup>
import GalleryImage from '../components/GalleryImage.vue'

const images = [
  { src: 'house-front', alt: 'Front view of the beach house' },
  { src: 'porch-sunset', alt: 'The porch at sunset, overlooking the bay dock' },
  { src: 'nonnos-chair', alt: 'Comfy chair for viewing water traffic' },
  { src: 'strawberry-room', alt: 'Downstairs bedroom' },
]
</script>

<template>
  <div class="about">
    <h2>About</h2>
    <p>
      Nonno & Ticktock's is a house nestled between the sandy treeline and the
      shores of Rehoboth Bay.
    </p>
    <p>
      With dock access, four bedrooms, and a short drive to the beaches at
      Rehoboth, it's a delightful retreat for families and groups of friends.
    </p>

    <ul class="gallery">
      <li v-for="{ src, alt } in images" :key="src">
        <GalleryImage :src="src" :alt="alt" />
      </li>
    </ul>
  </div>
</template>

<style>
.about {
  max-width: 800px;
  margin: 0 auto;
}

.gallery {
  max-height: 800px;
  margin: 2em 0 0;
  display: flex;
  gap: 8px;
  list-style: none;
  overflow: auto;
  scroll-snap-type: x mandatory;
}

.gallery li {
  scroll-snap-align: start;
  width: 100%;
  height: 600px;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
}

.gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
