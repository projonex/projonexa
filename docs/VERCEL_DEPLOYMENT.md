# Deploy Projonexa on Vercel

This site is configured for **Vercel** as the primary host. Configuration lives in [`vercel.json`](../vercel.json) at the project root.

## Repository layout

If your Git repository root is the **parent monorepo** (e.g. `Projonexa/`), set in the Vercel project:

| Setting | Value |
|--------|--------|
| **Root Directory** | `projonexa-main-website` |
| **Framework Preset** | Vite (auto-detected) |
| **Build Command** | `npm run build` (from `vercel.json`) |
| **Output Directory** | `dist` |
| **Install Command** | `npm ci` |

If the repository root **is** `projonexa-main-website`, leave Root Directory empty.

## What `npm run build` does

1. `seo:validate` — checks all `PAGE_SEO` entries  
2. `og:generate` — creates `public/og/*.png` (1200×630 share thumbnails)  
3. `sitemap:generate` — refreshes `public/sitemap.xml`  
4. `tsc -b && vite build` — production bundle → `dist/`  
5. `prerender-share-meta.mjs` — per-route `index.html` with correct **title + Open Graph** for link previews (WhatsApp, LinkedIn, etc.)

## Vercel routing (`vercel.json`)

- **Permanent redirects:** `/final-year-projects` → `/college-projects`, `/research` → `/services`  
- **Rewrites:** each marketing route serves its prerendered `*/index.html` so crawlers see the right share title and thumbnail  
- **SPA fallback:** all other paths → `/index.html`  
- **Headers:** long cache for `/og/*` and `/assets/*`; basic security headers sitewide  

## Custom domain

1. Vercel project → **Settings** → **Domains**  
2. Add `projonexa.com` and `www.projonexa.com`  
3. Point DNS to Vercel (A/CNAME per Vercel dashboard)  
4. Enable **Redirect** `www` → apex (or the reverse), per your preference  

## After deploy — verify link previews

Test these URLs in [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or LinkedIn Post Inspector:

- `https://projonexa.com/`  
- `https://projonexa.com/college-projects`  
- `https://projonexa.com/client-projects`  
- `https://projonexa.com/contact`  

Each should show the matching **title**, **description**, and **PNG thumbnail** from `/og/`.

## Environment variables

No secrets are required for the static marketing site. If you add `VITE_*` variables later, set them under **Settings → Environment Variables** for Production, Preview, and Development.

## Local preview (production-like)

```bash
npm run build
npx serve dist
```

Note: `serve` does not apply `vercel.json` rewrites; use `npx vercel dev` or deploy to Preview for full routing behavior.

## Netlify (optional)

See [`docs/deployment/netlify.toml.example`](deployment/netlify.toml.example). Vercel is the supported default; do not add `public/_redirects` when using Vercel.
