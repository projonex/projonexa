#!/usr/bin/env node
/**
 * Create GitHub issues from the Projonexa backlog.
 *
 * Prerequisites:
 *   - gh CLI installed and authenticated (gh auth login)
 *   - Milestones M1–M10 created (titles must match MILESTONES below)
 *   - Labels from docs/GITHUB_LABELS_SETUP.md
 *
 * Usage:
 *   node scripts/create-github-issues.mjs --dry-run
 *   node scripts/create-github-issues.mjs
 *   node scripts/create-github-issues.mjs --only 1,2,3
 *   node scripts/create-github-issues.mjs --close-done
 */

import { execSync } from 'node:child_process'

const MILESTONES = {
  M1: 'Milestone 1: Establish Brand Authority',
  M2: 'Milestone 2: Professional Website Launch',
  M3: 'Milestone 3: Build Project Knowledge Library',
  M4: 'Milestone 4: Student Guidance & Mentorship Services',
  M5: 'Milestone 5: Content Marketing & Educational Resources',
  M6: 'Milestone 6: Open Source & Community Contributions',
  M7: 'Milestone 7: SEO & GEO Optimization',
  M8: 'Milestone 8: Social Proof & Trust Building',
  M9: 'Milestone 9: Educational Media Platform',
  M10: 'Milestone 10: Projonexa Ecosystem Expansion',
}

const OPEN_ISSUES = [
  {
    id: 1,
    title: '[M2] Add Privacy Policy page',
    milestone: MILESTONES.M2,
    labels: ['enhancement', 'legal', 'repo:website', 'milestone-2-website', 'priority:high'],
    body: issueBody('M2', 'Publish a Privacy Policy page for contact forms, analytics, and cookies.', [
      'New route `/privacy` with legal content',
      'Footer link on all pages',
      'SEO via existing SEO component',
      'Included in sitemap.xml',
      'India-relevant context (email, company name, URL)',
    ], 'Add PrivacyPage.tsx, route in App.tsx, copy in src/data/legal.ts'),
  },
  {
    id: 2,
    title: '[M2] Add Terms and Conditions page',
    milestone: MILESTONES.M2,
    labels: ['enhancement', 'legal', 'repo:website', 'milestone-2-website', 'priority:high'],
    body: issueBody('M2', 'Publish Terms and Conditions for website and inquiry services.', [
      'Route `/terms`',
      'Footer link with Privacy',
      'SEO metadata',
      'Sitemap updated',
    ]),
  },
  {
    id: 3,
    title: '[M2][M7] Integrate website analytics (GA4 or privacy-friendly alternative)',
    milestone: MILESTONES.M2,
    labels: [
      'enhancement',
      'ops:analytics',
      'repo:website',
      'milestone-2-website',
      'milestone-7-seo',
      'priority:high',
    ],
    body: issueBody('M2 · M7', 'Measure traffic and inquiry conversions in production.', [
      'Provider chosen (GA4, Plausible, etc.)',
      'Tracking via env var — document in .env.example',
      'Key events: contact CTA, inquiry submit',
      'Cookie/consent if required',
      'Document in docs/SEO_OPERATIONS_PLAYBOOK.md',
    ]),
  },
  {
    id: 4,
    title: '[M7] Configure Google Search Console and submit sitemap',
    milestone: MILESTONES.M7,
    labels: ['enhancement', 'ops:analytics', 'milestone-7-seo', 'priority:high'],
    body: issueBody('M7', 'Verify ownership and submit sitemap for indexing.', [
      'Property for https://projonexa.com',
      'Verification complete',
      'sitemap.xml submitted',
      'No critical coverage errors',
    ], 'public/sitemap.xml · npm run sitemap:generate'),
  },
  {
    id: 5,
    title: '[M1] Design horizontal logo lockup (mark + wordmark)',
    milestone: MILESTONES.M1,
    labels: ['design', 'milestone-1-brand', 'priority:high'],
    body: issueBody('M1', 'Horizontal logo for email, LinkedIn, print, wide layouts.', [
      'SVG + PNG exports (light/dark)',
      'Usage guidelines in BRAND_GUIDELINES',
      'Files under public/brand/ or design repo',
    ], 'Reference: public/logo.png · docs/BRAND_GUIDELINES.md'),
  },
  {
    id: 6,
    title: '[M1] Create social media branding asset pack',
    milestone: MILESTONES.M1,
    labels: ['design', 'milestone-1-brand', 'priority:high'],
    body: issueBody('M1', 'Templates for LinkedIn, Instagram, YouTube, X.', [
      'Profile/cover images per platform',
      'Post 1080×1080 and 1200×630 templates',
      'Story safe-zone template',
      'Figma link or PDF in docs/',
    ]),
  },
  {
    id: 7,
    title: '[M2] Run accessibility audit and fix critical issues',
    milestone: MILESTONES.M2,
    labels: ['enhancement', 'repo:website', 'milestone-2-website', 'priority:high'],
    body: issueBody('M2', 'WCAG improvements for keyboard, contrast, screen readers.', [
      'Lighthouse accessibility ≥ 90 on Home, Contact, FAQ',
      'Keyboard access for all controls',
      'Form labels/errors correct',
      'Findings in docs/ACCESSIBILITY.md or issue comments',
    ]),
  },
  {
    id: 8,
    title: '[M2] Lighthouse performance optimization pass',
    milestone: MILESTONES.M2,
    labels: ['enhancement', 'repo:website', 'milestone-2-website', 'milestone-7-seo', 'priority:high'],
    body: issueBody('M2 · M7', 'Strong Core Web Vitals on production.', [
      'Lighthouse Performance ≥ 90 mobile Home',
      'Optimize public/logo.png (~500KB)',
      'LCP/CLS issues addressed',
    ]),
  },
  {
    id: 9,
    title: '[M2] Add site search functionality',
    milestone: MILESTONES.M2,
    labels: ['enhancement', 'repo:website', 'milestone-2-website', 'priority:medium'],
    body: issueBody('M2', 'Search FAQs, services, and projects from header.', [
      'Search UI desktop + mobile',
      'Client-side index over src/data',
      'Accessible UI pattern',
    ], 'Suggested: Fuse.js'),
  },
  {
    id: 10,
    title: '[M1] Create LinkedIn company page for Projonexa',
    milestone: MILESTONES.M1,
    labels: ['milestone-1-brand', 'ops:infra', 'priority:medium'],
    body: issueBody('M1', 'Official LinkedIn company page with consistent branding.', [
      'Page published',
      'Logo, banner, tagline, about text',
      'Link on site footer when live',
    ]),
  },
  {
    id: 11,
    title: '[M1] Setup professional email on domain (e.g. hello@projonexa.com)',
    milestone: MILESTONES.M1,
    labels: ['milestone-1-brand', 'ops:infra', 'priority:medium'],
    body: issueBody('M1', 'Branded domain email for inquiries.', [
      'Email configured',
      'SPF/DKIM/DMARC set',
      'Contact page updated if needed',
    ]),
  },
  {
    id: 12,
    title: '[M2] Configure CDN and production caching headers',
    milestone: MILESTONES.M2,
    labels: ['ops:infra', 'milestone-2-website', 'priority:medium'],
    body: issueBody('M2', 'Edge caching for static assets.', [
      'CDN enabled on host',
      'Cache headers for assets',
      'Document in docs/ARCHITECTURE.md',
    ]),
  },
  {
    id: 13,
    title: '[M2] Setup uptime monitoring and deploy rollback process',
    milestone: MILESTONES.M2,
    labels: ['ops:infra', 'milestone-2-website', 'priority:medium'],
    body: issueBody('M2', 'Alerts on downtime + rollback playbook.', [
      'Uptime monitor on projonexa.com',
      'Alert channel defined',
      'Rollback steps documented',
    ]),
  },
  {
    id: 14,
    title: '[M4][Epic] Student documentation templates pack',
    milestone: MILESTONES.M4,
    labels: ['epic', 'repo:content', 'milestone-4-mentorship', 'priority:medium'],
    body: epicBody('M4', 'Templates for reports, IEEE, SRS, user manuals.', [
      'Project report template',
      'IEEE paper template',
      'SRS template',
      'User manual template',
      'Technical documentation guide hub',
    ]),
  },
  {
    id: 15,
    title: '[M4][Epic] Viva preparation resource hub',
    milestone: MILESTONES.M4,
    labels: ['epic', 'repo:content', 'milestone-4-mentorship', 'priority:medium'],
    body: epicBody('M4', 'Viva guides and FAQs for students.', [
      'Viva preparation guide',
      'Common viva questions FAQ',
      'Mock viva framework',
      'Presentation guide',
    ]),
  },
  {
    id: 16,
    title: '[M4] Document official mentorship workflow and SLAs',
    milestone: MILESTONES.M4,
    labels: ['documentation', 'repo:content', 'milestone-4-mentorship', 'priority:medium'],
    body: issueBody('M4', 'Student journey from inquiry to delivery.', [
      'Workflow documented',
      'Response time SLAs aligned with marketing',
      'Linked from /inquiry/students',
    ]),
  },
  {
    id: 17,
    title: '[M8][Epic] Testimonials and success stories section',
    milestone: MILESTONES.M8,
    labels: ['epic', 'enhancement', 'repo:website', 'milestone-8-trust', 'priority:medium'],
    body: epicBody('M8', 'Real student outcomes on the site.', [
      'Collection process',
      'Written testimonials UI',
      'Video testimonial strategy',
      '1–2 case study pilots',
      'Consent/release process',
    ]),
  },
  {
    id: 18,
    title: '[M8] Add mentor profiles and expertise pages',
    milestone: MILESTONES.M8,
    labels: ['enhancement', 'repo:website', 'milestone-8-trust', 'priority:low'],
    body: issueBody('M8', 'Show mentor expertise beyond founder section.', [
      'Data model in src/data/',
      'Team/mentor page or About section',
      'Skill tags per mentor',
    ]),
  },
  {
    id: 19,
    title: '[M7] Internal linking audit and hub page improvements',
    milestone: MILESTONES.M7,
    labels: ['enhancement', 'repo:website', 'milestone-7-seo', 'priority:medium'],
    body: issueBody('M7', 'Strengthen SEO topic clusters.', [
      'Contextual internal links audit',
      'Related links blocks',
      'Update docs/SEO_STRATEGY.md cluster map',
    ]),
  },
  {
    id: 20,
    title: '[M5][Epic] Blog content pipeline and first 5 articles',
    milestone: MILESTONES.M5,
    labels: ['epic', 'repo:content', 'milestone-5-content', 'priority:medium'],
    body: epicBody('M5', 'Activate /blog with real articles.', [
      'Post content model (MDX or data)',
      '5 flagship articles (see GITHUB_ISSUES_BACKLOG.md)',
      'Sitemap entries for posts',
    ]),
  },
  {
    id: 21,
    title: '[M5] Define weekly content publishing process',
    milestone: MILESTONES.M5,
    labels: ['documentation', 'milestone-5-content', 'priority:low'],
    body: issueBody('M5', 'Repeatable editorial calendar.', [
      'Calendar template',
      'Roles defined',
      'SEO checklist per post',
      'Document in CONTENT_OPS or SEO playbook',
    ]),
  },
  {
    id: 22,
    title: '[M3][Epic] AI project knowledge category',
    milestone: MILESTONES.M3,
    labels: ['epic', 'repo:website', 'milestone-3-library', 'priority:low'],
    body: epicBody('M3', 'AI project library category.', [
      'Category landing page',
      'Beginner/intermediate/advanced entries',
      'Screenshots + architecture diagrams',
    ]),
  },
  {
    id: 23,
    title: '[M3][Epic] IoT project knowledge category',
    milestone: MILESTONES.M3,
    labels: ['epic', 'repo:website', 'milestone-3-library', 'priority:low'],
    body: epicBody('M3', 'IoT project library category.', [
      'Category page',
      'Sensor/automation/smart system projects',
      'Hardware diagrams',
    ]),
  },
  {
    id: 24,
    title: '[M3][Epic] Web Development project knowledge category',
    milestone: MILESTONES.M3,
    labels: ['epic', 'repo:website', 'milestone-3-library', 'priority:low'],
    body: epicBody('M3', 'Web project library category.', [
      'Category page',
      'Frontend/backend/full-stack entries',
      'Deployment guides',
    ]),
  },
  {
    id: 25,
    title: '[M3][Epic] Mobile Development project knowledge category',
    milestone: MILESTONES.M3,
    labels: ['epic', 'repo:website', 'milestone-3-library', 'priority:low'],
    body: epicBody('M3', 'Mobile project library category.', [
      'Category page',
      'Android/Flutter/RN projects',
      'Store deployment notes',
    ]),
  },
  {
    id: 26,
    title: '[M6][Epic] Educational open-source repositories under Projonexa org',
    milestone: MILESTONES.M6,
    labels: ['epic', 'repo:org', 'milestone-6-opensource', 'priority:low'],
    body: epicBody('M6', 'Starter repos for students.', [
      'mini-projects, ai-projects, iot-projects, web-projects, mobile-projects repos',
      'Each with README, CONTRIBUTING, license, templates',
    ]),
  },
  {
    id: 27,
    title: '[M6] Enable GitHub Discussions for community Q&A',
    milestone: MILESTONES.M6,
    labels: ['enhancement', 'milestone-6-opensource', 'priority:low'],
    body: issueBody('M6', 'Community Q&A without formal issues.', [
      'Discussions enabled',
      'Categories: Q&A, Ideas, Show and tell',
      'Linked from README and SUPPORT.md',
    ]),
  },
  {
    id: 28,
    title: '[M9][Epic] YouTube channel launch and content plan',
    milestone: MILESTONES.M9,
    labels: ['epic', 'milestone-9-media', 'priority:low'],
    body: epicBody('M9', 'YouTube educational presence.', [
      'Channel branding',
      '4 pilot videos',
      'Footer link on site',
    ]),
  },
  {
    id: 29,
    title: '[M10][Epic] Mentor network onboarding system (future)',
    milestone: MILESTONES.M10,
    labels: ['epic', 'milestone-10-ecosystem', 'priority:low'],
    body: issueBody('M10', 'Discovery for scalable mentor network (long-term).', [
      'Requirements doc',
      'Flow/wireframes',
      'Tie-in with Careers apply flow',
    ]),
  },
]

const CLOSE_DONE_ISSUES = [
  { title: '[M1] Primary logo integrated on website', milestone: MILESTONES.M1, labels: ['milestone-1-brand'] },
  { title: '[M1] Favicon and PWA icons', milestone: MILESTONES.M1, labels: ['milestone-1-brand'] },
  { title: '[M1] Brand color palette documented', milestone: MILESTONES.M1, labels: ['milestone-1-brand', 'documentation'] },
  { title: '[M7] XML sitemap and robots.txt', milestone: MILESTONES.M7, labels: ['milestone-7-seo'] },
  { title: '[M7] JSON-LD schema markup', milestone: MILESTONES.M7, labels: ['milestone-7-seo'] },
  { title: '[M7] llms.txt for AI crawlers', milestone: MILESTONES.M7, labels: ['milestone-7-seo'] },
  { title: '[M6] Issue and PR templates', milestone: MILESTONES.M6, labels: ['milestone-6-opensource'] },
  { title: '[M2] Core marketing pages live', milestone: MILESTONES.M2, labels: ['milestone-2-website'] },
]

function issueBody(milestone, objective, criteria, notes = '') {
  const criteriaList = criteria.map((c) => `- [ ] ${c}`).join('\n')
  return `## Milestone
${milestone}

## Objective
${objective}

## Acceptance criteria
${criteriaList}

${notes ? `## Implementation notes\n${notes}\n\n` : ''}## References
- docs/GITHUB_ISSUES_BACKLOG.md
- docs/GITHUB_MILESTONES.md
`
}

function epicBody(milestone, objective, children) {
  const childList = children.map((c) => `- [ ] ${c}`).join('\n')
  return `## Milestone
${milestone}

## Objective
${objective}

## Child tasks (create sub-issues)
${childList}

## References
- docs/GITHUB_ISSUES_BACKLOG.md
`
}

function parseArgs(argv) {
  const dryRun = argv.includes('--dry-run')
  const closeDone = argv.includes('--close-done')
  const onlyIdx = argv.findIndex((a) => a === '--only')
  let only = null
  if (onlyIdx !== -1 && argv[onlyIdx + 1]) {
    only = argv[onlyIdx + 1].split(',').map((n) => Number(n.trim()))
  }
  return { dryRun, closeDone, only }
}

function ghAvailable() {
  try {
    execSync('gh --version', { stdio: 'ignore' })
    execSync('gh auth status', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

function createIssue({ title, milestone, labels, body }, { dryRun, closeAfter }) {
  const labelArgs = labels.map((l) => `--label "${l}"`).join(' ')
  const cmd = `gh issue create --title "${title.replace(/"/g, '\\"')}" --milestone "${milestone}" ${labelArgs} --body-file -`

  if (dryRun) {
    console.log(`[dry-run] ${closeAfter ? 'CLOSE' : 'OPEN'} #? ${title}`)
    return
  }

  execSync(cmd, { input: body, stdio: ['pipe', 'inherit', 'inherit'] })
  console.log(`Created: ${title}`)

  if (closeAfter) {
    const num = execSync(`gh issue list --search "${title}" --limit 1 --json number --jq '.[0].number'`, {
      encoding: 'utf8',
    }).trim()
    if (num) {
      execSync(`gh issue close ${num} --comment "Completed — tracked in repo. See docs/GITHUB_MILESTONES.md."`)
      console.log(`Closed: #${num}`)
    }
  }
}

const { dryRun, closeDone, only } = parseArgs(process.argv.slice(2))

if (!dryRun && !ghAvailable()) {
  console.error(
    '\nGitHub CLI (gh) is required. Install: https://cli.github.com/\nThen: gh auth login\n\nOr copy issues manually from docs/GITHUB_ISSUES_BACKLOG.md\n',
  )
  process.exit(1)
}

let issues = OPEN_ISSUES
if (only?.length) {
  issues = OPEN_ISSUES.filter((i) => only.includes(i.id))
}

console.log(`\nProjonexa — create ${issues.length} open issue(s)${dryRun ? ' (dry-run)' : ''}\n`)

for (const issue of issues) {
  createIssue(issue, { dryRun, closeAfter: false })
}

if (closeDone) {
  console.log(`\nCreating ${CLOSE_DONE_ISSUES.length} completed issue(s) to close...\n`)
  for (const issue of CLOSE_DONE_ISSUES) {
    createIssue(
      {
        ...issue,
        body: `## Status\n✅ Already completed in the repository.\n\nSee docs/GITHUB_MILESTONES.md progress tables.\n`,
      },
      { dryRun, closeAfter: !dryRun },
    )
  }
}

console.log('\nDone.\n')
