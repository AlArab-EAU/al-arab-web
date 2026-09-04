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

const OPPORTUNITIES = [
  {
    icon: Handshake,
    title: 'Partnerships estratégicos',
    arabic: 'شراكات استراتيجية',
    description:
      'Marcas, estudios y plataformas que quieran establecer presencia a largo plazo dentro del ecosistema AlArab con un rol activo en su desarrollo.',
  },
  {
    icon: Map,
    title: 'Land y espacios digitales',
    arabic: 'الأراضي الرقمية',
    description:
      'Adquisición y desarrollo de landplots digitales dentro de los distritos del metaverso: showrooms, galerías, escenarios y sedes corporativas.',
  },
  {
    icon: Building2,
    title: 'Oportunidades corporativas',
    arabic: 'الفرص المؤسسية',
    description:
      'Programas de cooperación corporativa para empresas que quieran integrar sus servicios en la capa de aplicación del ecosistema AlArab.',
  },
]

export function InvestorsSection() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    interest: 'Partnership',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // No backend persistence — surface a confirmation only
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setForm({ name: '', company: '', email: '', interest: 'Partnership', message: '' })
  }

  return (
    <Section id="investors">
      <SectionHeading
        eyebrow="Empresas & Inversores"
        arabic="الشركات والمستثمرون"
        title={
          <>
            Construye el futuro
            <br />
            <span className="text-gradient-gold">junto a AlArab</span>
          </>
        }
        description="Tres vías de participación para empresas, marcas e inversores que quieran formar parte del ecosistema. Cada vía tiene un proceso de evaluación dedicado y un equipo de partnerships como punto de contacto."
      />

      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
        {OPPORTUNITIES.map((o, i) => (
          <motion.article
            key={o.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-[#c9a85c]/22 glass p-7 transition-all hover:-translate-y-1 hover:border-[#c9a85c]/45 hover:shadow-gold"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#c9a85c]/30 bg-[#c9a85c]/8">
              <o.icon className="h-6 w-6 text-[#d4af37]" />
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
              <p className="mt-3 text-sm leading-relaxed text-[#8a9bb8]">
                {o.description}
              </p>
            </div>
          </motion.article>
        ))}
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
              Hablemos
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#8a9bb8]">
              Cuéntanos sobre tu organización y los objetivos que persigues
              dentro del ecosistema AlArab. Un miembro del equipo de partnerships
              se pondrá en contacto para evaluar el encaje.
            </p>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#c9a85c]/30 bg-[#c9a85c]/8">
                  <Mail className="h-4 w-4 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#5d7ba8]">
                    Email
                  </p>
                  <p className="text-sm text-[#f4e9c9]">partners@alarab.ecosystem</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#c9a85c]/30 bg-[#c9a85c]/8">
                  <Phone className="h-4 w-4 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#5d7ba8]">
                    Investor relations
                  </p>
                  <p className="text-sm text-[#f4e9c9]">Disponible bajo solicitud</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9b88a]">
                  Nombre
                </span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-lg border border-[#c9a85c]/25 bg-[#0a1224]/60 px-4 py-3 text-sm text-[#f4e9c9] outline-none transition-colors focus:border-[#d4af37]"
                  placeholder="Tu nombre"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9b88a]">
                  Empresa
                </span>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="rounded-lg border border-[#c9a85c]/25 bg-[#0a1224]/60 px-4 py-3 text-sm text-[#f4e9c9] outline-none transition-colors focus:border-[#d4af37]"
                  placeholder="Tu organización"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9b88a]">
                Email
              </span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-lg border border-[#c9a85c]/25 bg-[#0a1224]/60 px-4 py-3 text-sm text-[#f4e9c9] outline-none transition-colors focus:border-[#d4af37]"
                placeholder="tucorreo@empresa.com"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9b88a]">
                Interés
              </span>
              <select
                value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })}
                className="rounded-lg border border-[#c9a85c]/25 bg-[#0a1224]/60 px-4 py-3 text-sm text-[#f4e9c9] outline-none transition-colors focus:border-[#d4af37]"
              >
                <option>Partnership</option>
                <option>Land digital</option>
                <option>Inversión</option>
                <option>Otro</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c9b88a]">
                Mensaje
              </span>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="resize-none rounded-lg border border-[#c9a85c]/25 bg-[#0a1224]/60 px-4 py-3 text-sm text-[#f4e9c9] outline-none transition-colors focus:border-[#d4af37]"
                placeholder="Cuéntanos sobre tus objetivos"
              />
            </label>
            <button
              type="submit"
              className="group relative mt-2 flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#d4af37] via-[#c9a85c] to-[#8a6f2e] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#050810] transition-all hover:scale-[1.01]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-full" />
              <Send className="h-4 w-4" />
              Enviar solicitud
            </button>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-lg border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-3 text-xs text-[#d4af37]"
              >
                <CheckCircle2 className="h-4 w-4" />
                Solicitud recibida. Te contactaremos pronto.
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </Section>
  )
}
