import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from 'next/font/google'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { JsonLd } from '@/components/site/json-ld'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import './globals.css'

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
})

const plexCondensed = IBM_Plex_Sans_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-plex-condensed',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'JND Industrial | Industrial Mixing and Process Equipment',
    template: '%s | JND Industrial',
  },
  description:
    'JND designs and manufactures agitators, industrial mixers, reactors, tanks, silos, heat exchangers and process towers. Non-standard customization and OEM/ODM supported.',
  applicationName: 'JND Industrial',
  alternates: { canonical: '/' },
  icons: { icon: '/icon.jpg', apple: '/apple-icon.jpg' },
}

export const viewport: Viewport = {
  themeColor: '#0a1f4d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexCondensed.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-[60] rounded-sm bg-cta px-4 py-2 font-semibold text-cta-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
