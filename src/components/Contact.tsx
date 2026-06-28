import { useState } from 'react'
import { Github, Twitter, Linkedin, Send } from 'lucide-react'

interface ContactProps {
  fullPage?: boolean
}

export default function Contact({ fullPage }: ContactProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.85rem 1rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    color: 'var(--text)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" style={{
      padding: fullPage ? '8rem 2rem' : '6rem 2rem',
      maxWidth: 700,
      margin: '0 auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ color: 'var(--blue)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>Get In Touch</p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem' }}>Let's Work Together</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Have a project in mind or want to collaborate? I'd love to hear from you.
        </p>
      </div>

      {sent ? (
        <div style={{
          textAlign: 'center',
          padding: '3.5rem',
          background: 'var(--navy-2)',
          border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: '20px',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.25rem' }}>Message Sent!</h3>
          <p style={{ color: 'var(--text-muted)' }}>Thanks for reaching out. I'll get back to you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{
          background: 'var(--navy-2)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input required placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--blue)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <input required type="email" placeholder="Your email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--blue)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <input placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--blue)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <textarea required rows={5} placeholder="Tell me about your project or idea..."
            value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
            style={{ ...inputStyle, resize: 'vertical' }}
            onFocus={e => e.target.style.borderColor = 'var(--blue)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <button type="submit" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            padding: '0.9rem',
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
            <Send size={16} /> Send Message
          </button>
        </form>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2.5rem' }}>
        {[
          { icon: Github, href: 'https://github.com/Shema2007', label: 'GitHub' },
          { icon: Twitter, href: '#', label: 'Twitter' },
          { icon: Linkedin, href: '#', label: 'LinkedIn' },
        ].map(({ icon: Icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Icon size={16} /> {label}
          </a>
        ))}
      </div>
    </section>
  )
}
