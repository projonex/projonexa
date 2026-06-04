import { PageSeo } from '@/components/seo/PageSeo'
import { getProjectBySlug, MY_PROJECTS } from '@/data/projects'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { buildProjectSEO } from '@/lib/seo/project-seo'
import { ProjectDetailPage } from '@/views/ProjectDetailPage'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return MY_PROJECTS.map((project) => ({ slug: project.id }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return buildPageMetadata(PAGE_SEO.notFound)
  return buildPageMetadata(buildProjectSEO(project))
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  const seo = project ? buildProjectSEO(project) : PAGE_SEO.notFound

  return (
    <>
      <PageSeo seo={seo} />
      <ProjectDetailPage slug={slug} />
    </>
  )
}
