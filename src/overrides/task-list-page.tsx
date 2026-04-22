import { Suspense } from 'react'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { UpdatesListingClient } from '@/overrides/updates-listing-client'
import { SITE_CONFIG } from '@/lib/site-config'
import { Radio } from 'lucide-react'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

export async function TaskListPageOverride({ category }: { task: TaskKey; category?: string }) {
  const posts = await fetchTaskPosts('mediaDistribution', 48, { fresh: true })

  return (
    <div className="min-h-screen bg-[var(--mn-cream)] text-[var(--mn-ink)]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--mn-coral)_35%,transparent)] bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--mn-coral)]">
            <Radio className="h-3.5 w-3.5" aria-hidden />
            Wire desk
          </p>
          <h1 className="font-display mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Browse press releases</h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--mn-ink-soft)]">
            Filter by category and date, or search headlines. Every release from {SITE_CONFIG.name} is published here before wider syndication.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/pricing" className="rounded-full bg-[var(--mn-coral)] px-5 py-2.5 text-white shadow-sm transition hover:opacity-95">
              Compare plans
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-[color-mix(in_srgb,var(--mn-coral)_45%,transparent)] bg-white px-5 py-2.5 text-[var(--mn-ink)] transition hover:border-[var(--mn-coral)]"
            >
              Editorial contact
            </Link>
          </div>
        </header>

        <Suspense
          fallback={
            <div className="rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_22%,transparent)] bg-white/80 p-10 text-center text-[var(--mn-ink-soft)]">
              Loading releases…
            </div>
          }
        >
          <UpdatesListingClient posts={posts} initialCategory={category} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
