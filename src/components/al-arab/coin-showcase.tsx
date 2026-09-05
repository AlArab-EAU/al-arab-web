'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Sparkles } from 'lucide-react'
import { useI18n } from '@/lib/i18n/i18n-provider'
import { SpinningCoin } from './spinning-coin'

interface CoinShowcaseProps {
  variant?: 'full' | 'compact'
}

/**
 * Showcase of the official AlArab concept coins.
 *
 * Improved design:
 *  - The new DEFI coin is the HERO centerpiece (large, prominent)
 *  - Two secondary coins flank it (smaller, supporting)
 *  - Glass card with gold border, glow effects, and animated entrance
 *  - Disclaimer always visible at the bottom
 */
export function CoinShowcase({ variant = 'full' }: CoinShowcaseProps) {
  const { t } = useI18n()
  const cs = t.economy.coinShowcase

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-3xl border border-[#d4af37]/35 glass-strong ${
        variant === 'full' ? 'p-8 md:p-12' : 'p-6'
      }`}
    >
      {/* Decorative orbital rings */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#d4af37]/15 animate-spin-slower" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-[#d4af37]/10 animate-spin-slow" />
      <div className="pointer-events-none absolute -left-32 -bottom-32 h-96 w-96 rounded-full border border-[#00d4ff]/10 animate-spin-slower" />

      {/* Background glow behind hero coin */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,212,255,0.05) 50%, transparent 70%)',
        }}
      />

      <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Text column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d4af37]">
              {cs.eyebrow}
            </span>
            <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
          </div>
          <h3 className="font-display text-3xl font-medium leading-tight text-[#f4e9c9] md:text-4xl">
            {cs.title}
          </h3>
          <span className="font-arabic-serif text-lg text-[#d4af37]/70" dir="rtl">
            {cs.arabic}
          </span>
          <p className="text-sm leading-relaxed text-[#7eb8e2]">
            {cs.description}
          </p>

          {/* Feature badges */}
          <div className="mt-2 flex flex-wrap gap-2">
            {['Blockchain', 'DeFi', 'On-chain', 'Saudi Arabia'].map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d4af37]"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Coins column — hero + 2 satellites */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-4">
          {/* Left satellite coin — smaller */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden flex-col items-center gap-2 sm:flex"
          >
            <SpinningCoin
              src="/alarab-coin-al-amin-clean.png"
              alt="AL AMIN concept token"
              size={110}
              spinDuration={22}
              glow={0.4}
            />
            <span className="font-display text-[10px] uppercase tracking-[0.15em] text-[#7eb8e2]">
              AL AMIN
            </span>
          </motion.div>

          {/* Hero coin — DEFI, large */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-3"
          >
            <SpinningCoin
              src="/alarab-coin-defi-clean.png"
              alt="AL ARAB — DEFI concept token (hero)"
              size={220}
              spinDuration={24}
              glow={0.85}
            />
            <div className="flex flex-col items-center gap-1">
              <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af37] text-glow-soft">
                AL ARAB — DEFI
              </span>
              <span className="font-arabic-serif text-xs text-[#7eb8e2]" dir="rtl">
                العملة العربية اللامركزية
              </span>
            </div>
          </motion.div>

          {/* Right satellite coin — smaller */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden flex-col items-center gap-2 sm:flex"
          >
            <SpinningCoin
              src="/alarab-coin-4-clean.png"
              alt="AL URDH concept token"
              size={110}
              spinDuration={20}
              glow={0.4}
            />
            <span className="font-display text-[10px] uppercase tracking-[0.15em] text-[#7eb8e2]">
              AL URDH
            </span>
          </motion.div>
        </div>
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative mt-8 flex items-start gap-3 rounded-xl border border-[#d4af37]/20 bg-[#061a2e]/60 p-4 backdrop-blur-md"
      >
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" />
        <p className="text-[11px] leading-relaxed text-[#7eb8e2]">
          {cs.disclaimer}
        </p>
      </motion.div>
    </motion.div>
  )
}
