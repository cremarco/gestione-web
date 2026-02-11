<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const nav = useNav()

const pageLabel = computed(() => `${nav.currentSlideNo.value} / ${nav.total.value}`)
</script>

<template>
  <div class="page-number" aria-hidden="true">
    {{ pageLabel }}
  </div>
</template>

