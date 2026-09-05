'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Sparkles } from 'lucide-react'
import { useI18n } from '@/lib/i18n/i18n-provider'
import { SpinningCoin } from './spinning-coin'

interface CoinShowcaseProps {
  variant?: 'full' | 'compact'
}

interface CoinSpec {
  src: string
  alt: string
  name: string
  arabicName: string
  caption: string
  spinDuration: number
}

/**
 * Showcase of the official AlArab concept coins.
 *
 * Corrected design:
 *  - All 3 coins share consistent size and styling (equal visual weight)
 *  - Each coin has its own glow effect (not just the center)
 *  - Each coin has bilingual labels (English + Arabic)
 *  - Higher contrast card background (lighter, more distinct from page)
 *  - Better spacing (no top cutoff from previous section)
 *  - Feature badges connected visually to coins via a divider
 *  - Consistent 3D spinning effect across all coins
 */
export function CoinShowcase({ variant = 'full' }: CoinShowcaseProps) {
  const { t } = useI18n()
  const cs = t.economy.coinShowcase

  // All 3 coins now use the official Aramco/AlAmal/DEFI designs
  // with equal visual weight and bilingual labels
  const COINS: CoinSpec[] = [
    {
      src: '/alarab-coin-aramco-clean.png',
      alt: 'ARAMCO — Saudi currency concept token',
      name: 'ARAMCO',
      arabicName: 'العملة السعودية',
      caption: 'DEFI · Saudi Arabia · Binary code',
      spinDuration: 22,
    },
    {
      src: '/alarab-coin-defi-clean.png',
      alt: 'AL ARAB — DEFI concept token',
      name: 'AL ARAB',
      arabicName: 'العربية اللامركزية',
      caption: 'DEFI · Kingdom of Saudi Arabia',
      spinDuration: 24,
    },
    {
      src: '/alarab-coin-alamal-clean.png',
      alt: 'AL AMAL — Decentralized blockchain concept token',
      name: 'AL AMAL',
      arabicName: 'الأمل',
      caption: 'Peer-to-peer · Blockchain · 2020',
      spinDuration: 20,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`relative mt-16 overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-gradient-to-br from-[#0b3a63]/85 via-[#061a2e]/85 to-[#0b3a63]/85 backdrop-blur-xl ${
        variant === 'full' ? 'p-8 md:p-12' : 'p-6'
      }`}
    >
      {/* Stronger gold top border accent for separation */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

      {/* Decorative orbital rings */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#d4af37]/15 animate-spin-slower" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-[#d4af37]/10 animate-spin-slow" />
      <div className="pointer-events-none absolute -left-32 -bottom-32 h-96 w-96 rounded-full border border-[#00d4ff]/10 animate-spin-slower" />

      {/* Background glow behind coins */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(0,212,255,0.06) 50%, transparent 70%)',
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

          {/* Feature badges — connected with a divider line above */}
          <div className="mt-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="h-px flex-1 bg-gradient-to-r from-[#d4af37]/40 to-transparent" />
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#d4af37]/70">
                {t.economy.coinShowcase.eyebrow}
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-[#d4af37]/40 to-transparent" />
            </div>
            <div className="flex flex-wrap gap-2">
              {['Blockchain', 'DeFi', 'On-chain', 'Saudi Arabia', 'Peer-to-peer'].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d4af37]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Coins column — all 3 with equal weight, each with its own glow */}
        <div className="relative grid grid-cols-3 gap-3 sm:gap-5">
          {COINS.map((coin, i) => (
            <CoinCard key={coin.name} coin={coin} delay={0.1 + i * 0.1} />
          ))}
        </div>
      </div>

      {/* Disclaimer — more prominent */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative mt-8 flex items-start gap-3 rounded-xl border border-[#d4af37]/25 bg-[#020812]/70 p-4 backdrop-blur-md"
      >
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" />
        <p className="text-[11px] leading-relaxed text-[#7eb8e2]">
          {cs.disclaimer}
        </p>
      </motion.div>
    </motion.div>
  )
}

interface CoinCardProps {
  coin: CoinSpec
  delay: number
}

function CoinCard({ coin, delay }: CoinCardProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-[#d4af37]/25 bg-[#020812]/40 p-4 backdrop-blur-md transition-all duration-500 hover:border-[#d4af37]/50 hover:bg-[#020812]/60"
    >
      {/* Per-coin glow halo — now applied to ALL coins equally */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(212,175,55,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative">
        <SpinningCoin
          src={coin.src}
          alt={coin.alt}
          size={130}
          spinDuration={coin.spinDuration}
          glow={0.5}
        />
      </div>

      <figcaption className="relative flex flex-col items-center gap-1 text-center">
        <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] text-glow-soft">
          {coin.name}
        </span>
        <span className="font-arabic-serif text-xs text-[#7eb8e2]" dir="rtl">
          {coin.arabicName}
        </span>
        <span className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#7eb8e2]/70">
          {coin.caption}
        </span>
      </figcaption>
    </motion.figure>
  )
}
