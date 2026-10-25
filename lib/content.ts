import {
  BatteryCharging,
  ClipboardList,
  Dna,
  FlaskConical,
  Fuel,
  Factory,
  Pill,
  Ruler,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from 'lucide-react'

export interface Industry {
  id: string
  name: string
  icon: LucideIcon
  summary: string
  inputs: string[]
}

export const industries: Industry[] = [
  {
    id: 'petrochemical',
    name: 'Petrochemical',
    icon: Fuel,
    summary:
      'Vessels and agitation equipment for petrochemical process lines, built around the medium and duty you describe.',
    inputs: [
      'Medium composition and hazard classification',
      'Design temperature and pressure',
      'Required nozzles and instrument connections',
      'Applicable site or project standards',
    ],
  },
  {
    id: 'fine-chemical',
    name: 'Fine Chemical',
    icon: FlaskConical,
    summary:
      'Reactors, agitators and blending vessels for multi-step fine chemical production and small to mid-size batches.',
    inputs: [
      'Reaction steps and charging sequence',
      'Heating and cooling duty',
      'Batch volume range',
      'Compatibility of the medium with wetted materials',
    ],
  },
  {
    id: 'biological-fermentation',
    name: 'Biological Fermentation',
    icon: Dna,
    summary:
      'Agitated vessels and tanks for fermentation and biological processing, configured to your culture and cleaning needs.',
    inputs: [
      'Working volume and aspect ratio',
      'Temperature control requirements',
      'Cleaning method and surface finish expectations',
      'Agitation intensity needed for the culture',
    ],
  },
  {
    id: 'lithium-battery-materials',
    name: 'Lithium Battery Materials',
    icon: BatteryCharging,
    summary:
      'Mixers, vessels and silos for powders and slurries used in lithium battery material production.',
    inputs: [
      'Powder or slurry characteristics',
      'Batch size and blending time target',
      'Contamination and material contact constraints',
      'Charging and discharge method',
    ],
  },
  {
    id: 'food-pharmaceutical',
    name: 'Food & Pharmaceutical',
    icon: Pill,
    summary:
      'Mixers, tanks and agitators for food and pharmaceutical products where surface finish and cleaning matter.',
    inputs: [
      'Product type and batch size',
      'Surface finish and cleaning requirements',
      'Applicable hygiene or regulatory requirements',
      'Material contact restrictions',
    ],
  },
]

export interface ProcessStep {
  title: string
  description: string
  icon: LucideIcon
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Condition analysis',
    description:
      'You share the material, process goal, batch size, viscosity, temperature and pressure. Engineers review them together.',
    icon: ClipboardList,
  },
  {
    title: 'Structural design',
    description:
      'A configuration is proposed, including non-standard layouts and drawings where your site requires them.',
    icon: Ruler,
  },
  {
    title: 'Manufacturing',
    description:
      'The equipment is built at the Changzhou factory, with production progress feedback while it is made.',
    icon: Factory,
  },
  {
    title: 'Inspection',
    description:
      'Factory inspection is carried out, third-party inspection can be arranged, and technical parameter sheets and test reports can be provided.',
    icon: ShieldCheck,
  },
  {
    title: 'Delivery',
    description:
      'Delivery is scheduled against the lead time confirmed for your order and operating conditions.',
    icon: Truck,
  },
]

export const faqs = [
  {
    question: 'What is the minimum order quantity?',
    answer: 'The minimum order quantity is 1 unit.',
  },
  {
    question: 'What is the typical lead time?',
    answer:
      'Customer information gives a range of 45–90 days. The lead time that applies to you is confirmed from your order and operating conditions.',
  },
  {
    question: 'Can you build non-standard equipment or work as an OEM/ODM supplier?',
    answer:
      'Yes. JND supports non-standard customization and OEM/ODM projects. Send your process description and any drawings with your inquiry.',
  },
  {
    question: 'Can I get a sample?',
    answer:
      'These are non-standard industrial machines and vessels, so physical samples are generally not available. Send your process requirements or drawings and an engineer will review the appropriate configuration.',
  },
  {
    question: 'Which documents can I receive?',
    answer:
      'Technical parameter sheets and inspection or test reports can be provided for your order.',
  },
  {
    question: 'How is quality checked before shipment?',
    answer:
      'Factory inspection is carried out before shipment and third-party inspection can be arranged. You also receive production progress feedback while the equipment is being built.',
  },
  {
    question: 'What information do you need to prepare a quote?',
    answer:
      'The material or process, batch volume or vessel size, viscosity, temperature and pressure where they apply, quantity and any drawings. Customization notes help engineers respond faster.',
  },
]

export const processRoles = [
  {
    need: 'Blend, suspend or disperse liquids in a vessel',
    families: 'Agitation Devices, Blending Tank, Reactor',
    href: '/products?family=agitation-devices',
  },
  {
    need: 'Blend dry powders, granules or pastes',
    families: 'Horizontal Ribbon, Ploughshare and Drum Mixers',
    href: '/products?family=industrial-mixers',
  },
  {
    need: 'React, hold, transfer heat or separate',
    families: 'Reactor, Tanks, Silo, Heat Exchanger, Process Tower',
    href: '/products?family=process-vessels-equipment',
  },
]

export const certificate = {
  src: '/images/credentials/iso-certificate.png',
  alt: 'Quality management system certificate issued to Jianengde (Changzhou) Intelligent Equipment Co., Ltd., showing GB/T 19001-2016 / ISO 9001:2015',
  standard: 'GB/T 19001-2016 / ISO 9001:2015',
  scope: 'Design and production of agitation equipment and mixing equipment',
  issuer: 'CSI Guolian (Beijing) Certification Center',
  issued: '16 December 2025',
  validUntil: '15 December 2028',
}
