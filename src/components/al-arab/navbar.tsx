'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { href: '#vision', label: 'Visión', en: 'Vision' },
  { href: '#metaverse', label: 'Metaverso', en: 'Metaverse' },
  { href: '#economy', label: 'Economía', en: 'Economy' },
  { href: '#technology', label: 'Tecnología', en: 'Technology' },
  { href: '#ecosystem', label: 'Ecosistema', en: 'Ecosystem' },
  { href: '#roadmap', label: 'Roadmap', en: 'Roadmap' },
  { href: '#investors', label: 'Inversores', en: 'Investors' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          {/* Logo */}
          <a href="#top" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#c9a85c]/50 animate-spin-slower" />
              <div className="absolute inset-[3px] rounded-full border border-[#c9a85c]/30" />
              <span className="font-arabic-serif text-lg font-bold text-gradient-gold">
                ع
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold tracking-[0.35em] text-gradient-gold">
                AL ARAB
              </span>
              <span className="mt-1 font-arabic text-[10px] tracking-[0.3em] text-[#8a9bb8]">
                العرب
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
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
          </nav>

          {/* CTA */}
          <a
            href="#investors"
            className="hidden items-center gap-2 rounded-full border border-[#c9a85c]/40 bg-[#c9a85c]/8 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#f4e9c9] transition-all hover:bg-[#c9a85c]/18 hover:shadow-gold md:inline-flex"
          >
            Contacto
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md p-2 text-[#f4e9c9] lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-[#050810]/90 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 240, damping: 30 }}
              className="absolute right-0 top-0 flex h-full w-72 flex-col gap-2 border-l border-[#c9a85c]/25 bg-[#0a1224] px-6 py-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-xl tracking-[0.3em] text-gradient-gold">
                  AL ARAB
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md p-2 text-[#f4e9c9]"
                  aria-label="Cerrar"
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
                  className="border-b border-[#c9a85c]/12 py-3 font-sans text-sm uppercase tracking-[0.22em] text-[#c9b88a] transition-colors hover:text-[#f4e9c9]"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="#investors"
                onClick={() => setOpen(false)}
                className="mt-6 rounded-full border border-[#c9a85c]/50 bg-[#c9a85c]/15 px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#f4e9c9]"
              >
                Contacto
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
