'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BlogCard } from '@/components/blog/BlogCard'
import { BlogCategoryFilter } from '@/components/blog/BlogCategoryFilter'
import { SiteAeoBlock } from '@/components/seo/SiteAeoBlock'
import { PageHeader } from '@/components/ui/PageHeader'
import { BLOG_AEO_DEFINITION } from '@/data/blog-aeo'
import {
  BLOG_CATEGORIES,
  BLOG_SECTION,
  type BlogCategoryId,
  getFeaturedPost,
  getPostsByCategory,
} from '@/data/blog'
import { BLOG_PAGE_FAQ } from '@/data/seo'

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategoryId | 'all'>('all')
  const featured = getFeaturedPost()
  const posts = useMemo(() => getPostsByCategory(activeCategory), [activeCategory])
  const gridPosts = useMemo(
    () => posts.filter((post) => post.id !== featured?.id || activeCategory !== 'all'),
    [posts, featured, activeCategory],
  )

  return (
    <>
      <PageHeader
        eyebrow={BLOG_SECTION.eyebrow}
        title={BLOG_SECTION.title}
        description={BLOG_SECTION.lead}
      />

      <section className="border-b border-black/[0.06] pb-10 dark:border-white/[0.06]">
        <div className="container-wide">
          <BlogCategoryFilter
            categories={BLOG_CATEGORIES}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </section>

      {featured && activeCategory === 'all' && (
        <section className="section-padding !pt-10 !pb-8">
          <div className="container-wide">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand-primary dark:text-brand-accent">
              Featured article
            </p>
            <BlogCard post={featured} variant="featured" />
          </div>
        </section>
      )}

      <section className="section-padding !pt-6">
        <div className="container-wide">
          {activeCategory !== 'all' && (
            <motion.p
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400"
            >
              {BLOG_CATEGORIES.find((c) => c.id === activeCategory)?.description}
            </motion.p>
          )}

          {gridPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-center text-zinc-600 dark:text-zinc-400">
              No articles in this category yet. Check back soon.
            </p>
          )}
        </div>
      </section>

      <section className="section-padding border-t border-black/[0.06] bg-zinc-50/50 dark:border-white/[0.06] dark:bg-transparent">
        <div className="container-wide">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-primary dark:text-brand-accent">
            Browse by topic
          </p>
          <h2 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
            Find the guidance you need
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            From understanding Projonexa services to mastering final year projects, AI, and startup
            builds — pick a topic and read in depth.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className="rounded-2xl border border-black/[0.06] bg-white/70 p-5 text-left transition-colors hover:border-brand-primary/30 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-brand-accent/30"
              >
                <span
                  className="inline-block h-2 w-8 rounded-full"
                  style={{ backgroundColor: category.color }}
                  aria-hidden
                />
                <h3 className="mt-3 font-semibold text-zinc-900 dark:text-white">{category.label}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{category.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <SiteAeoBlock
        eyebrow="About Projonexa"
        headline="Projonexa — Premium Technology Services in India"
        definition={BLOG_AEO_DEFINITION}
        faqItems={BLOG_PAGE_FAQ}
        className="border-t border-black/[0.06] dark:border-white/[0.06]"
      />
    </>
  )
}
