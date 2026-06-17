'use client'

import type { BlogCategory, BlogCategoryId } from '@/data/blog'

interface BlogCategoryFilterProps {
  categories: BlogCategory[]
  active: BlogCategoryId | 'all'
  onChange: (id: BlogCategoryId | 'all') => void
}

export function BlogCategoryFilter({ categories, active, onChange }: BlogCategoryFilterProps) {
  const pills: { id: BlogCategoryId | 'all'; label: string }[] = [
    { id: 'all', label: 'All topics' },
    ...categories.map((cat) => ({ id: cat.id, label: cat.label })),
  ]

  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filter blog posts by category"
    >
      {pills.map((pill) => {
        const isActive = active === pill.id
        return (
          <button
            key={pill.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(pill.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'border-brand-primary/40 bg-brand-primary/15 text-brand-primary dark:border-brand-accent/40 dark:bg-brand-accent/10 dark:text-brand-accent'
                : 'border-black/[0.08] bg-white/60 text-zinc-600 hover:border-brand-primary/25 hover:text-brand-primary dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-400 dark:hover:text-brand-accent'
            }`}
          >
            {pill.label}
          </button>
        )
      })}
    </div>
  )
}
