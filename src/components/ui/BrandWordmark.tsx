import { BrandLogoImage } from '@/components/ui/BrandLogoImage'

type BrandWordmarkVariant = 'subtle' | 'on-gradient'

interface BrandWordmarkProps {
  variant?: BrandWordmarkVariant
  className?: string
}

export function BrandWordmark({ variant = 'subtle', className = '' }: BrandWordmarkProps) {
  return (
    <div
      className={`brand-wordmark brand-wordmark--${variant} ${className}`.trim()}
      aria-hidden
    >
      <BrandLogoImage className="brand-wordmark-image" decorative />
    </div>
  )
}
