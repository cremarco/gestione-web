<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  icon?: string
  tone?: "indigo" | "lime"
  label?: string
}>(), {
  tone: "indigo",
  label: "",
})
</script>

<template>
  <div class="bg-white dark:bg-[#1b1b1b] dark:border dark:border-white/8 rounded-xl shadow-lg shadow-black/5 dark:shadow-black/50 p-6 flex flex-col items-start h-full relative overflow-hidden">
    <div
      v-if="props.icon"
      :class="props.icon"
      class="absolute -right-8 -top-8 transform rotate-12 pointer-events-none text-9xl text-orange-500/10 dark:text-orange-400/10"
    />

    <div class="relative z-10 w-full">
      <p
        v-if="props.label"
        class="mb-2 text-[0.67rem] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400"
      >
        {{ props.label }}
      </p>
      <h3 class="slide-card-title mb-4 min-h-[3.5rem]">
        {{ props.title }}
      </h3>
      <div class="slide-text text-left">
        <slot />
      </div>
    </div>
  </div>
</template>
