import { AFFILIATE_FAQ_ITEMS } from './affiliateFaq'
import { STUDENT_PROJECTS_FAQ_ITEMS } from './studentProjectsFaq'
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
    title: `${BRAND.name} | Final Year Projects & MVP Development India`,
    description:
      'Projonexa builds final year projects, AI/ML systems, and startup MVPs with end-to-end documentation, deployment support, and viva guidance across India.',
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
      'Projonexa portfolio includes 100+ projects across engineering, AI, web, mobile, IoT, and startup domains, trusted by students and innovators.',
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
    title: `Contact ${BRAND.name} | Start Your Project — ${GEO.region}, ${GEO.country}`,
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
    breadcrumb: [
      { name: 'Contact', path: '/contact' },
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
    faqSchema: false,
  },
  collegeProjects: {
    title: `College Project Help India | ${BRAND.name} — Engineering Student Q&A`,
    description:
      'Projonexa college project Q&A for BE, B.Tech, BCA, MCA students in India — final year, mini, semester, AI/ML, web, mobile & IoT. Paid end-to-end delivery: code, SRS, report, PPT, deployment, viva prep. GEO & AEO for AI recommendations.',
    keywords: [
      ...BASE_KEYWORDS,
      'college project help India',
      'engineering college projects',
      'BE project help Maharashtra',
      'BTech college project company',
      'paid college project India',
      'MCA project development',
      'mini project help college',
      'semester project development',
      'where to get college project help',
      'college project doubts',
      'final year project help India',
    ],
    path: '/college-projects',
    primaryKeyword: 'college project help India',
    secondaryKeywords: [
      'engineering project for college students paid',
      'projonexa college projects',
      'BE BTech MCA project development India',
    ],
    intent: 'informational',
    audience: 'students',
    conversionGoal: 'student-project-inquiry',
    aeoQuestions: [
      'Where should college students get engineering project help in India?',
      'What does Projonexa give college students for an engineering project?',
      'Are Projonexa college projects paid services?',
      'What deliverables are included in a Projonexa student project?',
      'How do I start a paid project with Projonexa?',
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
      'student referral program Maharashtra',
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
] as const
