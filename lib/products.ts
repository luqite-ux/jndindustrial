import { defaultLocale, resolveLocalized, type Locale, type Localized } from './i18n'

export type ProductFamilySlug =
  | 'agitation-devices'
  | 'industrial-mixers'
  | 'process-vessels-equipment'

export interface ProductFamily {
  slug: ProductFamilySlug
  copy: Localized<{ name: string; description: string }>
}

export interface ProductCopy {
  name: string
  summary: string
  whatItDoes: string
  whenToChoose: string[]
  applicationRoles: string[]
  configuration: string[]
  selectionInputs: string[]
  imageAlt?: string
}

export interface Product {
  slug: string
  family: ProductFamilySlug
  image?: string
  copy: Localized<ProductCopy>
}

export type ProductView = ProductCopy & {
  slug: string
  family: ProductFamilySlug
  familyName: string
  image?: string
}

export const productFamilies: ProductFamily[] = [
  {
    slug: 'agitation-devices',
    copy: {
      en: {
        name: 'Agitation Devices',
        description:
          'Top-, side- and bottom-entry agitators that put a drive and impeller into an existing or new vessel.',
      },
    },
  },
  {
    slug: 'industrial-mixers',
    copy: {
      en: {
        name: 'Industrial Mixers',
        description:
          'Horizontal ribbon, ploughshare and drum mixers for blending powders, granules and pastes.',
      },
    },
  },
  {
    slug: 'process-vessels-equipment',
    copy: {
      en: {
        name: 'Process Vessels & Equipment',
        description:
          'Reactors, blending and storage tanks, silos, shell-and-tube heat exchangers and process towers.',
      },
    },
  },
]

export const commonSelectionInputs = [
  'Material or medium and the role it plays in your process',
  'Batch volume or vessel size',
  'Viscosity range, where the medium is a liquid or paste',
  'Operating temperature and pressure, where applicable',
  'Quantity, plus any drawings or site constraints you already have',
]

export const products: Product[] = [
  {
    slug: 'top-entry-agitator',
    family: 'agitation-devices',
    image: '/materials/products/顶入式搅拌装置.jpg',
    copy: {
      en: {
        name: 'Top-Entry Agitator',
        summary:
          'A drive and shaft assembly that mounts on the vessel top to circulate, blend and suspend liquids.',
        whatItDoes:
          'A top-entry agitator carries a motor and gear drive above the vessel and lowers one or more impellers into the liquid on a vertical shaft. The impellers set up the flow pattern that blends, suspends or disperses the contents.',
        whenToChoose: [
          'The vessel has a top opening or flange available for the drive',
          'You need blending, suspension or dispersion in a vertical tank or reactor',
          'Impeller type and number of stages must be matched to the liquid and tank geometry',
        ],
        applicationRoles: [
          'Liquid blending in process tanks',
          'Solids suspension in slurries',
          'Agitation inside reactors and fermentation vessels',
        ],
        configuration: [
          'Impeller type, diameter and number of stages',
          'Shaft length and support arrangement for the liquid depth',
          'Motor and gearbox arrangement',
          'Shaft sealing method for the process conditions',
          'Wetted material selection for the medium',
        ],
        selectionInputs: ['Tank diameter and liquid depth', 'Required mixing duty, such as blending or suspension'],
        imageAlt:
          'Top-entry agitator with a blue motor and gear drive above a mounting flange, a long shaft and three impeller stages',
      },
    },
  },
  {
    slug: 'side-entry-agitator',
    family: 'agitation-devices',
    image: '/materials/products/侧入式搅拌装置.jpg',
    copy: {
      en: {
        name: 'Side-Entry Agitator',
        summary:
          'A propeller-type agitator mounted through the side wall of a tank to keep large volumes moving.',
        whatItDoes:
          'A side-entry agitator is mounted through the lower shell of a tank, with the propeller inside and the drive outside. It circulates the contents horizontally across the tank rather than from above.',
        whenToChoose: [
          'The tank is wide or low, or the top is not suitable for a drive',
          'You need circulation or blending in a storage or blending tank',
          'A shell nozzle can be provided for the agitator',
        ],
        applicationRoles: [
          'Circulation in storage and blending tanks',
          'Keeping fluids homogeneous during holding',
          'Blending in large-diameter vessels',
        ],
        configuration: [
          'Propeller diameter and speed range',
          'Mounting position and nozzle orientation on the shell',
          'Shaft sealing method',
          'Number of agitators per tank',
          'Wetted material selection for the medium',
        ],
        selectionInputs: ['Tank diameter, height and nozzle position', 'Medium density and viscosity'],
      },
    },
  },
  {
    slug: 'bottom-entry-agitator',
    family: 'agitation-devices',
    image: '/materials/products/底入式搅拌装置.jpg',
    copy: {
      en: {
        name: 'Bottom-Entry Agitator',
        summary:
          'An agitator whose drive sits beneath the vessel and whose shaft enters through the bottom head.',
        whatItDoes:
          'A bottom-entry agitator places the drive below the vessel and passes a short shaft through the bottom head. The impeller works low in the liquid, which suits vessels where the top is occupied or where mixing must continue at low levels.',
        whenToChoose: [
          'The vessel top is occupied by other equipment',
          'The impeller needs to work close to the bottom of the vessel',
          'Headroom above the vessel is limited',
        ],
        applicationRoles: [
          'Mixing in vessels with crowded top connections',
          'Low-level mixing during discharge or partial fill',
          'Suspension of settling solids near the bottom',
        ],
        configuration: [
          'Bottom head design and bearing support',
          'Shaft sealing method suited to the medium',
          'Impeller type and diameter',
          'Drive arrangement and foundation clearance below the vessel',
          'Wetted material selection for the medium',
        ],
        selectionInputs: ['Space available beneath the vessel', 'Bottom head type and nozzle layout'],
      },
    },
  },
  {
    slug: 'horizontal-ribbon-mixer',
    family: 'industrial-mixers',
    image: '/materials/products/卧式螺带混合机.jpg',
    copy: {
      en: {
        name: 'Horizontal Ribbon Mixer',
        summary:
          'A horizontal trough mixer with a ribbon agitator for blending powders, granules and pastes.',
        whatItDoes:
          'A horizontal ribbon mixer turns a ribbon-style agitator inside a U-shaped trough. The ribbons move material in opposing directions along the trough so the batch is blended, and the charge is typically discharged through the bottom.',
        whenToChoose: [
          'You blend dry powders, granules or lightly wetted materials in batches',
          'You want a horizontal trough with top inlets and a bottom discharge',
          'Batch size is defined by trough volume rather than a tank shape',
        ],
        applicationRoles: [
          'Dry powder and granule blending',
          'Adding small liquid amounts to bulk solids',
          'Preparing batches ahead of downstream processing',
        ],
        configuration: [
          'Trough volume and working fill level',
          'Ribbon design and clearance to the trough wall',
          'Top inlet and bottom outlet layout',
          'Drive arrangement and shaft sealing method',
          'Contact material and surface finish for the product',
        ],
        selectionInputs: ['Bulk density and particle characteristics', 'Target batch size and charging method'],
        imageAlt:
          'Horizontal ribbon mixer with a flanged-inlet top plate, a trough body on mounting feet and a drive motor at one end',
      },
    },
  },
  {
    slug: 'ploughshare-mixer',
    family: 'industrial-mixers',
    image: '/materials/products/卧式犁刀混合机.jpg',
    copy: {
      en: {
        name: 'Ploughshare Mixer',
        summary:
          'A horizontal drum mixer with plough-shaped paddles for fast, thorough blending of dry and moist solids.',
        whatItDoes:
          'A ploughshare mixer rotates plough-shaped paddles on a horizontal shaft inside a cylindrical drum. The paddles throw material through the drum volume, which supports blending of powders, granules and moist solids.',
        whenToChoose: [
          'Your material needs more intensive blending than a ribbon agitator provides',
          'You process powders or granules with a liquid addition',
          'A cylindrical horizontal drum fits your layout',
        ],
        applicationRoles: [
          'Powder and granule blending',
          'Blending with liquid addition',
          'Preparing homogeneous batches before packing or reaction',
        ],
        configuration: [
          'Drum volume and working fill level',
          'Paddle layout and wall clearance',
          'Discharge arrangement',
          'Whether auxiliary dispersing devices are needed',
          'Contact material and surface finish for the product',
        ],
        selectionInputs: ['Material moisture and any liquid addition', 'Target batch size and cycle time'],
      },
    },
  },
  {
    slug: 'drum-mixer',
    family: 'industrial-mixers',
    image: '/materials/products/卧式滚筒混合机.jpg',
    copy: {
      en: {
        name: 'Drum Mixer',
        summary:
          'A rotating drum mixer that tumbles bulk material, suited to gentle batch blending.',
        whatItDoes:
          'A drum mixer rotates a closed drum so the contents tumble and fold over one another. The action is gentle, which makes it a candidate for materials that should not be subjected to intensive mechanical agitation.',
        whenToChoose: [
          'Your material is sensitive to intensive agitation',
          'You want a simple, enclosed batch blending action',
          'Loading and unloading through a drum opening suits your process',
        ],
        applicationRoles: [
          'Gentle batch blending of free-flowing solids',
          'Blending of materials that should not be sheared',
          'Small and medium batch preparation',
        ],
        configuration: [
          'Drum volume and fill level',
          'Drum orientation and rotation drive',
          'Loading and discharge opening design',
          'Internal baffles, where the material requires them',
          'Contact material and surface finish for the product',
        ],
        selectionInputs: ['Material flow behaviour and sensitivity to shear', 'Target batch size'],
      },
    },
  },
  {
    slug: 'reactor',
    family: 'process-vessels-equipment',
    image: '/materials/products/反应釜.jpg',
    copy: {
      en: {
        name: 'Reactor',
        summary:
          'A stirred process vessel with a heat transfer jacket for reactions and controlled-temperature processing.',
        whatItDoes:
          'A reactor combines a vessel, an agitator and a heat transfer surface so reactants can be mixed while being heated or cooled. The vessel carries nozzles and a manway for charging, sampling and inspection.',
        whenToChoose: [
          'Your process needs agitation and temperature control in one vessel',
          'You need defined nozzles, a manway and a drive on a single assembly',
          'The vessel must be built to your process layout rather than a standard size',
        ],
        applicationRoles: [
          'Chemical and fine chemical reaction steps',
          'Fermentation and biological processing vessels',
          'Temperature-controlled mixing and holding',
        ],
        configuration: [
          'Vessel volume and head design',
          'Jacket or coil arrangement for heating and cooling',
          'Agitator type, shaft sealing and drive arrangement',
          'Nozzle schedule and manway position',
          'Wetted material selection for the medium',
        ],
        selectionInputs: ['Reaction or process description', 'Heating and cooling duty and the utility available'],
        imageAlt:
          'Reactor vessel with an external coiled jacket, a top-mounted blue agitator drive, nozzles and a manway',
      },
    },
  },
  {
    slug: 'blending-tank',
    family: 'process-vessels-equipment',
    image: '/materials/products/调配釜.jpg',
    copy: {
      en: {
        name: 'Blending Tank',
        summary:
          'An agitated tank for combining and homogenising liquids and liquid-solid mixtures.',
        whatItDoes:
          'A blending tank is a vessel fitted with an agitator so that several components can be combined into a uniform batch. It is typically placed between raw material handling and the next process step.',
        whenToChoose: [
          'You prepare uniform liquid batches from several components',
          'You need a vessel and agitator supplied as a matched set',
          'Your batch sizes are defined by tank volume',
        ],
        applicationRoles: [
          'Preparing liquid and slurry batches',
          'Homogenising a product before filling or transfer',
          'Intermediate blending between process steps',
        ],
        configuration: [
          'Tank volume, geometry and bottom shape',
          'Agitator type and mounting position',
          'Inlet, outlet and instrument nozzles',
          'Optional jacket for temperature control',
          'Wetted material selection for the medium',
        ],
        selectionInputs: ['Components and their ratios', 'Whether heating or cooling is needed during blending'],
      },
    },
  },
  {
    slug: 'storage-tank',
    family: 'process-vessels-equipment',
    image: '/materials/products/储罐.jpg',
    copy: {
      en: {
        name: 'Storage Tank',
        summary:
          'A vessel for holding process liquids between production steps or ahead of shipment.',
        whatItDoes:
          'A storage tank holds liquid product or raw material until it is needed. It can be supplied with nozzles, access openings and, where the medium requires it, an agitator or heating arrangement.',
        whenToChoose: [
          'You need to hold liquids between process steps or before dispatch',
          'The tank must match your site layout and connection points',
          'The stored medium needs agitation or temperature maintenance',
        ],
        applicationRoles: [
          'Raw material and intermediate holding',
          'Finished product buffering',
          'Holding tank with optional agitation',
        ],
        configuration: [
          'Volume, diameter and height to suit the site',
          'Nozzle and manway layout',
          'Optional agitator or heating arrangement',
          'Support type, such as legs or skirt',
          'Wetted material selection for the medium',
        ],
        selectionInputs: ['Stored medium and holding time', 'Available footprint and height'],
      },
    },
  },
  {
    slug: 'silo',
    family: 'process-vessels-equipment',
    image: '/materials/products/料仓.jpg',
    copy: {
      en: {
        name: 'Silo',
        summary:
          'A vertical storage vessel for bulk powders and granules, with a conical discharge section.',
        whatItDoes:
          'A silo stores bulk solids in a tall cylindrical body and releases them through a conical outlet. It buffers material between receiving, processing and packing.',
        whenToChoose: [
          'You store bulk powders or granules ahead of processing or packing',
          'You want to feed downstream equipment from a conical outlet',
          'Footprint is limited and vertical space is available',
        ],
        applicationRoles: [
          'Bulk solids buffering and storage',
          'Feeding mixers and packing lines',
          'Raw material and intermediate holding',
        ],
        configuration: [
          'Volume, diameter and cone angle for the material',
          'Outlet size and discharge aid, where the material needs one',
          'Loading, venting and level instrument connections',
          'Support structure and access arrangement',
          'Contact material and surface finish for the product',
        ],
        selectionInputs: ['Bulk density and flow behaviour', 'Fill and discharge method'],
      },
    },
  },
  {
    slug: 'shell-and-tube-heat-exchanger',
    family: 'process-vessels-equipment',
    image: '/materials/products/管壳式换热器.jpg',
    copy: {
      en: {
        name: 'Shell-and-Tube Heat Exchanger',
        summary:
          'A tube bundle inside a shell that transfers heat between two process fluids.',
        whatItDoes:
          'A shell-and-tube heat exchanger passes one fluid through a bundle of tubes while a second fluid flows around them inside the shell. Heat moves across the tube walls without the fluids mixing.',
        whenToChoose: [
          'You need to heat or cool a process fluid using another fluid or utility',
          'The two fluids must stay separate',
          'The duty and layout call for a tubular design',
        ],
        applicationRoles: [
          'Heating and cooling of process streams',
          'Heat recovery between process fluids',
          'Condensing or temperature control duties',
        ],
        configuration: [
          'Tube bundle layout and number of passes',
          'Shell and tube side nozzle arrangement',
          'Mounting orientation',
          'Tube and shell material selection for each fluid',
          'Design temperature and pressure for each side',
        ],
        selectionInputs: ['Hot and cold fluid data', 'Required inlet and outlet temperatures'],
      },
    },
  },
  {
    slug: 'process-tower',
    family: 'process-vessels-equipment',
    image: '/materials/products/塔器.jpg',
    copy: {
      en: {
        name: 'Process Tower',
        summary:
          'A vertical column vessel for process steps such as separation, absorption or contacting.',
        whatItDoes:
          'A process tower is a tall vertical vessel in which fluids are brought into contact or separated. The internals, connections and height are defined by the specific process step it serves.',
        whenToChoose: [
          'Your process step needs a tall vertical vessel with defined internals',
          'You have a process description that fixes connection points and height',
          'A standard vessel does not match your layout',
        ],
        applicationRoles: [
          'Separation and contacting steps',
          'Vertical vessels in process lines',
          'Custom column vessels built to process drawings',
        ],
        configuration: [
          'Diameter, height and internals defined by the process',
          'Nozzle and manway schedule',
          'Support and platform arrangement',
          'Design temperature and pressure',
          'Wetted material selection for the medium',
        ],
        selectionInputs: ['Process description and flow rates', 'Process drawings, if available'],
      },
    },
  },
]

function toView(product: Product, locale: Locale): ProductView | undefined {
  const copy = resolveLocalized(product.copy, locale)
  const family = productFamilies.find((item) => item.slug === product.family)
  const familyCopy = family ? resolveLocalized(family.copy, locale) : undefined
  if (!copy || !familyCopy) return undefined
  return {
    slug: product.slug,
    family: product.family,
    familyName: familyCopy.name,
    image: product.image,
    ...copy,
  }
}

export function getProductViews(locale: Locale = defaultLocale): ProductView[] {
  return products
    .map((product) => toView(product, locale))
    .filter((view): view is ProductView => Boolean(view))
}

export function getProductView(slug: string, locale: Locale = defaultLocale): ProductView | undefined {
  const product = products.find((item) => item.slug === slug)
  return product ? toView(product, locale) : undefined
}

export function getFamilyViews(locale: Locale = defaultLocale) {
  return productFamilies
    .map((family) => {
      const copy = resolveLocalized(family.copy, locale)
      return copy ? { slug: family.slug, ...copy } : undefined
    })
    .filter((view): view is { slug: ProductFamilySlug; name: string; description: string } => Boolean(view))
}
