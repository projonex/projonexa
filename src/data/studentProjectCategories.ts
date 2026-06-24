export type ProjectCategoryNode = {
  value: string
  label: string
  childFieldLabel?: string
  children?: ProjectCategoryNode[]
}

export type ProjectCategoryRoot = {
  value: string
  label: string
  childFieldLabel: string
  children: ProjectCategoryNode[]
}

function slug(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const domains = (...labels: string[]): ProjectCategoryNode[] =>
  labels.map((label) => ({ value: slug(label), label }))

const branch = (
  label: string,
  childFieldLabel: string,
  children: ProjectCategoryNode[],
): ProjectCategoryNode => ({
  value: slug(label),
  label,
  childFieldLabel,
  children,
})

const program = (
  label: string,
  childFieldLabel: string,
  children: ProjectCategoryNode[],
): ProjectCategoryNode => ({
  value: slug(label),
  label,
  childFieldLabel,
  children,
})

const CS_DOMAINS = domains(
  'Web Applications',
  'Mobile Applications',
  'AI Systems',
  'Machine Learning',
  'Deep Learning',
  'Chatbots',
  'Blockchain',
  'Cyber Security',
  'Data Analytics',
  'Cloud Applications',
)

const CS_SPECIALIZATIONS: ProjectCategoryNode[] = [
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Cyber Security',
  'Cloud Computing',
  'Internet of Things',
  'Blockchain',
  'DevOps',
  'Full Stack Development',
].map((label) => ({
  value: slug(label),
  label,
  childFieldLabel: 'Project Domain',
  children: CS_DOMAINS,
}))

const CS_PROGRAMS: ProjectCategoryNode[] = [
  'BE Computer Engineering',
  'BTech Computer Science',
  'BTech Information Technology',
  'BTech CSE',
  'BTech Software Engineering',
].map((label) => program(label, 'Branch / Specialization', CS_SPECIALIZATIONS))

const AI_EMERGING_DOMAINS = domains(
  'Computer Vision',
  'NLP',
  'Recommendation Systems',
  'Predictive Analytics',
  'Generative AI',
  'LLM Applications',
  'Face Recognition',
  'Object Detection',
  'Crowd Analysis',
)

const ECE_DOMAINS = domains(
  'Embedded Systems',
  'IoT',
  'PCB Design',
  'VLSI',
  'Signal Processing',
  'Communication Systems',
  'Arduino Projects',
  'Raspberry Pi Projects',
)

const ELECTRICAL_DOMAINS = domains(
  'Smart Grid',
  'Solar Systems',
  'Energy Management',
  'Motor Control',
  'Power Electronics',
  'Industrial Automation',
  'Renewable Energy',
)

const DIPLOMA_PROJECT_TYPES = domains('Mini Projects', 'Major Projects', 'Hardware Projects', 'Software Projects')

const PHARMACY_SPECIALIZATIONS: ProjectCategoryNode[] = [
  branch('Pharmaceutics', 'Project Domain', domains('Drug Formulation', 'Tablet Development', 'Capsule Formulation', 'Drug Delivery Systems')),
  branch('Pharmacology', 'Project Domain', domains('Drug Action Studies', 'Animal Studies', 'Toxicology')),
  branch('Pharmaceutical Chemistry', 'Project Domain', domains('Drug Synthesis', 'Chemical Analysis', 'Medicinal Chemistry')),
  branch('Pharmacognosy', 'Project Domain', domains('Herbal Drugs', 'Natural Products', 'Plant Extract Studies')),
  branch('Quality Assurance', 'Project Domain', domains('Drug Testing', 'Stability Studies', 'Validation')),
  branch('Clinical Pharmacy', 'Project Domain', domains('Patient Studies', 'Hospital Pharmacy', 'Drug Interaction Analysis')),
  branch('Industrial Pharmacy', 'Project Domain', domains('Production', 'Manufacturing', 'Packaging')),
]

const HEALTH_DOMAINS = domains('Patient Care', 'Disease Analysis', 'Healthcare Management', 'Clinical Studies')

const ARTS_DOMAINS = domains('Research Dissertation', 'Social Surveys', 'Case Studies', 'Behavioral Studies')

const DESIGN_DOMAINS = domains('UI/UX Design', 'Graphic Design', 'Motion Graphics', 'Branding', 'Product Design')

const LAW_DOMAINS = domains('Case Studies', 'Legal Research', 'Constitutional Law', 'Corporate Law')

const AGRI_DOMAINS = domains(
  'Smart Irrigation',
  'Precision Farming',
  'Crop Analysis',
  'Soil Analysis',
  'Agri IoT',
  'Farm Automation',
)

export const STUDENT_PROJECT_CATEGORIES: ProjectCategoryRoot[] = [
  {
    value: 'engineering-and-technology',
    label: 'Engineering & Technology',
    childFieldLabel: 'Branch / Discipline',
    children: [
      branch('Computer & Software Engineering', 'Program', CS_PROGRAMS),
      branch('Artificial Intelligence & Emerging Technologies', 'Program', [
        program('AI & DS', 'Project Domain', AI_EMERGING_DOMAINS),
        program('AI & ML', 'Project Domain', AI_EMERGING_DOMAINS),
        program('Data Science', 'Project Domain', domains('Predictive Analytics', 'Data Analytics', 'Recommendation Systems', 'Generative AI')),
        program('Robotics', 'Project Domain', domains('Object Detection', 'Autonomous Vehicles', 'Industrial Robots', 'Control Systems')),
        program('Intelligent Systems', 'Project Domain', AI_EMERGING_DOMAINS),
      ]),
      branch('Electronics & Communication', 'Program', [
        program('Electronics Engineering', 'Project Domain', ECE_DOMAINS),
        program('ENTC', 'Project Domain', ECE_DOMAINS),
        program('Electronics & Communication', 'Project Domain', ECE_DOMAINS),
        program('Electronics & Instrumentation', 'Project Domain', ECE_DOMAINS),
      ]),
      branch('Electrical Engineering', 'Program', [
        program('Electrical Engineering', 'Project Domain', ELECTRICAL_DOMAINS),
        program('Electrical & Electronics', 'Project Domain', ELECTRICAL_DOMAINS),
      ]),
      branch(
        'Mechanical Engineering',
        'Project Domain',
        domains('CAD/CAM', 'Robotics', 'Automation', 'Thermal Engineering', 'Automobile Systems', 'Manufacturing Systems', 'CNC Projects', 'HVAC Systems'),
      ),
      branch(
        'Civil Engineering',
        'Project Domain',
        domains('Structural Analysis', 'Smart Construction', 'Transportation Engineering', 'Environmental Engineering', 'Water Management', 'Surveying', 'Sustainable Construction'),
      ),
      branch('Automobile Engineering', 'Project Domain', domains('Electric Vehicles', 'Hybrid Vehicles', 'Engine Systems', 'Vehicle Safety', 'Vehicle Automation')),
      branch('Mechatronics & Robotics', 'Project Domain', domains('Robotics', 'Automation', 'Industrial Robots', 'Control Systems', 'PLC Systems', 'Autonomous Vehicles')),
    ],
  },
  {
    value: 'diploma-engineering',
    label: 'Diploma Engineering',
    childFieldLabel: 'Program',
    children: [
      program('Diploma Computer', 'Project Type', DIPLOMA_PROJECT_TYPES),
      program('Diploma IT', 'Project Type', DIPLOMA_PROJECT_TYPES),
      program('Diploma Civil', 'Project Type', DIPLOMA_PROJECT_TYPES),
      program('Diploma Mechanical', 'Project Type', DIPLOMA_PROJECT_TYPES),
      program('Diploma Electrical', 'Project Type', DIPLOMA_PROJECT_TYPES),
      program('Diploma ENTC', 'Project Type', DIPLOMA_PROJECT_TYPES),
      program('Diploma Automobile', 'Project Type', DIPLOMA_PROJECT_TYPES),
    ],
  },
  {
    value: 'computer-applications',
    label: 'Computer Applications',
    childFieldLabel: 'Program',
    children: [
      program('BCA', 'Project Domain', domains('Web Development', 'Android Development', 'ERP Systems', 'AI Projects', 'Cloud Applications')),
      program('MCA', 'Project Domain', domains('Enterprise Applications', 'AI Systems', 'Data Science', 'Cloud Computing', 'Cyber Security')),
      program('BSc Computer Science', 'Project Domain', domains('Software Development', 'Database Systems', 'AI Applications', 'Analytics')),
    ],
  },
  {
    value: 'management-studies',
    label: 'Management Studies',
    childFieldLabel: 'Program',
    children: [
      branch('BBA', 'Branch / Specialization', [
        program('Marketing', 'Project Area', domains('Consumer Behavior', 'Digital Marketing', 'Branding', 'Social Media Marketing')),
        program('Finance', 'Project Area', domains('Stock Market', 'Mutual Funds', 'Banking', 'Investment Analysis')),
        program('Human Resources', 'Project Area', domains('Employee Satisfaction', 'Recruitment', 'Training & Development')),
        program('Operations', 'Project Area', domains('Supply Chain', 'Process Optimization', 'Quality Management')),
        program('International Business', 'Project Area', domains('Global Markets', 'Export Import', 'Cross-border Trade')),
        program('Business Analytics', 'Project Area', domains('Data Analytics', 'Predictive Analytics', 'Business Intelligence')),
      ]),
      branch('MBA', 'Branch / Specialization', [
        program('Finance', 'Project Area', domains('Stock Market', 'Mutual Funds', 'Banking', 'Investment Analysis')),
        program('Marketing', 'Project Area', domains('Consumer Behavior', 'Digital Marketing', 'Branding', 'Social Media Marketing')),
        program('HR', 'Project Area', domains('Employee Satisfaction', 'Recruitment', 'Training & Development')),
        program('Operations', 'Project Area', domains('Supply Chain', 'Process Optimization', 'Quality Management')),
        program('Supply Chain', 'Project Area', domains('Logistics', 'Inventory Management', 'Vendor Management')),
        program('Analytics', 'Project Area', domains('Data Analytics', 'Predictive Analytics', 'Business Intelligence')),
        program('IT Management', 'Project Area', domains('Enterprise Systems', 'Digital Transformation', 'Cloud Applications')),
      ]),
    ],
  },
  {
    value: 'commerce',
    label: 'Commerce',
    childFieldLabel: 'Program',
    children: [
      program('BCom', 'Project Domain', domains('Accounting', 'Taxation', 'Banking', 'Auditing', 'Investment')),
      program('MCom', 'Project Domain', domains('Financial Management', 'Corporate Accounting', 'Banking Studies')),
    ],
  },
  {
    value: 'pharmacy',
    label: 'Pharmacy',
    childFieldLabel: 'Program',
    children: [
      program('D.Pharm', 'Branch / Specialization', PHARMACY_SPECIALIZATIONS),
      program('B.Pharm', 'Branch / Specialization', PHARMACY_SPECIALIZATIONS),
      program('M.Pharm', 'Branch / Specialization', PHARMACY_SPECIALIZATIONS),
      program('Pharm.D', 'Branch / Specialization', PHARMACY_SPECIALIZATIONS),
    ],
  },
  {
    value: 'medical-and-health-sciences',
    label: 'Medical & Health Sciences',
    childFieldLabel: 'Program',
    children: [
      program('Nursing', 'Project Domain', HEALTH_DOMAINS),
      program('Physiotherapy', 'Project Domain', HEALTH_DOMAINS),
      program('Public Health', 'Project Domain', HEALTH_DOMAINS),
      program('Medical Laboratory Technology', 'Project Domain', HEALTH_DOMAINS),
      program('Radiology', 'Project Domain', HEALTH_DOMAINS),
    ],
  },
  {
    value: 'science',
    label: 'Science',
    childFieldLabel: 'Program',
    children: [
      program('BSc/MSc Biotechnology', 'Technology / Research Area', domains('Genetic Engineering', 'Bioinformatics', 'DNA Analysis')),
      program('BSc/MSc Microbiology', 'Technology / Research Area', domains('Bacterial Studies', 'Food Microbiology', 'Clinical Microbiology')),
      program('Chemistry', 'Technology / Research Area', domains('Organic Chemistry', 'Pharmaceutical Chemistry', 'Analytical Chemistry')),
      program('Physics', 'Technology / Research Area', domains('Electronics', 'Renewable Energy', 'Instrumentation')),
    ],
  },
  {
    value: 'agriculture',
    label: 'Agriculture',
    childFieldLabel: 'Program',
    children: [
      program('BSc Agriculture', 'Project Domain', AGRI_DOMAINS),
      program('Agricultural Engineering', 'Project Domain', AGRI_DOMAINS),
    ],
  },
  {
    value: 'arts-and-humanities',
    label: 'Arts & Humanities',
    childFieldLabel: 'Program',
    children: [
      program('BA Economics', 'Project Domain', ARTS_DOMAINS),
      program('BA Psychology', 'Project Domain', ARTS_DOMAINS),
      program('BA Sociology', 'Project Domain', ARTS_DOMAINS),
      program('BA Geography', 'Project Domain', ARTS_DOMAINS),
      program('BA English', 'Project Domain', ARTS_DOMAINS),
    ],
  },
  {
    value: 'design-and-media',
    label: 'Design & Media',
    childFieldLabel: 'Program',
    children: [
      program('BDes', 'Project Domain', DESIGN_DOMAINS),
      program('Animation', 'Project Domain', DESIGN_DOMAINS),
      program('Multimedia', 'Project Domain', DESIGN_DOMAINS),
      program('Visual Communication', 'Project Domain', DESIGN_DOMAINS),
    ],
  },
  {
    value: 'law',
    label: 'Law',
    childFieldLabel: 'Program',
    children: [
      program('LLB', 'Project Domain', LAW_DOMAINS),
      program('BA LLB', 'Project Domain', LAW_DOMAINS),
      program('BBA LLB', 'Project Domain', LAW_DOMAINS),
    ],
  },
]
