import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  }

  return (
    <section id="contact" style={{ padding: '6rem 2rem', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Contact
        </p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
          Let's work together
        </h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          Have a project in mind? I'd love to hear about it.
          Drop me a message and I'll get back to you.
        </p>
      </div>

      {sent ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'var(--bg-card)',
          border: '1px solid rgba(108,99,255,0.3)',
          borderRadius: '16px',
        }}>
          <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</p>
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Message Sent!</h3>
          <p style={{ color: 'var(--muted)' }}>Thanks for reaching out. I'll reply soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
          <input
            required
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
          <textarea
            required
            rows={5}
            placeholder="Tell me about your project..."
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            style={{ ...inputStyle, resize: 'vertical' }}
            onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
          <button
            type="submit"
            style={{
              padding: '0.9rem',
              background: 'var(--accent)',
              color: 'white',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Send Message
          </button>
        </form>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '3rem' }}>
        {[
          { label: 'GitHub', href: 'https://github.com/Shema2007' },
          { label: 'LinkedIn', href: '#' },
          { label: 'Twitter', href: '#' },
        ].map(link => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--muted)',
              fontSize: '0.9rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}
