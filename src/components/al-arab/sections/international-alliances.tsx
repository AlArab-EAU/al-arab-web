'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Globe2, Handshake } from 'lucide-react'
import { Section, SectionHeading } from '../section'
import { useI18n } from '@/lib/i18n/i18n-provider'

const PHOTOS = [
  { src: '/partners-photos/partner-1.jpg', alt: 'International partnership meeting' },
  { src: '/partners-photos/partner-2.jpg', alt: 'Diplomatic alliance — Russia' },
  { src: '/partners-photos/partner-3.jpg', alt: 'Strategic partnership signing' },
  { src: '/partners-photos/partner-4.jpg', alt: 'AlArab ecosystem showcase' },
  { src: '/partners-photos/partner-5.jpg', alt: 'United States alliance — US diplomacy' },
  { src: '/partners-photos/partner-6.jpg', alt: 'International cooperation summit' },
]

export function InternationalAlliancesSection() {
  const { t } = useI18n()

  // Default labels if translations don't have them
  const defaultLabels = [
    'Strategic meeting',
    'Diplomatic alliance',
    'Partnership signing',
    'AlArab ecosystem',
    'United States alliance',
    'International cooperation',
  ]

  return (
    <Section id="alliances">
      <SectionHeading
        eyebrow={t.alliances?.eyebrow ?? 'International Alliances'}
        arabic={t.alliances?.arabic ?? 'التحالفات الدولية'}
        title={
          <>
            {(t.alliances?.title ?? 'Global Partnerships')}
            <br />
            <span className="text-gradient-gold">{t.alliances?.titleHighlight ?? 'across continents'}</span>
          </>
        }
        description={t.alliances?.description ?? 'AlArab builds strategic alliances with nations and organizations worldwide, extending the Arab digital ecosystem across borders.'}
      />

      {/* Photo gallery — 6 photos now, 3 columns on desktop */}
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PHOTOS.map((photo, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-[#d4af37]/25 glass shadow-deep"
          >
            {/* Image */}
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                unoptimized
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1a]/40 via-transparent to-[#0f0f1a]/40" />
            </div>

            {/* Bottom label */}
            <figcaption className="absolute bottom-0 inset-x-0 p-4">
              <div className="flex items-center gap-2">
                <Handshake className="h-3.5 w-3.5 text-[#d4af37]" />
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
                  {t.alliances?.photoLabel?.[i] ?? defaultLabels[i]}
                </span>
              </div>
            </figcaption>

            {/* Gold accent corners */}
            <div className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-[#d4af37]/30" />
            <div className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r border-t border-[#d4af37]/30" />
            <div className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-l border-b border-[#d4af37]/30" />
            <div className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-r border-b border-[#d4af37]/30" />
          </motion.figure>
        ))}
      </div>

      {/* Globe accent footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-10 flex items-center justify-center gap-3"
      >
        <div className="flex items-center gap-3 rounded-full border border-[#d4af37]/25 glass px-5 py-3">
          <Globe2 className="h-5 w-5 text-[#d4af37]" />
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#94a3b8]">
            {t.alliances?.footerText ?? 'Connecting nations · Building the future'}
          </span>
        </div>
      </motion.div>
    </Section>
  )
}
