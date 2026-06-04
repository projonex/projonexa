import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { CollegeProjectsPage } from '@/views/CollegeProjectsPage'

export const metadata = buildPageMetadata(PAGE_SEO.collegeProjects)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.collegeProjects} />
      <CollegeProjectsPage />
    </>
  )
}
