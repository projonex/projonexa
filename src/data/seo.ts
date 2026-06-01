import { BRAND, GEO } from './brand'
import { FAQ_ITEMS } from './faq'
import type { PageSEO } from '../lib/seo-types'
export type { Audience, BreadcrumbItem, PageSEO, SearchIntent } from '../lib/seo-types'

const GEO_KEYWORDS = [
  'final year projects India',
  'engineering projects Maharashtra',
  'project development Pune',
  'project development Mumbai',
  'academic projects India',
  'BE project help India',
  'BTech final year project',
  'MCA project development',
  'student project assistance India',
]

export const BASE_KEYWORDS = [
  'final year projects',
  'engineering projects',
  'AI projects',
  'startup MVP development',
  'software development',
  'project assistance',
  'academic projects',
  'mini projects',
  'internship projects',
  'IoT projects',
  'web development projects',
  'mobile app projects',
  'Projonexa',
  ...GEO_KEYWORDS,
]

export const SERVICES_PAGE_FAQ = [
  {
    question: 'What services does Projonexa provide?',
    answer:
      'Projonexa provides end-to-end final year project delivery, AI/ML solutions, web and mobile development, IoT systems, and startup MVP engineering support.',
  },
  {
    question: 'Do services include documentation and deployment?',
    answer:
      'Yes. Services include source code, technical documentation, testing support, and deployment guidance based on your project scope.',
  },
  {
    question: 'Who are these services designed for?',
    answer:
      'Services are designed for students, startups, and businesses that need reliable delivery with clear milestones and mentoring support.',
  },
] as const

export const PRICING_PAGE_FAQ = [
  {
    question: 'How much does a final year project usually cost?',
    answer:
      'Final pricing depends on complexity, timeline, and deliverables, and every quote is shared clearly before implementation begins.',
  },
  {
    question: 'Are custom pricing plans available?',
    answer:
      'Yes. Projonexa provides custom pricing for student, startup, and business requirements with transparent scope mapping.',
  },
  {
    question: 'Does pricing include documentation and support?',
    answer:
      'Yes. Pricing plans include required documentation and delivery support aligned to academic or product goals.',
  },
] as const

export const CONTACT_PAGE_FAQ = [
  {
    question: 'How can I contact Projonexa?',
    answer:
      'You can contact Projonexa via the contact form or email, and share project scope, timeline, and goals for a faster response.',
  },
  {
    question: 'When will I get a response?',
    answer:
      'Projonexa generally responds within 24 hours on business days with next steps and scope clarification.',
  },
  {
    question: 'What details should I include in my inquiry?',
    answer:
      'Include your project type, deadline, expected deliverables, and preferred technology stack so the team can provide an accurate plan.',
  },
] as const

export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title: `${BRAND.name} | Final Year Projects & Innovation Platform — ${GEO.region}, ${GEO.country}`,
    description:
      'Projonexa is India\'s trusted innovation platform for final year projects, AI/ML, and startup MVPs. End-to-end development with documentation, deployment & viva prep — serving students & clients across India and globally.',
    keywords: BASE_KEYWORDS,
    path: '/',
    primaryKeyword: 'final year projects India',
    secondaryKeywords: ['engineering projects Maharashtra', 'startup MVP development India'],
    intent: 'commercial',
    audience: 'mixed',
    conversionGoal: 'contact-inquiry',
    aeoQuestions: [
      'What is Projonexa?',
      'Who is Projonexa for?',
      'What deliverables are included with every project?',
    ],
    faqSchema: true,
    serviceSchema: true,
  },
  about: {
    title: `About ${BRAND.name} | Innovation Platform — ${GEO.country}`,
    description:
      `Learn about Projonexa — a Maharashtra, India-based technology platform helping students, colleges, startups, and businesses turn ideas into production-ready projects with expert mentorship and 100+ delivered projects.`,
    keywords: [...BASE_KEYWORDS, 'about projonexa', 'innovation platform India'],
    path: '/about',
    primaryKeyword: 'about Projonexa',
    secondaryKeywords: ['innovation platform India', 'project development team India'],
    intent: 'informational',
    audience: 'mixed',
    conversionGoal: 'learn-about-brand',
    breadcrumb: [{ name: 'About', path: '/about' }],
  },
  services: {
    title: `Project Development Services | ${BRAND.name} — Final Year, AI, MVP`,
    description:
      'Projonexa services: final year projects, mini projects, AI/ML, web & mobile apps, IoT, startup MVPs, and custom software. Complete deliverables — code, SRS, PPT, deployment & viva support across India.',
    keywords: [...BASE_KEYWORDS, 'project development services', 'final year project help'],
    path: '/services',
    primaryKeyword: 'project development services India',
    secondaryKeywords: ['final year project help', 'startup MVP development India'],
    intent: 'commercial',
    audience: 'mixed',
    conversionGoal: 'service-inquiry',
    aeoQuestions: [
      'What services does Projonexa provide?',
      'Can Projonexa build startup MVPs?',
      'Do services include documentation and deployment?',
    ],
    faqItems: [...SERVICES_PAGE_FAQ],
    faqSchema: true,
    breadcrumb: [{ name: 'Services', path: '/services' }],
    serviceSchema: true,
  },
  projects: {
    title: `My Projects | ${BRAND.name} — SPPU BUDDY & More`,
    description:
      'Explore live products from Projonexa — including SPPU BUDDY, the free Android app for Savitribai Phule Pune University students with notes, PYQs, syllabus, dark mode, and SGPA tools.',
    keywords: [
      ...BASE_KEYWORDS,
      'SPPU BUDDY',
      'SPPU app',
      'SPPU notes app',
      'engineering student app',
      'my projects portfolio',
    ],
    path: '/projects',
    primaryKeyword: 'student project portfolio India',
    secondaryKeywords: ['SPPU BUDDY app', 'engineering project examples'],
    intent: 'informational',
    audience: 'mixed',
    conversionGoal: 'explore-projects',
    breadcrumb: [{ name: 'Projects', path: '/projects' }],
  },
  blog: {
    title: `Blog | ${BRAND.name} — Project Guides & Tech Insights`,
    description:
      'Expert guides on final year projects, AI development, startup MVPs, and engineering trends — from the Projonexa team serving students across India.',
    keywords: [...BASE_KEYWORDS, 'tech blog', 'final year project guide'],
    path: '/blog',
    primaryKeyword: 'final year project guide',
    secondaryKeywords: ['AI development blog India', 'startup MVP insights'],
    intent: 'informational',
    audience: 'students',
    conversionGoal: 'read-blog',
    breadcrumb: [{ name: 'Blog', path: '/blog' }],
  },
  portfolio: {
    title: `Portfolio | ${BRAND.name} — Academic & Industry Projects`,
    description:
      'Projonexa portfolio: 100+ delivered projects across engineering, AI, web, mobile, IoT, and startup domains. Trusted by 500+ students and innovators in India and globally.',
    keywords: [...BASE_KEYWORDS, 'project showcase', 'engineering portfolio'],
    path: '/portfolio',
    primaryKeyword: 'engineering project portfolio India',
    secondaryKeywords: ['project showcase', 'AI web mobile portfolio'],
    intent: 'commercial',
    audience: 'mixed',
    conversionGoal: 'portfolio-inquiry',
    breadcrumb: [{ name: 'Portfolio', path: '/portfolio' }],
  },
  pricing: {
    title: `Pricing | ${BRAND.name} — Affordable Student Project Plans`,
    description:
      'Transparent, student-friendly pricing for mini projects, final year projects, and startup MVPs. Custom quotes aligned to your college deadline and scope.',
    keywords: [...BASE_KEYWORDS, 'project pricing India', 'affordable final year project'],
    path: '/pricing',
    primaryKeyword: 'final year project pricing India',
    secondaryKeywords: ['project pricing India', 'startup MVP pricing'],
    intent: 'transactional',
    audience: 'students',
    conversionGoal: 'pricing-inquiry',
    aeoQuestions: [
      'How much does a final year project cost?',
      'Are custom pricing plans available?',
      'Does pricing include documentation and support?',
    ],
    faqItems: [...PRICING_PAGE_FAQ],
    faqSchema: true,
    breadcrumb: [{ name: 'Pricing', path: '/pricing' }],
  },
  careers: {
    title: `Careers | Join ${BRAND.name} Team`,
    description:
      'Explore roles at Projonexa — developers, designers, QA, mentors, interns, and more. Apply online to join our innovation team.',
    keywords: [...BASE_KEYWORDS, 'freelance developer India', 'projonexa careers'],
    path: '/careers',
    primaryKeyword: 'Projonexa careers',
    secondaryKeywords: ['freelance developer India', 'innovation team roles'],
    intent: 'navigational',
    audience: 'mixed',
    conversionGoal: 'careers-apply',
    breadcrumb: [{ name: 'Careers', path: '/careers' }],
  },
  careersApply: {
    title: `Apply to Join ${BRAND.name}`,
    description:
      'Submit your application to join the Projonexa team. Share your role, skills, experience, and availability — we respond within a few business days.',
    keywords: [...BASE_KEYWORDS, 'projonexa apply', 'join projonexa team'],
    path: '/careers/apply',
    primaryKeyword: 'apply to Projonexa',
    secondaryKeywords: ['join Projonexa team', 'careers apply form'],
    intent: 'transactional',
    audience: 'mixed',
    conversionGoal: 'submit-application',
    breadcrumb: [
      { name: 'Careers', path: '/careers' },
      { name: 'Apply', path: '/careers/apply' },
    ],
  },
  faq: {
    title: `FAQ | ${BRAND.name} — Projects, Pricing, Careers & Support`,
    description:
      'Projonexa FAQ: project types, deliverables, timelines, student pricing, viva prep, startup MVPs, careers, SPPU BUDDY, and how to contact us in India and globally.',
    keywords: [
      ...BASE_KEYWORDS,
      'final year project FAQ',
      'projonexa careers FAQ',
      'project deliverables India',
    ],
    path: '/faq',
    primaryKeyword: 'final year project FAQ India',
    secondaryKeywords: ['project deliverables India', 'student project support FAQ'],
    intent: 'informational',
    audience: 'mixed',
    conversionGoal: 'contact-inquiry',
    aeoQuestions: [
      'What project types do you support?',
      'What deliverables are included?',
      'How quickly does your team respond?',
    ],
    faqItems: [...FAQ_ITEMS],
    breadcrumb: [{ name: 'FAQ', path: '/faq' }],
    faqSchema: true,
  },
  contact: {
    title: `Contact ${BRAND.name} | Start Your Project — ${GEO.region}, ${GEO.country}`,
    description:
      'Contact Projonexa for final year projects, mini projects, AI/ML, web & mobile apps, IoT, and startup MVPs. Submit an inquiry — response within 24 hours across India and globally.',
    keywords: [...BASE_KEYWORDS, 'contact projonexa', 'project inquiry India'],
    path: '/contact',
    primaryKeyword: 'contact Projonexa',
    secondaryKeywords: ['project inquiry India', 'final year project consultation'],
    intent: 'transactional',
    audience: 'mixed',
    conversionGoal: 'submit-contact-form',
    aeoQuestions: [
      'How can I contact Projonexa?',
      'What details should I share in the inquiry?',
      'When will I receive a response?',
    ],
    faqItems: [...CONTACT_PAGE_FAQ],
    faqSchema: true,
    breadcrumb: [{ name: 'Contact', path: '/contact' }],
  },
  studentInquiry: {
    title: `Student Project Inquiry | ${BRAND.name} — Final Year & Academic Projects`,
    description:
      'Submit a student project inquiry to Projonexa: final year, mini, AI/ML, web, mobile, and IoT projects with documentation, deployment, and viva support across India.',
    keywords: [
      ...BASE_KEYWORDS,
      'final year project inquiry',
      'student project form India',
      'BE project help',
    ],
    path: '/inquiry/students',
    primaryKeyword: 'student project inquiry India',
    secondaryKeywords: ['final year project inquiry', 'BE project help form'],
    intent: 'transactional',
    audience: 'students',
    conversionGoal: 'submit-student-inquiry',
    breadcrumb: [
      { name: 'Contact', path: '/contact' },
      { name: 'Student inquiry', path: '/inquiry/students' },
    ],
  },
  corporateInquiry: {
    title: `Corporate & Startup Inquiry | ${BRAND.name} — MVP & Custom Software`,
    description:
      'Submit a corporate or startup project inquiry to Projonexa for MVPs, custom software, web & mobile apps, and AI/ML solutions. Response within 24 hours.',
    keywords: [
      ...BASE_KEYWORDS,
      'startup MVP inquiry',
      'custom software development India',
      'corporate project inquiry',
    ],
    path: '/inquiry/corporate',
    primaryKeyword: 'startup MVP inquiry India',
    secondaryKeywords: ['corporate project inquiry', 'custom software development India'],
    intent: 'transactional',
    audience: 'businesses',
    conversionGoal: 'submit-corporate-inquiry',
    breadcrumb: [
      { name: 'Contact', path: '/contact' },
      { name: 'Corporate inquiry', path: '/inquiry/corporate' },
    ],
  },
}

/** Core Q&A pairs surfaced on homepage for AEO (Answer Engine Optimization) */
export const AEO_HOME_FAQ = [
  {
    question: 'What is Projonexa?',
    answer:
      'Projonexa is a technology-driven innovation platform based in Maharashtra, India that provides end-to-end project development for students, colleges, startups, and businesses — including final year projects, AI/ML systems, startup MVPs, IoT solutions, and custom software.',
  },
  {
    question: 'Who is Projonexa for?',
    answer:
      'Projonexa serves engineering and computer science students, college faculty, startups, freelancers, and businesses who need professional help building academic projects or production-ready software products.',
  },
  {
    question: 'What does Projonexa deliver with every project?',
    answer:
      'Every Projonexa project includes working source code, SRS and design documentation, project report, presentation slides (PPT), database setup, deployment support, demo guidance, and viva preparation — aligned to university evaluation standards.',
  },
  {
    question: 'Where is Projonexa located and who does it serve?',
    answer:
      'Projonexa is based in Maharashtra, India and serves clients across India and globally through remote collaboration.',
  },
  {
    question: 'How do I start a project with Projonexa?',
    answer:
      'Visit projonexa.com/contact, submit your project requirements, or email nisargalokhande@gmail.com. The team responds within 24 hours with scope, timeline, and next steps.',
  },
] as const
