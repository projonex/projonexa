import type { BlogPost, BlogSection } from '@/data/blog'

function BlogSectionBlock({ section }: { section: BlogSection }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white md:text-2xl">
        {section.heading}
      </h2>
      {section.paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
        >
          {paragraph}
        </p>
      ))}
      {section.bullets && section.bullets.length > 0 && (
        <ul className="mt-4 space-y-2">
          {section.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex gap-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary dark:bg-brand-accent" />
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <article
      itemScope
      itemType="https://schema.org/BlogPosting"
      className="blog-post-content"
    >
      <meta itemProp="headline" content={post.title} />
      <meta itemProp="datePublished" content={post.date} />
      <meta itemProp="author" content={post.author} />

      <div
        data-aeo="quick-answer"
        className="rounded-2xl border border-brand-primary/20 bg-brand-primary/[0.06] p-6 dark:border-brand-accent/20 dark:bg-brand-accent/[0.06]"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-primary dark:text-brand-accent">
          Quick answer
        </p>
        <p
          itemProp="description"
          className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300"
        >
          {post.quickAnswer}
        </p>
      </div>

      <div className="mt-10">
        {post.sections.map((section, i) => (
          <BlogSectionBlock key={i} section={section} />
        ))}
      </div>

      {post.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2 border-t border-black/[0.06] pt-8 dark:border-white/[0.08]">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-400"
            >
              #{tag.replace(/\s+/g, '-').toLowerCase()}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
