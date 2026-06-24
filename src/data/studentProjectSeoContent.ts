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
  'affordable final year project India',
  'affordable college project help India',
  'BCA MCA project development India',
  'BBA MBA project help India',
  'pharmacy college project India',
  'diploma engineering project India',
  'law college project help India',
  'biotechnology project students India',
  'commerce BCom project India',
  'agriculture college project India',
  'design college project India',
  'all branch engineering project India',
  'student project affordable price India',
  'college project with report and code India',
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
