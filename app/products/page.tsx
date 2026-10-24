import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { ProductCard } from '@/components/product-card'
import { RfqBand } from '@/components/site/rfq-band'
import { getFamilyViews } from '@/lib/products'
import { fetchProductsData } from '@/lib/products-db'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({ title: 'Industrial Mixers, Agitators & Process Equipment', description: 'Compare 12 JND equipment types across agitators, horizontal mixers, reactors, tanks, silos, heat exchangers and process towers.', path: '/products' })

export const revalidate = 60

export default async function ProductsPage() {
  const families = getFamilyViews()
  const products = await fetchProductsData()
  return <>
    <PageHero eyebrow="Product catalogue" title="Select equipment by process duty and material." description="Every product is configurable. Use the catalogue to identify a starting point, then share the process inputs needed for engineering review." crumbs={[{name:'Products',path:'/products'}]} />
    <div className="mx-auto max-w-7xl space-y-16 px-5 py-16 sm:px-8 sm:py-20">{families.map(family=><section key={family.slug} id={family.slug}><h2 className="font-display text-3xl font-semibold text-navy">{family.name}</h2><p className="mt-3 max-w-3xl text-muted-foreground">{family.description}</p><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.filter(product=>product.family===family.slug).map((product,index)=><ProductCard key={product.slug} product={product} delay={index*55}/>)}</div></section>)}</div>
    <RfqBand title="Not sure which equipment family fits?" description="Share the material, desired result and operating conditions. JND will review the starting configuration with you." />
  </>
}
