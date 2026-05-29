# Projonexa SEO, GEO & AEO Strategy

Complete search optimization strategy for [projonexa.com](https://projonexa.com) — the official Projonexa website.

---

## Overview

| Layer | Goal | Implementation |
|-------|------|----------------|
| **SEO** | Rank on Google/Bing for project keywords | Meta tags, sitemap, structured data, content |
| **GEO** | Local visibility in India / Maharashtra | Geo meta, LocalBusiness schema, area served |
| **AEO** | Appear in AI answers (ChatGPT, Perplexity, etc.) | FAQ schema, clear Q&A content, AI bot access |

---

## SEO — Search Engine Optimization

### Target Keywords

| Priority | Keywords |
|----------|----------|
| Primary | final year projects, engineering projects, AI projects, academic projects |
| Secondary | startup MVP development, research paper assistance, project assistance India |
| Long-tail | final year project help Maharashtra, BE project development India, BTech project with documentation |
| Brand | Projonexa, projonexa.com |

### On-Page SEO

- Unique `<title>` and `<meta description>` per route — `src/data/seo.ts`
- Canonical URLs via `react-helmet-async`
- Semantic HTML: `<main>`, `<section>`, `<article>`, `<h1>`–`<h3>` hierarchy
- Skip-to-content link for accessibility
- `robots`: `index, follow, max-image-preview:large`
- `lang="en-IN"` on `<html>`

### Technical SEO

| Asset | Location |
|-------|----------|
| Sitemap | `public/sitemap.xml` |
| Robots | `public/robots.txt` |
| Web manifest | `public/site.webmanifest` |
| Favicon | `public/favicon.svg` |
| OG image | `public/og-image.png` *(add 1200×630)* |

### Structured Data (JSON-LD)

Generated in `src/lib/structured-data.ts`, injected via `src/components/seo/SEO.tsx`:

| Schema | Purpose |
|--------|---------|
| `Organization` | Brand identity, founder, contact |
| `WebSite` | Site entity + SearchAction |
| `ProfessionalService` | Business / service provider (GEO) |
| `WebPage` | Per-page context |
| `BreadcrumbList` | Navigation trail |
| `FAQPage` | FAQ + homepage AEO Q&A |
| `ItemList` + `Service` | Service catalog |

---

## GEO — Geographic / Local SEO

### Configuration

`src/data/brand.ts` → `GEO` constant:

- Region: **Maharashtra, India**
- Coordinates: 19.7515°N, 75.7139°E
- Area served: India, Maharashtra, Mumbai, Pune, Nagpur, Nashik, Aurangabad, Global

### Meta Tags

```html
<meta name="geo.region" content="IN-MH" />
<meta name="geo.placename" content="Maharashtra, India" />
<meta name="geo.position" content="19.7515;75.7139" />
<meta name="ICBM" content="19.7515, 75.7139" />
```

### On-Site GEO Content

- Hero: "Serving students & clients across India · Based in Maharashtra"
- `ServiceArea` section on homepage
- Footer: structured address (Maharashtra, India)
- Page titles/descriptions include India / Maharashtra where relevant

### Post-Launch GEO Checklist

- [ ] Google Business Profile (if applicable)
- [ ] Google Search Console — set target country: India
- [ ] Bing Webmaster Tools
- [ ] Local citations (LinkedIn, college directories)

---

## AEO — Answer Engine Optimization

Optimizes content for **AI search** (ChatGPT, Perplexity, Google AI Overviews, Claude).

### Principles

1. **Direct answers** — Clear question → concise answer format
2. **FAQPage schema** — Machine-readable Q&A on `/` and `/faq`
3. **Definition paragraph** — `AEO_DEFINITION` in brand data
4. **Visible Q&A block** — `AEOOverview` section on homepage
5. **Allow AI crawlers** — `robots.txt` permits GPTBot, ClaudeBot, PerplexityBot, etc.

### AEO Content Locations

| Location | Content |
|----------|---------|
| Homepage | `AEOOverview` — 5 core Q&A pairs |
| FAQ page | 10+ accordion Q&As with microdata |
| JSON-LD | `FAQPage` schema on home + FAQ |
| Brand data | `AEO_DEFINITION` one-liner |

### Sample AI-Ready Answer

**Q: What is Projonexa?**  
**A:** Projonexa is a technology-driven innovation platform based in Maharashtra, India that provides end-to-end project development for students, colleges, startups, and businesses — including final year projects, AI/ML systems, startup MVPs, IoT solutions, and research paper assistance.

---

## Page-Level SEO Map

| Page | Focus keywords |
|------|----------------|
| `/` | final year projects India, innovation platform |
| `/services` | project development services, engineering projects |
| `/research` | research paper help, IEEE paper India |
| `/pricing` | affordable final year project, student pricing |
| `/contact` | contact projonexa, project inquiry India |
| `/faq` | final year project FAQ, project help questions |

---

## Monitoring & Maintenance

1. **Google Search Console** — impressions, clicks, indexing
2. **Update sitemap** `lastmod` when pages change significantly
3. **Refresh FAQ/AEO** content when services evolve
4. **Add `og-image.png`** before social launch
5. **Core Web Vitals** — monitor after deployment (Vercel Analytics / PageSpeed)

---

## File Reference

```
src/
├── components/seo/SEO.tsx       # Meta tags + JSON-LD injection
├── lib/structured-data.ts       # Schema generators
├── data/seo.ts                  # Per-page SEO + AEO_HOME_FAQ
├── data/brand.ts                # GEO + AEO_DEFINITION
├── components/sections/
│   ├── AEOOverview.tsx          # Visible Q&A (AEO)
│   └── ServiceArea.tsx          # Geographic section (GEO)
public/
├── robots.txt                   # SEO + AEO crawlers
├── sitemap.xml
└── site.webmanifest
```

---

<div align="center">

**Projonexa** — *Where Innovation Meets Execution.*

</div>
