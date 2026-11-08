'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, BadgeCheck, Users, Sparkles } from 'lucide-react'
import { useI18n } from '@/lib/i18n/i18n-provider'

const X_PROFILE_URL = 'https://x.com/Alarab_official'

/** Official X (formerly Twitter) brand logo */
function XLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function XProfileCard() {
  const { t } = useI18n()
  const xt = t.xProfile

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-2xl"
    >
      {/* Eyebrow above the card */}
      <div className="mb-5 flex items-center justify-center gap-2 text-center">
        <Sparkles className="h-4 w-4 text-[#d4af37]" />
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
          {xt?.eyebrow ?? 'Official on X'}
        </span>
        <Sparkles className="h-4 w-4 text-[#d4af37]" />
      </div>

      {/* The X profile preview card */}
      <motion.a
        href={X_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="group block overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#1a1a2e]/90 via-[#0f0f1a]/90 to-[#1a1a2e]/90 shadow-deep backdrop-blur-xl transition-all hover:border-[#d4af37]/60 hover:shadow-gold"
      >
        {/* Banner (1500x500, displayed at 16:9 ratio for visual harmony) */}
        <div className="relative aspect-[3/1] w-full overflow-hidden">
          <Image
            src="/alarab-x-banner-1500x500.png"
            alt="AlArab Official Coin — X Banner"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Top-right small X watermark */}
          <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-md bg-black/60 backdrop-blur-sm">
            <XLogo className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Profile section */}
        <div className="relative px-5 pb-5 pt-0 md:px-7 md:pb-7">
          {/* Profile pic — overlaps banner bottom */}
          <div className="-mt-12 mb-3 flex items-end justify-between md:-mt-14">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-4 border-[#0f0f1a] bg-[#0f0f1a] shadow-gold md:h-28 md:w-28">
              <Image
                src="/alarab-coin-profile-400x400.png"
                alt="AlArab Red commemorative coin"
                fill
                sizes="(max-width: 768px) 96px, 112px"
                className="object-cover"
              />
            </div>
            <div className="mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d4af37] transition-all group-hover:bg-[#d4af37]/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
                {xt?.followButton ?? 'Follow on X'}
                <ExternalLink className="h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Identity */}
          <div className="flex items-center gap-1.5">
            <h3 className="font-display text-lg font-semibold text-[#f4e9c9] md:text-xl">
              {xt?.displayName ?? 'AlArab'}
            </h3>
            <BadgeCheck className="h-4 w-4 fill-[#d4af37] text-[#0f0f1a]" />
          </div>
          <p className="mt-0.5 text-sm text-[#94a3b8]">@Alarab_official</p>

          {/* Bio */}
          <p className="mt-3 text-[13px] leading-relaxed text-[#cbd5e1] md:text-sm">
            {xt?.bio ?? 'The Digital Future of the Arab World — a unified ecosystem where technology, culture and innovation converge.'}
          </p>

          {/* Meta row */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#d4af37]/10 pt-4 text-[11px] text-[#94a3b8]">
            <span className="flex items-center gap-1.5">
              <Users className="h-3 w-3 text-[#d4af37]" />
              <strong className="font-semibold text-[#f4e9c9]">{xt?.followers ?? '2.4M+'}</strong>
              <span className="opacity-70">{xt?.followersLabel ?? 'Followers'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[#8b5cf6]" />
              <strong className="font-semibold text-[#f4e9c9]">{xt?.category ?? 'Cryptocurrency'}</strong>
              <span className="opacity-70">{xt?.categoryLabel ?? 'Category'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-[#10b981]">{xt?.liveLabel ?? 'Live now'}</span>
            </span>
          </div>

          {/* Footer link */}
          <div className="mt-4 flex items-center justify-between rounded-lg border border-[#d4af37]/15 bg-[#0a0a0f]/60 px-4 py-2.5">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#94a3b8]">
              {xt?.linkLabel ?? 'Visit profile'}
            </span>
            <span className="font-mono text-[11px] text-[#d4af37]">
              x.com/Alarab_official
            </span>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
      </motion.a>
    </motion.div>
  )
}
