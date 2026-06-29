import { Mail, Phone, ArrowUp } from 'lucide-react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

interface FooterProps {
  setActivePage: (page: string) => void
  onHireMe: () => void
}

const ease = [0.22, 1, 0.36, 1]

const GITHUB_SVG = (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>)
const LINKEDIN_SVG = (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>)
const TWITTER_SVG = (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.213 5.567L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>)
const YOUTUBE_SVG = (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>)

function BackToTop() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  useMotionValueEvent(scrollY, 'change', v => setVisible(v > 500))
  return (
    <motion.button
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.85 }}
      transition={{ duration: 0.3, ease }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      whileHover={{ scale: 1.12, boxShadow: '0 8px 28px rgba(59,130,246,0.45)' }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 900,
        width: 48, height: 48, borderRadius: '12px',
        background: 'linear-gradient(135deg, var(--blue), #6366f1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(59,130,246,0.35)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <ArrowUp size={20} color="white" />
    </motion.button>
  )
}

export default function Footer({ setActivePage, onHireMe }: FooterProps) {
  const scrollTo = (id: string) => {
    if (id === 'videos') { setActivePage('videos'); window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navCols = [
    {
      title: 'Navigation',
      links: [
        { label: 'About', id: 'about' },
        { label: 'Services', id: 'services' },
        { label: 'Projects', id: 'projects' },
        { label: 'Blog', id: 'blog' },
      ],
    },
    {
      title: 'More',
      links: [
        { label: 'Tech Stack', id: 'tech-stack' },
        { label: 'Testimonials', id: 'testimonials' },
        { label: 'Contact', id: 'contact' },
        { label: 'Videos', id: 'videos' },
      ],
    },
  ]

  return (
    <>
      <BackToTop />
      <footer style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Gradient top line */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(99,102,241,0.4), transparent)' }} />

        {/* Background glow */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 250, background: 'radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 2rem 3rem', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '3rem', marginBottom: '4rem' }}>

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <div style={{ marginBottom: '1.25rem' }}>
                <img src="/logo.png" alt="Shema Dev" style={{ height: 44, filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.4))' }} />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.8, maxWidth: 270, marginBottom: '1.5rem' }}>
                Full-stack developer building precise, purposeful software — faith-driven and detail-obsessed.
              </p>
              {/* Status badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.9rem', background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '99px', marginBottom: '1.75rem' }}>
                <motion.span animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2.2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#4ade80' }}>Available for new projects</span>
              </div>
              {/* Socials */}
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                {[
                  { icon: GITHUB_SVG, href: 'https://github.com/Shema2007', label: 'GitHub' },
                  { icon: LINKEDIN_SVG, href: '#', label: 'LinkedIn' },
                  { icon: TWITTER_SVG, href: '#', label: 'Twitter' },
                  { icon: YOUTUBE_SVG, href: '#', label: 'YouTube' },
                ].map(s => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.14, y: -2, background: 'rgba(59,130,246,0.2)', borderColor: 'rgba(59,130,246,0.4)', color: 'var(--blue)' }}
                    style={{ width: 38, height: 38, borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
                  >{s.icon}</motion.a>
                ))}
              </div>
            </motion.div>

            {/* Nav cols */}
            {navCols.map((col, ci) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + ci * 0.1, ease }}
              >
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>{col.title}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {col.links.map(link => (
                    <motion.button key={link.label} onClick={() => scrollTo(link.id)} whileHover={{ x: 4, color: 'white' }} style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                      {link.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Contact col */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
            >
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>Get in Touch</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <motion.a href="mailto:christianirasubizashema@gmail.com" whileHover={{ x: 3, color: 'white' }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', transition: 'color 0.2s' }}>
                  <Mail size={13} color="var(--blue)" /> christianirasubizashema@gmail.com
                </motion.a>
                <motion.a href="tel:+250792773683" whileHover={{ x: 3, color: 'white' }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', transition: 'color 0.2s' }}>
                  <Phone size={13} color="var(--blue)" /> +250 792 773 683
                </motion.a>
              </div>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 6px 22px rgba(59,130,246,0.38)' }}
                whileTap={{ scale: 0.97 }}
                onClick={onHireMe}
                style={{ width: '100%', padding: '0.75rem', background: 'var(--blue)', color: 'white', borderRadius: '10px', fontWeight: 700, fontSize: '0.875rem', boxShadow: '0 2px 12px rgba(59,130,246,0.25)' }}
              >
                Work With Me ↗
              </motion.button>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>© {new Date().getFullYear()} Christian Shema. All rights reserved.</p>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>Built with React · Framer Motion · Express · Node.js</p>
          </div>
        </div>
      </footer>
    </>
  )
}
