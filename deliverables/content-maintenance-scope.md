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

- Home: page SEO is managed through Site Content v2. The three Banner states and the remaining home-page sections keep the approved code-backed presentation and are not represented as backend-editable fields.
- Products: the list-page Hero eyebrow, title, and description are managed through Site Content v2. Family descriptions and product cards are driven by the product/category collections; product detail content remains backed by the product collection.
- Applications: the Hero eyebrow, title, and description are managed through Site Content v2. Application cards remain code-backed.
- Capabilities: the Hero eyebrow, title, and description are managed through Site Content v2. Engineering/manufacturing/inspection cards remain code-backed.
- About: the Hero eyebrow, title, and description are managed through Site Content v2. Legal identity, facility copy, and facility media remain code-backed.
- News: the list Hero eyebrow, title, and description are managed through Site Content v2. The list, empty state, and article details remain backed by the article collection and existing presentation code.
- Contact: the Hero eyebrow, title, and description are managed through Site Content v2. Contact facts, address, form labels, and help text remain code-backed.
- Shared shell: header, footer, Organization/WebSite Schema identity, favicon, and default Open Graph presentation remain code-backed and read tenant settings where already integrated.

Published Site Content v2 is intentionally limited to modules that the customer site actually consumes. It declares `home.seo` plus the six list/static-page Hero modules above; it does not claim free-form page building, navigation editing, redirects, product SEO, or article ordering.

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
