<script setup lang="ts">
import { computed } from 'vue'

interface BrowserProfileProps {
  name: string
  logo: string
  producer: string
  website: string
  birth: string
  characteristics: string[]
  highlights: string[]
}

const props = defineProps<BrowserProfileProps>()

const websiteLabel = computed(() => {
  return props.website
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
})
</script>

<template>
  <section class="relative grid gap-3">
    <img
      :src="logo"
      :alt="`Logo di ${name}`"
      class="pointer-events-none absolute right-2 top-1 h-16 w-16 object-contain drop-shadow-md"
      loading="lazy"
      decoding="async"
    />

    <header class="card bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body p-3 pr-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
          <article class="card bg-base-100 border border-base-300">
            <div class="card-body p-3">
              <p class="m-0 text-[0.52rem] font-bold uppercase tracking-[0.08em] text-base-content/60">
                Produttore
              </p>
              <p class="m-0 text-[0.7rem] font-semibold text-base-content">
                {{ producer }}
              </p>
            </div>
          </article>

          <article class="card bg-base-100 border border-base-300">
            <div class="card-body p-3">
              <p class="m-0 text-[0.52rem] font-bold uppercase tracking-[0.08em] text-base-content/60">
                Nascita
              </p>
              <p class="m-0 text-[0.7rem] font-semibold text-base-content">
                {{ birth }}
              </p>
            </div>
          </article>

          <a
            :href="website"
            target="_blank"
            rel="noopener noreferrer"
            class="card bg-base-100 border border-base-300 hover:border-primary/40 transition-colors no-underline"
          >
            <div class="card-body p-3">
              <p class="m-0 text-[0.52rem] font-bold uppercase tracking-[0.08em] text-base-content/60">
                Sito
              </p>
              <p class="m-0 text-[0.65rem] font-semibold text-primary break-all">
                {{ websiteLabel }}
              </p>
            </div>
          </a>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <article class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body p-3">
          <h3 class="card-title text-sm">Caratteristiche</h3>
          <ul class="m-0 pl-4 space-y-1 text-[0.66rem] leading-snug">
            <li v-for="characteristic in characteristics" :key="characteristic">
              {{ characteristic }}
            </li>
          </ul>
        </div>
      </article>

      <article class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body p-3">
          <h3 class="card-title text-sm">Elementi interessanti</h3>
          <ul class="m-0 pl-4 space-y-1 text-[0.66rem] leading-snug">
            <li v-for="highlight in highlights" :key="highlight">
              {{ highlight }}
            </li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>
