import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Factory, FlaskConical, Gauge, Settings2, ShieldCheck } from 'lucide-react'
import { HeroCarousel } from '@/components/home/hero-carousel'
import { ProductCard } from '@/components/product-card'
import { RfqBand } from '@/components/site/rfq-band'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { industries } from '@/lib/content'
import { getProductViews } from '@/lib/products'

const process = [
  ['01', 'Process inputs', 'Share material, batch volume, viscosity and operating conditions.'],
  ['02', 'Configuration review', 'Engineers compare vessel geometry, mixing duty and site constraints.'],
  ['03', 'Design alignment', 'Drawings, interfaces and inspection needs are confirmed before production.'],
  ['04', 'Manufacturing', 'Fabrication and assembly progress can be reported during the order.'],
  ['05', 'Inspection & delivery', 'Factory inspection and third-party inspection can be arranged as required.'],
]

const faqs = [
  ['Can JND customize equipment?', 'Yes. Size, material, process configuration and interfaces can be reviewed against your process and drawings.'],
  ['What is the minimum order quantity?', 'The customer-stated MOQ is one unit. Final scope and commercial terms are confirmed per quotation.'],
  ['Can you provide samples?', 'These are non-standard industrial machines and vessels, so physical samples are generally not available. Technical data and inspection documentation can be discussed instead.'],
  ['Which industries do you serve?', 'Confirmed applications include petrochemical, fine chemical, biological fermentation, lithium battery materials, food and pharmaceutical processing.'],
  ['What information helps equipment selection?', 'Send the material or medium, batch size or vessel dimensions, viscosity, temperature, pressure where applicable, quantity and any drawings or site constraints.'],
]

export default function HomePage() {
  const products = getProductViews()
  return <>
    <HeroCarousel />
    <section className="section-pad bg-background"><div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading eyebrow="Equipment families" title="Twelve equipment types, one process-led selection path." description="Start with the mixing duty or process step, then narrow the configuration around your material and operating conditions." />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.slice(0, 6).map((product, index) => <ProductCard key={product.slug} product={product} delay={index * 55} />)}</div>
      <Reveal className="mt-8 flex justify-end"><Link href="/products" className="inline-flex items-center gap-2 font-semibold text-navy-soft hover:underline">Compare all 12 products <ArrowRight className="size-4" /></Link></Reveal>
    </div></section>
    <section className="section-pad bg-steel"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:items-center">
      <Reveal className="relative min-h-[430px] overflow-hidden rounded-sm bg-white"><Image src="/images/facility/factory-exterior.jpg" alt="JND factory exterior in Changzhou" fill className="object-cover" sizes="(min-width:1024px) 48vw, 100vw" /></Reveal>
      <div><SectionHeading eyebrow="Engineering & manufacturing" title="Define the equipment from the process, not from a generic catalogue." description="JND supplies mixing devices, mixers and process vessels for non-standard projects. Selection starts with the medium, duty, batch size and operating conditions." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">{[[Settings2,'Non-standard configuration','Interfaces, geometry and internals aligned to the project.'],[Gauge,'Operating-condition review','Temperature, pressure, viscosity and duty considered where applicable.'],[Factory,'Manufacturing visibility','Production progress feedback can be provided during an order.'],[ShieldCheck,'Inspection options','Factory documentation and third-party inspection can be discussed.']].map(([Icon,title,body], index) => <Reveal key={String(title)} delay={index*60} className="border-l-2 border-cyan bg-white p-5"><Icon aria-hidden className="size-6 text-navy-soft" /><h3 className="mt-4 font-display text-xl font-semibold text-navy">{String(title)}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{String(body)}</p></Reveal>)}</div>
      </div>
    </div></section>
    <section className="section-pad bg-navy text-white"><div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading tone="dark" eyebrow="Application matching" title="Equipment choices change with the material and the duty." description="Use the industry routes as a starting point, then share the exact medium and process constraints for engineering review." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{industries.slice(0,5).map((industry,index)=>{const Icon=industry.icon;return <Reveal key={industry.id} delay={index*45} className="border border-white/15 bg-white/5 p-5"><Icon aria-hidden className="size-7 text-cyan"/><h3 className="mt-5 font-display text-xl font-semibold">{industry.name}</h3><p className="mt-3 text-sm leading-relaxed text-white/70">{industry.summary}</p></Reveal>})}</div>
    </div></section>
    <section className="section-pad bg-background"><div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading eyebrow="From requirement to equipment" title="A five-step path for non-standard orders." description="The process keeps buyer inputs, design decisions and inspection expectations visible before production." />
      <div className="relative mt-12 grid gap-4 lg:grid-cols-5"><div aria-hidden className="absolute left-[8%] right-[8%] top-8 hidden h-px bg-border lg:block" />{process.map(([number,title,body],index)=><Reveal key={number} delay={index*55} className="relative bg-white p-5"><span className="grid size-16 place-items-center rounded-full border-4 border-background bg-navy font-display text-lg font-semibold text-white">{number}</span><h3 className="mt-5 font-display text-xl font-semibold text-navy">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p></Reveal>)}</div>
    </div></section>
    <section className="section-pad bg-steel"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr]">
      <div><SectionHeading eyebrow="Buyer questions" title="Clarify the basics before the first technical call." /><Reveal className="mt-8 flex items-start gap-4 bg-white p-5"><FlaskConical className="mt-1 size-6 text-navy-soft" /><p className="text-sm leading-relaxed text-muted-foreground">Technical data, drawings and operating inputs are more useful than a standard sample for this non-standard equipment.</p></Reveal></div>
      <Reveal><Accordion type="single" collapsible className="border-t border-border">{faqs.map(([question,answer])=><AccordionItem key={question} value={question}><AccordionTrigger className="text-left font-display text-lg text-navy">{question}</AccordionTrigger><AccordionContent className="text-base leading-relaxed text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}</Accordion></Reveal>
    </div></section>
    <section className="section-pad bg-background"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
      <Reveal className="relative min-h-[420px] overflow-hidden rounded-sm bg-steel"><Image src="/images/facility/office.png" alt="JND laboratory and engineering workspace" fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" /></Reveal>
      <div><SectionHeading eyebrow="Quality evidence" title="Documentation and inspection planned around the order." description="Customer materials state that technical data sheets, inspection reports, factory inspection and third-party inspection can be provided or arranged according to the project." /><ul className="mt-8 space-y-4">{['Process requirements reviewed before configuration','Production progress feedback available','Factory inspection documentation discussed per order','Third-party inspection supported when required'].map((item,index)=><Reveal as="li" key={item} delay={index*50} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-navy-soft"/><span className="text-muted-foreground">{item}</span></Reveal>)}</ul></div>
    </div></section>
    <RfqBand />
  </>
}
