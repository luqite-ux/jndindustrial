export const locales = ['en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export type Localized<T> = Partial<Record<Locale, T>>

function hasContent(value: unknown): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object') return Object.keys(value as object).length > 0
  return true
}

/**
 * Resolves localized content in this order: requested language, default language,
 * then the first non-empty translation that exists.
 */
export function resolveLocalized<T>(
  translations: Localized<T>,
  requested: Locale = defaultLocale,
): T | undefined {
  const order: Locale[] = [requested, defaultLocale]
  for (const locale of order) {
    const candidate = translations[locale]
    if (hasContent(candidate)) return candidate
  }
  for (const candidate of Object.values(translations)) {
    if (hasContent(candidate)) return candidate as T
  }
  return undefined
}

export function localizePath(path: string, locale: Locale = defaultLocale): string {
  if (locale === defaultLocale) return path
  return `/${locale}${path === '/' ? '' : path}`
}
