'use client'

import { useCallback, useEffect } from 'react'
import { useMotionValue } from 'framer-motion'

export function useSiteCursor(enabled: boolean) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)
  const isActive = useMotionValue(0)

  const centerCursor = useCallback(() => {
    if (typeof window === 'undefined') return
    mouseX.set(window.innerWidth / 2)
    mouseY.set(window.innerHeight * 0.38)
    parallaxX.set(0)
    parallaxY.set(0)
    isActive.set(0)
  }, [mouseX, mouseY, parallaxX, parallaxY, isActive])

  useEffect(() => {
    centerCursor()
    const onResize = () => centerCursor()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [centerCursor])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!enabled) return
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      parallaxX.set(e.clientX / window.innerWidth - 0.5)
      parallaxY.set(e.clientY / window.innerHeight - 0.5)
      isActive.set(1)
    },
    [enabled, mouseX, mouseY, parallaxX, parallaxY, isActive],
  )

  const handleMouseLeave = useCallback(() => {
    centerCursor()
  }, [centerCursor])

  return {
    mouseX,
    mouseY,
    parallaxX,
    parallaxY,
    isActive,
    handleMouseMove,
    handleMouseLeave,
  }
}
