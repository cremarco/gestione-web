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

type SlideFrontmatter = {
  lesson?: number | string
  lessonTone?: LessonTone
}

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

const lessonProgress = computed(() => {
  const slideIndex = nav.currentSlideNo.value - 1
  const allSlides = nav.slides.value

  if (slideIndex < 0 || allSlides.length === 0)
    return null

  let lesson: number | string | null = null
  let lessonTone: LessonTone | undefined
  let lessonStart = -1

  for (let i = slideIndex; i >= 0; i -= 1) {
    const fm = allSlides[i]?.meta?.slide?.frontmatter as SlideFrontmatter | undefined
    if (fm?.lesson === undefined || fm.lesson === null || fm.lesson === '')
      continue

    lesson = fm.lesson
    lessonTone = fm.lessonTone
    lessonStart = i

    for (let j = i - 1; j >= 0; j -= 1) {
      const prevFm = allSlides[j]?.meta?.slide?.frontmatter as SlideFrontmatter | undefined
      if (prevFm?.lesson === undefined || prevFm.lesson === null || prevFm.lesson === '')
        continue
      if (`${prevFm.lesson}` !== `${lesson}`)
        break

      lessonStart = j
      if (prevFm.lessonTone)
        lessonTone = prevFm.lessonTone
    }

    break
  }

  if (lesson === null || lessonStart < 0)
    return null

  let lessonEnd = allSlides.length - 1
  for (let i = lessonStart + 1; i < allSlides.length; i += 1) {
    const fm = allSlides[i]?.meta?.slide?.frontmatter as SlideFrontmatter | undefined
    if (fm?.lesson === undefined || fm.lesson === null || fm.lesson === '')
      continue
    if (`${fm.lesson}` === `${lesson}`)
      continue

    lessonEnd = i - 1
    break
  }

  const totalSlides = Math.max(1, lessonEnd - lessonStart + 1)
  const currentInLesson = Math.min(
    totalSlides,
    Math.max(1, slideIndex - lessonStart + 1),
  )
  const percent = (currentInLesson / totalSlides) * 100
  const tone = lessonTone && toneToHex[lessonTone] ? toneToHex[lessonTone] : '#334155'

  return {
    lesson,
    currentInLesson,
    totalSlides,
    percent,
    tone,
  }
})

const lessonProgressStyle = computed(() => {
  if (!lessonProgress.value)
    return {}

  return {
    '--lesson-progress-color': lessonProgress.value.tone,
    '--lesson-progress-value': `${lessonProgress.value.percent.toFixed(2)}%`,
  } as Record<string, string>
})

const lessonProgressCounter = computed(() => {
  if (!lessonProgress.value)
    return ''

  return `${lessonProgress.value.currentInLesson}/${lessonProgress.value.totalSlides}`
})
</script>

<template>
  <div
    v-if="lessonProgress"
    class="lesson-progress"
    :style="lessonProgressStyle"
    aria-hidden="true"
  >
    <div class="lesson-progress__track">
      <div class="lesson-progress__fill" />
    </div>
    <div class="lesson-progress__counter">{{ lessonProgressCounter }}</div>
  </div>
</template>
