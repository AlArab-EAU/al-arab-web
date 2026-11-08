'use client'

import { motion } from 'framer-motion'
import {
  Cpu,
  Sparkles,
  ShoppingBag,
  Landmark,
  Lightbulb,
  Users,
  Coins,
  Network,
} from 'lucide-react'
import { Section, SectionHeading } from '../section'
import { useI18n } from '@/lib/i18n/i18n-provider'

const ICONS = [Cpu, Sparkles, ShoppingBag, Landmark, Lightbulb, Users]

export function VisionSection() {
  const { t } = useI18n()
  const v = t.vision
  const pillars = v.pillars

  return (
    <Section id="vision">
      <SectionHeading
        eyebrow={v.eyebrow}
        arabic={v.arabic}
        title={
          <>
            {v.title}
            <br />
            <span className="text-gradient-gold">{v.titleHighlight}</span>
          </>
        }
        description={v.description}
      />

      {/* Subtitle — strategic summary tagline */}
      {v.subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-3xl text-center text-base font-medium leading-relaxed text-[#d4af37] md:text-lg"
        >
          {v.subtitle}
        </motion.p>
      )}

      {/* Strategic narrative blocks — AlArab (ALA) currency + interconnected pillars */}
      {(v.paragraph2 || v.paragraph3) && (
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
          {v.paragraph2 && (
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-[#d4af37]/35 bg-gradient-to-br from-[#1a1a2e]/70 via-[#0f0f1a]/70 to-[#1a1a2e]/70 p-6 backdrop-blur-md md:p-7"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#d4af37]/8 blur-2xl transition-opacity duration-500 group-hover:bg-[#d4af37]/15" />
              <div className="relative flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d4af37]/40 bg-[#d4af37]/10">
                  <Coins className="h-5 w-5 text-[#d4af37]" />
                </div>
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                  AlArab · ALA
                </span>
              </div>
              <p className="mt-4 text-[14.5px] leading-relaxed text-[#cbd5e1]">
                {v.paragraph2}
              </p>
            </motion.div>
          )}

          {v.paragraph3 && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-[#8b5cf6]/35 bg-gradient-to-br from-[#1a1a2e]/70 via-[#0f0f1a]/70 to-[#1a1a2e]/70 p-6 backdrop-blur-md md:p-7"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#8b5cf6]/8 blur-2xl transition-opacity duration-500 group-hover:bg-[#8b5cf6]/15" />
              <div className="relative flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#8b5cf6]/40 bg-[#8b5cf6]/10">
                  <Network className="h-5 w-5 text-[#a78bfa]" />
                </div>
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a78bfa]">
                  Ecosystem
                </span>
              </div>
              <p className="mt-4 text-[14.5px] leading-relaxed text-[#cbd5e1]">
                {v.paragraph3}
              </p>
            </motion.div>
          )}
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p, i) => {
          const Icon = ICONS[i] ?? Cpu
          return (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-2xl border border-[#c9a85c]/20 glass p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#c9a85c]/45 hover:shadow-gold"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 bg-radial-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#c9a85c]/30 bg-[#c9a85c]/8">
                    <Icon className="h-6 w-6 text-[#d4af37]" />
                  </div>
                  <span className="font-arabic-serif text-xl text-[#c9a85c]/70">
                    {p.arabic}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-medium text-[#f4e9c9]">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#94a3b8]">
                  {p.description}
                </p>
                <div className="mt-2 flex items-center gap-2 text-[#d4af37]/80">
                  <span className="h-px w-6 bg-[#c9a85c]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
                    {v.pillarLabel} {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>
    </Section>
  )
}
