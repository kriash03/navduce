'use client'

import {
  Translate,
  HandsPraying,
  CurrencyDollar,
  ForkKnife,
  GraduationCap,
} from '@phosphor-icons/react'
import { useGuideStore } from '@/store/guide-store'
import type { TabKey } from '@/lib/types'

const NAV_ITEMS: { key: TabKey; label: string; Icon: React.ElementType }[] = [
  { key: 'language', label: 'Language', Icon: Translate },
  { key: 'customs', label: 'Customs', Icon: HandsPraying },
  { key: 'budget', label: 'Budget', Icon: CurrencyDollar },
  { key: 'food', label: 'Food', Icon: ForkKnife },
  { key: 'learn', label: 'Learn', Icon: GraduationCap },
]

export function BottomNav() {
  const activeTab = useGuideStore((s) => s.activeTab)
  const setActiveTab = useGuideStore((s) => s.setActiveTab)

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-[var(--border)] bg-[var(--surface)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Guide sections"
    >
      {NAV_ITEMS.map(({ key, label, Icon }) => {
        const isActive = activeTab === key
        return (
          <button
            key={key}
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveTab(key)}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary)] outline-none ${
              isActive ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
            }`}
          >
            <Icon size={24} weight={isActive ? 'fill' : 'regular'} />
            <span className="text-[11px] font-medium leading-none">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
