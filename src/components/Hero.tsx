import { ArrowRight, Download, MessageCircle, Users } from 'lucide-react'
import { motion, useMotionValue, useSpring, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface HeroProps {
  setActivePage: (page: string) => void
}

const ease = [0.22, 1, 0.36, 1]

// Animated number counter
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const controls = animate(motionVal, target, { duration: 1.8, ease: 'easeOut' })
    const unsub = spring.on('change', v => setDisplay(Math.round(v)))
    return () => { controls.stop(); unsub() }
  }, [target])

  return <span>{display}{suffix}</span>
}

export default function Hero({ setActivePage: _setActivePage }: HeroProps) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visitorCount, setVisitorCount] = useState<number | null>(null)

  // Particle field
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
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.5, a: Math.random(),
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
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y
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

  // Visitor counter — increment once per browser session
  useEffect(() => {
    const SESSION_KEY = 'cs_visited_session'
    const alreadyVisited = sessionStorage.getItem(SESSION_KEY)

    const fetchAndSet = async (increment: boolean) => {
      try {
        const res = await fetch(increment ? '/api/visitors' : '/api/visitors', {
          method: increment ? 'POST' : 'GET',
          headers: increment ? { 'Content-Type': 'application/json' } : {},
        })
        const data = await res.json()
        setVisitorCount(data.count ?? 0)
        if (increment) sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        setVisitorCount(null)
      }
    }

    fetchAndSet(!alreadyVisited)
  }, [])

  const stats = [
    { num: 3, suffix: '+', label: 'Years Experience' },
    { num: 20, suffix: '+', label: 'Projects Shipped' },
    { num: 10, suffix: '+', label: 'Happy Clients' },
  ]

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '0 2rem', paddingTop: '80px',
      position: 'relative', overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse, rgba(59,130,246,0.13) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '15%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: 820, zIndex: 1 }}>
        {/* Visitor badge */}
        {visitorCount !== null && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              padding: '0.3rem 0.85rem',
              background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '99px', fontSize: '0.75rem', color: '#a5b4fc',
              fontWeight: 500, marginBottom: '0.75rem',
            }}
          >
            <Users size={11} />
            <span style={{ fontWeight: 700, color: 'white' }}>{visitorCount.toLocaleString()}</span>
            &nbsp;developers have visited this portfolio
          </motion.div>
        )}

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            padding: '0.35rem 1rem',
            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
            borderRadius: '99px', fontSize: '0.8rem', color: 'var(--blue)', fontWeight: 500,
            marginBottom: '2rem', width: 'fit-content', margin: '0 auto 2rem',
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', display: 'inline-block' }}
          />
          Available for Work
        </motion.div>

        {/* Headline */}
        <motion.h1
          style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 900,
            lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: '1.5rem',
          }}
        >
          {['Code', 'with'].map((word, i) => (
            <motion.span key={word} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 + i * 0.1, ease }} style={{ display: 'inline-block', marginRight: '0.25em' }}>{word}</motion.span>
          ))}
          <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.4, ease }} style={{ color: 'var(--blue)', display: 'inline-block' }}>Purpose.</motion.span>
          <br />
          {['Build', 'for', 'His', 'Glory.'].map((word, i) => (
            <motion.span key={word} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.5 + i * 0.08, ease }} style={{ display: 'inline-block', marginRight: '0.25em' }}>{word}</motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease }}
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 2.5rem' }}
        >
          Precision engineering for the modern web. I design and build scalable,
          reliable, and high-performing digital systems.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2, boxShadow: '0 8px 24px rgba(59,130,246,0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('projects')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.75rem', background: 'var(--blue)', color: 'white', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', boxShadow: '0 2px 12px rgba(59,130,246,0.3)' }}
          >
            View My Work <ArrowRight size={16} />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="/cv.pdf"
            download
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.75rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '10px', fontWeight: 600, fontSize: '0.95rem' }}
          >
            <Download size={16} /> Download CV
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.04, y: -2, borderColor: 'var(--blue)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('contact')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.75rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: '10px', fontWeight: 600, fontSize: '0.95rem' }}
          >
            <MessageCircle size={16} /> Let's Talk
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}
        >
          {stats.map((s, i) => (
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
                <CountUp target={s.num} suffix={s.suffix} />
              </motion.p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{s.label}</p>
            </motion.div>
          ))}

          {/* Live visitors stat */}
          {visitorCount !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.45, ease }}
              style={{ textAlign: 'center' }}
            >
              <motion.p
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 1.5, stiffness: 200 }}
                style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em' }}
              >
                <motion.span style={{ color: '#a5b4fc' }}>
                  <CountUp target={visitorCount} />
                </motion.span>
              </motion.p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <Users size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                Total Visitors
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
