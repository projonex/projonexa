'use client'

import { Calendar, Clock, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { BlogPost } from '@/data/blog'
import { blogPath, getBlogCategory } from '@/data/blog'

interface BlogCardProps {
  post: BlogPost
  index?: number
  variant?: 'default' | 'featured'
}

export function BlogCard({ post, index = 0, variant = 'default' }: BlogCardProps) {
  const category = getBlogCategory(post.category)
  const isFeatured = variant === 'featured'

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={
        isFeatured
          ? 'group relative overflow-hidden rounded-3xl border border-black/[0.06] bg-gradient-to-br from-brand-primary/[0.06] via-white to-brand-secondary/[0.04] p-8 shadow-sm transition-shadow hover:shadow-glow dark:border-white/[0.08] dark:from-brand-primary/[0.08] dark:via-zinc-900/80 dark:to-brand-secondary/[0.06] md:p-10'
          : 'group glass flex h-full flex-col rounded-2xl p-6 transition-shadow hover:shadow-glow'
      }
    >
      <Link href={blogPath(post.id)} className="flex h-full flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="w-fit rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              backgroundColor: `${category?.color ?? '#6C63FF'}20`,
              color: category?.color ?? '#6C63FF',
            }}
          >
            {category?.label ?? post.category}
          </span>
          {post.featured && !isFeatured && (
            <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-300">
              Featured
            </span>
          )}
        </div>

        <h3
          className={
            isFeatured
              ? 'mt-5 text-2xl font-bold text-zinc-900 group-hover:text-brand-primary dark:text-white md:text-3xl'
              : 'mt-4 text-lg font-semibold text-zinc-900 group-hover:text-brand-primary dark:text-white'
          }
        >
          {post.title}
        </h3>

        <p
          className={
            isFeatured
              ? 'mt-3 flex-1 text-base text-zinc-600 dark:text-zinc-400'
              : 'mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400'
          }
        >
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              {new Date(post.date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {post.readTime}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary opacity-0 transition-opacity group-hover:opacity-100 dark:text-brand-accent">
            Read
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
