'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, X, Award } from 'lucide-react'
import { useI18n } from '@/lib/i18n/i18n-provider'

/**
 * GcrmFloatingBadge — fixed floating badge showing the GCRM partnership
 * visible on all pages. Clickable to open GCRM website.
 *
 * Features:
 *  - Fixed position bottom-right
 *  - Pulsing gold glow animation
 *  - Expandable on hover (shows tagline + "Visit site" CTA)
 *  - Dismissible (X button) with localStorage persistence
 */
export function GcrmFloatingBadge() {
  const { t } = useI18n()
  const [dismissed, setDismissed] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  // Show badge after a short delay + check localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = window.localStorage.getItem('gcrm-badge-dismissed')
        if (stored !== 'true') {
          // Use requestAnimationFrame to defer state update outside of effect
          requestAnimationFrame(() => setVisible(true))
        }
      } catch {
        requestAnimationFrame(() => setVisible(true))
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDismissed(true)
    try {
      window.localStorage.setItem('gcrm-badge-dismissed', 'true')
    } catch {
      /* no-op */
    }
  }

  if (!visible || dismissed) return null

  return (
    <AnimatePresence>
      <motion.a
        href="https://gcrmaster.org/"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 50 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-2xl border border-[#d4af37]/40 bg-gradient-to-r from-[#0a194d]/95 to-[#162e6e]/95 p-3 backdrop-blur-xl shadow-deep transition-all hover:border-[#d4af37]/70 hover:shadow-gold"
        aria-label="GCRM — Official Partner. Visit website."
      >
        {/* Pulsing glow halo */}
        <span className="pointer-events-none absolute inset-0 rounded-2xl">
          <span className="absolute inset-0 rounded-2xl animate-pulse-gold opacity-50" />
        </span>

        {/* Logo */}
        <div className="relative h-12 w-12 shrink-0">
          <Image
            src="/partner-gcrm-badge.png"
            alt="GCRM — Official Partner Logo"
            fill
            sizes="48px"
            className="object-contain"
            unoptimized
          />
        </div>

        {/* Expanded content (visible on hover) */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex flex-col overflow-hidden"
            >
              <span className="flex items-center gap-1 font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
                <Award className="h-2.5 w-2.5" />
                {t.footer.gcrmBadge}
              </span>
              <span className="flex items-center gap-1 font-display text-sm font-semibold text-[#f4e9c9]">
                GCRM Master
                <ExternalLink className="h-3 w-3 text-[#d4af37]/70" />
              </span>
              <span className="text-[9px] text-[#94a3b8]">gcrmaster.org</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dismiss button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#0a194d] text-[#94a3b8] transition-colors hover:border-[#d4af37] hover:text-[#d4af37]"
          aria-label="Dismiss GCRM badge"
        >
          <X className="h-3 w-3" />
        </button>
      </motion.a>
    </AnimatePresence>
  )
}
