import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Press distribution desk',
  },
  footer: {
    tagline: 'Wire-ready releases for modern communications teams',
  },
  hero: {
    badge: 'Press distribution',
    title: ['Put company news where journalists and search already look.'],
    description:
      'Medianewsqo helps teams publish disciplined press releases with editorial review, structured formatting, and distribution tuned for digital newsrooms.',
    primaryCta: {
      label: 'Browse releases',
      href: '/updates',
    },
    secondaryCta: {
      label: 'View pricing',
      href: '/pricing',
    },
    searchPlaceholder: 'Search releases',
    focusLabel: 'Latest wire',
    featureCardBadge: 'Desk note',
    featureCardTitle: 'New approvals land here first.',
    featureCardDescription:
      'The homepage highlights the freshest wire entries so stakeholders see what is live without wading through unrelated tasks.',
  },
  home: {
    metadata: {
      title: 'Medianewsqo — press distribution & editorial wire',
      description:
        'Distribute press releases with editorial review, structured formatting, and syndication tuned for journalists and search.',
      openGraphTitle: 'Medianewsqo — press distribution & editorial wire',
      openGraphDescription:
        'Wire-ready press releases with editorial review and distribution tuned for digital newsrooms.',
      keywords: ['press release', 'media distribution', 'Medianewsqo', 'editorial wire', 'PR syndication'],
    },
    introBadge: 'Why Medianewsqo',
    introTitle: 'A calmer surface for high-stakes announcements.',
    introParagraphs: [
      'Communications teams need a desk that respects embargoes, sourcing, and formatting rules without turning every launch into a web-design project.',
      'Medianewsqo keeps the story first: readable typography, structured fields, and a wire archive that journalists can scan in seconds.',
      'The experience stays lightweight on purpose—fast to load, easy to search, and ready to connect to your existing publishing pipeline.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'Editorial review before anything hits the public wire.',
      'Category-aware archive with filters for date and topic.',
      'Article pages optimized for sharing, citations, and syndication.',
      'Pricing and add-ons that map to real distribution work—not vanity dashboards.',
    ],
    primaryLink: {
      label: 'Open wire',
      href: '/updates',
    },
    secondaryLink: {
      label: 'Talk to the desk',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Next step',
    title: 'Need a walkthrough of your publishing calendar?',
    description:
      'Tell us about your beats, embargoes, and compliance notes—we will map the right distribution lane and support model.',
    primaryCta: {
      label: 'Contact editorial',
      href: '/contact',
    },
    secondaryCta: {
      label: 'Browse pricing',
      href: '/pricing',
    },
  },
  taskSectionHeading: 'Latest wire',
  taskSectionDescriptionSuffix: 'Freshly filed releases from the Medianewsqo desk.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Press releases',
    description: 'Browse the Medianewsqo wire—filtered by category and date.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Press releases',
    paragraphs: [
      'This archive lists every wire entry published through Medianewsqo—newest first—with filters for category and recency.',
      'Open any headline for the full release, share links, and related coverage from the same desk.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
}
