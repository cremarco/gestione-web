# Slide del corso

## GESTIONE DELL'INFORMAZIONE IN RETE: STRUMENTI E STRATEGIE

- Facoltà: LETTERE E FILOSOFIA
- Corso: LAUREA TRIENNALE IN LINGUAGGI DEI MEDIA
- Università: Università Cattolica
- Docente: Cremaschi Marco

Le slide sono realizzate con [Slidev](https://github.com/slidevjs/slidev).

To start the slide show:

- `pnpm install`
- `pnpm dev`
- visit <http://localhost:3030>

Edit the [slides.md](./slides.md) to see the changes.

Learn more about Slidev at the [documentation](https://sli.dev/).

## Barra di avanzamento lezione

- Ogni slide eredita la lezione corrente dal frontmatter (`lesson`) e il relativo colore (`lessonTone`).
- In basso viene mostrata una barra di avanzamento che riparte a ogni nuova lezione.
- La barra usa il colore della lezione e mostra solo la posizione corrente (`slide corrente / slide totali della lezione`), ad esempio `15/15`.
- La logica è in `global-bottom.vue` e lo stile in `styles/index.css`.

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
