'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Sparkles, Play, Star } from 'lucide-react'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { ParticleField } from '../particle-field'
import { YouTubeCinematic } from '../youtube-cinematic'
import { SpinningCoin } from '../spinning-coin'
import { useI18n } from '@/lib/i18n/i18n-provider'

/**
 * HeroFeaturedVideo — special cinematic presentation of the main featured video.
 *
 * Displays the video b6ffAuBYf8g with:
 *  - Full-width cinematic showcase (max-w-6xl)
 *  - Decorative gold corner accents (4 corners)
 *  - Glow halo behind the video
 *  - "Featured Presentation" badge with star icon
 *  - Title overlay "Experience the AlArab Universe"
 *  - Subtitle below
 *  - Larger play button with pulse animation
 */
function HeroFeaturedVideo() {
  const { t } = useI18n()
  const [playing, setPlaying] = useState(false)
  const videoId = 'b6ffAuBYf8g'
  const thumb = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-8 w-full max-w-6xl"
    >
      {/* Glow halo behind video */}
      <div
        className="pointer-events-none absolute -inset-8 rounded-3xl blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(212,175,55,0.25) 0%, rgba(37,99,235,0.10) 50%, transparent 70%)',
        }}
      />

      {/* Decorative gold corner accents */}
      <div className="pointer-events-none absolute -left-3 -top-3 h-12 w-12 border-l-2 border-t-2 border-[#d4af37]/60 rounded-tl-xl" />
      <div className="pointer-events-none absolute -right-3 -top-3 h-12 w-12 border-r-2 border-t-2 border-[#d4af37]/60 rounded-tr-xl" />
      <div className="pointer-events-none absolute -left-3 -bottom-3 h-12 w-12 border-l-2 border-b-2 border-[#d4af37]/60 rounded-bl-xl" />
      <div className="pointer-events-none absolute -right-3 -bottom-3 h-12 w-12 border-r-2 border-b-2 border-[#d4af37]/60 rounded-br-xl" />

      {/* Featured badge */}
      <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full border border-[#d4af37]/50 bg-gradient-to-r from-[#0f0f1a] to-[#162e6e] px-5 py-2 shadow-gold">
          <Star className="h-3.5 w-3.5 fill-[#d4af37] text-[#d4af37]" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            {t.hero.featuredBadge}
          </span>
          <Star className="h-3.5 w-3.5 fill-[#d4af37] text-[#d4af37]" />
        </div>
      </div>

      {/* Video container with cinematic treatment */}
      <div className="relative overflow-hidden rounded-2xl border border-[#d4af37]/40 shadow-deep">
        <div className="relative aspect-video overflow-hidden">
          {!playing ? (
            <>
              {/* Thumbnail */}
              <img
                src={thumb}
                alt={t.hero.featuredVideoTitle}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="eager"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
                }}
              />

              {/* Cinematic gradient overlays — stronger for title readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f1a]/60 via-transparent to-[#0f0f1a]/60" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/70 to-transparent" />

              {/* Center play button — larger and more prominent */}
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play: ${t.hero.featuredVideoTitle}`}
                className="group absolute inset-0 flex items-center justify-center"
              >
                <span className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#d4af37]/60 bg-[#0f0f1a]/50 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-[#d4af37]">
                  <span className="absolute inset-0 rounded-full animate-pulse-gold" />
                  <Play className="ml-1.5 h-9 w-9 fill-[#d4af37] text-[#d4af37]" />
                </span>
              </button>

              {/* Title overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2 }}
                >
                  <h3 className="font-display text-2xl font-medium text-[#f4e9c9] md:text-3xl text-glow-soft">
                    {t.hero.featuredVideoTitle}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#94a3b8]">
                    {t.hero.featuredVideoSubtitle}
                  </p>
                </motion.div>
              </div>

              {/* Top-right official badge */}
              <div className="absolute right-5 top-5 flex items-center gap-2">
                <span className="rounded-full border border-[#d4af37]/40 bg-[#0f0f1a]/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d4af37] backdrop-blur-md">
                  {t.hero.officialVideo}
                </span>
              </div>
            </>
          ) : (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={t.hero.featuredVideoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="h-full w-full border-0"
            />
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
    </motion.div>
  )
}

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
      className="relative w-full overflow-hidden"
    >
      {/* Particle layer */}
      <ParticleField density={120} />

      {/* Sheikh Zayed portrait — foreground element on the right side */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute right-0 top-16 z-20 hidden md:block lg:right-[3%]"
      >
        {/* Purple glow behind the Sheikh */}
        <div
          className="absolute inset-0 -z-10 blur-[80px]"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(139,92,246,0.25) 0%, transparent 70%)',
          }}
        />
        <div className="relative h-[500px] w-[400px] lg:h-[600px] lg:w-[480px]">
          <Image
            src="/sheikh-zayed-clean.png"
            alt="Sheikh Zayed — Visionary Leader"
            fill
            priority
            loading="eager"
            sizes="(max-width: 1024px) 400px, 480px"
            className="object-contain object-top"
            unoptimized
          />
          {/* Gradient blend on left edge */}
          <div
            className="absolute inset-y-0 left-0 w-20"
            style={{
              background:
                'linear-gradient(to right, rgba(10,10,15,0.8) 0%, transparent 100%)',
            }}
          />
        </div>
      </motion.div>

      {/* Mobile version — smaller, centered bottom */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 -translate-x-1/2 md:hidden"
      >
        <div className="relative h-[280px] w-[200px]">
          <Image
            src="/sheikh-zayed-clean.png"
            alt="Sheikh Zayed — Visionary Leader"
            fill
            priority
            loading="eager"
            sizes="200px"
            className="object-contain object-bottom"
            unoptimized
          />
        </div>
      </motion.div>

      {/* Decorative ring */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block">
        <div className="h-[520px] w-[520px] rounded-full border border-[#c9a85c]/15 animate-spin-slower" />
        <div className="absolute inset-12 rounded-full border border-[#c9a85c]/10 animate-spin-slow" />
        <div className="absolute inset-32 rounded-full border border-[#c9a85c]/8" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-5 pt-20 pb-8 text-center md:px-8">
        {/* H1 for SEO / sr-only */}
        <h1 className="sr-only">AL ARAB — The Digital Future of the Arab World</h1>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-5 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c9a85c]" />
          <span className="font-arabic-serif text-base text-[#d4af37]">
            {t.hero.arabicEyebrow}
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c9a85c]" />
        </motion.div>

        {/* Official Logo only — coin moved to separate position */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[10vh] w-[78vw] max-w-[620px] md:h-[14vh]"
        >
          <Image
            src="/alarab-logo-new-clean.png"
            alt="AL ARAB — Official Logo"
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 78vw, 620px"
            className="object-contain drop-shadow-[0_8px_40px_rgba(212,175,55,0.55)]"
          />
        </motion.div>

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
          className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-[#c9b88a] md:text-base"
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
          className="mt-6 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#vision"
            className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#d4af37] via-[#c9a85c] to-[#8a6f2e] px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#0f0f1a] shadow-gold transition-all hover:scale-[1.02]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-full" />
            <Sparkles className="h-4 w-4" />
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#metaverse"
            className="rounded-full border border-[#c9a85c]/40 bg-[#0f0f1a]/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#f4e9c9] backdrop-blur-md transition-all hover:border-[#d4af37] hover:bg-[#c9a85c]/10"
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>

        {/* SPECIAL FEATURED VIDEO — b6ffAuBYf8g with cinematic treatment */}
        <HeroFeaturedVideo />
      </div>

      {/* Spinning coin — positioned in bottom-left corner, separated from content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.4, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-8 left-4 z-15 hidden md:block lg:left-8"
      >
        {/* Purple glow behind coin */}
        <div
          className="absolute inset-0 -z-10 blur-[60px]"
          style={{
            background:
              'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(139,92,246,0.15) 50%, transparent 70%)',
          }}
        />
        <SpinningCoin
          src="/alarab-coin-4-clean.png"
          alt="AL ARAB — Concept token (3D spinning)"
          size={140}
          spinDuration={18}
          glow={0.6}
        />
      </motion.div>

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
