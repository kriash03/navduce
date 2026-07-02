import { NextRequest, NextResponse } from 'next/server'
import groqClient from '@/lib/groq'
import { getLearnPrompt, getStrictLearnPrompt } from '@/lib/prompts'
import { isValidCountry } from '@/lib/countries'

async function callGroq(system: string, user: string): Promise<string> {
  const completion = await groqClient.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    temperature: 0.5,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
  })
  return completion.choices[0]?.message?.content ?? ''
}

export async function POST(request: NextRequest) {
  let body: { country?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
  }

  const country = body.country?.trim()
  if (!country || !isValidCountry(country)) {
    return NextResponse.json({ error: 'invalid_country' }, { status: 400 })
  }

  try {
    const { system, user } = getLearnPrompt(country)
    const raw = await callGroq(system, user)
    const parsed = JSON.parse(raw)

    if (Array.isArray(parsed.tips) && parsed.tips.length > 0) {
      return NextResponse.json(parsed)
    }

    const { system: sys2, user: user2 } = getStrictLearnPrompt(country)
    const raw2 = await callGroq(sys2, user2)
    const parsed2 = JSON.parse(raw2)

    if (Array.isArray(parsed2.tips) && parsed2.tips.length > 0) {
      return NextResponse.json(parsed2)
    }

    return NextResponse.json({ error: 'parse_failure' }, { status: 422 })
  } catch (err) {
    console.error('[guide/learn] error:', err)
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'parse_failure' }, { status: 422 })
    }
    return NextResponse.json({ error: 'provider_error' }, { status: 502 })
  }
}
