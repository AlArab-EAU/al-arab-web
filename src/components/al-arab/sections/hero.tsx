'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'
import { ParticleField } from '../particle-field'
import { YouTubeCinematic } from '../youtube-cinematic'
import { SpinningCoin } from '../spinning-coin'
import { useI18n } from '@/lib/i18n/i18n-provider'

export function HeroSection() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Particle layer */}
      <ParticleField density={120} />

      {/* Decorative ring */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block">
        <div className="h-[520px] w-[520px] rounded-full border border-[#c9a85c]/15 animate-spin-slower" />
        <div className="absolute inset-12 rounded-full border border-[#c9a85c]/10 animate-spin-slow" />
        <div className="absolute inset-32 rounded-full border border-[#c9a85c]/8" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-5 pt-24 text-center md:px-8">
        {/* H1 for SEO / sr-only */}
        <h1 className="sr-only">AL ARAB — The Digital Future of the Arab World</h1>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c9a85c]" />
          <span className="font-arabic-serif text-base text-[#d4af37]">
            {t.hero.arabicEyebrow}
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c9a85c]" />
        </motion.div>

        {/* Official Logo + Spinning Coin — logo is now MUCH BIGGER (90% viewport width on mobile, 800px on desktop) */}
        <div className="relative flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[10vh] w-[78vw] max-w-[680px] md:h-[14vh]"
          >
            <Image
              src="/alarab-logo-new-clean.png"
              alt="AL ARAB — Official Logo"
              fill
              priority
              loading="eager"
              sizes="(max-width: 768px) 78vw, 680px"
              className="object-contain drop-shadow-[0_8px_40px_rgba(212,175,55,0.55)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative shrink-0"
          >
            <SpinningCoin
              src="/alarab-coin-4-clean.png"
              alt="AL ARAB — Concept token (3D spinning)"
              size={260}
              spinDuration={20}
              glow={0.75}
              parallax
            />
          </motion.div>
        </div>

        {/* Title (subtle Arabic display under official logo) */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="font-arabic-serif text-3xl text-[#d4af37]/80 md:text-5xl"
          >
            {t.hero.titleArabic}
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          style={{ y: subtitleY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-10 max-w-2xl text-base font-light leading-relaxed text-[#c9b88a] md:text-xl"
        >
          <span className="font-display italic text-[#f4e9c9]">
            The Digital Future of the Arab World
          </span>{' '}
          — {t.hero.subtitle}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#vision"
            className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#d4af37] via-[#c9a85c] to-[#8a6f2e] px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#0a194d] shadow-gold transition-all hover:scale-[1.02]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-full" />
            <Sparkles className="h-4 w-4" />
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#metaverse"
            className="rounded-full border border-[#c9a85c]/40 bg-[#0a194d]/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#f4e9c9] backdrop-blur-md transition-all hover:border-[#d4af37] hover:bg-[#c9a85c]/10"
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>

        {/* Hero video */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 w-full max-w-4xl"
        >
          <YouTubeCinematic
            videoId="5L6tvrXrUWM"
            title={t.hero.video1Title}
            description={t.hero.video1Description}
            officialBadge={t.hero.officialVideo}
          />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2"
        style={{ opacity: titleOpacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#94a3b8]">
            {t.hero.scroll}
          </span>
          <ChevronDown className="h-4 w-4 text-[#c9a85c]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
