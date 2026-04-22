'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ContentImage } from '@/components/shared/content-image'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import type { SitePost } from '@/lib/site-connector'
import { Search } from 'lucide-react'

function getCategoryLabel(post: SitePost): string {
  const c = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>).category : null
  return typeof c === 'string' && c.trim() ? c.trim() : 'Press release'
}

function getImageUrl(post: SitePost): string {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((m) => typeof m?.url === 'string')?.url
  if (mediaUrl) return mediaUrl
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const imgs = Array.isArray(content.images) ? content.images : []
  const first = imgs.find((u): u is string => typeof u === 'string')
  if (first) return first
  if (typeof content.logo === 'string') return content.logo
  return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80'
}

type DateFilter = 'all' | '7d' | '30d' | '90d'

export function UpdatesListingClient({
  posts,
  initialCategory,
}: {
  posts: SitePost[]
  initialCategory?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [dateFilter, setDateFilter] = useState<DateFilter>('all')

  const categoryParam = initialCategory ? normalizeCategory(initialCategory) : 'all'

  const setCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    if (slug === 'all') params.delete('category')
    else params.set('category', slug)
    router.push(`/updates${params.toString() ? `?${params.toString()}` : ''}`)
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const now = Date.now()
    const cutoff =
      dateFilter === 'all'
        ? 0
        : dateFilter === '7d'
          ? now - 7 * 86400000
          : dateFilter === '30d'
            ? now - 30 * 86400000
            : now - 90 * 86400000

    return posts.filter((post) => {
      const cat = getCategoryLabel(post)
      const norm = normalizeCategory(cat)
      if (categoryParam !== 'all' && norm !== categoryParam) return false

      const published = post.publishedAt ? new Date(post.publishedAt).getTime() : now
      if (dateFilter !== 'all' && published < cutoff) return false

      if (!q) return true
      const hay = `${post.title} ${post.summary || ''}`.toLowerCase()
      return hay.includes(q)
    })
  }, [posts, categoryParam, query, dateFilter])

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_22%,transparent)] bg-white/90 p-5 shadow-[0_20px_50px_rgba(44,34,28,0.06)] md:p-6">
        <div className="grid gap-4 lg:grid-cols-3 lg:items-end">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--mn-ink-soft)]">Category</label>
            <select
              value={categoryParam}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-[color-mix(in_srgb,var(--mn-coral)_25%,transparent)] bg-[var(--mn-cream)] px-3 text-sm text-[var(--mn-ink)] outline-none focus:ring-2 focus:ring-[var(--mn-coral)]"
            >
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--mn-ink-soft)]">Published</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as DateFilter)}
              className="mt-2 h-11 w-full rounded-xl border border-[color-mix(in_srgb,var(--mn-coral)_25%,transparent)] bg-[var(--mn-cream)] px-3 text-sm text-[var(--mn-ink)] outline-none focus:ring-2 focus:ring-[var(--mn-coral)]"
            >
              <option value="all">Any time</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          <div className="md:col-span-1">
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--mn-ink-soft)]">Search</label>
            <div className="relative mt-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--mn-ink-soft)]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Headline or keyword"
                className="h-11 w-full rounded-xl border border-[color-mix(in_srgb,var(--mn-coral)_25%,transparent)] bg-white pl-10 pr-3 text-sm text-[var(--mn-ink)] outline-none focus:ring-2 focus:ring-[var(--mn-coral)]"
              />
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-[var(--mn-ink-soft)]">
          Showing {filtered.length} of {posts.length} releases
          {categoryParam !== 'all' ? ` · filtered by category` : ''}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[color-mix(in_srgb,var(--mn-coral)_35%,transparent)] bg-[var(--mn-cream)]/50 p-12 text-center">
          <p className="text-lg font-semibold text-[var(--mn-ink)]">No releases match these filters</p>
          <p className="mt-2 text-sm text-[var(--mn-ink-soft)]">Try a different category, widen the date range, or clear your search.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setDateFilter('all')
              setCategory('all')
            }}
            className="mt-6 inline-flex rounded-full bg-[var(--mn-coral)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => {
            const img = getImageUrl(post)
            const cat = getCategoryLabel(post)
            const dateStr = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : ''
            return (
              <Link
                key={post.id}
                href={`/updates/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_18%,transparent)] bg-white shadow-[0_16px_40px_rgba(44,34,28,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(44,34,28,0.12)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--mn-cream)]">
                  <ContentImage src={img} alt="" fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                  <span className="absolute left-3 top-3 rounded-full bg-[var(--mn-coral)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    {cat}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium text-[var(--mn-ink-soft)]">{dateStr}</p>
                  <h2 className="mt-2 font-display text-lg font-semibold leading-snug tracking-[-0.02em] text-[var(--mn-ink)] group-hover:text-[var(--mn-coral)]">
                    {post.title}
                  </h2>
                  {post.summary ? <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--mn-ink-soft)]">{post.summary}</p> : null}
                  <span className="mt-4 text-sm font-semibold text-[var(--mn-coral)]">Read release →</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
