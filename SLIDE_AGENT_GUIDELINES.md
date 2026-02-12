# Linee Guida Slide (per Agent)

Questo file definisce regole pratiche per creare nuove slide in questo progetto Slidev mantenendo coerenza visiva e didattica.

## File di riferimento

- `/Users/marco/Sites/Gestione web/slides.md`
- `/Users/marco/Sites/Gestione web/styles/index.css`
- `/Users/marco/Sites/Gestione web/components/LessonCover.vue`
- `/Users/marco/Sites/Gestione web/components/InlineNotice.vue`
- `/Users/marco/Sites/Gestione web/components/InlineHighlight.vue`
- `/Users/marco/Sites/Gestione web/global-top.vue`
- `/Users/marco/Sites/Gestione web/global-bottom.vue`

## 1) Regole base del deck

- File principale: tutte le slide stanno in `slides.md`.
- Ogni slide e separata da `---`.
- Le note relatore usano commenti HTML alla fine della slide:
  `<!-- Relatore: ... -->`.
- Headmatter globale da mantenere (salvo richiesta esplicita):
  - `theme: default`
  - `mdc: true`
  - `drawings.persist: false`
  - `duration: 30min`

## 2) Pattern standard per una nuova lezione

Ogni nuova lezione dovrebbe avere questa apertura:

1. Slide cover lezione con `LessonCover`.
2. Prima slide contenuto con colore lezione (`bg-<tone>-100`) e metadati lezione.
3. Slide contenuto con alternanza di transizioni semplici (`fade`, `slide-left`, `slide-up`).
4. Slide finale opzionale `layout: center` con "Domande" o chiusura.

Template minimo:

```md
---
layout: none
class: lesson-cover-slide
lesson: 11
lessonTone: indigo
lessonCover: true
---

<LessonCover :lesson="11" title="Titolo Lezione" tone="indigo" />

---
transition: slide-left
class: bg-indigo-100
lesson: 11
lessonTone: indigo
---

# Titolo sezione

Contenuto introduttivo.

<!--
Relatore:
- Obiettivo della slide
- Messaggio chiave
-->
```

## 3) Regole layout

- `layout: none`: usare per cover di lezione con `LessonCover`.
- `layout: center`: usare per slide molto brevi (es. "Domande").
- `layout: two-cols`: usare per confronti sinistra/destra.
- Layout implicito (`default`): usare per la maggior parte delle slide contenuto.

Non introdurre nuovi layout custom se non richiesto.

## 4) Regole transizioni

- Preferire transizioni gia usate nel deck: `fade`, `slide-left`, `slide-up`, `fade-out`.
- Evitare transizioni non presenti o troppo invasive.
- Usare `fade-out` solo in passaggi di chiusura blocco/lezione.

## 5) Regole cromatiche e tono lezione

Toni supportati (allineati con componenti/global ribbon):

- `indigo`
- `sky`
- `emerald`
- `amber`
- `rose`
- `violet`
- `teal`
- `fuchsia`
- `cyan`
- `orange`

Regola pratica:

- `lessonTone` nel frontmatter deve coincidere col `tone` di `LessonCover`.
- La prima slide contenuto usa `class: bg-<tone>-100`.

## 6) Componenti da riusare

- `LessonCover`: cover di ogni lezione.
- `InlineNotice`: note brevi in evidenza dentro una slide.
- `InlineHighlight`: evidenziazione inline di parole/frasi importanti.

Esempi:

```md
<InlineNotice label="Implicazione">
  Testo breve con conseguenza operativa.
</InlineNotice>
```

```md
Termine chiave: <InlineHighlight tone="sky">verifica delle fonti</InlineHighlight>.
```

## 7) Regole testo e densita contenuto

- 1 messaggio principale per slide.
- Preferire 3-6 punti elenco per sezione.
- Evitare blocchi troppo lunghi; spezzare in piu slide.
- Titoli chiari e orientati all'azione ("Come verificare una fonte", non "Considerazioni").
- Quando possibile, chiudere la slide con una frase operativa.

## 8) Regole link, media, accessibilita

- Link esterni in formato sicuro:
  `<a href="..." target="_blank" rel="noopener noreferrer">...</a>`.
- Immagini sempre con `alt` descrittivo.
- Evitare testo piccolo o contrasti deboli.
- Non affidare il significato solo al colore.

## 9) Convenzioni consigliate per l'agente

- Non cambiare headmatter globale senza richiesta.
- Non toccare `global-top.vue`, `global-bottom.vue` o `styles/index.css` per aggiunte di contenuto normale.
- Mantenere coerenza con la numerazione `lesson`.
- Se aggiungi una nuova lezione, crea sempre la coppia:
  - cover lezione
  - slide intro con `lesson` e `lessonTone`

## 10) Checklist prima di chiudere

- La slide compila senza errori (`pnpm dev`).
- Le transizioni sono coerenti con il deck.
- `lesson`, `lessonTone`, `tone` sono allineati.
- Nessuna slide troppo densa o fuori stile.
- Note relatore presenti nelle slide chiave.
- Link esterni con `target="_blank"` e `rel="noopener noreferrer"`.

