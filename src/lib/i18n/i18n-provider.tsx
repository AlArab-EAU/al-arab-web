'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import {
  Locale,
  LANGUAGES,
  DEFAULT_LOCALE,
  getTranslation,
  getLanguageMeta,
} from './translations'

interface I18nContextValue {
  locale: Locale
  dir: 'ltr' | 'rtl'
  t: ReturnType<typeof getTranslation>
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

const STORAGE_KEY = 'alarab-locale'

/**
 * Detect initial locale on the client (localStorage → browser language → default).
 * Runs once via useState lazy initializer so we never call setState inside an effect.
 */
function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored && LANGUAGES.some((l) => l.code === stored)) return stored
  } catch {
    /* no-op */
  }
  const nav = navigator.language.slice(0, 2).toLowerCase()
  if (LANGUAGES.some((l) => l.code === nav)) return nav as Locale
  return DEFAULT_LOCALE
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Lazy init — runs synchronously on first client render only
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  // On mount, swap to detected locale (only once).
  // This is an intentional post-hydration sync — we cannot read localStorage
  // during SSR, so we render with DEFAULT_LOCALE on the server and reconcile
  // after mount. The lint rule is disabled here for that reason.
  useEffect(() => {
    const detected = detectInitialLocale()
    if (detected !== DEFAULT_LOCALE) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(detected)
    }
  }, [])

  // Apply direction + lang to <html> whenever locale changes
  useEffect(() => {
    const meta = getLanguageMeta(locale)
    document.documentElement.lang = locale
    document.documentElement.dir = meta.dir
    if (meta.dir === 'rtl') {
      document.body.classList.add('rtl-active')
    } else {
      document.body.classList.remove('rtl-active')
    }
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* no-op */
    }
  }, [])

  const value: I18nContextValue = {
    locale,
    dir: getLanguageMeta(locale).dir,
    t: getTranslation(locale),
    setLocale,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return ctx
}
