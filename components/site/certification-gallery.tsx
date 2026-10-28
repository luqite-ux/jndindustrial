import Image from 'next/image'

const certificates = [
  { standard: 'ISO 9001:2015', title: 'Quality Management System', registration: '12425Q01750R001', image: '/images/certificates/iso-9001-en.webp' },
  { standard: 'ISO 14001:2015', title: 'Environmental Management System', registration: '12425E00652R001', image: '/images/certificates/iso-14001-en.webp' },
  { standard: 'ISO 45001:2018', title: 'Occupational Health & Safety Management System', registration: '12425S00565R001', image: '/images/certificates/iso-45001-en.webp' },
]

export function CertificationGallery() {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{certificates.map((certificate) => <article key={certificate.standard} className="flex h-full flex-col border border-border bg-white">
    <a href={certificate.image} target="_blank" rel="noreferrer" aria-label={`Open ${certificate.standard} certificate`} className="group relative aspect-[.707/1] overflow-hidden bg-white"><Image src={certificate.image} alt={`${certificate.standard} ${certificate.title} certificate issued to JND`} fill className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.02]" sizes="(min-width:1024px) 30vw,(min-width:640px) 48vw,100vw" /></a>
    <div className="flex flex-1 flex-col border-t border-border p-5"><p className="eyebrow text-navy-soft">Certified management system</p><h3 className="mt-2 font-display text-2xl font-semibold text-navy">{certificate.standard}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{certificate.title}</p><dl className="mt-5 space-y-2 border-t border-border pt-4 text-xs text-muted-foreground"><div className="flex justify-between gap-4"><dt>Registration</dt><dd className="font-medium text-navy">{certificate.registration}</dd></div><div className="flex justify-between gap-4"><dt>Validity</dt><dd className="font-medium text-navy">Valid until 15 December 2028</dd></div></dl></div>
  </article>)}</div>
}
