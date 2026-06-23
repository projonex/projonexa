import { PageSeo } from '@/components/seo/PageSeo'
import { BLOG_POSTS, getBlogBySlug } from '@/data/blog'
import { PAGE_SEO } from '@/data/seo'
import { buildBlogSEO } from '@/lib/seo/blog-seo'
import { buildPageMetadata } from '@/lib/seo/page-metadata'
import { BlogDetailPage } from '@/views/BlogDetailPage'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.id }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) return buildPageMetadata(PAGE_SEO.notFound)
  return buildPageMetadata(buildBlogSEO(post))
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  const seo = post ? buildBlogSEO(post) : PAGE_SEO.notFound

  return (
    <>
      <PageSeo seo={seo} />
      <BlogDetailPage slug={slug} />
    </>
  )
}
