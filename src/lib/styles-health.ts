let reloadScheduled = false

/** Detect whether Tailwind/global CSS is still applied (dev HMR can drop styles after idle). */
export function isGlobalStylesHealthy(): boolean {
  if (typeof document === 'undefined' || !document.body) return true

  const probe = document.createElement('div')
  probe.className = 'hidden'
  probe.setAttribute('aria-hidden', 'true')
  document.body.appendChild(probe)
  const tailwindUtilitiesActive = getComputedStyle(probe).display === 'none'
  document.body.removeChild(probe)

  const hasLinkedStyles = document.querySelector('link[rel="stylesheet"][href*="_next"]') !== null
  const hasNextStyleTags =
    document.querySelector('style[data-n-href]') !== null ||
    document.querySelector('style[data-next-hide-fouc]') !== null

  // Dev mode may inject CSS via <style> tags instead of <link>.
  const hasInjectedStyles = document.querySelectorAll('style').length >= 2

  return tailwindUtilitiesActive && (hasLinkedStyles || hasNextStyleTags || hasInjectedStyles)
}

/** Reload once when global CSS is missing (Next.js dev HMR regression after long idle). */
export function recoverStylesIfNeeded(): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return
  if (reloadScheduled || isGlobalStylesHealthy()) return

  reloadScheduled = true
  console.warn('[Projonexa] Global styles missing — reloading to restore CSS')
  window.location.reload()
}
