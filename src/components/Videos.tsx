import { useState, useEffect } from 'react'
import { Plus, Trash2, Video, X, Lock, Eye, EyeOff, Play, RefreshCw, CheckCircle2, ShieldCheck, AlertCircle, Upload } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoItem {
  id: string
  title: string
  description: string
  url: string
  thumbnail: string
  category: string
  date: string
}

interface VideosProps {
  fullPage?: boolean
}

const CATEGORIES = ['All', 'AI Tools', 'VS Code', 'Web Dev', 'Systems', 'Tutorial', 'Other']
const ease = [0.22, 1, 0.36, 1]

function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
    /youtube\.com\/shorts\/([^?]+)/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  return null
}

function getEmbedUrl(url: string): string {
  const id = getYouTubeId(url)
  if (id) {
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&hd=1&vq=hd1080&fs=1&color=white&iv_load_policy=3`
  }
  return url
}

async function apiFetch(path: string, opts?: RequestInit) {
  const res = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.error || 'Request failed')
  }
  return res.json()
}

type AdminStep = 'closed' | 'request' | 'pin' | 'granted' | 'panel'

export default function Videos({ fullPage }: VideosProps) {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [playing, setPlaying] = useState<string | null>(null)

  const [step, setStep] = useState<AdminStep>('closed')
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [pinError, setPinError] = useState(false)
  const [pinLoading, setPinLoading] = useState(false)
  const [adminPin, setAdminPin] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', url: '', category: 'Web Dev' })
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const data = await apiFetch('/videos')
      setVideos(data)
    } catch {
      // silent fallback
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchVideos() }, [])

  const filtered = activeCategory === 'All' ? videos : videos.filter(v => v.category === activeCategory)

  const closeAdmin = () => {
    setStep('closed')
    setPin('')
    setPinError(false)
    setShowPin(false)
    setShowAdd(false)
    setFormError('')
  }

  const handleAuth = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!pin.trim()) return
    setPinLoading(true)
    setPinError(false)
    try {
      const res = await apiFetch('/auth', { method: 'POST', body: JSON.stringify({ pin }) })
      if (res.valid) {
        setAdminPin(pin)
        setPin('')
        setStep('granted')
        setTimeout(() => setStep('panel'), 1600)
      } else {
        setPinError(true)
      }
    } catch {
      setPinError(true)
    } finally {
      setPinLoading(false)
    }
  }

  const handleAdd = async () => {
    if (!form.title.trim() || !form.url.trim()) { setFormError('Title and URL are required.'); return }
    if (!getYouTubeId(form.url)) { setFormError('Please enter a valid YouTube URL.'); return }
    try {
      setSaving(true); setFormError('')
      const newVideo = await apiFetch('/videos', { method: 'POST', body: JSON.stringify({ ...form, pin: adminPin }) })
      setVideos(prev => [newVideo, ...prev])
      setForm({ title: '', description: '', url: '', category: 'Web Dev' })
      setShowAdd(false)
    } catch (e: unknown) {
      setFormError(e instanceof Error ? e.message : 'Failed to add video.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this video?')) return
    try {
      setDeleting(id)
      await apiFetch(`/videos/${id}`, { method: 'DELETE', body: JSON.stringify({ pin: adminPin }) })
      setVideos(prev => prev.filter(v => v.id !== id))
      if (playing === id) setPlaying(null)
    } catch {
      alert('Failed to delete video.')
    } finally {
      setDeleting(null)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px', color: 'white',
    fontSize: '0.875rem', outline: 'none',
    fontFamily: 'inherit', transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  return (
    <section id="videos" style={{ padding: fullPage ? '8rem 2rem 6rem' : '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}
      >
        <div>
          <p style={{ color: 'var(--blue)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>Dev Content</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>Videos</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Building systems, websites & apps — using AI and VS Code.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04, borderColor: 'rgba(59,130,246,0.4)', color: 'var(--blue)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setStep('request')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}
        >
          <Upload size={14} /> Manage Videos
        </motion.button>
      </motion.div>

      {/* Category filter */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}
      >
        {CATEGORIES.map(cat => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '0.4rem 0.9rem', borderRadius: '99px', fontSize: '0.82rem', fontWeight: 600, border: '1px solid',
              borderColor: activeCategory === cat ? 'var(--blue)' : 'var(--border)',
              background: activeCategory === cat ? 'rgba(59,130,246,0.15)' : 'transparent',
              color: activeCategory === cat ? 'var(--blue)' : 'var(--text-muted)',
              transition: 'all 0.15s',
            }}
          >{cat}</motion.button>
        ))}
      </motion.div>

      {/* Loading */}
      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '4rem', color: 'var(--text-muted)' }}>
          <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} />
          <span>Loading videos…</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--navy-2)', border: '1px solid var(--border)', borderRadius: '20px' }}
        >
          <Video size={44} color="var(--text-dim)" style={{ marginBottom: '1.25rem' }} />
          <h3 style={{ fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            {activeCategory === 'All' ? 'No videos yet' : `No videos in "${activeCategory}"`}
          </h3>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>Click "Manage Videos" to add your first YouTube video.</p>
        </motion.div>
      )}

      {/* Video grid */}
      {!loading && filtered.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              whileHover={{ y: -6, borderColor: 'rgba(59,130,246,0.35)', boxShadow: '0 16px 48px rgba(0,0,0,0.35)' }}
              style={{ background: 'var(--navy-2)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}
            >
              {/* Thumbnail / Player */}
              <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000', overflow: 'hidden' }}>
                {playing === video.id ? (
                  <iframe
                    src={getEmbedUrl(video.url)}
                    style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={video.title}
                    loading="lazy"
                  />
                ) : (
                  <motion.div
                    onClick={() => setPlaying(video.id)}
                    whileHover="hovered"
                    style={{ width: '100%', height: '100%', cursor: 'pointer', position: 'relative' }}
                  >
                    {video.thumbnail ? (
                      <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'var(--navy-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Video size={40} color="var(--text-dim)" />
                      </div>
                    )}
                    {/* Play overlay */}
                    <motion.div
                      variants={{ hovered: { background: 'rgba(0,0,0,0.55)' } }}
                      style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                    >
                      <motion.div
                        variants={{ hovered: { scale: 1.12, boxShadow: '0 0 0 16px rgba(59,130,246,0.25)' } }}
                        style={{ width: 60, height: 60, background: 'rgba(59,130,246,0.95)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 10px rgba(59,130,246,0.2)', transition: 'all 0.2s' }}
                      >
                        <Play size={24} fill="white" color="white" style={{ marginLeft: 4 }} />
                      </motion.div>
                    </motion.div>
                    {/* HD badge */}
                    <div style={{ position: 'absolute', bottom: '0.6rem', right: '0.6rem', padding: '0.15rem 0.45rem', background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700, color: 'white', letterSpacing: '0.05em' }}>HD</div>
                  </motion.div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <span style={{ padding: '0.2rem 0.6rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '99px', fontSize: '0.7rem', color: 'var(--blue)', fontWeight: 600, whiteSpace: 'nowrap' }}>{video.category}</span>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem', whiteSpace: 'nowrap' }}>{video.date}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.4, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{video.title}</h3>
                {video.description && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{video.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── Admin Modal ── */}
      <AnimatePresence>
        {step !== 'closed' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={e => { if (e.target === e.currentTarget) closeAdmin() }}
          >
            <AnimatePresence mode="wait">

              {/* STEP 1 — Request screen */}
              {step === 'request' && (
                <motion.div
                  key="request"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.35, ease }}
                  style={{ background: 'var(--navy-2)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2.5rem 2rem', width: '100%', maxWidth: 380, textAlign: 'center', position: 'relative' }}
                >
                  <button onClick={closeAdmin} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: 'var(--text-muted)' }}>
                    <X size={18} />
                  </button>

                  {/* Icon */}
                  <motion.div
                    animate={{ boxShadow: ['0 0 0 0 rgba(59,130,246,0.3)', '0 0 0 16px rgba(59,130,246,0)', '0 0 0 0 rgba(59,130,246,0)'] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{ width: 72, height: 72, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}
                  >
                    <ShieldCheck size={32} color="var(--blue)" />
                  </motion.div>

                  <h3 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.6rem', letterSpacing: '-0.03em' }}>Admin Access Required</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                    This panel is for site owners only. You'll need to enter the admin PIN to add or remove videos.
                  </p>

                  {/* What you can do */}
                  <div style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', textAlign: 'left' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>With access you can:</p>
                    {['Add YouTube videos to the portfolio', 'Organize videos by category', 'Remove outdated content'].map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0 }} />
                        {item}
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setStep('pin')}
                    style={{ width: '100%', padding: '0.9rem', background: 'var(--blue)', color: 'white', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <Lock size={16} /> Enter Admin PIN
                  </motion.button>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginTop: '1rem' }}>Not the owner? Close this panel.</p>
                </motion.div>
              )}

              {/* STEP 2 — PIN entry */}
              {step === 'pin' && (
                <motion.div
                  key="pin"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3, ease }}
                  style={{ background: 'var(--navy-2)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2.5rem 2rem', width: '100%', maxWidth: 380, textAlign: 'center', position: 'relative' }}
                >
                  <button onClick={() => setStep('request')} style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}>
                    ← Back
                  </button>
                  <button onClick={closeAdmin} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: 'var(--text-muted)' }}>
                    <X size={18} />
                  </button>

                  {/* Step indicator */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    {['Verify', 'Access'].map((label, i) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: i === 0 ? 'var(--blue)' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>{i + 1}</div>
                        <span style={{ fontSize: '0.75rem', color: i === 0 ? 'white' : 'var(--text-dim)', fontWeight: i === 0 ? 600 : 400 }}>{label}</span>
                        {i === 0 && <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.1)' }} />}
                      </div>
                    ))}
                  </div>

                  <div style={{ width: 64, height: 64, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <Lock size={28} color="var(--blue)" />
                  </div>

                  <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.4rem' }}>Enter Your PIN</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>Type the 5-digit admin PIN to unlock the video manager.</p>

                  <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPin ? 'text' : 'password'}
                        placeholder="● ● ● ● ●"
                        value={pin}
                        onChange={e => { setPin(e.target.value); setPinError(false) }}
                        maxLength={10}
                        style={{
                          ...inputStyle,
                          borderColor: pinError ? '#ef4444' : pin ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.1)',
                          letterSpacing: '0.3em',
                          textAlign: 'center',
                          fontSize: '1.6rem',
                          paddingRight: '3rem',
                          boxShadow: pinError ? '0 0 0 3px rgba(239,68,68,0.15)' : pin ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none',
                        }}
                        autoFocus
                      />
                      <button type="button" onClick={() => setShowPin(p => !p)} style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}>
                        {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    <AnimatePresence>
                      {pinError && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', fontSize: '0.82rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '0.6rem 0.8rem' }}
                        >
                          <AlertCircle size={14} />
                          Incorrect PIN. Please try again.
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={pinLoading || !pin.trim()}
                      whileHover={{ scale: pin.trim() && !pinLoading ? 1.02 : 1 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ padding: '0.9rem', background: !pin.trim() ? 'rgba(59,130,246,0.4)' : 'var(--blue)', color: 'white', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem', cursor: !pin.trim() ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: pinLoading ? 0.7 : 1 }}
                    >
                      {pinLoading ? (
                        <><RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Verifying…</>
                      ) : (
                        'Unlock Access'
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {/* STEP 3 — Granted animation */}
              {step === 'granted' && (
                <motion.div
                  key="granted"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
                  style={{ background: 'var(--navy-2)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '24px', padding: '3rem 2rem', width: '100%', maxWidth: 340, textAlign: 'center', boxShadow: '0 0 40px rgba(34,197,94,0.1)' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                    style={{ width: 80, height: 80, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}
                  >
                    <CheckCircle2 size={38} color="#22c55e" />
                  </motion.div>
                  <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontWeight: 800, fontSize: '1.3rem', color: '#22c55e', marginBottom: '0.4rem' }}>Access Granted</motion.h3>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Opening video manager…</motion.p>
                </motion.div>
              )}

              {/* STEP 4 — Full admin panel */}
              {step === 'panel' && (
                <motion.div
                  key="panel"
                  initial={{ opacity: 0, scale: 0.93, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease }}
                  style={{ background: 'var(--navy-2)', border: '1px solid var(--border)', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: 680, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}
                >
                  <button onClick={closeAdmin} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: 'var(--text-muted)' }}>
                    <X size={20} />
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', paddingRight: '2rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <ShieldCheck size={16} color="#22c55e" />
                        <span style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 600 }}>Authenticated</span>
                      </div>
                      <h3 style={{ fontWeight: 800, fontSize: '1.2rem' }}>Video Manager</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.15rem' }}>{videos.length} video{videos.length !== 1 ? 's' : ''} in library</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setShowAdd(true); setFormError('') }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1rem', background: 'var(--blue)', color: 'white', borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem' }}
                    >
                      <Plus size={16} /> Add Video
                    </motion.button>
                  </div>

                  {/* Add form */}
                  <AnimatePresence>
                    {showAdd && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                          <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem', color: 'var(--blue)' }}>➕ New Video</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <input placeholder="Video title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--blue)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                            <input placeholder="YouTube URL * (youtube.com/watch?v=... or youtu.be/...)" value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--blue)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                            <textarea rows={3} placeholder="Description (optional)" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} onFocus={e => e.target.style.borderColor = 'var(--blue)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                              {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c} style={{ background: '#0c1428' }}>{c}</option>)}
                            </select>
                            {formError && <p style={{ color: '#ef4444', fontSize: '0.8rem' }}>{formError}</p>}
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                              <button onClick={handleAdd} disabled={saving} style={{ flex: 1, padding: '0.75rem', background: saving ? 'rgba(59,130,246,0.5)' : 'var(--blue)', color: 'white', borderRadius: '8px', fontWeight: 700, fontSize: '0.875rem', opacity: saving ? 0.7 : 1 }}>{saving ? 'Adding…' : 'Add Video'}</button>
                              <button onClick={() => { setShowAdd(false); setFormError('') }} style={{ padding: '0.75rem 1.25rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem' }}>Cancel</button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Video list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {videos.length === 0 ? (
                      <p style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '2rem', fontSize: '0.875rem' }}>No videos yet. Click "Add Video" to get started.</p>
                    ) : (
                      videos.map(v => (
                        <motion.div
                          key={v.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '10px' }}
                        >
                          {v.thumbnail ? (
                            <img src={v.thumbnail} alt="" style={{ width: 76, height: 48, objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} loading="lazy" />
                          ) : (
                            <div style={{ width: 76, height: 48, background: 'var(--navy-3)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Video size={18} color="var(--text-dim)" />
                            </div>
                          )}
                          <div style={{ flex: 1, overflow: 'hidden' }}>
                            <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.title}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{v.category} · {v.date}</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1, background: 'rgba(239,68,68,0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(v.id)}
                            disabled={deleting === v.id}
                            style={{ flexShrink: 0, width: 34, height: 34, borderRadius: '8px', background: 'rgba(239,68,68,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: deleting === v.id ? 0.5 : 1 }}
                          >
                            <Trash2 size={14} color="#f87171" />
                          </motion.button>
                        </motion.div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
