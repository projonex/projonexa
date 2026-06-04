import { Layout } from '@/components/layout/Layout'
import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { NotFoundPage } from '@/views/NotFoundPage'

/** 404 with site header/footer — matches pre-Next routed 404 inside layout. */
export function SiteNotFound() {
  return (
    <Layout>
      <PageSeo seo={PAGE_SEO.notFound} />
      <NotFoundPage />
    </Layout>
  )
}
