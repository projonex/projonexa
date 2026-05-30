import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { PageHeader } from '@/components/ui/PageHeader'
import { CTA } from '@/components/sections/CTA'
import { FAQ_ITEMS } from '@/data/faq'
import { PAGE_SEO } from '@/data/seo'

function FAQAccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  id: string
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <article
      className="border-b border-black/5 dark:border-white/[0.06]"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <h2 className="sr-only">{question}</h2>
      <button
        type="button"
        id={`${id}-button`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
      >
        <span className="font-semibold text-zinc-900 dark:text-white" itemProp="name">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brand-primary transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
          >
            <p
              className="pb-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
              itemProp="text"
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <>
      <SEO seo={PAGE_SEO.faq} />
      <PageHeader
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about Projonexa — project types, deliverables, timelines, pricing, and support for students and clients in India."
      />
      <section className="section-padding" aria-labelledby="faq-list-heading">
        <h2 id="faq-list-heading" className="sr-only">
          Projonexa FAQ
        </h2>
        <div
          className="container-narrow glass rounded-2xl px-6 sm:px-8"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {FAQ_ITEMS.map((item, i) => (
            <FAQAccordionItem
              key={item.question}
              id={`faq-${i}`}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </section>
      <CTA />
    </>
  )
}
