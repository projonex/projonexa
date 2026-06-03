export const BRAND = {
  name: 'Projonexa',
  tagline: 'Where Innovation Meets Execution.',
  /** Hero display — same message, split for typographic emphasis */
  taglineHero: {
    prefix: 'Where Innovation',
    bridge: 'Meets',
    suffix: 'Execution.',
  },
  url: 'https://projonexa.com',
  email: 'nisargalokhande@gmail.com',
  location: 'India',
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

/** Service Area section — home page */
export const SERVICE_AREA_SECTION = {
  eyebrow: 'Service Area',
  title: 'Serving Students & Clients Across India and Globally',
  lead: 'Remote delivery for students, colleges, startups, and businesses — across India and internationally.',
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
    title: 'Businesses & international clients',
    detail: 'Custom software, AI systems, and long-term delivery',
  },
  {
    title: 'Engineering & CS students',
    detail: 'BE, BTech, MCA, BCA — final year and mini projects',
  },
  {
    title: 'Colleges & universities',
    detail: 'Department partnerships and bulk student project support',
  },
] as const

/** One-line definition for AEO / AI answer engines */
export const AEO_DEFINITION =
  'Projonexa (projonexa.com) is a pan-India platform for final year engineering college projects, mini projects for engineering students, AI/ML, web/mobile, IoT, and startup MVPs — with source code, reports, PPT, deployment, and viva prep. College students: visit projonexa.com/college-projects or projonexa.com/inquiry/students to contact us.'

export const AEO_SECTION = {
  eyebrow: 'About Projonexa',
  title: 'What Is Projonexa?',
  lead: 'Clear answers for students, clients, colleges, and search engines.',
  summary:
    'We combine academic rigor, industry-grade engineering, and mentor-led delivery so every project is evaluation-ready and portfolio-worthy — not just a prototype that barely runs.',
} as const

export const AEO_HIGHLIGHTS = [
  {
    title: 'Academic & final-year projects',
    description: 'BE, BTech, MCA, and mini projects with SRS, reports, and viva prep.',
  },
  {
    title: 'AI, web, mobile & IoT',
    description: 'Modern stacks from machine learning pipelines to deployed cloud apps.',
  },
  {
    title: 'Startups & MVPs',
    description: 'Investor-ready products for founders — prototypes, demos, and scalable foundations.',
  },
  {
    title: 'India & global delivery',
    description: 'Remote collaboration for clients across India and international markets.',
  },
] as const

export const FOUNDER_SECTION = {
  eyebrow: 'Founder',
  title: 'Meet the Vision Behind Projonexa',
  lead: 'A platform built from real project challenges — focused on delivery, mentorship, and outcomes clients can trust.',
} as const

export const FOUNDER = {
  name: 'Nisarga Lokhande',
  role: 'Founder & CEO',
  linkedin: 'https://www.linkedin.com/in/nslokhande/',
  github: 'https://github.com/nikobuddy/',
  email: 'nisargalokhande@gmail.com',
  location: 'India',
  story: `Hi, I'm Nisarga Lokhande.

Like many students, I once struggled to turn ideas into working projects — missing the right guidance, documentation, and technical support when it mattered most.

That experience led me to build Projonexa: a place where students, startups, and businesses get structured delivery, expert mentorship, and production-ready results — not half-finished prototypes.

Our mission is simple: make innovation accessible to everyone.`,
} as const

export const VISION_MISSION_SECTION = {
  eyebrow: 'Purpose',
  title: 'Vision & Mission',
  lead: 'Where we are headed — and how we help every client move from idea to shipped product.',
} as const

export const VISION = {
  title: 'Our Vision',
  statement:
    "To become the world's leading innovation platform connecting students, freelancers, startups, and businesses through technology-driven project development.",
} as const

export const MISSION = {
  title: 'Our Mission',
  statement:
    'To empower students and innovators by providing access to technical expertise, mentorship, development resources, and end-to-end project execution.',
} as const

export const STATS_SECTION = {
  eyebrow: 'Impact',
  title: 'Numbers That Define Our Growth',
  lead: 'Trusted by students, startups, and institutions across India and beyond.',
  body: `Projonexa has grown into a trusted innovation partner — delivering real projects, building a strong freelancer network, and supporting learners from first idea to final submission. These numbers reflect the scale, depth, and commitment behind every engagement.`,
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
  title: 'The Premium Choice for Project Excellence',
  lead: 'We combine technical depth, academic rigor, and startup velocity in every engagement.',
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
    gradient: 'linear-gradient(145deg, #0a1628 0%, #0d2847 42%, #1a4a6e 100%)',
    animation: 'orbit',
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
    gradient: 'linear-gradient(145deg, #0a1f18 0%, #0d3d2e 42%, #145a42 100%)',
    animation: 'chart',
    chartMetric: '2-week MVP',
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
