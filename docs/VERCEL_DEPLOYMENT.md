# Deploy Projonexa on Vercel

This site is configured for **Vercel** as the primary host. Configuration lives in [`vercel.json`](../vercel.json) at the project root.

## Repository layout

If your Git repository root is the **parent monorepo** (e.g. `Projonexa/`):

| Setting | Value |
|--------|--------|
| **Root Directory** | `projonexa-main-website` |
| **Framework Preset** | Next.js (auto-detected) |
| **Build Command** | `npm run build` |
| **Output Directory** | *(leave default — Next.js)* |
| **Install Command** | `npm ci` |
| **Node.js Version** | 20.x (see `package.json` engines) |

If the repository root **is** `projonexa-main-website`, leave Root Directory empty.

## What `npm run build` does

1. `sitemap:generate` — refreshes `public/sitemap.xml` (mirror for tooling; live sitemap is `src/app/sitemap.ts`)
2. `seo:validate` — checks all `PAGE_SEO` titles, descriptions, keywords, and AEO flags
3. `og:generate` — creates `public/og/*.png` (1200×630 Open Graph thumbnails via `sharp`)
4. `next build` — production bundle with static/SSG pages and server metadata

## Required Vercel environment variables

Set in **Project → Settings → Environment Variables** for **Production** (and Preview if forms should work on preview URLs):

| Variable | Example | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_API_URL` | `https://api.projonexa.com` | **Yes** — contact forms, student/corporate inquiry, affiliate apply, consultation booking |

Without `NEXT_PUBLIC_API_URL`, the site renders but **forms will fail** in the browser.

Copy from [`.env.example`](../.env.example). Do **not** commit `.env` or `.env.local`.

## Custom domain

1. Vercel project → **Settings** → **Domains**
2. Add `projonexa.com` (apex) and `www.projonexa.com`
3. Point DNS to Vercel (A/CNAME per dashboard)
4. `vercel.json` redirects **www → apex** (`https://projonexa.com`)

Ensure `BRAND.url` in `src/data/brand.ts` is `https://projonexa.com` (canonical for SEO, OG, JSON-LD, sitemap).

## SEO / AEO / GEO on Vercel

| Asset | Source | Live URL |
|-------|--------|----------|
| Metadata (title, description, OG, Twitter) | `src/data/seo.ts` + per-route `metadata` | Every page |
| JSON-LD (Organization, FAQ, Service, Speakable) | `PageSeo` → `src/lib/seo/structured-data.ts` | Every indexed page |
| Sitemap | `src/app/sitemap.ts` | `/sitemap.xml` |
| Robots | `src/app/robots.ts` | `/robots.txt` |
| LLM / GEO guide | `public/llms.txt` | `/llms.txt` |
| Web app manifest | `public/site.webmanifest` | `/site.webmanifest` |
| Favicon & PWA icons | `public/favicon-*.png`, `icon-*.png`, `apple-touch-icon.png` | `/favicon-32.png`, etc. |
| Logo (schema + UI) | `public/logo.png`, `logo-128.png`, `logo-256.png` | `/logo.png` |
| OG share images | `public/og/*.png` (generated at build) | `/og/og-home.png`, etc. |

After deploy, verify:

- `https://projonexa.com/robots.txt`
- `https://projonexa.com/sitemap.xml`
- `https://projonexa.com/llms.txt`
- `https://projonexa.com/logo.png`
- `https://projonexa.com/og/og-home.png`

Submit `https://projonexa.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

## Redirects & caching (`vercel.json`)

- `www.projonexa.com` → `https://projonexa.com`
- `/favicon.ico` → `/favicon-32.png`
- `/final-year-projects` → `/college-projects`
- `/research` → `/services`
- Long cache for `/og/*`, logos, and favicons
- Security headers sitewide (`X-Content-Type-Options`, `X-Frame-Options`, etc.)

## Brand assets in git

These files **must be committed** so Vercel can serve them (they are not generated on Linux CI except OG images):

- `public/logo.png`
- `public/favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`
- `public/icon-192.png`, `icon-512.png`
- `public/logo-128.png`, `logo-256.png`

Regenerate icons locally after logo changes: `npm run brand:icons` (macOS `sips`).

OG PNGs are regenerated on every Vercel build via `npm run og:generate`.

## Local production test

```bash
npm ci
npm run build
npm start
# → http://localhost:3000
```

## Post-deploy checklist

- [ ] `NEXT_PUBLIC_API_URL` set on Vercel Production
- [ ] Custom domain `projonexa.com` connected and SSL active
- [ ] Test contact form + student inquiry on live site
- [ ] Google Search Console: verify domain, submit sitemap
- [ ] Share a link on WhatsApp/LinkedIn — confirm OG image and title
- [ ] View page source — confirm JSON-LD and canonical URL
