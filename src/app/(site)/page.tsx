import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/page-metadata'
import { HomePage } from '@/views/HomePage'

export const metadata = buildPageMetadata(PAGE_SEO.home)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.home} />
      <HomePage />
    </>
  )
}
