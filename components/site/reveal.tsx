'use client'

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type RevealState = 'idle' | 'hidden' | 'shown' | 'fallback'

const MAX_STAGGER_MS = 210

/**
 * Once-only reveal tied to the real viewport. Content stays visible until the client has
 * confirmed an IntersectionObserver is watching the element. If observation is unavailable
 * or throws, the element is simply shown and no reveal is marked as played.
 */
export function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [state, setState] = useState<RevealState>('idle')

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState('shown')
      return
    }
    if (typeof IntersectionObserver === 'undefined') {
      setState('fallback')
      return
    }

    let observer: IntersectionObserver | undefined
    try {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setState('shown')
            observer?.disconnect()
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
      )
      setState('hidden')
      observer.observe(element)
    } catch {
      setState('fallback')
    }

    return () => observer?.disconnect()
  }, [])

  const dataReveal = state === 'idle' ? 'visible' : state
  return { ref, state, dataReveal }
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'p'
}

export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const { ref, dataReveal } = useRevealOnce<HTMLElement>()
  const Tag = as as 'div'
  const style = { '--reveal-delay': `${Math.min(delay, MAX_STAGGER_MS)}ms` } as CSSProperties

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn('reveal', className)}
      data-reveal={dataReveal}
      style={style}
    >
      {children}
    </Tag>
  )
}
