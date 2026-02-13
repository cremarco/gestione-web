# Linee Guida Slide (per Agent)

Questo file definisce regole pratiche per creare nuove slide in questo progetto Slidev mantenendo coerenza visiva e didattica.

## File di riferimento

- `/Users/marco/Sites/Gestione web/slides.md`
- `/Users/marco/Sites/Gestione web/styles/index.css`
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

1. Slide cover lezione con componenti DaisyUI (`hero`, `badge`, `card`, `button`).
2. Prima slide contenuto con colore lezione (`bg-<tone>-100`) e metadati lezione.
3. Slide contenuto con alternanza di transizioni semplici (`fade`, `slide-left`, `slide-up`).
4. Slide finale obbligatoria `layout: center` con titolo `Domande?`.
5. La slide `Domande?` deve usare lo sfondo del colore lezione (`class: bg-<tone>-100`).
6. Il simbolo `?` deve avere una piccola animazione di comparsa (es. `v-click`).

Template minimo:

```md
---
layout: none
class: lesson-cover-slide
lesson: 11
lessonTone: indigo
lessonCover: true
---

<section class="hero min-h-[70vh] rounded-box bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-2xl">
      <span class="badge badge-primary badge-lg">Lezione 11</span>
      <h1 class="text-5xl font-bold mt-4">Titolo Lezione</h1>
      <p class="py-4 opacity-80">Sottotitolo o obiettivo della lezione.</p>
    </div>
  </div>
</section>

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

Template chiusura lezione (obbligatorio):

```md
---
layout: center
transition: slide-up
class: bg-indigo-100
lesson: 11
lessonTone: indigo
---

<h1 class="text-6xl font-black tracking-tight">
  Domande<span v-click class="text-primary">?</span>
</h1>
<p v-click class="mt-4 opacity-80">Spazio Q&A</p>
```

## 3) Regole layout

- `layout: none`: usare per cover costruite con markup + classi DaisyUI/Tailwind.
- `layout: center`: usare per slide molto brevi (es. "Domande").
- `layout: two-cols`: usare per confronti sinistra/destra.
- Layout implicito (`default`): usare per la maggior parte delle slide contenuto.

Non introdurre nuovi layout custom se non richiesto.

## 4) Regole transizioni

- Preferire transizioni gia usate nel deck: `fade`, `slide-left`, `slide-up`, `fade-out`.
- Evitare transizioni non presenti o troppo invasive.
- Usare `fade-out` solo in passaggi di chiusura blocco/lezione.
- Nella slide finale `Domande?` animare almeno un `?` con comparsa progressiva (`v-click` o equivalente).

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

- `lessonTone` nel frontmatter deve coincidere con il colore usato nei componenti DaisyUI della cover (es. `badge-*`, `alert-*`, varianti semantiche).
- La prima slide contenuto usa `class: bg-<tone>-100`.

## 6) Componenti da riusare

- Usare esclusivamente componenti DaisyUI per UI e pattern di slide.
- Componenti consigliati: `hero`, `card`, `alert`, `badge`, `button`, `tabs`, `table`, `steps`, `timeline`, `collapse`, `tooltip`.
- Per enfasi inline usare classi DaisyUI/Tailwind (es. `badge`, `font-semibold`, `text-primary`) senza componenti Vue custom.

Esempi:

```md
<div class="alert alert-info">
  <span>Implicazione: testo breve con conseguenza operativa.</span>
</div>
```

```md
Termine chiave: <span class="badge badge-info">verifica delle fonti</span>.
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

## 9) Contesto culturale e significato del colore

Quando scrivi slide che assegnano "significati" ai colori (es. fiducia, urgenza, successo):

- Psicologia del colore: indicazioni, non regole universali; dipende da contesto culturale, settore e pubblico.
- Lo stesso colore puo comunicare cose diverse in UI diverse: evita affermazioni deterministiche.
- Se usi colori semantici (successo/warning/errore), abbinali sempre a testo e/o icone: mai solo colore.
- Esempi ricorrenti (con cautela): blu -> fiducia/affidabilita; rosso -> urgenza/errore; verde -> conferma/successo; giallo/arancio -> energia/warning.
- Se il pubblico e internazionale o incerto: preferisci ruoli (primary/danger/warning) e verifica con esempi reali del dominio.

## 10) Convenzioni consigliate per l'agente

- Non cambiare headmatter globale senza richiesta.
- Non toccare `global-top.vue`, `global-bottom.vue` o `styles/index.css` per aggiunte di contenuto normale.
- Mantenere coerenza con la numerazione `lesson`.
- Nelle nuove slide usare solo componenti DaisyUI; non introdurre componenti UI custom non DaisyUI.
- In caso di conflitto, questa regola ha priorita su esempi o pattern piu vecchi presenti nel deck.
- Ogni lezione deve terminare con una slide `Domande?` con sfondo coerente al `lessonTone` e animazione sul simbolo `?`.
- Se aggiungi una nuova lezione, crea sempre la coppia:
  - cover lezione
  - slide intro con `lesson` e `lessonTone`

## 11) Checklist prima di chiudere

- La slide compila senza errori (`pnpm dev`).
- Le transizioni sono coerenti con il deck.
- `lesson`, `lessonTone`, `tone` sono allineati.
- Nessuna slide troppo densa o fuori stile.
- Nessun nuovo componente Vue custom per UI delle slide (solo DaisyUI).
- Ogni lezione termina con la slide `Domande?` su sfondo `bg-<tone>-100`.
- Il simbolo `?` nella slide finale ha animazione di comparsa.
- Note relatore presenti nelle slide chiave.
- Link esterni con `target="_blank"` e `rel="noopener noreferrer"`.
