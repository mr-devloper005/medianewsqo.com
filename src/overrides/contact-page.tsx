import Image from 'next/image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
  const desk = `desk@${SITE_CONFIG.domain}`

  return (
    <div className="min-h-screen bg-[var(--mn-cream)] text-[var(--mn-ink)]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <header className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--mn-coral)]">Contact</p>
          <h1 className="font-display mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Reach the Medianewsqo desk</h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--mn-ink-soft)]">
            Questions about syndication, editorial standards, or a published release? Send a note and we will route it to the right producer.
          </p>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="rounded-[2rem] border border-[color-mix(in_srgb,var(--mn-coral)_22%,transparent)] bg-white p-7 shadow-[0_22px_55px_rgba(44,34,28,0.08)] sm:p-9">
            <h2 className="font-display text-xl font-semibold">Send a message</h2>
            <form className="mt-8 grid gap-4" action="/contact" method="get">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--mn-ink-soft)]">Name</label>
                <input
                  name="name"
                  className="mt-2 h-12 w-full rounded-xl border border-[color-mix(in_srgb,var(--mn-coral)_25%,transparent)] bg-[var(--mn-cream)] px-4 text-sm outline-none focus:ring-2 focus:ring-[var(--mn-coral)]"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--mn-ink-soft)]">Email</label>
                <input
                  name="email"
                  type="email"
                  className="mt-2 h-12 w-full rounded-xl border border-[color-mix(in_srgb,var(--mn-coral)_25%,transparent)] bg-[var(--mn-cream)] px-4 text-sm outline-none focus:ring-2 focus:ring-[var(--mn-coral)]"
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--mn-ink-soft)]">Organization</label>
                <input
                  name="org"
                  className="mt-2 h-12 w-full rounded-xl border border-[color-mix(in_srgb,var(--mn-coral)_25%,transparent)] bg-[var(--mn-cream)] px-4 text-sm outline-none focus:ring-2 focus:ring-[var(--mn-coral)]"
                  placeholder="Company or publication"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--mn-ink-soft)]">How can we help?</label>
                <textarea
                  name="message"
                  className="mt-2 min-h-[160px] w-full rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_25%,transparent)] bg-[var(--mn-cream)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--mn-coral)]"
                  placeholder="Brief context, links, and the best time to reply."
                />
              </div>
              <button
                type="button"
                className="h-12 rounded-full bg-[var(--mn-coral)] text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
              >
                Submit inquiry
              </button>
              <p className="text-xs leading-relaxed text-[var(--mn-ink-soft)]">
                This form is a visual contact surface for visitors. Wire your preferred backend or helpdesk endpoint without changing routes.
              </p>
            </form>
          </div>

          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-[color-mix(in_srgb,var(--mn-coral)_20%,transparent)] shadow-lg">
              <div className="relative aspect-[5/4] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=900&q=80"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
            </div>
            <div className="rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_18%,transparent)] bg-[color-mix(in_srgb,var(--mn-cream)_55%,white)] p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--mn-ink-soft)]">Editorial desk</h3>
              <p className="mt-3 text-lg font-semibold">
                <a href={`mailto:${desk}`} className="text-[var(--mn-coral)] hover:underline">
                  {desk}
                </a>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--mn-ink-soft)]">
                For urgent corrections on a live release, include the headline and URL so producers can locate the asset immediately.
              </p>
            </div>
            <div className="rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_35%,transparent)] bg-[var(--mn-coral)]/10 p-6">
              <h3 className="font-display text-lg font-semibold text-[var(--mn-ink)]">FAQ first</h3>
              <p className="mt-2 text-sm text-[var(--mn-ink-soft)]">Many distribution questions are answered on the pricing page.</p>
              <a href="/pricing#faq" className="mt-4 inline-flex text-sm font-semibold text-[var(--mn-coral)] hover:underline">
                Open pricing FAQ →
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
