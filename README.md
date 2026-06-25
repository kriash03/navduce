# TouristSurvive

An AI-powered, mobile-first web app that gives travelers street-level survival knowledge for any country — language, customs, money, and food.

## What it does

Select any country and get a locally accurate guide across 4 tabs:

- **Language Kit** — Phrases locals actually use, numbers, greetings, shop Q&A, and flashcards
- **Customs & Etiquette** — Dos, don'ts, dress code, tipping, and hidden rules tourists always miss
- **Budget & Money** — Currency overview, daily cost tiers, typical prices, ATM tips, bargaining guide, and common scams
- **Food & Dining** — Must-try dishes, dining customs, how to order, dietary restriction phrases, and street food tips

Content is generated on demand by AI — not pulled from a static database — so it reflects real, locally accurate knowledge rather than generic travel blog advice.

## Tech stack

- Next.js 14 (App Router)
- Tailwind CSS
- Zustand
- Groq (LLaMA 3)
- shadcn/ui + Phosphor Icons
- Motion (Framer Motion)

## Getting started

```bash
npm install
```

Create a `.env.local` file:

```
GROQ_API_KEY=your_key_here
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Status

Under active development.
