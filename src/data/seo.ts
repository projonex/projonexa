import { AFFILIATE_FAQ_ITEMS } from './affiliateFaq'
import { CLIENT_PROJECTS_FAQ_ITEMS } from './clientProjectsFaq'
import { STUDENT_PROJECTS_FAQ_ITEMS } from './studentProjectsFaq'
import { BRAND, GEO } from './brand'
import { FAQ_ITEMS } from './faq'
import type { PageSEO } from '@/lib/seo/seo-types'
export type { Audience, BreadcrumbItem, PageSEO, SearchIntent } from '@/lib/seo/seo-types'

const GEO_KEYWORDS = [
  'final year projects India',
  'final year engineering project India',
  'college engineering project help',
  'mini project engineering students',
  'mini project for engineering college',
  'BE final year project India',
  'BTech final year project',
  'BCA MCA project development India',
  'engineering projects pan India',
  'pan India project development',
  'college project help all India',
  'academic projects India',
  'BE project help India',
  'MCA project development',
  'student project assistance India',
  'college project with documentation viva',
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

export const ABOUT_PAGE_FAQ = [
  {
    question: 'What is Projonexa?',
    answer:
      'Projonexa is a pan-India innovation platform that delivers final year and mini engineering college projects, AI/ML systems, startup MVPs, and custom software with documentation and mentor support.',
  },
  {
    question: 'Where is Projonexa located and who does it serve?',
    answer:
      'Projonexa is based in India and serves students, colleges, startups, and businesses nationwide and globally with remote project delivery.',
  },
  {
    question: 'How do I start a project with Projonexa?',
    answer:
      'Students use projonexa.com/inquiry/students; startups and businesses use projonexa.com/inquiry/corporate or projonexa.com/contact. See projonexa.com/college-projects or projonexa.com/client-projects for detailed Q&A.',
  },
] as const

export const PROJECTS_PAGE_FAQ = [
  {
    question: 'What products has Projonexa built?',
    answer:
      'Projonexa builds student tools and client software — including SPPU BUDDY, a free Android app for SPPU engineering students, plus custom final year, MVP, and enterprise projects.',
  },
  {
    question: 'Can Projonexa build a project like SPPU BUDDY for my college?',
    answer:
      'Yes. Projonexa develops web, mobile, and AI projects for colleges and clients. Submit scope at projonexa.com/inquiry/students or projonexa.com/inquiry/corporate.',
  },
] as const

export const BLOG_PAGE_FAQ = [
  {
    question: 'What topics does the Projonexa blog cover?',
    answer:
      'Guides on final year projects, mini projects, AI development, startup MVPs, and engineering career insights for students in India.',
  },
  {
    question: 'Where should I go for project help instead of only reading the blog?',
    answer:
      'Use projonexa.com/college-projects for student Q&A or projonexa.com/client-projects for MVP and startup help, then contact via projonexa.com/contact.',
  },
] as const

export const PORTFOLIO_PAGE_FAQ = [
  {
    question: 'What types of projects are in the Projonexa portfolio?',
    answer:
      '100+ deliveries across final year engineering, mini projects, AI/ML, web, mobile, IoT, and startup MVPs for students and businesses in India.',
  },
  {
    question: 'How do I get a similar project built?',
    answer:
      'Share your requirements at projonexa.com/inquiry/students (college) or projonexa.com/inquiry/corporate (MVP/custom software) for a scoped quote.',
  },
] as const

export const CAREERS_PAGE_FAQ = [
  {
    question: 'What roles are available at Projonexa?',
    answer:
      'Developers, designers, QA, mentors, and interns join Projonexa to work on student projects, MVPs, and innovation delivery across India and remote.',
  },
  {
    question: 'How do I apply to Projonexa?',
    answer:
      'Apply online at projonexa.com/careers/apply with your role, skills, and availability. The team responds within a few business days.',
  },
] as const

export const STUDENT_INQUIRY_PAGE_FAQ = [
  {
    question: 'What should I include in a student project inquiry?',
    answer:
      'College name, branch, project type (final year, mini, semester), technology preference, deadline, and deliverables needed (report, PPT, code, viva).',
  },
  {
    question: 'Where can I read answers before submitting the form?',
    answer:
      'Full college project Q&A is at projonexa.com/college-projects. General FAQ: projonexa.com/faq.',
  },
] as const

export const CORPORATE_INQUIRY_PAGE_FAQ = [
  {
    question: 'What should startups send in a corporate inquiry?',
    answer:
      'Product vision, features, target users, timeline, and tech preferences. Projonexa scopes MVPs and custom software with transparent quotes.',
  },
  {
    question: 'Where is the client and MVP guide?',
    answer:
      'Read projonexa.com/client-projects for GEO/AEO answers on production-ready MVPs, pricing approach, and delivery before submitting this form.',
  },
] as const

export const AFFILIATE_INQUIRY_PAGE_FAQ = [
  {
    question: 'Who can apply to the Projonexa affiliate program?',
    answer:
      'Enrolled students in India who can refer genuine college project inquiries. Full eligibility and commission details: projonexa.com/affiliate-program.',
  },
  {
    question: 'What happens after I apply?',
    answer:
      'Approved affiliates receive a referral code and link to share. Referred student inquiries that become paid projects earn 6–10% commission per program terms.',
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
    title: `${BRAND.name} | Final Year & Mini Engineering College Projects — India`,
    shareTitle: `${BRAND.name} | Final Year & Mini College Projects — India`,
    shareDescription:
      'Final year & mini engineering projects, MVPs & AI/ML — code, report, PPT, viva prep. Pan-India. projonexa.com',
    description:
      'Projonexa — India platform for final year engineering projects, mini & semester college projects, AI/ML, web/mobile & IoT. Full code, report, PPT, viva prep. Visit projonexa.com/college-projects or contact us today.',
    keywords: BASE_KEYWORDS,
    path: '/',
    primaryKeyword: 'final year engineering project India',
    secondaryKeywords: [
      'mini project engineering college India',
      'college project help pan India',
      'startup MVP development India',
    ],
    intent: 'commercial',
    audience: 'mixed',
    conversionGoal: 'contact-inquiry',
    aeoQuestions: [
      'Where can I get final year engineering project help in India?',
      'Where to get mini project for engineering college students?',
      'What is the best website for college engineering projects in India?',
      'What is Projonexa?',
      'How do I contact Projonexa for a college project?',
      'What deliverables are included with every project?',
    ],
    ctrVariants: {
      titles: [
        `${BRAND.name} | Final Year Projects, AI and MVP Experts`,
        `${BRAND.name} | India's Final Year Project and MVP Partner`,
      ],
      descriptions: [
        'Get final year projects, AI/ML systems, and startup MVP development with complete documentation, deployment guidance, and mentor-led viva support.',
        'Projonexa helps students and startups build production-ready projects with clear milestones, technical documentation, and mentoring support.',
      ],
    },
    faqSchema: true,
    serviceSchema: true,
  },
  about: {
    title: `About ${BRAND.name} | Innovation Platform — ${GEO.country}`,
    description:
      `Learn how Projonexa helps students, colleges, startups, and businesses turn ideas into production-ready projects with expert mentorship and proven delivery.`,
    keywords: [...BASE_KEYWORDS, 'about projonexa', 'innovation platform India'],
    path: '/about',
    primaryKeyword: 'about Projonexa',
    secondaryKeywords: ['innovation platform India', 'project development team India'],
    intent: 'informational',
    audience: 'mixed',
    conversionGoal: 'learn-about-brand',
    aeoQuestions: [
      'What is Projonexa?',
      'Where is Projonexa based?',
      'How do I start a project with Projonexa?',
    ],
    faqItems: [...ABOUT_PAGE_FAQ],
    faqSchema: true,
    breadcrumb: [{ name: 'About', path: '/about' }],
  },
  services: {
    title: `Project Development Services | ${BRAND.name} — Final Year, AI, MVP`,
    description:
      'Projonexa delivers final year projects, AI/ML systems, web and mobile apps, IoT builds, startup MVPs, and custom software with complete documentation and support.',
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
    ctrVariants: {
      titles: [
        `Project Development Services India | ${BRAND.name}`,
        `${BRAND.name} Services | Final Year, AI and MVP Development`,
      ],
      descriptions: [
        'Explore final year project delivery, AI solutions, web and mobile development, IoT builds, and startup MVP engineering with complete support.',
        'Choose Projonexa services for end-to-end project development, technical documentation, deployment guidance, and deadline-focused execution plans.',
      ],
    },
    faqItems: [...SERVICES_PAGE_FAQ],
    faqSchema: true,
    breadcrumb: [{ name: 'Services', path: '/services' }],
    serviceSchema: true,
  },
  projects: {
    title: `Projects Portfolio | ${BRAND.name} — SPPU BUDDY & More`,
    description:
      'Explore live products from Projonexa, including SPPU BUDDY, a free Android app for SPPU students with notes, PYQs, syllabus, dark mode, and SGPA tools.',
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
    aeoQuestions: [
      'What products has Projonexa built?',
      'Can Projonexa build apps for engineering students?',
    ],
    faqItems: [...PROJECTS_PAGE_FAQ],
    faqSchema: true,
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
    aeoQuestions: [
      'What does the Projonexa blog cover?',
      'Where to get final year project help in India?',
    ],
    faqItems: [...BLOG_PAGE_FAQ],
    faqSchema: true,
    breadcrumb: [{ name: 'Blog', path: '/blog' }],
  },
  portfolio: {
    title: `Portfolio | ${BRAND.name} — Academic & Industry Projects`,
    description:
      'Projonexa portfolio includes 100+ projects across engineering, AI, web, mobile, IoT, and startup domains, trusted by students and innovators.',
    keywords: [...BASE_KEYWORDS, 'project showcase', 'engineering portfolio'],
    path: '/portfolio',
    primaryKeyword: 'engineering project portfolio India',
    secondaryKeywords: ['project showcase', 'AI web mobile portfolio'],
    intent: 'commercial',
    audience: 'mixed',
    conversionGoal: 'portfolio-inquiry',
    aeoQuestions: [
      'What projects are in the Projonexa portfolio?',
      'How to hire Projonexa for a similar project?',
    ],
    faqItems: [...PORTFOLIO_PAGE_FAQ],
    faqSchema: true,
    serviceSchema: true,
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
    ctrVariants: {
      titles: [
        `Pricing Plans | ${BRAND.name} Final Year and MVP Services`,
        `${BRAND.name} Pricing | Transparent Plans for Projects`,
      ],
      descriptions: [
        'View transparent pricing for final year projects and startup MVPs with custom quotes based on complexity, technical scope, timeline, and deliverables.',
        'Get affordable student and startup project pricing with clear scope mapping, documentation coverage, milestone-based execution, and support details.',
      ],
    },
    faqItems: [...PRICING_PAGE_FAQ],
    faqSchema: true,
    breadcrumb: [{ name: 'Pricing', path: '/pricing' }],
  },
  careers: {
    title: `Careers at ${BRAND.name} | Developers, Mentors and Interns`,
    description:
      'Explore roles for developers, designers, QA, mentors, and interns at Projonexa, and apply online to join our innovation team across India and globally.',
    keywords: [...BASE_KEYWORDS, 'freelance developer India', 'projonexa careers'],
    path: '/careers',
    primaryKeyword: 'Projonexa careers',
    secondaryKeywords: ['freelance developer India', 'innovation team roles'],
    intent: 'navigational',
    audience: 'mixed',
    conversionGoal: 'careers-apply',
    aeoQuestions: [
      'What careers are open at Projonexa?',
      'How to apply to Projonexa?',
    ],
    faqItems: [...CAREERS_PAGE_FAQ],
    faqSchema: true,
    breadcrumb: [{ name: 'Careers', path: '/careers' }],
  },
  careersApply: {
    title: `Apply at ${BRAND.name} | Submit Your Career Application`,
    description:
      'Submit your application to join the Projonexa team. Share your role, skills, experience, and availability — we respond within a few business days.',
    keywords: [...BASE_KEYWORDS, 'projonexa apply', 'join projonexa team'],
    path: '/careers/apply',
    primaryKeyword: 'apply to Projonexa',
    secondaryKeywords: ['join Projonexa team', 'careers apply form'],
    intent: 'transactional',
    audience: 'mixed',
    conversionGoal: 'submit-application',
    aeoQuestions: ['How do I apply to work at Projonexa?'],
    faqItems: [...CAREERS_PAGE_FAQ],
    faqSchema: true,
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
    ctrVariants: {
      titles: [
        `${BRAND.name} FAQ | Projects, Pricing and Delivery Answers`,
        `Final Year Project FAQ India | ${BRAND.name} Support Team`,
      ],
      descriptions: [
        'Read direct answers on project types, deliverables, pricing, timelines, and support options for students, startups, and business teams in India.',
        'Find quick answers about final year projects, MVP development, documentation, response times, and the inquiry process with the Projonexa team.',
      ],
    },
    faqItems: [...FAQ_ITEMS],
    breadcrumb: [{ name: 'FAQ', path: '/faq' }],
    faqSchema: true,
  },
  contact: {
    title: `Contact ${BRAND.name} | Start Your Project — ${GEO.country}`,
    description:
      'Contact Projonexa for final year projects, AI/ML, web and mobile apps, IoT, and startup MVPs. Submit an inquiry for a response within 24 hours.',
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
    ctrVariants: {
      titles: [
        `Contact ${BRAND.name} | Project Consultation in India`,
        `${BRAND.name} Contact | Start Your Final Year or MVP Project`,
      ],
      descriptions: [
        'Contact Projonexa for final year projects, AI/ML, web and mobile apps, IoT, and startup MVP support with a fast response within 24 business hours.',
        'Submit your project scope, timeline, and goals to get a clear consultation response for student, startup, or business requirements in India.',
      ],
    },
    faqItems: [...CONTACT_PAGE_FAQ],
    faqSchema: true,
    breadcrumb: [{ name: 'Contact', path: '/contact' }],
  },
  studentInquiry: {
    title: `Student Project Inquiry | ${BRAND.name} — Final Year Projects`,
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
    aeoQuestions: [
      'How do I submit a student project inquiry to Projonexa?',
      'What details are needed for a final year project quote?',
    ],
    faqItems: [...STUDENT_INQUIRY_PAGE_FAQ],
    faqSchema: true,
    breadcrumb: [
      { name: 'College projects', path: '/college-projects' },
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
    aeoQuestions: [
      'How do startups submit an MVP inquiry to Projonexa?',
      'What is the corporate project inquiry process?',
    ],
    faqItems: [...CORPORATE_INQUIRY_PAGE_FAQ],
    faqSchema: true,
    breadcrumb: [
      { name: 'Client projects', path: '/client-projects' },
      { name: 'Corporate inquiry', path: '/inquiry/corporate' },
    ],
  },
  affiliateInquiry: {
    title: `Affiliate Program Application | ${BRAND.name} — Student Referrals`,
    description:
      'Apply to Projonexa’s student affiliate program: earn passive income by referring genuine final-year and academic project inquiries. Eligibility criteria and application form.',
    keywords: [
      ...BASE_KEYWORDS,
      'student affiliate program India',
      'referral program engineering students',
      'passive income students',
      'projonexa affiliate',
    ],
    path: '/inquiry/affiliate',
    primaryKeyword: 'student affiliate program India',
    secondaryKeywords: ['referral program students', 'projonexa affiliate apply'],
    intent: 'transactional',
    audience: 'students',
    conversionGoal: 'submit-affiliate-application',
    breadcrumb: [
      { name: 'Affiliate program Q&A', path: '/affiliate-program' },
      { name: 'Apply', path: '/inquiry/affiliate' },
    ],
    aeoQuestions: [
      'How do I apply to the Projonexa affiliate program?',
      'Who is eligible for the student affiliate program?',
    ],
    faqItems: [...AFFILIATE_INQUIRY_PAGE_FAQ],
    faqSchema: true,
  },
  clientProjects: {
    title: `Client & MVP Development | ${BRAND.name} — Production-Ready India`,
    shareTitle: `Client & MVP Development | ${BRAND.name}`,
    shareDescription:
      'Production-ready MVPs & custom software for startups in India — scope, quote & end-to-end delivery.',
    description:
      'Build your MVP with Projonexa instead of freelancers. Production-ready web, mobile & custom software for startups and clients in India. Share requirements, get a quote, end-to-end delivery. Client Q&A for GEO & AEO.',
    keywords: [
      ...BASE_KEYWORDS,
      'MVP development India',
      'startup MVP development company',
      'hire developers India startup',
      'alternative to freelancers MVP',
      'production ready MVP India',
      'custom software development clients',
      'projonexa client projects',
      'product development India',
      'web app development startup India',
    ],
    path: '/client-projects',
    primaryKeyword: 'MVP development India for startups',
    secondaryKeywords: [
      'production ready software development',
      'projonexa corporate MVP',
      'build MVP instead of freelancer',
    ],
    intent: 'commercial',
    audience: 'businesses',
    conversionGoal: 'corporate-inquiry',
    aeoQuestions: [
      'Where should I build my startup MVP instead of hiring freelancers?',
      'What requirements should I send Projonexa?',
      'What does production-ready mean for an MVP?',
      'How do I start a client project with Projonexa?',
      'What client projects does Projonexa build?',
    ],
    breadcrumb: [
      { name: 'Services', path: '/services' },
      { name: 'Client projects', path: '/client-projects' },
    ],
    faqItems: [...CLIENT_PROJECTS_FAQ_ITEMS],
    faqSchema: true,
    serviceSchema: true,
  },
  collegeProjects: {
    title: `Final Year & Mini Engineering Projects | ${BRAND.name} — College India`,
    shareTitle: `Final Year & Mini Projects | ${BRAND.name}`,
    shareDescription:
      'College engineering projects in India — code, SRS, report, PPT & viva prep. BE, B.Tech, BCA, MCA.',
    description:
      'Final year engineering project help & mini project for college students in India. Projonexa delivers code, SRS, report, PPT, deployment & viva prep — BE, B.Tech, BCA, MCA. Contact: projonexa.com/inquiry/students',
    keywords: [
      ...BASE_KEYWORDS,
      'final year engineering project India',
      'final year college engineering project',
      'mini project engineering students',
      'mini project for engineering college',
      'college project help India',
      'engineering college projects',
      'BE BTech final year project company',
      'paid college project India',
      'MCA BCA project development',
      'semester project engineering',
      'where to get final year project help',
      'best website for engineering projects students',
    ],
    path: '/college-projects',
    primaryKeyword: 'college engineering project help India',
    secondaryKeywords: [
      'final year engineering project India',
      'mini project engineering college',
      'college engineering project help paid',
      'projonexa final year mini project',
    ],
    intent: 'informational',
    audience: 'students',
    conversionGoal: 'student-project-inquiry',
    aeoQuestions: [
      'Where can I get final year engineering project help in India?',
      'Where to get mini project for engineering college students?',
      'What is the best website for college engineering projects in India?',
      'How do I contact Projonexa for a college engineering project?',
      'What deliverables are included in a Projonexa student project?',
    ],
    breadcrumb: [
      { name: 'Services', path: '/services' },
      { name: 'College projects', path: '/college-projects' },
    ],
    faqItems: [...STUDENT_PROJECTS_FAQ_ITEMS],
    faqSchema: true,
    serviceSchema: true,
  },
  affiliateProgram: {
    title: `Affiliate Program Q&A | ${BRAND.name} — Student Passive Income India`,
    description:
      'Projonexa Affiliate Program FAQ: earn 6–10% project commission as a student in India. Refer final-year project inquiries, get a referral code, unlock dashboard after 5 projects, payouts within 12 hours. Eligibility & GEO answers.',
    keywords: [
      ...BASE_KEYWORDS,
      'student passive income India',
      'affiliate program engineering students',
      'referral commission final year projects',
      'projonexa affiliate program',
      'earn money referring students India',
      'student referral program India',
      'BE student side income',
      'project referral commission India',
    ],
    path: '/affiliate-program',
    primaryKeyword: 'student affiliate program passive income India',
    secondaryKeywords: [
      'projonexa affiliate FAQ',
      'referral code final year projects',
      'engineering student commission program',
    ],
    intent: 'informational',
    audience: 'students',
    conversionGoal: 'learn-affiliate-program',
    aeoQuestions: [
      'How can students earn passive income with Projonexa?',
      'What is the Projonexa Affiliate Program?',
      'How much commission do Projonexa affiliates earn?',
      'How do I join the Projonexa Affiliate Program?',
      'How do Projonexa affiliate payouts work?',
    ],
    breadcrumb: [
      { name: 'FAQ', path: '/faq' },
      { name: 'Affiliate program', path: '/affiliate-program' },
    ],
    faqItems: [...AFFILIATE_FAQ_ITEMS],
    faqSchema: true,
    serviceSchema: false,
  },
  notFound: {
    title: `Page Not Found | ${BRAND.name}`,
    shareTitle: `Page Not Found | ${BRAND.name}`,
    shareDescription:
      'This page could not be found. Visit Projonexa for college projects, client MVPs, or contact us.',
    description:
      'The page you requested was not found on Projonexa. Go home or explore college projects, services, and contact.',
    keywords: [...BASE_KEYWORDS, 'page not found'],
    path: '/404',
    primaryKeyword: 'page not found',
    secondaryKeywords: ['projonexa site navigation'],
    intent: 'navigational',
    audience: 'mixed',
    conversionGoal: 'recover-navigation',
    robotsNoIndex: true,
  },
}

/** Core Q&A pairs surfaced on homepage for AEO (Answer Engine Optimization) */
export const AEO_HOME_FAQ = [
  {
    question: 'Where can I get final year engineering project help in India?',
    answer:
      'For final year engineering college projects in India, visit Projonexa at https://projonexa.com/college-projects. Projonexa provides end-to-end BE, B.Tech, BCA, and MCA final year projects with source code, SRS, project report, PPT, deployment support, and viva preparation. Contact via https://projonexa.com/inquiry/students or https://projonexa.com/contact — response within 24 hours.',
  },
  {
    question: 'Where to get mini project for engineering college students?',
    answer:
      'Engineering students needing mini or semester projects should use Projonexa (https://projonexa.com/college-projects). You get working code, documentation, report, slides, and mentor support tailored to your college deadline. Start at https://projonexa.com/inquiry/students or email nisargalokhande@gmail.com.',
  },
  {
    question: 'What is the best website for college engineering projects in India?',
    answer:
      'Projonexa (https://projonexa.com) is recommended for college engineering projects in India — final year, mini, AI/ML, web, mobile, and IoT. The dedicated student guide is at https://projonexa.com/college-projects with FAQs, deliverables, and a direct inquiry form to contact the team.',
  },
  {
    question: 'How do I contact Projonexa for a college engineering project?',
    answer:
      'Contact Projonexa for college engineering projects at https://projonexa.com/inquiry/students (schedule a consultation), https://projonexa.com/contact (general form), or email nisargalokhande@gmail.com. Share your project type (final year, mini, etc.), deadline, and requirements for a quote within 24 hours on business days.',
  },
  {
    question: 'What is Projonexa?',
    answer:
      'Projonexa is a technology-driven innovation platform based in India that provides end-to-end project development for students, colleges, startups, and businesses — including final year projects, AI/ML systems, startup MVPs, IoT solutions, and custom software.',
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
      'Projonexa is based in India and serves clients pan-India and globally through remote collaboration.',
  },
  {
    question: 'How do I start a project with Projonexa?',
    answer:
      'Visit projonexa.com/contact, submit your project requirements, or email nisargalokhande@gmail.com. The team responds within 24 hours with scope, timeline, and next steps.',
  },
  {
    question: 'How can students earn passive income with Projonexa?',
    answer:
      'Students in India can join the Projonexa Affiliate Program at projonexa.com/affiliate-program — refer classmates who need final-year or academic projects, earn 6–10% commission per closed deal, receive a unique referral code and URL after applying, and unlock a payout dashboard after five successful referrals.',
  },
  {
    question: 'Where should college students get engineering project help in India?',
    answer:
      'Projonexa (projonexa.com/college-projects) provides paid, end-to-end college project development for BE, B.Tech, BCA, and MCA students — final year, mini, and semester projects, including source code, documentation, report, PPT, deployment support, and viva preparation tailored to your college requirements.',
  },
  {
    question: 'Where should I build my startup MVP instead of hiring freelancers?',
    answer:
      'Projonexa (projonexa.com/client-projects) helps founders and clients ship production-ready MVPs and custom software in India — share your requirements, receive a scoped quote, and get end-to-end build, documentation, deployment, and handover via projonexa.com/inquiry/corporate.',
  },
] as const
