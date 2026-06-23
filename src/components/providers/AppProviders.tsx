'use client'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import { DevStylesheetGuard } from '@/components/providers/DevStylesheetGuard'
import { ThemeProvider } from '@/context/ThemeContext'
import type { ReactNode } from 'react'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <DevStylesheetGuard />
        {children}
      </ErrorBoundary>
    </ThemeProvider>
  )
}
