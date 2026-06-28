import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = []
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      })
    }

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(108,99,255,${p.alpha})`
        ctx.fill()
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(108,99,255,${0.08 * (1 - dist / 120)})`
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(108,99,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 700, padding: '0 2rem' }}>
        <p style={{
          color: 'var(--accent)',
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          opacity: 0.8,
        }}>
          Software Developer
        </p>
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #e8e8f0 0%, #a89fff 60%, #6c63ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Christian Shema
        </h1>
        <p style={{
          color: 'var(--muted)',
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          lineHeight: 1.7,
          maxWidth: 520,
          margin: '0 auto 2.5rem',
        }}>
          I build thoughtful digital experiences — clean code, purposeful design,
          and software that actually matters to the people using it.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#projects"
            style={{
              padding: '0.85rem 2rem',
              background: 'var(--accent)',
              color: 'white',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'opacity 0.2s, transform 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            style={{
              padding: '0.85rem 2rem',
              border: '1px solid rgba(108,99,255,0.4)',
              color: 'var(--accent-light)',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(108,99,255,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.4)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Get in Touch
          </a>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--muted)',
        fontSize: '0.75rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        <span>Scroll</span>
        <div style={{
          width: 1,
          height: 40,
          background: 'linear-gradient(to bottom, var(--muted), transparent)',
          animation: 'pulse 2s infinite',
        }} />
      </div>
    </section>
  )
}
