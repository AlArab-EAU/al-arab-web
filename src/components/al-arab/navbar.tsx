'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n/i18n-provider'
import { LanguageSwitcher } from './language-switcher'

export function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const NAV_ITEMS = [
    { href: '#vision', label: t.nav.vision },
    { href: '#metaverse', label: t.nav.metaverse },
    { href: '#economy', label: t.nav.economy },
    { href: '#technology', label: t.nav.technology },
    { href: '#ecosystem', label: t.nav.ecosystem },
    { href: '#roadmap', label: t.nav.roadmap },
    { href: '#investors', label: t.nav.investors },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
            <div className="relative flex h-12 w-28 items-center justify-start md:w-36">
              <Image
                src="/alarab-logo-clean.png"
                alt="AL ARAB — Official Logo"
                fill
                priority
                sizes="(max-width: 768px) 112px, 144px"
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
                className="group relative font-sans text-[13px] uppercase tracking-[0.18em] text-[#c9b89a] transition-colors hover:text-[#f4e9c9]"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#d4af37] to-[#c9a85c] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right-side controls */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
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
              className="absolute inset-0 bg-[#050505]/90 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 240, damping: 30 }}
              className="absolute right-0 top-0 flex h-full w-72 flex-col gap-2 border-l border-[#c9a85c]/25 bg-[#0a0a0a] px-6 py-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="relative h-8 w-28">
                  <Image
                    src="/alarab-logo-clean.png"
                    alt="AL ARAB"
                    fill
                    sizes="112px"
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
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className="border-b border-[#c9a85c]/12 py-3 font-sans text-sm uppercase tracking-[0.22em] text-[#c9b89a] transition-colors hover:text-[#f4e9c9]"
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="mt-4">
                <LanguageSwitcher />
              </div>
              <a
                href="#investors"
                onClick={() => setOpen(false)}
                className="mt-6 rounded-full border border-[#c9a85c]/50 bg-[#c9a85c]/15 px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#f4e9c9]"
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
