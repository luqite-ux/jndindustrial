import { describe, expect, it } from 'vitest'
import { getProductView, getProductViews } from '../lib/products'
import { absoluteUrl, productJsonLd } from '../lib/seo'
import { existsSync, readFileSync } from 'node:fs'
import { statSync } from 'node:fs'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

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
  it('renders larger product artwork on a continuous white card surface', async () => {
    const { ProductCard } = await import('../components/product-card')
    const html = renderToStaticMarkup(createElement(ProductCard, { product: getProductViews()[0] }))
    expect(html).toContain('aspect-[4/3] overflow-hidden bg-white')
    expect(html).toContain('object-contain p-2')
    expect(html).toContain('sm:p-3')
    expect(html).not.toContain('bg-[#f7f9fb]')
  })

  it('keeps carousel copy inside responsive safe areas and gives every selector a 44px target', () => {
    const source = readFileSync(new URL('../components/home/hero-carousel.tsx', import.meta.url), 'utf8')
    expect(source).toContain('md:max-w-[min(32rem,42vw)]')
    expect(source).toContain('max-w-[calc(100vw-2.5rem)]')
    expect(source).toContain("current.textSide === 'right' && 'md:mr-6 lg:mr-10'")
    expect(source).toContain('className="grid size-11 place-items-center"')
  })

  it('serves optimized hero artwork instead of multi-megabyte source files', () => {
    for (const name of ['banner-1.webp', 'banner-2.webp', 'banner-3.webp']) {
      const asset = new URL(`../public/images/hero/${name}`, import.meta.url)
      expect(existsSync(asset), `${name} must exist`).toBe(true)
      if (existsSync(asset)) expect(statSync(asset).size, name).toBeLessThan(1_000_000)
    }
    const source = readFileSync(new URL('../components/home/hero-carousel.tsx', import.meta.url), 'utf8')
    expect(source).not.toMatch(/banner-[123]\.jpg/)
  })

  it('presents supplied company facts without an internal provenance disclaimer', () => {
    const source = readFileSync(new URL('../app/about/page.tsx', import.meta.url), 'utf8')
    expect(source).toContain('35,000 m²')
    expect(source).toContain('two workshops')
    expect(source).toContain('Wuxi')
    expect(source).not.toContain('customer-provided facts')
    expect(source).not.toContain('third-party verification')
  })

  it('states the supplied no-sample policy consistently in fallback content', () => {
    const source = readFileSync(new URL('../lib/content.ts', import.meta.url), 'utf8')
    expect(source).toContain('physical samples are generally not available')
    expect(source).not.toContain('Sample arrangements depend on the equipment type')
  })

  it('publishes the customer-supplied conditional production lead time', () => {
    const source = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8')
    expect(source).toContain('45–90 days')
    expect(source).toContain('confirmed for each order')
  })

  it('renders every static public-page hero from the published site-content snapshot', () => {
    const adapterUrl = new URL('../components/site/managed-page-hero.tsx', import.meta.url)
    expect(existsSync(adapterUrl), 'managed PageHero adapter must exist').toBe(true)
    const adapter = existsSync(adapterUrl) ? readFileSync(adapterUrl, 'utf8') : ''
    expect(adapter).toContain('getSiteContent')
    expect(adapter).toContain('data-hq-content-version')
    for (const route of ['products', 'applications', 'capabilities', 'about', 'news', 'contact']) {
      const source = readFileSync(new URL(`../app/${route}/page.tsx`, import.meta.url), 'utf8')
      expect(source, route).toContain('ManagedPageHero')
      expect(source, route).not.toContain('<PageHero ')
    }
  })

  it('renders homepage product cards from the backend data layer', () => {
    const source = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8')
    expect(source).toContain("import { fetchProductsData } from '@/lib/products-db'")
    expect(source).toContain('await fetchProductsData()')
    expect(source).not.toContain("import { getProductViews } from '@/lib/products'")
  })

  it('renders product-family headings from the backend category data layer', () => {
    const source = readFileSync(new URL('../app/products/page.tsx', import.meta.url), 'utf8')
    expect(source).toContain('fetchProductFamilies')
    expect(source).toContain('await Promise.all([fetchProductsData(), fetchProductFamilies()])')
    expect(source).not.toContain("import { getFamilyViews } from '@/lib/products'")
  })

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

describe('SEO URL contract', () => {
  it('keeps public absolute media URLs unchanged in product schema', () => {
    const product = { ...getProductViews()[0], image: 'https://pub.example-r2.dev/products/mixer.jpg' }
    expect(absoluteUrl(product.image)).toBe(product.image)
    expect(productJsonLd(product).image).toBe(product.image)
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
