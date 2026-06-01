import { Link } from 'react-router-dom'
import { BrandLogoImage } from '@/components/ui/BrandLogoImage'

interface LogoProps {
  className?: string
  /** Show “Projonexa” wordmark beside the mark (default: true in header/footer) */
  showName?: boolean
}

export function Logo({ className = '', showName = true }: LogoProps) {
  return (
    <Link
      to="/"
      className={`group flex min-w-0 items-center gap-2.5 sm:gap-3 ${className}`}
      aria-label="Projonexa Home"
    >
      <span className="site-logo-mark relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black shadow-glow transition-transform duration-300 group-hover:scale-[1.03] sm:h-9 sm:w-9">
        <BrandLogoImage className="h-full w-full object-contain" decorative />
      </span>
      {showName && (
        <span className="truncate text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
          Projo<span className="text-gradient">nexa</span>
        </span>
      )}
    </Link>
  )
}
