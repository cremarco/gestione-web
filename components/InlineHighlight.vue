<script setup lang="ts">
type HighlightTone = 'yellow' | 'sky' | 'mint'

withDefaults(defineProps<{
  tone?: HighlightTone
}>(), {
  tone: 'yellow',
})
</script>

<template>
  <span class="inline-highlight" :class="`inline-highlight--${tone}`">
    <slot />
  </span>
</template>
