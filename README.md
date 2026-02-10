# Welcome to [Slidev](https://github.com/slidevjs/slidev)!

To start the slide show:

- `pnpm install`
- `pnpm dev`
- visit <http://localhost:3030>

Edit the [slides.md](./slides.md) to see the changes.

Learn more about Slidev at the [documentation](https://sli.dev/).

## Tailwind + Heroicons

- Tailwind CSS e configurato in `styles/index.css`.
- PostCSS usa il plugin ufficiale in `postcss.config.mjs`.
- Icon set ufficiale Tailwind: `@heroicons/vue`.

Esempio in una slide:

```md
<script setup lang="ts">
import { SparklesIcon } from '@heroicons/vue/24/solid'
</script>

<div class="flex items-center gap-2 text-emerald-600">
  <SparklesIcon class="h-6 w-6" />
  <span class="text-xl font-semibold">Tailwind + Heroicons</span>
</div>
```
