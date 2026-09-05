'use client'

import { motion } from 'framer-motion'
import {
  Shirt,
  Music2,
  Film,
  UtensilsCrossed,
  Gamepad2,
  Cpu,
  Building2,
  Rocket,
} from 'lucide-react'
import { Section, SectionHeading } from '../section'
import { useI18n } from '@/lib/i18n/i18n-provider'

const VERTICAL_ICONS = [
  Shirt,
  Music2,
  Film,
  UtensilsCrossed,
  Gamepad2,
  Cpu,
  Building2,
  Rocket,
]
const ACCENTS = [
  '#d4af37',
  '#c9a85c',
  '#d4af37',
  '#c9a85c',
  '#d4af37',
  '#c9a85c',
  '#d4af37',
  '#c9a85c',
]

export function EcosystemSection() {
  const { t } = useI18n()
  const et = t.ecosystem

  return (
    <Section id="ecosystem">
      <SectionHeading
        eyebrow={et.eyebrow}
        arabic={et.arabic}
        title={
          <>
            {et.title}
            <br />
            <span className="text-gradient-gold">{et.titleHighlight}</span>
          </>
        }
        description={et.description}
      />

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {et.verticals.map((v, i) => {
          const Icon = VERTICAL_ICONS[i] ?? Cpu
          const accent = ACCENTS[i] ?? '#d4af37'
          return (
            <motion.article
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07 }}
              className="group relative overflow-hidden rounded-2xl border border-[#c9a85c]/20 glass p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#c9a85c]/45"
            >
              <div
                className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `${accent}25` }}
              />
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#c9a85c]/30 bg-[#c9a85c]/8">
                    <Icon className="h-5 w-5 text-[#d4af37]" />
                  </div>
                  <span className="font-arabic-serif text-lg text-[#c9a85c]/70">
                    {v.arabic}
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium text-[#f4e9c9]">
                  {v.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#b8c5d6]">
                  {v.description}
                </p>
              </div>
            </motion.article>
          )
        })}
      </div>

      {/* Vertical showcase banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-12 overflow-hidden rounded-2xl border border-[#c9a85c]/22 glass-strong p-8 md:p-12"
      >
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-medium text-[#f4e9c9] md:text-3xl">
              {et.bannerTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#b8c5d6]">
              {et.bannerDescription}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {et.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#c9a85c]/30 bg-[#c9a85c]/8 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9b88a]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
