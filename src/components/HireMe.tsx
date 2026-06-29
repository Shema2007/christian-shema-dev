import { X, Zap, Shield, Clock, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface HireMeProps {
  open: boolean
  onClose: () => void
  onContact: () => void
}

const ease = [0.22, 1, 0.36, 1]

const packages = [
  {
    icon: Zap,
    name: 'Quick Launch',
    price: '$500',
    period: 'flat rate',
    desc: 'Perfect for landing pages, portfolio sites, and simple web apps.',
    features: ['Responsive design', 'Up to 5 pages', 'Contact form', 'Deployed & live', '2 revision rounds'],
    color: '#3b82f6',
    highlight: false,
  },
  {
    icon: Shield,
    name: 'Full Product',
    price: '$1,500',
    period: 'starting at',
    desc: 'Full-stack applications with database, auth, and custom features.',
    features: ['React + Node.js stack', 'Database integration', 'User authentication', 'Admin panel', 'Unlimited revisions'],
    color: '#6366f1',
    highlight: true,
  },
  {
    icon: Clock,
    name: 'Consulting',
    price: '$50',
    period: 'per hour',
    desc: 'Code reviews, architecture planning, and hands-on technical guidance.',
    features: ['Architecture review', 'Performance audit', 'Tech stack advice', 'Pair programming', 'Flexible hours'],
    color: '#8b5cf6',
    highlight: false,
  },
]

const strengths = [
  { label: 'On-time delivery', icon: '⏱' },
  { label: 'Clean, maintainable code', icon: '🧹' },
  { label: 'Honest communication', icon: '💬' },
  { label: 'Post-launch support', icon: '🛡' },
  { label: 'Faith-driven work ethic', icon: '✝' },
  { label: 'God-honoring quality', icon: '🌟' },
]

export default function HireMe({ open, onClose, onContact }: HireMeProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', overflowY: 'auto', padding: '2rem 1rem' }}
          onClick={e => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease }}
            style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}
          >
            {/* Close */}
            <motion.button
              whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.1)' }}
              onClick={onClose}
              style={{ position: 'absolute', top: 0, right: 0, width: 40, height: 40, borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', zIndex: 10 }}
            >
              <X size={18} />
            </motion.button>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '0.5rem' }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '99px', marginBottom: '1.25rem' }}>
                <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#4ade80' }}>Available for new projects</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '1rem' }}>
                Let's Work Together
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
                I bring purpose-driven precision to every project. Choose what fits your needs or let's talk custom.
              </p>
            </motion.div>

            {/* Packages */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.1, ease }}
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                  style={{
                    background: pkg.highlight ? 'rgba(99,102,241,0.08)' : 'var(--navy-2)',
                    border: `1px solid ${hovered === i ? pkg.color + '55' : pkg.highlight ? 'rgba(99,102,241,0.3)' : 'var(--border)'}`,
                    borderRadius: '20px',
                    padding: '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    boxShadow: hovered === i ? `0 16px 48px ${pkg.color}15` : 'none',
                  }}
                >
                  {pkg.highlight && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.2rem 0.6rem', background: pkg.color, borderRadius: '99px', fontSize: '0.65rem', fontWeight: 700, color: 'white', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Popular</div>
                  )}

                  {/* Background glow */}
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle, ${pkg.color}12 0%, transparent 70%)`, pointerEvents: 'none' }} />

                  <div style={{ width: 48, height: 48, borderRadius: '14px', background: `${pkg.color}15`, border: `1px solid ${pkg.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <pkg.icon size={22} color={pkg.color} />
                  </div>

                  <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.3rem' }}>{pkg.name}</h3>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 900, color: pkg.color }}>{pkg.price}</span>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginLeft: '0.4rem' }}>{pkg.period}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>{pkg.desc}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {pkg.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                        <CheckCircle2 size={13} color={pkg.color} />
                        {f}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Strengths strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ background: 'var(--navy-2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem 2rem', marginBottom: '2.5rem' }}
            >
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>What you get with me</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                {strengths.map(s => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span style={{ fontSize: '1rem' }}>{s.icon}</span>
                    {s.label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(59,130,246,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { onClose(); onContact() }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem', background: 'var(--blue)', color: 'white', borderRadius: '12px', fontWeight: 700, fontSize: '1rem' }}
              >
                <MessageCircle size={17} /> Let's Talk <ArrowRight size={15} />
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="mailto:christianirasubizashema@gmail.com"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'white', borderRadius: '12px', fontWeight: 600, fontSize: '1rem' }}
              >
                Email Directly
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
