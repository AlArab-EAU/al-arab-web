'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Handshake,
  Map,
  Building2,
  Mail,
  Phone,
  Send,
  CheckCircle2,
} from 'lucide-react'
import { Section, SectionHeading } from '../section'
import { useI18n } from '@/lib/i18n/i18n-provider'

const OPPORTUNITY_ICONS = [Handshake, Map, Building2]

export function InvestorsSection() {
  const { t } = useI18n()
  const it = t.investors

  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    interest: it.interestOptions[0],
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setForm({
      name: '',
      company: '',
      email: '',
      interest: it.interestOptions[0],
      message: '',
    })
  }

  return (
    <Section id="investors">
      <SectionHeading
        eyebrow={it.eyebrow}
        arabic={it.arabic}
        title={
          <>
            {it.title}
            <br />
            <span className="text-gradient-gold">{it.titleHighlight}</span>
          </>
        }
        description={it.description}
      />

      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
        {it.opportunities.map((o, i) => {
          const Icon = OPPORTUNITY_ICONS[i] ?? Handshake
          return (
            <motion.article
              key={o.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-[#c9a85c]/22 glass p-7 transition-all hover:-translate-y-1 hover:border-[#c9a85c]/45 hover:shadow-gold"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#c9a85c]/30 bg-[#c9a85c]/8">
                <Icon className="h-6 w-6 text-[#d4af37]" />
              </div>
              <div className="mt-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-medium text-[#f4e9c9]">
                    {o.title}
                  </h3>
                  <span className="font-arabic-serif text-sm text-[#c9a85c]/70">
                    {o.arabic}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#6a8db0]">
                  {o.description}
                </p>
              </div>
            </motion.article>
          )
        })}
      </div>

      {/* Contact form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-12 overflow-hidden rounded-2xl border border-[#c9a85c]/22 glass-strong p-8 md:p-12"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-display text-3xl font-medium text-[#f4e9c9]">
              {it.formTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#6a8db0]">
              {it.formDescription}
            </p>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#c9a85c]/30 bg-[#c9a85c]/8">
                  <Mail className="h-4 w-4 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#0d4a78]">
                    {it.emailLabel}
                  </p>
                  <p className="text-sm text-[#f4e9c9]">{it.emailValue}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#c9a85c]/30 bg-[#c9a85c]/8">
                  <Phone className="h-4 w-4 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#0d4a78]">
                    {it.irLabel}
                  </p>
                  <p className="text-sm text-[#f4e9c9]">{it.irValue}</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9b88a]">
                  {it.fields.name}
                </span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-lg border border-[#c9a85c]/25 bg-[#04101e]/60 px-4 py-3 text-sm text-[#f4e9c9] outline-none transition-colors focus:border-[#d4af37]"
                  placeholder={it.fields.namePlaceholder}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9b88a]">
                  {it.fields.company}
                </span>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="rounded-lg border border-[#c9a85c]/25 bg-[#04101e]/60 px-4 py-3 text-sm text-[#f4e9c9] outline-none transition-colors focus:border-[#d4af37]"
                  placeholder={it.fields.companyPlaceholder}
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9b88a]">
                {it.fields.email}
              </span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-lg border border-[#c9a85c]/25 bg-[#04101e]/60 px-4 py-3 text-sm text-[#f4e9c9] outline-none transition-colors focus:border-[#d4af37]"
                placeholder={it.fields.emailPlaceholder}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9b88a]">
                {it.fields.interest}
              </span>
              <select
                value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })}
                className="rounded-lg border border-[#c9a85c]/25 bg-[#04101e]/60 px-4 py-3 text-sm text-[#f4e9c9] outline-none transition-colors focus:border-[#d4af37]"
              >
                {it.interestOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9b88a]">
                {it.fields.message}
              </span>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="resize-none rounded-lg border border-[#c9a85c]/25 bg-[#04101e]/60 px-4 py-3 text-sm text-[#f4e9c9] outline-none transition-colors focus:border-[#d4af37]"
                placeholder={it.fields.messagePlaceholder}
              />
            </label>
            <button
              type="submit"
              className="group relative mt-2 flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#d4af37] via-[#c9a85c] to-[#8a6f2e] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#030a14] transition-all hover:scale-[1.01]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-full" />
              <Send className="h-4 w-4" />
              {it.submit}
            </button>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-lg border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-3 text-xs text-[#d4af37]"
              >
                <CheckCircle2 className="h-4 w-4" />
                {it.success}
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </Section>
  )
}
