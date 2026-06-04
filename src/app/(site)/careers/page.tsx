import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/page-metadata'
import { CareersPage } from '@/views/CareersPage'

export const metadata = buildPageMetadata(PAGE_SEO.careers)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.careers} />
      <CareersPage />
    </>
  )
}
