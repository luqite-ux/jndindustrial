import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ProductView } from '@/lib/products'
import { Reveal } from '@/components/site/reveal'

export function ProductCard({ product, delay = 0 }: { product: ProductView; delay?: number }) {
  return <Reveal as="article" delay={delay} className="group flex h-full flex-col border border-border bg-white">
    <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-[#f7f9fb] p-6">{product.image ? <Image src={product.image} alt={product.imageAlt ?? product.name} fill className="object-contain p-5 transition-transform duration-300 group-hover:scale-[1.025]" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" /> : null}</Link>
    <div className="flex flex-1 flex-col p-5"><p className="eyebrow text-navy-soft">{product.familyName}</p><h2 className="mt-3 font-display text-2xl font-semibold text-navy"><Link href={`/products/${product.slug}`} className="hover:text-navy-soft">{product.name}</Link></h2><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{product.summary}</p><Link href={`/products/${product.slug}`} className="mt-5 inline-flex items-center gap-2 font-semibold text-navy-soft">View equipment <ArrowUpRight className="size-4" /></Link></div>
  </Reveal>
}
