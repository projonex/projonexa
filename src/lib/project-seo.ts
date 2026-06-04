import { BRAND } from '@/data/brand'
import { getProjectBySlug, projectPath } from '@/data/projects'
import { BASE_KEYWORDS, type PageSEO } from '@/data/seo'

export function buildProjectSEO(project: NonNullable<ReturnType<typeof getProjectBySlug>>): PageSEO {
  const thumb = project.thumbnailUrl
  const ogImage = thumb.startsWith('http') ? thumb : thumb.startsWith('/') ? thumb : undefined

  return {
    title: `${project.name} | Projects | ${BRAND.name}`,
    description: project.description,
    shareTitle: `${project.name} | ${BRAND.name}`,
    shareDescription: project.tagline || project.description,
    ogImage,
    ogImageAlt: `${project.name} — ${BRAND.name} project`,
    keywords: [...BASE_KEYWORDS, project.name, project.category, ...project.techStack],
    path: projectPath(project.id),
    primaryKeyword: project.name,
    secondaryKeywords: [project.category, ...project.techStack.slice(0, 3)],
    intent: 'informational',
    audience: 'mixed',
    conversionGoal: 'explore-projects',
    breadcrumb: [
      { name: 'Projects', path: '/projects' },
      { name: project.name, path: projectPath(project.id) },
    ],
  }
}
