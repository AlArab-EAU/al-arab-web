'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Boxes, Link2, Blocks, MoonStar, Users } from 'lucide-react'
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

interface TechTag {
  label: string
  description: string
}

/**
 * Showcase of the official AlArab concept coins.
 *
 * Now displays 2 coins of the SAME visual size (700x700 source images),
 * with a richer narrative structure including:
 *  - eyebrow + title + subtitle
 *  - 4 narrative paragraphs
 *  - "Identidad y Tecnología" subsection with 5 tech tags (label + description)
 */
export function CoinShowcase({ variant = 'full' }: CoinShowcaseProps) {
  const { t } = useI18n()
  const cs = t.economy.coinShowcase

  const COINS: CoinSpec[] = [
    {
      src: '/alarab-coin-defi-700.png',
      alt: 'AlArab Defi — DeFi concept token',
      name: 'ALARAB DEFI',
      arabicName: 'العربية اللامركزية',
      caption: 'DEFI · Kingdom of Saudi Arabia',
      spinDuration: 24,
    },
    {
      src: '/alarab-coin-new-clean.png',
      alt: 'AlArab — Official commemorative concept coin',
      name: 'ALARAB',
      arabicName: 'العرب',
      caption: 'Official · Mecca · Dubai · Abu Dhabi',
      spinDuration: 20,
    },
  ]

  // Tech identity tags with descriptions
  const TECH_TAGS: TechTag[] = [
    { label: 'BLOCKCHAIN', description: cs.techBlockchain },
    { label: 'DEFI', description: cs.techDefi },
    { label: 'ON-CHAIN', description: cs.techOnChain },
    { label: cs.techArabicLabel, description: cs.techArabicIdentity },
    { label: 'PEER-TO-PEER', description: cs.techPeerToPeer },
  ]

  const TECH_ICONS = [Blocks, Link2, Boxes, MoonStar, Users]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`relative mt-16 overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-gradient-to-br from-[#162e6e]/70 via-[#0f0f1a]/70 to-[#162e6e]/70 backdrop-blur-xl ${
        variant === 'full' ? 'p-8 md:p-12' : 'p-6'
      }`}
    >
      {/* Gold top border accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

      {/* Decorative orbital rings */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#d4af37]/15 animate-spin-slower" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-[#d4af37]/10 animate-spin-slow" />
      <div className="pointer-events-none absolute -left-32 -bottom-32 h-96 w-96 rounded-full border border-[#2563eb]/10 animate-spin-slower" />

      {/* Background glow behind coins */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(0,212,255,0.06) 50%, transparent 70%)',
        }}
      />

      {/* === SECTION 1: Identity narrative + 2 coins === */}
      <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Text column */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d4af37]">
              {cs.eyebrow}
            </span>
          </div>

          <h3 className="font-display text-3xl font-medium leading-tight text-[#f4e9c9] md:text-4xl">
            {cs.title}
          </h3>
          <span className="font-arabic-serif text-lg text-[#d4af37]/70" dir="rtl">
            {cs.arabic}
          </span>

          {/* Subtitle — tagline */}
          {cs.subtitle && (
            <p className="text-[15px] font-medium leading-relaxed text-[#d4af37] md:text-base">
              {cs.subtitle}
            </p>
          )}

          {/* Narrative paragraphs */}
          <div className="mt-2 flex flex-col gap-3.5">
            {cs.paragraph1 && (
              <p className="text-sm leading-relaxed text-[#cbd5e1]">
                {cs.paragraph1}
              </p>
            )}
            {cs.paragraph2 && (
              <p className="text-sm leading-relaxed text-[#94a3b8]">
                {cs.paragraph2}
              </p>
            )}
            {cs.paragraph3 && (
              <p className="text-sm leading-relaxed text-[#cbd5e1]">
                {cs.paragraph3}
              </p>
            )}
            {cs.paragraph4 && (
              <p className="text-sm font-medium leading-relaxed text-[#d4af37]/90">
                {cs.paragraph4}
              </p>
            )}
          </div>
        </div>

        {/* Coins column — both coins at SAME visual size */}
        <div className="relative grid grid-cols-2 gap-6 sm:gap-8">
          {COINS.map((coin, i) => (
            <FloatingCoin key={coin.name} coin={coin} delay={0.1 + i * 0.15} />
          ))}
        </div>
      </div>

      {/* === SECTION 2: Identidad y Tecnología — 5 tech tags with descriptions === */}
      {cs.techSectionTitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mt-10 border-t border-[#d4af37]/15 pt-8"
        >
          {/* Tech section header */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d4af37]">
              {cs.techSectionTitle}
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          {/* 5 tech tags grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_TAGS.map((tag, i) => {
              const Icon = TECH_ICONS[i] ?? Boxes
              return (
                <motion.div
                  key={tag.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className="group relative flex items-start gap-3 rounded-xl border border-[#d4af37]/25 bg-[#0f0f1a]/60 p-4 backdrop-blur-md transition-all hover:border-[#d4af37]/50 hover:bg-[#0f0f1a]/80"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#d4af37]/35 bg-[#d4af37]/8">
                    <Icon className="h-4 w-4 text-[#d4af37]" />
                  </div>
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4af37]">
                      {tag.label}
                    </span>
                    <span className="text-[12px] leading-relaxed text-[#94a3b8]">
                      {tag.description}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative mt-8 flex items-start gap-3 rounded-xl border border-[#d4af37]/25 bg-[#0f0f1a]/70 p-4 backdrop-blur-md"
      >
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" />
        <p className="text-[11px] leading-relaxed text-[#94a3b8]">
          {cs.disclaimer}
        </p>
      </motion.div>
    </motion.div>
  )
}

interface FloatingCoinProps {
  coin: CoinSpec
  delay: number
}

/**
 * FloatingCoin — renders a coin WITHOUT any card/background container.
 * Both coins use the SAME size prop (180px) so they appear identical in size.
 */
function FloatingCoin({ coin, delay }: FloatingCoinProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col items-center gap-4"
    >
      {/* Per-coin glow halo */}
      <div
        className="pointer-events-none absolute left-1/2 top-[90px] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)',
        }}
      />

      {/* The coin itself — same size for both coins */}
      <div className="relative">
        <SpinningCoin
          src={coin.src}
          alt={coin.alt}
          size={180}
          spinDuration={coin.spinDuration}
          glow={0.6}
        />
      </div>

      {/* Labels */}
      <div className="relative flex flex-col items-center gap-1 text-center">
        <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af37] text-glow-soft">
          {coin.name}
        </span>
        <span className="font-arabic-serif text-sm text-[#94a3b8]" dir="rtl">
          {coin.arabicName}
        </span>
        <span className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#94a3b8]/70">
          {coin.caption}
        </span>
      </div>
    </motion.div>
  )
}
