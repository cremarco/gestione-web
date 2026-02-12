<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
}>(), {
  label: 'Nota',
})
</script>

<template>
  <p class="inline-notice" role="note">
    <span class="inline-notice__label">{{ label }}:</span>
    <span class="inline-notice__body">
      <slot />
    </span>
  </p>
</template>
