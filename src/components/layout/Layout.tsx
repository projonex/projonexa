'use client'

import { usePathname } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { SiteAmbientBackground } from './SiteAmbientBackground'
import { useSiteCursor } from '@/hooks/useSiteCursor'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const showCursor = !reducedMotion

  const {
    mouseX,
    mouseY,
    parallaxX,
    parallaxY,
    isActive,
    handleMouseMove,
    handleMouseLeave,
  } = useSiteCursor(showCursor)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div
      className="relative min-h-screen text-zinc-900 dark:text-zinc-100"
      onMouseMove={showCursor ? handleMouseMove : undefined}
      onMouseLeave={showCursor ? handleMouseLeave : undefined}
    >
      <SiteAmbientBackground
        reducedMotion={reducedMotion}
        showCursor={showCursor}
        mouseX={mouseX}
        mouseY={mouseY}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        isActive={isActive}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-900 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:bg-zinc-900 dark:focus:text-zinc-100 dark:focus:ring-zinc-100"
      >
        Skip to main content
      </a>

      <Header />
      <main
        id="main-content"
        className="relative z-10 min-w-0 overflow-x-clip"
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
