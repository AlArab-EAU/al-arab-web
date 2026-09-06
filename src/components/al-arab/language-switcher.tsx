'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { LANGUAGES } from '@/lib/i18n/translations'
import { useI18n } from '@/lib/i18n/i18n-provider'

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0]

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Cambiar idioma"
        className="group flex items-center gap-2 rounded-full border border-[#c9a85c]/30 bg-[#162e6e]/60 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c9b88a] backdrop-blur-md transition-all hover:border-[#d4af37] hover:text-[#f4e9c9] hover:shadow-gold"
      >
        <Globe className="h-3.5 w-3.5 text-[#d4af37]" />
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.shortLabel}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute end-0 mt-2 w-44 overflow-hidden rounded-xl border border-[#c9a85c]/30 bg-[#162e6e]/95 p-1.5 shadow-deep backdrop-blur-xl"
            style={{
              // Place dropdown on the right edge for LTR, left for RTL
              insetInlineEnd: 0,
            }}
          >
            {LANGUAGES.map((lang) => {
              const active = lang.code === locale
              return (
                <li key={lang.code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      setLocale(lang.code)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                      active
                        ? 'bg-[#c9a85c]/15 text-[#f4e9c9]'
                        : 'text-[#c9b88a] hover:bg-[#c9a85c]/8 hover:text-[#f4e9c9]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg leading-none">{lang.flag}</span>
                      <span className="flex flex-col">
                        <span
                          className={`text-sm font-medium ${
                            lang.code === 'ar'
                              ? 'font-arabic-serif'
                              : 'font-sans'
                          }`}
                          dir={lang.dir}
                        >
                          {lang.label}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.22em] text-[#0f0f1a]">
                          {lang.shortLabel} · {lang.dir.toUpperCase()}
                        </span>
                      </span>
                    </span>
                    {active && (
                      <Check className="h-4 w-4 shrink-0 text-[#d4af37]" />
                    )}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
