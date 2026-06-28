import { useState } from 'react'
import { Mail, Phone } from 'lucide-react'

interface ContactProps {
  fullPage?: boolean
}

const GITHUB_SVG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const LINKEDIN_SVG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const TWITTER_SVG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.213 5.567L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
)

const socials = [
  { icon: GITHUB_SVG, href: 'https://github.com/Shema2007', label: 'GitHub' },
  { icon: LINKEDIN_SVG, href: '#', label: 'LinkedIn' },
  { icon: TWITTER_SVG, href: '#', label: 'Twitter / X' },
]

export default function Contact({ fullPage }: ContactProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.8rem 1rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    color: 'white',
    fontSize: '0.875rem',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" style={{
      padding: fullPage ? '8rem 2rem' : '6rem 2rem',
      maxWidth: 1100,
      margin: '0 auto',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5rem',
        alignItems: 'center',
      }}>
        {/* Left: Main CTA */}
        <div>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}>
            Let's Build Something Great.
          </h2>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1rem',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
            maxWidth: 420,
          }}>
            Currently accepting new projects and consulting opportunities.
            Whether you have a specific project or just want to explore possibilities, let's talk.
          </p>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
            <a
              href="mailto:christianirasubizashema@gmail.com"
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1rem 1.25rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                color: 'var(--text)',
                fontWeight: 500,
                fontSize: '0.9rem',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'; e.currentTarget.style.background = 'rgba(59,130,246,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: '10px',
                background: 'rgba(59,130,246,0.15)',
                border: '1px solid rgba(59,130,246,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Mail size={17} color="var(--blue)" />
              </div>
              christianirasubizashema@gmail.com
            </a>

            <a
              href="tel:+250792773683"
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1rem 1.25rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                color: 'var(--text)',
                fontWeight: 500,
                fontSize: '0.9rem',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'; e.currentTarget.style.background = 'rgba(59,130,246,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: '10px',
                background: 'rgba(59,130,246,0.15)',
                border: '1px solid rgba(59,130,246,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Phone size={17} color="var(--blue)" />
              </div>
              +250 792 773 683
            </a>
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {socials.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 44, height: 44,
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)',
                  transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(59,130,246,0.15)'
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'
                  e.currentTarget.style.color = 'var(--blue)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Quick message form */}
        <div style={{
          background: 'var(--navy-2)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '2.5rem',
        }}>
          <h3 style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.4rem' }}>Send a message</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', marginBottom: '1.75rem' }}>
            I usually reply within a few hours.
          </p>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>✅</div>
              <h4 style={{ fontWeight: 700, marginBottom: '0.4rem' }}>Message sent!</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>I'll get back to you soon.</p>
            </div>
          ) : (
            <form
              onSubmit={e => { e.preventDefault(); setSent(true) }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
            >
              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              <input
                required
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              <textarea
                required
                rows={4}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              <button
                type="submit"
                style={{
                  padding: '0.85rem',
                  background: 'var(--blue)',
                  color: 'white',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-dark)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--blue)'}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
