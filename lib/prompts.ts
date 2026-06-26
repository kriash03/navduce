import type { TabKey } from './types'

const LANGUAGE_SCHEMA = `{
  "situations": {
    "restaurant": [{ "local": "", "romanized": "", "pronunciation": "", "meaning": "", "tip": "" }],
    "shopping": [{ "local": "", "romanized": "", "pronunciation": "", "meaning": "", "tip": "" }],
    "transport": [{ "local": "", "romanized": "", "pronunciation": "", "meaning": "", "tip": "" }]
  },
  "numbers": [{ "numeral": "1", "local": "", "pronunciation": "" }],
  "greetings": [{ "context": "", "phrase": "", "pronunciation": "", "note": "" }],
  "shopQA": [{ "question": "", "answer": "", "pronunciation": "" }],
  "flashcards": [{ "english": "", "local": "", "pronunciation": "" }]
}`

const CUSTOMS_SCHEMA = `{
  "dos": [{ "action": "", "why": "" }],
  "donts": [{ "action": "", "consequence": "" }],
  "dresscode": [{ "venue": "", "rule": "" }],
  "tipping": [{ "context": "", "amount": "", "note": "" }],
  "hiddenRules": [{ "rule": "", "detail": "" }]
}`

const BUDGET_SCHEMA = `{
  "currency": { "name": "", "code": "", "usdRate": "", "notes": "" },
  "dailyTiers": [{ "tier": "Budget", "usdPerDay": 0, "includes": "" }],
  "typicalCosts": [{ "item": "", "low": "", "high": "", "tip": "" }],
  "atmAdvice": "",
  "bargaining": { "applicable": false, "howTo": "", "where": "" },
  "scams": [{ "name": "", "howItWorks": "", "howToAvoid": "" }]
}`

const FOOD_SCHEMA = `{
  "mustTry": [{ "name": "", "description": "", "whereToFind": "", "orderingTip": "" }],
  "diningCustoms": [{ "custom": "", "why": "" }],
  "howToOrder": {
    "steps": [],
    "phrases": [{ "english": "", "local": "", "pronunciation": "" }]
  },
  "dietary": [{ "type": "", "difficulty": "easy", "watchFor": "" }],
  "streetFood": { "safetyTips": [], "mustTry": [] },
  "avoid": [{ "item": "", "reason": "" }]
}`

const SYSTEMS: Record<TabKey, string> = {
  language: `You are a local language coach who has lived in {country} for 10 years. You teach travelers phrases that locals actually use - not textbook alternatives. Always include real pronunciation guides using simple English phonetics. Never give generic or overly formal phrases.`,
  customs: `You are a cultural anthropologist and long-term expat in {country}. You give tourists the unfiltered truth about local customs - specific, actionable, with real consequences when tourists get it wrong. Never give generic advice.`,
  budget: `You are a budget travel expert who has lived in {country} on every budget level. Your cost estimates are realistic for 2026, not outdated blog numbers. Give specific amounts in local currency and USD.`,
  food: `You are a food writer and local guide in {country}. You know where locals actually eat, what dishes are unmissable, and exactly what to say to order them. Never recommend tourist-trap dishes.`,
}

const SCHEMAS: Record<TabKey, string> = {
  language: LANGUAGE_SCHEMA,
  customs: CUSTOMS_SCHEMA,
  budget: BUDGET_SCHEMA,
  food: FOOD_SCHEMA,
}

const COUNTS: Record<TabKey, string> = {
  language: 'Include 3 phrases per situation, exactly 10 numbers (1-10), exactly 5 greetings, exactly 5 shopQA pairs, exactly 10 flashcards.',
  customs: 'Include exactly 6 dos, exactly 6 donts, exactly 4 dresscode entries, exactly 3 tipping entries, exactly 4 hiddenRules.',
  budget: 'Include exactly 3 dailyTiers (Budget, Mid-range, Comfort), exactly 6 typicalCosts, exactly 3 scams.',
  food: 'Include exactly 6 mustTry dishes, exactly 5 diningCustoms, exactly 4 howToOrder steps, exactly 3 howToOrder phrases, exactly 4 dietary entries, exactly 3 streetFood mustTry items, exactly 3 avoid items.',
}

export function getPrompt(tab: TabKey, country: string): { system: string; user: string } {
  const system = SYSTEMS[tab].replace(/\{country\}/g, country)
  const user = `Return a JSON object for ${country} matching this exact schema. Fill every string field with real, locally accurate content. ${COUNTS[tab]} Schema: ${SCHEMAS[tab]}`
  return { system, user }
}

export function getStrictPrompt(tab: TabKey, country: string): { system: string; user: string } {
  const base = getPrompt(tab, country)
  return {
    system: base.system,
    user: base.user + ' IMPORTANT: Return ONLY valid JSON. No markdown, no code fences, no explanation. Start your response with { and end with }.',
  }
}

export const REQUIRED_KEYS: Record<TabKey, string[]> = {
  language: ['situations', 'numbers', 'greetings', 'shopQA', 'flashcards'],
  customs: ['dos', 'donts', 'dresscode', 'tipping', 'hiddenRules'],
  budget: ['currency', 'dailyTiers', 'typicalCosts', 'atmAdvice', 'bargaining', 'scams'],
  food: ['mustTry', 'diningCustoms', 'howToOrder', 'dietary', 'streetFood', 'avoid'],
}
