# Changelog

All notable changes to Navduce are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

## [1.1.0] - 2026-07-03
### Changed
- Renamed project from TouristSurvive to **Navduce**
- Updated app metadata title and description for SEO
- Updated README with full feature list and Upstash env var docs

## [1.0.0] - 2026-07-02
### Added
- Initial MVP: AI-powered travel survival guide for 196 countries
- 4 guide tabs: Language, Customs, Budget, Food — generated on-demand by Groq LLaMA 3
- Language tab with Situations, Numbers, Greetings, Shop Q&A, and Flashcards sub-tabs
- Tap-to-flip flashcard navigation (Prev/Next)
- Web Speech API TTS (SpeakButton) on phrases, greetings, shop Q&A, numbers, and flashcard reveal
- Zustand store with localStorage persistence — guides survive page refresh and work offline
- CountrySelector with autocomplete (196 countries, startsWith matching, 6 suggestions)
- Quick-pick country chips for fast access to popular destinations
- Shape-matched skeleton loaders for all 4 tabs
- Offline banner when navigator.onLine is false
- Dark/light theme toggle via next-themes
- Learn tab: 7 insider language tips per country with "Dive deeper" progressive disclosure
- Localized TTS: BCP-47 locale map for all 196 countries, correct voice selection, no-voice tooltip
- Mobile bottom nav bar (fixed, safe-area aware) replacing top pill tabs below 768px
- Desktop horizontal pill tab bar with Motion layoutId spring animation
- Rate-limit-ready API architecture via dedicated route per tab
- Custom Zustand persist merge handler to survive localStorage schema migrations
