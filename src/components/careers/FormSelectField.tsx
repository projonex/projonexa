import { ChevronDown } from 'lucide-react'
import type { ReactNode, SelectHTMLAttributes } from 'react'

const labelClass = 'mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200'

interface FormSelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: ReactNode
  children: ReactNode
}

export function FormSelectField({ id, label, children, className = '', ...props }: FormSelectFieldProps) {
  return (
    <div className="careers-form-field w-full min-w-0">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="careers-form-select-wrap relative">
        <select
          id={id}
          {...props}
          className={`careers-form-select peer w-full min-w-0 ${className}`}
        >
          {children}
        </select>
        <span
          className="pointer-events-none absolute inset-y-0 right-0 flex w-11 items-center justify-center text-zinc-500 transition-colors peer-focus-visible:text-brand-primary dark:text-zinc-400 dark:peer-focus-visible:text-brand-accent"
          aria-hidden
        >
          <ChevronDown className="h-5 w-5 shrink-0" strokeWidth={2.25} />
        </span>
      </div>
    </div>
  )
}
