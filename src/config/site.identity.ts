export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'ak4tkg1y3c',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Medianewsqo',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Press distribution & editorial wire',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Medianewsqo publishes wire-ready press releases with editorial review, structured formatting, and distribution tuned for journalists and search.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'medianewsqo.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://medianewsqo.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=80&h=80&fit=crop',
} as const
