import { describe, expect, it } from 'vitest'
import { getProductView, getProductViews } from '../lib/products'

const expectedSlugs = [
  'top-entry-agitator',
  'side-entry-agitator',
  'bottom-entry-agitator',
  'horizontal-ribbon-mixer',
  'ploughshare-mixer',
  'drum-mixer',
  'reactor',
  'blending-tank',
  'storage-tank',
  'silo',
  'shell-and-tube-heat-exchanger',
  'process-tower',
]

describe('customer catalog contract', () => {
  it('keeps every one of the 12 customer products independently reachable', () => {
    expect(getProductViews().map((product) => product.slug)).toEqual(expectedSlugs)
    for (const slug of expectedSlugs) expect(getProductView(slug)?.slug).toBe(slug)
  })

  it('maps backend multilingual fields without losing the stable product route', async () => {
    const module = await import('../lib/products-db').catch(() => undefined)
    expect(module, 'lib/products-db.ts must exist').toBeDefined()
    expect(module?.mapProductRow({
      slug: 'reactor', category_slug: 'process-vessels-equipment', category: 'Process Vessels & Equipment',
      name_i18n: { en: 'Reactor', zh: '反应釜' }, description_i18n: { en: 'English summary', zh: '中文简介' }, overview_i18n: { en: 'English overview' },
      features_i18n: { en: ['Feature A'] }, applications_i18n: { en: ['Application A'] }, advantages_i18n: { en: ['Choose A'] },
      image_url: 'https://assets.example/reactor.jpg', extra_data: { selection_inputs: ['Volume'] }, is_active: true,
    }, 'en')).toMatchObject({ slug: 'reactor', name: 'Reactor', summary: 'English summary', whatItDoes: 'English overview', image: 'https://assets.example/reactor.jpg', selectionInputs: ['Volume'] })
  })

  it('maps every product to a customer-supplied public image', () => {
    for (const product of getProductViews()) {
      expect(product.image, product.slug).toMatch(/^\/materials\/products\/.+\.jpg$/)
    }
  })

  it('does not expose prohibited warranty or guarantee claims in catalog content', () => {
    const rendered = JSON.stringify(getProductViews()).toLowerCase()
    expect(rendered).not.toMatch(/warrant(?:y|ies)|guarantee(?:d)?|质保|保修/)
  })
})

describe('inquiry boundary contract', () => {
  it('accepts a complete buyer inquiry and normalizes its fields', async () => {
    const module = await import('../lib/inquiry-contract').catch(() => undefined)
    expect(module, 'lib/inquiry-contract.ts must exist').toBeDefined()
    expect(module?.parseInquiry({
      name: '  Ada Buyer ',
      company: 'Acme Process Ltd.',
      email: 'ADA@EXAMPLE.COM ',
      phone: ' +1 555 0100 ',
      product: 'reactor',
      message: 'Need a reactor for a temperature-controlled batch process.',
      captchaScope: 'contact-main',
      captchaToken: 'signed-token',
      captchaAnswer: '7K9P',
    })).toEqual({
      ok: true,
      value: {
        name: 'Ada Buyer',
        company: 'Acme Process Ltd.',
        email: 'ada@example.com',
        phone: '+1 555 0100',
        product: 'reactor',
        message: 'Need a reactor for a temperature-controlled batch process.',
        captchaScope: 'contact-main',
        captchaToken: 'signed-token',
        captchaAnswer: '7K9P',
      },
    })
  })

  it('rejects malformed requests before any persistence boundary', async () => {
    const module = await import('../lib/inquiry-contract').catch(() => undefined)
    expect(module, 'lib/inquiry-contract.ts must exist').toBeDefined()
    expect(module?.parseInquiry({ name: '', email: 'bad', message: '', captchaScope: '', captchaToken: '', captchaAnswer: '' })).toEqual({
      ok: false,
      error: 'Please complete the required inquiry and CAPTCHA fields.',
    })
  })

  it('consumes CAPTCHA before inserting an inquiry and returns success only after persistence', async () => {
    const route = await import('../app/api/inquiries/route').catch((error) => { console.error(error); return undefined })
    expect(route, 'app/api/inquiries/route.ts must exist').toBeDefined()
    const events: string[] = []
    const handler = route!.createInquiryPostHandler({
      verifyCaptchaSubmission: async () => { events.push('captcha'); return { ok: true } },
      insertInquiry: async () => { events.push('insert'); return { id: 'inquiry-1' } },
      env: {
        CAPTCHA_SECRET: '12345678901234567890123456789012',
        CAPTCHA_SITE_SCOPE: 'jndindustrial.com',
        NEXT_PUBLIC_TENANT_ID: '11111111-1111-4111-8111-111111111111',
      },
      store: { issue() {}, consume() { return true } },
    })
    const request = new Request('https://jndindustrial.com/api/inquiries', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Ada', company: 'Acme', email: 'ada@example.com', phone: '', product: 'reactor', message: 'Please review our reactor duty.', captchaScope: 'captcha_1234567890abcdef1234567890abcdef', captchaToken: 'token', captchaAnswer: '7K9P' }) })
    const response = await handler(request)
    expect(response.status).toBe(201)
    expect(events).toEqual(['captcha', 'insert'])
  })

  it('does not insert when CAPTCHA verification fails', async () => {
    const route = await import('../app/api/inquiries/route').catch((error) => { console.error(error); return undefined })
    expect(route, 'app/api/inquiries/route.ts must exist').toBeDefined()
    let inserts = 0
    const handler = route!.createInquiryPostHandler({
      verifyCaptchaSubmission: async () => ({ ok: false, code: 'invalid' }),
      insertInquiry: async () => { inserts += 1; return { id: 'should-not-exist' } },
      env: { CAPTCHA_SECRET: '12345678901234567890123456789012', CAPTCHA_SITE_SCOPE: 'jndindustrial.com', NEXT_PUBLIC_TENANT_ID: '11111111-1111-4111-8111-111111111111' },
      store: { issue() {}, consume() { return true } },
    })
    const request = new Request('https://jndindustrial.com/api/inquiries', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Ada', email: 'ada@example.com', message: 'Review request', captchaScope: 'captcha_1234567890abcdef1234567890abcdef', captchaToken: 'token', captchaAnswer: 'WRNG' }) })
    const response = await handler(request)
    expect(response.status).toBe(400)
    expect(inserts).toBe(0)
  })
})
