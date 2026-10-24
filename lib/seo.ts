import type { Metadata } from 'next'
import { siteConfig } from './site'
import { defaultLocale, localizePath, type Locale } from './i18n'
import type { NewsPostView } from './news'
import type { ProductView } from './products'

export const absoluteUrl = (path: string) => `${siteConfig.url}${path}`

interface MetadataInput {
  title: string
  description: string
  path: string
  locale?: Locale
  image?: string
  type?: 'website' | 'article'
}

export function buildMetadata({
  title,
  description,
  path,
  locale = defaultLocale,
  image = siteConfig.defaultOgImage,
  type = 'website',
}: MetadataInput): Metadata {
  const canonical = localizePath(path, locale)
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: `${siteConfig.brand} Industrial`,
      type,
      locale: 'en_US',
      images: [{ url: image }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.brand,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo.src),
    email: siteConfig.email,
    telephone: '+8613871081737',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: `${siteConfig.address.district}, ${siteConfig.address.city}`,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.countryCode,
    },
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: `${siteConfig.brand} Industrial`,
    url: siteConfig.url,
    inLanguage: 'en',
    publisher: { '@id': `${siteConfig.url}/#organization` },
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function productJsonLd(product: ProductView) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.summary,
    category: product.familyName,
    image: product.image ? absoluteUrl(product.image) : undefined,
    url: absoluteUrl(`/products/${product.slug}`),
    brand: { '@type': 'Brand', name: siteConfig.brand },
    manufacturer: { '@id': `${siteConfig.url}/#organization` },
  }
}

export function articleJsonLd(post: NewsPostView) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    image: post.image ? absoluteUrl(post.image) : undefined,
    url: absoluteUrl(`/news/${post.slug}`),
    author: { '@id': `${siteConfig.url}/#organization` },
    publisher: { '@id': `${siteConfig.url}/#organization` },
  }
}
