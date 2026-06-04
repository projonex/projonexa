import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { AboutPage } from '@/views/AboutPage'

export const metadata = buildPageMetadata(PAGE_SEO.about)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.about} />
      <AboutPage />
    </>
  )
}
