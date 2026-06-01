# Projonexa SEO + AEO + GEO Growth Design

Date: 2026-06-01  
Owner: Projonexa Web Platform  
Status: Draft approved in chat, ready for implementation planning

## 1) Objective

Build a professional, well-organized, and maintainable SEO/AEO/GEO system for `projonexa.com` that improves:

- Organic visibility (SEO)
- AI answer extraction and citations (AEO)
- India and Maharashtra local relevance (GEO)
- Qualified inquiry conversions from both audiences:
  - Students (final year/academic projects)
  - Startups and businesses (MVP/custom software)

## 2) Scope and Non-Goals

### In Scope

- Metadata system hardening and standardization
- Structured data/entity graph improvements
- AEO answer-block strategy and FAQ consistency
- GEO signal normalization across schema and on-page copy
- Sitemap/robots/indexability automation
- Internal linking architecture
- Quality checks and release gates
- 60-day execution and KPI monitoring framework

### Out of Scope

- Guarantees of fixed ranking position (#1 cannot be guaranteed)
- Paid search campaigns
- Full external backlink outreach execution (only framework/design included)

## 3) Current State Summary

The website already has a strong baseline:

- Route-level SEO metadata via `src/data/seo.ts`
- Meta and JSON-LD injection via `src/components/seo/SEO.tsx`
- Multi-schema support in `src/lib/structured-data.ts`
- Existing `robots.txt` and `sitemap.xml`
- AEO content presence (`AEOOverview`, `FAQPage`)
- GEO foundations in brand metadata

Primary remaining gap is not missing basics, but consistency, automation, and professional operational control.

## 4) Proposed Architecture

### 4.1 Control Layers

1. **Metadata Registry Layer**
   - Single source of truth in `src/data/seo.ts`
   - Add fields: `intent`, `primaryKeyword`, `secondaryKeywords`, `audience`, `conversionGoal`, `aeoQuestions`

2. **Schema Orchestration Layer**
   - Intent-driven schema composition per page type
   - Stable `@id` graph linking between `Organization`, `WebSite`, `ProfessionalService`, and page-level entities

3. **Indexability Layer**
   - Automated sitemap generation from route/indexable metadata
   - Canonical + redirect + robots consistency rules

4. **AEO Content Layer**
   - Direct-answer blocks on key pages
   - Strict parity between visible FAQ answers and JSON-LD FAQ

5. **GEO Relevance Layer**
   - Standardized India/Maharashtra service-area references
   - Consistent location signals in metadata, schema, and key page copy

6. **Quality Gate Layer**
   - Validation script/check to catch metadata/schema/canonical issues before release

### 4.2 Page Intent Classification

- **Pillar pages**: `/`, `/services`, `/pricing`, `/faq`, `/contact`
- **Supporting pages**: `/about`, `/portfolio`, `/projects`, `/blog`, `/careers`
- **Conversion pages**: `/inquiry/students`, `/inquiry/corporate`, `/careers/apply`

Each class has defined metadata rules, schema bundles, and internal linking obligations.

## 5) Route-by-Route Design

### Home `/`

- Keep broad-intent title/description targeting both audiences
- Expand answer-first sections:
  - What is Projonexa?
  - Who is it for?
  - What is delivered?
  - Timelines/process/pricing logic
- Maintain as central internal-link hub to all pillar pages

### Services `/services`

- Organize service clusters by audience segment
- Add concise answer snippets per cluster and intent-matched FAQ links
- Ensure service schema maps to visible service categories

### Pricing `/pricing`

- Add transparent pricing logic explanation (scope, complexity, deadline)
- Add trust answers (support, revisions, documentation)
- Reinforce conversion CTA with intent-specific metadata

### FAQ `/faq`

- Group Q&A by category: scope, process, pricing, support, career
- Every answer starts with a direct single-sentence answer
- Keep exact alignment between visible content and FAQ schema

### Contact + Inquiry Pages

- Add clear expectation copy and response SLA language
- Keep transactional metadata and conversion intent explicit
- Maintain geo relevance for India + Maharashtra while supporting global remote delivery

### Supporting Pages

- Standardize metadata quality and avoid keyword cannibalization
- Add strategic links to pillar/conversion pages
- Use supporting content to reinforce topical authority

## 6) Data Model and Content Standards

### 6.1 SEO Registry Fields (Target)

Each page entry should include:

- `title`
- `description`
- `keywords`
- `path`
- `intent`
- `primaryKeyword`
- `secondaryKeywords`
- `audience`
- `conversionGoal`
- `faqSchema`
- `serviceSchema`
- `aeoQuestions`
- `breadcrumb`

### 6.2 Content Writing Rules

- One dominant search intent per page
- Intro paragraph must include primary entity + keyword naturally
- AEO answers should be concise first, details second
- GEO copy should be natural and non-spammy
- Headings should map to query patterns and internal link anchors

## 7) Structured Data Design

### 7.1 Required Entities

- `Organization`
- `WebSite`
- `ProfessionalService`
- `WebPage`
- `BreadcrumbList` (when applicable)
- `FAQPage` (on selected AEO pages)
- `ItemList/Service` (service-heavy pages)

### 7.2 Graph Rules

- All major entities use stable `@id`
- Page entities reference website/organization IDs
- FAQ schema generated from same content source as rendered FAQ when possible
- Service catalog stays synchronized with `src/data/services.ts`

## 8) Indexing and Crawl Design

- Generate sitemap from indexable route definitions
- Exclude non-indexable, duplicate, redirected, and transient utility routes
- Keep canonical URL format consistent
- Keep AI and search crawler access explicit and clean in `robots.txt`

## 9) Internal Linking Design

- Pillar pages interlink bidirectionally
- Supporting pages link upward to pillar pages with intent-matched anchor text
- Conversion pages receive links from relevant informational and pricing sections
- No orphan indexable pages

## 10) Quality Gates and Error Handling

### 10.1 Validation Checks

- Missing/empty title, description, canonical path
- Duplicate title or canonical collisions
- Title/description excessive length warnings
- Missing `primaryKeyword`/`intent`
- Missing FAQ schema flag where required
- Sitemap route mismatch vs indexable routes

### 10.2 Failure Policy

- Development: warning + actionable report
- CI/release: fail on high-severity issues (canonical collisions, missing core metadata)

## 11) KPI and Monitoring Framework

### Weekly KPIs

- SEO: indexed URLs, impressions, clicks, CTR, top query movement
- AEO: FAQ-rich result presence, answer extraction coverage, AI citations tracking
- GEO: India/Maharashtra query share, geo-intent query growth, geo-qualified leads

### 60-Day Execution Cadence

1. Weeks 1-2: technical hardening and automation
2. Weeks 3-4: page-content and answer-layer upgrades
3. Weeks 5-6: authority assets and citation foundations
4. Weeks 7-8: iterative optimization and CTR/ranking refinements

## 12) Testing Strategy

- Static checks for metadata/schema integrity
- Manual spot checks for canonical + schema output on key routes
- Rich Results validation for FAQ and service pages
- Search console index coverage verification after deployment
- Internal link crawl checks for orphan pages and broken links

## 13) Risks and Mitigations

- **Risk:** Over-optimization/keyword stuffing  
  **Mitigation:** Editorial standards and natural language rules

- **Risk:** Schema-content mismatch  
  **Mitigation:** Shared source mapping and validation checks

- **Risk:** Static sitemap drift  
  **Mitigation:** Automated generation from route metadata

- **Risk:** Unrealistic ranking expectation  
  **Mitigation:** KPI-driven execution and continuous iteration model

## 14) Acceptance Criteria

This design is considered successfully implemented when:

- All indexable routes have complete, unique metadata and intent mapping
- Schema graph is valid, linked, and page-intent appropriate
- Sitemap and robots are accurate and synchronized with indexable routes
- AEO Q&A is present, high quality, and aligned with FAQ schema
- GEO signals are consistent and professionally integrated
- Internal linking matrix is implemented without orphan pages
- KPI tracking process is active and reviewed weekly

## 15) Implementation Readiness

This design is approved in conversation and ready to convert into a detailed implementation plan.
