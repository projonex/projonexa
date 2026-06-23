import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export const SITE_AEO_PILLARS = [
  { label: 'Services', path: '/services', hint: 'Full technology portfolio' },
  { label: 'Client solutions', path: '/client-projects', hint: 'Startups & businesses' },
  { label: 'College projects', path: '/college-projects', hint: 'Final year & mini engineering' },
  { label: 'Contact', path: '/contact', hint: 'Get a response in 24h' },
] as const

export function SiteAeoPillarLinks({ className = '' }: { className?: string }) {
  return (
    <nav
      aria-label="Projonexa guides and contact"
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {SITE_AEO_PILLARS.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/70 px-3.5 py-2 text-xs font-semibold text-zinc-800 transition-colors hover:border-brand-primary/35 hover:text-brand-primary dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:text-brand-accent"
        >
          {item.label}
          <ArrowUpRight className="h-3 w-3 opacity-70" aria-hidden />
        </Link>
      ))}
    </nav>
  )
}
