import { motion } from 'framer-motion'
import { BrandWordmark } from '@/components/ui/BrandWordmark'

interface PageHeaderProps {
  title: string
  description: string
  eyebrow?: string
  showWordmark?: boolean
}

export function PageHeader({ title, description, eyebrow, showWordmark = true }: PageHeaderProps) {
  return (
    <section className="page-header-band">
      <div className="container-narrow page-header-inner px-4 sm:px-6 lg:px-8">
        <div className="page-header-content">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-primary"
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-pretty text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="page-header-description mt-4 text-pretty text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg"
          >
            {description}
          </motion.p>
        </div>

        {showWordmark && <BrandWordmark variant="subtle" className="page-header-wordmark" />}
      </div>
    </section>
  )
}
