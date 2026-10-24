import { parseInquiry, type InquiryValue } from '../../../lib/inquiry-contract'
import {
  createSupabaseCaptchaContextFromEnv,
  verifyCaptchaSubmission as verifyCaptcha,
  type CaptchaChallengeStore,
  type CaptchaVerification,
} from '../../../lib/inquiry-captcha'

export const dynamic = 'force-dynamic'

type Dependencies = {
  env?: Record<string, string | undefined>
  store?: CaptchaChallengeStore
  verifyCaptchaSubmission?: (input: {
    secret: string
    tenantId: string
    siteScope: string
    scope: string
    token: string
    answer: string
    store: CaptchaChallengeStore
  }) => Promise<CaptchaVerification>
  insertInquiry?: (value: InquiryValue, context: { tenantId: string; env: Record<string, string | undefined> }) => Promise<{ id?: string }>
  fetch?: typeof fetch
}

async function insertWithSupabase(value: InquiryValue, context: { tenantId: string; env: Record<string, string | undefined>; fetchImpl: typeof fetch }) {
  const supabaseUrl = context.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/+$/, '')
  const serviceRoleKey = context.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!supabaseUrl || !serviceRoleKey) throw new Error('Inquiry persistence is not configured')
  const response = await context.fetchImpl(`${supabaseUrl}/rest/v1/inquiries`, {
    method: 'POST',
    headers: { apikey: serviceRoleKey, authorization: `Bearer ${serviceRoleKey}`, 'content-type': 'application/json', prefer: 'return=representation' },
    body: JSON.stringify({ tenant_id: context.tenantId, name: value.name, company: value.company || null, email: value.email, phone: value.phone || null, subject: value.product || 'Website inquiry', message: value.message, status: 'new' }),
    cache: 'no-store',
  })
  if (!response.ok) throw new Error(`Inquiry insert failed with HTTP ${response.status}`)
  const rows = await response.json() as Array<{ id?: string }>
  return rows[0] ?? {}
}

export function createInquiryPostHandler(dependencies: Dependencies = {}) {
  return async function POST(request: Request) {
    let body: unknown
    try { body = await request.json() } catch { return Response.json({ error: 'Invalid request.' }, { status: 400 }) }
    const parsed = parseInquiry((body ?? {}) as Record<string, unknown>)
    if (!parsed.ok) return Response.json({ error: parsed.error }, { status: 400 })

    const env = dependencies.env ?? process.env
    const secret = env.CAPTCHA_SECRET?.trim() ?? ''
    const tenantId = env.NEXT_PUBLIC_TENANT_ID?.trim() ?? ''
    const siteScope = env.CAPTCHA_SITE_SCOPE?.trim() ?? ''
    if (!secret || !tenantId || !siteScope) return Response.json({ error: 'Inquiry service is temporarily unavailable.' }, { status: 503 })

    let store = dependencies.store
    if (!store) {
      try { store = createSupabaseCaptchaContextFromEnv(env, dependencies.fetch ?? fetch).store } catch { return Response.json({ error: 'Inquiry service is temporarily unavailable.' }, { status: 503 }) }
    }
    const verification = await (dependencies.verifyCaptchaSubmission ?? verifyCaptcha)({ secret, tenantId, siteScope, scope: parsed.value.captchaScope, token: parsed.value.captchaToken, answer: parsed.value.captchaAnswer, store })
    if (!verification.ok) return Response.json({ error: 'The CAPTCHA is invalid or expired. Please refresh it and try again.' }, { status: 400 })

    try {
      const insert = dependencies.insertInquiry ?? ((value, context) => insertWithSupabase(value, { ...context, fetchImpl: dependencies.fetch ?? fetch }))
      const row = await insert(parsed.value, { tenantId, env })
      return Response.json({ ok: true, id: row.id ?? null }, { status: 201 })
    } catch {
      return Response.json({ error: 'Your inquiry could not be saved. Please try again.' }, { status: 503 })
    }
  }
}

export const POST = createInquiryPostHandler()
