'use client'

import { ThemeProvider } from '@/context/ThemeContext'
import type { ReactNode } from 'react'

export function AppProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
