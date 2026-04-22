import { readdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import postcss from 'postcss'
import tailwind from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

const root = process.cwd()
const inputPath = resolve(root, 'styles/daisy.input.css')
const outputPath = resolve(root, 'styles/daisy.generated.css')

const inputCss = await readFile(inputPath, 'utf8')

const postcssResult = await postcss([tailwind(), autoprefixer]).process(inputCss, {
  from: inputPath,
})

function hardenDaisyIsolation(css) {
  return css
    // Keep Tailwind runtime variables inside DaisyUI scope only.
    .replace(/\*\s*,\s*:before\s*,\s*:after\s*,\s*::backdrop/g, '.dui-scope, .dui-scope *, .dui-scope::before, .dui-scope::after, .dui-scope::backdrop')
    .replace(/:root\s*,\s*:host/g, '.dui-scope')
    .replace(/:root\s*\{/g, '.dui-scope {')
    // Avoid any collision with external theme attributes.
    .replaceAll('data-theme', 'data-dui-theme')
    .replaceAll('[data-dui-theme="light"]', '.dui-scope[data-dui-theme="light"]')
    .replaceAll('[data-dui-theme="dark"]', '.dui-scope[data-dui-theme="dark"]')
    .replaceAll('.slidev-layout', '.dui-scope')
}

const hardenedCss = hardenDaisyIsolation(postcssResult.css)

async function loadLightningCss() {
  try {
    return await import('lightningcss')
  }
  catch {
    const pnpmStore = resolve(root, 'node_modules/.pnpm')
    const entries = await readdir(pnpmStore, { withFileTypes: true })
    const lightningPkg = entries
      .filter(e => e.isDirectory() && e.name.startsWith('lightningcss@'))
      .map(e => e.name)
      .sort()
      .at(-1)

    if (!lightningPkg)
      throw new Error('lightningcss package not found')

    const fallbackPath = resolve(pnpmStore, lightningPkg, 'node_modules/lightningcss/node/index.mjs')
    return await import(pathToFileURL(fallbackPath).href)
  }
}

const { transform } = await loadLightningCss()
const transformed = transform({
  filename: outputPath,
  code: Buffer.from(hardenedCss),
  minify: false,
  sourceMap: false,
  targets: {
    chrome: 100 << 16,
    firefox: 100 << 16,
    safari: 16 << 16,
  },
  drafts: {
    nesting: true,
    customMedia: true,
  },
})

const transformedCss = Buffer.from(transformed.code).toString('utf8')
const finalCss = hardenDaisyIsolation(transformedCss)

await writeFile(outputPath, finalCss)
console.log(`Generated ${outputPath} (${Buffer.byteLength(finalCss)} bytes)`)
