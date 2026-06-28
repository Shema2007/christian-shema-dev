import { ArrowRight, Download, MessageCircle } from 'lucide-react'

interface HeroProps {
  setActivePage: (page: string) => void
}

export default function Hero({ setActivePage }: HeroProps) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 2rem',
      paddingTop: '80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', maxWidth: 800 }}>
        {/* Badge */}
        <div className="fade-up" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.35rem 1rem',
          background: 'rgba(59,130,246,0.1)',
          border: '1px solid rgba(59,130,246,0.25)',
          borderRadius: '99px',
          fontSize: '0.8rem',
          color: 'var(--blue)',
          fontWeight: 500,
          marginBottom: '2rem',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', display: 'inline-block' }} />
          Available for Work
        </div>

        {/* Headline */}
        <h1 className="fade-up-1" style={{
          fontSize: 'clamp(3rem, 8vw, 5.5rem)',
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          marginBottom: '1.5rem',
        }}>
          Code with{' '}
          <span style={{ color: 'var(--blue)' }}>Purpose.</span>
          <br />
          Build for His Glory.
        </h1>

        {/* Subtitle */}
        <p className="fade-up-2" style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
          color: 'var(--text-muted)',
          lineHeight: 1.75,
          maxWidth: 560,
          margin: '0 auto 2.5rem',
        }}>
          Precision engineering for the modern web. I design and build scalable,
          reliable, and high-performing digital systems.
        </p>

        {/* CTAs */}
        <div className="fade-up-3" style={{
          display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
        }}>
          <button
            onClick={() => scrollTo('projects')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              background: 'var(--blue)',
              color: 'white',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.95rem',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue-dark)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--blue)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            View My Work <ArrowRight size={16} />
          </button>

          <a
            href="/cv.pdf"
            download
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <Download size={16} /> Download CV
          </a>

          <button
            onClick={() => scrollTo('contact')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'border-color 0.2s, background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.background = 'rgba(59,130,246,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <MessageCircle size={16} /> Let's Talk
          </button>
        </div>

        {/* Stats row */}
        <div className="fade-up-4" style={{
          display: 'flex', justifyContent: 'center', gap: '3rem',
          marginTop: '4rem',
          paddingTop: '3rem',
          borderTop: '1px solid var(--border)',
          flexWrap: 'wrap',
        }}>
          {[
            { num: '3+', label: 'Years Experience' },
            { num: '20+', label: 'Projects Shipped' },
            { num: '10+', label: 'Happy Clients' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>{s.num}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
