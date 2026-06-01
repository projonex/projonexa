# SEO AEO GEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade SEO/AEO/GEO system with metadata governance, schema consistency, sitemap automation, answer-first content, and measurable quality gates.

**Architecture:** Extend the existing SEO registry into a strict page-intent model, route schema generation through intent-aware composition, and wire build-time automation for sitemap + metadata checks. Then update high-intent pages (`/`, `/services`, `/pricing`, `/faq`, `/contact`) so visible copy, schema, and conversion paths are aligned.

**Tech Stack:** React 18, TypeScript, Vite, react-helmet-async, Node 20 scripts

---

## File Structure and Responsibilities

- Modify: `src/data/seo.ts` (expand SEO registry with intent/audience/conversion fields)
- Create: `src/lib/seo-types.ts` (shared SEO typing contracts)
- Create: `src/lib/seo-rules.ts` (limits and helper rules for metadata validation)
- Modify: `src/components/seo/SEO.tsx` (consume richer metadata model)
- Modify: `src/lib/structured-data.ts` (intent-aware schema composition)
- Modify: `src/data/faq.ts` (ensure answer-first phrasing consistency)
- Modify: `src/pages/HomePage.tsx` (add stronger answer and intent links)
- Modify: `src/pages/ServicesPage.tsx` (clustered audience messaging + links)
- Modify: `src/pages/PricingPage.tsx` (pricing explainers and trust answers)
- Modify: `src/pages/FAQPage.tsx` (category intro and stronger conversion routing)
- Modify: `src/pages/ContactPage.tsx` (SLA and location-service clarity)
- Create: `scripts/generate-sitemap.mjs` (auto-build sitemap from SEO registry)
- Create: `scripts/validate-seo.mjs` (quality gate checks)
- Modify: `package.json` (add scripts for validation + sitemap generation)
- Modify: `public/sitemap.xml` (generated output)
- Test: `npm run build`, `npm run seo:validate`, `npm run sitemap:generate`

---

### Task 1: Expand SEO Registry Model

**Files:**
- Create: `src/lib/seo-types.ts`
- Create: `src/lib/seo-rules.ts`
- Modify: `src/data/seo.ts`
- Test: `npm run build`

- [ ] **Step 1: Write the failing type expectations**

```ts
// src/lib/seo-types.ts
export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'navigational'

export type Audience = 'students' | 'startups' | 'businesses' | 'mixed'

export interface PageSEO {
  title: string
  description: string
  keywords: string[]
  path: string
  primaryKeyword: string
  secondaryKeywords: string[]
  intent: SearchIntent
  audience: Audience
  conversionGoal: string
  aeoQuestions?: string[]
  faqSchema?: boolean
  serviceSchema?: boolean
  breadcrumb?: { name: string; path: string }[]
}
```

- [ ] **Step 2: Run build to verify failures before refactor**

Run: `npm run build`  
Expected: FAIL with `PageSEO` mismatch errors in `src/data/seo.ts`.

- [ ] **Step 3: Implement minimal model migration**

```ts
// src/data/seo.ts (example for one page; repeat for all pages)
home: {
  title: `${BRAND.name} | Final Year Projects & Innovation Platform — ${GEO.region}, ${GEO.country}`,
  description: 'Projonexa helps students and startups build final year projects, AI systems, and MVP products with complete delivery support across India and globally.',
  keywords: BASE_KEYWORDS,
  path: '/',
  primaryKeyword: 'final year projects India',
  secondaryKeywords: ['engineering projects Maharashtra', 'startup MVP development India'],
  intent: 'commercial',
  audience: 'mixed',
  conversionGoal: 'contact-inquiry',
  aeoQuestions: [
    'What is Projonexa?',
    'Who is Projonexa for?',
    'What deliverables are included?',
  ],
  faqSchema: true,
  serviceSchema: true,
}
```

- [ ] **Step 4: Add metadata constraints helper**

```ts
// src/lib/seo-rules.ts
export const SEO_RULES = {
  titleMin: 45,
  titleMax: 65,
  descriptionMin: 140,
  descriptionMax: 165,
} as const
```

- [ ] **Step 5: Run build and commit**

Run: `npm run build`  
Expected: PASS  

```bash
git add src/lib/seo-types.ts src/lib/seo-rules.ts src/data/seo.ts
git commit -m "feat: add typed SEO intent model"
```

---

### Task 2: Add Build-Time SEO Validation Gate

**Files:**
- Create: `scripts/validate-seo.mjs`
- Modify: `package.json`
- Test: `npm run seo:validate`

- [ ] **Step 1: Write the failing validator behavior first**

```js
// scripts/validate-seo.mjs
import { PAGE_SEO } from '../dist-temp/seo-export.js'

const errors = []
for (const [key, page] of Object.entries(PAGE_SEO)) {
  if (!page.title) errors.push(`${key}: missing title`)
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
```

- [ ] **Step 2: Run validator before wiring export**

Run: `node scripts/validate-seo.mjs`  
Expected: FAIL due to unresolved import/module source.

- [ ] **Step 3: Implement production validator against source file import**

```js
// scripts/validate-seo.mjs
import { PAGE_SEO } from '../src/data/seo.ts'
import { SEO_RULES } from '../src/lib/seo-rules.ts'

const seenCanonical = new Set()
const seenTitle = new Set()
const errors = []
const warnings = []

for (const [pageKey, page] of Object.entries(PAGE_SEO)) {
  if (!page.title?.trim()) errors.push(`${pageKey}: missing title`)
  if (!page.description?.trim()) errors.push(`${pageKey}: missing description`)
  if (!page.path?.trim()) errors.push(`${pageKey}: missing path`)
  if (!page.primaryKeyword?.trim()) errors.push(`${pageKey}: missing primaryKeyword`)
  if (!page.intent?.trim()) errors.push(`${pageKey}: missing intent`)

  if (seenCanonical.has(page.path)) errors.push(`${pageKey}: duplicate canonical path ${page.path}`)
  else seenCanonical.add(page.path)

  if (seenTitle.has(page.title)) warnings.push(`${pageKey}: duplicate title "${page.title}"`)
  else seenTitle.add(page.title)

  if (page.title.length < SEO_RULES.titleMin || page.title.length > SEO_RULES.titleMax) {
    warnings.push(`${pageKey}: title length outside recommended range`)
  }
  if (
    page.description.length < SEO_RULES.descriptionMin ||
    page.description.length > SEO_RULES.descriptionMax
  ) {
    warnings.push(`${pageKey}: description length outside recommended range`)
  }
}

if (warnings.length) console.warn(warnings.join('\n'))
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log('SEO validation passed')
```

- [ ] **Step 4: Add scripts and run validation**

```json
// package.json scripts
"seo:validate": "node --experimental-strip-types scripts/validate-seo.mjs"
```

Run: `npm run seo:validate`  
Expected: PASS with optional warnings only.

- [ ] **Step 5: Commit**

```bash
git add scripts/validate-seo.mjs package.json
git commit -m "chore: add seo metadata validation gate"
```

---

### Task 3: Intent-Aware Schema Composition

**Files:**
- Modify: `src/lib/structured-data.ts`
- Modify: `src/components/seo/SEO.tsx`
- Test: `npm run build`

- [ ] **Step 1: Write failing usage by adding new property to schema builder call**

```ts
// src/components/seo/SEO.tsx
const schemas = buildStructuredData({
  title: seo.title,
  description: seo.description,
  path: seo.path,
  intent: seo.intent, // new required property
  breadcrumb: seo.breadcrumb,
  faqSchema: seo.faqSchema,
  serviceSchema: seo.serviceSchema,
  extraFaqs,
})
```

- [ ] **Step 2: Run build to verify type failure**

Run: `npm run build`  
Expected: FAIL: `intent` does not exist in `buildStructuredData` options.

- [ ] **Step 3: Implement intent-aware schema mapping**

```ts
// src/lib/structured-data.ts
export function buildStructuredData(options: {
  title: string
  description: string
  path: string
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational'
  breadcrumb?: BreadcrumbItem[]
  faqSchema?: boolean
  serviceSchema?: boolean
  extraFaqs?: FAQ[]
}) {
  const schemas: object[] = [organizationSchema(options.description), webSiteSchema(), localBusinessSchema()]

  schemas.push(webPageSchema(options.title, options.description, options.path))

  if (options.breadcrumb?.length) schemas.push(breadcrumbSchema(options.breadcrumb))
  if (options.faqSchema) schemas.push(faqPageSchema(options.extraFaqs ?? FAQ_ITEMS))

  if (options.intent === 'commercial' || options.intent === 'transactional' || options.serviceSchema) {
    schemas.push(serviceCatalogSchema())
  }

  return schemas
}
```

- [ ] **Step 4: Build and manual JSON-LD smoke check**

Run: `npm run build`  
Expected: PASS

Run: `npm run dev` and inspect homepage source for JSON-LD blocks  
Expected: `Organization`, `WebSite`, `ProfessionalService`, `WebPage`, `FAQPage`, `ItemList` where expected.

- [ ] **Step 5: Commit**

```bash
git add src/lib/structured-data.ts src/components/seo/SEO.tsx
git commit -m "feat: make schema generation intent-aware"
```

---

### Task 4: Automate Sitemap Generation

**Files:**
- Create: `scripts/generate-sitemap.mjs`
- Modify: `package.json`
- Modify: `public/sitemap.xml`
- Test: `npm run sitemap:generate`

- [ ] **Step 1: Add failing generation command**

```json
// package.json scripts
"sitemap:generate": "node --experimental-strip-types scripts/generate-sitemap.mjs"
```

- [ ] **Step 2: Run command before script exists**

Run: `npm run sitemap:generate`  
Expected: FAIL because script file is missing.

- [ ] **Step 3: Implement script from SEO registry**

```js
// scripts/generate-sitemap.mjs
import fs from 'node:fs/promises'
import { PAGE_SEO } from '../src/data/seo.ts'

const BASE_URL = 'https://projonexa.com'
const today = new Date().toISOString().slice(0, 10)

const urls = Object.values(PAGE_SEO)
  .filter((page) => !page.path.includes('/:') && page.path !== '/research')
  .map((page) => {
    const loc = `${BASE_URL}${page.path === '/' ? '/' : page.path}`
    const priority =
      page.path === '/' ? '1.0' : page.intent === 'transactional' ? '0.95' : page.intent === 'commercial' ? '0.9' : '0.8'
    const changefreq = page.intent === 'transactional' ? 'weekly' : 'monthly'
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  })

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
await fs.writeFile(new URL('../public/sitemap.xml', import.meta.url), xml, 'utf8')
console.log(`Generated sitemap with ${urls.length} URLs`)
```

- [ ] **Step 4: Run generator and verify output**

Run: `npm run sitemap:generate`  
Expected: PASS with `Generated sitemap with 11 URLs`.

Run: `npm run seo:validate`  
Expected: PASS (ensures registry and sitemap source remain coherent).

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-sitemap.mjs package.json public/sitemap.xml
git commit -m "chore: generate sitemap from seo registry"
```

---

### Task 5: Upgrade AEO/GEO Content on Priority Pages

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/ServicesPage.tsx`
- Modify: `src/pages/PricingPage.tsx`
- Modify: `src/pages/FAQPage.tsx`
- Modify: `src/pages/ContactPage.tsx`
- Modify: `src/data/faq.ts`
- Test: `npm run build`

- [ ] **Step 1: Add failing content contract checks via validator**

```js
// scripts/validate-seo.mjs (append)
const mustHaveAEO = new Set(['home', 'services', 'pricing', 'faq', 'contact'])
for (const key of mustHaveAEO) {
  if (!PAGE_SEO[key]?.faqSchema) {
    errors.push(`${key}: faqSchema must be enabled for AEO tier-1 page`)
  }
}
```

- [ ] **Step 2: Run validation and capture current failures**

Run: `npm run seo:validate`  
Expected: FAIL for pages not yet flagged.

- [ ] **Step 3: Implement answer-first blocks and interlinks**

```tsx
// src/pages/ServicesPage.tsx (new short block)
<section className="section-padding border-y border-black/[0.05]">
  <div className="container-wide grid gap-6 md:grid-cols-3">
    <article>
      <h2 className="text-xl font-semibold">For Students</h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">Get final year, mini, AI/ML, and IoT project delivery with documentation, walkthroughs, and viva prep aligned to university deadlines.</p>
    </article>
    <article>
      <h2 className="text-xl font-semibold">For Startups</h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">Build a lean MVP with core product features, admin controls, analytics hooks, and a clear iteration roadmap for launch and investor demos.</p>
    </article>
    <article>
      <h2 className="text-xl font-semibold">Need pricing or timeline?</h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">See Pricing and FAQ before contacting.</p>
    </article>
  </div>
</section>
```

- [ ] **Step 4: Rewrite FAQ answers first-sentence direct style where weak**

```ts
// src/data/faq.ts (example style)
answer: 'Yes. We deliver complete source code with setup documentation and a walkthrough session so you can explain the implementation confidently.'
```

- [ ] **Step 5: Build, validate, and commit**

Run: `npm run build && npm run seo:validate`  
Expected: PASS

```bash
git add src/pages/HomePage.tsx src/pages/ServicesPage.tsx src/pages/PricingPage.tsx src/pages/FAQPage.tsx src/pages/ContactPage.tsx src/data/faq.ts scripts/validate-seo.mjs src/data/seo.ts
git commit -m "feat: strengthen aeo geo content on conversion pages"
```

---

### Task 6: Final Verification and Release Readiness

**Files:**
- Modify: `docs/SEO_STRATEGY.md`
- Test: `npm run seo:validate`, `npm run sitemap:generate`, `npm run build`

- [ ] **Step 1: Update operating documentation to match new workflow**

```md
## Build-Time Quality Gates
- Run `npm run seo:validate` before each release.
- Run `npm run sitemap:generate` whenever SEO registry changes.
- Ensure `/research` remains redirect-only and not indexed in sitemap.
```

- [ ] **Step 2: Run full verification sequence**

Run: `npm run seo:validate`  
Expected: PASS

Run: `npm run sitemap:generate`  
Expected: PASS

Run: `npm run build`  
Expected: PASS

- [ ] **Step 3: Perform manual route smoke checks**

Run: `npm run dev`  
Expected checks:
- `/` has canonical + FAQ + service schema.
- `/services` and `/pricing` include answer-first sections.
- `/faq` content aligns with FAQ schema.
- `/contact` includes response SLA and geo-relevant messaging.

- [ ] **Step 4: Commit release-prep updates**

```bash
git add docs/SEO_STRATEGY.md public/sitemap.xml
git commit -m "docs: add seo aeo geo release workflow"
```

- [ ] **Step 5: Produce handoff summary**

```md
Deliver:
1. Changed file list
2. Validation outputs
3. Remaining backlog (content expansion/backlinks)
4. Post-deploy checks in Search Console and Bing Webmaster
```

---

## Self-Review Results

- **Spec coverage:** Covered metadata model, schema orchestration, sitemap automation, QA gates, page-level AEO/GEO upgrades, KPI-ready operations.
- **Placeholder scan:** No TODO/TBD placeholders; each step has explicit commands or code.
- **Type consistency:** Uses one shared `PageSEO` contract and consistent intent/audience naming throughout tasks.

