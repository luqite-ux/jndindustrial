import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { RfqBand } from '@/components/site/rfq-band'
import { Reveal } from '@/components/site/reveal'
import { industries } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export const metadata:Metadata=buildMetadata({title:'Applications',description:'Explore how JND mixing and process equipment is configured for petrochemical, fine chemical, fermentation, battery-material, food and pharmaceutical duties.',path:'/applications'})
export default function ApplicationsPage(){return <><PageHero eyebrow="Industry applications" title="Match equipment to the process, not only the industry label." description="Each sector brings different materials, duties and operating constraints. These application routes show the inputs needed for a useful first review." crumbs={[{name:'Applications',path:'/applications'}]}/><section className="section-pad"><div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 md:grid-cols-2">{industries.map((industry,index)=>{const Icon=industry.icon;return <Reveal key={industry.id} delay={index*45} className="border border-border bg-white p-7"><Icon className="size-8 text-navy-soft"/><h2 className="mt-5 font-display text-3xl font-semibold text-navy">{industry.name}</h2><p className="mt-4 text-muted-foreground">{industry.summary}</p><h3 className="mt-7 font-semibold text-navy">Inputs to discuss</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">{industry.inputs.map(item=><li key={item}>{item}</li>)}</ul></Reveal>})}</div></section><RfqBand/></>}
