import { Component, type ErrorInfo, type ReactNode } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Projonexa UI error:', error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 text-center dark:bg-zinc-950">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <AlertTriangle className="h-7 w-7" aria-hidden />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-white">Something went wrong</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          An unexpected error occurred. Refresh the page or return home. If this keeps happening,
          contact us at{' '}
          <a
            href="mailto:nisargalokhande@gmail.com"
            className="font-semibold text-brand-primary hover:underline dark:text-brand-accent"
          >
            nisargalokhande@gmail.com
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="primary" onClick={() => window.location.reload()}>
            Refresh page
          </Button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-black/[0.08] px-6 py-3 text-sm font-semibold text-zinc-800 dark:border-white/[0.1] dark:text-zinc-200"
            onClick={() => this.setState({ hasError: false })}
          >
            Back to home
          </Link>
        </div>
      </div>
    )
  }
}
