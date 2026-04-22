import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true

const primaryRoute = SITE_CONFIG.tasks.find((t) => t.key === 'mediaDistribution')?.route || '/updates'

export function FooterOverride() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--mn-coral)_22%,transparent)] bg-[var(--mn-ink)] text-[color-mix(in_srgb,var(--mn-cream)_92%,white)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold text-[var(--mn-cream)]">{SITE_CONFIG.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-[color-mix(in_srgb,var(--mn-cream)_72%,white)]">{siteContent.footer.tagline}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--mn-coral)_85%,white)]">Media desk</p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--mn-coral)_90%,white)]">Distribution</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href={primaryRoute} className="hover:text-white">
                  Press releases
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white">
                  Plans &amp; pricing
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
