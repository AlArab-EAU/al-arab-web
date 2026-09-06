'use client'

import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Play, Star, Volume2, VolumeX } from 'lucide-react'
import { useI18n } from '@/lib/i18n/i18n-provider'

/**
 * BinanceVideo — special cinematic presentation of the AlArab x Binance
 * partnership video.
 *
 * Features:
 *  - Auto-looping muted video (plays on scroll into view)
 *  - AlArab logo overlay at top
 *  - "Strategic Partnership" badge with stars
 *  - Click to enable sound
 *  - Gold corner accents
 *  - Glow halo behind video
 */
export function BinanceVideo() {
  const { t } = useI18n()
  const vg = t.videoGallery
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)

  // Auto-play when scrolled into view
  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              /* autoplay blocked — user needs to click */
            })
          }
        })
      },
      { threshold: 0.3 },
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setMuted(videoRef.current.muted)
    }
  }

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.play()
      setMuted(false)
      setPlaying(true)
    }
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-16 w-full max-w-5xl"
    >
      {/* Glow halo behind video */}
      <div
        className="pointer-events-none absolute -inset-8 rounded-3xl blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(212,175,55,0.20) 0%, rgba(240,185,11,0.12) 40%, transparent 70%)',
        }}
      />

      {/* Gold corner accents */}
      <div className="pointer-events-none absolute -left-3 -top-3 h-14 w-14 border-l-2 border-t-2 border-[#d4af37]/60 rounded-tl-xl" />
      <div className="pointer-events-none absolute -right-3 -top-3 h-14 w-14 border-r-2 border-t-2 border-[#d4af37]/60 rounded-tr-xl" />
      <div className="pointer-events-none absolute -left-3 -bottom-3 h-14 w-14 border-l-2 border-b-2 border-[#d4af37]/60 rounded-bl-xl" />
      <div className="pointer-events-none absolute -right-3 -bottom-3 h-14 w-14 border-r-2 border-b-2 border-[#d4af37]/60 rounded-br-xl" />

      {/* Strategic Partnership badge */}
      <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full border border-[#d4af37]/50 bg-gradient-to-r from-[#0f0f1a] via-[#162e6e] to-[#0f0f1a] px-6 py-2 shadow-gold">
          <Star className="h-4 w-4 fill-[#d4af37] text-[#d4af37]" />
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            {vg.binanceBadge}
          </span>
          <Star className="h-4 w-4 fill-[#d4af37] text-[#d4af37]" />
        </div>
      </div>

      {/* Video container */}
      <div className="relative overflow-hidden rounded-2xl border border-[#d4af37]/40 shadow-deep">
        {/* AlArab logo overlay — top center */}
        <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2">
          <div className="relative h-12 w-32 md:h-14 md:w-40">
            <Image
              src="/alarab-logo-new-clean.png"
              alt="AL ARAB — Official Logo"
              fill
              sizes="160px"
              className="object-contain drop-shadow-[0_4px_20px_rgba(212,175,55,0.6)]"
            />
          </div>
        </div>

        {/* Video element */}
        <div className="relative aspect-video overflow-hidden bg-[#0f0f1a]">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/alarab-binance.mp4" type="video/mp4" />
            <source src="/videos/alarab-binance.mov" type="video/quicktime" />
          </video>

          {/* Gradient overlay for readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-transparent to-[#0f0f1a]/40" />

          {/* Center play button (shows until user clicks) */}
          {!playing && (
            <button
              type="button"
              onClick={handlePlayClick}
              aria-label="Play AlArab Binance video with sound"
              className="group absolute inset-0 flex items-center justify-center"
            >
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#d4af37]/60 bg-[#0f0f1a]/50 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-[#d4af37]">
                <span className="absolute inset-0 rounded-full animate-pulse-gold" />
                <Play className="ml-1.5 h-8 w-8 fill-[#d4af37] text-[#d4af37]" />
              </span>
            </button>
          )}

          {/* Mute toggle button */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#0f0f1a]/70 backdrop-blur-md transition-all hover:border-[#d4af37]/60"
          >
            {muted ? (
              <VolumeX className="h-4 w-4 text-[#94a3b8]" />
            ) : (
              <Volume2 className="h-4 w-4 text-[#d4af37]" />
            )}
          </button>

          {/* Title overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="font-display text-2xl font-medium text-[#f4e9c9] md:text-3xl text-glow-soft">
                {vg.binanceTitle}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#94a3b8]">
                {vg.binanceSubtitle}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
      </div>
    </motion.div>
  )
}
