import { PageSeo } from '@/components/seo/PageSeo'
import { PAGE_SEO } from '@/data/seo'
import { buildPageMetadata } from '@/lib/page-metadata'
import { BlogPage } from '@/views/BlogPage'

export const metadata = buildPageMetadata(PAGE_SEO.blog)

export default function Page() {
  return (
    <>
      <PageSeo seo={PAGE_SEO.blog} />
      <BlogPage />
    </>
  )
}
