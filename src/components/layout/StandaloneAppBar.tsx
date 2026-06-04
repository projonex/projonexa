'use client'

import Link from 'next/link'
import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { useTheme } from '@/context/ThemeContext'

interface StandaloneAppBarProps {
  backTo: string
  backLabel: string
}

export function StandaloneAppBar({ backTo, backLabel }: StandaloneAppBarProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header
      className="standalone-app-bar sticky top-0 z-30 border-b border-black/[0.06] bg-white/90 shadow-sm backdrop-blur-md dark:border-white/[0.08] dark:bg-zinc-950/90"
      style={{ paddingTop: 'max(0px, env(safe-area-inset-top))' }}
    >
      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[3.75rem] sm:px-6">
        <Link
          href={backTo}
          className="inline-flex h-10 min-w-0 max-w-[42%] items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 px-3 text-sm font-medium text-zinc-600 shadow-sm transition-colors hover:border-brand-primary/30 hover:text-brand-primary dark:border-white/[0.1] dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:text-brand-accent sm:max-w-none sm:px-4"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          <span className="truncate">{backLabel}</span>
        </Link>

        <Logo
          placement="nav"
          layout="inline"
          showName
          className="standalone-app-bar__logo pointer-events-auto absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
        />

        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white/80 text-zinc-700 shadow-sm transition-colors hover:border-brand-primary/30 hover:text-brand-primary dark:border-white/[0.1] dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:text-brand-accent"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  )
}
