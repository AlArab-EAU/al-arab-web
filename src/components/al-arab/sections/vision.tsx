'use client'

import { motion } from 'framer-motion'
import {
  Cpu,
  Sparkles,
  ShoppingBag,
  Landmark,
  Lightbulb,
  Users,
} from 'lucide-react'
import { Section, SectionHeading } from '../section'
import { useI18n } from '@/lib/i18n/i18n-provider'

const ICONS = [Cpu, Sparkles, ShoppingBag, Landmark, Lightbulb, Users]

export function VisionSection() {
  const { t } = useI18n()
  const pillars = t.vision.pillars

  return (
    <Section id="vision">
      <SectionHeading
        eyebrow={t.vision.eyebrow}
        arabic={t.vision.arabic}
        title={
          <>
            {t.vision.title}
            <br />
            <span className="text-gradient-gold">{t.vision.titleHighlight}</span>
          </>
        }
        description={t.vision.description}
      />

      <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                <p className="text-sm leading-relaxed text-[#b8c5d6]">
                  {p.description}
                </p>
                <div className="mt-2 flex items-center gap-2 text-[#d4af37]/80">
                  <span className="h-px w-6 bg-[#c9a85c]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
                    {t.vision.pillarLabel} {String(i + 1).padStart(2, '0')}
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
