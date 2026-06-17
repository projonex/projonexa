'use client'

import { ArrowRight } from 'lucide-react'
import { BlogCard } from '@/components/blog/BlogCard'
import { Button } from '@/components/ui/Button'
import { BLOG_SECTION, getPostsByCategory } from '@/data/blog'

export function BlogPreview() {
  const latestPosts = getPostsByCategory('all').slice(0, 3)

  return (
    <section className="section-padding border-t border-black/[0.05] dark:border-white/[0.06]">
      <div className="container-wide">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary dark:text-brand-accent">
              {BLOG_SECTION.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
              Guides that help you ship smarter projects
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
              Practical articles on final year topics, AI, startups, IoT, and career — written to
              answer real student and founder questions across India.
            </p>
          </div>
          <Button to="/blog" variant="secondary" className="group shrink-0">
            View all articles
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
