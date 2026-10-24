# JND customer-site content maintenance scope

Tenant: `4f9d9596-3501-459f-bde9-bfe3f010b7d5`  
Formal domain: `jndindustrial.com`  
Default locale: `en`

## Structured collections

- Products: 12 real equipment records across agitation devices, industrial mixers, and process vessels/equipment. Editable fields are localized name, summary, overview, features, applications, advantages, image, specifications, order, active state, and SEO fields.
- Product categories: 3 top-level categories with localized name/description, order, and active state.
- News: title, excerpt, rich body, cover image, published time, order, and publish state. No synthetic article is retained when the collection is empty.
- Inquiries: read/reply/status workflow only; every public form uses its own CAPTCHA scope before insertion.

## Fixed public-page content

- Home: three Banner states (desktop/mobile media, eyebrow, title, supporting copy, primary/secondary CTA), equipment-family introduction, engineering/manufacturing section, application cards, five-step process, buyer FAQ, quality-evidence section, RFQ band, navigation, footer, and page SEO.
- Products: list hero, family descriptions, product-card mapping, list SEO; product detail content remains backed by the product collection.
- Applications: hero and real application-industry sections.
- Capabilities: hero, engineering/manufacturing/inspection sections.
- About: hero, legal company identity, Changzhou facility copy and real facility media.
- News: list hero and empty state; article detail remains backed by the article collection.
- Contact: hero, public contact facts, address, form labels/help text, and page SEO.
- Shared shell: header Logo/navigation/CTA, footer Logo/legal owner/contact/product links, Organization/WebSite Schema identity, favicon, default Open Graph image.

## Media inventory

- Brand: customer-provided JND Logo used by header, footer, favicon, metadata and backend settings.
- Banners: all three customer-provided compositions, with separate responsive rendering rather than a single destructive crop.
- Products: all 12 customer product images, one-to-one mapped and stored under the tenant's R2 namespace.
- Facility: real factory exterior and office/workspace images.
- Credentials: source certificates remain evidence assets; public claims may only use verified certificate facts. The business license is not a public marketing image.
- Video: disabled by the project-wide default-off rule; retained only in source records if supplied (none supplied here).

## Content safety

- Warranty/guarantee/质保/保修 content is excluded from every public field, translation, metadata, Schema and seed.
- Brand, model, numbers, units and certificate identifiers are preserved during translation.
- Existing non-empty/manual content is protected field-by-field on later imports.
- SEO service remains disabled until a permitted group administrator explicitly enables it.
