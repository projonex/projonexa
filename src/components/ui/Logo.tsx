import { Link } from 'react-router-dom'
import { BrandLogoImage } from '@/components/ui/BrandLogoImage'

type LogoSize = 'default' | 'large'
type LogoLayout = 'inline' | 'stacked'

interface LogoProps {
  className?: string
  /** Show “Projonexa” wordmark beside the mark (default: true) */
  showName?: boolean
  size?: LogoSize
  layout?: LogoLayout
}

const markSizeClasses: Record<LogoSize, string> = {
  default: 'h-11 w-11 sm:h-10 sm:w-10',
  large: 'h-14 w-14 sm:h-16 sm:w-16',
}

const nameSizeClasses: Record<LogoSize, string> = {
  default: 'text-lg',
  large: 'text-xl sm:text-3xl',
}

export function Logo({
  className = '',
  showName = true,
  size = 'default',
  layout = 'inline',
}: LogoProps) {
  const isStacked = layout === 'stacked'

  return (
    <Link
      to="/"
      className={`group flex min-w-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary ${
        isStacked ? 'flex-col gap-3 text-center' : 'gap-2.5 sm:gap-3'
      } ${className}`}
      aria-label="Projonexa Home"
    >
      <span
        className={`site-logo-mark relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black shadow-glow transition-transform duration-300 group-hover:scale-[1.03] ${markSizeClasses[size]}`}
      >
        <BrandLogoImage
          className="max-h-[92%] max-w-[92%] object-contain"
          decorative
          priority={size === 'default' && layout === 'inline'}
        />
      </span>
      {showName && (
        <span
          className={`truncate font-bold tracking-tight text-zinc-900 dark:text-white ${nameSizeClasses[size]}`}
        >
          Projo<span className="text-gradient">nexa</span>
        </span>
      )}
    </Link>
  )
}
