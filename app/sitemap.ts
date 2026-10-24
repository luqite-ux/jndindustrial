import type { MetadataRoute } from 'next'
import { getPublishedArticles } from '@/lib/articles-db'
import { fetchProductsData } from '@/lib/products-db'
import { siteConfig } from '@/lib/site'
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const now=new Date();const staticPaths=['','/products','/applications','/capabilities','/about','/news','/contact'];const [posts,products]=await Promise.all([getPublishedArticles(),fetchProductsData()]);return [...staticPaths.map(path=>({url:`${siteConfig.url}${path}`,lastModified:now,changeFrequency:'monthly' as const,priority:path===''?1:.7})),...products.map(product=>({url:`${siteConfig.url}/products/${product.slug}`,lastModified:now,changeFrequency:'monthly' as const,priority:.8})),...posts.map(post=>({url:`${siteConfig.url}/news/${post.slug}`,lastModified:new Date(post.updatedAt??post.publishedAt),changeFrequency:'monthly' as const,priority:.6}))]}
