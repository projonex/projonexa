import { BRAND } from '@/data/brand'
import { blogPath, getBlogBySlug, getBlogCategory } from '@/data/blog'
import { BASE_KEYWORDS, type PageSEO } from '@/data/seo'

export function buildBlogSEO(post: NonNullable<ReturnType<typeof getBlogBySlug>>): PageSEO {
  const category = getBlogCategory(post.category)
  const path = blogPath(post.id)

  return {
    title: `${post.title} | Blog | ${BRAND.name}`,
    description: post.excerpt,
    shareTitle: post.title,
    shareDescription: post.quickAnswer.slice(0, 200),
    keywords: [...BASE_KEYWORDS, ...post.keywords, ...post.tags, category?.label ?? ''],
    path,
    primaryKeyword: post.keywords[0] ?? post.tags[0] ?? 'engineering project guide',
    secondaryKeywords: post.keywords.slice(1, 4),
    intent: 'informational',
    audience: post.category === 'startups' ? 'startups' : 'students',
    conversionGoal: 'read-blog',
    aeoQuestions: post.faq.map((item) => item.question),
    faqItems: post.faq,
    faqSchema: true,
    breadcrumb: [
      { name: 'Blog', path: '/blog' },
      { name: post.title, path },
    ],
    article: {
      headline: post.title,
      datePublished: post.date,
      dateModified: post.date,
      author: post.author,
      keywords: post.keywords,
    },
  }
}
