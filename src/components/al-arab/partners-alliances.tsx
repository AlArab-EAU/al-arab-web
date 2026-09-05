'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, Handshake, Sparkles } from 'lucide-react'
import { useI18n } from '@/lib/i18n/i18n-provider'

/**
 * PartnersAlliances — showcases strategic alliances with GCRM and QFSPay.
 *
 * Each partner card includes:
 *  - Official logo
 *  - Name + tagline
 *  - Description
 *  - "Visit site" button with external link
 *  - Gold accent border + glow on hover
 */
export function PartnersAlliances() {
  const { t } = useI18n()
  const al = t.videoGallery.alliances

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mt-20"
    >
      {/* Sub-heading */}
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <Handshake className="h-5 w-5 text-[#d4af37]" />
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d4af37]">
            {al.eyebrow}
          </span>
          <span className="font-arabic-serif text-sm text-[#d4af37]/70" dir="rtl">
            {al.arabic}
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>
        <h3 className="font-display text-2xl font-medium text-[#f4e9c9] md:text-3xl">
          {al.title}{' '}
          <span className="text-gradient-gold">{al.titleHighlight}</span>
        </h3>
        <p className="max-w-2xl text-sm leading-relaxed text-[#94a3b8]">
          {al.description}
        </p>
      </div>

      {/* Partners grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {al.partners.map((partner, i) => (
          <motion.a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#d4af37]/30 glass p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#d4af37]/60 hover:shadow-gold"
          >
            {/* Hover glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.15) 0%, transparent 70%)',
              }}
            />

            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Logo + name */}
            <div className="relative flex items-center gap-5">
              {/* Logo container */}
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/25 bg-[#0f172a]/60 p-2">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} — Official Logo`}
                  fill
                  sizes="80px"
                  className="object-contain p-2"
                  unoptimized
                />
              </div>

              <div className="flex flex-col">
                <h4 className="font-display text-2xl font-semibold text-gradient-gold">
                  {partner.name}
                </h4>
                <span className="mt-1 text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                  {partner.tagline}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="relative mt-5 text-sm leading-relaxed text-[#94a3b8]">
              {partner.description}
            </p>

            {/* Visit site button */}
            <div className="relative mt-6 flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] transition-all group-hover:bg-[#d4af37]/20 group-hover:shadow-gold">
                <ExternalLink className="h-3.5 w-3.5" />
                {al.visitSite}
              </span>
              <Sparkles className="h-3.5 w-3.5 text-[#d4af37]/50 transition-opacity group-hover:opacity-100 opacity-0" />
            </div>

            {/* URL preview */}
            <span className="relative mt-3 font-mono text-[10px] text-[#94a3b8]/60">
              {partner.url.replace('https://', '').replace('/', '')}
            </span>

            {/* Corner accents */}
            <div className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r border-t border-[#d4af37]/0 transition-all duration-500 group-hover:border-[#d4af37]/40" />
            <div className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b border-l border-[#d4af37]/0 transition-all duration-500 group-hover:border-[#d4af37]/40" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}
