import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { BRAND, FOUNDER } from '@/data/brand'
import { FOOTER_LINKS } from '@/data/navigation'
import { Logo } from '@/components/ui/Logo'

export function Footer() {
  return (
    <footer
      className="border-t border-black/5 bg-zinc-50 dark:border-white/[0.06] dark:bg-surface-elevated"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <meta itemProp="name" content={BRAND.name} />
      <meta itemProp="url" content={BRAND.url} />
      <link itemProp="sameAs" href={FOUNDER.linkedin} />
      <div className="container-wide section-padding !py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">{BRAND.tagline}</p>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
              End-to-end project development for students, colleges, startups, and businesses —
              across India and globally.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Company</h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-zinc-600 transition-colors hover:text-brand-primary dark:text-zinc-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Resources</h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-zinc-600 transition-colors hover:text-brand-primary dark:text-zinc-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${FOUNDER.email}`}
                  className="flex items-center gap-2 text-sm text-zinc-600 hover:text-brand-primary dark:text-zinc-400"
                  itemProp="email"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {FOUNDER.email}
                </a>
              </li>
              <li
                className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                <span>
                  <span itemProp="addressRegion">Maharashtra</span>,{' '}
                  <span itemProp="addressCountry">India</span>
                </span>
              </li>
              <li className="flex gap-3 pt-2">
                <a
                  href={FOUNDER.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-brand-primary/10 hover:text-brand-primary dark:text-zinc-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={FOUNDER.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-brand-primary/10 hover:text-brand-primary dark:text-zinc-400"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-8 dark:border-white/[0.06] sm:flex-row">
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            Founded by {FOUNDER.name} · {FOUNDER.location}
          </p>
        </div>
      </div>
    </footer>
  )
}
