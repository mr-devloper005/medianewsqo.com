export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Press releases',
    route: '/updates',
    description: 'Wire-ready announcements with editorial review and syndication metadata.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/updates',
} as const
