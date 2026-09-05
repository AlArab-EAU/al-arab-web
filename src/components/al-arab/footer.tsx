'use client'

import { motion } from 'framer-motion'
import { ArrowUp, Github, Linkedin, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n/i18n-provider'

const SOCIAL_ICONS = [Twitter, Linkedin, Youtube, Github]

const FOOTER_HREFS = [
  // Ecosistema
  ['#vision', '#metaverse', '#economy', '#technology'],
  // Oportunidades
  ['#ecosystem', '#roadmap', '#investors', '#investors'],
  // Recursos
  ['#top', '#metaverse', '#ecosystem', '#investors'],
]

export function Footer() {
  const { t } = useI18n()
  const ft = t.footer

  return (
    <footer className="relative mt-32 border-t border-[#c9a85c]/15 bg-[#0a2e5c]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a85c]/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-radial-gold opacity-30" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-44 md:h-20 md:w-56">
                <Image
                  src="/alarab-logo-new-clean.png"
                  alt="AL ARAB — Official Logo"
                  fill
                  sizes="(max-width: 768px) 176px, 224px"
                  className="object-contain"
                />
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#8a96a8]">
              {ft.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_ICONS.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={ft.social[i] ?? `Social ${i}`}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#c9a85c]/25 bg-[#0b3a6b]/60 text-[#c9b88a] transition-all hover:border-[#d4af37] hover:text-[#d4af37] hover:shadow-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {ft.columns.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.05 }}
            >
              <h4 className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                {col.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.items.map((item, j) => (
                  <li key={item}>
                    <a
                      href={FOOTER_HREFS[i]?.[j] ?? '#'}
                      className="group inline-flex items-center gap-2 text-sm text-[#8a96a8] transition-colors hover:text-[#f4e9c9]"
                    >
                      <span className="h-px w-0 bg-[#d4af37] transition-all duration-300 group-hover:w-4" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[#c9a85c]/10 pt-8 md:flex-row">
          <p className="text-center text-[11px] leading-relaxed text-[#1a3a5c] md:text-left">
            {ft.copyright}
          </p>
          <a
            href="#top"
            className="group flex items-center gap-2 rounded-full border border-[#c9a85c]/30 bg-[#0b3a6b]/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9b88a] transition-all hover:border-[#d4af37] hover:text-[#f4e9c9]"
          >
            {ft.backToTop}
            <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
