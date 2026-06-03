import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import fs from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const BASE_URL = 'https://projonexa.com'
const OUTPUT_FILE = new URL('../public/sitemap.xml', import.meta.url)
const EXCLUDED_PATHS = new Set(['/research', '/inquiry/students', '/inquiry/corporate', '/404'])

async function loadSeoData() {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'projonexa-sitemap-'))
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

function isIndexablePath(pathname) {
  if (!pathname || EXCLUDED_PATHS.has(pathname)) return false
  if (pathname.includes('/:') || pathname.includes(':')) return false
  if (pathname.includes('*') || pathname.includes('[') || pathname.includes(']')) return false
  return true
}

function buildPriority(pathname, intent) {
  if (pathname === '/') return '1.0'
  if (intent === 'transactional') return '0.95'
  if (intent === 'commercial') return '0.90'
  if (intent === 'navigational') return '0.70'
  return '0.80'
}

function buildChangefreq(intent) {
  return intent === 'transactional' || intent === 'commercial' ? 'weekly' : 'monthly'
}

const pageSeo = await loadSeoData()
const today = new Date().toISOString().slice(0, 10)

const urls = Object.values(pageSeo)
  .filter((page) => isIndexablePath(page.path))
  .sort((a, b) => a.path.localeCompare(b.path))
  .map((page) => {
    const loc = `${BASE_URL}${page.path === '/' ? '/' : page.path}`
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${buildChangefreq(page.intent)}</changefreq>
    <priority>${buildPriority(page.path, page.intent)}</priority>
  </url>`
  })

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

await fs.writeFile(OUTPUT_FILE, xml, 'utf8')
console.log(`Generated sitemap with ${urls.length} URLs`)
