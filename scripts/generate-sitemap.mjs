import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import fs from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const OUTPUT_FILE = new URL('../public/sitemap.xml', import.meta.url)

const XML_HEADER = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>`

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
  formatSitemapLastMod,
  sitemapChangeFrequency,
  sitemapPriority,
  sortSitemapEntries,
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
  formatSitemapLastMod,
  sitemapChangeFrequency,
  sitemapPriority,
  sortSitemapEntries,
} = await loadSitemapHelpers()

const entries = sortSitemapEntries(collectSitemapEntries())

const urls = entries.map((entry) => {
  const loc = absoluteUrl(entry.path)
  const lastmod = formatSitemapLastMod(entry.lastModified)
  const changefreq = sitemapChangeFrequency(entry.path, entry.intent)
  const priority = sitemapPriority(entry.path, entry.intent).toFixed(2)
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
})

const xml = `${XML_HEADER}
${urls.join('\n')}
</urlset>
`

await fs.writeFile(OUTPUT_FILE, xml, 'utf8')
console.log(`Generated sitemap with ${urls.length} URLs → public/sitemap.xml`)
