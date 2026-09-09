'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ExternalLink, Building2 } from 'lucide-react'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n/i18n-provider'
import { LanguageSwitcher } from './language-switcher'

interface SubMenuItem {
  name: string
  desc: string
  url: string
  logo: string
}

export function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false)
  const submenuRef = useRef<HTMLDivElement | null>(null)
  const submenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const NAV_ITEMS = [
    { href: '#vision', label: t.nav.vision },
    { href: '#metaverse', label: t.nav.metaverse },
    { href: '#economy', label: t.nav.economy },
    { href: '#technology', label: t.nav.technology },
    { href: '#ecosystem', label: t.nav.ecosystem },
    { href: '#roadmap', label: t.nav.roadmap },
  ]

  const SUBMENU_ITEMS: SubMenuItem[] = [
    {
      name: t.nav.investorsSubmenu.gcrm,
      desc: t.nav.investorsSubmenu.gcrmDesc,
      url: 'https://gcrmaster.org/',
      logo: '/partner-gcrm-opt.png',
    },
    {
      name: t.nav.investorsSubmenu.qfs,
      desc: t.nav.investorsSubmenu.qfsDesc,
      url: 'https://qfspay.org/',
      logo: '/partner-qfs-opt.png',
    },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close submenu when clicking outside
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!submenuRef.current?.contains(e.target as Node)) setSubmenuOpen(false)
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSubmenuOpen(false)
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  // Hover handlers with delay
  const handleEnter = () => {
    if (submenuTimer.current) clearTimeout(submenuTimer.current)
    setSubmenuOpen(true)
  }
  const handleLeave = () => {
    submenuTimer.current = setTimeout(() => setSubmenuOpen(false), 200)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-strong shadow-deep' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 md:px-8">
          {/* Logo */}
          <a href="#top" className="group flex shrink-0 items-center gap-3">
            <div className="relative flex h-14 w-40 items-center justify-start md:h-16 md:w-52">
              <Image
                src="/alarab-logo-new-clean.png"
                alt="AL ARAB — Official Logo"
                fill
                priority
                sizes="(max-width: 768px) 160px, 208px"
                className="object-contain"
              />
            </div>
            <span className="sr-only">AL ARAB — العرب</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 xl:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative font-sans text-[13px] uppercase tracking-[0.18em] text-[#c9b88a] transition-colors hover:text-[#f4e9c9]"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#d4af37] to-[#c9a85c] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Investors dropdown */}
            <div
              ref={submenuRef}
              className="relative"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <button
                type="button"
                onClick={() => setSubmenuOpen((v) => !v)}
                className="group flex items-center gap-1.5 font-sans text-[13px] uppercase tracking-[0.18em] text-[#c9b88a] transition-colors hover:text-[#f4e9c9]"
              >
                {t.nav.investors}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${submenuOpen ? 'rotate-180' : ''}`}
                />
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#d4af37] to-[#c9a85c] transition-all duration-300 group-hover:w-full" />
              </button>

              <AnimatePresence>
                {submenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                  >
                    <div className="w-80 overflow-hidden rounded-xl border border-[#d4af37]/30 bg-[#0f172a]/95 backdrop-blur-xl shadow-deep">
                      {/* Section header */}
                      <div className="flex items-center gap-2 border-b border-[#d4af37]/15 px-4 py-3">
                        <Building2 className="h-4 w-4 text-[#d4af37]" />
                        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                          {t.nav.investors}
                        </span>
                      </div>

                      {/* Submenu items */}
                      <div className="p-2">
                        {SUBMENU_ITEMS.map((item) => (
                          <a
                            key={item.name}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setSubmenuOpen(false)}
                            className="group flex items-center gap-3 rounded-lg p-3 transition-all hover:bg-[#d4af37]/10"
                          >
                            {/* Logo */}
                            <div className="relative h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#d4af37]/25 bg-[#0a194d]/60 p-1.5">
                              <Image
                                src={item.logo}
                                alt={`${item.name} logo`}
                                fill
                                sizes="48px"
                                className="object-contain p-1"
                                unoptimized
                              />
                            </div>

                            {/* Text */}
                            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                              <div className="flex items-center gap-1.5">
                                <span className="font-display text-sm font-semibold text-[#f4e9c9] group-hover:text-[#d4af37]">
                                  {item.name}
                                </span>
                                <ExternalLink className="h-3 w-3 text-[#94a3b8] opacity-0 transition-opacity group-hover:opacity-100" />
                              </div>
                              <span className="truncate text-[11px] text-[#94a3b8]">
                                {item.desc}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>

                      {/* Footer link to investors section */}
                      <a
                        href="#investors"
                        onClick={() => setSubmenuOpen(false)}
                        className="block border-t border-[#d4af37]/15 bg-[#d4af37]/5 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37] transition-colors hover:bg-[#d4af37]/15"
                      >
                        {t.nav.investors} →
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right-side controls */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            {/* Whitepaper button */}
            <a
              href="https://whitepaper.alarab-defi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border border-[#8b5cf6]/40 bg-[#8b5cf6]/8 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a78bfa] transition-all hover:bg-[#8b5cf6]/18 hover:shadow-gold md:inline-flex"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {t.nav.whitepaper}
            </a>

            <a
              href="#investors"
              className="hidden items-center gap-2 rounded-full border border-[#c9a85c]/40 bg-[#c9a85c]/8 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f4e9c9] transition-all hover:bg-[#c9a85c]/18 hover:shadow-gold md:inline-flex"
            >
              {t.nav.contact}
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-md p-2 text-[#f4e9c9] xl:hidden"
              aria-label={t.nav.openMenu}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] xl:hidden"
          >
            <div
              className="absolute inset-0 bg-[#0a194d]/90 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 240, damping: 30 }}
              className="absolute right-0 top-0 flex h-full w-80 flex-col gap-2 overflow-y-auto border-l border-[#c9a85c]/25 bg-[#162e6e] px-6 py-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="relative h-12 w-40">
                  <Image
                    src="/alarab-logo-new-clean.png"
                    alt="AL ARAB"
                    fill
                    sizes="160px"
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md p-2 text-[#f4e9c9]"
                  aria-label={t.nav.closeMenu}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile nav items */}
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className="border-b border-[#c9a85c]/12 py-3 font-sans text-sm uppercase tracking-[0.22em] text-[#c9b88a] transition-colors hover:text-[#f4e9c9]"
                >
                  {item.label}
                </motion.a>
              ))}

              {/* Investors with expandable submenu */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 + NAV_ITEMS.length * 0.04 }}
              >
                <button
                  onClick={() => setMobileSubmenuOpen((v) => !v)}
                  className="flex w-full items-center justify-between border-b border-[#c9a85c]/12 py-3 font-sans text-sm uppercase tracking-[0.22em] text-[#c9b88a] transition-colors hover:text-[#f4e9c9]"
                >
                  {t.nav.investors}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${mobileSubmenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {mobileSubmenuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-2 py-3 pl-4">
                        {SUBMENU_ITEMS.map((item) => (
                          <a
                            key={item.name}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 rounded-lg border border-[#c9a85c]/20 bg-[#0a194d]/40 p-3 transition-all hover:border-[#c9a85c]/40"
                          >
                            <div className="relative h-10 w-10 shrink-0 rounded-lg border border-[#d4af37]/25 bg-[#0a194d]/60 p-1">
                              <Image
                                src={item.logo}
                                alt={`${item.name} logo`}
                                fill
                                sizes="40px"
                                className="object-contain p-1"
                                unoptimized
                              />
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className="font-display text-sm font-semibold text-[#d4af37]">
                                  {item.name}
                                </span>
                                <ExternalLink className="h-3 w-3 text-[#94a3b8]" />
                              </div>
                              <span className="truncate text-[10px] text-[#94a3b8]">
                                {item.desc}
                              </span>
                            </div>
                          </a>
                        ))}
                        <a
                          href="#investors"
                          onClick={() => setOpen(false)}
                          className="mt-1 rounded-lg border border-[#c9a85c]/50 bg-[#c9a85c]/15 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#f4e9c9]"
                        >
                          {t.nav.investors} →
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="mt-4">
                <LanguageSwitcher />
              </div>

              {/* Whitepaper button (mobile) */}
              <a
                href="https://whitepaper.alarab-defi.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 rounded-full border border-[#8b5cf6]/50 bg-[#8b5cf6]/15 px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#a78bfa]"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {t.nav.whitepaper}
              </a>

              <a
                href="#investors"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-full border border-[#c9a85c]/50 bg-[#c9a85c]/15 px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#f4e9c9]"
              >
                {t.nav.contact}
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
