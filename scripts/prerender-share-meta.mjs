#!/usr/bin/env node
/**
 * Inject per-route title + Open Graph meta into static HTML so link previews
 * work on WhatsApp, LinkedIn, and Facebook (crawlers that do not run SPA JS).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { mkdtemp, rm, writeFile as writeTemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const BASE_URL = 'https://projonexa.com'
const DIST_DIR = path.resolve(process.cwd(), 'dist')
const INDEX_FILE = path.join(DIST_DIR, 'index.html')

const PATH_IMAGE = {
  '/': `${BASE_URL}/og/og-home.png`,
  '/college-projects': `${BASE_URL}/og/og-college-projects.png`,
  '/inquiry/students': `${BASE_URL}/og/og-college-projects.png`,
  '/client-projects': `${BASE_URL}/og/og-client-projects.png`,
  '/inquiry/corporate': `${BASE_URL}/og/og-client-projects.png`,
  '/affiliate-program': `${BASE_URL}/og/og-affiliate-program.png`,
  '/inquiry/affiliate': `${BASE_URL}/og/og-affiliate-program.png`,
  '/contact': `${BASE_URL}/og/og-contact.png`,
}

const MAX_TITLE = 70
const MAX_DESC = 200

function truncate(text, max) {
  const trimmed = text.trim()
  if (trimmed.length <= max) return trimmed
  const slice = trimmed.slice(0, max - 1)
  const lastSpace = slice.lastIndexOf(' ')
  return `${(lastSpace > 40 ? slice.slice(0, lastSpace) : slice).trim()}…`
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function resolveImage(pathname) {
  return PATH_IMAGE[pathname] ?? `${BASE_URL}/og/og-default.png`
}

function resolveShare(page) {
  const title = truncate(page.shareTitle ?? page.title, MAX_TITLE)
  const description = truncate(page.shareDescription ?? page.description, MAX_DESC)
  const url = `${BASE_URL}${page.path}`
  const image = page.ogImage?.startsWith('http')
    ? page.ogImage
    : page.ogImage?.startsWith('/')
      ? `${BASE_URL}${page.ogImage}`
      : resolveImage(page.path)
  const imageAlt = page.ogImageAlt ?? `Projonexa — ${title}`
  return { title, description, url, image, imageAlt }
}

function buildShareMetaBlock(share, options = {}) {
  const robotsMeta = options.noindex
    ? '<meta name="robots" content="noindex, follow" />'
    : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />'
  return `<!-- prerender-share-meta -->
    <title>${escapeHtml(share.title)}</title>
    <meta name="description" content="${escapeHtml(share.description)}" />
    ${robotsMeta}
    <link rel="canonical" href="${escapeHtml(share.url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeHtml(share.url)}" />
    <meta property="og:title" content="${escapeHtml(share.title)}" />
    <meta property="og:description" content="${escapeHtml(share.description)}" />
    <meta property="og:image" content="${escapeHtml(share.image)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(share.image)}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(share.imageAlt)}" />
    <meta property="og:site_name" content="Projonexa" />
    <meta property="og:locale" content="en_IN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(share.title)}" />
    <meta name="twitter:description" content="${escapeHtml(share.description)}" />
    <meta name="twitter:image" content="${escapeHtml(share.image)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(share.imageAlt)}" />`
}

function injectShareMeta(html, share, options = {}) {
  const block = buildShareMetaBlock(share, options)
  let next = html
    .replace(/<!-- prerender-share-meta -->[\s\S]*?(?=\n  <\/head>)/, '')
    .replace(/<title>[^<]*<\/title>\s*/i, '')
    .replace(/<meta name="description" content="[^"]*"\s*\/?>\s*/gi, '')
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>\s*/gi, '')
    .replace(/<meta property="og:[^>]+>\s*/gi, '')
    .replace(/<meta name="twitter:[^>]+>\s*/gi, '')

  return next.replace('</head>', `    ${block}\n  </head>`)
}

async function loadBuildData() {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'projonexa-prerender-'))
  const entryFile = path.join(tempDir, 'entry.ts')
  const bundleFile = path.join(tempDir, 'bundle.mjs')
  const repoRoot = process.cwd()
  const seoPath = path.join(repoRoot, 'src/data/seo.ts').replaceAll('\\', '/')
  const projectsPath = path.join(repoRoot, 'src/data/projects.ts').replaceAll('\\', '/')

  await writeTemp(
    entryFile,
    `export { PAGE_SEO } from '${seoPath}';\nexport { MY_PROJECTS, projectPath } from '${projectsPath}';\n`,
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
    return await import(`${pathToFileURL(bundleFile).href}?v=${Date.now()}`)
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }
}

function distPathForRoute(pathname) {
  if (pathname === '/') return INDEX_FILE
  const segment = pathname.replace(/^\//, '')
  return path.join(DIST_DIR, segment, 'index.html')
}

const template = await readFile(INDEX_FILE, 'utf8')
const { PAGE_SEO, MY_PROJECTS, projectPath } = await loadBuildData()

const pages = Object.values(PAGE_SEO)

for (const project of MY_PROJECTS) {
  const pathname = projectPath(project.id)
  const thumb = project.thumbnailUrl
  const ogImage = thumb.startsWith('http') ? thumb : thumb.startsWith('/') ? `${BASE_URL}${thumb}` : undefined
  pages.push({
    title: `${project.name} | Projects | Projonexa`,
    description: project.description,
    path: pathname,
    shareTitle: `${project.name} | Projonexa`,
    shareDescription: project.tagline || project.description,
    ogImage,
    ogImageAlt: `${project.name} — Projonexa project`,
  })
}

let count = 0
for (const page of pages) {
  if (!page.path || page.path.includes(':')) continue
  const share = resolveShare(page)
  const html = injectShareMeta(template, share, { noindex: page.robotsNoIndex })
  const outFile = distPathForRoute(page.path)
  await mkdir(path.dirname(outFile), { recursive: true })
  await writeFile(outFile, html, 'utf8')
  count += 1
}

const notFoundPage = PAGE_SEO.notFound
if (notFoundPage) {
  const share404 = resolveShare(notFoundPage)
  const html404 = injectShareMeta(template, share404, { noindex: true })
  await writeFile(path.join(DIST_DIR, '404.html'), html404, 'utf8')
  console.log('  ✓ 404.html (Vercel / static host not-found page)')
}

console.log(`Prerendered share meta for ${count} routes`)
