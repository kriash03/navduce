import { NextRequest, NextResponse } from 'next/server'
import groqClient from '@/lib/groq'
import { getPrompt, getStrictPrompt, REQUIRED_KEYS } from '@/lib/prompts'
import type { TabKey } from '@/lib/types'

const VALID_TABS: TabKey[] = ['language', 'customs', 'budget', 'food']

async function callGroq(system: string, user: string): Promise<string> {
  const completion = await groqClient.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    temperature: 0.4,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
  })
  return completion.choices[0]?.message?.content ?? ''
}

function validateKeys(data: Record<string, unknown>, tab: TabKey): boolean {
  return REQUIRED_KEYS[tab].every((key) => key in data)
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ tab: string }> }
) {
  const { tab: tabParam } = await params
  const tab = tabParam as TabKey

  if (!VALID_TABS.includes(tab)) {
    return NextResponse.json({ error: 'invalid_tab' }, { status: 400 })
  }

  let body: { country?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
  }

  const country = body.country?.trim()
  if (!country) {
    return NextResponse.json({ error: 'missing_country' }, { status: 400 })
  }

  try {
    const { system, user } = getPrompt(tab, country)
    const raw = await callGroq(system, user)
    const parsed = JSON.parse(raw)

    if (validateKeys(parsed, tab)) {
      return NextResponse.json(parsed)
    }

    const { system: sys2, user: user2 } = getStrictPrompt(tab, country)
    const raw2 = await callGroq(sys2, user2)
    const parsed2 = JSON.parse(raw2)

    if (validateKeys(parsed2, tab)) {
      return NextResponse.json(parsed2)
    }

    return NextResponse.json({ error: 'parse_failure' }, { status: 422 })
  } catch (err) {
    console.error(`[guide/${tab}] error:`, err)
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'parse_failure' }, { status: 422 })
    }
    return NextResponse.json({ error: 'provider_error' }, { status: 502 })
  }
}
