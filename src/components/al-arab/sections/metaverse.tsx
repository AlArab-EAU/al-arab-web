'use client'

import { motion } from 'framer-motion'
import {
  Globe2,
  Building2,
  Glasses,
  Store,
  Palette,
  Network,
} from 'lucide-react'
import { Section, SectionHeading } from '../section'
import { YouTubeCinematic } from '../youtube-cinematic'
import { useI18n } from '@/lib/i18n/i18n-provider'

const CAPABILITY_ICONS = [Globe2, Building2, Glasses, Store, Palette, Network]

export function MetaverseSection() {
  const { t } = useI18n()
  const mt = t.metaverse

  return (
    <Section id="metaverse">
      <SectionHeading
        eyebrow={mt.eyebrow}
        arabic={mt.arabic}
        title={
          <>
            {mt.title}
            <br />
            <span className="text-gradient-gold">{mt.titleHighlight}</span>
          </>
        }
        description={mt.description}
      />

      {/* Video */}
      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-3"
        >
          <YouTubeCinematic
            videoId="b6ffAuBYf8g"
            title={mt.videoTitle}
            description={mt.videoDescription}
            officialBadge={t.hero.officialVideo}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center gap-4 lg:col-span-2"
        >
          <h3 className="font-display text-3xl font-medium text-[#f4e9c9]">
            {mt.districtsTitle}
          </h3>
          <p className="text-sm leading-relaxed text-[#a8c5e8]">
            {mt.districtsDescription}
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {mt.districts.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="rounded-xl border border-[#c9a85c]/20 bg-[#0d2657]/60 p-4 backdrop-blur-md"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="font-display text-base font-medium text-[#d4af37]">
                    {d.name}
                  </h4>
                  <span className="font-arabic-serif text-xs text-[#c9a85c]/70">
                    {d.arabic}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#a8c5e8]">
                  {d.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Capabilities grid */}
      <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {mt.capabilities.map((c, i) => {
          const Icon = CAPABILITY_ICONS[i] ?? Globe2
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex flex-col items-center gap-3 rounded-xl border border-[#c9a85c]/15 glass-gold p-5 text-center transition-all hover:border-[#c9a85c]/40"
            >
              <Icon className="h-6 w-6 text-[#d4af37]" />
              <h4 className="font-display text-sm font-medium text-[#f4e9c9]">
                {c.title}
              </h4>
              <p className="text-[11px] leading-relaxed text-[#a8c5e8]">
                {c.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
