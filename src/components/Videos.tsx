import { useState, useEffect } from 'react'
import { Plus, Trash2, Video, X, Upload, Lock, Eye, EyeOff, Play } from 'lucide-react'

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
const ADMIN_PIN = '2025'

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

function getThumbnail(url: string): string {
  const id = getYouTubeId(url)
  if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  return ''
}

function getEmbedUrl(url: string): string {
  const id = getYouTubeId(url)
  if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
  return url
}

function loadVideos(): VideoItem[] {
  try {
    return JSON.parse(localStorage.getItem('cs_videos') || '[]')
  } catch {
    return []
  }
}

function saveVideos(videos: VideoItem[]) {
  localStorage.setItem('cs_videos', JSON.stringify(videos))
}

const SAMPLE_VIDEOS: VideoItem[] = [
  {
    id: '1',
    title: 'How I Use AI + VS Code to Build Websites in Minutes',
    description: 'A walkthrough of my AI-assisted development workflow using GitHub Copilot, Cursor, and VS Code extensions to ship websites faster.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    category: 'AI Tools',
    date: 'June 20, 2025',
  },
  {
    id: '2',
    title: 'Building a Full-Stack App with Replit in 30 Minutes',
    description: 'Live coding session where I build and deploy a complete web application using Replit\'s AI tools from scratch.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    category: 'Web Dev',
    date: 'June 10, 2025',
  },
  {
    id: '3',
    title: 'My VS Code Setup for AI-Powered Development',
    description: 'Every extension, keybinding, and snippet I use daily. This setup cut my development time by 40%.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    category: 'VS Code',
    date: 'May 28, 2025',
  },
]

export default function Videos({ fullPage }: VideosProps) {
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    const stored = loadVideos()
    if (stored.length === 0) {
      saveVideos(SAMPLE_VIDEOS)
      return SAMPLE_VIDEOS
    }
    return stored
  })
  const [activeCategory, setActiveCategory] = useState('All')
  const [playing, setPlaying] = useState<string | null>(null)
  const [showAdmin, setShowAdmin] = useState(false)
  const [isAuthed, setIsAuthed] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', url: '', category: 'Web Dev' })
  const [formError, setFormError] = useState('')
  const [showPin, setShowPin] = useState(false)

  useEffect(() => {
    saveVideos(videos)
  }, [videos])

  const filtered = activeCategory === 'All' ? videos : videos.filter(v => v.category === activeCategory)

  const handleAuth = () => {
    if (pin === ADMIN_PIN) {
      setIsAuthed(true)
      setPinError(false)
      setPin('')
    } else {
      setPinError(true)
    }
  }

  const handleAdd = () => {
    if (!form.title.trim() || !form.url.trim()) {
      setFormError('Title and URL are required.')
      return
    }
    if (!getYouTubeId(form.url)) {
      setFormError('Please enter a valid YouTube URL.')
      return
    }
    const newVideo: VideoItem = {
      id: Date.now().toString(),
      title: form.title.trim(),
      description: form.description.trim(),
      url: form.url.trim(),
      thumbnail: getThumbnail(form.url.trim()),
      category: form.category,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    }
    setVideos(prev => [newVideo, ...prev])
    setForm({ title: '', description: '', url: '', category: 'Web Dev' })
    setFormError('')
    setShowAdd(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this video?')) {
      setVideos(prev => prev.filter(v => v.id !== id))
      if (playing === id) setPlaying(null)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '0.875rem',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="videos" style={{
      padding: fullPage ? '8rem 2rem 6rem' : '6rem 2rem',
      maxWidth: 1100,
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p style={{ color: 'var(--blue)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>
            Dev Content
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
            Videos
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Watch me build with AI, VS Code, and modern web tools.
          </p>
        </div>
        <button
          onClick={() => { setShowAdmin(true); setIsAuthed(false); setPin('') }}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.6rem 1.1rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            fontWeight: 600,
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-blue)'; e.currentTarget.style.color = 'var(--blue)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
        >
          <Upload size={14} /> Manage Videos
        </button>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: '0.4rem 0.9rem',
            borderRadius: '99px',
            fontSize: '0.82rem',
            fontWeight: 600,
            border: '1px solid',
            transition: 'all 0.2s',
            borderColor: activeCategory === cat ? 'var(--blue)' : 'var(--border)',
            background: activeCategory === cat ? 'rgba(59,130,246,0.15)' : 'transparent',
            color: activeCategory === cat ? 'var(--blue)' : 'var(--text-muted)',
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Video grid */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '5rem 2rem',
          background: 'var(--navy-2)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
        }}>
          <Video size={40} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>No videos yet in this category.</p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Click "Manage Videos" to add your first one.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filtered.map(video => (
            <div key={video.id} style={{
              background: 'var(--navy-2)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-blue)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {/* Thumbnail / Player */}
              <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000', overflow: 'hidden' }}>
                {playing === video.id ? (
                  <iframe
                    src={getEmbedUrl(video.url)}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  />
                ) : (
                  <div
                    onClick={() => setPlaying(video.id)}
                    style={{ width: '100%', height: '100%', cursor: 'pointer', position: 'relative' }}
                  >
                    {video.thumbnail ? (
                      <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'var(--navy-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Video size={40} color="var(--text-dim)" />
                      </div>
                    )}
                    {/* Play overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(0,0,0,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.35)'}
                    >
                      <div style={{
                        width: 56, height: 56,
                        background: 'var(--blue)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 0 8px rgba(59,130,246,0.25)',
                      }}>
                        <Play size={22} fill="white" color="white" style={{ marginLeft: 3 }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{
                    padding: '0.2rem 0.6rem',
                    background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: '99px',
                    fontSize: '0.7rem',
                    color: 'var(--blue)',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}>{video.category}</span>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem', whiteSpace: 'nowrap' }}>{video.date}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.4, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
                  {video.title}
                </h3>
                {video.description && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {video.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Admin Modal */}
      {showAdmin && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }} onClick={e => { if (e.target === e.currentTarget) setShowAdmin(false) }}>
          <div style={{
            background: 'var(--navy-2)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '2rem',
            width: '100%',
            maxWidth: isAuthed ? 700 : 380,
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
          }}>
            <button onClick={() => setShowAdmin(false)} style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem',
              color: 'var(--text-muted)', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <X size={20} />
            </button>

            {!isAuthed ? (
              /* PIN entry */
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 56, height: 56,
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                }}>
                  <Lock size={24} color="var(--blue)" />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Admin Access</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
                  Enter your PIN to manage videos
                </p>
                <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                  <input
                    type={showPin ? 'text' : 'password'}
                    placeholder="Enter PIN"
                    value={pin}
                    onChange={e => { setPin(e.target.value); setPinError(false) }}
                    onKeyDown={e => e.key === 'Enter' && handleAuth()}
                    style={{
                      ...inputStyle,
                      borderColor: pinError ? '#ef4444' : 'rgba(255,255,255,0.1)',
                      letterSpacing: '0.2em',
                      textAlign: 'center',
                      fontSize: '1.25rem',
                      paddingRight: '3rem',
                    }}
                    autoFocus
                  />
                  <button onClick={() => setShowPin(p => !p)} style={{
                    position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                    color: 'var(--text-dim)',
                  }}>
                    {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {pinError && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Incorrect PIN. Try again.</p>}
                <button onClick={handleAuth} style={{
                  width: '100%',
                  padding: '0.85rem',
                  background: 'var(--blue)',
                  color: 'white',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-dark)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--blue)'}
                >
                  Unlock
                </button>
              </div>
            ) : (
              /* Admin panel */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '1.2rem' }}>Manage Videos</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>{videos.length} video{videos.length !== 1 ? 's' : ''} total</p>
                  </div>
                  <button onClick={() => { setShowAdd(true); setFormError('') }} style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.6rem 1rem',
                    background: 'var(--blue)',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-dark)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--blue)'}
                  >
                    <Plus size={16} /> Add Video
                  </button>
                </div>

                {/* Add form */}
                {showAdd && (
                  <div style={{
                    background: 'rgba(59,130,246,0.05)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem',
                  }}>
                    <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Add New Video</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <input
                        placeholder="Video title *"
                        value={form.title}
                        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                      <input
                        placeholder="YouTube URL * (e.g. https://youtube.com/watch?v=...)"
                        value={form.url}
                        onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                      <textarea
                        rows={3}
                        placeholder="Description (optional)"
                        value={form.description}
                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        style={{ ...inputStyle, resize: 'vertical' }}
                        onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                      <select
                        value={form.category}
                        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                        style={{ ...inputStyle }}
                      >
                        {CATEGORIES.filter(c => c !== 'All').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      {formError && <p style={{ color: '#ef4444', fontSize: '0.8rem' }}>{formError}</p>}
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button onClick={handleAdd} style={{
                          flex: 1,
                          padding: '0.75rem',
                          background: 'var(--blue)',
                          color: 'white',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          transition: 'background 0.2s',
                        }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-dark)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'var(--blue)'}
                        >
                          Add Video
                        </button>
                        <button onClick={() => { setShowAdd(false); setFormError('') }} style={{
                          padding: '0.75rem 1.25rem',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-muted)',
                          borderRadius: '8px',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Video list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {videos.length === 0 ? (
                    <p style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '2rem', fontSize: '0.875rem' }}>
                      No videos yet. Click "Add Video" to get started.
                    </p>
                  ) : (
                    videos.map(v => (
                      <div key={v.id} style={{
                        display: 'flex', alignItems: 'center', gap: '1rem',
                        padding: '0.9rem 1rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                      }}>
                        {v.thumbnail ? (
                          <img src={v.thumbnail} alt="" style={{ width: 64, height: 40, objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                        ) : (
                          <div style={{ width: 64, height: 40, background: 'var(--navy-3)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Video size={16} color="var(--text-dim)" />
                          </div>
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.title}</p>
                          <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginTop: '0.15rem' }}>{v.category} · {v.date}</p>
                        </div>
                        <button onClick={() => handleDelete(v.id)} style={{
                          color: 'var(--text-dim)',
                          padding: '0.35rem',
                          borderRadius: '6px',
                          transition: 'color 0.2s, background 0.2s',
                          flexShrink: 0,
                        }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = 'rgba(239,68,68,0.1)' }}
                          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.background = 'transparent' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
