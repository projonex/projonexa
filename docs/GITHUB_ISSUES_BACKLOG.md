# GitHub Issues Backlog — Ready to Create

Copy each block into **New issue** on [Projonexa/projonexa](https://github.com/Projonexa/projonexa), or run the bulk script (see [Bulk creation](#bulk-creation)).

**Prerequisites**

1. Create milestones **M1–M10** (titles from [GITHUB_MILESTONES.md](./GITHUB_MILESTONES.md)).
2. Create labels from [GITHUB_LABELS_SETUP.md](./GITHUB_LABELS_SETUP.md).
3. Assign issues to the matching milestone and labels listed in each block.

**Legend:** Priority **P0** (blocking launch polish) → **P3** (backlog / epics).

---

## P0 — Launch readiness (website + compliance)

---

### Issue 1

**Title:** `[M2] Add Privacy Policy page`

**Milestone:** Milestone 2: Professional Website Launch  
**Labels:** `enhancement`, `legal`, `repo:website`, `milestone-2-website`, `priority:high`

**Body:**

```markdown
## Milestone
M2 — Professional Website Launch

## Objective
Publish a Privacy Policy page that explains how Projonexa collects, uses, and protects user data (contact forms, analytics, cookies).

## Acceptance criteria
- [ ] New route `/privacy` with readable legal content
- [ ] Linked in site footer on all pages
- [ ] SEO meta title/description via existing `SEO` component
- [ ] Included in `public/sitemap.xml` (regenerate if using build script)
- [ ] Reviewed for India-relevant context (contact email, company name, site URL)

## Implementation notes
- Add `PrivacyPage.tsx` under `src/pages/`
- Register route in `src/App.tsx`
- Follow layout patterns from `FAQPage` / `AboutPage`
- Store copy in `src/data/legal.ts` or similar for maintainability

## References
- docs/GITHUB_MILESTONES.md (M2)
- https://projonexa.com/contact
```

---

### Issue 2

**Title:** `[M2] Add Terms and Conditions page`

**Milestone:** Milestone 2: Professional Website Launch  
**Labels:** `enhancement`, `legal`, `repo:website`, `milestone-2-website`, `priority:high`

**Body:**

```markdown
## Milestone
M2 — Professional Website Launch

## Objective
Publish Terms and Conditions governing use of the Projonexa website and inquiry services.

## Acceptance criteria
- [ ] New route `/terms`
- [ ] Footer link alongside Privacy Policy
- [ ] SEO metadata configured
- [ ] Sitemap updated
- [ ] Cross-links between Privacy and Terms where appropriate

## References
- docs/GITHUB_MILESTONES.md (M2)
```

---

### Issue 3

**Title:** `[M2][M7] Integrate website analytics (GA4 or privacy-friendly alternative)`

**Milestone:** Milestone 2: Professional Website Launch  
**Labels:** `enhancement`, `ops:analytics`, `repo:website`, `milestone-2-website`, `milestone-7-seo`, `priority:high`

**Body:**

```markdown
## Milestone
M2 — Website Launch · M7 — SEO & GEO

## Objective
Measure traffic and conversions (contact/inquiry submissions) with a production analytics setup.

## Acceptance criteria
- [ ] Analytics provider chosen (GA4, Plausible, or similar)
- [ ] Tracking added via env var (no secrets in repo) — document in `.env.example`
- [ ] Page views and key events tracked (contact CTA, inquiry form start/submit)
- [ ] Cookie/consent banner if required by provider and jurisdiction
- [ ] Document setup in docs/SEO_OPERATIONS_PLAYBOOK.md

## Out of scope
- Full marketing dashboard (separate issue)

## References
- docs/SEO_OPERATIONS_PLAYBOOK.md
```

---

### Issue 4

**Title:** `[M7] Configure Google Search Console and submit sitemap`

**Milestone:** Milestone 7: SEO & GEO Optimization  
**Labels:** `enhancement`, `ops:analytics`, `ops:infra`, `milestone-7-seo`, `priority:high`

**Body:**

```markdown
## Milestone
M7 — SEO & GEO Optimization

## Objective
Verify site ownership in Google Search Console and submit the XML sitemap for indexing.

## Acceptance criteria
- [ ] Property added for `https://projonexa.com`
- [ ] DNS or HTML verification completed
- [ ] `https://projonexa.com/sitemap.xml` submitted
- [ ] No critical coverage errors (404 on main routes)
- [ ] Baseline performance report exported for records

## References
- public/sitemap.xml
- npm run sitemap:generate
- docs/SEO_OPERATIONS_PLAYBOOK.md
```

---

## P1 — Brand & site quality

---

### Issue 5

**Title:** `[M1] Design horizontal logo lockup (mark + wordmark)`

**Milestone:** Milestone 1: Establish Brand Authority  
**Labels:** `design`, `milestone-1-brand`, `priority:high`

**Body:**

```markdown
## Milestone
M1 — Establish Brand Authority

## Objective
Create a horizontal logo variation for email headers, LinkedIn banners, print, and wide nav contexts.

## Acceptance criteria
- [ ] SVG and PNG exports (transparent + dark background variants)
- [ ] Minimum width guidelines documented
- [ ] Files added under `public/brand/` (or design repo) with naming convention
- [ ] Optional: wire into README and email templates

## Design reference
- Primary mark: `public/logo.png`
- Wordmark: Projone + gradient x + a (see docs/BRAND_GUIDELINES.md)
- Colors: #00C8FF, #3D8BFF, #6C63FF

## References
- docs/BRAND_GUIDELINES.md
```

---

### Issue 6

**Title:** `[M1] Create social media branding asset pack`

**Milestone:** Milestone 1: Establish Brand Authority  
**Labels:** `design`, `milestone-1-brand`, `priority:high`

**Body:**

```markdown
## Milestone
M1 — Establish Brand Authority

## Objective
Deliver reusable templates for LinkedIn, Instagram, YouTube, and X so posts look on-brand.

## Deliverables
- [ ] Profile/cover images (recommended sizes per platform)
- [ ] Post template (1080×1080 and 1200×630)
- [ ] Story/reel safe-zone template
- [ ] Short brand usage PDF or Figma link in docs/

## References
- docs/BRAND_GUIDELINES.md
- public/og-image.svg (social preview reference)
```

---

### Issue 7

**Title:** `[M2] Run accessibility audit and fix critical issues`

**Milestone:** Milestone 2: Professional Website Launch  
**Labels:** `enhancement`, `repo:website`, `milestone-2-website`, `priority:high`

**Body:**

```markdown
## Milestone
M2 — Professional Website Launch

## Objective
Improve WCAG compliance for keyboard navigation, contrast, focus states, and screen readers.

## Acceptance criteria
- [ ] Lighthouse accessibility score ≥ 90 on Home, Contact, FAQ
- [ ] All interactive elements keyboard-accessible
- [ ] Skip link verified (header)
- [ ] Form labels and error messages associated correctly
- [ ] Document findings in issue comments or `docs/ACCESSIBILITY.md`

## Tools
- Lighthouse, axe DevTools, manual keyboard test
```

---

### Issue 8

**Title:** `[M2] Lighthouse performance optimization pass`

**Milestone:** Milestone 2: Professional Website Launch  
**Labels:** `enhancement`, `repo:website`, `milestone-2-website`, `milestone-7-seo`, `priority:high`

**Body:**

```markdown
## Milestone
M2 · M7

## Objective
Reach strong Core Web Vitals on production (compress assets, lazy-load, reduce JS where possible).

## Acceptance criteria
- [ ] Lighthouse Performance ≥ 90 on Home (mobile)
- [ ] `logo.png` optimized or served at appropriate sizes
- [ ] LCP and CLS issues addressed
- [ ] Findings documented

## Notes
- Current `public/logo.png` is large (~500KB) — compress or provide responsive srcset
```

---

### Issue 9

**Title:** `[M2] Add site search functionality`

**Milestone:** Milestone 2: Professional Website Launch  
**Labels:** `enhancement`, `repo:website`, `milestone-2-website`, `priority:medium`

**Body:**

```markdown
## Milestone
M2 — Professional Website Launch

## Objective
Let visitors search FAQs, services, and project content from the header.

## Acceptance criteria
- [ ] Search UI in header (desktop + mobile)
- [ ] Indexes static content (FAQ, services, projects metadata)
- [ ] Accessible combobox or modal pattern
- [ ] No external paid dependency unless approved

## Suggested approach
- Client-side index (e.g. Fuse.js) over `src/data/*` exports
```

---

## P1 — Operations & digital presence

---

### Issue 10

**Title:** `[M1] Create LinkedIn company page for Projonexa`

**Milestone:** Milestone 1: Establish Brand Authority  
**Labels:** `milestone-1-brand`, `ops:infra`, `priority:medium`

**Body:**

```markdown
## Milestone
M1 — Establish Brand Authority

## Objective
Launch an official LinkedIn company page with consistent branding and link to projonexa.com.

## Acceptance criteria
- [ ] Page created and published
- [ ] Logo, banner, tagline, and about text aligned with brand
- [ ] Website URL in contact info
- [ ] Link added to site footer when live

## Copy reference
- Tagline: Where Innovation Meets Execution.
- docs/BRAND_GUIDELINES.md
```

---

### Issue 11

**Title:** `[M1] Setup professional email on domain (e.g. hello@projonexa.com)`

**Milestone:** Milestone 1: Establish Brand Authority  
**Labels:** `milestone-1-brand`, `ops:infra`, `priority:medium`

**Body:**

```markdown
## Milestone
M1 — Establish Brand Authority

## Objective
Use a branded email address for inquiries instead of only personal Gmail.

## Acceptance criteria
- [ ] Domain email configured (Google Workspace, Zoho, or host provider)
- [ ] SPF/DKIM/DMARC records set
- [ ] Contact page and forms updated if display email changes
- [ ] Forwarding to founder inbox documented

## Current
- nisargalokhande@gmail.com (see src/data/brand.ts)
```

---

### Issue 12

**Title:** `[M2] Configure CDN and production caching headers`

**Milestone:** Milestone 2: Professional Website Launch  
**Labels:** `ops:infra`, `milestone-2-website`, `priority:medium`

**Body:**

```markdown
## Milestone
M2 — Professional Website Launch

## Objective
Ensure static assets are cached at the edge for fast global delivery.

## Acceptance criteria
- [ ] CDN enabled on hosting provider (Cloudflare, Vercel Edge, etc.)
- [ ] Cache headers verified for `/assets/*` and `public/*`
- [ ] HTTPS and HTTP/2 confirmed
- [ ] Document config in docs/ARCHITECTURE.md
```

---

### Issue 13

**Title:** `[M2] Setup uptime monitoring and deploy rollback process`

**Milestone:** Milestone 2: Professional Website Launch  
**Labels:** `ops:infra`, `milestone-2-website`, `priority:medium`

**Body:**

```markdown
## Milestone
M2 — Professional Website Launch

## Objective
Get alerted if the site goes down and know how to roll back a bad deploy.

## Acceptance criteria
- [ ] Uptime monitor on https://projonexa.com (UptimeRobot, Better Stack, etc.)
- [ ] Alert channel defined (email/Slack)
- [ ] Rollback steps documented for host
- [ ] Optional: link from docs/SEO_OPERATIONS_PLAYBOOK.md
```

---

## P2 — Student services & trust (epics)

---

### Issue 14

**Title:** `[M4][Epic] Student documentation templates pack`

**Milestone:** Milestone 4: Student Guidance & Mentorship Services  
**Labels:** `epic`, `repo:content`, `milestone-4-mentorship`, `priority:medium`

**Body:**

```markdown
## Milestone
M4 — Student Guidance & Mentorship Services

## Objective
Publish downloadable templates and guides for academic deliverables.

## Child tasks (create separate issues)
- [ ] Project report template
- [ ] IEEE paper template
- [ ] SRS documentation template
- [ ] User manual template
- [ ] Technical documentation guide hub page

## Success
Students can find and download templates from the site or linked Notion/Drive.
```

---

### Issue 15

**Title:** `[M4][Epic] Viva preparation resource hub`

**Milestone:** Milestone 4: Student Guidance & Mentorship Services  
**Labels:** `epic`, `repo:content`, `milestone-4-mentorship`, `priority:medium`

**Body:**

```markdown
## Milestone
M4 — Student Guidance & Mentorship Services

## Child tasks
- [ ] Viva preparation guide (long-form)
- [ ] FAQ: common viva questions
- [ ] Mock viva framework
- [ ] Presentation preparation guide
- [ ] Optional: link from FAQ and Services pages
```

---

### Issue 16

**Title:** `[M4] Document official mentorship workflow and SLAs`

**Milestone:** Milestone 4: Student Guidance & Mentorship Services  
**Labels:** `documentation`, `repo:content`, `milestone-4-mentorship`, `priority:medium`

**Body:**

```markdown
## Milestone
M4 — Student Guidance & Mentorship Services

## Objective
Define how a student moves from inquiry → consultation → delivery → viva support.

## Acceptance criteria
- [ ] Workflow diagram or doc in `docs/` or public-facing page
- [ ] Response time commitments (align with “24 hours” marketing copy)
- [ ] Linked from `/inquiry/students` and Careers copy
- [ ] Internal checklist for founders/mentors

## References
- /inquiry/students
- /contact
```

---

### Issue 17

**Title:** `[M8][Epic] Testimonials and success stories section`

**Milestone:** Milestone 8: Social Proof & Trust Building  
**Labels:** `epic`, `enhancement`, `repo:website`, `milestone-8-trust`, `priority:medium`

**Body:**

```markdown
## Milestone
M8 — Social Proof & Trust Building

## Objective
Show real student outcomes on the website to increase trust.

## Child tasks
- [ ] Testimonial collection process (form/email)
- [ ] Written testimonials UI component + page section
- [ ] Video testimonial embed strategy (YouTube unlisted)
- [ ] Success story case study template (1–2 pilots)
- [ ] Consent/release for using name and college

## References
- Home stats section (100+ projects, 500+ students)
```

---

### Issue 18

**Title:** `[M8] Add mentor profiles and expertise pages`

**Milestone:** Milestone 8: Social Proof & Trust Building  
**Labels:** `enhancement`, `repo:website`, `milestone-8-trust`, `priority:low`

**Body:**

```markdown
## Milestone
M8 — Social Proof & Trust Building

## Objective
Introduce faces and expertise behind Projonexa beyond the founder block.

## Acceptance criteria
- [ ] Mentor profile data model in `src/data/`
- [ ] Grid or carousel on About or dedicated `/team` route
- [ ] Skills/tags per mentor (AI, Web, IoT, etc.)
- [ ] LinkedIn links optional
```

---

## P2 — SEO & content foundations

---

### Issue 19

**Title:** `[M7] Internal linking audit and hub page improvements`

**Milestone:** Milestone 7: SEO & GEO Optimization  
**Labels:** `enhancement`, `repo:website`, `milestone-7-seo`, `priority:medium`

**Body:**

```markdown
## Milestone
M7 — SEO & GEO Optimization

## Objective
Strengthen topical clusters linking Home → Services → Pricing → FAQ → Contact → Inquiry.

## Acceptance criteria
- [ ] Audit all pages for contextual internal links
- [ ] Add “related links” blocks where missing
- [ ] Fix orphan routes if any
- [ ] Update docs/SEO_STRATEGY.md with cluster map
```

---

### Issue 20

**Title:** `[M5][Epic] Blog content pipeline and first 5 articles`

**Milestone:** Milestone 5: Content Marketing & Educational Resources  
**Labels:** `epic`, `repo:content`, `milestone-5-content`, `priority:medium`

**Body:**

```markdown
## Milestone
M5 — Content Marketing

## Objective
Turn `/blog` from a shell into a publishing channel.

## Child tasks
- [ ] Blog post MDX or data-driven post model
- [ ] Article 1: Best Final Year Projects for CSE 2026
- [ ] Article 2: Best AI Projects for Engineering Students
- [ ] Article 3: How to Prepare for Project Viva
- [ ] Article 4: GitHub Best Practices for Students
- [ ] Article 5: MVP guide for student startups
- [ ] RSS or sitemap entries for posts

## References
- src/pages/BlogPage.tsx
```

---

### Issue 21

**Title:** `[M5] Define weekly content publishing process`

**Milestone:** Milestone 5: Content Marketing & Educational Resources  
**Labels:** `documentation`, `milestone-5-content`, `priority:low`

**Body:**

```markdown
## Milestone
M5 — Content Marketing

## Objective
Establish a repeatable calendar for articles, LinkedIn, and YouTube.

## Acceptance criteria
- [ ] Editorial calendar template (Notion/Sheet)
- [ ] Roles: writer, reviewer, publisher
- [ ] SEO checklist per post (title, meta, internal links)
- [ ] Document in docs/SEO_OPERATIONS_PLAYBOOK.md or new CONTENT_OPS.md
```

---

## P3 — Knowledge library & open source (epics)

---

### Issue 22

**Title:** `[M3][Epic] AI project knowledge category`

**Milestone:** Milestone 3: Build Project Knowledge Library  
**Labels:** `epic`, `repo:website`, `milestone-3-library`, `priority:low`

**Body:**

```markdown
## Milestone
M3 — Project Knowledge Library

## Child tasks
- [ ] `/projects` or `/library/ai` category landing page
- [ ] Beginner / intermediate / advanced project entries
- [ ] Screenshots and architecture diagrams per project
- [ ] Documentation resource links

## Target
Contribute toward 100+ resources org-wide.
```

---

### Issue 23

**Title:** `[M3][Epic] IoT project knowledge category`

**Milestone:** Milestone 3: Build Project Knowledge Library  
**Labels:** `epic`, `repo:website`, `milestone-3-library`, `priority:low`

**Body:**

```markdown
## Child tasks
- [ ] IoT category page
- [ ] Sensor, automation, and smart system projects
- [ ] Hardware architecture diagrams
```

---

### Issue 24

**Title:** `[M3][Epic] Web Development project knowledge category`

**Milestone:** Milestone 3: Build Project Knowledge Library  
**Labels:** `epic`, `repo:website`, `milestone-3-library`, `priority:low`

**Body:**

```markdown
## Child tasks
- [ ] Web category page
- [ ] Frontend, backend, full-stack project entries
- [ ] Deployment guides linked per project
```

---

### Issue 25

**Title:** `[M3][Epic] Mobile Development project knowledge category`

**Milestone:** Milestone 3: Build Project Knowledge Library  
**Labels:** `epic`, `repo:website`, `milestone-3-library`, `priority:low`

**Body:**

```markdown
## Child tasks
- [ ] Mobile category page
- [ ] Android, Flutter, React Native projects
- [ ] App store deployment notes
```

---

### Issue 26

**Title:** `[M6][Epic] Educational open-source repositories under Projonexa org`

**Milestone:** Milestone 6: Open Source & Community Contributions  
**Labels:** `epic`, `repo:org`, `milestone-6-opensource`, `priority:low`

**Body:**

```markdown
## Milestone
M6 — Open Source

## Objective
Publish starter repos students can fork (mini projects, AI, IoT, web, mobile).

## Child repos
- [ ] projonexa-mini-projects
- [ ] projonexa-ai-projects
- [ ] projonexa-iot-projects
- [ ] projonexa-web-projects
- [ ] projonexa-mobile-projects

## Each repo includes
- README, CONTRIBUTING, license, issue templates, sample project structure
```

---

### Issue 27

**Title:** `[M6] Enable GitHub Discussions for community Q&A`

**Milestone:** Milestone 6: Open Source & Community Contributions  
**Labels:** `enhancement`, `milestone-6-opensource`, `priority:low`

**Body:**

```markdown
## Milestone
M6 — Open Source

## Objective
Give students a place to ask questions without opening formal issues.

## Acceptance criteria
- [ ] Discussions enabled on Projonexa/projonexa
- [ ] Categories: Q&A, Ideas, Show and tell
- [ ] Link from README and SUPPORT.md
- [ ] Moderation guidelines posted
```

---

### Issue 28

**Title:** `[M9][Epic] YouTube channel launch and content plan`

**Milestone:** Milestone 9: Educational Media Platform  
**Labels:** `epic`, `milestone-9-media`, `priority:low`

**Body:**

```markdown
## Milestone
M9 — Educational Media

## Child tasks
- [ ] Channel branding (use social asset pack)
- [ ] 4 pilot videos: project demo, tech tutorial, viva tips, architecture walkthrough
- [ ] Link channel from website footer
```

---

### Issue 29

**Title:** `[M10][Epic] Mentor network onboarding system (future)`

**Milestone:** Milestone 10: Projonexa Ecosystem Expansion  
**Labels:** `epic`, `milestone-10-ecosystem`, `priority:low`

**Body:**

```markdown
## Milestone
M10 — Ecosystem Expansion

## Objective
Plan scalable mentor onboarding, verification, and dashboard (product discovery).

## Deliverables
- [ ] Requirements doc
- [ ] Wireframes or flow
- [ ] Integration points with existing Careers apply flow

## Note
Discovery only — implementation is long-term.
```

---

## Issues to close immediately (already done)

Create these only to mark completion, then **close** them:

| Title | Milestone | Note |
|-------|-----------|------|
| `[M1] Primary logo integrated on website` | M1 | `public/logo.png` |
| `[M1] Favicon and PWA icons` | M1 | favicon-32, apple-touch-icon, icon-512 |
| `[M1] Brand color palette documented` | M1 | tailwind + BRAND_GUIDELINES |
| `[M7] XML sitemap and robots.txt` | M7 | public/ + generator script |
| `[M7] JSON-LD schema markup` | M7 | structured-data.ts |
| `[M7] llms.txt for AI crawlers` | M7 | public/llms.txt |
| `[M6] Issue and PR templates` | M6 | .github/ISSUE_TEMPLATE |
| `[M2] Core pages live` | M2 | Home, About, Services, Contact, FAQ, etc. |

---

## Bulk creation

### Option A — GitHub CLI (recommended)

Install [GitHub CLI](https://cli.github.com/), authenticate (`gh auth login`), then from repo root:

```bash
chmod +x scripts/create-github-issues.sh
./scripts/create-github-issues.sh --dry-run   # preview titles
./scripts/create-github-issues.sh             # create open issues
```

The script creates **issues 1–29** above (not the “close immediately” set). Edit `scripts/create-github-issues.sh` to match your milestone titles exactly if they differ on GitHub.

### Option B — Manual

1. Open [New issue](https://github.com/Projonexa/projonexa/issues/new).
2. Paste **Title** and **Body** from each section.
3. Assign milestone and labels.
4. For epics, check “Convert to issue” and later link child issues.

---

## Related docs

- [GITHUB_MILESTONES.md](./GITHUB_MILESTONES.md) — Full roadmap
- [GITHUB_LABELS_SETUP.md](./GITHUB_LABELS_SETUP.md) — Label colors
- [GITHUB_REPOSITORY_SETUP.md](./GITHUB_REPOSITORY_SETUP.md) — Repo About & CI
