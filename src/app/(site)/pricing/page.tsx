import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { PricingPage } from '@/views/PricingPage'

export const metadata = buildPageMetadata(PAGE_SEO.pricing)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.pricing} />
      <PricingPage />
    </>
  )
}
