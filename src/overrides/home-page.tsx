import Image from 'next/image'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { ContentImage } from '@/components/shared/content-image'
import type { SitePost } from '@/lib/site-connector'
import { Check, Newspaper, Radar, Share2 } from 'lucide-react'

export const HOME_PAGE_OVERRIDE_ENABLED = true

function getCardImage(post: SitePost): string {
  const media = Array.isArray(post.media) ? post.media : []
  const u = media.find((m) => typeof m?.url === 'string')?.url
  if (u) return u
  const c = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const imgs = Array.isArray(c.images) ? c.images : []
  const first = imgs.find((x): x is string => typeof x === 'string')
  if (first) return first
  return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80'
}

function getCategory(post: SitePost): string {
  const c = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>).category : null
  return typeof c === 'string' && c.trim() ? c.trim() : 'Press'
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 14, { fresh: true })
  const featured = posts[0]
  const grid = posts.slice(1, 7)
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--mn-cream)] text-[var(--mn-ink)]">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />

      <section className="relative overflow-hidden border-b border-[color-mix(in_srgb,var(--mn-coral)_18%,transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(255,234,216,0.97)_0%,rgba(255,234,216,0.88)_42%,rgba(255,234,216,0.4)_100%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div className="max-w-xl animate-[mn-rise_0.7s_ease-out_both]">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--mn-coral)]">{siteContent.hero.badge}</p>
            <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.25rem]">
              {siteContent.hero.title[0]}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--mn-ink-soft)]">{siteContent.hero.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={siteContent.hero.primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-[var(--mn-coral)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(232,152,138,0.35)] transition hover:opacity-95"
              >
                {siteContent.hero.primaryCta.label}
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--mn-coral)_45%,transparent)] bg-white/90 px-7 py-3.5 text-sm font-semibold text-[var(--mn-ink)] transition hover:border-[var(--mn-coral)]"
              >
                View pricing
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-[color-mix(in_srgb,var(--mn-coral)_22%,transparent)] pt-10 text-center sm:text-left">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--mn-ink-soft)]">Syndication</dt>
                <dd className="mt-1 font-display text-2xl font-semibold">Multi-channel</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--mn-ink-soft)]">Format</dt>
                <dd className="mt-1 font-display text-2xl font-semibold">Wire-ready</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--mn-ink-soft)]">Support</dt>
                <dd className="mt-1 font-display text-2xl font-semibold">Editorial</dd>
              </div>
            </dl>
          </div>
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none animate-[mn-rise_0.85s_ease-out_both]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-[color-mix(in_srgb,var(--mn-coral)_25%,transparent)] shadow-[0_30px_80px_rgba(44,34,28,0.15)]">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(44,34,28,0.55)_100%)]" />
              <p className="absolute bottom-6 left-6 right-6 text-sm font-medium leading-relaxed text-white drop-shadow-sm">
                Editorial producers coordinate headlines, multimedia, and distribution windows from one calm workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[color-mix(in_srgb,var(--mn-coral)_14%,transparent)] bg-white/50 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--mn-ink-soft)] sm:px-6">
          {['Search indexes', 'RSS & XML', 'Partner desks', 'Social previews', 'Embargo tools'].map((label) => (
            <span key={label} className="opacity-90">
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          {[
            {
              icon: Newspaper,
              title: 'Structured releases',
              body: 'Headline, deck, body, and assets stay aligned for downstream syndication.',
            },
            {
              icon: Radar,
              title: 'Measured reach',
              body: 'See distribution level, pickup signals, and engagement without leaving the desk.',
            },
            {
              icon: Share2,
              title: 'Channel-ready',
              body: 'Exports and previews tuned for newsrooms, social surfaces, and partner feeds.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_18%,transparent)] bg-white p-7 shadow-[0_16px_45px_rgba(44,34,28,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(44,34,28,0.1)]"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--mn-cream)] text-[var(--mn-coral)]">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h2 className="mt-5 font-display text-xl font-semibold tracking-[-0.02em]">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--mn-ink-soft)]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[color-mix(in_srgb,var(--mn-coral)_16%,transparent)] bg-[color-mix(in_srgb,var(--mn-cream)_70%,white)] py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--mn-coral)]">{siteContent.home.introBadge}</p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{siteContent.home.introTitle}</h2>
            {siteContent.home.introParagraphs.map((p, i) => (
              <p key={i} className="mt-5 text-sm leading-relaxed text-[var(--mn-ink-soft)] sm:text-base">
                {p}
              </p>
            ))}
            <ul className="mt-8 space-y-3">
              {siteContent.home.sidePoints.map((line) => (
                <li key={line} className="flex gap-3 text-sm text-[var(--mn-ink)]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--mn-coral)]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-[color-mix(in_srgb,var(--mn-coral)_22%,transparent)] shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1000&q=80"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 440px"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col justify-between gap-6 border-b border-[color-mix(in_srgb,var(--mn-coral)_18%,transparent)] pb-8 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em]">Latest wire</h2>
            <p className="mt-2 text-[var(--mn-ink-soft)]">{siteContent.taskSectionDescriptionSuffix}</p>
          </div>
          <Link href="/updates" className="text-sm font-semibold text-[var(--mn-coral)] hover:underline">
            Open full archive →
          </Link>
        </div>

        {featured ? (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <Link
              href={`/updates/${featured.slug}`}
              className="group relative overflow-hidden rounded-[2rem] border border-[color-mix(in_srgb,var(--mn-coral)_22%,transparent)] bg-white shadow-[0_24px_70px_rgba(44,34,28,0.1)]"
            >
              <div className="relative aspect-[16/10] w-full">
                <ContentImage src={getCardImage(featured)} alt={featured.title} fill className="object-cover transition duration-500 group-hover:scale-[1.02]" />
                <span className="absolute left-4 top-4 rounded-full bg-[var(--mn-coral)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                  {getCategory(featured)}
                </span>
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl font-semibold leading-snug tracking-[-0.02em] group-hover:text-[var(--mn-coral)]">{featured.title}</h3>
                {featured.summary ? <p className="mt-4 line-clamp-3 text-[var(--mn-ink-soft)]">{featured.summary}</p> : null}
                <span className="mt-6 inline-flex text-sm font-semibold text-[var(--mn-coral)]">Read the full release →</span>
              </div>
            </Link>
            <div className="flex flex-col justify-between rounded-[2rem] border border-[color-mix(in_srgb,var(--mn-coral)_18%,transparent)] bg-[color-mix(in_srgb,var(--mn-cream)_40%,white)] p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--mn-coral)]">Why teams choose us</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--mn-ink-soft)]">
                  Medianewsqo keeps releases scannable for journalists, structured for compliance, and fast to syndicate across digital channels.
                </p>
              </div>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--mn-ink)] py-3.5 text-sm font-semibold text-[var(--mn-cream)] transition hover:opacity-90"
              >
                Talk with distribution
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-12 rounded-[2rem] border border-dashed border-[color-mix(in_srgb,var(--mn-coral)_35%,transparent)] bg-white/70 p-12 text-center">
            <p className="text-lg font-semibold">Releases will appear here once published.</p>
            <p className="mt-2 text-sm text-[var(--mn-ink-soft)]">Connect your feed in the master panel to populate this wire automatically.</p>
            <Link href="/contact" className="mt-6 inline-flex rounded-full bg-[var(--mn-coral)] px-6 py-3 text-sm font-semibold text-white">
              Contact editorial
            </Link>
          </div>
        )}

        {grid.length ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((post) => (
              <Link
                key={post.id}
                href={`/updates/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_16%,transparent)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/11]">
                  <ContentImage src={getCardImage(post)} alt="" fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--mn-coral)]">{getCategory(post)}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug group-hover:text-[var(--mn-coral)]">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[var(--mn-ink-soft)]">{post.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      <section className="border-t border-[color-mix(in_srgb,var(--mn-coral)_18%,transparent)] bg-[var(--mn-ink)] py-16 text-[var(--mn-cream)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 sm:flex-row sm:items-center sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--mn-coral)_85%,white)]">{siteContent.cta.badge}</p>
            <h2 className="font-display mt-3 max-w-xl text-2xl font-semibold sm:text-3xl">{siteContent.cta.title}</h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[color-mix(in_srgb,var(--mn-cream)_78%,white)]">{siteContent.cta.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={siteContent.cta.primaryCta.href}
              className="inline-flex rounded-full bg-[var(--mn-coral)] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20"
            >
              {siteContent.cta.primaryCta.label}
            </Link>
            <Link href="/pricing#faq" className="inline-flex rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10">
              Pricing FAQ
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
