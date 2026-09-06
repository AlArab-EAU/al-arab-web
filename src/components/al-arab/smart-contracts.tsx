'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Copy, Check, ShieldCheck, FileCode } from 'lucide-react'
import { useState } from 'react'
import { useI18n } from '@/lib/i18n/i18n-provider'

/**
 * SmartContracts — displays verified smart contract addresses
 * on Polygon, BSC, and Ethereum with copy-to-clipboard functionality.
 *
 * Design: premium glass cards with network-specific accent colors,
 * gold borders, and hover effects.
 */
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
            {ct.eyebrow}
          </span>
        </div>
        <h3 className="font-display text-2xl font-medium text-[#f4e9c9] md:text-3xl">
          {ct.title}
          <br />
          <span className="text-gradient-gold">{ct.titleHighlight}</span>
        </h3>
        <p className="max-w-2xl text-sm leading-relaxed text-[#94a3b8]">
          {ct.description}
        </p>
      </div>

      {/* Contract cards */}
      <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3">
        {ct.networks.map((network, i) => (
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

            {/* Network header */}
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
              <FileCode className="h-4 w-4 text-[#94a3b8]/50" />
            </div>

            {/* Explorer badge */}
            <div className="flex items-center gap-1.5">
              <span
                className="rounded-full border px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                style={{
                  color: network.color,
                  borderColor: `${network.color}40`,
                  backgroundColor: `${network.color}10`,
                }}
              >
                {network.explorer}
              </span>
            </div>

            {/* Contract address */}
            <div className="rounded-lg border border-[#d4af37]/15 bg-[#0f0f1a]/80 p-3">
              <p className="mb-1 text-[9px] uppercase tracking-wider text-[#5d7ba8]">
                Contract Address
              </p>
              <p className="font-mono text-[11px] leading-relaxed break-all text-[#94a3b8]">
                {network.address}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <a
                href={network.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#d4af37]/30 bg-[#d4af37]/8 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#d4af37] transition-all hover:bg-[#d4af37]/15"
              >
                <ExternalLink className="h-3 w-3" />
                {ct.viewOn} {network.explorer}
              </a>
              <button
                onClick={() => handleCopy(network.address, i)}
                className="flex items-center justify-center rounded-lg border border-[#94a3b8]/30 bg-[#94a3b8]/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8] transition-all hover:border-[#d4af37]/40 hover:text-[#d4af37]"
                aria-label={ct.copyAddress}
              >
                {copiedIdx === i ? (
                  <>
                    <Check className="h-3 w-3 text-[#d4af37]" />
                    <span className="ml-1 text-[#d4af37]">{ct.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span className="ml-1">{ct.copyAddress}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/30 to-transparent" />
    </motion.div>
  )
}
