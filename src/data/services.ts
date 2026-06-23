import type { LucideIcon } from 'lucide-react'
import {
  Brain,
  Cpu,
  FileText,
  FlaskConical,
  Globe,
  GraduationCap,
  Layers,
  Lightbulb,
  Rocket,
  Smartphone,
  Briefcase,
} from 'lucide-react'

export interface Service {
  id: string
  title: string
  description: string
  deliverables: string[]
  icon: LucideIcon
}

export const SERVICES_SECTION = {
  eyebrow: 'Services',
  title: 'Complete Technology Services Under One Roof',
  lead: 'From custom software and startup MVPs to academic projects — comprehensive solutions tailored to your goals.',
  body: 'Whether you need production-ready software for your business, an investor-ready MVP, or a university submission, Projonexa pairs expert developers with structured delivery — architecture, build, documentation, deployment, and mentor support in one premium partnership.',
} as const

const SERVICE_ACCENTS = [
  '#00C8FF',
  '#6C63FF',
  '#3D8BFF',
  '#67E8F9',
  '#00C8FF',
  '#6C63FF',
  '#3D8BFF',
  '#67E8F9',
  '#00C8FF',
  '#6C63FF',
  '#3D8BFF',
  '#67E8F9',
] as const

export function getServiceAccent(index: number): string {
  return SERVICE_ACCENTS[index % SERVICE_ACCENTS.length]
}

export const SERVICES: Service[] = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    description:
      'Tailored enterprise and business software — CRM, ERP modules, automation tools, and internal platforms built to your requirements.',
    deliverables: ['Custom application', 'Database design', 'User training docs', 'Maintenance plan'],
    icon: Briefcase,
  },
  {
    id: 'mvp',
    title: 'Startup MVP Development',
    description:
      'Lean, investor-ready minimum viable products that validate your idea fast with scalable technical foundations.',
    deliverables: ['MVP product', 'Pitch deck tech', 'Analytics setup', 'Iteration roadmap'],
    icon: Rocket,
  },
  {
    id: 'web',
    title: 'Web Development',
    description:
      'Responsive, performant web applications with modern stacks — dashboards, portals, e-commerce, and SaaS platforms.',
    deliverables: ['Production web app', 'Admin panel', 'API integration', 'Hosting setup'],
    icon: Globe,
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description:
      'Cross-platform and native mobile applications for Android and iOS with intuitive UX and backend connectivity.',
    deliverables: ['Mobile APK/build', 'UI/UX screens', 'Backend APIs', 'App store guidance'],
    icon: Smartphone,
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description:
      'Intelligent systems using deep learning, NLP, computer vision, and predictive analytics with reproducible results.',
    deliverables: ['Trained models', 'Dataset pipeline', 'Evaluation metrics', 'Results report'],
    icon: Brain,
  },
  {
    id: 'iot',
    title: 'IoT Development',
    description:
      'Connected hardware-software systems with sensors, microcontrollers, real-time dashboards, and cloud integration.',
    deliverables: ['Hardware integration', 'Firmware', 'Cloud dashboard', 'Documentation'],
    icon: Layers,
  },
  {
    id: 'documentation',
    title: 'Technical Documentation',
    description:
      'Professional SRS, API docs, user manuals, architecture diagrams, and academic reports that meet professional standards.',
    deliverables: ['SRS document', 'UML diagrams', 'User manual', 'API documentation'],
    icon: FileText,
  },
  {
    id: 'final-year',
    title: 'Final Year Projects',
    description:
      'Complete BE/BTech/MCA final year projects with source code, documentation, PPT, and viva preparation support.',
    deliverables: ['Full source code', 'SRS & design docs', 'Demo video', 'Viva Q&A prep'],
    icon: GraduationCap,
  },
  {
    id: 'mini-projects',
    title: 'Mini Projects',
    description:
      'Semester mini projects with clean implementation, reports, and presentation materials for quick academic submission.',
    deliverables: ['Working prototype', 'Project report', 'Presentation slides', 'Code walkthrough'],
    icon: Lightbulb,
  },
  {
    id: 'engineering',
    title: 'Engineering Projects',
    description:
      'Domain-specific engineering solutions across CSE, IT, ECE, and interdisciplinary streams with industry relevance.',
    deliverables: ['System design', 'Implementation', 'Testing report', 'Deployment guide'],
    icon: Cpu,
  },
  {
    id: 'internship',
    title: 'Internship Projects',
    description:
      'Industry-aligned internship projects with real-world problem statements, mentorship, and certificate-ready deliverables.',
    deliverables: ['Project completion', 'Weekly reports', 'Certificate support', 'Portfolio piece'],
    icon: FlaskConical,
  },
]
