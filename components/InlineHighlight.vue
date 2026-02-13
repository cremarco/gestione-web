<script setup lang="ts">
import { onSlideEnter } from '@slidev/client'
import { nextTick, ref } from 'vue'

type HighlightTone = 'yellow' | 'sky' | 'mint'

withDefaults(defineProps<{
  tone?: HighlightTone
}>(), {
  tone: 'yellow',
})

const highlightEl = ref<HTMLElement | null>(null)

function restartHighlightAnimation() {
  const el = highlightEl.value
  if (!el)
    return

  el.style.animation = 'none'
  // Force reflow so the browser restarts the keyframes.
  void el.offsetWidth
  el.style.animation = ''
}

onSlideEnter(async () => {
  await nextTick()
  restartHighlightAnimation()
})
</script>

<template>
  <span ref="highlightEl" class="inline-highlight" :class="`inline-highlight--${tone}`">
    <slot />
  </span>
</template>
