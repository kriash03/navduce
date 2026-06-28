'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useGuideStore } from '@/store/guide-store'
import { ErrorBanner } from '@/components/error-banner'
import type { LanguageData } from '@/lib/types'

type SubTab = 'situations' | 'numbers' | 'greetings' | 'shopqa' | 'flashcards'

const SUB_TABS: { key: SubTab; label: string }[] = [
  { key: 'situations', label: 'Situations' },
  { key: 'numbers', label: 'Numbers' },
  { key: 'greetings', label: 'Greetings' },
  { key: 'shopqa', label: 'Shop Q&A' },
  { key: 'flashcards', label: 'Flashcards' },
]

const SITUATION_LABELS: Record<string, string> = {
  restaurant: 'Restaurant',
  shopping: 'Shopping',
  transport: 'Transport',
}

function PhraseCard({ phrase }: { phrase: LanguageData['situations']['restaurant'][number] }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-1">
      <p className="text-lg font-bold text-[var(--text-primary)]">{phrase.local}</p>
      <p className="text-sm text-[var(--primary)]">{phrase.romanized}</p>
      <p className="text-xs text-[var(--text-muted)] italic">{phrase.pronunciation}</p>
      <p className="text-sm text-[var(--text-secondary)] mt-1">{phrase.meaning}</p>
      {phrase.tip && (
        <p className="text-xs text-[var(--amber)] mt-1">Tip: {phrase.tip}</p>
      )}
    </div>
  )
}

export function LanguageTab() {
  const country = useGuideStore((s) => s.country)
  const tabState = useGuideStore((s) => s.tabs.language)
  const setTabLoading = useGuideStore((s) => s.setTabLoading)
  const setTabData = useGuideStore((s) => s.setTabData)
  const setTabError = useGuideStore((s) => s.setTabError)
  const shouldReduce = useReducedMotion()

  const [subTab, setSubTab] = useState<SubTab>('situations')
  const [situation, setSituation] = useState<'restaurant' | 'shopping' | 'transport'>('restaurant')
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    if (tabState.status !== 'idle') return
    setTabLoading('language')
    fetch('/api/guide/language', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country }),
    })
      .then((r) => r.json())
      .then((json) => {
        if (json.error) throw new Error(json.error)
        setTabData('language', json)
      })
      .catch((e) => setTabError('language', e.message ?? 'Something went wrong'))
  }, [country, tabState.status, setTabLoading, setTabData, setTabError])

  if (tabState.status === 'loading') return null
  if (tabState.status === 'error') {
    return (
      <ErrorBanner
        message={tabState.error ?? 'Failed to load language guide'}
        onRetry={() => setTabError('language', '')}
      />
    )
  }
  if (tabState.status !== 'success' || !tabState.data) return null

  const data = tabState.data as LanguageData
  const flashcard = data.flashcards[cardIndex]

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {SUB_TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSubTab(key)}
            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary)] outline-none ${
              subTab === key
                ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                : 'border-[var(--border)] bg-[var(--surface-alt)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {subTab === 'situations' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {(['restaurant', 'shopping', 'transport'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSituation(s)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  situation === s
                    ? 'border-[var(--purple)] bg-[var(--purple)]/20 text-[var(--purple)]'
                    : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {SITUATION_LABELS[s]}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {data.situations[situation].map((phrase, i) => (
              <motion.div
                key={i}
                initial={shouldReduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <PhraseCard phrase={phrase} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {subTab === 'numbers' && (
        <div className="grid grid-cols-2 gap-3">
          {data.numbers.map((n, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 space-y-0.5"
            >
              <p className="text-2xl font-bold text-[var(--primary)]">{n.numeral}</p>
              <p className="text-sm text-[var(--text-primary)]">{n.local}</p>
              <p className="text-xs text-[var(--text-muted)] italic">{n.pronunciation}</p>
            </div>
          ))}
        </div>
      )}

      {subTab === 'greetings' && (
        <div className="space-y-3">
          {data.greetings.map((g, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-1"
            >
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">
                {g.context}
              </p>
              <p className="text-lg font-bold text-[var(--text-primary)]">{g.phrase}</p>
              <p className="text-xs text-[var(--text-muted)] italic">{g.pronunciation}</p>
              {g.note && <p className="text-xs text-[var(--amber)]">{g.note}</p>}
            </div>
          ))}
        </div>
      )}

      {subTab === 'shopqa' && (
        <div className="space-y-3">
          {data.shopQA.map((qa, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-1"
            >
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">
                Q
              </p>
              <p className="text-sm text-[var(--text-primary)]">{qa.question}</p>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mt-2">
                A
              </p>
              <p className="text-sm font-bold text-[var(--primary)]">{qa.answer}</p>
              <p className="text-xs text-[var(--text-muted)] italic">{qa.pronunciation}</p>
            </div>
          ))}
        </div>
      )}

      {subTab === 'flashcards' && flashcard && (
        <div className="space-y-4">
          <div className="text-xs text-[var(--text-muted)] text-center">
            {cardIndex + 1} / {data.flashcards.length}
          </div>
          <button
            onClick={() => setFlipped((f) => !f)}
            className="w-full min-h-[160px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[var(--primary)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary)] outline-none"
            aria-label={flipped ? 'Show English' : 'Reveal local phrase'}
          >
            {flipped ? (
              <>
                <p className="text-2xl font-bold text-[var(--primary)]">{flashcard.local}</p>
                <p className="text-sm text-[var(--text-muted)] italic">{flashcard.pronunciation}</p>
              </>
            ) : (
              <p className="text-xl font-semibold text-[var(--text-primary)]">{flashcard.english}</p>
            )}
            <p className="text-xs text-[var(--text-muted)] mt-2">
              {flipped ? 'Tap to see English' : 'Tap to reveal'}
            </p>
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => { setCardIndex((i) => Math.max(0, i - 1)); setFlipped(false) }}
              disabled={cardIndex === 0}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] py-2.5 text-sm font-medium text-[var(--text-secondary)] disabled:opacity-40 hover:text-[var(--text-primary)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary)] outline-none"
            >
              <CaretLeft size={16} />
              Prev
            </button>
            <button
              onClick={() => { setCardIndex((i) => Math.min(data.flashcards.length - 1, i + 1)); setFlipped(false) }}
              disabled={cardIndex === data.flashcards.length - 1}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] py-2.5 text-sm font-medium text-[var(--text-secondary)] disabled:opacity-40 hover:text-[var(--text-primary)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--primary)] outline-none"
            >
              Next
              <CaretRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
