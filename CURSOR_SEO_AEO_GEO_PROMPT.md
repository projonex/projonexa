# CURSOR AI — COMPLETE SEO / AEO / GEO / TECHNICAL OPTIMIZATION PROMPT
# Production-Ready | Self-Executing | Zero Additional Prompts Required
# ============================================================
# HOW TO USE: Paste this entire prompt into Cursor AI Composer (⌘+I or Ctrl+I)
# with your project open. Cursor will execute all phases sequentially.
# ============================================================

---

## ROLE ASSIGNMENT

You are simultaneously acting as:
- Senior Software Architect (10+ years)
- Senior Technical SEO Engineer (Google, Bing, AI Search)
- AEO Specialist (ChatGPT, Gemini, Claude, Perplexity, AI Overviews)
- GEO Specialist (Generative Engine Optimization)
- Performance Engineer (Core Web Vitals, Lighthouse)
- Accessibility Engineer (WCAG 2.2 AA)
- Content Strategist (Pillar pages, clusters, semantic SEO)

You have full access to the entire codebase open in this Cursor workspace.
You will read, understand, audit, and implement ALL changes directly.
Do NOT ask for permission before making changes.
Do NOT skip phases.
Do NOT give generic advice — every recommendation and implementation must be based on the ACTUAL code you read.

---

## EXECUTION INSTRUCTIONS

Execute the following phases in strict order:
1. Read the codebase completely before writing a single line.
2. Complete each phase's ANALYSIS before its IMPLEMENTATION.
3. Output a structured report after each phase.
4. Then immediately implement all HIGH priority items.
5. Commit-ready code only — no placeholders, no TODOs.

---

# ═══════════════════════════════════════════════════════════
# PHASE 1 — CODEBASE UNDERSTANDING
# ═══════════════════════════════════════════════════════════

## Step 1.1 — Project Structure Discovery

Read and map the entire project directory:

```
- Read: package.json / package-lock.json / yarn.lock / pnpm-lock.yaml
- Read: tsconfig.json / jsconfig.json
- Read: next.config.js / next.config.mjs (if Next.js)
- Read: vite.config.ts / vite.config.js (if Vite/React)
- Read: nuxt.config.ts (if Nuxt.js)
- Read: astro.config.mjs (if Astro)
- Read: gatsby-config.js (if Gatsby)
- Read: tailwind.config.js / tailwind.config.ts
- Read: .env.example / .env.local (keys only, not values)
- Read: vercel.json / netlify.toml / render.yaml / fly.toml
- List: /src or /app or /pages directory tree (full depth)
- List: /components or /ui directory tree
- List: /lib or /utils directory tree
- List: /public directory tree
- List: /styles or /css directory tree
- Read: README.md
```

## Step 1.2 — Framework & Architecture Detection

Identify and document:
- [ ] Framework: Next.js App Router / Pages Router / React / Vue / Nuxt / Astro / Gatsby / SvelteKit / Laravel / Django
- [ ] Version of framework
- [ ] TypeScript or JavaScript
- [ ] CSS approach: Tailwind / CSS Modules / Styled Components / Sass / Plain CSS
- [ ] State management: Redux / Zustand / Jotai / Context API / Pinia / None
- [ ] CMS: Contentful / Sanity / Strapi / WordPress / Prismic / MDX / None
- [ ] Database: Supabase / Prisma / MongoDB / Firebase / None
- [ ] Auth: NextAuth / Clerk / Auth0 / Supabase Auth / None
- [ ] Deployment: Vercel / Netlify / AWS / GCP / Railway / Render
- [ ] Analytics: GA4 / Plausible / Mixpanel / PostHog / None
- [ ] OG Image generation: next/og / Cloudinary / Static / None

## Step 1.3 — Routing & Pages Inventory

Map ALL routes in the application:

For Next.js App Router, read every `page.tsx` / `page.jsx` / `layout.tsx` in `/app`
For Next.js Pages Router, read every file in `/pages`
For React Router, read router configuration files
For Nuxt, read `/pages` directory

Document for each route:
- URL path
- Page component file path
- Has metadata? (title, description, OG)
- Has schema markup?
- Has canonical tag?
- Has sitemap inclusion?
- Content type (landing / blog / product / feature / about / contact)

## Step 1.4 — Metadata Architecture

Identify how metadata is currently handled:
- Static in `<head>` tags?
- Next.js `generateMetadata()` / `Metadata` export?
- React Helmet?
- Nuxt `useHead()` / `useSeoMeta()`?
- Astro frontmatter?
- Manual `<meta>` tags?

Read every metadata implementation currently in the codebase.

## Step 1.5 — Generate Phase 1 Report

Output a structured JSON report:

```json
{
  "framework": "",
  "version": "",
  "language": "TypeScript|JavaScript",
  "cssFramework": "",
  "routing": "app-router|pages-router|react-router|vue-router",
  "totalPages": 0,
  "pagesWithMetadata": 0,
  "pagesWithSchema": 0,
  "pagesWithCanonical": 0,
  "hasSitemap": true|false,
  "hasRobotsTxt": true|false,
  "metadataApproach": "",
  "deploymentPlatform": "",
  "cms": "",
  "analyticsSetup": "",
  "allRoutes": [
    {
      "path": "/",
      "file": "app/page.tsx",
      "hasTitle": true,
      "hasDescription": false,
      "hasOG": false,
      "hasSchema": false,
      "contentType": "homepage"
    }
  ]
}
```

---

# ═══════════════════════════════════════════════════════════
# PHASE 2 — BUSINESS & PRODUCT UNDERSTANDING
# ═══════════════════════════════════════════════════════════

## Step 2.1 — Extract Business Intelligence

Read the following to understand the business:
- Homepage content (hero, tagline, value proposition)
- About page content
- Features / Product page content
- Pricing page content (if exists)
- Blog content (read 5+ posts if available)
- Footer content (company name, links, copyright)
- All CTAs across the site
- Testimonials / social proof sections
- Contact page

## Step 2.2 — Business Intelligence Report

Document:

```
COMPANY NAME: [extracted from site]
TAGLINE: [extracted from hero]
PRIMARY PRODUCT/SERVICE: [what they sell or offer]
PROBLEM SOLVED: [pain point addressed]
TARGET AUDIENCE: [who the customers are]
INDUSTRY: [industry category]
BUSINESS MODEL: SaaS / E-commerce / Agency / Marketplace / Info product / Service
PRICING MODEL: Free / Freemium / Subscription / One-time / Custom
PRIMARY CTA: [main conversion action]
SECONDARY CTAs: [other conversion actions]
USP: [unique selling proposition]
GEOGRAPHIC FOCUS: Local / National / Global
TONE OF VOICE: Professional / Casual / Technical / Friendly
CURRENT KEYWORDS IN USE: [list all h1, h2 keywords found]
SOCIAL PROOF ELEMENTS: testimonials / reviews / case studies / logos
TRUST SIGNALS: certifications / awards / press mentions / partnerships
```

---

# ═══════════════════════════════════════════════════════════
# PHASE 3 — WEBSITE ANALYSIS
# ═══════════════════════════════════════════════════════════

## Step 3.1 — Page-by-Page Analysis

For EACH page in the route inventory, analyze:

**Homepage:**
- Hero headline clarity and keyword presence
- Value proposition above the fold
- CTA placement and copy
- Social proof placement
- Navigation structure
- Internal link count and quality
- Page sections and their SEO value

**Landing Pages:**
- Keyword targeting
- Heading hierarchy
- CTA optimization
- Content completeness
- Missing FAQ sections
- Conversion optimization gaps

**Feature/Product Pages:**
- Feature descriptions (are they benefit-led?)
- Missing technical keywords
- Schema markup eligibility
- Screenshot/image alt tags

**Blog Pages:**
- Article structure
- Author information (EEAT)
- Internal linking strategy
- Schema markup
- Social sharing

**About Page:**
- Team information (EEAT signals)
- Company history
- Mission statement (entity building)
- Awards / certifications

**Contact Page:**
- Local business signals
- Structured data eligibility

## Step 3.2 — Content Hierarchy Analysis

Check across all pages:
- Is there ONE clear H1 per page?
- Do H2s represent main topics?
- Do H3s represent subtopics?
- Are headings keyword-rich?
- Is content scannable?
- Are paragraphs 3-4 lines max?
- Are bullet points used effectively?
- Is there a clear content hierarchy?

## Step 3.3 — User Journey Analysis

Map:
- Homepage → [what's the primary next step?]
- Blog post → [is there a CTA to convert?]
- Feature page → [does it link to pricing/signup?]
- About page → [does it build trust and link to product?]
- Contact page → [is it easy to reach support?]

---

# ═══════════════════════════════════════════════════════════
# PHASE 4 — TECHNICAL SEO AUDIT
# ═══════════════════════════════════════════════════════════

## Step 4.1 — Audit Checklist

For each item below, check the ACTUAL current state in the codebase:

### Title Tags
- [ ] Is every page missing a title tag? → CRITICAL
- [ ] Are titles duplicated across pages? → HIGH
- [ ] Are titles over 60 characters? → MEDIUM
- [ ] Are titles keyword-optimized? → HIGH
- [ ] Do titles follow Brand | Page format? → LOW

### Meta Descriptions
- [ ] Missing on any pages? → HIGH
- [ ] Over 160 characters? → MEDIUM
- [ ] Contain primary keyword? → HIGH
- [ ] Have a CTA? → MEDIUM
- [ ] Duplicated? → HIGH

### Canonical Tags
- [ ] Missing on any pages? → HIGH
- [ ] Self-referencing where needed? → HIGH
- [ ] Pointing to correct URL? → CRITICAL
- [ ] www vs non-www consistency? → HIGH

### Heading Structure
- [ ] Multiple H1s on any page? → HIGH
- [ ] Missing H1 on any page? → CRITICAL
- [ ] H2s used in illogical order? → MEDIUM
- [ ] Headings with no text content? → HIGH

### Images
- [ ] Missing alt attributes? → HIGH
- [ ] Alt attributes empty on decorative images? → MEDIUM
- [ ] Images not using next/image or lazy loading? → HIGH
- [ ] Missing width/height causing layout shift? → HIGH
- [ ] Large uncompressed images (>200KB)? → HIGH
- [ ] Missing WebP/AVIF format? → MEDIUM

### URL Structure
- [ ] URLs contain uppercase letters? → MEDIUM
- [ ] URLs contain special characters? → HIGH
- [ ] URLs are deeply nested (4+ levels)? → LOW
- [ ] Blog posts use date in URL (bad for evergreen)? → MEDIUM

### Sitemap
- [ ] sitemap.xml missing? → CRITICAL
- [ ] Dynamic sitemap covers all pages? → HIGH
- [ ] Sitemap includes blog posts? → HIGH
- [ ] Sitemap is submitted to Google Search Console? → HIGH

### Robots.txt
- [ ] robots.txt missing? → HIGH
- [ ] Accidentally blocking important pages? → CRITICAL
- [ ] Referencing sitemap URL? → MEDIUM

### Schema Markup
- [ ] Organization schema missing? → HIGH
- [ ] WebSite schema missing? → HIGH
- [ ] BreadcrumbList missing? → MEDIUM
- [ ] Article schema missing on blog posts? → HIGH
- [ ] FAQ schema missing? → HIGH
- [ ] Product schema missing (if applicable)? → HIGH

### Core Web Vitals
- [ ] LCP > 2.5s? → CRITICAL
- [ ] FID/INP > 200ms? → HIGH
- [ ] CLS > 0.1? → HIGH
- [ ] Missing font preloading? → MEDIUM
- [ ] Missing critical CSS inlining? → MEDIUM
- [ ] Third-party scripts blocking render? → HIGH

### Internal Linking
- [ ] Orphaned pages (no internal links)? → HIGH
- [ ] Broken internal links? → CRITICAL
- [ ] Missing keyword-rich anchor text? → HIGH
- [ ] Homepage links to all key pages? → HIGH

### Mobile Responsiveness
- [ ] viewport meta tag missing? → CRITICAL
- [ ] Text too small on mobile? → HIGH
- [ ] Touch targets too small? → HIGH
- [ ] Horizontal scrolling on mobile? → HIGH

### Accessibility
- [ ] Images missing alt text? → HIGH
- [ ] Forms missing labels? → HIGH
- [ ] Color contrast insufficient? → MEDIUM
- [ ] Skip navigation links missing? → MEDIUM
- [ ] ARIA roles missing? → MEDIUM
- [ ] Focus states not visible? → MEDIUM

## Step 4.2 — Generate Phase 4 Audit Report

For each issue found, output:
```
ISSUE: [name]
SEVERITY: CRITICAL | HIGH | MEDIUM | LOW
CURRENT STATE: [what exists now in the code]
FILE: [exact file path]
LINE: [line number if applicable]
FIX: [exact change needed]
EXPECTED IMPACT: [what improves after fix]
```

---

# ═══════════════════════════════════════════════════════════
# PHASE 5 — AEO (ANSWER ENGINE OPTIMIZATION)
# ═══════════════════════════════════════════════════════════

## Step 5.1 — AI Search Gap Analysis

Based on the business understanding and existing content, identify:

**Questions users ask about this product/service:**
(Generate 30+ realistic questions based on the actual business)

Example format:
```
INFORMATIONAL QUESTIONS (Top of funnel):
- What is [product category]?
- How does [product] work?
- What are the benefits of [solution]?
- How much does [product] cost?
- Is [product] worth it?

COMPARISON QUESTIONS (Middle of funnel):
- [Product] vs [competitor] — which is better?
- What is the best [product category]?
- [Product] alternatives?
- What makes [product] different?

ACTION QUESTIONS (Bottom of funnel):
- How to get started with [product]?
- How to sign up for [product]?
- Does [product] offer a free trial?
- What integrations does [product] support?
```

## Step 5.2 — FAQ Schema Implementation Plan

For each major page, design a targeted FAQ section:

**Homepage FAQ** (5-8 questions):
- General product questions
- Pricing questions
- Getting started questions

**Feature Page FAQs** (5-6 per page):
- Feature-specific questions
- Technical questions
- Use case questions

**Pricing Page FAQ** (6-8 questions):
- What's included?
- Can I cancel?
- Is there a free trial?
- Refund policy?
- Enterprise options?

**Blog Post FAQs** (3-5 per post):
- Based on People Also Ask opportunities
- Based on article topic

## Step 5.3 — Conversational Content Blocks

For AI answer engines to cite the website, create "knowledge blocks":

Each knowledge block must:
- Start with a direct, concise answer (2-3 sentences)
- Follow with supporting detail (3-5 sentences)
- Use simple, declarative language
- Define key terms
- Be structured with question as H2/H3 heading
- Have FAQ schema wrapping it

Example structure:
```html
<section class="faq-block" itemscope itemtype="https://schema.org/FAQPage">
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">What is [Product Name]?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <p itemprop="text">
        [Product Name] is a [category] that helps [audience] to [outcome].
        Unlike traditional [alternatives], [Product Name] [key differentiator].
        [Product Name] is used by [social proof] to [achieve goal].
      </p>
    </div>
  </div>
</section>
```

## Step 5.4 — Voice Search Optimization

Voice queries are longer and conversational. Optimize content for:
- "How do I..."
- "What is the best way to..."
- "Where can I find..."
- "Who provides..."
- Featured snippet targeting (concise 40-50 word answers)
- Local intent if applicable ("near me")

---

# ═══════════════════════════════════════════════════════════
# PHASE 6 — GEO (GENERATIVE ENGINE OPTIMIZATION)
# ═══════════════════════════════════════════════════════════

## Step 6.1 — Entity Analysis

Identify and map all entities related to the business:

```
PRIMARY ENTITY: [Company/Product Name]
  TYPE: Organization / Product / SoftwareApplication / Service
  PROPERTIES:
    - name
    - url
    - description
    - foundingDate
    - founder
    - numberOfEmployees (if known)
    - sameAs: [social media URLs, Crunchbase, LinkedIn, etc.]

RELATED ENTITIES:
  - Industry entities (what sector?)
  - Competitor entities
  - Technology entities (tools used)
  - Integration entities (what it connects with)
  - Use case entities (what problems solved)
  - Audience entities (who uses it)
```

## Step 6.2 — Topic Cluster Architecture

Design a complete topic cluster strategy:

```
PILLAR PAGE 1: [Primary keyword - high volume]
  URL: /[primary-keyword]
  Cluster pages:
    - /[primary-keyword]/[subtopic-1]
    - /[primary-keyword]/[subtopic-2]
    - /[primary-keyword]/[subtopic-3]
  Blog support:
    - /blog/[related-article-1]
    - /blog/[related-article-2]

PILLAR PAGE 2: [Secondary keyword]
  URL: /[secondary-keyword]
  ...

PILLAR PAGE 3: [Use case keyword]
  URL: /[use-case]
  ...
```

## Step 6.3 — EEAT Enhancement Plan

**Experience signals:**
- Case studies with specific outcomes
- Before/after comparisons
- Screenshots of actual results
- User testimonials with full name + company

**Expertise signals:**
- Author bios with credentials
- Expert quotes
- Data and research citations
- Technical depth in content

**Authoritativeness signals:**
- Press mentions / "As seen in"
- Industry awards
- Partnership logos
- Speaking engagements

**Trustworthiness signals:**
- Privacy policy (accessible)
- Terms of service (accessible)
- HTTPS everywhere
- Contact information visible
- Physical address (if local business)
- Security certifications

## Step 6.4 — AI Citation Optimization

For content to be cited by AI engines:

1. **Be factual and citable** — include statistics, data, dates
2. **Be structured** — use headers, bullets, tables
3. **Define terms** — include glossary content
4. **Provide unique insights** — original data > curated data
5. **Use consistent brand mentions** — company name in first paragraph
6. **Build semantic density** — include all related terms naturally
7. **Add "About" knowledge block** — structured company description

---

# ═══════════════════════════════════════════════════════════
# PHASE 7 — COMPETITOR ANALYSIS
# ═══════════════════════════════════════════════════════════

## Step 7.1 — Competitor Identification

Based on the business understanding:
1. Identify 10 likely direct competitors (same product category)
2. Identify 5 indirect competitors (alternative solutions)
3. Identify 5 content competitors (rank for same keywords)

For each competitor, document:
- Their primary keyword targets (from their title tags and H1s)
- Their content structure
- Pages they likely rank for that this site lacks
- Schema markup they use
- Their trust signals

## Step 7.2 — Content Gap Report

Generate a content gap table:

```
CONTENT TYPE          | THIS SITE | COMPETITOR AVG | PRIORITY
-------------------------------------------------------------------
Comparison pages      |    0      |      8         | CRITICAL
Integration pages     |    0      |     15         | HIGH
Use case pages        |    0      |     10         | HIGH
Tutorial/how-to blog  |    0      |     25         | HIGH
Industry-specific pages|   0      |      6         | MEDIUM
Glossary/dictionary   |    0      |      1         | MEDIUM
Templates library     |    0      |      3         | LOW
Customer stories      |    0      |      5         | HIGH
ROI calculator        |    0      |      2         | HIGH
Free tools/resources  |    0      |      4         | MEDIUM
```

## Step 7.3 — Missing Page Recommendations

Based on gaps, list all missing pages with:
- URL slug
- Target keyword
- Search intent
- Estimated traffic potential
- Content outline

---

# ═══════════════════════════════════════════════════════════
# PHASE 8 — COMPLETE IMPLEMENTATION
# ═══════════════════════════════════════════════════════════

## ⚠️ IMPLEMENTATION NOTICE
## You now have full understanding of the codebase, business, and all gaps.
## BEGIN IMPLEMENTING ALL CHANGES NOW.
## Start with CRITICAL, then HIGH, then MEDIUM priority items.
## Output the exact code for each file change.

---

## 8.1 — SEO UTILITY LIBRARY

**Create file:** `lib/seo.ts` (or `lib/seo.js`)

```typescript
// lib/seo.ts
// Central SEO configuration and utility functions

export const siteConfig = {
  name: "[COMPANY_NAME]",           // ← Replace after reading homepage
  tagline: "[TAGLINE]",             // ← Replace after reading hero
  description: "[META_DESCRIPTION]",// ← Replace after reading content
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://[DOMAIN].com",
  ogImage: "/og-image.png",
  twitterHandle: "@[handle]",       // ← Replace after reading footer/meta
  locale: "en_US",
  type: "website",
};

export type MetadataProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
  noIndex?: boolean;
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  url = siteConfig.url,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  keywords,
  noIndex = false,
}: MetadataProps = {}) {
  const fullTitle = title === siteConfig.name
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(", "),
    authors: authors?.map((name) => ({ name })),
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      locale: siteConfig.locale,
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
    metadataBase: new URL(siteConfig.url),
  };
}

// Page-specific metadata generators
export const pageMetadata = {
  home: () => constructMetadata({
    title: "[Primary Keyword] — [Company Name]",
    description: "[Benefit-led description with primary keyword. Under 155 chars.]",
    url: siteConfig.url,
    keywords: ["[keyword1]", "[keyword2]", "[keyword3]"],
  }),

  about: () => constructMetadata({
    title: "About [Company Name] — [Mission Statement Fragment]",
    description: "[Who you are, what you do, why it matters. Under 155 chars.]",
    url: `${siteConfig.url}/about`,
    keywords: ["[company name]", "about [company]", "[industry]"],
  }),

  blog: () => constructMetadata({
    title: "[Blog Name] — [Company Name]",
    description: "Explore expert articles, guides, and insights about [topic].",
    url: `${siteConfig.url}/blog`,
    keywords: ["[topic] blog", "[topic] guides", "[topic] articles"],
  }),

  contact: () => constructMetadata({
    title: "Contact [Company Name] — Get in Touch",
    description: "Have questions? Contact [Company Name] for support, sales, or partnerships.",
    url: `${siteConfig.url}/contact`,
  }),
};
```

---

## 8.2 — ORGANIZATION SCHEMA

**Create file:** `lib/schema.ts` (or `lib/schema.js`)

```typescript
// lib/schema.ts
// All JSON-LD structured data generators

import { siteConfig } from "./seo";

// ─── Organization Schema ────────────────────────────────────────────────────
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/logo.png`,   // ← Update path after reading /public
      width: 200,
      height: 60,
    },
    description: siteConfig.description,
    sameAs: [
      "https://twitter.com/[handle]",       // ← Fill from footer/social links
      "https://linkedin.com/company/[slug]",
      "https://github.com/[org]",
      "https://www.facebook.com/[page]",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "[support@domain.com]",        // ← Fill from contact page
      availableLanguage: "English",
    },
    // Uncomment if physical location found:
    // address: {
    //   "@type": "PostalAddress",
    //   streetAddress: "",
    //   addressLocality: "",
    //   addressRegion: "",
    //   postalCode: "",
    //   addressCountry: "US",
    // },
  };
}

// ─── Website Schema ──────────────────────────────────────────────────────────
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── BreadcrumbList Schema ────────────────────────────────────────────────────
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Article Schema ───────────────────────────────────────────────────────────
export function articleSchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
}: {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      ...(authorUrl && { url: authorUrl }),
    },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "en-US",
  };
}

// ─── FAQ Schema ────────────────────────────────────────────────────────────────
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─── SoftwareApplication Schema (for SaaS products) ─────────────────────────
export function softwareApplicationSchema({
  name,
  description,
  url,
  price,
  priceCurrency = "USD",
  operatingSystem = "Web",
  applicationCategory = "BusinessApplication",
  ratingValue,
  reviewCount,
}: {
  name: string;
  description: string;
  url: string;
  price?: string;
  priceCurrency?: string;
  operatingSystem?: string;
  applicationCategory?: string;
  ratingValue?: number;
  reviewCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    operatingSystem,
    applicationCategory,
    offers: {
      "@type": "Offer",
      price: price || "0",
      priceCurrency,
    },
    ...(ratingValue && reviewCount && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue,
        reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

// ─── LocalBusiness Schema (if physical location) ─────────────────────────────
export function localBusinessSchema({
  name,
  description,
  url,
  telephone,
  email,
  streetAddress,
  city,
  state,
  postalCode,
  country = "US",
  latitude,
  longitude,
  openingHours,
  priceRange,
}: {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  email?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  openingHours?: string[];
  priceRange?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}/#local-business`,
    name,
    description,
    url,
    ...(telephone && { telephone }),
    ...(email && { email }),
    ...(streetAddress && {
      address: {
        "@type": "PostalAddress",
        streetAddress,
        addressLocality: city,
        addressRegion: state,
        postalCode,
        addressCountry: country,
      },
    }),
    ...(latitude && longitude && {
      geo: {
        "@type": "GeoCoordinates",
        latitude,
        longitude,
      },
    }),
    ...(openingHours && { openingHours }),
    ...(priceRange && { priceRange }),
    image: `${siteConfig.url}/og-image.png`,
    logo: `${siteConfig.url}/logo.png`,
  };
}

// ─── Product Schema ────────────────────────────────────────────────────────────
export function productSchema({
  name,
  description,
  image,
  url,
  brand,
  price,
  priceCurrency = "USD",
  availability = "InStock",
  ratingValue,
  reviewCount,
}: {
  name: string;
  description: string;
  image: string;
  url: string;
  brand: string;
  price?: string;
  priceCurrency?: string;
  availability?: string;
  ratingValue?: number;
  reviewCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    ...(price && {
      offers: {
        "@type": "Offer",
        price,
        priceCurrency,
        availability: `https://schema.org/${availability}`,
        url,
      },
    }),
    ...(ratingValue && reviewCount && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue,
        reviewCount,
        bestRating: 5,
      },
    }),
  };
}
```

---

## 8.3 — SCHEMA INJECTION COMPONENT

**Create file:** `components/seo/JsonLd.tsx`

```tsx
// components/seo/JsonLd.tsx
// Renders JSON-LD structured data in <head>

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(Array.isArray(data) ? data : [data], null, 0),
      }}
    />
  );
}
```

---

## 8.4 — ROOT LAYOUT UPDATE

**Modify file:** `app/layout.tsx` (Next.js App Router)
OR `pages/_app.tsx` (Next.js Pages Router)
OR `src/App.tsx` (React)

```tsx
// app/layout.tsx — Next.js App Router version
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["[keyword1]", "[keyword2]", "[keyword3]"],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.png`],
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    // yandex: "",
    // bing: "",
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#[PRIMARY_COLOR]" />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </head>
      <body className={inter.className}>
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
        >
          Skip to main content
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
```

---

## 8.5 — SITEMAP GENERATOR

**Create file:** `app/sitemap.ts` (Next.js App Router)
OR `pages/sitemap.xml.ts` (Next.js Pages Router)

```typescript
// app/sitemap.ts
import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

// ← After reading the codebase, replace this with actual dynamic data fetching
// e.g., fetch blog posts from CMS, product pages from database, etc.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static pages — update this list after reading all routes in Phase 1
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // ← ADD ALL ROUTES FOUND IN PHASE 1 HERE
  ];

  // Dynamic blog posts — uncomment and adapt to your CMS/data source
  // const posts = await getBlogPosts();
  // const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt || post.publishedAt),
  //   changeFrequency: "monthly",
  //   priority: 0.7,
  // }));

  // Dynamic feature pages — adapt as needed
  // const features = await getFeatures();
  // const featurePages: MetadataRoute.Sitemap = features.map((f) => ({
  //   url: `${baseUrl}/features/${f.slug}`,
  //   lastModified: new Date(),
  //   changeFrequency: "monthly",
  //   priority: 0.85,
  // }));

  return [
    ...staticPages,
    // ...blogPages,
    // ...featurePages,
  ];
}
```

---

## 8.6 — ROBOTS.TXT

**Create file:** `app/robots.ts` (Next.js App Router)
OR `public/robots.txt` (static)

```typescript
// app/robots.ts
import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/dashboard/",   // ← Add any private/app routes found in Phase 1
          "/settings/",
          "/account/",
        ],
      },
      {
        userAgent: "GPTBot",    // Allow OpenAI crawlers
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/"],
      },
      {
        userAgent: "Google-Extended",  // Allow Google AI crawlers
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",     // Allow Anthropic crawlers
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",    // Allow Perplexity crawlers
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
```

---

## 8.7 — FAQ COMPONENT

**Create file:** `components/seo/FAQSection.tsx`

```tsx
// components/seo/FAQSection.tsx
"use client";

import { useState } from "react";
import { JsonLd } from "./JsonLd";
import { faqSchema } from "@/lib/schema";

type FAQ = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  faqs: FAQ[];
  title?: string;
  className?: string;
};

export function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  className = "",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className={`faq-section py-16 ${className}`}
      aria-labelledby="faq-heading"
    >
      <JsonLd data={faqSchema(faqs)} />

      <div className="max-w-3xl mx-auto px-4">
        <h2
          id="faq-heading"
          className="text-3xl font-bold text-center mb-10"
        >
          {title}
        </h2>

        <div
          itemScope
          itemType="https://schema.org/FAQPage"
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center p-5 text-left font-medium hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span itemProp="name">{faq.question}</span>
                <span
                  className="ml-4 flex-shrink-0 transition-transform duration-200"
                  style={{
                    transform:
                      openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>

              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                hidden={openIndex !== index}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <div
                  className="p-5 pt-0 text-gray-600 leading-relaxed"
                  itemProp="text"
                >
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 8.8 — BREADCRUMB COMPONENT

**Create file:** `components/seo/Breadcrumb.tsx`

```tsx
// components/seo/Breadcrumb.tsx
import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/seo";

type BreadcrumbItem = {
  name: string;
  href: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const schemaItems = [
    { name: "Home", url: siteConfig.url },
    ...items.map((item) => ({
      name: item.name,
      url: `${siteConfig.url}${item.href}`,
    })),
  ];

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <JsonLd data={breadcrumbSchema(schemaItems)} />

      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className="flex items-center flex-wrap gap-1"
      >
        <li
          itemScope
          itemProp="itemListElement"
          itemType="https://schema.org/ListItem"
        >
          <Link
            href="/"
            itemProp="item"
            className="text-gray-500 hover:text-gray-700"
          >
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) => (
          <li
            key={index}
            itemScope
            itemProp="itemListElement"
            itemType="https://schema.org/ListItem"
            className="flex items-center gap-1"
          >
            <span className="text-gray-400" aria-hidden="true">
              /
            </span>
            {index === items.length - 1 ? (
              <span
                itemProp="name"
                className="text-gray-900 font-medium"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                itemProp="item"
                className="text-gray-500 hover:text-gray-700"
              >
                <span itemProp="name">{item.name}</span>
              </Link>
            )}
            <meta itemProp="position" content={String(index + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

---

## 8.9 — BLOG POST TEMPLATE WITH FULL SEO

**Modify file:** `app/blog/[slug]/page.tsx`
(Adapt path to match actual blog route found in Phase 1)

```tsx
// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { FAQSection } from "@/components/seo/FAQSection";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/seo";

// ← Replace with actual data fetching from your CMS/database
async function getPost(slug: string) {
  // Return null if not found to trigger notFound()
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blog/${params.slug}`;

  return {
    title: (post as any).title,
    description: (post as any).excerpt,
    authors: [{ name: (post as any).author?.name }],
    openGraph: {
      title: (post as any).title,
      description: (post as any).excerpt,
      url,
      type: "article",
      publishedTime: (post as any).publishedAt,
      modifiedTime: (post as any).updatedAt,
      authors: [(post as any).author?.name],
      images: [
        {
          url: (post as any).ogImage || `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: (post as any).title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: (post as any).title,
      description: (post as any).excerpt,
      images: [(post as any).ogImage || `${siteConfig.url}/og-image.png`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const url = `${siteConfig.url}/blog/${params.slug}`;

  const schema = articleSchema({
    title: (post as any).title,
    description: (post as any).excerpt,
    url,
    imageUrl: (post as any).ogImage,
    datePublished: (post as any).publishedAt,
    dateModified: (post as any).updatedAt,
    authorName: (post as any).author?.name,
    authorUrl: (post as any).author?.profileUrl,
  });

  return (
    <>
      <JsonLd data={schema} />

      <article
        itemScope
        itemType="https://schema.org/Article"
        className="max-w-3xl mx-auto px-4 py-12"
      >
        <Breadcrumb
          items={[
            { name: "Blog", href: "/blog" },
            { name: (post as any).title, href: `/blog/${params.slug}` },
          ]}
          className="mb-6"
        />

        <header className="mb-8">
          <h1
            itemProp="headline"
            className="text-4xl font-bold mb-4 leading-tight"
          >
            {(post as any).title}
          </h1>

          <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
            <div
              itemScope
              itemProp="author"
              itemType="https://schema.org/Person"
            >
              <span itemProp="name">{(post as any).author?.name}</span>
            </div>
            <time
              itemProp="datePublished"
              dateTime={(post as any).publishedAt}
            >
              {new Date((post as any).publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>{(post as any).readingTime} min read</span>
          </div>

          {(post as any).ogImage && (
            <div itemProp="image" className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
              <Image
                src={(post as any).ogImage}
                alt={(post as any).title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}
        </header>

        <div
          itemProp="articleBody"
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: (post as any).content }}
        />

        {/* FAQ Section — populate based on article topic */}
        {(post as any).faqs && (post as any).faqs.length > 0 && (
          <FAQSection
            faqs={(post as any).faqs}
            title="Frequently Asked Questions"
            className="mt-12 border-t pt-12"
          />
        )}

        {/* Related posts internal linking */}
        {(post as any).relatedPosts && (
          <section className="mt-12 border-t pt-12" aria-label="Related articles">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {(post as any).relatedPosts.map((related: any) => (
                <a
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="block p-4 border rounded-lg hover:border-blue-500 transition-colors"
                >
                  <h3 className="font-semibold mb-2">{related.title}</h3>
                  <p className="text-gray-500 text-sm">{related.excerpt}</p>
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
```

---

## 8.10 — HOMEPAGE SEO ENHANCEMENT

**Modify file:** `app/page.tsx` (or equivalent homepage file)

```tsx
// app/page.tsx — Add/modify the metadata export at the top
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQSection } from "@/components/seo/FAQSection";
import {
  organizationSchema,
  websiteSchema,
  softwareApplicationSchema,  // Use if SaaS
  faqSchema,
} from "@/lib/schema";
import { siteConfig } from "@/lib/seo";

// ← Fill in after reading actual homepage content in Phase 2-3
export const metadata: Metadata = {
  title: "[Primary Keyword] — [Company Name]",
  description:
    "[Benefit-led description. Include primary keyword in first 11 words. 120-155 characters.]",
  keywords: [
    "[primary keyword]",
    "[secondary keyword]",
    "[long-tail keyword]",
    "[brand keyword]",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
};

// ← Populate these with REAL questions after Phase 2 analysis
const homepageFAQs = [
  {
    question: "What is [Product Name]?",
    answer:
      "[Product Name] is a [category] that helps [target audience] to [primary outcome]. It [key differentiator] so that [key benefit].",
  },
  {
    question: "How does [Product Name] work?",
    answer:
      "[Product Name] works by [mechanism]. Users [action 1], then [action 2], and finally [outcome]. The entire process takes [timeframe].",
  },
  {
    question: "How much does [Product Name] cost?",
    answer:
      "[Product Name] offers [pricing tiers]. The [plan name] starts at [price]. [Free trial info if applicable].",
  },
  {
    question: "Who is [Product Name] designed for?",
    answer:
      "[Product Name] is designed for [audience 1], [audience 2], and [audience 3] who need [solution to pain point].",
  },
  {
    question: "Is there a free trial for [Product Name]?",
    answer:
      "Yes, [Product Name] offers a [X]-day free trial with no credit card required. You can [what they can do in trial] before committing to a paid plan.",
  },
  {
    question: "What makes [Product Name] different from competitors?",
    answer:
      "[Product Name] stands out because [USP 1], [USP 2], and [USP 3]. Unlike [competitor category], [Product Name] [key differentiator].",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Inject global + page-specific schemas */}
      <JsonLd
        data={[
          organizationSchema(),
          websiteSchema(),
          faqSchema(homepageFAQs),
          // softwareApplicationSchema({ ... })  ← Uncomment for SaaS
        ]}
      />

      {/* ─── EXISTING PAGE CONTENT GOES HERE ─── */}
      {/* Do not remove existing components. */}
      {/* Add the FAQ section at the bottom of the page: */}

      <FAQSection
        faqs={homepageFAQs}
        title="Frequently Asked Questions"
      />
    </>
  );
}
```

---

## 8.11 — IMAGE OPTIMIZATION AUDIT & FIXES

Search the entire codebase for:
1. `<img` tags → Replace with `<Image>` from `next/image` (Next.js) or add `loading="lazy"` + `width` + `height`
2. Images without `alt` attributes → Add descriptive alt text
3. Images with empty `alt=""` that are NOT decorative → Add content
4. `background-image` in CSS for content images → Move to `<img>` or `<Image>`

**For every `<img>` found:**
```tsx
// BEFORE (bad):
<img src="/hero.png" />

// AFTER (Next.js):
import Image from "next/image";
<Image
  src="/hero.png"
  alt="[descriptive alt text based on image content]"
  width={1200}
  height={630}
  priority={true}  // Only for above-the-fold images
  // priority={false} for below-the-fold images
  className="[existing classes]"
/>

// AFTER (plain HTML/React):
<img
  src="/hero.png"
  alt="[descriptive alt text]"
  width="1200"
  height="630"
  loading="lazy"    // Use "eager" for above-the-fold
  decoding="async"
/>
```

---

## 8.12 — CORE WEB VITALS FIXES

**In `app/layout.tsx` or `_document.tsx`, add font preloading:**

```tsx
// In <head>:
<link
  rel="preload"
  href="/fonts/[font-name].woff2"  // ← Use actual font from codebase
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```

**Fix Cumulative Layout Shift (CLS):**
- Add explicit `width` and `height` to ALL images
- Add `aspect-ratio` CSS to image containers
- Avoid inserting content above existing content on load
- Reserve space for ads/embeds

**Fix Largest Contentful Paint (LCP):**
- Add `priority` prop to the hero image
- Preload the hero image
- Use `fetchpriority="high"` on the LCP element

**Fix Interaction to Next Paint (INP):**
- Defer non-critical JavaScript
- Use `loading="lazy"` on below-fold images
- Avoid long tasks on the main thread

---

## 8.13 — SEMANTIC HTML IMPROVEMENTS

Search for non-semantic HTML and replace:

```html
<!-- BEFORE: -->
<div class="header">...</div>
<div class="nav">...</div>
<div class="main">...</div>
<div class="sidebar">...</div>
<div class="footer">...</div>
<div class="article">...</div>
<div class="section">...</div>

<!-- AFTER: -->
<header>...</header>
<nav aria-label="Main navigation">...</nav>
<main id="main-content">...</main>
<aside aria-label="Related content">...</aside>
<footer>...</footer>
<article>...</article>
<section aria-labelledby="section-heading">...</section>
```

---

## 8.14 — ACCESSIBILITY IMPROVEMENTS

**Forms — add proper labels:**
```tsx
// BEFORE:
<input type="email" placeholder="Enter email" />

// AFTER:
<label htmlFor="email" className="sr-only">Email address</label>
<input
  id="email"
  type="email"
  placeholder="Enter email"
  aria-label="Email address"
  autoComplete="email"
  required
  aria-required="true"
/>
```

**Buttons — add ARIA labels where text is missing:**
```tsx
// BEFORE:
<button><svg>...</svg></button>

// AFTER:
<button aria-label="Close menu" type="button">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>
```

**Navigation — add skip link and ARIA:**
```tsx
// Already added in layout — ensure main nav has:
<nav role="navigation" aria-label="Main">
  <ul role="list">
    <li><a href="/">Home</a></li>
    {/* ... */}
  </ul>
</nav>
```

---

## 8.15 — CONTENT STRATEGY IMPLEMENTATION

### New Pages to Create (based on competitor analysis):

**Page 1: Comparison Page**
- Path: `app/[product]-vs-[competitor]/page.tsx`
- Target keyword: "[Product] vs [Competitor]"
- Template: Side-by-side feature comparison, FAQ, CTA

**Page 2: Use Case Pages**
- Path: `app/use-cases/[use-case]/page.tsx`
- Target: "[solution] for [industry/role]"
- Template: Hero, problem, solution, features, testimonial, CTA

**Page 3: Integration Pages**
- Path: `app/integrations/[tool]/page.tsx`
- Target: "[Product] + [Tool] integration"
- Template: Overview, how it works, benefits, setup guide, FAQ

**Page 4: Glossary Page**
- Path: `app/glossary/page.tsx`
- Target: "[industry] terms", "[keyword] meaning"
- Template: A-Z terms with definitions, links to related content

**Page 5: Free Tool/Calculator**
- Path: `app/tools/[tool-name]/page.tsx`
- Target: "free [industry] calculator/tool"
- Template: Interactive tool, explanation, CTA

---

## 8.16 — INTERNAL LINKING AUDIT & FIXES

After analyzing all pages in Phase 3:

1. **Create an internal linking map:**
   - Which pages get NO inbound internal links? → Add links from related pages
   - Which pages should link to each other? → Update content

2. **Anchor text rules:**
   - Use keyword-rich anchor text (not "click here" or "read more")
   - Vary anchor text for the same target URL
   - Never use the full URL as anchor text

3. **Footer links:**
   Ensure the footer links to:
   - All main pages (Features, Pricing, About, Blog, Contact)
   - Legal pages (Privacy, Terms)
   - Social profiles

4. **Blog post internal links:**
   Every blog post must link to:
   - At least 3 other relevant blog posts
   - At least 1 product/feature page
   - The homepage (where natural)

---

## 8.17 — OPEN GRAPH IMAGE GENERATOR

**Create file:** `app/og/route.tsx` (Next.js dynamic OG images)

```tsx
// app/og/route.tsx
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { siteConfig } from "@/lib/seo";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || siteConfig.name;
  const description = searchParams.get("description") || siteConfig.description;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          backgroundColor: "#0f172a",  // ← Match brand color from CSS
          padding: "60px",
        }}
      >
        {/* Logo area */}
        <div style={{ display: "flex", marginBottom: "24px" }}>
          <span style={{ color: "#fff", fontSize: 32, fontWeight: 700 }}>
            {siteConfig.name}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "16px",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 24,
            color: "#94a3b8",
            maxWidth: "800px",
          }}
        >
          {description}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

---

## 8.18 — PERFORMANCE OPTIMIZATION

**In `next.config.js` / `next.config.mjs`, add:**

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      // ← Add your image CDN domains from Phase 1
      // { protocol: "https", hostname: "images.ctfassets.net" },
    ],
  },

  // Compression
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects — add any needed redirects from audit
  async redirects() {
    return [
      // Example: redirect /home to /
      // { source: "/home", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
```

---

# ═══════════════════════════════════════════════════════════
# PHASE 9 — IMPLEMENTATION ROADMAP & FINAL REPORTS
# ═══════════════════════════════════════════════════════════

## Step 9.1 — Priority Matrix

After completing all phases, output this priority matrix:

```
PRIORITY | TASK                              | EFFORT | IMPACT  | STATUS
---------|-----------------------------------|--------|---------|--------
CRITICAL | Fix missing title tags            | Low    | High    | [ ]
CRITICAL | Add/fix sitemap.xml               | Low    | High    | [ ]
CRITICAL | Add robots.txt                    | Low    | Medium  | [ ]
CRITICAL | Fix broken canonical tags         | Low    | High    | [ ]
CRITICAL | Fix multiple H1s                  | Low    | High    | [ ]
HIGH     | Add Organization schema           | Low    | High    | [ ]
HIGH     | Add meta descriptions             | Low    | High    | [ ]
HIGH     | Add OG/Twitter tags               | Medium | High    | [ ]
HIGH     | Add FAQ schema to homepage        | Medium | High    | [ ]
HIGH     | Fix missing image alt texts       | Medium | Medium  | [ ]
HIGH     | Add Article schema to blog posts  | Medium | High    | [ ]
HIGH     | Create dynamic sitemap            | Medium | High    | [ ]
HIGH     | Fix Core Web Vitals (LCP/CLS)     | High   | High    | [ ]
HIGH     | Add breadcrumb schema             | Low    | Medium  | [ ]
HIGH     | Fix internal linking gaps         | Medium | High    | [ ]
MEDIUM   | Create comparison pages           | High   | High    | [ ]
MEDIUM   | Create use case pages             | High   | High    | [ ]
MEDIUM   | Add FAQ sections to all pages     | Medium | High    | [ ]
MEDIUM   | Improve semantic HTML             | Medium | Medium  | [ ]
MEDIUM   | Add skip navigation links         | Low    | Low     | [ ]
MEDIUM   | Optimize images (WebP/AVIF)       | Medium | Medium  | [ ]
MEDIUM   | Create integration pages          | High   | High    | [ ]
LOW      | OG image generator                | Medium | Medium  | [ ]
LOW      | Add glossary page                 | High   | Medium  | [ ]
LOW      | Create free tools                 | High   | High    | [ ]
```

## Step 9.2 — Expected Outcomes

Document expected improvements after implementation:

```
METRIC                    | CURRENT | EXPECTED (90 DAYS)
--------------------------|---------|--------------------
Google Search impressions |  X/mo   | 2-3x increase
Click-through rate        |  X%     | +30-50% increase
AI citation appearances   |  0      | Trackable citations
Core Web Vitals score     |  X/100  | 90+ score
Schema markup coverage    |  X%     | 100%
Pages with metadata       |  X%     | 100%
Indexed pages             |  X      | All public pages
Average position          |  X      | Improvement
```

---

# ═══════════════════════════════════════════════════════════
# FRAMEWORK-SPECIFIC OVERRIDES
# ═══════════════════════════════════════════════════════════

## IF Framework = Nuxt.js (Vue)
Replace Next.js-specific code with:
```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://[domain].com',
    name: '[Company Name]',
  },
  modules: ['@nuxtjs/seo', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  sitemap: { autoLastmod: true },
})
```

## IF Framework = Astro
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://[domain].com',
  integrations: [sitemap()],
});

// In every page frontmatter:
---
import BaseLayout from '../layouts/BaseLayout.astro';
const title = "[Page Title]";
const description = "[Page Description]";
---
<BaseLayout {title} {description}>
  <!-- content -->
</BaseLayout>
```

## IF Framework = SvelteKit
```javascript
// src/app.html
// Add to <head>:
<meta name="description" content="%sveltekit.description%" />

// src/routes/+layout.server.ts
export const load = () => ({
  title: "[Site Name]",
  description: "[Site Description]",
});
```

## IF Framework = Gatsby
```javascript
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: "[Site Name]",
    siteUrl: "https://[domain].com",
    description: "[Description]",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-robots-txt",
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: { siteUrl: "https://[domain].com" },
    },
  ],
};
```

---

# ═══════════════════════════════════════════════════════════
# FINAL CHECKLIST — VERIFY BEFORE COMPLETING
# ═══════════════════════════════════════════════════════════

Before marking implementation complete, verify:

**Technical SEO:**
- [ ] Every page has a unique, keyword-rich title tag (< 60 chars)
- [ ] Every page has a unique meta description (< 155 chars)
- [ ] Every page has a self-referencing canonical tag
- [ ] sitemap.xml exists and includes all public pages
- [ ] robots.txt exists and allows AI crawlers
- [ ] No broken internal links
- [ ] All images have descriptive alt text
- [ ] All images use lazy loading (except above-fold)
- [ ] viewport meta tag on every page
- [ ] lang="en" on <html> tag

**Schema Markup:**
- [ ] Organization schema on homepage
- [ ] WebSite schema on homepage
- [ ] BreadcrumbList on all deep pages
- [ ] Article schema on all blog posts
- [ ] FAQ schema on pages with FAQs
- [ ] Product/SoftwareApplication schema (if applicable)

**AEO:**
- [ ] Homepage FAQ section (5+ questions)
- [ ] Feature pages FAQ sections
- [ ] Pricing page FAQ section
- [ ] Conversational language in H2/H3 headings
- [ ] Direct answers within first 100 words of key sections

**GEO:**
- [ ] Company described as an entity with clear name, type, description
- [ ] Social media profiles mentioned in sameAs
- [ ] Author information on blog posts
- [ ] Statistics and data cited with sources
- [ ] Original insights in content

**Performance:**
- [ ] Hero image uses priority loading
- [ ] All below-fold images use lazy loading
- [ ] Fonts preloaded
- [ ] Security headers added
- [ ] Images use WebP/AVIF where possible

**Accessibility:**
- [ ] Skip-to-main-content link at top
- [ ] All images have alt text
- [ ] All forms have labels
- [ ] All buttons have accessible names
- [ ] Focus states visible
- [ ] Sufficient color contrast (4.5:1 minimum)
- [ ] Semantic HTML throughout

---

# ═══════════════════════════════════════════════════════════
# NOTES FOR CURSOR EXECUTION
# ═══════════════════════════════════════════════════════════

1. Execute Phase 1 (codebase read) before modifying ANY files.
2. All [PLACEHOLDER] values must be replaced with REAL content from the codebase.
3. Do not use generic Lorem Ipsum content anywhere.
4. All schema values must reflect real business information.
5. If a framework-specific approach differs from Next.js examples above,
   adapt the patterns to the correct framework detected in Phase 1.
6. Create all new files AFTER completing analysis phases.
7. Output a summary of every file created or modified at the end.
8. If you encounter ambiguity in Phase 1, read more files before proceeding.
9. Do NOT remove existing functionality while adding SEO improvements.
10. Test that all JSON-LD is valid using schema.org validator patterns.

---
# END OF CURSOR PROMPT
# Total implementation scope: ~25-35 file changes / creations
# Estimated time to execute: 45-90 minutes (Cursor)
# Expected SEO impact: Significant improvement within 60-90 days
