import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'esbuild'

async function loadSeoData() {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'projonexa-seo-'))
  const entryFile = path.join(tempDir, 'entry.ts')
  const bundleFile = path.join(tempDir, 'bundle.mjs')

  const repoRoot = process.cwd()
  const seoPath = path.join(repoRoot, 'src/data/seo.ts').replaceAll('\\', '/')
  const rulesPath = path.join(repoRoot, 'src/lib/seo/seo-rules.ts').replaceAll('\\', '/')

  await writeFile(
    entryFile,
    `export { PAGE_SEO } from '${seoPath}';\nexport { SEO_RULES } from '${rulesPath}';\n`,
    'utf8'
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

    const mod = await import(`${pathToFileURL(bundleFile).href}?v=${Date.now()}`)
    return mod
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }
}

const { PAGE_SEO, SEO_RULES } = await loadSeoData()

const errors = []
const warnings = []
const seenPaths = new Set()
const seenTitles = new Set()
const seenPrimaryKeywords = new Set()
const mustHaveAeoSchema = new Set([
  'home',
  'about',
  'services',
  'projects',
  'blog',
  'portfolio',
  'pricing',
  'faq',
  'contact',
  'careers',
  'careersApply',
  'studentInquiry',
  'corporateInquiry',
  'affiliateInquiry',
  'collegeProjects',
  'clientProjects',
  'affiliateProgram',
])

for (const [pageKey, page] of Object.entries(PAGE_SEO)) {
  const hasTitle = Boolean(page.title?.trim())
  const hasDescription = Boolean(page.description?.trim())
  const hasPath = Boolean(page.path?.trim())
  const hasPrimaryKeyword = Boolean(page.primaryKeyword?.trim())

  if (!hasTitle) errors.push(`${pageKey}: missing title`)
  if (!hasDescription) errors.push(`${pageKey}: missing description`)
  if (!hasPath) errors.push(`${pageKey}: missing path`)
  if (!hasPrimaryKeyword) errors.push(`${pageKey}: missing primaryKeyword`)
  if (!Array.isArray(page.secondaryKeywords) || page.secondaryKeywords.length === 0) {
    errors.push(`${pageKey}: missing secondaryKeywords`)
  }
  if (!page.intent?.trim()) errors.push(`${pageKey}: missing intent`)
  if (!page.audience?.trim()) errors.push(`${pageKey}: missing audience`)
  if (!page.conversionGoal?.trim()) errors.push(`${pageKey}: missing conversionGoal`)
  if (page.ctrVariants) {
    if (!Array.isArray(page.ctrVariants.titles) || page.ctrVariants.titles.length < 2) {
      errors.push(`${pageKey}: ctrVariants.titles must include at least 2 variants`)
    }
    if (
      !Array.isArray(page.ctrVariants.descriptions) ||
      page.ctrVariants.descriptions.length < 2
    ) {
      errors.push(`${pageKey}: ctrVariants.descriptions must include at least 2 variants`)
    }
  }

  if (!hasTitle || !hasDescription || !hasPath || !hasPrimaryKeyword) {
    continue
  }

  if (seenPaths.has(page.path)) {
    errors.push(`${pageKey}: duplicate canonical path "${page.path}"`)
  } else {
    seenPaths.add(page.path)
  }

  if (seenTitles.has(page.title)) {
    warnings.push(`${pageKey}: duplicate title "${page.title}"`)
  } else {
    seenTitles.add(page.title)
  }

  const keywordKey = page.primaryKeyword.toLowerCase().trim()
  if (seenPrimaryKeywords.has(keywordKey)) {
    warnings.push(`${pageKey}: duplicate primaryKeyword "${page.primaryKeyword}"`)
  } else {
    seenPrimaryKeywords.add(keywordKey)
  }

  if (page.title.length < SEO_RULES.titleMin || page.title.length > SEO_RULES.titleMax) {
    warnings.push(
      `${pageKey}: title length ${page.title.length} outside ${SEO_RULES.titleMin}-${SEO_RULES.titleMax}`
    )
  }

  if (
    page.description.length < SEO_RULES.descriptionMin ||
    page.description.length > SEO_RULES.descriptionMax
  ) {
    warnings.push(
      `${pageKey}: description length ${page.description.length} outside ${SEO_RULES.descriptionMin}-${SEO_RULES.descriptionMax}`
    )
  }

  if (page.ctrVariants?.titles) {
    const seenCtrTitles = new Set()
    for (const [index, title] of page.ctrVariants.titles.entries()) {
      const normalized = title.toLowerCase().trim()
      if (!normalized) {
        errors.push(`${pageKey}: ctr title variant ${index + 1} is empty`)
        continue
      }
      if (seenCtrTitles.has(normalized)) {
        warnings.push(`${pageKey}: duplicate ctr title variant "${title}"`)
      } else {
        seenCtrTitles.add(normalized)
      }
      if (title.length < SEO_RULES.titleMin || title.length > SEO_RULES.titleMax) {
        warnings.push(
          `${pageKey}: ctr title variant ${index + 1} length ${title.length} outside ${SEO_RULES.titleMin}-${SEO_RULES.titleMax}`
        )
      }
    }
  }

  if (page.ctrVariants?.descriptions) {
    const seenCtrDescriptions = new Set()
    for (const [index, description] of page.ctrVariants.descriptions.entries()) {
      const normalized = description.toLowerCase().trim()
      if (!normalized) {
        errors.push(`${pageKey}: ctr description variant ${index + 1} is empty`)
        continue
      }
      if (seenCtrDescriptions.has(normalized)) {
        warnings.push(`${pageKey}: duplicate ctr description variant "${description}"`)
      } else {
        seenCtrDescriptions.add(normalized)
      }
      if (
        description.length < SEO_RULES.descriptionMin ||
        description.length > SEO_RULES.descriptionMax
      ) {
        warnings.push(
          `${pageKey}: ctr description variant ${index + 1} length ${description.length} outside ${SEO_RULES.descriptionMin}-${SEO_RULES.descriptionMax}`
        )
      }
    }
  }
}

for (const pageKey of mustHaveAeoSchema) {
  if (!PAGE_SEO[pageKey]?.faqSchema) {
    errors.push(`${pageKey}: faqSchema must be enabled for AEO tier-1 page`)
  }
}

if (warnings.length > 0) {
  console.warn(warnings.join('\n'))
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(warnings.length > 0 ? 'SEO validation passed with warnings' : 'SEO validation passed')
