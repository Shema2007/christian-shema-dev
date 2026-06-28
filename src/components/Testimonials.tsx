import { useState, useEffect } from 'react'
import { Star, Lock, X, Plus, Trash2, Quote } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  stars: number
}

const ease = [0.22, 1, 0.36, 1]

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const hue = name.charCodeAt(0) * 13 % 360
  return (
    <div style={{
      width: 44, height: 44, borderRadius: '50%',
      background: `hsl(${hue},60%,30%)`,
      border: `2px solid hsl(${hue},60%,45%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.85rem', fontWeight: 700, color: 'white', flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [adminOpen, setAdminOpen] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [authed, setAuthed] = useState(false)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: '', role: '', quote: '', stars: 5 })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/testimonials')
      .then(r => r.json())
      .then(d => { setTestimonials(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const closeModal = () => { setAdminOpen(false); setAdding(false); setAuthed(false); setPin(''); setPinError('') }

  const handlePin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pin }) })
    const data = await res.json()
    if (data.valid) { setAuthed(true); setPinError('') } else setPinError('Incorrect PIN.')
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    const res = await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pin, ...form }) })
    if (res.ok) { const t = await res.json(); setTestimonials(p => [t, ...p]); setForm({ name: '', role: '', quote: '', stars: 5 }); setAdding(false) }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    setDeleting(id)
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pin }) })
    setTestimonials(p => p.filter(t => t.id !== id))
    setDeleting(null)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.7rem 0.9rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px', color: 'white',
    fontSize: '0.875rem', outline: 'none',
    fontFamily: 'inherit', boxSizing: 'border-box',
  }

  return (
    <section id="testimonials" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease }}
        style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative' }}
      >
        <p style={{ color: 'var(--blue)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>Social Proof</p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>Testimonials</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setAdminOpen(true)}
          style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.45rem 0.9rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px', color: 'var(--text-muted)',
            fontSize: '0.8rem', fontWeight: 600,
          }}
        >
          <Lock size={12} /> Manage
        </motion.button>
      </motion.div>

      {/* Cards */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading…</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <AnimatePresence>
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease }}
                whileHover={{ y: -6, borderColor: 'rgba(59,130,246,0.35)', boxShadow: '0 16px 48px rgba(0,0,0,0.3)' }}
                style={{
                  background: 'var(--navy-2)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px', padding: '2rem',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Quote mark watermark */}
                <div style={{ position: 'absolute', top: '1rem', right: '1.25rem', color: 'rgba(59,130,246,0.07)' }}>
                  <Quote size={56} />
                </div>

                {/* Stars */}
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: i * 0.1 + 0.2 } } }}
                  style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.25rem' }}
                >
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <motion.div
                      key={j}
                      variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 400 } } }}
                    >
                      <Star size={14} fill="var(--blue)" color="var(--blue)" />
                    </motion.div>
                  ))}
                </motion.div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.5rem', fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                  "{t.quote}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Avatar name={t.name} />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</p>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Admin Modal */}
      <AnimatePresence>
        {adminOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 2000,
              background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
            }}
            onClick={e => { if (e.target === e.currentTarget) closeModal() }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease }}
              style={{
                background: 'var(--navy-2)', border: '1px solid var(--border)',
                borderRadius: '20px', padding: '2rem',
                width: '100%', maxWidth: 500,
                maxHeight: '90vh', overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                  {!authed ? '🔒 Testimonials Admin' : adding ? '✍️ Add Testimonial' : '⭐ Manage Testimonials'}
                </h3>
                <button onClick={closeModal}><X size={18} color="var(--text-muted)" /></button>
              </div>

              {!authed ? (
                <form onSubmit={handlePin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Enter your admin PIN to manage testimonials.</p>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                    <input type="password" placeholder="Admin PIN" value={pin} onChange={e => setPin(e.target.value)} autoFocus style={{ ...inputStyle, paddingLeft: '2.25rem' }} />
                  </div>
                  {pinError && <p style={{ color: '#f87171', fontSize: '0.82rem' }}>{pinError}</p>}
                  <button type="submit" style={{ padding: '0.75rem', background: 'var(--blue)', color: 'white', borderRadius: '10px', fontWeight: 700 }}>Unlock</button>
                </form>
              ) : adding ? (
                <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <input required placeholder="Client name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
                  <input placeholder="Role / Company" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} style={inputStyle} />
                  <textarea required rows={4} placeholder="Their testimonial…" value={form.quote} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Stars:</span>
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} type="button" onClick={() => setForm(f => ({ ...f, stars: n }))} style={{ padding: '0.2rem' }}>
                        <Star size={20} fill={n <= form.stars ? 'var(--blue)' : 'transparent'} color="var(--blue)" />
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="button" onClick={() => setAdding(false)} style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>Cancel</button>
                    <button type="submit" disabled={saving} style={{ flex: 2, padding: '0.75rem', background: 'var(--blue)', color: 'white', borderRadius: '10px', fontWeight: 700, opacity: saving ? 0.7 : 1 }}>{saving ? 'Adding…' : 'Add Testimonial'}</button>
                  </div>
                </form>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button onClick={() => setAdding(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', background: 'rgba(59,130,246,0.12)', border: '1px dashed rgba(59,130,246,0.4)', borderRadius: '10px', color: 'var(--blue)', fontWeight: 600, fontSize: '0.875rem', width: '100%' }}>
                    <Plus size={16} /> Add Testimonial
                  </button>
                  {testimonials.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>No testimonials yet.</p>}
                  {testimonials.map(t => (
                    <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.9rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px' }}>
                      <Avatar name={t.name} />
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.15rem' }}>{t.name}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.role}</p>
                      </div>
                      <button onClick={() => handleDelete(t.id)} disabled={deleting === t.id} style={{ flexShrink: 0, padding: '0.4rem', borderRadius: '7px', background: 'rgba(239,68,68,0.1)' }}>
                        <Trash2 size={14} color="#f87171" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
