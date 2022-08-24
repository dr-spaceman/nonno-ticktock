<script setup>
import OverlayComponent from './OverlayComponent.vue'

defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    required: true,
  },
})
defineEmits(['onClose'])
</script>

<template>
  <OverlayComponent v-if="active" @click="$emit('onClose')" />
  <div v-if="active" role="dialog" aria-modal :aria-label="label" class="modal">
    <header>
      <slot name="header"></slot>
      <button
        aria-label="Close this dialog"
        @click="$emit('onClose')"
        class="close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 50vw;
  height: auto;
  background-color: var(--color-background);
  border-radius: var(--border-radius);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
