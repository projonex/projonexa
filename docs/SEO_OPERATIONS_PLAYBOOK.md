# Projonexa SEO/AEO/GEO Operations Playbook

This playbook defines the weekly operating system for sustainable ranking growth.

## 1) Weekly Cadence

Run this cycle once every week:

1. **Data pull and audit** (Search Console + Analytics + AI mention checks)
2. **Prioritization** (pick 3 highest-impact actions)
3. **Execution** (metadata/content/internal links/schema)
4. **Validation and release checks**
5. **Performance review and backlog update**

## 2) Weekly KPI Targets

Track these every week:

- SEO: impressions, clicks, CTR, average position, indexed pages
- AEO: answer extraction coverage on key pages, FAQ visibility, AI mention snapshots
- GEO: India/Maharashtra query share, local-intent clicks, geo-qualified leads
- Conversion: contact submissions, inquiry forms, lead quality notes

## 3) Priority Rules (What to Work On First)

Always choose work in this order:

1. Indexing/canonical/schema issues
2. Low CTR on high-impression pages
3. Pages ranking in positions 4-20 (quick-win candidates)
4. Missing answer blocks on high-intent pages
5. Internal link gaps to pillar pages

## 4) Weekly Task Checklist

## 4.1 Technical SEO

- Run `npm run seo:validate`
- Run `npm run sitemap:generate`
- Ensure no unintended route dropped from `public/sitemap.xml`
- Verify canonical, title, description and schema output on top pages

## 4.2 CTR Optimization

- Run `npm run seo:ctr:export`
- Review `docs/SEO_CTR_VARIANTS.csv`
- Select 1 candidate variant pair for each top page (`/`, `/services`, `/pricing`, `/faq`, `/contact`)
- Log which variant is active and test window start date

## 4.3 AEO Operations

- Confirm answer-first blocks remain visible and updated
- Ensure FAQ schema matches visible Q&A exactly
- Add 2-3 new user-intent questions to FAQ when new patterns appear

## 4.4 GEO Operations

- Keep India/Maharashtra terms natural across priority page content
- Check `geo.region`, `geo.placename`, and `areaServed` consistency
- Add one local relevance proof point each month (case, testimonial, city-specific context)

## 4.5 Internal Linking

- Add at least 5 intent-matched links from supporting pages to pillar pages
- Ensure no orphan page among indexable routes

## 5) Release Gate (Must Pass Before Deploy)

- `npm run seo:validate` passes
- `npm run sitemap:generate` passes
- `npm run build` passes
- Updated pages reviewed for keyword stuffing and readability
- QA spot-check complete for home/services/pricing/faq/contact

## 6) Rank Growth Rules

- Do not chase vanity traffic; prioritize intent + conversion.
- Do not add FAQ/schema that is not visible on-page.
- Do not over-optimize copy; keep content natural and specific.
- Improve existing high-potential pages before creating too many new pages.

## 7) Weekly Reporting Format

At the end of each week, write a short report:

- What changed (metadata/content/schema/links)
- KPI movement (up/down with reason)
- What worked best
- What failed and why
- Top 3 actions for next week
