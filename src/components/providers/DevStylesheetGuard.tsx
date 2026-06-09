'use client'

import { recoverStylesIfNeeded } from '@/lib/styles-health'
import { useEffect } from 'react'

const DEV_CHECK_INTERVAL_MS = 45_000

/**
 * Next.js 15 dev HMR can drop global CSS after the tab idles or Fast Refresh runs.
 * This guard detects missing Tailwind styles and reloads once to restore the UI.
 */
export function DevStylesheetGuard() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const check = () => recoverStylesIfNeeded()

    const onVisible = () => {
      if (document.visibilityState === 'visible') check()
    }

    const onStylesheetError = (event: Event) => {
      const target = event.target
      if (target instanceof HTMLLinkElement && target.rel === 'stylesheet') {
        check()
      }
    }

    const intervalId = window.setInterval(check, DEV_CHECK_INTERVAL_MS)
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus', check)
    document.addEventListener('error', onStylesheetError, true)

    return () => {
      window.clearInterval(intervalId)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', check)
      document.removeEventListener('error', onStylesheetError, true)
    }
  }, [])

  return null
}
