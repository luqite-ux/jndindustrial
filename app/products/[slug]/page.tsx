import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { JsonLd } from '@/components/site/json-ld'
import { RfqBand } from '@/components/site/rfq-band'
import { getProductViews } from '@/lib/products'
import { fetchProductBySlug } from '@/lib/products-db'
import { buildMetadata, productJsonLd } from '@/lib/seo'

export const dynamicParams = true
export const revalidate = 60
export function generateStaticParams(){return getProductViews().map(product=>({slug:product.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const product=await fetchProductBySlug(slug);if(!product)return {};return buildMetadata({title:product.name,description:product.summary,path:`/products/${slug}`,image:product.image})}

export default async function ProductDetailPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params
  const product=await fetchProductBySlug(slug)
  if(!product) notFound()
  return <>
    <JsonLd data={productJsonLd(product)} />
    <PageHero eyebrow={product.familyName} title={product.name} description={product.summary} crumbs={[{name:'Products',path:'/products'},{name:product.name,path:`/products/${slug}`}]} />
    <section className="section-pad bg-background"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
      <div className="relative aspect-[4/3] overflow-hidden bg-white">{product.image?<Image src={product.image} alt={product.imageAlt??product.name} fill priority className="object-contain p-3 sm:p-5" sizes="(min-width:1024px) 50vw,100vw"/>:null}</div>
      <div><p className="eyebrow text-navy-soft">What it does</p><h2 className="mt-3 font-display text-3xl font-semibold text-navy">Process role</h2><p className="mt-5 text-lg leading-relaxed text-muted-foreground">{product.whatItDoes}</p><div className="mt-8"><Link href={`/contact?product=${encodeURIComponent(product.slug)}`} className="inline-flex h-11 items-center bg-cta px-5 font-semibold text-cta-foreground">Request configuration review</Link></div></div>
    </div></section>
    <section className="section-pad bg-steel"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-3">{[['When to choose',product.whenToChoose],['Configuration points',product.configuration],['Inputs to share',[...product.selectionInputs,...product.applicationRoles.slice(0,2)]]].map(([title,items])=><article key={String(title)} className="bg-white p-6"><h2 className="font-display text-2xl font-semibold text-navy">{String(title)}</h2><ul className="mt-5 space-y-3">{(items as string[]).map(item=><li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-navy-soft"/>{item}</li>)}</ul></article>)}</div></section>
    <RfqBand title={`Discuss a ${product.name} configuration.`} description="Send your material, batch or vessel size, operating conditions and drawings. The configuration is reviewed per project." href={`/contact?product=${encodeURIComponent(product.slug)}`} />
  </>
}
