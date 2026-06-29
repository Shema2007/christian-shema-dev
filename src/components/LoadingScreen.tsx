import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + Math.random() * 12 + 3
      })
    }, 80)

    // Phase transitions
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 900)
    const t3 = setTimeout(() => {
      setPhase(3)
      setTimeout(onComplete, 600)
    }, 2200)

    return () => { clearInterval(interval); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'var(--navy)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Background grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          {/* Glow */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              position: 'absolute', width: 400, height: 400,
              background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={phase >= 1 ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.7, type: 'spring', stiffness: 200 }}
            >
              <img
                src="/logo.png"
                alt="Shema Dev"
                style={{ height: 80, filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.6))' }}
              />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center' }}
            >
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
                Christian Shema
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Developer · Builder · Creator
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={phase >= 1 ? { opacity: 1, width: 220 } : {}}
              transition={{ duration: 0.4 }}
              style={{ position: 'relative', height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}
            >
              <motion.div
                style={{
                  position: 'absolute', left: 0, top: 0, height: '100%',
                  background: 'linear-gradient(90deg, var(--blue), #6366f1)',
                  borderRadius: '99px',
                  width: `${Math.min(progress, 100)}%`,
                  transition: 'width 0.15s ease',
                }}
              />
              {/* Shimmer */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: 0, width: '40%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', borderRadius: '99px' }}
              />
            </motion.div>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : {}}
              style={{ display: 'flex', gap: '0.4rem' }}
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                  style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--blue)' }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
