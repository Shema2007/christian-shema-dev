import { ArrowRight, Download, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface HeroProps {
  setActivePage: (page: string) => void
}

const ease = [0.22, 1, 0.36, 1]

export default function Hero({ setActivePage }: HeroProps) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animated particle field
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const dots: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = []
    for (let i = 0; i < 55; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random(),
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59,130,246,${d.a * 0.5})`
        ctx.fill()
      })
      // Draw connecting lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(59,130,246,${0.12 * (1 - dist / 110)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

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
      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      {/* Radial glows */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse, rgba(59,130,246,0.13) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '15%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '30%', right: '10%', width: 250, height: 250, background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: 820, zIndex: 1 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.35rem 1rem',
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.25)',
            borderRadius: '99px',
            fontSize: '0.8rem',
            color: 'var(--blue)',
            fontWeight: 500,
            marginBottom: '2rem',
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', display: 'inline-block' }}
          />
          Available for Work
        </motion.div>

        {/* Headline — word by word */}
        <motion.h1
          style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            marginBottom: '1.5rem',
          }}
        >
          {['Code', 'with'].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.1, ease }}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease }}
            style={{ color: 'var(--blue)', display: 'inline-block' }}
          >
            Purpose.
          </motion.span>
          <br />
          {['Build', 'for', 'His', 'Glory.'].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.45 + i * 0.08, ease }}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease }}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.75,
            maxWidth: 560,
            margin: '0 auto 2.5rem',
          }}
        >
          Precision engineering for the modern web. I design and build scalable,
          reliable, and high-performing digital systems.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('projects')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              background: 'var(--blue)', color: 'white',
              borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem',
            }}
          >
            View My Work <ArrowRight size={16} />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="/cv.pdf"
            download
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white', borderRadius: '10px', fontWeight: 600, fontSize: '0.95rem',
            }}
          >
            <Download size={16} /> Download CV
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.04, y: -2, borderColor: 'var(--blue)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('contact')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white', borderRadius: '10px', fontWeight: 600, fontSize: '0.95rem',
            }}
          >
            <MessageCircle size={16} /> Let's Talk
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{
            display: 'flex', justifyContent: 'center', gap: '3rem',
            marginTop: '4rem', paddingTop: '3rem',
            borderTop: '1px solid var(--border)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { num: '3+', label: 'Years Experience' },
            { num: '20+', label: 'Projects Shipped' },
            { num: '10+', label: 'Happy Clients' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.15 + i * 0.1, ease }}
              style={{ textAlign: 'center' }}
            >
              <motion.p
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 1.2 + i * 0.1, stiffness: 200 }}
                style={{ fontSize: '2rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}
              >
                {s.num}
              </motion.p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
