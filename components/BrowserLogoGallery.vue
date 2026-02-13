<script setup lang="ts">
import { computed, ref } from 'vue'

type BrowserFilterId = 'all' | 'agentic' | 'chromium' | 'gecko' | 'webkit' | 'privacy'
type BrowserCategory = Exclude<BrowserFilterId, 'all'>

interface BrowserFilter {
  id: BrowserFilterId
  label: string
}

interface BrowserItem {
  name: string
  logo: string
  website: string
  categories: BrowserCategory[]
}

const filters: BrowserFilter[] = [
  { id: 'all', label: 'Tutti' },
  { id: 'agentic', label: 'Agentici' },
  { id: 'chromium', label: 'Basati su Chromium' },
  { id: 'gecko', label: 'Motore Gecko' },
  { id: 'webkit', label: 'Motore WebKit' },
  { id: 'privacy', label: 'Privacy-first' },
]

const browsers: BrowserItem[] = [
  {
    name: 'Google Chrome',
    logo: 'https://api.iconify.design/logos:chrome.svg',
    website: 'https://www.google.com/chrome/',
    categories: ['chromium'],
  },
  {
    name: 'Microsoft Edge',
    logo: 'https://api.iconify.design/logos:microsoft-edge.svg',
    website: 'https://www.microsoft.com/edge',
    categories: ['chromium', 'agentic'],
  },
  {
    name: 'Opera',
    logo: 'https://api.iconify.design/logos:opera.svg',
    website: 'https://www.opera.com/',
    categories: ['chromium', 'agentic'],
  },
  {
    name: 'Brave',
    logo: 'https://api.iconify.design/logos:brave.svg',
    website: 'https://brave.com/',
    categories: ['chromium', 'agentic', 'privacy'],
  },
  {
    name: 'Vivaldi',
    logo: 'https://api.iconify.design/logos:vivaldi-icon.svg',
    website: 'https://vivaldi.com/',
    categories: ['chromium'],
  },
  {
    name: 'Arc',
    logo: 'https://api.iconify.design/logos:arc.svg',
    website: 'https://arc.net/',
    categories: ['chromium', 'agentic'],
  },
  {
    name: 'Mozilla Firefox',
    logo: 'https://api.iconify.design/logos:firefox.svg',
    website: 'https://www.mozilla.org/firefox/',
    categories: ['gecko'],
  },
  {
    name: 'Safari',
    logo: 'https://api.iconify.design/logos:safari.svg',
    website: 'https://www.apple.com/safari/',
    categories: ['webkit'],
  },
  {
    name: 'Tor Browser',
    logo: 'https://api.iconify.design/logos:tor-browser.svg',
    website: 'https://www.torproject.org/',
    categories: ['gecko', 'privacy'],
  },
  {
    name: 'DuckDuckGo Browser',
    logo: 'https://api.iconify.design/logos:duckduckgo.svg',
    website: 'https://duckduckgo.com/app',
    categories: ['webkit', 'privacy'],
  },
]

const activeFilter = ref<BrowserFilterId>('all')

const visibleBrowsers = computed(() => {
  if (activeFilter.value === 'all') {
    return browsers
  }

  return browsers.filter((browser) => browser.categories.includes(activeFilter.value))
})
</script>

<template>
  <section class="mt-1" aria-label="Browser con filtro per categoria">
    <div class="flex flex-wrap gap-2" role="group" aria-label="Filtro tipologia browser">
      <button
        v-for="filter in filters"
        :key="filter.id"
        type="button"
        class="btn btn-sm rounded-full"
        :class="filter.id === activeFilter ? 'btn-primary' : 'btn-outline'"
        :aria-pressed="filter.id === activeFilter"
        @click="activeFilter = filter.id"
      >
        {{ filter.label }}
      </button>
    </div>

    <div class="mt-3">
      <div class="badge badge-neutral badge-sm">
        {{ visibleBrowsers.length }} / {{ browsers.length }} browser
      </div>
    </div>

    <div class="mt-3 grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-2">
      <article
        v-for="browser in visibleBrowsers"
        :key="browser.name"
        class="card h-[4.7rem] bg-base-100 border border-base-300 shadow-sm"
      >
        <div class="card-body p-2 flex flex-col items-center justify-start gap-1">
          <img
            :src="browser.logo"
            :alt="`Logo di ${browser.name}`"
            class="h-7 w-7 object-contain"
            loading="lazy"
            decoding="async"
          />

          <div class="relative w-full">
            <p
              class="m-0 text-center text-[0.55rem] leading-tight font-semibold text-base-content pr-4"
              :title="browser.name"
              style="display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;"
            >
              {{ browser.name }}
            </p>

            <a
              class="btn btn-ghost btn-xs absolute right-0 top-0 min-h-0 h-4 w-4 p-0"
              :href="browser.website"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Apri il sito di ${browser.name}`"
              :title="`Apri ${browser.name}`"
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                class="h-3 w-3"
              >
                <path d="M7 13L13 7" />
                <path d="M8 7h5v5" />
                <path d="M13 11v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3" />
              </svg>
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
