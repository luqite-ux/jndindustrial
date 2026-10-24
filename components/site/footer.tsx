import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { navItems, siteConfig } from '@/lib/site'
import { getFamilyViews } from '@/lib/products'
import { CurrentYear } from './current-year'

export function SiteFooter() {
  const families = getFamilyViews()
  const { address } = siteConfig

  return (
    <footer className="border-t border-border bg-steel">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Link href="/" aria-label="JND Industrial home" className="inline-block rounded-sm">
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              className="h-12 w-auto"
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Industrial mixing and process equipment, with non-standard customization and OEM/ODM support.
          </p>
        </div>

        <nav aria-label="Product families">
          <h2 className="eyebrow mb-4 font-sans text-navy">Products</h2>
          <ul className="space-y-2.5 text-sm">
            {families.map((family) => (
              <li key={family.slug}>
                <Link
                  href={`/products?family=${family.slug}`}
                  className="text-muted-foreground underline-offset-4 transition-colors hover:text-navy-soft hover:underline"
                >
                  {family.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/products"
                className="font-medium text-navy-soft underline-offset-4 hover:underline"
              >
                All 12 products
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer">
          <h2 className="eyebrow mb-4 font-sans text-navy">Company</h2>
          <ul className="space-y-2.5 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground underline-offset-4 transition-colors hover:text-navy-soft hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-4 font-sans text-navy">Contact</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-navy-soft" />
              <address className="not-italic leading-relaxed">
                {address.street}, {address.district}, {address.city}, {address.region}, {address.country}
              </address>
            </li>
            <li className="flex items-center gap-3">
              <Mail aria-hidden="true" className="size-4 shrink-0 text-navy-soft" />
              <a className="underline-offset-4 hover:text-navy-soft hover:underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone aria-hidden="true" className="size-4 shrink-0 text-navy-soft" />
              <a className="underline-offset-4 hover:text-navy-soft hover:underline" href={siteConfig.phoneHref}>
                {siteConfig.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            &copy; <CurrentYear /> {siteConfig.legalName} All rights reserved.
          </p>
          <p>{siteConfig.domain}</p>
        </div>
      </div>
    </footer>
  )
}
