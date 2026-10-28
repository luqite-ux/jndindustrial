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
  specifications?: { columns: string[]; rows: string[][] }
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
          'Mixing, mass transfer and heat transfer in chemical, pharmaceutical, food and environmental processes',
        ],
        configuration: [
          'Motor and gearbox drive with a documented 0.55–200 kW power range and variable-frequency speed control',
          'High-strength alloy-steel shaft with customizable length and number of stages',
          'Straight, pitched-blade or turbine impellers selected for the mixing duty',
          'Carbon steel, stainless steel, titanium, plastic-lined or rubber-lined wetted-material options',
          'Intermediate or bottom bearing support for long shafts or higher-speed duties',
          'Mechanical, packing or magnetic sealing selected for the process conditions',
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
          'Suspension, dissolution, emulsification and interphase mass or heat transfer',
          'Wastewater, sludge-water and thickening duties where settling must be limited',
        ],
        configuration: [
          'Compact structure and small footprint simplify installation and maintenance',
          'High-efficiency propeller provides high discharge flow with lower power demand',
          'Purpose-designed side-entry shaft seal supports stable sealing performance',
          'Gear transmission supports smooth operation and efficient power transfer',
          'Main-shaft seal can be serviced without draining the tank',
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
          'Polymerisation and material blending in chemical, pharmaceutical and food production',
          'Low-level mixing and improved bottom discharge',
          'High-viscosity fluid processing with a short, load-optimised shaft arrangement',
        ],
        configuration: [
          'Compact structure and small footprint simplify installation and maintenance',
          'High-efficiency propeller provides high discharge flow with lower power demand',
          'Purpose-designed bottom-entry shaft seal supports stable sealing performance',
          'Gear transmission supports smooth operation and efficient power transfer',
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
          'Powder-to-powder and powder-to-granule blending',
          'Adding small liquid amounts to bulk solids',
          'Blending pastes, viscous materials and high-density powders in chemical, lithium-material, pharmaceutical, food and building-material production',
        ],
        configuration: [
          'Double-ribbon layout moves material in opposing directions for rapid, uniform blending',
          'High loading factor with low-speed mixing, low energy demand and limited temperature rise',
          'Stable enclosed operation reduces dust escape and limits influence on weighing accuracy',
          'Ribbon layout can be configured for mixing, batch blending or temporary cooling storage',
          'Contact material, surface finish, drive and shaft sealing selected for the product',
        ],
        selectionInputs: ['Bulk density and particle characteristics', 'Target batch size and charging method'],
        specifications: { columns: ['Model','Total volume (L)','Working volume (L)','Power (kW)','Speed (rpm)','L × W × H (mm)','Equipment mass (kg)'], rows: [
          ['MPS-100','100','30–60','3','30–100','1500 × 500 × 700','350'], ['MPS-200','200','60–120','4','24–80','2000 × 600 × 900','450'], ['MPS-300','300','90–180','5.5','20–60','2200 × 700 × 1100','600'], ['MPS-500','500','150–300','7.5','15–50','2500 × 800 × 1200','1000'], ['MPS-1000','1000','300–600','11','12–40','2600 × 1100 × 1600','1800'], ['MPS-1500','1500','450–900','15','12–37','2800 × 1200 × 1800','2200'], ['MPS-2000','2000','600–1200','15','12–34','3300 × 1350 × 2000','3200'], ['MPS-3000','3000','900–1800','18.5','10–32','3500 × 1500 × 2200','4000'], ['MPS-5000','5000','1500–3000','30','8–28','4400 × 1800 × 2800','7600'], ['MPS-10000','10000','3000–6000','55','7–22','5500 × 2300 × 2600','13000'], ['MPS-20000','20000','6000–12000','90','6–18','6500 × 2650 × 3000','20000'], ['MPS-60000','60000','18000–36000','200','3–8','10000 × 4000 × 4500','42000'] ] },
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
          'Solid-solid and solid-liquid blending',
          'Wet granulation, drying and concentration duties',
          'Powder-paste and powder-fibre blending for chemical, lithium-material, coating, pharmaceutical, food, feed, fuel and metallurgical production lines',
        ],
        configuration: [
          'Plough-shaped mixing elements and high-speed cutters provide combined mixing and dispersion',
          'High-throughput batch mixing with strong uniformity and controlled energy demand',
          'Reliable enclosure reduces dust escape while low-vibration, low-noise operation supports the line',
          'Computer-controlled processing can reduce routine manual intervention',
          'Drum volume, cutter arrangement, discharge, contact material and finish selected for the duty',
        ],
        selectionInputs: ['Material moisture and any liquid addition', 'Target batch size and cycle time'],
        specifications: { columns: ['Model','Total volume (L)','Working volume (L)','Power (kW)','Speed (rpm)','High-speed cutter (kW)','Cutters','L × W × H (mm)','Equipment mass (kg)'], rows: [
          ['MPC-100','100','30–60','3','50–150','1.5','1','1500 × 850 × 1200','350'], ['MPC-200','200','60–120','4','35–100','2.2','1','1800 × 850 × 1300','450'], ['MPC-300','300','90–180','5.5','30–85','2.2','2','2000 × 950 × 1400','600'], ['MPC-500','500','150–300','7.5','25–65','3','2','2100 × 1200 × 1300','1000'], ['MPC-1000','1000','300–600','11','20–60','3','2','2400 × 1250 × 1500','1800'], ['MPC-1500','1500','450–900','15','18–55','4','3','3000 × 1500 × 1600','2200'], ['MPC-3000','3000','900–1800','22','15–48','5.5','3','3800 × 2200 × 1800','4000'], ['MPC-5000','5000','1500–3000','37','14–42','7.5','4','4800 × 2500 × 2800','7600'], ['MPC-10000','10000','3000–6000','75','11–33','11','6','5500 × 2300 × 2600','13000'], ['MPC-30000','30000','9000–18000','132','8–24','15','10','7400 × 2800 × 3200','22000'] ] },
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
          'A drum mixer rotates a closed drum fitted with forward and reverse helical blades. The blades guide material in opposing directions for fast, uniform and gentle blending with limited particle breakage and heat generation.',
        whenToChoose: [
          'Your material is sensitive to intensive agitation',
          'You want a simple, enclosed batch blending action',
          'Loading and unloading through a drum opening suits your process',
        ],
        applicationRoles: [
          'Gentle batch blending of free-flowing solids',
          'Blending particles, flakes and other shape-sensitive materials',
          'Liquid-addition or drying duties when fitted with spray or hot-air nozzles',
        ],
        configuration: [
          'Forward and reverse helical blades create counter-flow movement inside the rotating drum',
          'Reverse drum rotation guides the batch to the outlet, with documented residual material below 1%',
          'Optional liquid atomising or hot-air nozzles support additive dosing or drying duties',
          'Inlet and outlet can remain on the same level to reduce building-height requirements',
          'Drum volume, fill level, contact material and surface finish selected for the product',
        ],
        selectionInputs: ['Material flow behaviour and sensitivity to shear', 'Target batch size'],
        specifications: { columns: ['Model','Total volume (L)','Working volume (L)','Power (kW)','Speed (rpm)','L × W × H (mm)','Equipment mass (kg)'], rows: [
          ['MPS-750','750','375–450','3','4–12','2750 × 1600 × 1550','2300'], ['MPS-1000','1000','500–600','5.5','4–10','2950 × 1800 × 2100','3200'], ['MPS-5000','5000','2500–3000','11','4–9','4100 × 2800 × 2550','5100'], ['MPS-10000','10000','5000–6000','30','4–9','4560 × 3250 × 3350','9300'], ['MPS-20000','20000','10000–12000','45','3–8','5700 × 4100 × 3700','17000'], ['MPS-30000','30000','15000–18000','75','3–8','6200 × 4500 × 4150','21000'], ['MPS-40000','40000','20000–24000','90','3–7','6800 × 4900 × 4200','24000'] ] },
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
          'A steel reactor combines a vessel, agitator and heat-transfer surface so material can be mixed, metered, heated, cooled or insulated during reaction and other controlled process steps.',
        whenToChoose: [
          'Your process needs agitation and temperature control in one vessel',
          'You need defined nozzles, a manway and a drive on a single assembly',
          'The vessel must be built to your process layout rather than a standard size',
        ],
        applicationRoles: [
          'Mixing, neutralisation, crystallisation, dispersion and emulsification',
          'Dissolution, polymerisation, suspension and reaction duties',
          'Heat- and mass-transfer processes in chemical, food, pharmaceutical, energy and environmental production',
        ],
        configuration: [
          'Carbon-steel or alloy-steel construction selected for strength and corrosion conditions',
          'Compact vessel, jacket or coil and agitator arrangement matched to the process layout',
          'Pressure and temperature control, leak detection and applicable safety protection defined per project',
          'Rubber, plastic, FRP, PTFE, spray-coated or composite lining options selected for the medium',
          'Nozzle schedule, manway, shaft sealing and agitator form confirmed for the process',
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
          'A blending tank combines an agitated vessel with optional heating, cooling and pressure control so materials can be mixed, reacted or stored while process conditions are adjusted.',
        whenToChoose: [
          'You prepare uniform liquid batches from several components',
          'You need a vessel and agitator supplied as a matched set',
          'Your batch sizes are defined by tank volume',
        ],
        applicationRoles: [
          'Preparing liquid and slurry batches',
          'Mixing resins, coatings, emulsions and biotechnology materials',
          'Mixing, neutralisation, crystallisation, dispersion, emulsification and dissolution duties',
        ],
        configuration: [
          'Carbon-steel or alloy-steel construction selected for strength and corrosion conditions',
          'Corrosion resistance, pressure rating, sealing and cleanability defined for the medium',
          'Optional heating or cooling surface and pressure control matched to the process',
          'Pressure and temperature control, leak detection and applicable safety protection defined per project',
          'Rubber, plastic, FRP, PTFE, spray-coated or composite lining options selected for the medium',
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
          'A closed vessel for storing process liquids, gases or powdered materials between production steps or ahead of shipment.',
        whatItDoes:
          'A storage tank holds liquid, gas or powdered raw material, intermediate or finished product until it is needed, while matching the storage pressure, material and process connections.',
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
          'Vertical fixed-roof, floating-roof or spherical arrangements for atmospheric or low-pressure storage',
          'Horizontal arrangements for smaller capacities and duties that require higher pressure capability',
          'Volume, diameter, height, nozzle and manway layout matched to the site',
          'Optional agitation or temperature-maintenance arrangement where the medium requires it',
          'Support type and material selection confirmed for the stored medium',
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
          'Bulk powder and granule storage and transfer',
          'Batching, weighing and feeding downstream equipment',
          'Material handling in food, pharmaceutical, fine chemical, rubber, plastics and lithium-material production',
        ],
        configuration: [
          'Silo body form, volume, diameter and cone angle configured for the material and site',
          'Outlet, transfer piping and conveying equipment integrated for automated handling',
          'Loading, venting, weighing and level-instrument connections defined for the process',
          'Optional insulation, waterproofing and moisture protection',
          'Automation interfaces can support low-labour or unmanned material control',
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
          'A shell-and-tube heat exchanger passes one fluid through a tube bundle while another flows through the shell. Tube layout, baffles and head design control heat transfer, cleanability, thermal expansion and pressure capability.',
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
          'Triangular tube layout for stronger turbulence or square layout where easier cleaning is required',
          'Baffle design selected to increase shell-side velocity and heat-transfer coefficient',
          'Front and rear head forms selected for cleaning, thermal-expansion compensation and pressure duty',
          'Shell and tubesheet materials include applicable carbon, low-alloy or stainless steels to the cited project standard',
          'Heat-transfer tubes use controlled tolerances and eddy-current testing; corrosion-resistant gasket materials are selected for the fluids',
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
          'A process tower is a tall vertical vessel that brings gas-liquid or liquid-liquid phases into contact for mass and heat transfer, separation or reaction in distillation, absorption, extraction and drying duties.',
        whenToChoose: [
          'Your process step needs a tall vertical vessel with defined internals',
          'You have a process description that fixes connection points and height',
          'A standard vessel does not match your layout',
        ],
        applicationRoles: [
          'Distillation, absorption, stripping, extraction and drying',
          'Gas-liquid and liquid-liquid contacting or separation',
          'Pressurised, atmospheric or vacuum column duties',
        ],
        configuration: [
          'Tray towers can use bubble-cap, valve or sieve trays for counter-current contacting and demanding separations',
          'Packed towers can use ring packing for continuous contact, lower pressure drop or foaming and corrosive media',
          'Tower type can be configured as a rectification, absorption, stripping or reaction column',
          'Shell, heads and skirt support are designed for internal pressure and applicable external loads',
          'Trays, downcomers, packing supports, distributors, demisters, nozzles, manways and safety fittings are defined by the process',
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
