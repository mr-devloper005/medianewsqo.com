'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

export const NAVBAR_OVERRIDE_ENABLED = true

const primaryHref = SITE_CONFIG.tasks.find((t) => t.key === 'mediaDistribution')?.route || '/updates'

const navLinks = [
  { label: 'Press releases', href: primaryHref },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
  { label: 'About', href: '/about' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--mn-coral)_22%,transparent)] bg-[color-mix(in_srgb,var(--mn-cream)_92%,white)]/95 text-[var(--mn-ink)] backdrop-blur-xl">
      <nav className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_28%,transparent)] bg-white shadow-sm">
            <img src="/favicon.png?v=20260401" alt="" width={44} height={44} className="h-full w-full object-contain" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg font-semibold tracking-[-0.03em] sm:text-xl">{SITE_CONFIG.name}</span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--mn-ink-soft)] sm:block">
              {siteContent.navbar.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition',
                  active ? 'bg-[var(--mn-coral)] text-white shadow-sm' : 'text-[var(--mn-ink-soft)] hover:bg-white/80 hover:text-[var(--mn-ink)]',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="hidden rounded-full md:inline-flex">
            <Link href="/search" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          {isAuthenticated ? (
            <div className="hidden md:block">
              <NavbarAuthControls />
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4 font-semibold text-[var(--mn-ink)]">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild className="rounded-full bg-[var(--mn-coral)] px-4 font-semibold text-white shadow-sm hover:opacity-95">
                <Link href="/register">Create account</Link>
              </Button>
            </div>
          )}
          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[color-mix(in_srgb,var(--mn-coral)_18%,transparent)] bg-[var(--mn-cream)] px-4 py-4 lg:hidden">
          <Link
            href="/search"
            className="mb-3 flex items-center gap-2 rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_25%,transparent)] bg-white px-4 py-3 text-sm font-semibold"
            onClick={() => setOpen(false)}
          >
            <Search className="h-4 w-4" />
            Search
          </Link>
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-2xl px-4 py-3 text-sm font-semibold',
                    active ? 'bg-[var(--mn-coral)] text-white' : 'text-[var(--mn-ink)] hover:bg-white/80',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
          {!isAuthenticated ? (
            <div className="mt-4 flex gap-2 border-t border-[color-mix(in_srgb,var(--mn-coral)_18%,transparent)] pt-4">
              <Link href="/login" className="flex-1 rounded-2xl border border-[color-mix(in_srgb,var(--mn-coral)_35%,transparent)] py-3 text-center text-sm font-semibold" onClick={() => setOpen(false)}>
                Sign in
              </Link>
              <Link href="/register" className="flex-1 rounded-2xl bg-[var(--mn-coral)] py-3 text-center text-sm font-semibold text-white" onClick={() => setOpen(false)}>
                Register
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
