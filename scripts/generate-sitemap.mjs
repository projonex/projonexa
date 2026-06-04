import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import fs from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const OUTPUT_FILE = new URL('../public/sitemap.xml', import.meta.url)

async function loadSitemapHelpers() {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'projonexa-sitemap-'))
  const entryFile = path.join(tempDir, 'entry.ts')
  const bundleFile = path.join(tempDir, 'bundle.mjs')

  const repoRoot = process.cwd()
  const sitemapPath = path.join(repoRoot, 'src/lib/seo/sitemap-urls.ts').replaceAll('\\', '/')

  await writeFile(
    entryFile,
    `export {
  collectSitemapEntries,
  absoluteUrl,
  sitemapChangeFrequency,
  sitemapPriority,
} from '${sitemapPath}';\n`,
    'utf8',
  )

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

    return import(`${pathToFileURL(bundleFile).href}?v=${Date.now()}`)
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }
}

const {
  collectSitemapEntries,
  absoluteUrl,
  sitemapChangeFrequency,
  sitemapPriority,
} = await loadSitemapHelpers()

const today = new Date().toISOString().slice(0, 10)
const entries = collectSitemapEntries()

const urls = entries
  .sort((a, b) => a.path.localeCompare(b.path))
  .map((entry) => {
    const loc = absoluteUrl(entry.path)
    const changefreq = sitemapChangeFrequency(entry.intent)
    const priority = sitemapPriority(entry.path, entry.intent).toFixed(2)
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  })

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

await fs.writeFile(OUTPUT_FILE, xml, 'utf8')
console.log(`Generated sitemap with ${urls.length} URLs`)
