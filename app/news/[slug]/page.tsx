import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/site/json-ld'
import { PageHero } from '@/components/site/page-hero'
import { articleJsonLd, buildMetadata } from '@/lib/seo'
import { getArticleBySlug } from '@/lib/articles-db'
export const dynamicParams=true
export const revalidate=60
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const post=await getArticleBySlug(slug);if(!post)return {};return buildMetadata({title:post.title,description:post.excerpt,path:`/news/${slug}`,image:post.image,type:'article'})}
export default async function NewsDetail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const post=await getArticleBySlug(slug);if(!post)notFound();return <><JsonLd data={articleJsonLd(post)}/><PageHero eyebrow="News" title={post.title} description={post.excerpt} crumbs={[{name:'News',path:'/news'},{name:post.title,path:`/news/${slug}`}]} /><article className="article-prose mx-auto max-w-3xl px-5 py-16 sm:px-8">{post.body.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</article></>}
