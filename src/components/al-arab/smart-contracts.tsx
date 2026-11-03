'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Copy, Check, ShieldCheck, TrendingUp, RefreshCw, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useI18n } from '@/lib/i18n/i18n-provider'

type Status = 'available' | 'restructuring' | 'negotiating'

interface TokenNetwork {
  name: string
  nameArabic: string
  token: string
  address: string
  url: string
  color: string
  icon: string
  explorer: string
  status: Status
}

const NETWORKS: TokenNetwork[] = [
  {
    name: 'Polygon',
    nameArabic: 'بوليجون',
    token: 'AlArab Red',
    address: '0xf5c068f28ebf91b22e52c2ecd230621879e914b8',
    url: 'https://polygonscan.com/token/0xf5c068f28ebf91b22e52c2ecd230621879e914b8',
    color: '#8247E5',
    icon: '⬣',
    explorer: 'PolygonScan',
    status: 'available',
  },
  {
    name: 'Ethereum',
    nameArabic: 'إيثيريوم',
    token: 'AlArab Red',
    address: '0x93617904A0A15063B54bd14cC595AA10f2A8e358',
    url: 'https://etherscan.io/token/0x93617904A0A15063B54bd14cC595AA10f2A8e358',
    color: '#627EEA',
    icon: 'Ξ',
    explorer: 'Etherscan',
    status: 'restructuring',
  },
  {
    name: 'BNB Chain',
    nameArabic: 'بينانس',
    token: 'AlArab Red',
    address: '0xbab2556a4db42918a2c833eb2b70fedaf7016de4',
    url: 'https://bscscan.com/address/0xbab2556a4db42918a2c833eb2b70fedaf7016de4',
    color: '#F3BA2F',
    icon: '◆',
    explorer: 'BscScan',
    status: 'negotiating',
  },
]

const STATUS_CONFIG: Record<Status, { color: string; bgColor: string; borderColor: string; icon: typeof TrendingUp; pulse?: boolean }> = {
  available: {
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.35)',
    icon: TrendingUp,
  },
  restructuring: {
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.08)',
    borderColor: 'rgba(245,158,11,0.35)',
    icon: RefreshCw,
    pulse: true,
  },
  negotiating: {
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.08)',
    borderColor: 'rgba(139,92,246,0.35)',
    icon: Loader2,
    pulse: true,
  },
}

export function SmartContracts() {
  const { t } = useI18n()
  const ct = t.contracts
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const handleCopy = async (address: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedIdx(idx)
      setTimeout(() => setCopiedIdx(null), 2000)
    } catch {
      /* clipboard not available */
    }
  }

  const statusLabels: Record<Status, string> = {
    available: ct?.statusAvailable ?? 'Available',
    restructuring: ct?.statusRestructuring ?? 'Restructuring',
    negotiating: ct?.statusNegotiating ?? 'Negotiating',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#1a1a2e]/80 via-[#0f0f1a]/80 to-[#1a1a2e]/80 p-6 backdrop-blur-xl md:p-8"
    >
      {/* Gold top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

      {/* Glow */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
      />

      {/* Header */}
      <div className="relative mb-6 flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#d4af37]" />
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            {ct?.eyebrow ?? 'Token Status'}
          </span>
        </div>
        <h3 className="font-display text-2xl font-medium text-[#f4e9c9] md:text-3xl">
          {ct?.title ?? 'AlArab Red'}
          <br />
          <span className="text-gradient-gold">{ct?.titleHighlight ?? 'Multi-chain Token'}</span>
        </h3>
        <p className="max-w-2xl text-sm leading-relaxed text-[#94a3b8]">
          {ct?.description ?? 'AlArab Red token deployment status across multiple blockchains. Each network has a different stage of development and listing.'}
        </p>
      </div>

      {/* Network cards */}
      <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3">
        {NETWORKS.map((network, i) => {
          const statusCfg = STATUS_CONFIG[network.status]
          const StatusIcon = statusCfg.icon

          return (
            <motion.div
              key={network.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex flex-col gap-3 rounded-xl border border-[#d4af37]/20 bg-[#0a0a0f]/60 p-5 transition-all hover:border-[#d4af37]/40"
            >
              {/* Network color accent bar */}
              <div
                className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl opacity-60"
                style={{ background: network.color }}
              />

              {/* Network header + status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-base font-bold"
                    style={{
                      backgroundColor: `${network.color}15`,
                      border: `1px solid ${network.color}40`,
                      color: network.color,
                    }}
                  >
                    {network.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display text-sm font-semibold text-[#f4e9c9]">
                      {network.name}
                    </span>
                    <span className="font-arabic-serif text-[10px] text-[#94a3b8]" dir="rtl">
                      {network.nameArabic}
                    </span>
                  </div>
                </div>
              </div>

              {/* Token name badge */}
              <div className="flex items-center gap-1.5">
                <span
                  className="rounded-full border px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                  style={{
                    color: network.color,
                    borderColor: `${network.color}40`,
                    backgroundColor: `${network.color}10`,
                  }}
                >
                  {network.token}
                </span>
              </div>

              {/* Status badge */}
              <div
                className="flex items-center gap-2 rounded-lg border px-3 py-2"
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
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: statusCfg.color }}
                >
                  {statusLabels[network.status]}
                </span>
                {network.status === 'negotiating' && (
                  <span className="ml-auto text-[9px] font-semibold uppercase tracking-wider text-[#8b5cf6]">
                    Lbank
                  </span>
                )}
              </div>

              {/* Contract address */}
              {network.status !== 'restructuring' ? (
                <div className="rounded-lg border border-[#d4af37]/15 bg-[#0f0f1a]/80 p-3">
                  <p className="mb-1 text-[9px] uppercase tracking-wider text-[#5d7ba8]">
                    Contract Address
                  </p>
                  <p className="font-mono text-[11px] leading-relaxed break-all text-[#94a3b8]">
                    {network.address}
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-[#f59e0b]/15 bg-[#f59e0b]/5 p-3">
                  <p className="text-[11px] leading-relaxed text-[#f59e0b]/80">
                    {ct?.restructuringNote ?? 'Contract under restructuring. New address will be published soon.'}
                  </p>
                </div>
              )}

              {/* Actions */}
              {network.status !== 'restructuring' && (
                <div className="flex items-center gap-2">
                  <a
                    href={network.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#d4af37]/30 bg-[#d4af37]/8 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#d4af37] transition-all hover:bg-[#d4af37]/15"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {ct?.viewOn ?? 'View on'} {network.explorer}
                  </a>
                  <button
                    onClick={() => handleCopy(network.address, i)}
                    className="flex items-center justify-center rounded-lg border border-[#94a3b8]/30 bg-[#94a3b8]/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8] transition-all hover:border-[#d4af37]/40 hover:text-[#d4af37]"
                    aria-label={ct?.copyAddress ?? 'Copy'}
                  >
                    {copiedIdx === i ? (
                      <>
                        <Check className="h-3 w-3 text-[#d4af37]" />
                        <span className="ml-1 text-[#d4af37]">{ct?.copied ?? 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span className="ml-1">{ct?.copyAddress ?? 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Bottom accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/30 to-transparent" />
    </motion.div>
  )
}
