import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG } from '@/lib/site-config'
import { ShareRow } from '@/components/medianewsqo/share-row'
import { ChevronRight } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

function getImageUrls(post: SitePost) {
  const media = Array.isArray(post.media) ? post.media : []
  const fromMedia = media.map((m) => m?.url).filter((u): u is string => typeof u === 'string' && u.length > 0)
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const fromImages = Array.isArray(content.images) ? content.images.filter((u): u is string => typeof u === 'string') : []
  const merged = [...fromMedia, ...fromImages]
  if (merged.length) return merged
  if (typeof content.logo === 'string') return [content.logo]
  return ['https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80']
}

export async function TaskDetailPageOverride({ slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()

  const related = (await fetchTaskPosts('mediaDistribution', 12, { fresh: true }))
    .filter((item) => item.slug !== slug)
    .slice(0, 4)

  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml((content.body as string) || post.summary || '', '')
  const images = getImageUrls(post)
  const category = typeof content.category === 'string' ? content.category : 'Press release'
  const subtitle =
    (typeof content.excerpt === 'string' && content.excerpt.trim()) ||
    (post.summary ? post.summary.split(/(?<=[.!?])\s+/).slice(0, 2).join(' ') : '')
  const author = post.authorName || `${SITE_CONFIG.name} Editorial`
  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : ''
  const pageUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/updates/${slug}`

  return (
    <div className="min-h-screen bg-[var(--mn-cream)] text-[var(--mn-ink)]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[var(--mn-ink-soft)]">
          <Link href="/" className="transition hover:text-[var(--mn-coral)]">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
          <Link href="/updates" className="transition hover:text-[var(--mn-coral)]">
            Press releases
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
          <span className="truncate text-[var(--mn-ink)]">{post.title}</span>
        </nav>

        <header className="mt-10 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--mn-coral)]">{category}</p>
          <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">{post.title}</h1>
          {subtitle ? <p className="mt-5 text-lg leading-relaxed text-[var(--mn-ink-soft)] sm:text-xl">{subtitle}</p> : null}
          <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-[color-mix(in_srgb,var(--mn-coral)_22%,transparent)] py-5 text-sm">
            <div>
              <span className="block text-xs uppercase tracking-[0.16em] text-[var(--mn-ink-soft)]">Published</span>
              <time className="font-semibold text-[var(--mn-ink)]" dateTime={post.publishedAt || undefined}>
                {dateStr}
              </time>
            </div>
            <div className="hidden h-10 w-px bg-[color-mix(in_srgb,var(--mn-coral)_25%,transparent)] sm:block" />
            <div>
              <span className="block text-xs uppercase tracking-[0.16em] text-[var(--mn-ink-soft)]">Contact</span>
              <span className="font-semibold text-[var(--mn-ink)]">{author}</span>
            </div>
          </div>
          <div className="mt-6">
            <ShareRow url={pageUrl} title={post.title} />
          </div>
        </header>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="min-w-0">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_20%,transparent)] bg-white shadow-[0_24px_60px_rgba(44,34,28,0.1)]">
              <ContentImage src={images[0]} alt={post.title} fill className="object-cover" priority />
            </div>
            <RichContent
              html={html}
              className="article-content mt-10 max-w-3xl text-[1.05rem] leading-[1.85] text-[var(--mn-ink)]"
            />
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_22%,transparent)] bg-white p-6 shadow-[0_18px_45px_rgba(44,34,28,0.08)]">
              <p className="text-sm font-semibold text-[var(--mn-ink)]">Distribute your story</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--mn-ink-soft)]">
                Need syndication, formatting, or editorial review? Our team routes every submission through the same checklist.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[var(--mn-coral)] py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
              >
                Talk to editorial
              </Link>
              <Link href="/pricing" className="mt-3 block text-center text-sm font-semibold text-[var(--mn-coral)] hover:underline">
                View distribution plans
              </Link>
            </div>
            <div className="rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_18%,transparent)] bg-[color-mix(in_srgb,var(--mn-cream)_55%,white)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--mn-ink-soft)]">Site search</p>
              <Link
                href="/search"
                className="mt-3 flex items-center justify-center rounded-xl border border-dashed border-[var(--mn-coral)] bg-white py-3 text-sm font-semibold text-[var(--mn-coral)] transition hover:bg-[var(--mn-cream)]"
              >
                Open search
              </Link>
            </div>
          </aside>
        </div>

        {related.length ? (
          <section className="mt-20 border-t border-[color-mix(in_srgb,var(--mn-coral)_22%,transparent)] pt-14">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">Related releases</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/updates/${item.slug}`}
                  className="group rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_18%,transparent)] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-xs text-[var(--mn-ink-soft)]">
                    {item.publishedAt
                      ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : ''}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-[var(--mn-ink)] group-hover:text-[var(--mn-coral)]">{item.title}</h3>
                  {item.summary ? <p className="mt-2 line-clamp-2 text-sm text-[var(--mn-ink-soft)]">{item.summary}</p> : null}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
