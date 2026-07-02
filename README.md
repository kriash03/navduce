# Navduce

AI-powered local guide for any country. Street-level knowledge on language, customs, budget, and food — before you land.

## What it does

Select any country and instantly get a locally accurate guide across 5 tabs:

- **Language** — Phrases locals actually use, numbers, greetings, shop Q&A, and flashcards with localized TTS
- **Customs** — Dos, don'ts, dress code, tipping, and hidden rules tourists always miss
- **Budget** — Currency overview, daily cost tiers, typical prices, ATM tips, bargaining guide, and common scams
- **Food** — Must-try dishes, dining customs, how to order, dietary restriction phrases, and street food tips
- **Learn** — Insider language tips: local slang, versatile words, filler sounds — what Google Translate won't tell you

Content is generated on demand by AI — not pulled from a static database — so it reflects real, locally accurate knowledge rather than generic travel blog advice.

## Tech stack

- Next.js 14 (App Router)
- Tailwind CSS v4
- Zustand (with localStorage persistence)
- Groq (LLaMA 3.3 70B)
- Phosphor Icons
- Motion (motion/react)

## Getting started

```bash
npm install
```

Create a `.env.local` file:

```
GROQ_API_KEY=your_key_here
UPSTASH_REDIS_REST_URL=your_url_here
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
