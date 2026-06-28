import { useState, useEffect } from 'react'
import { ArrowRight, Calendar, Plus, Trash2, Lock, X, PenLine, ChevronLeft } from 'lucide-react'

interface Post {
  id: string
  title: string
  tag: string
  excerpt: string
  content: string
  date: string
}

const TAG_COLORS: Record<string, string> = {
  'AI Tools': 'rgba(139,92,246,0.15)',
  'Productivity': 'rgba(16,185,129,0.15)',
  'Projects': 'rgba(59,130,246,0.15)',
  'Tutorial': 'rgba(245,158,11,0.15)',
  'General': 'rgba(255,255,255,0.07)',
}
const TAG_TEXT: Record<string, string> = {
  'AI Tools': '#a78bfa',
  'Productivity': '#6ee7b7',
  'Projects': '#93c5fd',
  'Tutorial': '#fcd34d',
  'General': '#94a3b8',
}

const TAGS = ['AI Tools', 'Productivity', 'Projects', 'Tutorial', 'General']

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [reading, setReading] = useState<Post | null>(null)

  // Admin state
  const [adminOpen, setAdminOpen] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [authed, setAuthed] = useState(false)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ title: '', tag: 'General', excerpt: '', content: '' })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/blogs')
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pin }) })
    const data = await res.json()
    if (data.valid) { setAuthed(true); setPinError('') }
    else { setPinError('Incorrect PIN. Try again.') }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin, ...form }),
    })
    if (res.ok) {
      const newPost = await res.json()
      setPosts(p => [newPost, ...p])
      setForm({ title: '', tag: 'General', excerpt: '', content: '' })
      setAdding(false)
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return
    setDeleting(id)
    await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    })
    setPosts(p => p.filter(b => b.id !== id))
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

  // Full post reader
  if (reading) {
    return (
      <section style={{ padding: '2rem 2rem 6rem', maxWidth: 760, margin: '0 auto' }}>
        <button
          onClick={() => setReading(null)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2.5rem', fontWeight: 500 }}
          onMouseEnter={e => e.currentTarget.style.color = 'white'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <ChevronLeft size={16} /> Back to Blog
        </button>
        <span style={{
          display: 'inline-block', marginBottom: '1.25rem',
          padding: '0.2rem 0.7rem',
          background: TAG_COLORS[reading.tag] || TAG_COLORS.General,
          border: `1px solid ${TAG_TEXT[reading.tag] || '#94a3b8'}33`,
          borderRadius: '99px', fontSize: '0.7rem',
          color: TAG_TEXT[reading.tag] || '#94a3b8', fontWeight: 600,
        }}>{reading.tag}</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '1rem' }}>
          {reading.title}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '2.5rem' }}>
          <Calendar size={13} /> {reading.date}
        </div>
        <div style={{
          background: 'var(--navy-2)', border: '1px solid var(--border)',
          borderRadius: '16px', padding: '2.5rem',
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>
            {reading.content || reading.excerpt}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p style={{ color: 'var(--blue)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>Thoughts</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>Blog</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            onClick={() => setAdminOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.45rem 0.9rem',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', color: 'var(--text-muted)',
              fontSize: '0.8rem', fontWeight: 600,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'; e.currentTarget.style.color = 'var(--blue)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            <PenLine size={13} /> Manage Posts
          </button>
        </div>
      </div>

      {/* Posts grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading posts…</div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>No posts yet. Use Manage Posts to add your first one.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {posts.map(post => (
            <article
              key={post.id}
              onClick={() => setReading(post)}
              style={{
                background: 'var(--navy-2)',
                border: '1px solid var(--border)',
                borderRadius: '16px', padding: '2rem',
                cursor: 'pointer',
                transition: 'border-color 0.2s, transform 0.2s',
                display: 'flex', flexDirection: 'column',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.35)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <span style={{
                display: 'inline-block', alignSelf: 'flex-start',
                padding: '0.2rem 0.65rem',
                background: TAG_COLORS[post.tag] || TAG_COLORS.General,
                border: `1px solid ${TAG_TEXT[post.tag] || '#94a3b8'}33`,
                borderRadius: '99px', fontSize: '0.7rem',
                color: TAG_TEXT[post.tag] || '#94a3b8', fontWeight: 600,
                marginBottom: '1rem',
              }}>{post.tag}</span>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.4, marginBottom: '0.75rem', letterSpacing: '-0.01em', flex: 1 }}>
                {post.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                {post.excerpt}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.78rem' }}>
                  <Calendar size={12} /> {post.date}
                </div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--blue)', fontSize: '0.78rem', fontWeight: 600 }}>
                  Read <ArrowRight size={12} />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Admin Modal */}
      {adminOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }}
          onClick={e => { if (e.target === e.currentTarget) { setAdminOpen(false); setAdding(false); setAuthed(false); setPin('') } }}
        >
          <div style={{
            background: 'var(--navy-2)', border: '1px solid var(--border)',
            borderRadius: '20px', padding: '2rem',
            width: '100%', maxWidth: 520,
            maxHeight: '90vh', overflowY: 'auto',
          }}>
            {/* Modal header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                {!authed ? '🔒 Blog Admin' : adding ? '✍️ New Post' : '📝 Manage Posts'}
              </h3>
              <button onClick={() => { setAdminOpen(false); setAdding(false); setAuthed(false); setPin('') }}>
                <X size={18} color="var(--text-muted)" />
              </button>
            </div>

            {/* PIN screen */}
            {!authed ? (
              <form onSubmit={handlePinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Enter your admin PIN to manage blog posts.</p>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input
                    type="password"
                    placeholder="Admin PIN"
                    value={pin}
                    onChange={e => setPin(e.target.value)}
                    autoFocus
                    style={{ ...inputStyle, paddingLeft: '2.25rem' }}
                  />
                </div>
                {pinError && <p style={{ color: '#f87171', fontSize: '0.82rem' }}>{pinError}</p>}
                <button type="submit" style={{
                  padding: '0.75rem', background: 'var(--blue)', color: 'white',
                  borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem',
                }}>Unlock</button>
              </form>
            ) : adding ? (
              /* Add post form */
              <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <input required placeholder="Post title" value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={inputStyle} />
                <select value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                  style={{ ...inputStyle, cursor: 'pointer' }}>
                  {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <textarea required rows={2} placeholder="Short excerpt / summary"
                  value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical' }} />
                <textarea rows={6} placeholder="Full post content (optional — shown when the card is clicked)"
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical' }} />
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setAdding(false)}
                    style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    style={{ flex: 2, padding: '0.75rem', background: 'var(--blue)', color: 'white', borderRadius: '10px', fontWeight: 700, opacity: saving ? 0.7 : 1 }}>
                    {saving ? 'Publishing…' : 'Publish Post'}
                  </button>
                </div>
              </form>
            ) : (
              /* Post list */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button
                  onClick={() => setAdding(true)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    padding: '0.75rem', background: 'rgba(59,130,246,0.12)',
                    border: '1px dashed rgba(59,130,246,0.4)',
                    borderRadius: '10px', color: 'var(--blue)', fontWeight: 600, fontSize: '0.875rem',
                    width: '100%', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.12)'}
                >
                  <Plus size={16} /> New Post
                </button>
                {posts.length === 0 && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>No posts yet. Add your first one above.</p>
                )}
                {posts.map(post => (
                  <div key={post.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem',
                    padding: '0.9rem 1rem',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px',
                  }}>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {post.title}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.date} · {post.tag}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={deleting === post.id}
                      style={{ flexShrink: 0, padding: '0.4rem', borderRadius: '7px', background: 'rgba(239,68,68,0.1)', transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.25)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                    >
                      <Trash2 size={14} color="#f87171" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
