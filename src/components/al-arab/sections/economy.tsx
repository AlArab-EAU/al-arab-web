'use client'

import { motion } from 'framer-motion'
import {
  Coins,
  Store,
  Wallet,
  Layers,
  ShieldCheck,
  Repeat,
} from 'lucide-react'
import { Section, SectionHeading } from '../section'
import { CoinShowcase } from '../coin-showcase'
import { useI18n } from '@/lib/i18n/i18n-provider'

const FEATURE_ICONS = [Store, Wallet, Layers, Repeat]

export function EconomySection() {
  const { t } = useI18n()
  const et = t.economy
  const statusLabels = et.statusLabels as Record<string, string>

  // Determine status style by raw status key
  const statusStyle = (rawStatus: string) => {
    // Map original es status to translated label
    const label = statusLabels[rawStatus] ?? rawStatus
    if (rawStatus === 'Disponible') {
      return { color: '#d4af37', label }
    }
    if (rawStatus === 'Parcial') {
      return { color: '#8a9bb8', label }
    }
    return { color: '#5d7ba8', label }
  }

  return (
    <Section id="economy">
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

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {et.features.map((f, i) => {
          const Icon = FEATURE_ICONS[i] ?? Coins
          const style = statusStyle(f.status)
          return (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-[#c9a85c]/22 glass p-7 transition-all hover:border-[#c9a85c]/45"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#c9a85c]/30 bg-[#c9a85c]/8">
                  <Icon className="h-6 w-6 text-[#d4af37]" />
                </div>
                <span
                  className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{
                    color: style.color,
                    borderColor: `${style.color}80`,
                    background: `${style.color}1a`,
                  }}
                >
                  {style.label}
                </span>
              </div>
              <div className="mt-5">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-2xl font-medium text-[#f4e9c9]">
                    {f.title}
                  </h3>
                  <span className="font-arabic-serif text-base text-[#c9a85c]/70">
                    {f.arabic}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#8a9bb8]">
                  {f.description}
                </p>
              </div>
            </motion.article>
          )
        })}
      </div>

      {/* Coin showcase */}
      <div className="mt-12">
        <CoinShowcase />
      </div>

      {/* Disclaimer / transparency notes */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-10 rounded-2xl border border-[#c9a85c]/15 bg-[#0a1224]/40 p-6 backdrop-blur-md"
      >
        <h4 className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
          {et.noteTitle}
        </h4>
        <ul className="mt-4 flex flex-col gap-3">
          {et.notes.map((note, i) => (
            <li key={i} className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a85c]" />
              <span className="text-xs leading-relaxed text-[#8a9bb8]">
                {note}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </Section>
  )
}
