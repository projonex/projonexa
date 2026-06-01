import { Link } from 'react-router-dom'
import { BrandLogoImage } from '@/components/ui/BrandLogoImage'

type LogoPlacement = 'nav' | 'footer' | 'prominent'
type LogoLayout = 'inline' | 'stacked'

interface LogoProps {
  className?: string
  showName?: boolean
  placement?: LogoPlacement
  layout?: LogoLayout
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
      {showName && (
        <span
          className={[
            'site-brand-name',
            placement === 'footer' && 'site-brand-name--footer',
            isProminent && 'site-brand-name--large',
            !isProminent && placement === 'nav' && 'site-brand-name--default',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="site-brand-name-projo">Projo</span>
          <span className="site-brand-name-nexa">nexa</span>
        </span>
      )}
    </Link>
  )
}
