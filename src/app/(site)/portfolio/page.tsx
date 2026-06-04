import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/page-metadata'
import { PortfolioPage } from '@/views/PortfolioPage'

export const metadata = buildPageMetadata(PAGE_SEO.portfolio)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.portfolio} />
      <PortfolioPage />
    </>
  )
}
