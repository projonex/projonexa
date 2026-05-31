# Pull Request: `v1-launch`

**Branch:** `v1-launch`  
**Base:** `main`  
**Scope:** ~60 commits · 59 files changed (+4,331 / −905 lines)

Premium marketing-site refresh for Projonexa — layout polish, section unification, My Projects portfolio, founder/service redesign, technology showcase, and light/dark UI consistency.

---

## Summary

This branch delivers a production-ready **v1 launch** experience: cohesive spacing between sections, professional cards and panels, real project showcase (SPPU BUDDY), removed legacy research flow, and improved accessibility across light and dark themes.

---

## Highlights

### Home page structure

| Order | Section | Notes |
|-------|---------|--------|
| 1 | Hero | Refined layout and copy |
| 2 | Stats | Animated counters, premium styling |
| 3 | AEO Overview | Expanded content and layout |
| 4 | Services | Vertical stack deck (6 services) + “View All” |
| 5 | Technology + Why Projonexa | **Unified band** (`TechnologyWhySection`) — no double padding gap |
| 6 | Service Area + Founder | **Unified band** (`ServiceFounderSection`) |
| 7 | Vision & Mission | Standalone premium cards |
| 8 | CTA | Unchanged placement |

### About page structure

- Page header → prose → Stats (tight seam to next section) → **Vision + Founder** (`VisionFounderSection`) → CTA

### Section spacing fix

- Combined adjacent sections into single wrappers with inset CSS (`!important` padding overrides) to remove large empty gaps from stacked `section-padding` + `section-alt` borders.
- Key CSS classes: `.tech-why-band`, `.service-founder-unified`, `.vision-founder-unified`, `.about-stats-before-purpose`

---

## My Projects (major feature)

### Before

- Placeholder “featured” cards (Railways, SIH, Health AI, Campus ERP, Agri IoT, FinTech).

### After

- **`MY_PROJECTS`** data model with full metadata: icon, thumbnail, tagline, description, overview, tech stack, features, content highlights, supported branches, deployment links, stats, contact.
- **First live project:** [SPPU BUDDY](https://play.google.com/store/apps/details?id=com.caygnus.sppubuddy) — SPPU student Android app.
- **Projects listing** (`/projects`): Premium hover cards — lift, arrow, “View project” overlay → links to detail page (no modal).
- **Project detail page** (`/projects/:slug`, e.g. `/projects/sppu-buddy`):
  - Hero card with app icon, badges, title, tagline, Google Play CTA
  - Phone-frame **app preview** (portrait screenshot, device bezel)
  - Sorted content: About → Overview → What’s inside → Features → Branches
  - Sticky sidebar: Live deployment, At a glance, Tech stack, Feedback
  - Premium panels for **light and dark** mode (`.project-detail-hero-card`, `.project-detail-panel`, etc.)

### New / updated files

- `src/pages/ProjectDetailPage.tsx`
- `src/components/projects/ProjectDetailContent.tsx`
- `src/components/projects/ProjectDeploymentButtons.tsx`
- `src/data/projects.ts` — `MY_PROJECTS`, `projectPath()`, `getProjectBySlug()`
- `src/App.tsx` — route `projects/:slug`

---

## Services

- **ServicesGrid:** End-to-end deck on home; full grid on `/services`.
- **Dark mode hover fix** for deliverable chips (“Working prototype”, etc.) — readable cyan-tinted pills on hover.
- Service card deck surface styling (`.service-card-deck-surface`).

---

## Founder

- Premium panel with **founder photo** (`nisargalokhande.png`), gradient ring, story + mission callout.
- Role: Founder & CEO; social links (LinkedIn, GitHub, email).
- `variant="embedded"` for grouped layouts (Service + Founder, About Vision + Founder).
- Removed achievements column and redundant subtitle clutter.

---

## Service Area

- Redesigned header, delivery strip, 2 region cards (India / Global).
- Client order: Startups → Businesses → Engineering students → Colleges.
- Removed: Researchers & MBA, HQ card, city hub list, priority badges.
- `variant="embedded"` in `ServiceFounderSection`.

---

## Vision & Mission

- Premium cards with icons; data in `brand.ts` (`VISION_MISSION_SECTION`, `VISION`, `MISSION`).
- `variant="embedded"` on About page via `VisionFounderSection`.

---

## Technology

- Two-column layout: interactive stack + icon cloud (no frosted box around cloud).
- `TechnologyWhySection` wrapper on home; `variant="grouped"` for showcase.
- Tech icon cloud, stack panel, and flow-path hooks refreshed.
- `TechCard.tsx` removed from grid flow where superseded.

---

## Research removal

- `/research` → redirect to `/services`
- `ResearchPage.tsx` deleted
- Nav, FAQ, pricing, services, SEO, and brand copy updated to drop research offering

---

## SEO & data

- Projects page SEO updated for SPPU BUDDY / My Projects.
- Per-project SEO on detail pages (dynamic title, description, breadcrumbs).
- `BASE_KEYWORDS` exported from `seo.ts` for reuse.
- Brand, navigation, FAQ, pricing, technologies data aligned with new positioning.

---

## UI / UX infrastructure

- **Site ambient background** (`SiteAmbientBackground.tsx`)
- **Custom cursor** hook (`useSiteCursor.ts`)
- **Reduced motion** hook (`useReducedMotion.ts`) — cards, modals, animations respect preference
- **Flow paths** for tech visuals (`useFlowPaths.ts`, `techCloud.ts`, `cloudIconOverrides.ts`)
- Extensive **`index.css`** utilities: glass panels, founder/vision/service/project detail styles, deck viewport, deliverable chips, branch chips

---

## Files changed (overview)

<details>
<summary><strong>59 files</strong> — click to expand categories</summary>

**Pages**  
`HomePage`, `AboutPage`, `ProjectsPage`, `ProjectDetailPage` (new), `PortfolioPage`, `ServicesPage`, `PricingPage`, `ContactPage`, `FAQPage`, `CareersPage`, `BlogPage` — `ResearchPage` removed

**Sections**  
`Hero`, `Stats`, `AEOOverview`, `ServicesGrid`, `ProjectsGrid`, `ServiceArea`, `Founder`, `VisionMission`, `TechnologyShowcase`, `TechStackPanel`, `TechIconCloud`, `WhyChoose`, `TechnologyWhySection` (new), `ServiceFounderSection` (new), `VisionFounderSection` (new)

**Projects**  
`ProjectDetailPage`, `ProjectDetailContent`, `ProjectDeploymentButtons`, `projects.ts`

**Layout / UI**  
`Layout`, `Header`, `Footer`, `Button`, `PageHeader`, `SectionHeading`, `SiteAmbientBackground`

**Data**  
`brand.ts`, `projects.ts`, `services.ts`, `seo.ts`, `navigation.ts`, `technologies.ts`, `faq.ts`, `pricing.ts`, `blog.ts`

**Assets**  
`src/assets/img/nisargalokhande.png`

**Config**  
`App.tsx`, `index.css`, `tailwind.config.js`, `index.html`, `site.webmanifest`

</details>

---

## Test plan

- [ ] **Home** — scroll full page; confirm no large gaps between Technology↔Why, Service↔Founder, Stats↔Vision (About).
- [ ] **Light + dark mode** — Hero, Services deck, Service deliverables on hover, Project cards, Project detail page panels.
- [ ] **Projects** (`/projects`) — hover card (lift + arrow); click opens `/projects/sppu-buddy`.
- [ ] **Project detail** — hero layout, phone preview, sidebar links, Google Play + mailto work.
- [ ] **Invalid slug** — `/projects/invalid` redirects to `/projects`.
- [ ] **Services** (`/services`) — full grid; deliverable chips readable on hover (dark).
- [ ] **About** — Vision + Founder band; founder image and links.
- [ ] **Nav** — Research link absent or redirects; Projects, Services, About routes OK.
- [ ] **`npm run build`** — passes with no TypeScript errors.
- [ ] **Mobile** — project detail hero stacks; cards and deck scroll correctly.

---

## How to run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

---

## Deployment notes

- Project thumbnails use Google Play CDN URLs; ensure network allows image loading in production.
- Optional: add local fallbacks under `public/projects/` for offline or CDN failures.

---

## Suggested PR title

```
feat: v1 launch — premium UI, My Projects (SPPU BUDDY), section layout & research cleanup
```

---

## Suggested PR labels

`enhancement` · `ui/ux` · `marketing-site` · `v1`

---

*Generated for branch `v1-launch` — adjust test plan checkboxes after manual QA.*
