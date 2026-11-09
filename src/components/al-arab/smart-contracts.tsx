'use client'

import { motion } from 'framer-motion'
import {
  ShieldCheck,
  TrendingUp,
  RefreshCw,
  Loader2,
  ArrowUpRight,
  Layers,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n/i18n-provider'

type Status = 'available' | 'restructuring' | 'negotiating'

interface NetworkStatus {
  name: string
  nameArabic: string
  token: string
  color: string
  icon: string
  explorer: string
  url: string
  status: Status
  order: number
}

const NETWORKS: NetworkStatus[] = [
  {
    name: 'AlArab Polygon',
    nameArabic: 'العرب بوليجون',
    token: 'Polygon PoS',
    color: '#8247E5',
    icon: '⬣',
    explorer: 'PolygonScan',
    url: '#',
    status: 'restructuring',
    order: 1,
  },
  {
    name: 'AlArab Ethereum',
    nameArabic: 'العرب إيثيريوم',
    token: 'ERC-20',
    color: '#627EEA',
    icon: 'Ξ',
    explorer: 'Etherscan',
    url: '#',
    status: 'restructuring',
    order: 2,
  },
  {
    name: 'AlArab BNB',
    nameArabic: 'العرب BNB',
    token: 'BEP-20',
    color: '#F3BA2F',
    icon: '◆',
    explorer: 'BscScan',
    url: '#',
    status: 'negotiating',
    order: 3,
  },
]

const STATUS_CONFIG: Record<
  Status,
  {
    color: string
    bgColor: string
    borderColor: string
    glowColor: string
    icon: typeof TrendingUp
    pulse?: boolean
  }
> = {
  available: {
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.10)',
    borderColor: 'rgba(16,185,129,0.40)',
    glowColor: 'rgba(16,185,129,0.20)',
    icon: TrendingUp,
  },
  restructuring: {
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.10)',
    borderColor: 'rgba(245,158,11,0.40)',
    glowColor: 'rgba(245,158,11,0.18)',
    icon: RefreshCw,
    pulse: true,
  },
  negotiating: {
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.10)',
    borderColor: 'rgba(139,92,246,0.40)',
    glowColor: 'rgba(139,92,246,0.18)',
    icon: Loader2,
    pulse: true,
  },
}

export function SmartContracts() {
  const { t } = useI18n()
  const ct = t.contracts

  const statusLabels: Record<Status, string> = {
    available: ct?.statusAvailable ?? 'Active',
    restructuring: ct?.statusRestructuring ?? 'Under restructuring',
    negotiating: ct?.statusNegotiating ?? 'In negotiations',
  }

  const networkNote = (network: NetworkStatus): string => {
    switch (network.status) {
      case 'available':
        return ct?.polygonNote ?? 'Active and verified contract.'
      case 'restructuring':
        return ct?.restructuringNote ?? 'Contract under restructuring.'
      case 'negotiating':
        return ct?.lbankNote ?? 'Entering negotiations with Lbank exchange.'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#1a1a2e]/80 via-[#0f0f1a]/80 to-[#1a1a2e]/80 p-6 backdrop-blur-xl md:p-10"
    >
      {/* Gold top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)' }}
      />

      {/* Header */}
      <div className="relative mb-8 flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#d4af37]" />
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            {ct?.eyebrow ?? 'Token Status'}
          </span>
        </div>
        {/* Title — white with optional gold highlight */}
        <h3 className="font-display text-2xl font-medium leading-tight md:text-3xl lg:text-4xl text-[#f4e9c9]">
          {ct?.title ?? 'Global Expansion and Multichain Integration'}
        </h3>
        {/* Optional titleHighlight (gold accent) */}
        {ct?.titleHighlight ? (
          <div className="text-gradient-gold font-display text-base font-semibold md:text-lg">
            {ct.titleHighlight}
          </div>
        ) : null}
        {/* Description in WHITE (text-[#f4e9c9] cream-white) */}
        <p className="max-w-3xl text-sm leading-relaxed text-[#f4e9c9] md:text-[15px]">
          {ct?.description ??
            'A digital ecosystem expanding across multiple blockchain networks.'}
        </p>
        {/* Additional narrative paragraphs in WHITE */}
        {ct?.paragraph2 && (
          <p className="max-w-3xl text-[13.5px] leading-relaxed text-[#cbd5e1] md:text-sm">
            {ct.paragraph2}
          </p>
        )}
        {ct?.paragraph3 && (
          <p className="max-w-3xl text-[13.5px] leading-relaxed text-[#cbd5e1] md:text-sm">
            {ct.paragraph3}
          </p>
        )}
        {ct?.paragraph4 && (
          <p className="max-w-3xl text-[13.5px] leading-relaxed text-[#cbd5e1] md:text-sm">
            {ct.paragraph4}
          </p>
        )}
      </div>

      {/* Network status cards */}
      <div className="relative grid grid-cols-1 gap-5 md:grid-cols-3">
        {NETWORKS.map((network, i) => {
          const statusCfg = STATUS_CONFIG[network.status]
          const StatusIcon = statusCfg.icon
          const note = networkNote(network)
          const isActive = network.status === 'available'
          const isNegotiating = network.status === 'negotiating'

          return (
            <motion.div
              key={network.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-xl border bg-[#0a0a0f]/70 p-6 transition-all duration-500 hover:-translate-y-1"
              style={{
                borderColor: `${network.color}40`,
              }}
            >
              {/* Network color accent bar */}
              <div
                className="absolute inset-x-0 top-0 h-1 opacity-80"
                style={{
                  background: `linear-gradient(90deg, transparent, ${network.color}, transparent)`,
                }}
              />

              {/* Status glow */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-90"
                style={{ background: `radial-gradient(circle, ${statusCfg.glowColor} 0%, transparent 70%)` }}
              />

              {/* Step number */}
              <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 font-mono text-[11px] font-semibold text-[#d4af37]/70">
                {String(network.order).padStart(2, '0')}
              </div>

              {/* Network icon + name */}
              <div className="relative mb-5 flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-bold shadow-lg"
                  style={{
                    backgroundColor: `${network.color}18`,
                    border: `1px solid ${network.color}50`,
                    color: network.color,
                    boxShadow: `0 8px 24px -8px ${network.color}40`,
                  }}
                >
                  {network.icon}
                </span>
                <div className="flex flex-col">
                  <span className="font-display text-base font-semibold text-[#f4e9c9]">
                    {network.name}
                  </span>
                  <span className="font-arabic-serif text-[11px] text-[#94a3b8]" dir="rtl">
                    {network.nameArabic}
                  </span>
                </div>
              </div>

              {/* Token standard badge */}
              <div className="mb-4 flex items-center gap-2">
                <Layers className="h-3 w-3 text-[#5d7ba8]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5d7ba8]">
                  {network.token}
                </span>
              </div>

              {/* Status badge */}
              <div
                className="mb-4 flex items-center gap-2 rounded-lg border px-3 py-2.5"
                style={{
                  borderColor: statusCfg.borderColor,
                  backgroundColor: statusCfg.bgColor,
                }}
              >
                <StatusIcon
                  className={`h-3.5 w-3.5 ${statusCfg.pulse ? 'animate-spin' : ''}`}
                  style={{ color: statusCfg.color }}
                />
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: statusCfg.color }}
                >
                  {statusLabels[network.status]}
                </span>
                {isNegotiating && (
                  <span
                    className="ml-auto rounded-md border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                    style={{
                      color: statusCfg.color,
                      borderColor: statusCfg.borderColor,
                      backgroundColor: statusCfg.bgColor,
                    }}
                  >
                    Lbank
                  </span>
                )}
              </div>

              {/* Status description note */}
              <p className="mb-5 flex-1 text-[12.5px] leading-relaxed text-[#cbd5e1]">
                {note}
              </p>

              {/* Action */}
              <div className="mt-auto">
                {isActive ? (
                  <a
                    href={network.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#10b981]/30 bg-[#10b981]/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#10b981] transition-all hover:bg-[#10b981]/18"
                  >
                    <span>{ct?.viewOn ?? 'View on'} {network.explorer}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <div className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#d4af37]/20 bg-[#d4af37]/5 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d4af37]/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]/60" />
                    <span>{statusLabels[network.status]}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/30 to-transparent" />
    </motion.div>
  )
}
