'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { ActionLink } from '@/components/site/action-link'
import { cn } from '@/lib/utils'

interface Slide {
  image: string
  alt: string
  kicker: string
  body: string
  textSide: 'left' | 'right'
  desktopTone: 'light' | 'dark'
  desktopPosition: string
  mobilePosition: string
  zoomOrigin: string
}

const slides: Slide[] = [
  {
    image: '/images/hero/banner-1.jpg',
    alt: 'Illustrated process plant with stainless steel reactors, agitator drives, motors and a technical control display on a pale blue stage',
    kicker: 'Industrial mixing and process equipment',
    body: 'Agitators, mixers, reactors, tanks and heat exchangers, specified from your material, batch volume and operating conditions.',
    textSide: 'left',
    desktopTone: 'light',
    desktopPosition: '20% 50%',
    mobilePosition: '72% 50%',
    zoomOrigin: '72% 62%',
  },
  {
    image: '/images/hero/banner-2.jpg',
    alt: 'Industrial factory complex with a process tower, horizontal vessel and silos beside a glowing curved road on a deep blue background',
    kicker: 'Built in Changzhou, Jiangsu',
    body: 'Non-standard vessels, silos and process equipment fabricated against your drawings, with production progress feedback.',
    textSide: 'right',
    desktopTone: 'dark',
    desktopPosition: '50% 50%',
    mobilePosition: '24% 50%',
    zoomOrigin: '25% 60%',
  },
  {
    image: '/images/hero/banner-3.jpg',
    alt: 'Wireframe engineering view of reactors and mixer drums inside a factory hall, circled by glowing flow lines',
    kicker: 'Non-standard customization and OEM/ODM',
    body: 'Send drawings or a process description and engineers will propose a configuration. MOQ is 1 unit.',
    textSide: 'right',
    desktopTone: 'dark',
    desktopPosition: '50% 50%',
    mobilePosition: '27% 50%',
    zoomOrigin: '27% 55%',
  },
]

const AUTOPLAY_MS = 7000
const SWIPE_PX = 48

export function HeroCarousel() {
  const [active, setActive] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(query.matches)
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const go = useCallback((index: number) => {
    setActive((index + slides.length) % slides.length)
  }, [])

  const autoplaying = !reducedMotion && !userPaused && !hovering && !focusWithin

  useEffect(() => {
    if (!autoplaying) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [autoplaying, active])

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') go(active - 1)
    if (event.key === 'ArrowRight') go(active + 1)
  }

  const current = slides[active]

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured equipment and capabilities"
      className="relative isolate h-[calc(100svh-4rem)] min-h-[640px] max-h-[820px] overflow-hidden bg-navy lg:h-[calc(100svh-5rem)] lg:max-h-[860px]"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false)
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current
        touchStartX.current = null
        if (start === null) return
        const delta = (event.changedTouches[0]?.clientX ?? start) - start
        if (Math.abs(delta) >= SWIPE_PX) go(active + (delta < 0 ? 1 : -1))
      }}
    >
      <div aria-live={autoplaying ? 'off' : 'polite'}>
        {slides.map((slide, index) => {
          const isActive = index === active
          return (
            <div
              key={slide.image}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              aria-hidden={!isActive}
              className={cn(
                'absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none',
                isActive ? 'opacity-100' : 'pointer-events-none opacity-0',
              )}
            >
              <div
                className={cn(
                  'absolute inset-0 motion-reduce:!animate-none',
                  isActive && !reducedMotion && 'animate-[hero-push_9s_ease-out_forwards]',
                )}
                style={{ transformOrigin: slide.zoomOrigin } as CSSProperties}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover [object-position:var(--pos-m)] md:[object-position:var(--pos-d)]"
                  style={
                    {
                      '--pos-m': slide.mobilePosition,
                      '--pos-d': slide.desktopPosition,
                    } as CSSProperties
                  }
                />
              </div>

              {/* Legibility scrims: mobile always darkens the lower text zone; desktop only where text sits. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/65 to-navy/0 md:hidden"
              />
              {slide.textSide === 'left' ? (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 hidden bg-gradient-to-r from-white/85 via-white/45 to-transparent md:block md:w-[62%]"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 right-0 hidden w-[55%] bg-gradient-to-l from-navy/90 via-navy/55 to-transparent md:block"
                />
              )}
            </div>
          )
        })}
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-end md:items-center">
        <div
          className={cn(
            'mx-auto flex w-full max-w-7xl px-5 pb-28 sm:px-8 md:pb-10',
            current.textSide === 'right' ? 'md:justify-end' : 'md:justify-start',
          )}
        >
          <div
            key={active}
            className="pointer-events-auto max-w-xl animate-in fade-in-0 slide-in-from-bottom-3 duration-500 motion-reduce:animate-none md:max-w-[34rem]"
          >
            <p
              className={cn(
                'eyebrow mb-4',
                current.desktopTone === 'light' ? 'text-cyan md:text-navy-soft' : 'text-cyan',
              )}
            >
              {current.kicker}
            </p>
            <h1
              className={cn(
                'text-balance text-[2.5rem] font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl',
                current.desktopTone === 'light' && 'md:text-navy',
              )}
            >
              Mixing and process equipment, engineered around your material.
            </h1>
            <p
              className={cn(
                'mt-5 text-pretty text-base leading-relaxed text-white/90 sm:text-lg',
                current.desktopTone === 'light' && 'md:text-navy/85',
              )}
            >
              {current.body}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ActionLink href="/products">Explore Equipment</ActionLink>
              <ActionLink
                href="/contact"
                variant="outline-light"
                className={cn(
                  current.desktopTone === 'light' &&
                    'md:border-navy md:text-navy md:hover:bg-navy md:hover:text-white',
                )}
                arrow={false}
              >
                Request a Quote
              </ActionLink>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 pb-6 sm:px-8">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous slide"
            className="grid size-11 place-items-center rounded-sm bg-navy/85 text-white transition-colors duration-200 hover:bg-navy-soft active:translate-y-px"
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next slide"
            className="grid size-11 place-items-center rounded-sm bg-navy/85 text-white transition-colors duration-200 hover:bg-navy-soft active:translate-y-px"
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
          {reducedMotion ? null : (
            <button
              type="button"
              onClick={() => setUserPaused((value) => !value)}
              aria-label={userPaused ? 'Start automatic slide rotation' : 'Pause automatic slide rotation'}
              className="grid size-11 place-items-center rounded-sm bg-navy/85 text-white transition-colors duration-200 hover:bg-navy-soft active:translate-y-px"
            >
              {userPaused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
            </button>
          )}
          <div className="ml-2 flex items-center gap-1" role="group" aria-label="Choose slide">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => go(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === active}
                className="grid h-11 w-8 place-items-center"
              >
                <span
                  className={cn(
                    'block h-1 rounded-full transition-all duration-200',
                    index === active ? 'w-8 bg-cta' : 'w-5 bg-white/70',
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
