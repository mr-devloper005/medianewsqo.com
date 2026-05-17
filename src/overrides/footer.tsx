import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true


const getCategoryLabel = (value: string) => {
  const normalized = normalizeCategory(value)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || value
}


const primaryRoute = SITE_CONFIG.tasks.find((t) => t.key === 'mediaDistribution')?.route || '/updates'

export async function FooterOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 200, { allowMockFallback: false })
  const categories = Array.from(
    new Map(
      posts
        .map((post) => {
          const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
          const raw = typeof content.category === 'string' ? content.category.trim() : ''
          if (!raw) return null
          const slug = normalizeCategory(raw)
          return { slug, name: getCategoryLabel(raw) }
        })
        .filter((item): item is { slug: string; name: string } => Boolean(item))
        .map((item) => [item.slug, item])
    ).values()
  ).slice(0, 8)

  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--mn-coral)_22%,transparent)] bg-[var(--mn-ink)] text-[color-mix(in_srgb,var(--mn-cream)_92%,white)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-[var(--mn-cream)]">{SITE_CONFIG.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-[color-mix(in_srgb,var(--mn-cream)_72%,white)]">{siteContent.footer.tagline}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--mn-coral)_85%,white)]">Media desk</p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--mn-coral)_90%,white)]">Distribution</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href={primaryRoute} className="hover:text-white">
                  Press media
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white">
                  Search archive
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--mn-coral)_90%,white)]">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-white">
                  Press room
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--mn-coral)_90%,white)]">Legal</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {categories.length ? (
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Categories</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/updates?category=${category.slug}`}
                  className="opacity-80 underline-offset-4 transition hover:opacity-100 hover:underline"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-[color-mix(in_srgb,var(--mn-cream)_55%,white)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-[color-mix(in_srgb,var(--mn-cream)_45%,white)]">medianewsqo.com · Press distribution &amp; editorial desk</p>
        </div>
      </div>
    </footer>
  )
}
