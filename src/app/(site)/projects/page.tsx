import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/page-metadata'
import { ProjectsPage } from '@/views/ProjectsPage'

export const metadata = buildPageMetadata(PAGE_SEO.projects)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.projects} />
      <ProjectsPage />
    </>
  )
}
