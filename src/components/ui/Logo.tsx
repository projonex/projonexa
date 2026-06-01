import { Link } from 'react-router-dom'
import { BrandLogoImage } from '@/components/ui/BrandLogoImage'
import { BrandNameWordmark } from '@/components/ui/BrandNameWordmark'

type LogoPlacement = 'nav' | 'footer' | 'prominent'
type LogoLayout = 'inline' | 'stacked'

interface LogoProps {
  className?: string
  showName?: boolean
  placement?: LogoPlacement
  layout?: LogoLayout
}

const nameSizeClass: Record<LogoPlacement, string> = {
  nav: 'site-brand-name--default',
  footer: 'site-brand-name--footer',
  prominent: 'site-brand-name--large',
}

export function Logo({
  className = '',
  showName = true,
  placement = 'nav',
  layout = 'inline',
}: LogoProps) {
  const isStacked = layout === 'stacked'
  const isProminent = placement === 'prominent'

  return (
    <Link
      to="/"
      className={[
        'site-brand-link group',
        isStacked ? 'site-brand-link--stacked' : 'site-brand-link--inline',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Projonexa Home"
    >
      <span
        className={[
          'site-logo-mark',
          isProminent ? 'site-logo-mark--large' : 'site-logo-mark--default',
        ].join(' ')}
      >
        <BrandLogoImage
          className="site-logo-image"
          decorative
          priority={placement === 'nav' && !isStacked}
        />
      </span>
      {showName && <BrandNameWordmark className={nameSizeClass[placement]} />}
    </Link>
  )
}
