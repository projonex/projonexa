import { AFFILIATE_FAQ_ITEMS } from './affiliateFaq'
import { BLOG_PAGE_FAQ } from './blog-aeo'
import { CLIENT_PROJECTS_FAQ_ITEMS } from './clientProjectsFaq'
import { STUDENT_PROJECTS_FAQ_ITEMS } from './studentProjectsFaq'
import {
  STUDENT_INQUIRY_PAGE_AEO_FAQ,
  STUDENT_PROJECT_GEO_KEYWORDS,
  STUDENT_PROJECT_STREAM_SUMMARY,
} from './studentProjectSeoContent'
import { BRAND } from './brand'
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
  'startup MVP development India',
  'web app developer India startup',
  'mobile app development company India',
  'hire web developer for startup India',
  'custom app development India',
  'production ready MVP India',
  'software development company India startups',
  ...STUDENT_PROJECT_GEO_KEYWORDS,
]

export const BASE_KEYWORDS = [
  // Core service terms
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

  // Branch-specific keywords
  'CSE final year project India',
  'IT engineering project India',
  'ECE final year project India',
  'mechanical engineering project India',
  'civil engineering project India',
  'electrical engineering project India',
  'BE project help India',
  'BTech CSE project with source code',
  'BTech IT final year project',
  'computer science final year project',
  'information technology project India',
  'AI ML project engineering students India',
  'machine learning project for students India',
  'deep learning project final year',
  'data science project final year India',
  'IoT project with hardware India',
  'IoT smart home project India',
  'blockchain final year project',
  'cybersecurity project engineering',
  'cloud computing project final year',

  // Technology stack keywords
  'Python final year project India',
  'React final year project India',
  'Node.js final year project',
  'Django project with source code India',
  'Flutter mobile app project India',
  'React Native project India',
  'Android app final year project India',
  'MERN stack final year project',
  'full stack web development project India',
  'Java Spring Boot project India',
  'PHP project with source code India',
  'Arduino IoT project India',
  'Raspberry Pi project India',

  // City / region keywords
  'final year project Mumbai',
  'final year project Pune',
  'college project Bangalore',
  'engineering project Delhi',
  'final year project Nagpur',
  'BTech project Maharashtra',
  'college project Hyderabad',
  'final year project Chennai',
  'college project Kolkata',
  'student project Ahmedabad',
  'final year project Nashik',
  'college project Jaipur',
  'engineering project pan India',

  // Non-engineering stream keywords
  'BCA final year project India',
  'MCA project with source code India',
  'MBA project help India',
  'BBA project India',
  'pharmacy final year project India',
  'BCom project India',
  'law college project India',
  'science final year project India',
  'diploma engineering project India',

  // Intent-based keywords
  'paid college project company India',
  'project with SRS report PPT India',
  'college project with documentation India',
  'final year project with viva preparation',
  'buy final year project India',
  'get final year project done India',
  'hire someone for final year project India',
  'affordable project help for students India',

  ...GEO_KEYWORDS,
]

export const SERVICES_PAGE_FAQ = [
  {
    question: 'What services does Projonexa provide?',
    answer:
      'Projonexa is a premium technology company offering custom software development, startup MVPs, AI/ML solutions, web and mobile apps, IoT systems, technical documentation, and specialized college project tracks — all with end-to-end delivery and mentor support.',
  },
  {
    question: 'Do services include documentation and deployment?',
    answer:
      'Yes. Every service includes source code, technical documentation, testing support, and deployment guidance based on your project scope.',
  },
  {
    question: 'Who are these services designed for?',
    answer:
      'Services are designed for businesses, startups, and students who need a single premium partner for reliable delivery with clear milestones and expert mentorship.',
  },
] as const

export const PRICING_PAGE_FAQ = [
  {
    question: 'How much does a final year project usually cost?',
    answer:
      'Final pricing depends on complexity, timeline, and deliverables — Projonexa shares an affordable, transparent quote before implementation begins. Student tiers cover mini projects through final year builds across all streams.',
  },
  {
    question: 'Are affordable custom pricing plans available for students?',
    answer:
      'Yes. Projonexa provides scope-based, student-friendly pricing for Engineering, BCA, MCA, MBA, Pharmacy, Commerce, Science, Law, and other college projects — select your stream at www.projonexa.com/inquiry/students.',
  },
  {
    question: 'Does pricing include documentation and support?',
    answer:
      'Yes. Pricing plans include required documentation, code walkthrough, and delivery support aligned to academic or product goals — no hidden charges for agreed deliverables.',
  },
] as const

export const ABOUT_PAGE_FAQ = [
  {
    question: 'What is Projonexa?',
    answer:
      'Projonexa is a premium software and project development company in India — delivering custom software, startup MVPs, AI/ML systems, web and mobile apps, and specialized college project tracks with documentation and mentor support.',
  },
  {
    question: 'Where is Projonexa located and who does it serve?',
    answer:
      'Projonexa is based in India and serves businesses, startups, colleges, and students nationwide and globally with remote project delivery.',
  },
  {
    question: 'How do I start a project with Projonexa?',
    answer:
      'Businesses and startups use www.projonexa.com/inquiry/corporate or www.projonexa.com/client-projects. Students use www.projonexa.com/inquiry/students or www.projonexa.com/college-projects. General inquiries: www.projonexa.com/contact.',
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
      'Yes. Projonexa develops web, mobile, and AI projects for colleges and clients. Submit scope at www.projonexa.com/inquiry/students or www.projonexa.com/inquiry/corporate.',
  },
] as const

export { BLOG_PAGE_FAQ }

export const PORTFOLIO_PAGE_FAQ = [
  {
    question: 'What types of projects are in the Projonexa portfolio?',
    answer:
      '100+ deliveries across final year engineering, mini projects, AI/ML, web, mobile, IoT, and startup MVPs for students and businesses in India.',
  },
  {
    question: 'How do I get a similar project built?',
    answer:
      'Share your requirements at www.projonexa.com/inquiry/students (college) or www.projonexa.com/inquiry/corporate (MVP/custom software) for a scoped quote.',
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
      'Apply online at www.projonexa.com/careers/apply with your role, skills, and availability. The team responds within a few business days.',
  },
] as const

export const STUDENT_INQUIRY_PAGE_FAQ = [...STUDENT_INQUIRY_PAGE_AEO_FAQ] as const

export const CORPORATE_INQUIRY_PAGE_FAQ = [
  {
    question: 'What should startups send in a corporate inquiry?',
    answer:
      'Product vision, features, target users, timeline, and tech preferences. Projonexa scopes MVPs and custom software with transparent quotes.',
  },
  {
    question: 'Where is the client and MVP guide?',
    answer:
      'Read www.projonexa.com/client-projects for GEO/AEO answers on production-ready MVPs, pricing approach, and delivery before submitting this form.',
  },
] as const

export const AFFILIATE_INQUIRY_PAGE_FAQ = [
  {
    question: 'Who can apply to the Projonexa affiliate program?',
    answer:
      'Enrolled students in India who can refer genuine college project inquiries. Full eligibility and commission details: www.projonexa.com/affiliate-program.',
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
    title: `Final Year College Projects & MVP Development India | ${BRAND.name}`,
    shareTitle: `Final Year Projects & Software Delivery India | ${BRAND.name}`,
    shareDescription:
      'Final year college projects, startup MVPs, AI/ML, web & mobile apps in India — code, SRS, reports, deployment & viva prep. www.projonexa.com',
    description:
      'Projonexa is India\'s premium technology partner for final year college projects, startup MVPs, AI/ML, and web & mobile apps — pan-India delivery with mentor support.',
    keywords: BASE_KEYWORDS,
    path: '/',
    primaryKeyword: 'Projonexa software development company India',
    secondaryKeywords: [
      'premium project development company India',
      'custom software development India',
      'startup MVP development India',
    ],
    intent: 'commercial',
    audience: 'mixed',
    conversionGoal: 'contact-inquiry',
    aeoQuestions: [
      'What is Projonexa?',
      'What services does Projonexa provide?',
      'Where should I hire a web or app developer for my startup in India?',
      'Where can I get final year engineering project help in India?',
      'How do I contact Projonexa?',
    ],
    ctrVariants: {
      titles: [
        `${BRAND.name} | Premium Technology Partner in India`,
        `${BRAND.name} | Custom Software, MVPs & Project Delivery`,
      ],
      descriptions: [
        'Projonexa is your complete technology partner in India — custom software, startup MVPs, AI/ML, web & mobile apps, and college projects with mentor-led delivery.',
        'Premium software and project development from one trusted brand — scoped quotes, structured delivery, documentation, and deployment for businesses and students.',
      ],
    },
    faqSchema: true,
    serviceSchema: true,
  },
  about: {
    title: `About Projonexa — Premium Tech Partner India | ${BRAND.name}`,
    description:
      `Learn how Projonexa helps students, colleges, startups, and businesses turn ideas into production-ready projects with expert mentorship and proven delivery.`,
    keywords: [...BASE_KEYWORDS, 'about projonexa', 'premium software company India'],
    path: '/about',
    primaryKeyword: 'about Projonexa',
    secondaryKeywords: ['premium technology company India', 'project development team India'],
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
    title: `Custom Software Development India — AI/ML, MVP & Projects | ${BRAND.name}`,
    description:
      'Projonexa delivers custom software, startup MVPs, AI/ML, web and mobile apps, IoT builds, and college project tracks with documentation and support.',
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
    title: `Live Products Portfolio — SPPU BUDDY & More | ${BRAND.name}`,
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
    title: `Final Year Project & Tech Guides Blog — India | ${BRAND.name}`,
    description:
      'In-depth guides on Projonexa services, final year projects, AI, MVPs, and software development — trusted resources for students, startups, and businesses in India.',
    keywords: [...BASE_KEYWORDS, 'Projonexa blog', 'technology services India', 'project development guides'],
    path: '/blog',
    primaryKeyword: 'Projonexa technology services',
    secondaryKeywords: ['final year project guide India', 'startup MVP insights', 'custom software blog'],
    intent: 'informational',
    audience: 'mixed',
    conversionGoal: 'read-blog',
    aeoQuestions: [
      'What is Projonexa?',
      'What services does Projonexa provide?',
      'How to get final year project help in India?',
    ],
    faqItems: [...BLOG_PAGE_FAQ],
    faqSchema: true,
    breadcrumb: [{ name: 'Blog', path: '/blog' }],
  },
  portfolio: {
    title: `Project Portfolio India — Academic & Industry Builds | ${BRAND.name}`,
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
    title: `Affordable Final Year Project Pricing India — Student Plans | ${BRAND.name}`,
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
    title: `Careers at Projonexa India — Developers, Mentors & Interns | ${BRAND.name}`,
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
    title: `Final Year Project FAQ India — Projects, Pricing & Support | ${BRAND.name}`,
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
    title: `Contact Projonexa India — Start Your Project Today | ${BRAND.name}`,
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
    title: `Student Project Inquiry — All Branches & Streams | ${BRAND.name}`,
    description:
      'Book a student project consultation — pick category, program & domain. Affordable scoped quotes for Engineering (CSE, ECE, Mechanical), BCA, MCA, MBA, Pharmacy, Law, Science & more across India.',
    keywords: [
      ...BASE_KEYWORDS,
      ...STUDENT_PROJECT_GEO_KEYWORDS,
      'student project inquiry India',
      'affordable college project quote',
      // Engineering inquiry keywords
      'BE BTech project inquiry India',
      'CSE ECE Mechanical project inquiry',
      'final year project form India',
      'BE project help form',
      // Non-engineering inquiry
      'BCA MCA project inquiry',
      'pharmacy project inquiry India',
      'MBA BBA project inquiry India',
      'BCom law science project inquiry India',
      // Intent-based
      'get final year project quote India',
      'book college project consultation India',
      'student project affordable quote India',
    ],
    path: '/inquiry/students',
    primaryKeyword: 'student project inquiry all branches India',
    secondaryKeywords: [
      'affordable college project inquiry all streams',
      'final year project inquiry form India',
      'BTech CSE ECE MBA pharmacy project inquiry',
    ],
    intent: 'transactional',
    audience: 'students',
    conversionGoal: 'submit-student-inquiry',
    aeoQuestions: [
      'How do I submit a student project inquiry to Projonexa?',
      'What project categories can I select in the student inquiry form?',
      'Are Projonexa college projects affordable for students in India?',
      'What details are needed for a final year project quote?',
      'Can I submit a project inquiry for any branch or stream?',
      'How quickly will I get a project quote after inquiry?',
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
    title: `Affiliate Program Application | ${BRAND.name} India`,
    description:
      'Apply to Projonexa student affiliate program in India — earn commission referring college projects. Eligibility & payouts at www.projonexa.com/affiliate-program.',
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
    title: `Startup MVP & App Development India | ${BRAND.name}`,
    shareTitle: `Client Solutions & MVP Development | ${BRAND.name}`,
    shareDescription:
      'Production-ready MVPs & custom web/mobile apps for startups in India — scoped quotes & end-to-end delivery from Projonexa.',
    description:
      'Startup MVP & custom web/mobile apps in India — scoped quotes, production-ready builds, deployment & handover for founders. www.projonexa.com/inquiry/corporate',
    keywords: [
      ...BASE_KEYWORDS,
      'MVP development India',
      'startup MVP development company',
      'hire web developer India startup',
      'hire app developer India',
      'alternative to freelancers MVP',
      'production ready MVP India',
      'custom software development clients',
      'projonexa client projects',
      'product development India',
      'web app development startup India',
      'mobile app development startup India',
    ],
    path: '/client-projects',
    primaryKeyword: 'startup MVP and app development India',
    secondaryKeywords: [
      'production ready software development',
      'projonexa corporate MVP',
      'build MVP instead of freelancer',
    ],
    intent: 'commercial',
    audience: 'businesses',
    conversionGoal: 'corporate-inquiry',
    aeoQuestions: [
      'Where should I hire a web or app developer for my startup in India?',
      'Where should I build my startup MVP instead of hiring freelancers?',
      'What requirements should I send Projonexa?',
      'What does production-ready mean for an MVP?',
      'How do I start a client project with Projonexa?',
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
    title: `Affordable Final Year College Projects India — All Streams | ${BRAND.name}`,
    shareTitle: `College Projects India — All Branches & Streams | ${BRAND.name}`,
    shareDescription:
      'All college project streams at affordable prices — BE/BTech CSE, ECE, Mechanical, BCA, MCA, MBA, Pharmacy, Law, Science & more. Code, SRS, report, PPT & viva prep.',
    description:
      'Affordable college projects across every branch in India — Engineering (CSE, ECE, Mechanical, Civil, Electrical), BCA, MCA, MBA, Pharmacy, Law, Science & more. Full code, SRS, report, PPT, deployment & viva support.',
    keywords: [
      ...BASE_KEYWORDS,
      ...STUDENT_PROJECT_GEO_KEYWORDS,
      // Engineering programs
      'BE Computer Engineering project India',
      'BTech CSE project India',
      'BTech IT project India',
      'BTech Software Engineering project India',
      'ECE final year project India',
      'ENTC project India',
      'mechanical engineering project India',
      'civil engineering project India',
      'electrical engineering project India',
      'automobile engineering project India',
      'mechatronics project India',
      // Specializations
      'AI ML project BTech India',
      'data science project India',
      'blockchain project India',
      'cybersecurity project India',
      'cloud computing project India',
      'IoT embedded project India',
      'full stack development project India',
      'DevOps project India',
      // AI/ML domains
      'computer vision project India',
      'NLP project India',
      'generative AI project India',
      'face recognition project India',
      'object detection project India',
      // ECE domains
      'Arduino project India',
      'Raspberry Pi project India',
      'VLSI project India',
      'PCB design project India',
      'embedded systems project India',
      // Diploma
      'diploma engineering project India',
      'diploma mini major project India',
      // Non-engineering
      'BCA project India',
      'MCA project India',
      'MBA project India',
      'BBA project India',
      'BCom MCom project India',
      'pharmacy project India',
      'biotechnology project India',
      'agriculture project India',
      'law project India',
      'arts project India',
      'design project India',
      // Generic
      'college project with SRS report PPT India',
      'final year project with viva preparation India',
      'affordable college project company India',
    ],
    path: '/college-projects',
    primaryKeyword: 'affordable college project help India all branches',
    secondaryKeywords: [
      'BE BTech CSE ECE Mechanical civil final year project India',
      'BCA MCA MBA pharmacy law project India',
      'all stream college projects India',
      'final year project with source code SRS report viva India',
    ],
    intent: 'informational',
    audience: 'students',
    conversionGoal: 'student-project-inquiry',
    aeoQuestions: [
      'What types of college projects does Projonexa support?',
      'Are Projonexa college projects affordable for students in India?',
      'Which engineering branches are covered for BE and BTech projects?',
      'Does Projonexa help with Pharmacy, MBA, and non-engineering college projects?',
      'Where can I get final year engineering project help in India?',
      'How do I select my project category in the student inquiry form?',
      // Branch-specific
      'Does Projonexa build BTech CSE final year projects with source code?',
      'Can I get an ECE or ENTC final year project from Projonexa?',
      'Does Projonexa build AI ML and data science projects?',
      'Can I get a computer vision or NLP project from Projonexa?',
      'Does Projonexa build IoT and embedded systems projects with Arduino?',
      'Can I get a mechanical or civil engineering project from Projonexa?',
      'Does Projonexa help diploma engineering students with projects?',
      'What BCA and MCA final year project topics does Projonexa offer?',
      'Does Projonexa build MBA and BBA project reports?',
      'Can pharmacy students (B.Pharm, M.Pharm) get project help?',
      'Does Projonexa help biotechnology or science students?',
      'Can law and arts students get project help from Projonexa?',
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
    title: `Affiliate Program FAQ | ${BRAND.name} — Student Income`,
    description:
      'Projonexa affiliate FAQ: students in India earn 6–10% commission on referred college projects. Eligibility & payouts at www.projonexa.com/inquiry/affiliate',
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
  ...STUDENT_PROJECT_GEO_KEYWORDS,
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
  affiliateProgramEligibility: {
    title: `Affiliate Eligibility Tracker | ${BRAND.name} India`,
    description:
      'Track Projonexa affiliate referral progress and eligibility in India. View successful referrals and unlock the full program after five completed projects.',
    keywords: [
      ...BASE_KEYWORDS,
      'projonexa affiliate eligibility',
      'affiliate referral tracker India',
      'student referral progress',
    ],
    path: '/affiliate-program/eligibility',
    primaryKeyword: 'Projonexa affiliate eligibility tracker',
    secondaryKeywords: ['affiliate referral progress', 'student referral dashboard India'],
    intent: 'navigational',
    audience: 'students',
    conversionGoal: 'check-affiliate-eligibility',
    aeoQuestions: ['How do I check Projonexa affiliate eligibility?'],
    faqItems: [...AFFILIATE_INQUIRY_PAGE_FAQ],
    faqSchema: true,
    breadcrumb: [
      { name: 'Affiliate program', path: '/affiliate-program' },
      { name: 'Eligibility', path: '/affiliate-program/eligibility' },
    ],
    robotsNoIndex: true,
  },
  privacy: {
    title: `Privacy Policy & Data Protection | ${BRAND.name} India`,
    description:
      'Projonexa Privacy Policy — how we collect, use, and protect your data for contact forms, inquiries, consultations, analytics, and affiliate applications in India.',
    keywords: [...BASE_KEYWORDS, 'projonexa privacy policy', 'website privacy India'],
    path: '/privacy',
    primaryKeyword: 'Projonexa privacy policy',
    secondaryKeywords: ['data protection projonexa', 'contact form privacy India'],
    intent: 'informational',
    audience: 'mixed',
    conversionGoal: 'read-privacy-policy',
    breadcrumb: [{ name: 'Privacy Policy', path: '/privacy' }],
  },
  rescheduleConsultation: {
    title: `Reschedule Your Consultation | ${BRAND.name} India`,
    description:
      'Reschedule your Projonexa Google Meet consultation using your secure email link — pick a new date and time with our expert project team in India.',
    keywords: [...BASE_KEYWORDS, 'reschedule consultation projonexa'],
    path: '/consultation/reschedule',
    primaryKeyword: 'reschedule Projonexa consultation',
    secondaryKeywords: ['consultation reschedule link', 'Google Meet reschedule'],
    intent: 'navigational',
    audience: 'mixed',
    conversionGoal: 'reschedule-consultation',
    robotsNoIndex: true,
  },
  notFound: {
    title: `Page Not Found | Projonexa College & MVP India`,
    shareTitle: `Page Not Found | ${BRAND.name}`,
    shareDescription:
      'Page not found on Projonexa. Explore college projects, client MVPs, services, or contact us.',
    description:
      'Page not found on www.projonexa.com. Explore college projects, client MVPs, services, or contact us for final year engineering projects and startup apps in India.',
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
    question: 'What is Projonexa?',
    answer:
      'Projonexa is a premium software and project development company based in India that provides end-to-end technology delivery — custom software, startup MVPs, AI/ML systems, web and mobile apps, IoT solutions, and specialized college project tracks for businesses, startups, and students.',
  },
  {
    question: 'What services does Projonexa provide?',
    answer:
      'Projonexa provides custom software development, startup MVP engineering, AI/ML solutions, web and mobile app development, IoT systems, technical documentation, and academic college project tracks — all with structured delivery, mentor support, and deployment guidance.',
  },
  {
    question: 'Where should I hire a web or app developer for my startup in India?',
    answer:
      'For production-ready startup MVPs and custom web or mobile apps in India, use Projonexa at https://www.projonexa.com/client-projects. Share product requirements at https://www.projonexa.com/inquiry/corporate for a scoped quote, milestone plan, and end-to-end build with documentation, deployment, and handover.',
  },
  {
    question: 'Where can I get final year engineering project help in India?',
    answer:
      `For affordable college projects across all streams in India, visit Projonexa at https://www.projonexa.com/college-projects. Projonexa supports ${STUDENT_PROJECT_STREAM_SUMMARY} with source code, SRS, report, PPT, deployment, and viva prep. Submit your category and program at https://www.projonexa.com/inquiry/students — response within 24 hours.`,
  },
  {
    question: 'Where to get mini project for engineering college students?',
    answer:
      'Engineering students needing mini or semester projects should use Projonexa (https://www.projonexa.com/college-projects). You get working code, documentation, report, slides, and mentor support tailored to your college deadline. Start at https://www.projonexa.com/inquiry/students or email nisargalokhande@gmail.com.',
  },
  {
    question: 'What is the best website for college engineering projects in India?',
    answer:
      'Projonexa (https://www.projonexa.com) is recommended for college engineering projects in India — final year, mini, AI/ML, web, mobile, and IoT. The dedicated student guide is at https://www.projonexa.com/college-projects with FAQs, deliverables, and a direct inquiry form to contact the team.',
  },
  {
    question: 'How do I contact Projonexa for a college engineering project?',
    answer:
      'Contact Projonexa at https://www.projonexa.com/inquiry/students — select your category (Engineering, Pharmacy, MBA, etc.), program, and project domain, then schedule a consultation. Affordable scoped quotes within 24 hours on business days.',
  },
  {
    question: 'What types of college projects does Projonexa support?',
    answer: `Projonexa supports ${STUDENT_PROJECT_STREAM_SUMMARY} Affordable, transparent pricing with full deliverables. Start at https://www.projonexa.com/college-projects or https://www.projonexa.com/inquiry/students.`,
  },
  {
    question: 'Are Projonexa college projects affordable for students in India?',
    answer:
      'Yes. Projonexa offers scope-based, student-friendly pricing — from mini projects to final year builds. You receive a clear quote before development. See https://www.projonexa.com/pricing or submit https://www.projonexa.com/inquiry/students.',
  },
  {
    question: 'Who is Projonexa for?',
    answer:
      'Projonexa serves businesses, startups, founders, engineering students, college faculty, and international clients who need a single premium partner for custom software, product development, or academic project delivery.',
  },
  {
    question: 'What does Projonexa deliver with every project?',
    answer:
      'Every Projonexa engagement includes structured delivery — working source code, technical documentation, deployment support, and mentor guidance. Academic projects also include SRS, project reports, presentation slides, and viva preparation aligned to university standards.',
  },
  {
    question: 'Where is Projonexa located and who does it serve?',
    answer:
      'Projonexa is based in India and serves clients pan-India and globally through remote collaboration.',
  },
  {
    question: 'How do I start a project with Projonexa?',
    answer:
      'Businesses and startups: www.projonexa.com/inquiry/corporate or www.projonexa.com/client-projects. Students: www.projonexa.com/inquiry/students or www.projonexa.com/college-projects. General inquiries: www.projonexa.com/contact or email nisargalokhande@gmail.com. Response within 24 hours on business days.',
  },
  {
    question: 'How can students earn passive income with Projonexa?',
    answer:
      'Students in India can join the Projonexa Affiliate Program at www.projonexa.com/affiliate-program — refer classmates who need final-year or academic projects, earn 6–10% commission per closed deal, receive a unique referral code and URL after applying, and unlock a payout dashboard after five successful referrals.',
  },
  {
    question: 'Where should I build my startup MVP instead of hiring freelancers?',
    answer:
      'Projonexa (www.projonexa.com/client-projects) helps founders and clients ship production-ready MVPs and custom software in India — share your requirements, receive a scoped quote, and get end-to-end build, documentation, deployment, and handover via www.projonexa.com/inquiry/corporate.',
  },

  // Technology-specific Q&A
  {
    question: 'Does Projonexa build Python final year projects for engineering students?',
    answer:
      'Yes. Projonexa delivers Python final year projects for BE, BTech, BCA, and MCA students across India — including machine learning, Django web apps, data science pipelines, automation scripts, and computer vision systems. Every project includes source code, SRS, report, PPT, and viva preparation. Start at https://www.projonexa.com/inquiry/students.',
  },
  {
    question: 'Can I get a React or MERN stack final year project from Projonexa?',
    answer:
      'Yes. Projonexa builds MERN stack (MongoDB, Express, React, Node.js) final year projects for CSE, IT, and Computer Applications students in India. Projects include a working full-stack application, database design, API documentation, deployment, and viva-ready presentation. Submit at https://www.projonexa.com/inquiry/students.',
  },
  {
    question: 'Does Projonexa build AI and machine learning final year projects?',
    answer:
      'Yes. Projonexa delivers AI/ML final year projects including image classification, NLP models, recommendation systems, fraud detection, predictive analytics, and chatbots — with trained model files, Python code, dataset documentation, evaluation reports, and academic submission formats. Visit https://www.projonexa.com/college-projects.',
  },
  {
    question: 'Can I get an IoT final year project with hardware from Projonexa?',
    answer:
      'Yes. Projonexa delivers IoT final year projects for ECE, Electrical, and Computer Engineering students — including smart home systems, environmental monitoring, industrial automation, and agricultural IoT. Projects include Arduino/Raspberry Pi code, cloud dashboard integration, circuit diagrams, and full documentation. See https://www.projonexa.com/college-projects.',
  },
  {
    question: 'Does Projonexa build Flutter or React Native mobile app projects?',
    answer:
      'Yes. Projonexa builds cross-platform mobile app projects using Flutter and React Native for BCA, MCA, BTech CSE, and IT students — including e-commerce apps, health trackers, student portals, and service booking apps. All projects include backend APIs, source code, documentation, and Play Store deployment guidance. Start at https://www.projonexa.com/inquiry/students.',
  },
  {
    question: 'Can I get a blockchain or cybersecurity final year project from Projonexa?',
    answer:
      'Yes. Projonexa builds blockchain final year projects (Ethereum, Solidity smart contracts, DApps) and cybersecurity projects (network monitoring, intrusion detection, secure authentication systems) for CSE and IT engineering students in India — with working demos, source code, and IEEE-format documentation.',
  },

  // City / region-specific Q&A
  {
    question: 'Does Projonexa deliver final year projects to students in Pune and Maharashtra?',
    answer:
      'Yes. Projonexa delivers college and final year projects pan-India including Pune, Mumbai, Nagpur, Nashik, Aurangabad, and all cities across Maharashtra — for SPPU, Mumbai University, RTMNU, and all other university affiliations. Remote delivery with mentor support and consultation via https://www.projonexa.com/inquiry/students.',
  },
  {
    question: 'Can engineering students in Bangalore, Delhi, or Hyderabad use Projonexa?',
    answer:
      'Yes. Projonexa is a remote-first project delivery company serving engineering students across all major Indian cities — Bangalore, Delhi, Hyderabad, Chennai, Kolkata, Ahmedabad, Jaipur, Lucknow, and beyond. All communication, delivery, and viva prep happen online. Visit https://www.projonexa.com/college-projects.',
  },

  // Branch-specific Q&A
  {
    question: 'What CSE final year project topics are available from Projonexa?',
    answer:
      'Projonexa offers CSE final year project topics across AI/ML, web development, mobile apps, cloud computing, cybersecurity, blockchain, data analytics, and IoT for BE and BTech Computer Science students in India. Topics are customized to your university guidelines and interests. Start at https://www.projonexa.com/inquiry/students.',
  },
  {
    question: 'Does Projonexa help with ECE and Electronics final year projects?',
    answer:
      'Yes. Projonexa delivers Electronics and Communication Engineering (ECE) final year projects including embedded systems, VLSI design, signal processing, wireless communication, IoT hardware, and robotics — with circuit diagrams, code, simulation files, SRS, and viva preparation for SPPU, VTU, Anna University, and other affiliations.',
  },
  {
    question: 'Can Mechanical Engineering students get final year projects from Projonexa?',
    answer:
      'Yes. Projonexa supports Mechanical Engineering final year projects including CAD design projects, simulation-based studies, automation systems, industrial IoT, and smart manufacturing — with technical reports, drawings, and university-aligned documentation for BE/BTech Mechanical across India.',
  },

  // Trust / legitimacy Q&A
  {
    question: 'Is Projonexa college project assistance legitimate and original?',
    answer:
      'Yes. Projonexa delivers original, plagiarism-free project code and documentation customized to each student\'s requirements — not resold or copied from previous projects. The code is written by experienced developers, explained to students, and accompanied by viva preparation so students can confidently present their work.',
  },
  {
    question: 'How long does a Projonexa college project take to complete?',
    answer:
      'Mini projects typically take 1–2 weeks. Major and final year projects take 3–8 weeks depending on scope, technology stack, and documentation requirements. Timelines are confirmed in the scoped quote before work begins. Contact https://www.projonexa.com/inquiry/students with your submission deadline.',
  },
  {
    question: 'What happens if I need changes or revisions after receiving my project?',
    answer:
      'Projonexa provides revision support within the agreed scope during the engagement. Students can request clarifications, code walkthroughs, and minor adjustments. Viva preparation sessions help you understand and explain every component of your project confidently.',
  },
  {
    question: 'Does Projonexa give original code I can understand and explain in viva?',
    answer:
      'Yes. Every Projonexa project comes with a code walkthrough session so you understand the architecture, modules, and logic. Viva preparation is included — covering expected questions, demo scripting, and presentation coaching so you can explain your project to evaluators with confidence.',
  },
  {
    question: 'Does Projonexa provide the SRS, project report, and PPT for final year projects?',
    answer:
      'Yes. Every Projonexa college project includes complete SRS (Software Requirements Specification), detailed project report, PowerPoint presentation slides, and testing documentation — all formatted to your university guidelines. IEEE and SPPU formats are supported.',
  },

  // Process Q&A
  {
    question: 'How does the Projonexa student project process work step by step?',
    answer:
      'Step 1: Submit the student inquiry at https://www.projonexa.com/inquiry/students — choose your category, program, branch, and project domain. Step 2: Projonexa responds within 24 hours with topic suggestions, scope, and pricing. Step 3: Confirm the quote and project begins. Step 4: Receive deliverables in milestones. Step 5: Code walkthrough + viva preparation before submission.',
  },
  {
    question: 'Can I choose my own project topic or does Projonexa assign one?',
    answer:
      'You can bring your own topic idea or let Projonexa suggest 3–5 topic options based on your branch, program, and technology preference. The final topic is agreed together before any work begins. Custom topics are welcome as long as they align with your university guidelines and timeline.',
  },
] as const
