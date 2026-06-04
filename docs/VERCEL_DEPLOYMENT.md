# Deploy Projonexa on Vercel

This site is configured for **Vercel** as the primary host. Configuration lives in [`vercel.json`](../vercel.json) at the project root.

## Repository layout

If your Git repository root is the **parent monorepo** (e.g. `Projonexa/`), set in the Vercel project:

| Setting | Value |
|--------|--------|
| **Root Directory** | `projonexa-main-website` |
| **Framework Preset** | Next.js (auto-detected) |
| **Build Command** | `npm run build` |
| **Output Directory** | *(leave default — Next.js)* |
| **Install Command** | `npm ci` |

If the repository root **is** `projonexa-main-website`, leave Root Directory empty.

## What `npm run build` does

1. `sitemap:generate` — refreshes `public/sitemap.xml`  
2. `seo:validate` — checks all `PAGE_SEO` entries  
3. `og:generate` — creates `public/og/*.png` (1200×630 share thumbnails)  
4. `next build` — production bundle → `.next/` with static/SSG pages and server metadata  

## Routing & SEO on Vercel

- **Redirects** (`next.config.ts` + `vercel.json`): `/final-year-projects` → `/college-projects`, `/research` → `/services`  
- **Metadata:** each route exports `metadata` or `generateMetadata` (Open Graph, canonical, GEO tags)  
- **JSON-LD:** injected per page via `PageSeo`  
- **Sitemap / robots:** `src/app/sitemap.ts`, `src/app/robots.ts`  
- **Headers** (`vercel.json`): long cache for `/og/*`; security headers sitewide  

## Custom domain

1. Vercel project → **Settings** → **Domains**  
2. Add `projonexa.com` and `www.projonexa.com`  
3. Point DNS to Vercel (A/CNAME per Vercel dashboard)  
4. Enable **Redirect** `www` → apex (or the reverse), per your preference  

Ensure `BRAND.url` in `src/data/brand.ts` matches the live domain (`https://projonexa.com`).

## Environment variables

Optional overrides via Vercel **Settings** → **Environment Variables**. See [`.env.example`](../.env.example). Most config is in `src/data/` and does not require env vars.

## Local production test

```bash
npm run build
npm start
# → http://localhost:3000
```
