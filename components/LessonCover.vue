<script setup lang="ts">
import { computed } from 'vue'

type LessonTone =
  | 'indigo'
  | 'sky'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'violet'
  | 'teal'
  | 'fuchsia'
  | 'cyan'
  | 'orange'

const props = withDefaults(defineProps<{
  lesson: number | string
  title: string
  tone?: LessonTone
}>(), {
  tone: 'indigo',
})

const tonePalette: Record<LessonTone, { bg: string }> = {
  indigo: { bg: '#4338ca' },
  sky: { bg: '#0284c7' },
  emerald: { bg: '#059669' },
  amber: { bg: '#d97706' },
  rose: { bg: '#e11d48' },
  violet: { bg: '#7c3aed' },
  teal: { bg: '#0d9488' },
  fuchsia: { bg: '#c026d3' },
  cyan: { bg: '#0891b2' },
  orange: { bg: '#ea580c' },
}

const styleVars = computed(() => {
  const palette = tonePalette[props.tone]
  return {
    '--lesson-cover-bg': palette.bg,
  } as Record<string, string>
})

const lessonLabel = computed(() => `Lezione ${props.lesson}`)
</script>

<template>
  <section class="lesson-cover" :style="styleVars">
    <div class="lesson-cover__content">
      <p class="lesson-cover__lesson">{{ lessonLabel }}</p>
      <h1 class="lesson-cover__title">{{ title }}</h1>
    </div>
  </section>
</template>
