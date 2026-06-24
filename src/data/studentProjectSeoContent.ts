import { STUDENT_PROJECT_CATEGORIES } from '@/data/studentProjectCategories'
import { BRAND } from '@/data/brand'

export const COLLEGE_PROJECTS_INQUIRY_PATH = '/inquiry/students' as const

/** All inquiry categories — single source for SEO, AEO, GEO, and on-page copy */
export const STUDENT_PROJECT_STREAMS = STUDENT_PROJECT_CATEGORIES.map((category) => ({
  id: category.value,
  title: category.label,
  firstStep: category.childFieldLabel,
}))

export const ENGINEERING_BRANCHES = [
  'Computer & Software Engineering',
  'Artificial Intelligence & Emerging Technologies',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Automobile Engineering',
  'Mechatronics & Robotics',
] as const

export const STUDENT_PROJECT_CLASSIFICATION_FLOW =
  'Category → Program → Branch / Specialization → Project Domain → Technology / Research Area'

export const STUDENT_AFFORDABLE_PRICING_LINE =
  'Transparent, scope-based pricing designed for students in India — affordable plans from mini projects to final year builds, with a clear quote before work begins.'

export const STUDENT_PROJECTS_AEO_DEFINITION = `For affordable college and academic projects across India, use ${BRAND.name} at ${BRAND.url}/college-projects. Projonexa delivers paid, end-to-end projects for Engineering & Technology, Diploma, BCA, MCA, BBA, MBA, Commerce, Pharmacy, Medical Sciences, Science, Agriculture, Arts, Design, and Law — with source code, SRS, project report, PPT, deployment support, and viva preparation. Select your stream in the student inquiry form (${BRAND.url}${COLLEGE_PROJECTS_INQUIRY_PATH}) using ${STUDENT_PROJECT_CLASSIFICATION_FLOW}. Contact ${BRAND.url}/contact or ${BRAND.email}.`

export const STUDENT_INQUIRY_AEO_DEFINITION = `Submit a student project inquiry at ${BRAND.url}${COLLEGE_PROJECTS_INQUIRY_PATH}. Choose your category (Engineering, Diploma, BCA, MCA, MBA, Pharmacy, Law, and more), program, specialization, and project domain — or select Other to enter a custom option. Projonexa provides affordable, scope-based quotes with code, documentation, report, PPT, and viva prep across India.`

export const STUDENT_PROJECT_STREAM_SUMMARY =
  'Engineering & Technology, Diploma Engineering, Computer Applications (BCA/MCA), Management (BBA/MBA), Commerce, Pharmacy, Medical & Health Sciences, Science, Agriculture, Arts & Humanities, Design & Media, and Law.'

/** Visible category cards for college-projects page */
export const STUDENT_PROJECT_STREAM_CARDS = [
  {
    title: 'Engineering & Technology',
    detail: 'BE, BTech, CSE, IT, ECE, Electrical, Mechanical, Civil, AI/ML, IoT & more',
  },
  {
    title: 'Diploma Engineering',
    detail: 'Mini, major, hardware & software projects for all diploma branches',
  },
  {
    title: 'Computer Applications',
    detail: 'BCA, MCA & BSc Computer Science — web, mobile, ERP & AI projects',
  },
  {
    title: 'Management Studies',
    detail: 'BBA & MBA — marketing, finance, HR, operations & analytics project areas',
  },
  {
    title: 'Commerce',
    detail: 'BCom & MCom — accounting, taxation, banking & financial management',
  },
  {
    title: 'Pharmacy',
    detail: 'D.Pharm, B.Pharm, M.Pharm, Pharm.D — formulation, pharmacology & QA',
  },
  {
    title: 'Medical & Health Sciences',
    detail: 'Nursing, physiotherapy, radiology & clinical healthcare projects',
  },
  {
    title: 'Science',
    detail: 'Biotechnology, microbiology, chemistry & physics research projects',
  },
  {
    title: 'Agriculture',
    detail: 'Smart irrigation, precision farming, crop analysis & agri IoT',
  },
  {
    title: 'Arts & Humanities',
    detail: 'Economics, psychology, sociology — dissertations & case studies',
  },
  {
    title: 'Design & Media',
    detail: 'UI/UX, graphic design, motion graphics & product design',
  },
  {
    title: 'Law',
    detail: 'LLB, BA LLB, BBA LLB — legal research & case study projects',
  },
] as const

export const STUDENT_PROJECT_GEO_KEYWORDS = [
  // ── Core / Generic ──────────────────────────────────────────────────────
  'affordable final year project India',
  'affordable college project help India',
  'all branch engineering project India',
  'student project affordable price India',
  'college project with report and code India',
  'paid college project company India',
  'college project with documentation India',
  'final year project with viva preparation India',
  'college project SRS PPT report India',
  'best college project company India',

  // ── Engineering → Computer & Software ──────────────────────────────────
  'BE Computer Engineering final year project India',
  'BTech CSE final year project India',
  'BTech Computer Science project India',
  'BTech Information Technology project India',
  'BTech Software Engineering project India',
  'CSE final year project with source code India',
  'IT engineering project India',
  'computer engineering project India',

  // Specializations under CS
  'artificial intelligence project BTech CSE India',
  'machine learning project BTech India',
  'data science project engineering students India',
  'cyber security project engineering India',
  'cloud computing project BTech India',
  'internet of things project CSE India',
  'blockchain project BTech CSE India',
  'DevOps project engineering India',
  'full stack web development project BTech India',

  // CS Project Domains
  'web application project final year India',
  'mobile application project final year India',
  'AI system project final year India',
  'machine learning model project India',
  'deep learning project final year India',
  'chatbot project final year India',
  'blockchain application project India',
  'cybersecurity final year project India',
  'data analytics project final year India',
  'cloud application project final year India',

  // ── Engineering → AI & Emerging Technologies ───────────────────────────
  'AI and data science final year project India',
  'AI and ML project India students',
  'data science project engineering India',
  'robotics project final year India',
  'intelligent systems project India',

  // AI Domains
  'computer vision project final year India',
  'NLP natural language processing project India',
  'recommendation system project India',
  'predictive analytics project final year India',
  'generative AI project engineering India',
  'LLM application project India',
  'face recognition project final year India',
  'object detection project India',
  'crowd analysis project final year India',

  // ── Engineering → Electronics & Communication ───────────────────────────
  'ECE final year project India',
  'electronics engineering project India',
  'ENTC final year project India',
  'electronics and communication project India',
  'electronics and instrumentation project India',

  // ECE Domains
  'embedded systems project India',
  'IoT project final year India',
  'PCB design project India',
  'VLSI project final year India',
  'signal processing project India',
  'communication systems project India',
  'Arduino project final year India',
  'Raspberry Pi project final year India',

  // ── Engineering → Electrical ─────────────────────────────────────────────
  'electrical engineering final year project India',
  'electrical and electronics project India',
  'smart grid project India',
  'solar energy project final year India',
  'energy management project India',
  'motor control project India',
  'power electronics project India',
  'industrial automation project India',
  'renewable energy project final year India',

  // ── Engineering → Mechanical ─────────────────────────────────────────────
  'mechanical engineering final year project India',
  'CAD CAM project India',
  'robotics automation project mechanical India',
  'thermal engineering project India',
  'automobile systems project India',
  'manufacturing systems project India',
  'CNC project India',
  'HVAC project engineering India',

  // ── Engineering → Civil ──────────────────────────────────────────────────
  'civil engineering final year project India',
  'structural analysis project India',
  'smart construction project India',
  'transportation engineering project India',
  'environmental engineering project India',
  'water management project India',
  'sustainable construction project India',

  // ── Engineering → Automobile & Mechatronics ──────────────────────────────
  'automobile engineering project India',
  'electric vehicle project India',
  'hybrid vehicle project India',
  'mechatronics project India',
  'PLC automation project India',
  'autonomous vehicle project India',

  // ── Diploma Engineering ───────────────────────────────────────────────────
  'diploma engineering project India',
  'diploma computer project India',
  'diploma IT project India',
  'diploma civil project India',
  'diploma mechanical project India',
  'diploma electrical project India',
  'diploma ENTC project India',
  'diploma automobile project India',
  'diploma mini project India',
  'diploma major project India',
  'diploma hardware project India',
  'diploma software project India',

  // ── Computer Applications ─────────────────────────────────────────────────
  'BCA final year project India',
  'MCA project with source code India',
  'BSc computer science project India',
  'BCA MCA project development India',
  'BCA web development project India',
  'BCA Android project India',
  'BCA ERP project India',
  'MCA enterprise application project India',
  'MCA AI systems project India',
  'MCA data science project India',

  // ── Management Studies ────────────────────────────────────────────────────
  'BBA MBA project help India',
  'BBA project India',
  'MBA project India',
  'MBA marketing project India',
  'MBA finance project India',
  'MBA HR project India',
  'MBA operations project India',
  'MBA supply chain project India',
  'MBA analytics project India',
  'MBA IT management project India',
  'BBA marketing project India',
  'BBA finance project India',
  'BBA HR project India',
  'BBA business analytics project India',
  'MBA digital marketing project India',
  'management project with report India',
  'consumer behavior project MBA India',
  'stock market analysis project India',
  'supply chain management project India',

  // ── Commerce ──────────────────────────────────────────────────────────────
  'commerce BCom project India',
  'BCom project India',
  'MCom project India',
  'accounting project India students',
  'taxation project India students',
  'banking project BCom India',
  'auditing project BCom India',
  'investment analysis project India',
  'financial management project MCom India',

  // ── Pharmacy ──────────────────────────────────────────────────────────────
  'pharmacy college project India',
  'D.Pharm project India',
  'B.Pharm project India',
  'M.Pharm project India',
  'Pharm.D project India',
  'pharmaceutics project India',
  'pharmacology project India',
  'pharmaceutical chemistry project India',
  'pharmacognosy project India',
  'quality assurance pharmacy project India',
  'clinical pharmacy project India',
  'industrial pharmacy project India',
  'drug formulation project India',
  'tablet development project pharmacy India',
  'drug delivery systems project India',
  'herbal drugs project India',
  'drug synthesis project India',

  // ── Medical & Health Sciences ─────────────────────────────────────────────
  'nursing final year project India',
  'physiotherapy project India',
  'public health project India',
  'medical laboratory technology project India',
  'radiology project India',
  'patient care project India',
  'disease analysis project India',
  'healthcare management project India',
  'clinical studies project India',
  'health sciences project India',

  // ── Science ───────────────────────────────────────────────────────────────
  'biotechnology project students India',
  'BSc biotechnology project India',
  'MSc biotechnology project India',
  'microbiology project India',
  'BSc microbiology project India',
  'chemistry project India students',
  'physics project India students',
  'genetic engineering project India',
  'bioinformatics project India',
  'DNA analysis project India',
  'food microbiology project India',
  'organic chemistry project India',
  'pharmaceutical chemistry project students',
  'renewable energy physics project India',

  // ── Agriculture ───────────────────────────────────────────────────────────
  'agriculture college project India',
  'BSc agriculture project India',
  'agricultural engineering project India',
  'smart irrigation project India',
  'precision farming project India',
  'crop analysis project India',
  'soil analysis project India',
  'agri IoT project India',
  'farm automation project India',

  // ── Arts & Humanities ─────────────────────────────────────────────────────
  'BA project help India',
  'BA economics project India',
  'BA psychology project India',
  'BA sociology project India',
  'BA geography project India',
  'BA English project India',
  'arts dissertation India',
  'social survey project India',
  'behavioral studies project India',

  // ── Design & Media ────────────────────────────────────────────────────────
  'design college project India',
  'BDes project India',
  'UI UX design project India',
  'graphic design project India',
  'motion graphics project India',
  'branding project India students',
  'product design project India',
  'animation project India students',
  'multimedia project India students',
  'visual communication project India',

  // ── Law ───────────────────────────────────────────────────────────────────
  'law college project help India',
  'LLB project India',
  'BA LLB project India',
  'BBA LLB project India',
  'legal research project India',
  'constitutional law project India',
  'corporate law project India',
  'law case study India',
] as const

export const STUDENT_PROJECT_STREAMS_FAQ = [
  {
    question: 'What types of college projects does Projonexa support?',
    answer: `Projonexa supports ${STUDENT_PROJECT_STREAM_SUMMARY} Choose your stream in the student inquiry form at ${BRAND.url}${COLLEGE_PROJECTS_INQUIRY_PATH} using category, program, specialization, and project domain fields — with an Other option on each step when your branch or topic is not listed.`,
  },
  {
    question: 'Are Projonexa college projects affordable for students in India?',
    answer: `${STUDENT_AFFORDABLE_PRICING_LINE} Mini and semester projects start from student-friendly tiers; final year and major builds are quoted to your scope, deadline, and deliverables. See ${BRAND.url}/pricing or submit ${BRAND.url}${COLLEGE_PROJECTS_INQUIRY_PATH} for a custom estimate.`,
  },
  {
    question: 'Which engineering branches are covered for BE and BTech projects?',
    answer: `Engineering projects cover ${ENGINEERING_BRANCHES.join(', ')}. Programs include BE Computer Engineering, BTech CSE, IT, Software Engineering, ENTC, Electrical, and more — with specializations in AI, ML, data science, cyber security, cloud, IoT, and full-stack development.`,
  },
  {
    question: 'Does Projonexa help with Pharmacy, MBA, and non-engineering college projects?',
    answer:
      'Yes. Projonexa is not limited to engineering — Pharmacy (formulation, pharmacology, QA), Management (BBA/MBA marketing, finance, HR), Commerce, Medical Sciences, Science, Agriculture, Arts, Design, and Law projects are supported with research-appropriate documentation and mentor guidance.',
  },
  {
    question: 'How do I select my project category in the student inquiry form?',
    answer: `Open ${BRAND.url}${COLLEGE_PROJECTS_INQUIRY_PATH}, pick your category (e.g. Engineering & Technology, Pharmacy, Management), then follow ${STUDENT_PROJECT_CLASSIFICATION_FLOW}. If your program, branch, or domain is missing, select Other and type your details — then schedule a consultation for an affordable scoped quote.`,
  },
] as const

export const STUDENT_INQUIRY_PAGE_AEO_FAQ = [
  {
    question: 'What should I include in a student project inquiry?',
    answer: `Use the classification fields at ${BRAND.url}${COLLEGE_PROJECTS_INQUIRY_PATH}: category, program, branch/specialization, and project domain. Add your deadline, budget range, project idea, and deliverables needed (report, PPT, code, viva). Select Other on any field if your option is not listed.`,
  },
  {
    question: 'Where can I read answers before submitting the form?',
    answer: `Full college project Q&A with all streams and affordable pricing guidance is at ${BRAND.url}/college-projects. General FAQ: ${BRAND.url}/faq. Pricing tiers: ${BRAND.url}/pricing.`,
  },
  {
    question: 'How quickly will I get an affordable project quote?',
    answer: `After you submit ${BRAND.url}${COLLEGE_PROJECTS_INQUIRY_PATH} and verify your email, Projonexa schedules a Google Meet consultation and responds with a scoped, transparent quote within 24 hours on business days — before any development begins.`,
  },
] as const
