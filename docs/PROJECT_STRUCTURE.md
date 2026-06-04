# Project structure

Canonical layout for **projonexa-main-website** (Next.js 15 App Router).

```
projonexa-main-website/
├── .github/                    # CI, issue/PR templates, Dependabot, CODEOWNERS
├── docs/                       # Architecture, brand, SEO, deployment guides
│   ├── archive/                # Historical PR notes (not active specs)
│   ├── deployment/             # Host-specific examples (Netlify, etc.)
│   └── pull-requests/          # PR write-ups for major features
├── public/                     # Static files served as-is
│   ├── img/                    # Optimized images (e.g. founder photo)
│   ├── og/                     # Generated Open Graph PNGs (1200×630)
│   ├── robots.txt              # Fallback; primary robots from app/robots.ts
│   ├── sitemap.xml             # Generated at build (mirrors app/sitemap.ts)
│   ├── llms.txt                # LLM / answer-engine site summary
│   └── …                       # Favicons, logo, manifest
├── scripts/                    # Build-time Node scripts (see scripts/README.md)
├── src/
│   ├── app/                    # Routes, layouts, metadata (Next.js App Router)
│   │   ├── (site)/             # Main site shell (Header + Footer)
│   │   ├── careers/apply/      # Standalone apply flow
│   │   ├── inquiry/              # Standalone inquiry forms
│   │   ├── layout.tsx          # Root HTML, fonts, global providers
│   │   ├── not-found.tsx       # Global 404
│   │   ├── robots.ts           # Dynamic robots.txt
│   │   └── sitemap.ts          # Dynamic sitemap.xml
│   ├── components/
│   │   ├── careers/            # Career forms & apply UI
│   │   ├── contact/            # Contact form
│   │   ├── inquiry/            # Student / corporate / affiliate forms
│   │   ├── layout/             # Header, Footer, Layout, 404 shell
│   │   ├── projects/           # Project detail blocks
│   │   ├── providers/          # Client providers (theme)
│   │   ├── sections/           # Marketing page sections
│   │   ├── seo/                # JSON-LD & AEO UI helpers
│   │   └── ui/                 # Buttons, logos, primitives
│   ├── constants/              # Static asset paths, OG image keys
│   ├── context/                # React context (theme)
│   ├── data/                   # Content & PAGE_SEO (single source of truth)
│   ├── hooks/                  # Client hooks
│   ├── lib/
│   │   ├── seo/                # Metadata, schema, sitemap helpers
│   │   └── …                   # Navigation, motion, referral, theme
│   ├── theme/                    # Design tokens (colors.json, Tailwind preset)
│   ├── views/                  # Page UI composed by app/*/page.tsx
│   └── index.css               # Global styles & Tailwind layers
├── next.config.ts
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── package.json
```

## Conventions

| Location | Responsibility |
|----------|----------------|
| `src/app/**/page.tsx` | Route entry: `metadata` / `generateMetadata`, `PageSeo`, imports a **view** |
| `src/views/*.tsx` | Page composition (sections, forms); `'use client'` when using hooks/motion |
| `src/data/*.ts` | Copy, config, `PAGE_SEO` — edit content without touching layout |
| `src/lib/seo/` | SEO, AEO, GEO: metadata builder, JSON-LD, sitemap URL list |
| `public/` | Files referenced by URL path only (no bundler import) |

## What not to add here

- **`src/pages/`** — reserved by Next.js; use `src/views/` for page components.
- **Vite / SPA entry files** — removed; routing lives under `src/app/`.
- **Committed build output** — `.next/`, `dist/` are gitignored.

## Related docs

- [ARCHITECTURE.md](./ARCHITECTURE.md) — stack, routing table, deployment
- [SEO_STRATEGY.md](./SEO_STRATEGY.md) — keywords, schema, operations
- [scripts/README.md](../scripts/README.md) — build scripts
