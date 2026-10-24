import type { ReactNode } from 'react'
import { getSiteContent } from '@/lib/site-content/site-content'
import { PageHero, type Crumb } from './page-hero'

interface ManagedPageHeroProps {
  path: string
  eyebrow: string
  title: string
  description?: string
  crumbs: Crumb[]
  children?: ReactNode
}

export async function ManagedPageHero({ path, eyebrow, title, description, crumbs, children }: ManagedPageHeroProps) {
  const snapshot = await getSiteContent('en')
  const hero = snapshot?.pages.find(page => page.path === path)?.modules.find(module => module.type === 'hero')?.values
  const content = {
    eyebrow: typeof hero?.eyebrow === 'string' && hero.eyebrow ? hero.eyebrow : eyebrow,
    title: typeof hero?.title === 'string' && hero.title ? hero.title : title,
    description: typeof hero?.description === 'string' && hero.description ? hero.description : description,
  }
  const rendered = <PageHero {...content} crumbs={crumbs}>{children}</PageHero>
  return snapshot ? <div data-hq-content-version={snapshot.version}>{rendered}</div> : rendered
}
