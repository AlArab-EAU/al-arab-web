'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, X } from 'lucide-react'

interface YouTubeCinematicProps {
  videoId: string
  title: string
  description?: string
  /** Optional custom poster image (YouTube thumbnail by default) */
  poster?: string
  /** Text shown in the "Official Video" badge — defaults to "Official Video" */
  officialBadge?: string
  variant?: 'full' | 'card'
}

/**
 * Cinematic YouTube embed:
 * - Lazy: shows poster + play button until clicked
 * - Loads YouTube iframe on demand (better perf + no third-party JS until needed)
 * - Optional expanded modal for full view
 */
export function YouTubeCinematic({
  videoId,
  title,
  description,
  poster,
  officialBadge = 'Official Video',
  variant = 'card',
}: YouTubeCinematicProps) {
  const [playing, setPlaying] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const thumb = poster || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`

  const thumbRef = useRef<HTMLImageElement | null>(null)
  useEffect(() => {
    if (!thumbRef.current) return
    if (thumbRef.current.complete) return
    // Test fallback to hqdefault if maxres not available
    thumbRef.current.onerror = () => {
      if (thumbRef.current) {
        thumbRef.current.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      }
    }
  }, [videoId])

  const handlePlay = () => {
    setPlaying(true)
    if (variant === 'full') setExpanded(true)
  }

  const embed = (autoplay = true) => (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&playsinline=1`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      loading="lazy"
      className="h-full w-full border-0"
    />
  )

  const card = (
    <div className="group relative overflow-hidden rounded-2xl border border-[#c9a85c]/25 glass shadow-deep">
      <div className="relative aspect-video overflow-hidden">
        {!playing ? (
          <>
            <img
              ref={thumbRef}
              src={thumb}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e5c] via-[#0a2e5c]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e5c]/60 via-transparent to-[#0a2e5c]/60" />
            <button
              type="button"
              onClick={handlePlay}
              aria-label={`Reproducir: ${title}`}
              className="group/btn absolute inset-0 flex items-center justify-center"
            >
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#c9a85c]/60 bg-[#0a2e5c]/40 backdrop-blur-md transition-all duration-500 group-hover/btn:scale-110 group-hover/btn:border-[#d4af37]">
                <span className="absolute inset-0 rounded-full animate-pulse-gold" />
                <Play className="ml-1 h-7 w-7 fill-[#d4af37] text-[#d4af37]" />
              </span>
            </button>
            <div className="absolute left-5 top-5 flex items-center gap-2">
              <span className="rounded-full border border-[#c9a85c]/40 bg-[#0a2e5c]/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                {officialBadge}
              </span>
            </div>
          </>
        ) : (
          embed()
        )}
      </div>
      {(description || title) && (
        <div className="flex flex-col gap-2 p-6">
          <h3 className="font-display text-xl font-medium text-[#f4e9c9]">
            {title}
          </h3>
          {description && (
            <p className="text-sm leading-relaxed text-[#8a96a8]">{description}</p>
          )}
        </div>
      )}
    </div>
  )

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {card}
      </motion.div>

      {expanded && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-10"
          onClick={() => setExpanded(false)}
        >
          <div className="absolute inset-0 bg-[#0a2e5c]/95 backdrop-blur-xl" />
          <button
            className="absolute right-6 top-6 z-10 rounded-full border border-[#c9a85c]/40 bg-[#0a2e5c]/70 p-3 text-[#f4e9c9] transition hover:bg-[#c9a85c]/15"
            onClick={() => setExpanded(false)}
            aria-label="Cerrar video"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative z-0 aspect-video w-full max-w-5xl overflow-hidden rounded-xl border border-[#c9a85c]/40 shadow-deep">
            {embed()}
          </div>
        </div>
      )}
    </>
  )
}
