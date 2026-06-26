import { Warning } from '@phosphor-icons/react/dist/ssr'

interface ErrorBannerProps {
  message: string
  onRetry: () => void
}

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="flex items-center justify-between gap-3 rounded-xl border border-[var(--red)]/30 bg-[var(--red)]/10 px-4 py-3 text-sm text-[var(--red)]"
    >
      <div className="flex items-center gap-2">
        <Warning size={16} />
        <span>{message}</span>
      </div>
      <button
        onClick={onRetry}
        className="shrink-0 rounded-md px-3 py-1 text-xs font-semibold border border-[var(--red)]/40 hover:bg-[var(--red)]/20 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--red)] outline-none"
      >
        Retry
      </button>
    </div>
  )
}
