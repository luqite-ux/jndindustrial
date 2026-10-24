import { Fragment } from 'react'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { breadcrumbJsonLd } from '@/lib/seo'
import { JsonLd } from './json-ld'
import { Reveal } from './reveal'

export interface Crumb {
  name: string
  path: string
}

interface PageHeroProps {
  eyebrow: string
  title: string
  description?: string
  crumbs: Crumb[]
  children?: React.ReactNode
}

export function PageHero({ eyebrow, title, description, crumbs, children }: PageHeroProps) {
  const trail: Crumb[] = [{ name: 'Home', path: '/' }, ...crumbs]
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="grid-lines-dark absolute inset-0 -z-10" />
      <svg
        aria-hidden="true"
        viewBox="0 0 800 300"
        preserveAspectRatio="xMaxYMid slice"
        className="absolute inset-y-0 right-0 -z-10 h-full w-[70%] text-cyan/40"
        fill="none"
      >
        <path d="M0 250C150 250 200 60 360 60S560 230 800 120" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0 270C170 270 230 100 390 100S590 250 800 150" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <path d="M0 290C190 290 260 140 420 140S620 270 800 180" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      </svg>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-8 sm:pb-20 lg:pb-24">
        <Breadcrumb className="mb-10">
          <BreadcrumbList className="text-white/70">
            {trail.map((crumb, index) => {
              const last = index === trail.length - 1
              return (
                <Fragment key={crumb.path}>
                  <BreadcrumbItem>
                    {last ? (
                      <BreadcrumbPage className="text-white">{crumb.name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild className="hover:text-white">
                        <Link href={crumb.path}>{crumb.name}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {last ? null : <BreadcrumbSeparator className="text-white/50" />}
                </Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4 text-cyan">{eyebrow}</p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
        </Reveal>
      </div>
    </section>
  )
}
