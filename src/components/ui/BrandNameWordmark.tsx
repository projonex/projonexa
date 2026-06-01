interface BrandNameWordmarkProps {
  className?: string
}

/** Inline “Projonexa” wordmark — capital P, gradient “x” accent */
export function BrandNameWordmark({ className = '' }: BrandNameWordmarkProps) {
  return (
    <span className={['site-brand-name', className].filter(Boolean).join(' ')} aria-hidden>
      <span className="site-brand-name-text">Projone</span>
      <span className="site-brand-name-x">x</span>
      <span className="site-brand-name-text">a</span>
    </span>
  )
}
