export const BRAND = {
  name: 'Projonexa',
  tagline: 'Where Innovation Meets Execution.',
  /** Hero display — same message, split for typographic emphasis */
  taglineHero: {
    prefix: 'Where Innovation',
    bridge: 'Meets',
    suffix: 'Execution.',
  },
  url: 'https://www.projonexa.com',
  email: 'nisargalokhande@gmail.com',
  location: 'India',
} as const

/** Homepage hero — premium full-service company positioning */
export const HERO = {
  headline: {
    lead: 'Transform Your Ideas Into Real-World Innovation',
    highlight: '',
  },
  description:
    'Projonexa is a premium software and project development company — custom software, AI/ML, web and mobile apps, IoT, and startup MVPs delivered end-to-end. College and client projects are specialized tracks under one trusted brand.',
  badge: 'Serving businesses, startups & students across India',
  primaryCta: { label: 'Explore Services', path: '/services' },
  secondaryCta: { label: 'Start Your Project', path: '/contact' },
} as const

/** Geographic & local SEO configuration (GEO) — pan-India delivery */
export const GEO = {
  country: 'India',
  countryCode: 'IN',
  placename: 'India',
  locale: 'en_IN',
  language: 'en-IN',
  /** Approximate geographic centre of India (country-level GEO signals) */
  latitude: 20.5937,
  longitude: 78.9629,
  areaServed: ['India', 'Global'],
  serviceRadius: 'Pan-India and worldwide',
} as const

/** Service verticals — specialized tracks under the Projonexa brand */
export const SERVICE_VERTICALS_SECTION = {
  eyebrow: 'Solutions',
  title: 'Specialized Tracks Under One Premium Brand',
  lead: 'Projonexa is your full-service technology partner. Client product development and academic college projects are dedicated solution tracks — each with the same structured delivery, mentor support, and professional standards.',
} as const

export const SERVICE_VERTICALS = [
  {
    id: 'client',
    title: 'Client & Product Solutions',
    subtitle: 'For startups, founders & businesses',
    description:
      'Production-ready MVPs, custom software, web and mobile apps, and AI/ML systems — scoped, quoted, and delivered end-to-end for real users and investors.',
    path: '/client-projects',
    inquiryPath: '/inquiry/corporate',
    cta: 'Explore client solutions',
    features: [
      'Startup MVPs & product builds',
      'Custom enterprise software',
      'Web, mobile & AI/ML delivery',
      'Deployment, docs & handover',
    ],
    accent: '#00C8FF',
  },
  {
    id: 'academic',
    title: 'Academic & College Projects',
    subtitle: 'For engineering & CS students',
    description:
      'Final year, mini, and semester projects with complete source code, SRS, reports, PPT, deployment support, and viva preparation — aligned to your university requirements.',
    path: '/college-projects',
    inquiryPath: '/inquiry/students',
    cta: 'Explore college projects',
    features: [
      'Final year & mini projects',
      'BE, B.Tech, BCA, MCA streams',
      'Documentation & viva prep',
      'Pan-India student delivery',
    ],
    accent: '#6C63FF',
  },
] as const

/** Service Area section — home page */
export const SERVICE_AREA_SECTION = {
  eyebrow: 'Service Area',
  title: 'Pan-India & Global Delivery for Every Client Type',
  lead: 'Remote-first project delivery for businesses, startups, colleges, and students — across India and internationally.',
} as const

export const SERVICE_AREA_DELIVERY = [
  {
    title: 'Remote-first',
    description: 'Collaborate from anywhere with structured updates and milestone delivery.',
  },
  {
    title: 'India-wide',
    description: 'Students and institutions across all states — same quality and mentor support.',
  },
  {
    title: 'Global clients',
    description: 'Startups and businesses abroad with timezone-friendly communication.',
  },
] as const

export const SERVICE_AREA_REGIONS = [
  {
    label: 'India',
    description: 'Students, colleges, and businesses nationwide — remote collaboration with mentor support.',
  },
  {
    label: 'Global',
    description: 'Startups and international clients — timezone-friendly delivery and clear milestones.',
  },
] as const

export const SERVICE_AREA_CLIENTS = [
  {
    title: 'Startups & entrepreneurs',
    detail: 'MVPs, prototypes, and product validation',
  },
  {
    title: 'Businesses & enterprises',
    detail: 'Custom software, AI systems, and long-term delivery',
  },
  {
    title: 'International clients',
    detail: 'Remote collaboration with timezone-friendly communication',
  },
  {
    title: 'Students & colleges',
    detail: 'Final year, mini projects, and institutional partnerships',
  },
] as const

/** One-line definition for AEO / AI answer engines */
export const AEO_DEFINITION =
  'Projonexa (projonexa.com) is a premium software and project development company in India — custom software, AI/ML, web and mobile apps, IoT, startup MVPs, and end-to-end project delivery under one brand. Client solutions: projonexa.com/client-projects. College projects: projonexa.com/college-projects.'

export const AEO_SECTION = {
  eyebrow: 'About Projonexa',
  title: 'What Is Projonexa?',
  lead: 'Clear answers for businesses, startups, students, and search engines.',
  summary:
    'We combine industry-grade engineering, structured delivery, and expert mentorship so every engagement — from a startup MVP to a final-year submission — ships with production quality, professional documentation, and confidence.',
} as const

export const AEO_HIGHLIGHTS = [
  {
    title: 'Full-service technology company',
    description: 'Custom software, MVPs, AI/ML, web, mobile, and IoT — one partner from scope to deployment.',
  },
  {
    title: 'Client & product solutions',
    description: 'Production-ready builds for startups, founders, and businesses with scoped quotes and milestones.',
  },
  {
    title: 'Academic & college projects',
    description: 'Final year and mini projects with SRS, reports, viva prep, and university-aligned delivery.',
  },
  {
    title: 'India & global delivery',
    description: 'Remote collaboration for clients across India and international markets.',
  },
] as const

export const FOUNDER_SECTION = {
  eyebrow: 'Founder',
  title: 'Meet the Vision Behind Projonexa',
  lead: 'A premium technology company built from real delivery challenges — focused on quality, mentorship, and outcomes every client can trust.',
} as const

export const FOUNDER = {
  name: 'Nisarga Lokhande',
  role: 'Founder & CEO',
  linkedin: 'https://www.linkedin.com/in/nslokhande/',
  github: 'https://github.com/nikobuddy/',
  email: 'nisargalokhande@gmail.com',
  location: 'India',
  story: `Hi, I'm Nisarga Lokhande.

I started Projonexa after seeing how often great ideas stall — whether from a startup founder, a business team, or a student with a final-year deadline — because the right technical partner, documentation, and delivery structure were missing.

Today, Projonexa is a premium technology company that brings everything under one roof: custom software, AI/ML, web and mobile apps, startup MVPs, and specialized college project tracks — all with structured delivery, expert mentorship, and production-ready results.

Our mission is simple: be the complete technology partner that turns every idea into something real.`,
} as const

export const VISION_MISSION_SECTION = {
  eyebrow: 'Purpose',
  title: 'Vision & Mission',
  lead: 'Where we are headed — and how we help every client move from idea to shipped product.',
} as const

export const VISION = {
  title: 'Our Vision',
  statement:
    "To become the world's most trusted premium technology partner — delivering end-to-end software, products, and projects for businesses, startups, and academic innovators through one unified brand.",
} as const

export const MISSION = {
  title: 'Our Mission',
  statement:
    'To provide businesses, startups, and students with a single premium partner for custom software, product development, and project execution — combining technical expertise, mentorship, and structured delivery in one place.',
} as const

export const PURPOSE_CARDS = [
  {
    title: 'End-to-end delivery',
    description:
      'From first brief to final submission — architecture, build, documentation, and deployment handled in one structured flow.',
    accent: '#00c8ff',
    mediaLight: 'linear-gradient(145deg, rgba(0, 200, 255, 0.14) 0%, rgba(61, 139, 255, 0.08) 55%, rgba(255, 255, 255, 0.92) 100%)',
    mediaDark: 'linear-gradient(145deg, rgba(0, 200, 255, 0.12) 0%, rgba(61, 139, 255, 0.06) 50%, rgba(10, 14, 20, 0.96) 100%)',
    animation: 'pipeline',
    steps: [
      {
        label: 'Discovery & scope',
        summary: 'Align goals, requirements, and timeline before a line of code is written.',
        points: ['Requirement workshops', 'Scope & milestone plan', 'Tech stack recommendation'],
      },
      {
        label: 'Architecture & design',
        summary: 'Solid system design and UI direction so the build stays scalable and clear.',
        points: ['System architecture', 'Database & API design', 'Wireframes & UI direction'],
      },
      {
        label: 'Development & testing',
        summary: 'Iterative builds with reviews, QA, and demos at every checkpoint.',
        points: ['Sprint-based development', 'Code reviews & QA', 'Live progress demos'],
      },
      {
        label: 'Documentation',
        summary: 'Submission-ready docs — SRS, reports, and diagrams included.',
        points: ['SRS & technical reports', 'UML & flow diagrams', 'User manuals & guides'],
      },
      {
        label: 'Deployment & handoff',
        summary: 'Go live with deployment support and a clean handoff you can present confidently.',
        points: ['Cloud deployment setup', 'Viva & demo prep', 'Post-launch support window'],
      },
    ],
  },
  {
    title: 'Built for every innovator',
    description:
      'Students, startups, and businesses each get workflows tuned to academic standards, MVP speed, or enterprise scale.',
    accent: '#6c63ff',
    mediaLight: 'linear-gradient(145deg, rgba(108, 99, 255, 0.14) 0%, rgba(61, 139, 255, 0.08) 55%, rgba(255, 255, 255, 0.92) 100%)',
    mediaDark: 'linear-gradient(145deg, rgba(108, 99, 255, 0.12) 0%, rgba(61, 139, 255, 0.06) 50%, rgba(12, 10, 22, 0.96) 100%)',
    animation: 'audience',
    audiences: [
      {
        label: 'Businesses',
        detail: 'Custom software & integrations',
        summary: 'Enterprise-grade builds — portals, dashboards, APIs, and integrations that fit your ops.',
        points: ['Custom web & mobile apps', 'API & third-party integrations', 'Ongoing maintenance options'],
      },
      {
        label: 'Startups',
        detail: 'MVPs & investor-ready demos',
        summary: 'Ship fast with lean architecture, polished demos, and a codebase investors can trust.',
        points: ['MVP in weeks, not months', 'Pitch-ready product demos', 'Scalable foundation for growth'],
      },
      {
        label: 'Students',
        detail: 'Final-year & academic projects',
        summary: 'University-ready projects with documentation, viva prep, and mentor guidance built in.',
        points: ['IEEE & university formats', 'Plagiarism-safe original code', 'Viva & presentation coaching'],
      },
    ],
  },
  {
    title: 'Expert mentorship built in',
    description:
      'Developers and mentors guide every phase — so you ship with clarity, quality, and confidence.',
    accent: '#3d8bff',
    mediaLight: 'linear-gradient(145deg, rgba(61, 139, 255, 0.16) 0%, rgba(0, 200, 255, 0.08) 55%, rgba(255, 255, 255, 0.92) 100%)',
    mediaDark: 'linear-gradient(145deg, rgba(61, 139, 255, 0.14) 0%, rgba(0, 200, 255, 0.06) 50%, rgba(8, 12, 20, 0.96) 100%)',
    animation: 'milestones',
    milestones: [
      {
        label: 'SRS & documentation',
        time: 'Week 1',
        summary: 'Structured requirements and documentation that meet academic and industry standards.',
        points: ['SRS drafting & review', 'Use-case & sequence diagrams', 'IEEE-format alignment'],
      },
      {
        label: 'Architecture review',
        time: 'Week 2',
        summary: 'Senior mentors validate your system design before development accelerates.',
        points: ['Stack & scalability review', 'Security & data-flow checks', 'Risk mitigation plan'],
      },
      {
        label: 'Viva preparation',
        time: 'Pre-submission',
        summary: 'Mock Q&A and demo rehearsals so you present your project with confidence.',
        points: ['Mock viva sessions', 'Demo script & talking points', 'Common question prep'],
      },
      {
        label: 'Deployment support',
        time: 'Go-live',
        summary: 'Hands-on help deploying to cloud or local environments for demos and submissions.',
        points: ['Cloud & hosting setup', 'Environment configuration', 'Live demo walkthrough'],
      },
    ],
  },
] as const

export const STATS_SECTION = {
  eyebrow: 'Impact',
  title: 'Numbers That Define Our Growth',
  lead: 'Trusted by businesses, startups, students, and institutions across India and beyond.',
  body: `Projonexa has grown into a premium technology partner — delivering production software, startup MVPs, and academic projects through a network of expert developers and mentors. These numbers reflect the scale, depth, and commitment behind every engagement.`,
} as const

export const STATS = [
  {
    value: 100,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'End-to-end builds shipped across academics and industry',
  },
  {
    value: 150,
    suffix: '+',
    label: 'Freelancers Network',
    description: 'Developers, designers, and specialists on our expert roster',
  },
  {
    value: 10,
    suffix: '+',
    label: 'Technology Domains',
    description: 'From AI/ML and web to IoT, cloud, and mobile stacks',
  },
  {
    value: 500,
    suffix: '+',
    label: 'Students Assisted',
    description: 'Learners guided through projects, viva prep, and delivery',
  },
] as const

export const WHY_SECTION = {
  eyebrow: 'Why Projonexa',
  title: 'The Premium Choice for Technology Delivery',
  lead: 'We combine enterprise-grade engineering, structured delivery, and expert mentorship — whether you are shipping a product or submitting a final-year project.',
} as const

export const WHY_PILLARS = [
  {
    label: 'Technical Depth',
    description: 'Production-grade stacks, scalable architecture, and code you can defend in review.',
  },
  {
    label: 'Academic Rigor',
    description: 'SRS, reports, and viva-ready documentation aligned to university standards.',
  },
  {
    label: 'Startup Velocity',
    description: 'MVPs and prototypes built for real users, demos, and fast iteration.',
  },
] as const

export const WHY_CARDS = [
  {
    title: 'Technical Depth',
    description:
      'Production-grade stacks, scalable architecture, and code you can defend in review.',
    hoverDescription:
      'From React and Python to AI/ML and cloud — every layer is built for performance, clarity, and long-term maintainability.',
    highlights: [
      'React & Node.js',
      'AI / ML stacks',
      'Cloud architecture',
      'Clean code patterns',
      'Scalable APIs',
    ],
    accent: '#00c8ff',
    gradientLight:
      'linear-gradient(155deg, #f0fbff 0%, #dff4fc 38%, #c5ebf8 72%, #a8e0f4 100%)',
    gradient: 'linear-gradient(145deg, #0a1628 0%, #0d2847 42%, #1a4a6e 100%)',
    animation: 'vertical',
  },
  {
    title: 'Academic Rigor',
    description: 'SRS, reports, and viva-ready documentation aligned to university standards.',
    hoverDescription:
      'Complete documentation packages — SRS, design docs, reports, and viva prep — formatted to your university guidelines.',
    highlights: [
      'SRS documentation',
      'Design reports',
      'Viva preparation',
      'University formats',
      'Presentation decks',
    ],
    accent: '#6c63ff',
    gradientLight:
      'linear-gradient(155deg, #f5f3ff 0%, #ebe8ff 38%, #ddd6fe 72%, #cfc4ff 100%)',
    gradient: 'linear-gradient(145deg, #120a28 0%, #1e1248 42%, #3d2a7a 100%)',
    featured: true,
    animation: 'stacked',
  },
  {
    title: 'Startup Velocity',
    description: 'MVPs and prototypes built for real users, demos, and fast iteration.',
    hoverDescription:
      'Ship investor-ready MVPs with structured sprints, clear milestones, and demos that prove market fit fast.',
    highlights: [
      'MVP development',
      'Investor demos',
      'Fast sprints',
      'User-ready UI',
      'Launch support',
    ],
    accent: '#00e5a0',
    gradientLight:
      'linear-gradient(155deg, #edfff8 0%, #d8faef 38%, #bdf5e4 72%, #9fefd6 100%)',
    gradient: 'linear-gradient(145deg, #0a1f18 0%, #0d3d2e 42%, #145a42 100%)',
    animation: 'orbit',
  },
] as const

/** Benefit indices under each pillar column (Technical · Academic · Startup) */
export const WHY_BENEFIT_GROUPS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
] as const

export const WHY_CHOOSE = [
  {
    title: 'End-to-End Project Development',
    description:
      'From ideation and architecture to deployment and documentation — we handle the complete project lifecycle.',
  },
  {
    title: 'Industry-Level Documentation',
    description:
      'SRS, design documents, user manuals, and presentation decks crafted to academic and professional standards.',
  },
  {
    title: 'Expert Mentor Support',
    description:
      'Guidance from experienced developers and domain specialists throughout your project journey.',
  },
  {
    title: 'Scalable Architecture',
    description:
      'Production-grade codebases built with modern patterns that grow with your product and career.',
  },
  {
    title: 'Fast Delivery',
    description:
      'Structured sprints and clear milestones ensure your deadlines are met without compromising quality.',
  },
  {
    title: 'Startup-Ready Solutions',
    description:
      'MVPs and prototypes designed for real users, investor demos, and rapid market validation.',
  },
  {
    title: 'Academic Excellence',
    description:
      'Projects aligned with university guidelines, viva preparation, and evaluation criteria.',
  },
  {
    title: 'Affordable Solutions',
    description:
      'Premium quality development at student-friendly pricing with transparent scope and deliverables.',
  },
  {
    title: 'Global Reach',
    description:
      'Serving students, startups, and businesses across India and internationally with remote collaboration.',
  },
] as const
