import { useState, useEffect } from 'react'
import { Video } from 'lucide-react'

interface NavProps {
  activePage: string
  setActivePage: (page: string) => void
}

const links = [
  { label: 'About', href: 'about' },
  { label: 'Services', href: 'services' },
  { label: 'Tech Stack', href: 'tech-stack' },
  { label: 'Projects', href: 'projects' },
  { label: 'Blog', href: 'blog' },
  { label: 'Testimonials', href: 'testimonials' },
  { label: 'Contact', href: 'contact' },
]

export default function Nav({ activePage, setActivePage }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    if (href === 'videos') {
      setActivePage('videos')
      window.scrollTo({ top: 0 })
      return
    }
    if (activePage !== 'home') {
      setActivePage('home')
      setTimeout(() => {
        document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    } else {
      document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      padding: '0 2rem',
      height: 68,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'rgba(7,13,27,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.3s',
    }}>
      {/* Logo */}
      <button
        onClick={() => { setActivePage('home'); window.scrollTo({ top: 0 }) }}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          padding: '0.2rem',
        }}
      >
        <img
          src="/logo.png"
          alt="Christian Shema — SHEMA Developer"
          style={{
            height: 48,
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.35))',
          }}
        />
      </button>

      {/* Desktop Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        {links.map(link => (
          <button
            key={link.label}
            onClick={() => handleNav(link.href)}
            style={{
              padding: '0.4rem 0.75rem',
              color: 'var(--text-muted)',
              fontSize: '0.875rem',
              fontWeight: 500,
              borderRadius: '6px',
              transition: 'color 0.2s, background 0.2s',
              background: 'transparent',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent' }}
          >
            {link.label}
          </button>
        ))}

        {/* Videos link */}
        <button
          onClick={() => handleNav('videos')}
          style={{
            padding: '0.4rem 0.75rem',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            color: activePage === 'videos' ? 'var(--blue)' : 'var(--text-muted)',
            fontSize: '0.875rem',
            fontWeight: 500,
            borderRadius: '6px',
            transition: 'color 0.2s, background 0.2s',
            background: activePage === 'videos' ? 'rgba(59,130,246,0.1)' : 'transparent',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
          onMouseLeave={e => {
            e.currentTarget.style.color = activePage === 'videos' ? 'var(--blue)' : 'var(--text-muted)'
            e.currentTarget.style.background = activePage === 'videos' ? 'rgba(59,130,246,0.1)' : 'transparent'
          }}
        >
          <Video size={14} />
          Videos
        </button>

        {/* Hire Me */}
        <button
          onClick={() => handleNav('contact')}
          style={{
            marginLeft: '0.5rem',
            padding: '0.5rem 1.25rem',
            background: 'var(--blue)',
            color: 'white',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.875rem',
            transition: 'background 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue-dark)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--blue)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Hire Me
        </button>
      </div>
    </nav>
  )
}
