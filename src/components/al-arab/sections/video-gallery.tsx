'use client'

import { motion } from 'framer-motion'
import { Globe2, Sparkles } from 'lucide-react'
import { Section, SectionHeading } from '../section'
import { YouTubeCinematic } from '../youtube-cinematic'
import { BinanceVideo } from '../binance-video'
import { PartnersAlliances } from '../partners-alliances'
import { useI18n } from '@/lib/i18n/i18n-provider'

interface VideoSpec {
  id: string
  title: string
  language: string
  languageShort: string
  description: string
  start?: number
}

const VIDEOS: VideoSpec[] = [
  {
    id: 'e1rRCgzZU1Y',
    title: 'AlArab — Arabic Version',
    language: 'العربية',
    languageShort: 'AR',
    description:
      'Official presentation of the AlArab ecosystem in Arabic — a complete vision of the metaverse, digital economy and Arab culture fused with technology.',
    start: 30,
  },
  {
    id: 'b6AfH3ktBfs',
    title: 'AlArab — Thai Version',
    language: 'ภาษาไทย',
    languageShort: 'TH',
    description:
      'Official AlArab presentation for the Thai community — discovering the bridge between the Arab world and Southeast Asia.',
    start: 8,
  },
  {
    id: 'GjW7sJgzXM0',
    title: 'AlArab — English Version',
    language: 'English',
    languageShort: 'EN',
    description:
      'Official AlArab presentation in English — the global vision of the digital ecosystem for international audiences.',
    start: 4,
  },
]

/**
 * VideoGallery — professional multi-language video presentations section.
 */
export function VideoGallerySection() {
  const { t } = useI18n()
  const vg = t.videoGallery

  return (
    <Section id="videos">
      <SectionHeading
        eyebrow={vg.eyebrow}
        arabic={vg.arabic}
        title={
          vg.titleHighlight ? (
            <>
              {vg.title}
              <br />
              <span className="text-gradient-gold">{vg.titleHighlight}</span>
            </>
          ) : (
            <span className="text-gradient-gold">{vg.title}</span>
          )
        }
        description={vg.description}
      />

      {/* Subtitle tagline */}
      {vg.subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-3xl text-center text-base font-medium leading-relaxed text-[#d4af37] md:text-lg"
        >
          {vg.subtitle}
        </motion.p>
      )}

      {/* Concept block — conceptLabel + paragraph2 */}
      {vg.paragraph2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl rounded-2xl border border-[#d4af37]/20 bg-[#0f0f1a]/60 p-6 backdrop-blur-md md:p-7"
        >
          {vg.conceptLabel && (
            <div className="mb-3 flex items-center justify-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d4af37]">
                {vg.conceptLabel}
              </span>
              <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
            </div>
          )}
          <p className="text-center text-[14px] leading-relaxed text-[#cbd5e1] md:text-[14.5px]">
            {vg.paragraph2}
          </p>
        </motion.div>
      )}

      {/* Special Binance partnership video — cinematic showcase */}
      <BinanceVideo />

      {/* Strategic Alliances — GCRM + QFSPay */}
      <PartnersAlliances />

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {vg.videos.map((video, i) => {
          const spec = VIDEOS[i]
          if (!spec) return null
          return (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group flex flex-col"
            >
              <YouTubeCinematic
                videoId={spec.id}
                title={video.title}
                description={video.description}
                officialBadge={t.hero.officialVideo}
                start={spec.start}
                languageLabel={video.languageShort}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Footer tagline + globe accent */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-4"
      >
        <div className="flex items-center gap-3 rounded-full border border-[#c9a85c]/25 glass px-5 py-3">
          <Globe2 className="h-5 w-5 text-[#d4af37]" />
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            {vg.footerTagline ?? '3 idiomas · 3 culturas · 1 ecosistema'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {['🇸🇦', '🇹🇭', '🇬🇧'].map((flag, i) => (
            <span
              key={i}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a85c]/25 bg-[#0f172a]/50 text-base"
            >
              {flag}
            </span>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}
