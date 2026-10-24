'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { navItems, siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:h-20">
        <Link
          href="/"
          aria-label="JND Industrial home"
          className="flex shrink-0 items-center rounded-sm"
        >
          <Image
            src={siteConfig.logo.src}
            alt={siteConfig.logo.alt}
            width={siteConfig.logo.width}
            height={siteConfig.logo.height}
            priority
            className="h-9 w-auto lg:h-11"
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative block rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-200',
                      active ? 'text-navy-soft' : 'text-navy/80 hover:text-navy-soft',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3 -bottom-0.5 h-0.5 origin-left bg-navy-soft transition-transform duration-200',
                        active ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden h-10 rounded-sm bg-cta px-4 font-semibold text-cta-foreground duration-200 hover:bg-cta-hover active:translate-y-px sm:inline-flex"
          >
            <Link href="/contact">Request a Quote</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="size-10 rounded-sm lg:hidden" aria-label="Open menu">
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(86vw,22rem)] bg-white p-0">
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <SheetDescription className="sr-only">Links to every section of the JND Industrial website.</SheetDescription>
              <nav aria-label="Mobile" className="flex h-full flex-col px-6 pb-8 pt-14">
                <ul className="divide-y divide-border">
                  {navItems.map((item) => {
                    const active = isActive(pathname, item.href)
                    return (
                      <li key={item.href}>
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            aria-current={active ? 'page' : undefined}
                            className={cn(
                              'flex items-center justify-between py-4 font-display text-2xl font-semibold',
                              active ? 'text-navy-soft' : 'text-navy',
                            )}
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                      </li>
                    )
                  })}
                </ul>
                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className="mt-auto flex h-12 items-center justify-center rounded-sm bg-cta font-semibold text-cta-foreground"
                  >
                    Request a Quote
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
