import { motion } from 'framer-motion'
import { ArrowLeft, FileQuestion, Home, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/seo/SEO'
import { SiteAeoPillarLinks } from '@/components/seo/SiteAeoPillarLinks'
import { Button } from '@/components/ui/Button'
import { PAGE_SEO } from '@/data/seo'

const easeSmooth = [0.22, 1, 0.36, 1] as const

const QUICK_LINKS = [
  { label: 'College projects', path: '/college-projects' },
  { label: 'Client & MVP', path: '/client-projects' },
  { label: 'Services', path: '/services' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
] as const

export function NotFoundPage() {
  return (
    <>
      <SEO seo={PAGE_SEO.notFound} />
      <section className="section-padding">
        <div className="container-narrow px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeSmooth }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-brand-primary dark:text-brand-accent">
              <FileQuestion className="h-8 w-8" aria-hidden />
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary dark:text-brand-accent">
              Error 404
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Page not found
            </h1>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              The link may be outdated or mistyped. Head back home or choose one of our main pages
              below — college projects, client MVPs, pricing, and contact are all one click away.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Button to="/" variant="primary" className="shadow-glow-sm">
                <Home className="h-4 w-4" aria-hidden />
                Back to home
              </Button>
              <Button to="/contact" variant="secondary">
                <Mail className="h-4 w-4" aria-hidden />
                Contact us
              </Button>
              <Button
                variant="ghost"
                className="border border-black/[0.08] dark:border-white/[0.1]"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Go back
              </Button>
            </div>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: easeSmooth }}
            aria-label="Popular pages"
            className="mx-auto mt-12 max-w-xl rounded-2xl border border-black/[0.07] bg-white/60 p-6 dark:border-white/[0.08] dark:bg-white/[0.03]"
          >
            <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              Popular pages
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {QUICK_LINKS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="inline-flex rounded-full border border-black/[0.08] bg-white/80 px-3.5 py-2 text-xs font-semibold text-zinc-800 transition-colors hover:border-brand-primary/35 hover:text-brand-primary dark:border-white/[0.1] dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:text-brand-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <div className="mx-auto mt-8 flex justify-center">
            <SiteAeoPillarLinks />
          </div>
        </div>
      </section>
    </>
  )
}
