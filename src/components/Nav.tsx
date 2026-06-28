import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = ['About', 'Projects', 'Skills', 'Contact']

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'background 0.3s, backdrop-filter 0.3s',
      background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(108,99,255,0.1)' : 'none',
    }}>
      <a href="#" style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--accent-light)' }}>
        CS
      </a>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {links.map(link => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            style={{
              color: 'var(--muted)',
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  )
}
