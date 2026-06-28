'use client'

import { useEffect, useState } from 'react'
import { WifiSlash } from '@phosphor-icons/react'

export function OfflineBanner() {
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    setOffline(!navigator.onLine)
    const onOffline = () => setOffline(true)
    const onOnline = () => setOffline(false)
    window.addEventListener('offline', onOffline)
    window.addEventListener('online', onOnline)
    return () => {
      window.removeEventListener('offline', onOffline)
      window.removeEventListener('online', onOnline)
    }
  }, [])

  if (!offline) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-[var(--amber)]/40 bg-[var(--surface)] px-4 py-2 shadow-lg text-sm font-medium text-[var(--amber)]"
    >
      <WifiSlash size={16} weight="fill" />
      You&apos;re offline &mdash; cached guides still available
    </div>
  )
}
