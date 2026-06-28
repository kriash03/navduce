import { CountrySelector } from '@/components/country-selector'
import { ThemeToggle } from '@/components/theme-toggle'
import { GuideShell } from '@/components/guide-shell'
import { OfflineBanner } from '@/components/offline-banner'

export default function Home() {
  return (
    <main className="min-h-[100dvh] px-4 py-8 max-w-[700px] mx-auto space-y-10">
      <nav className="flex justify-end">
        <ThemeToggle />
      </nav>
      <CountrySelector />
      <GuideShell />
      <OfflineBanner />
    </main>
  )
}
