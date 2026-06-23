'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, ChevronRight, Clock, User } from 'lucide-react'
import Link from 'next/link'
import { BlogCard } from '@/components/blog/BlogCard'
import { BlogPostContent } from '@/components/blog/BlogPostContent'
import { SiteAeoBlock } from '@/components/seo/SiteAeoBlock'
import { CTA } from '@/components/sections/CTA'
import { Button } from '@/components/ui/Button'
import {
  getBlogBySlug,
  getBlogCategory,
  getRelatedPosts,
} from '@/data/blog'
import { NotFoundPage } from '@/views/NotFoundPage'

const easeSmooth = [0.22, 1, 0.36, 1] as const

export function BlogDetailPage({ slug }: { slug: string }) {
  const post = getBlogBySlug(slug)

  if (!post) {
    return <NotFoundPage />
  }

  const category = getBlogCategory(post.category)
  const related = getRelatedPosts(post)

  return (
    <div className="blog-detail-page">
      <section className="relative border-b border-black/[0.06] bg-zinc-50/90 pt-20 backdrop-blur-sm dark:border-white/[0.06] dark:bg-zinc-950/80 sm:pt-24 md:pt-28">
        <div className="container-wide px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeSmooth }}
          >
            <Link
              href="/blog"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-zinc-100/80 px-3.5 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:border-brand-primary/25 hover:bg-brand-primary/10 hover:text-brand-mid dark:border-white/[0.1] dark:bg-white/[0.06] dark:text-zinc-300 dark:hover:text-brand-accent"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All articles
            </Link>

            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400"
            >
              <Link
                href="/blog"
                className="font-medium transition-colors hover:text-brand-primary dark:hover:text-brand-accent"
              >
                Blog
              </Link>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />
              <span className="font-semibold text-zinc-900 dark:text-white">{category?.label}</span>
            </nav>

            <span
              className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: `${category?.color ?? '#6C63FF'}20`,
                color: category?.color ?? '#6C63FF',
              }}
            >
              {category?.label}
            </span>

            <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-500">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden />
                {new Date(post.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden />
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <BlogPostContent post={post} />
          </div>
        </div>
      </section>

      {post.faq.length > 0 && (
        <SiteAeoBlock
          headline={`FAQ — ${post.title}`}
          faqItems={post.faq}
          className="border-t border-black/[0.06] dark:border-white/[0.06]"
        />
      )}

      <section className="section-padding border-t border-black/[0.06] bg-zinc-50/50 dark:border-white/[0.06] dark:bg-transparent">
        <div className="container-wide">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-primary dark:text-brand-accent">
                Related reading
              </p>
              <h2 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
                More in {category?.label}
              </h2>
            </div>
            <Button to="/blog" variant="secondary">
              View all articles
            </Button>
          </div>
          {related.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost, i) => (
                <BlogCard key={relatedPost.id} post={relatedPost} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-zinc-600 dark:text-zinc-400">
              Explore more guides on{' '}
              <Link href="/blog" className="font-semibold text-brand-primary dark:text-brand-accent">
                our blog
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      <CTA />
    </div>
  )
}
