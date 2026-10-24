import { defaultLocale, resolveLocalized, type Locale, type Localized } from './i18n'

export interface NewsCopy {
  title: string
  excerpt: string
  body: string[]
}

export interface NewsPost {
  slug: string
  publishedAt: string
  updatedAt?: string
  image?: string
  copy: Localized<NewsCopy>
}

export type NewsPostView = NewsCopy & Pick<NewsPost, 'slug' | 'publishedAt' | 'updatedAt' | 'image'>

function toView(post: NewsPost, locale: Locale): NewsPostView | undefined {
  const copy = resolveLocalized(post.copy, locale)
  if (!copy) return undefined
  const { slug, publishedAt, updatedAt, image } = post
  return { slug, publishedAt, updatedAt, image, ...copy }
}

// Replace this source with the content backend query. No posts exist until the customer publishes some.
async function fetchPosts(): Promise<NewsPost[]> {
  return []
}

export async function getNewsPosts(locale: Locale = defaultLocale): Promise<NewsPostView[]> {
  const posts = await fetchPosts()
  return posts
    .map((post) => toView(post, locale))
    .filter((view): view is NewsPostView => Boolean(view))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export async function getNewsPost(
  slug: string,
  locale: Locale = defaultLocale,
): Promise<NewsPostView | undefined> {
  const posts = await getNewsPosts(locale)
  return posts.find((post) => post.slug === slug)
}
