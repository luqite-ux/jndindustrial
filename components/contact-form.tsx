'use client'

import { useState } from 'react'
import { InquiryCaptchaField } from '@/components/inquiry-captcha-field'
import { getProductViews } from '@/lib/products'

export function ContactForm({ initialProduct = '' }: { initialProduct?: string }) {
  const [status, setStatus] = useState<{ tone: 'success' | 'error'; text: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const products = getProductViews()

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true); setStatus(null)
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries())
    try {
      const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(values) })
      const body = await response.json() as { error?: string }
      if (!response.ok) throw new Error(body.error || 'Submission failed.')
      form.reset(); setRefreshKey(value => value + 1)
      setStatus({ tone: 'success', text: 'Thank you. Your inquiry has been saved for the JND team.' })
    } catch (error) {
      setRefreshKey(value => value + 1)
      setStatus({ tone: 'error', text: error instanceof Error ? error.message : 'Your inquiry could not be sent.' })
    } finally { setSubmitting(false) }
  }

  const inputClass = 'mt-2 h-11 w-full rounded-sm border border-border bg-white px-3 text-navy outline-none focus:border-navy-soft focus:ring-2 focus:ring-navy-soft/20'
  return <form onSubmit={submit} className="grid gap-5" noValidate>
    <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-medium text-navy">Name *<input name="name" required className={inputClass}/></label><label className="text-sm font-medium text-navy">Company<input name="company" className={inputClass}/></label></div>
    <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-medium text-navy">Business email *<input name="email" type="email" required className={inputClass}/></label><label className="text-sm font-medium text-navy">Phone / WhatsApp<input name="phone" className={inputClass}/></label></div>
    <label className="text-sm font-medium text-navy">Target equipment<select name="product" defaultValue={initialProduct} className={inputClass}><option value="">Select a product or describe it below</option>{products.map(product=><option key={product.slug} value={product.slug}>{product.name}</option>)}</select></label>
    <label className="text-sm font-medium text-navy">Process requirements *<textarea name="message" required minLength={12} rows={7} className="mt-2 w-full rounded-sm border border-border bg-white p-3 text-navy outline-none focus:border-navy-soft focus:ring-2 focus:ring-navy-soft/20" placeholder="Material, batch volume or vessel size, viscosity, temperature, pressure, quantity, interfaces and drawing availability."/></label>
    <InquiryCaptchaField refreshKey={refreshKey} className="rounded-sm border border-border bg-steel p-4" />
    {status?<p role="status" className={status.tone==='success'?'rounded-sm bg-emerald-50 p-3 text-sm text-emerald-800':'rounded-sm bg-red-50 p-3 text-sm text-red-800'}>{status.text}</p>:null}
    <button type="submit" disabled={submitting} className="h-12 bg-cta px-6 font-semibold text-cta-foreground hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-60">{submitting?'Sending…':'Send inquiry'}</button>
  </form>
}
