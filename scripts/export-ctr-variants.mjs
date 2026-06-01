import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const OUTPUT_FILE = new URL('../docs/SEO_CTR_VARIANTS.csv', import.meta.url)

async function loadSeoData() {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'projonexa-ctr-'))
  const entryFile = path.join(tempDir, 'entry.ts')
  const bundleFile = path.join(tempDir, 'bundle.mjs')

  const repoRoot = process.cwd()
  const seoPath = path.join(repoRoot, 'src/data/seo.ts').replaceAll('\\', '/')

  await writeFile(entryFile, `export { PAGE_SEO } from '${seoPath}';\n`, 'utf8')

  try {
    await build({
      entryPoints: [entryFile],
      bundle: true,
      platform: 'node',
      format: 'esm',
      target: 'node20',
      outfile: bundleFile,
      logLevel: 'silent',
    })

    const mod = await import(`${pathToFileURL(bundleFile).href}?v=${Date.now()}`)
    return mod.PAGE_SEO
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }
}

const pageSeo = await loadSeoData()
const rows = [['pageKey', 'path', 'type', 'variantIndex', 'value']]

for (const [pageKey, page] of Object.entries(pageSeo)) {
  if (!page.ctrVariants) continue

  for (const [index, title] of page.ctrVariants.titles.entries()) {
    rows.push([pageKey, page.path, 'title', String(index + 1), title])
  }

  for (const [index, description] of page.ctrVariants.descriptions.entries()) {
    rows.push([pageKey, page.path, 'description', String(index + 1), description])
  }
}

const escapeCell = (value) => `"${String(value).replaceAll('"', '""')}"`
const csv = rows.map((row) => row.map(escapeCell).join(',')).join('\n') + '\n'

await writeFile(OUTPUT_FILE, csv, 'utf8')
console.log(`Exported CTR variants for ${rows.length - 1} entries to docs/SEO_CTR_VARIANTS.csv`)
