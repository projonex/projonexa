import { PAGE_SEO } from '../src/data/seo.ts'
import { SEO_RULES } from '../src/lib/seo-rules.ts'

const errors = []
const warnings = []
const seenPaths = new Set()
const seenTitles = new Set()
const seenPrimaryKeywords = new Set()

for (const [pageKey, page] of Object.entries(PAGE_SEO)) {
  if (!page.title?.trim()) errors.push(`${pageKey}: missing title`)
  if (!page.description?.trim()) errors.push(`${pageKey}: missing description`)
  if (!page.path?.trim()) errors.push(`${pageKey}: missing path`)
  if (!page.primaryKeyword?.trim()) errors.push(`${pageKey}: missing primaryKeyword`)
  if (!Array.isArray(page.secondaryKeywords) || page.secondaryKeywords.length === 0) {
    errors.push(`${pageKey}: missing secondaryKeywords`)
  }
  if (!page.intent?.trim()) errors.push(`${pageKey}: missing intent`)
  if (!page.audience?.trim()) errors.push(`${pageKey}: missing audience`)
  if (!page.conversionGoal?.trim()) errors.push(`${pageKey}: missing conversionGoal`)

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
}

if (warnings.length > 0) {
  console.warn(warnings.join('\n'))
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log('SEO validation passed')
