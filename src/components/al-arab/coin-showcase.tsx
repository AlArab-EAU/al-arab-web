'use client'

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { useI18n } from '@/lib/i18n/i18n-provider'
import { SpinningCoin } from './spinning-coin'

interface CoinShowcaseProps {
  /** Compact mode uses tighter padding inside a parent section */
  variant?: 'full' | 'compact'
}

/**
 * Showcases the official AlArab concept coins.
 * Critically: this presents the coins as *conceptual design*, NOT as an
 * investment offer. A disclaimer is always visible.
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
      className={`relative overflow-hidden rounded-3xl border border-[#c9a85c]/30 glass-strong ${
        variant === 'full' ? 'p-8 md:p-12' : 'p-6'
      }`}
    >
      {/* Decorative orbital rings behind coins */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full border border-[#c9a85c]/15 animate-spin-slower" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full border border-[#c9a85c]/10 animate-spin-slow" />
      <div className="pointer-events-none absolute -left-32 -bottom-32 h-80 w-80 rounded-full border border-[#c9a85c]/10 animate-spin-slower" />

      <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Text column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#c9a85c]" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9a85c]">
              {cs.eyebrow}
            </span>
          </div>
          <h3 className="font-display text-3xl font-medium leading-tight text-[#f4e9c9] md:text-4xl">
            {cs.title}
          </h3>
          <span className="font-arabic-serif text-lg text-[#c9a85c]/70">
            {cs.arabic}
          </span>
          <p className="text-sm leading-relaxed text-[#7eb8e2]">
            {cs.description}
          </p>
        </div>

        {/* Spinning coins column — new big coin is the centerpiece */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <CoinCard
            src="/alarab-coin-4-clean.png"
            alt="AL URDH — Concept token"
            name={cs.coin1Name}
            caption={cs.coin1Caption}
            delay={0.1}
            size={140}
          />
          <CoinCard
            src="/alarab-coin-clean.png"
            alt="AL ARAB concept token — variant"
            name={cs.coin1Name}
            caption={cs.coin1Caption}
            delay={0.2}
            size={120}
            spinDuration={22}
          />
          <CoinCard
            src="/alarab-coin-al-amin-clean.png"
            alt="AL AMIN concept token"
            name={cs.coin2Name}
            caption={cs.coin2Caption}
            delay={0.3}
            size={120}
            spinDuration={20}
          />
        </div>
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative mt-8 flex items-start gap-3 rounded-xl border border-[#c9a85c]/15 bg-[#061a2e]/50 p-4"
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
  src: string
  alt: string
  name: string
  caption: string
  delay: number
  size: number
  spinDuration?: number
}

function CoinCard({
  src,
  alt,
  name,
  caption,
  delay,
  size,
  spinDuration = 18,
}: CoinCardProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.85, rotateY: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col items-center gap-2 rounded-2xl border border-[#c9a85c]/20 bg-[#061a2e]/40 p-3 backdrop-blur-md"
    >
      <SpinningCoin
        src={src}
        alt={alt}
        size={size}
        spinDuration={spinDuration}
        glow={0.4}
      />
      <figcaption className="flex flex-col gap-1 text-center">
        <span className="font-display text-[10px] font-medium uppercase tracking-[0.14em] text-[#d4af37]">
          {name.split('—')[0]}
        </span>
        <span className="text-[9px] leading-relaxed text-[#7eb8e2]">
          {caption}
        </span>
      </figcaption>
    </motion.figure>
  )
}
