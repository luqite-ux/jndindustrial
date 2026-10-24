import { Mail, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/site'
import { ActionLink } from './action-link'
import { Reveal } from './reveal'

interface RfqBandProps {
  title?: string
  description?: string
  ctaLabel?: string
  href?: string
}

export function RfqBand({
  title = 'Tell us about your material and process.',
  description = 'Share your material, batch volume or vessel size, and operating conditions. An engineer will review them and reply with a recommended configuration.',
  ctaLabel = 'Request a Quote',
  href = '/contact',
}: RfqBandProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-20 text-white sm:py-24">
      <div aria-hidden="true" className="grid-lines-dark absolute inset-0 -z-10" />
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        className="absolute inset-0 -z-10 h-full w-full text-cyan/30"
        fill="none"
      >
        <path d="M0 320C250 320 300 100 560 100S900 330 1200 160" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0 350C270 350 340 140 600 140S940 350 1200 200" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </svg>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <Reveal>
          <p className="eyebrow mb-3 text-cyan">Request for quotation</p>
          <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>
          <div className="mt-8">
            <ActionLink href={href}>{ctaLabel}</ActionLink>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <ul className="space-y-4 border-l border-white/20 pl-6 text-sm">
            <li className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan" />
              <a className="underline-offset-4 hover:underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan" />
              <a className="underline-offset-4 hover:underline" href={siteConfig.phoneHref}>
                {siteConfig.phoneDisplay}
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
