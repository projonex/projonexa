import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/page-metadata'
import { ClientProjectsPage } from '@/views/ClientProjectsPage'

export const metadata = buildPageMetadata(PAGE_SEO.clientProjects)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.clientProjects} />
      <ClientProjectsPage />
    </>
  )
}
