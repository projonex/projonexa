import {
  STUDENT_PROJECT_CATEGORIES,
  type ProjectCategoryNode,
  type ProjectCategoryRoot,
} from '@/data/studentProjectCategories'

export type ProjectClassificationFieldKey =
  | 'projectBranch'
  | 'projectProgram'
  | 'projectBranchSpecialization'
  | 'projectDomain'
  | 'projectTechnologyArea'

export type ProjectClassificationLevel = {
  fieldKey: ProjectClassificationFieldKey
  fieldLabel: string
  value: string
  label: string
}

export type ProjectClassificationPayload = {
  projectCategory: string
  projectCategoryLabel: string
  projectBranch?: string
  projectBranchLabel?: string
  projectProgram?: string
  projectProgramLabel?: string
  projectBranchSpecialization?: string
  projectBranchSpecializationLabel?: string
  projectDomain?: string
  projectDomainLabel?: string
  projectTechnologyArea?: string
  projectTechnologyAreaLabel?: string
  projectClassificationSummary?: string
}

export type LevelConfig = {
  fieldLabel: string
  options: ProjectCategoryNode[]
  depth: number
}

export type OtherFieldCopy = {
  inputLabel: string
  placeholder: string
  helperText: string
  inputName: string
}

export const OTHER_SELECTION_VALUE = 'other-not-listed'

export const OTHER_SELECT_OPTION: ProjectCategoryNode = {
  value: OTHER_SELECTION_VALUE,
  label: 'Other (please specify)',
}

export const FIELD_LABELS_WITH_OTHER = [
  'Branch / Discipline',
  'Program',
  'Branch / Specialization',
  'Project Domain',
  'Project Type',
  'Project Area',
  'Technology / Research Area',
] as const

const FIELD_KEY_BY_LABEL: Record<string, ProjectClassificationFieldKey> = {
  'Branch / Discipline': 'projectBranch',
  Branch: 'projectBranch',
  Program: 'projectProgram',
  'Branch / Specialization': 'projectBranchSpecialization',
  Specialization: 'projectBranchSpecialization',
  'Project Domain': 'projectDomain',
  Domain: 'projectDomain',
  'Project Type': 'projectDomain',
  'Project Area': 'projectDomain',
  'Technology / Research Area': 'projectTechnologyArea',
}

const OTHER_FIELD_COPY: Record<string, OtherFieldCopy> = {
  'Branch / Discipline': {
    inputLabel: 'Your branch / discipline',
    placeholder: 'e.g. Chemical Engineering, Food Technology, Petroleum Engineering',
    helperText: 'Enter your engineering branch or discipline if it is not listed above.',
    inputName: 'projectBranchCustom',
  },
  Program: {
    inputLabel: 'Your program',
    placeholder: 'e.g. B.Tech Chemical Engineering, M.Tech Structural Engineering',
    helperText: 'Enter your degree or program name if it is not listed above.',
    inputName: 'projectProgramCustom',
  },
  'Branch / Specialization': {
    inputLabel: 'Your branch / specialization',
    placeholder: 'e.g. Business Analytics, Environmental Science, VLSI Design',
    helperText: 'Enter your branch or specialization if it is not listed above.',
    inputName: 'projectBranchSpecializationCustom',
  },
  'Project Domain': {
    inputLabel: 'Your project domain',
    placeholder: 'e.g. Smart Agriculture, FinTech Application, Healthcare IoT',
    helperText: 'Describe the project domain or focus area if it is not listed above.',
    inputName: 'projectDomainCustom',
  },
  'Project Type': {
    inputLabel: 'Your project type',
    placeholder: 'e.g. Interdisciplinary Project, Industry-sponsored Project',
    helperText: 'Enter your project type if it is not listed above.',
    inputName: 'projectDomainCustom',
  },
  'Project Area': {
    inputLabel: 'Your project area',
    placeholder: 'e.g. Startup Analysis, Market Entry Strategy, ESG Reporting',
    helperText: 'Enter your project area if it is not listed above.',
    inputName: 'projectDomainCustom',
  },
  'Technology / Research Area': {
    inputLabel: 'Your technology / research area',
    placeholder: 'e.g. Nanotechnology, Computational Biology, Quantum Computing',
    helperText: 'Enter your technology or research focus if it is not listed above.',
    inputName: 'projectTechnologyAreaCustom',
  },
}

export function getCategoryRoots(): ProjectCategoryRoot[] {
  return STUDENT_PROJECT_CATEGORIES
}

export function findCategory(value: string): ProjectCategoryRoot | undefined {
  return STUDENT_PROJECT_CATEGORIES.find((category) => category.value === value)
}

export function findNodeByPath(category: ProjectCategoryRoot, pathValues: string[]): ProjectCategoryNode | undefined {
  let nodes: ProjectCategoryNode[] = category.children
  let current: ProjectCategoryNode | undefined

  for (const value of pathValues) {
    if (isOtherSelection(value)) return undefined
    current = nodes.find((node) => node.value === value)
    if (!current) return undefined
    nodes = current.children ?? []
  }

  return current
}

export function fieldKeyForLabel(fieldLabel: string): ProjectClassificationFieldKey {
  return FIELD_KEY_BY_LABEL[fieldLabel] ?? 'projectDomain'
}

export function fieldSupportsOtherOption(fieldLabel: string): boolean {
  return (FIELD_LABELS_WITH_OTHER as readonly string[]).includes(fieldLabel)
}

export function isOtherSelection(value: string): boolean {
  return value === OTHER_SELECTION_VALUE
}

export function getOtherFieldCopy(fieldLabel: string): OtherFieldCopy {
  return (
    OTHER_FIELD_COPY[fieldLabel] ?? {
      inputLabel: 'Please specify',
      placeholder: 'Enter your selection',
      helperText: 'Provide details if your option is not listed above.',
      inputName: 'projectClassificationCustom',
    }
  )
}

export function getLevelFieldLabel(
  category: ProjectCategoryRoot,
  pathValues: string[],
): string | null {
  if (pathValues.some(isOtherSelection)) return null
  if (pathValues.length === 0) {
    return category.childFieldLabel
  }

  const node = findNodeByPath(category, pathValues)
  if (!node?.children?.length) return null
  return node.childFieldLabel ?? 'Project Domain'
}

export function withOtherOption(options: ProjectCategoryNode[], fieldLabel: string): ProjectCategoryNode[] {
  if (!fieldSupportsOtherOption(fieldLabel)) return options
  if (options.some((option) => option.value === OTHER_SELECTION_VALUE)) return options
  return [...options, OTHER_SELECT_OPTION]
}

export function getLevelOptions(
  category: ProjectCategoryRoot,
  pathValues: string[],
): ProjectCategoryNode[] {
  const fieldLabel = getLevelFieldLabel(category, pathValues)
  let options: ProjectCategoryNode[]

  if (pathValues.some(isOtherSelection)) {
    return []
  }

  if (pathValues.length === 0) {
    options = category.children
  } else {
    const node = findNodeByPath(category, pathValues)
    options = node?.children ?? []
  }

  if (!fieldLabel) return options
  return withOtherOption(options, fieldLabel)
}

export function buildLevelConfigs(category: ProjectCategoryRoot, pathValues: string[]): LevelConfig[] {
  const configs: LevelConfig[] = []
  let currentPath: string[] = []

  while (true) {
    const fieldLabel = getLevelFieldLabel(category, currentPath)
    if (!fieldLabel) break

    const options = getLevelOptions(category, currentPath)
    if (!options.length) break

    configs.push({ fieldLabel, options, depth: currentPath.length })
    const selected = pathValues[currentPath.length]
    if (!selected) break
    if (isOtherSelection(selected)) break

    currentPath = [...currentPath, selected]
  }

  return configs
}

export function buildClassificationPayload(
  categoryValue: string,
  levelSelections: Array<{ fieldLabel: string; value: string; label: string }>,
): ProjectClassificationPayload | null {
  const category = findCategory(categoryValue)
  if (!category) return null

  const payload: ProjectClassificationPayload = {
    projectCategory: category.value,
    projectCategoryLabel: category.label,
  }

  for (const selection of levelSelections) {
    const key = fieldKeyForLabel(selection.fieldLabel)
    const labelKey = `${key}Label` as keyof ProjectClassificationPayload
    ;(payload as Record<string, string>)[key] = selection.value
    ;(payload as Record<string, string>)[labelKey] = selection.label
  }

  const summaryParts = [category.label, ...levelSelections.map((selection) => selection.label)]
  payload.projectClassificationSummary = summaryParts.filter(Boolean).join(' → ')

  return payload
}

export function isCustomOtherTextValid(text: string): boolean {
  return text.trim().length >= 2
}

export function deepestSelectedDepth(pathValues: string[]): number {
  for (let index = pathValues.length - 1; index >= 0; index -= 1) {
    if (pathValues[index]) return index
  }
  return -1
}

export function isClassificationComplete(
  categoryValue: string,
  pathValues: string[],
  customOtherByDepth: Record<number, string> = {},
): boolean {
  const category = findCategory(categoryValue)
  if (!category) return false

  const deepest = deepestSelectedDepth(pathValues)
  if (deepest < 0) return false

  const selectedValue = pathValues[deepest]
  if (isOtherSelection(selectedValue)) {
    return isCustomOtherTextValid(customOtherByDepth[deepest] ?? '')
  }

  const pathToNode = pathValues.slice(0, deepest + 1).filter((value) => !isOtherSelection(value))
  const node = findNodeByPath(category, pathToNode)
  return Boolean(node && !node.children?.length)
}

export function resolveLevelSelection(
  config: LevelConfig,
  value: string,
  customOtherByDepth: Record<number, string>,
): { fieldLabel: string; value: string; label: string } | null {
  if (!value) return null

  if (isOtherSelection(value)) {
    const label = (customOtherByDepth[config.depth] ?? '').trim()
    if (!isCustomOtherTextValid(label)) return null
    return {
      fieldLabel: config.fieldLabel,
      value: OTHER_SELECTION_VALUE,
      label,
    }
  }

  const option = config.options.find((item) => item.value === value)
  if (!option || isOtherSelection(option.value)) return null

  return {
    fieldLabel: config.fieldLabel,
    value: option.value,
    label: option.label,
  }
}

export function formatClassificationSummary(payload: Record<string, unknown> | undefined): string {
  if (!payload) return ''

  const explicit = payload.projectClassificationSummary
  if (typeof explicit === 'string' && explicit.trim()) return explicit

  const parts = [
    payload.projectCategoryLabel,
    payload.projectBranchLabel,
    payload.projectProgramLabel,
    payload.projectBranchSpecializationLabel,
    payload.projectDomainLabel,
    payload.projectTechnologyAreaLabel,
  ].filter((part) => typeof part === 'string' && part.trim())

  if (parts.length > 0) {
    return parts.join(' → ')
  }

  const legacy = payload.projectType
  if (typeof legacy === 'string' && legacy.trim()) {
    return legacy.replaceAll('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase())
  }

  return ''
}
