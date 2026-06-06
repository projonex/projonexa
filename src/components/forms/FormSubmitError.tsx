export function FormSubmitError({ message }: { message: string }) {
  if (!message) return null
  return (
    <p
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
    >
      {message}
    </p>
  )
}
