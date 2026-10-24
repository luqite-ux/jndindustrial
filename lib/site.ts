export const siteConfig = {
  legalName: 'Jianengde (Changzhou) Intelligent Equipment Co., Ltd.',
  brand: 'JND',
  domain: 'jndindustrial.com',
  url: 'https://jndindustrial.com',
  email: 'info@jndindustrial.com',
  phoneDisplay: '+86 138 7108 1737',
  phoneHref: 'tel:+8613871081737',
  address: {
    street: 'No. 181 Wulian Road, Zhulin Town',
    district: 'Jintan District',
    city: 'Changzhou',
    region: 'Jiangsu',
    country: 'China',
    countryCode: 'CN',
  },
  logo: {
    src: '/images/brand/jnd-logo.jpg',
    width: 1491,
    height: 705,
    alt: 'JND Jianengde logo',
  },
  defaultOgImage: '/images/hero/banner-1.jpg',
} as const

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/applications', label: 'Applications' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/about', label: 'About' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
] as const

export const keyFacts = {
  moq: '1 unit',
  leadTime: '45–90 days',
  leadTimeNote: 'Customer-stated range; confirmed per order and operating conditions.',
} as const
