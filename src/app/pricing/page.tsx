import Link from 'next/link'
import type { Metadata } from 'next'
import { Check, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: 'Press distribution pricing',
    description: `Plans for ${SITE_CONFIG.name} press release syndication, analytics, and media reach.`,
    openGraphTitle: 'Press distribution pricing',
    openGraphDescription: 'Compare Basic, Pro, and Premium distribution for Medianewsqo.',
    image: SITE_CONFIG.defaultOgImage,
    keywords: ['press release pricing', 'distribution plans', 'media syndication'],
  })
}

const plans = [
  {
    name: 'Basic',
    price: '$199',
    cadence: 'per release',
    blurb: 'Foundations for teams validating a new wire cadence.',
    features: ['Standard distribution tier', 'Business & industry categories', 'Email confirmation', '72h support window'],
    cta: 'Start Basic',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$449',
    cadence: 'per release',
    blurb: 'Balanced reach with analytics tuned for growing comms teams.',
    features: ['Expanded syndication tier', 'Rich media attachments', 'Pickup & engagement analytics', 'Priority editorial review', '48h support window'],
    cta: 'Choose Pro',
    href: '/register',
    highlight: true,
  },
  {
    name: 'Premium',
    price: 'Custom',
    cadence: 'volume programs',
    blurb: 'National programs, recurring embargoes, and bespoke partner routing.',
    features: ['Maximum syndication footprint', 'Dedicated producer', 'Custom reporting & API exports', 'Embargo & redline workflows', 'Named SLA'],
    cta: 'Talk to sales',
    href: '/contact',
    highlight: false,
  },
]

const comparison = [
  { label: 'Distribution level', basic: 'Standard', pro: 'Expanded', premium: 'Maximum + custom routing' },
  { label: 'Analytics', basic: 'Delivery receipts', pro: 'Pickup + engagement', premium: 'Custom dashboards' },
  { label: 'Media reach', basic: 'Core indexes', pro: 'Core + vertical partners', premium: 'National + partner bundle' },
]

const addOns = [
  {
    title: 'Multimedia boost',
    body: 'Extra image slots, video poster frames, and inline quote cards for busy newsrooms.',
  },
  {
    title: 'SEO amplification',
    body: 'Structured data, canonical guardrails, and partner snippet tuning for search surfaces.',
  },
  {
    title: 'Executive media training',
    body: 'One session per quarter to align spokespeople with wire tone and disclosure rules.',
  },
]

const faqs = [
  {
    q: 'How is distribution different between tiers?',
    a: 'Higher tiers unlock additional partner categories, faster review lanes, and richer analytics so you can see where stories resonate—not just that they shipped.',
  },
  {
    q: 'Can we change plans later?',
    a: 'Yes. Teams often start on Pro for a quarter, then move to Premium once recurring campaigns require named producers and custom routing.',
  },
  {
    q: 'Do you support embargoes?',
    a: 'Embargo scheduling is available on Pro and included by default on Premium with redlines and stakeholder notifications.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'Invoices support ACH and major cards. Enterprise accounts can add purchase orders with net terms where approved.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[var(--mn-cream)] text-[var(--mn-ink)]">
      <NavbarShell />
      <main>
        <section className="border-b border-[color-mix(in_srgb,var(--mn-coral)_18%,transparent)] bg-[linear-gradient(165deg,color-mix(in_srgb,var(--mn-cream)_88%,white),var(--mn-cream))] px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--mn-coral)]">Pricing</p>
            <h1 className="font-display mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Plans built for press teams</h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--mn-ink-soft)]">
              Transparent per-release pricing with room to grow. Every tier includes editorial QA and structured wire formatting.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-[2rem] border p-8 shadow-[0_20px_55px_rgba(44,34,28,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(44,34,28,0.12)] ${
                  plan.highlight
                    ? 'border-[var(--mn-coral)] bg-white ring-2 ring-[color-mix(in_srgb,var(--mn-coral)_45%,transparent)]'
                    : 'border-[color-mix(in_srgb,var(--mn-coral)_22%,transparent)] bg-white'
                }`}
              >
                {plan.highlight ? (
                  <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[var(--mn-coral)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-md">
                    <Sparkles className="h-3 w-3" aria-hidden />
                    Most popular
                  </span>
                ) : null}
                <h2 className="font-display text-2xl font-semibold">{plan.name}</h2>
                <p className="mt-3 text-sm text-[var(--mn-ink-soft)]">{plan.blurb}</p>
                <p className="mt-8 font-display text-4xl font-semibold tracking-[-0.03em]">
                  {plan.price}
                  <span className="ml-2 text-base font-normal text-[var(--mn-ink-soft)]">{plan.cadence}</span>
                </p>
                <ul className="mt-8 flex-1 space-y-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--mn-coral)]" aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`mt-10 inline-flex items-center justify-center rounded-full py-3.5 text-sm font-semibold transition ${
                    plan.highlight ? 'bg-[var(--mn-coral)] text-white shadow-lg shadow-[rgba(232,152,138,0.35)] hover:opacity-95' : 'border border-[color-mix(in_srgb,var(--mn-coral)_45%,transparent)] bg-white hover:border-[var(--mn-coral)]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[color-mix(in_srgb,var(--mn-coral)_16%,transparent)] bg-white/70 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-center text-2xl font-semibold sm:text-3xl">Every release includes</h2>
            <div className="mt-10 overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_18%,transparent)] bg-[var(--mn-cream)]">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[color-mix(in_srgb,var(--mn-coral)_22%,transparent)] bg-white/80">
                    <th className="px-4 py-4 font-semibold sm:px-6">Capability</th>
                    <th className="px-4 py-4 font-semibold sm:px-6">Basic</th>
                    <th className="px-4 py-4 font-semibold sm:px-6">Pro</th>
                    <th className="px-4 py-4 font-semibold sm:px-6">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.label} className="border-b border-[color-mix(in_srgb,var(--mn-coral)_14%,transparent)] last:border-b-0">
                      <td className="px-4 py-4 font-medium sm:px-6">{row.label}</td>
                      <td className="px-4 py-4 text-[var(--mn-ink-soft)] sm:px-6">{row.basic}</td>
                      <td className="px-4 py-4 text-[var(--mn-ink-soft)] sm:px-6">{row.pro}</td>
                      <td className="px-4 py-4 text-[var(--mn-ink-soft)] sm:px-6">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em]">Amplify your news</h2>
            <p className="mx-auto max-w-2xl text-[var(--mn-ink-soft)]">Optional add-ons layer on top of any plan without changing your core workflow.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {addOns.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_18%,transparent)] bg-white p-7 shadow-sm">
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--mn-ink-soft)]">{item.body}</p>
                <Link href="/contact" className="mt-5 inline-flex text-sm font-semibold text-[var(--mn-coral)] hover:underline">
                  Ask about this add-on →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="border-t border-[color-mix(in_srgb,var(--mn-coral)_16%,transparent)] bg-[color-mix(in_srgb,var(--mn-cream)_65%,white)] py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.03em]">Pricing questions</h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--mn-ink-soft)]">
                Still evaluating? Pair these answers with a walkthrough of your publishing calendar—we will map the right lane without overselling footprint.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_20%,transparent)] bg-white px-2 py-2 shadow-sm">
              {faqs.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`} className="border-[color-mix(in_srgb,var(--mn-coral)_14%,transparent)] px-3">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-[var(--mn-ink-soft)]">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="bg-[var(--mn-ink)] py-14 text-center text-[var(--mn-cream)]">
          <p className="font-display text-2xl font-semibold">Ready when your news is</p>
          <p className="mx-auto mt-3 max-w-lg text-sm text-[color-mix(in_srgb,var(--mn-cream)_72%,white)]">
            Connect your master panel feed, or talk with us about enterprise routing and SLAs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/register" className="inline-flex rounded-full bg-[var(--mn-coral)] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/25">
              Create account
            </Link>
            <Link href="/contact" className="inline-flex rounded-full border border-white/25 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10">
              Contact sales
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
