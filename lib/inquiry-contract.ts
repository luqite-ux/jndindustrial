export interface InquiryInput {
  name?: unknown
  company?: unknown
  email?: unknown
  phone?: unknown
  product?: unknown
  message?: unknown
  captchaScope?: unknown
  captchaToken?: unknown
  captchaAnswer?: unknown
}

export interface InquiryValue {
  name: string
  company: string
  email: string
  phone: string
  product: string
  message: string
  captchaScope: string
  captchaToken: string
  captchaAnswer: string
}

export type InquiryParseResult =
  | { ok: true; value: InquiryValue }
  | { ok: false; error: string }

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

export function parseInquiry(input: InquiryInput): InquiryParseResult {
  const value: InquiryValue = {
    name: text(input.name),
    company: text(input.company),
    email: text(input.email).toLowerCase(),
    phone: text(input.phone),
    product: text(input.product),
    message: text(input.message),
    captchaScope: text(input.captchaScope),
    captchaToken: text(input.captchaToken),
    captchaAnswer: text(input.captchaAnswer).toUpperCase(),
  }
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)
  if (!value.name || !emailValid || !value.message || !value.captchaScope || !value.captchaToken || !value.captchaAnswer) {
    return { ok: false, error: 'Please complete the required inquiry and CAPTCHA fields.' }
  }
  return { ok: true, value }
}
