'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-8 h-8" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-[10px] border border-[var(--border)] bg-[var(--surface-alt)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary)] outline-none"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
