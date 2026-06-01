# Pull Request: SEO/AEO/GEO platform & brand identity refresh

**Suggested PR title**

```
feat(seo, brand): SEO/AEO/GEO metadata system, logo assets, and Projonexa wordmark
```

**Branch:** `feature/seo-aeo-geo` → `main`

---

## Summary

This PR delivers two major improvements to the Projonexa marketing site:

1. **SEO / AEO / GEO growth system** — Typed page metadata, build-time validation, richer JSON-LD, sitemap generation, and operational documentation for search and answer-engine visibility.
2. **Brand identity refresh** — New `logo.png` and favicon set, professional navbar/footer logo treatment (frosted mark in light & dark mode), custom **Projonexa** wordmark (`Projone` + gradient `x` + `a`), embedded OG image, and restored decorative text watermarks in footer/CTA sections.

---

## Brand & UI

| Area | Change |
|------|--------|
| **Logo mark** | `public/logo.png` with frosted dark-glass container; `mix-blend-mode: screen` removes black plate; light mode uses dark blurred tile matching dark-mode clarity |
| **Wordmark** | `BrandNameWordmark` — Nunito, capital **P**, cyan→blue gradient **x** with glow |
| **Components** | `Logo`, `BrandLogoImage`, `BrandNameWordmark`; `ApplyPageBrand` uses shared `Logo` |
| **Watermarks** | `BrandWordmark` keeps large CSS text watermarks (footer, CTA, page headers) — not replaced by logo image |
| **Assets** | `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png`; removed `favicon.svg` |
| **OG** | `og-image.svg` with embedded logo, brand gradient, **Projonexa** styling, tagline without location suffix |

---

## SEO / AEO / GEO

| Area | Change |
|------|--------|
| **Metadata model** | Extended `src/data/seo.ts` with intent, audience, keywords, conversion goals per route |
| **Validation** | `npm run validate:seo` via `scripts/validate-seo.mjs` |
| **Sitemap** | Build-time generation (`scripts/generate-sitemap.mjs`) |
| **CTR tooling** | `scripts/export-ctr-variants.mjs` + `docs/SEO_CTR_VARIANTS.csv` |
| **Structured data** | Organization logo → `logo.png`; FAQ/schema updates on key pages |
| **Crawler hints** | `public/llms.txt`, updated `sitemap.xml`, `site.webmanifest` |
| **Pages** | Home, Services, Pricing, Contact, FAQ — FAQ blocks + SEO copy improvements |
| **Docs** | Strategy, operations playbook, monthly review template, implementation plan & growth spec |

---

## Files changed (high level)

- **Public:** `logo.png`, favicons, `og-image.svg`, `llms.txt`, `site.webmanifest`, `sitemap.xml`
- **UI:** `Logo.tsx`, `BrandNameWordmark.tsx`, `BrandLogoImage.tsx`, `brand-assets.ts`, `index.css`
- **SEO:** `seo.ts`, `SEO.tsx`, `structured-data.ts`, page components, `scripts/*`
- **Docs:** `SEO_STRATEGY.md`, `SEO_OPERATIONS_PLAYBOOK.md`, superpowers plan/spec

**Diff vs `main`:** ~43 files, +2,742 / −141 lines (includes binary logo assets).

---

## Test plan

- [ ] `npm run build` passes
- [ ] `npm run validate:seo` passes (if wired in CI)
- [ ] **Light mode:** Navbar & footer — logo mark visible on dark frosted tile; wordmark reads **Projonexa** with gradient **x**
- [ ] **Dark mode:** Logo mark and wordmark match header/footer styling
- [ ] Footer / CTA / inner pages — decorative **Projonexa** text watermarks unchanged
- [ ] Careers apply & inquiry shells — stacked logo + name
- [ ] Browser tab favicon and mobile home-screen icon
- [ ] Open `/og-image.svg` — logo + copy render (large file due to embedded PNG)
- [ ] Spot-check meta tags on `/`, `/services`, `/pricing`, `/contact`, `/faq`
- [ ] Validate structured data with [Google Rich Results Test](https://search.google.com/test/rich-results) on home + FAQ

---

## Notes for reviewers

- `public/logo.png` is ~500 KB; consider compression in a follow-up PR without visual change.
- `og-image.svg` embeds logo as base64 for reliable social previews (~660 KB).
- Decorative watermarks intentionally remain CSS text, separate from the navigational `Logo` component.

---

## Commits included (14)

1. SEO/AEO/GEO implementation plan & typed metadata model  
2. Page-level SEO enhancements & validation script  
3. FAQ schema & sitemap updates  
4. Metadata copy refresh across routes  
5. CTR workflow & operations docs  
6. OG SVG format, `llms.txt`, strategy updates  
7. Logo/favicon assets & brand components  
8. BrandWordmark text watermarks restored  
9. Logo component rollout (header, footer, apply flows)  
10. Placement variants & frosted logo styling  
11. Light-mode dark-glass logo tile  
12. **Projonexa** wordmark (Nunito, gradient **x**, capital **P**)
