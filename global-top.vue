<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

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

const nav = useNav()

const toneToHex: Record<LessonTone, string> = {
  indigo: '#4f46e5',
  sky: '#0284c7',
  emerald: '#059669',
  amber: '#d97706',
  rose: '#e11d48',
  violet: '#7c3aed',
  teal: '#0d9488',
  fuchsia: '#c026d3',
  cyan: '#0891b2',
  orange: '#ea580c',
}

const ribbon = computed(() => {
  const slideIndex = nav.currentSlideNo.value - 1
  const allSlides = nav.slides.value

  for (let i = slideIndex; i >= 0; i -= 1) {
    const fm = allSlides[i]?.meta?.slide?.frontmatter as any
    const lesson = fm?.lesson
    if (!lesson)
      continue

    const tone = fm.lessonTone as LessonTone | undefined
    const bg = tone && toneToHex[tone] ? toneToHex[tone] : '#0f172a'

    return {
      label: `Lezione ${lesson}`,
      bg,
    }
  }

  return null
})
</script>

<template>
  <div v-if="ribbon" class="lesson-ribbon-wrap" aria-hidden="true">
    <div class="lesson-ribbon" :style="{ backgroundColor: ribbon.bg }">
      {{ ribbon.label }}
    </div>
  </div>
</template>

