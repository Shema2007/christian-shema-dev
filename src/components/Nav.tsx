import { useState, useEffect } from 'react'
import { Video, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavProps {
  activePage: string
  setActivePage: (page: string) => void
  onHireMe: () => void
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

const ease = [0.22, 1, 0.36, 1]

export default function Nav({ activePage, setActivePage, onHireMe }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (activePage !== 'home') return
    const ids = links.map(l => l.href).concat(['videos'])
    const visible = new Set<string>()
    const observers: IntersectionObserver[] = []

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) visible.add(id)
          else visible.delete(id)
          const first = ids.find(i => visible.has(i))
          if (first) setActiveSection(first)
        },
        { threshold: 0.25, rootMargin: '-80px 0px -30% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [activePage])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    if (href === 'videos') {
      setActivePage('videos')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (activePage !== 'home') {
      setActivePage('home')
      setTimeout(() => document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' }), 80)
    } else {
      document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isActive = (href: string) =>
    href === 'videos' ? activePage === 'videos' : activePage === 'home' && activeSection === href

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 2rem', height: 68,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(7,13,27,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
        }}
      >
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <img
            src="/logo.png"
            alt="Christian Shema"
            style={{ height: 72, width: 'auto', objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.4))' }}
          />
        </motion.button>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }} className="nav-desktop">
          {links.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 + i * 0.05, ease }}
              style={{ position: 'relative' }}
            >
              <button
                onClick={() => handleNav(link.href)}
                style={{
                  padding: '0.4rem 0.7rem',
                  color: isActive(link.href) ? 'white' : 'var(--text-muted)',
                  fontSize: '0.875rem', fontWeight: isActive(link.href) ? 600 : 500,
                  borderRadius: '7px',
                  background: isActive(link.href) ? 'rgba(255,255,255,0.07)' : 'transparent',
                  transition: 'color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => { if (!isActive(link.href)) { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}}
                onMouseLeave={e => { if (!isActive(link.href)) { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent' }}}
              >
                {link.label}
              </button>
              {isActive(link.href) && (
                <motion.div
                  layoutId="nav-dot"
                  style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'var(--blue)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.div>
          ))}

          {/* Videos */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45, ease }}
            style={{ position: 'relative' }}
          >
            <button
              onClick={() => handleNav('videos')}
              style={{
                padding: '0.4rem 0.7rem', display: 'flex', alignItems: 'center', gap: '0.35rem',
                color: activePage === 'videos' ? 'var(--blue)' : 'var(--text-muted)',
                fontSize: '0.875rem', fontWeight: activePage === 'videos' ? 600 : 500,
                borderRadius: '7px',
                background: activePage === 'videos' ? 'rgba(59,130,246,0.1)' : 'transparent',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { if (activePage !== 'videos') { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}}
              onMouseLeave={e => { if (activePage !== 'videos') { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent' }}}
            >
              <Video size={13} /> Videos
            </button>
            {activePage === 'videos' && (
              <motion.div layoutId="nav-dot" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'var(--blue)' }} />
            )}
          </motion.div>

          {/* Hire Me button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.52 }}
            whileHover={{ scale: 1.06, y: -1, boxShadow: '0 6px 22px rgba(59,130,246,0.45)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onHireMe}
            style={{
              marginLeft: '0.6rem', padding: '0.5rem 1.3rem',
              background: 'var(--blue)', color: 'white',
              borderRadius: '9px', fontWeight: 700, fontSize: '0.875rem',
              boxShadow: '0 2px 12px rgba(59,130,246,0.3)',
            }}
          >
            Hire Me
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(o => !o)}
          className="nav-hamburger"
          style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'none', alignItems: 'center', justifyContent: 'center' }}
        >
          <AnimatePresence mode="wait">
            {menuOpen
              ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={18} /></motion.div>
              : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu size={18} /></motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 998, backdropFilter: 'blur(4px)' }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(290px, 85vw)',
                background: 'var(--navy-2)', borderLeft: '1px solid var(--border)',
                zIndex: 999, padding: '5rem 1.5rem 2rem',
                display: 'flex', flexDirection: 'column', gap: '0.25rem',
              }}
            >
              <p style={{ fontSize: '0.68rem', color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>Menu</p>

              {links.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  onClick={() => handleNav(link.href)}
                  style={{
                    padding: '0.8rem 1rem', textAlign: 'left', borderRadius: '10px',
                    color: isActive(link.href) ? 'white' : 'var(--text-muted)',
                    fontWeight: isActive(link.href) ? 600 : 400, fontSize: '1rem',
                    background: isActive(link.href) ? 'rgba(59,130,246,0.1)' : 'transparent',
                    borderLeft: `2px solid ${isActive(link.href) ? 'var(--blue)' : 'transparent'}`,
                  }}
                >{link.label}</motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => handleNav('videos')}
                style={{ padding: '0.8rem 1rem', textAlign: 'left', borderRadius: '10px', color: activePage === 'videos' ? 'var(--blue)' : 'var(--text-muted)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', borderLeft: '2px solid transparent' }}
              >
                <Video size={14} /> Videos
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.46 }}
                onClick={() => { setMenuOpen(false); onHireMe() }}
                style={{ marginTop: 'auto', padding: '0.9rem', background: 'var(--blue)', color: 'white', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', boxShadow: '0 4px 16px rgba(59,130,246,0.35)' }}
              >
                Hire Me ↗
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .nav-hamburger { display: flex !important; }
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </>
  )
}
