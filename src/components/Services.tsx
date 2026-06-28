import { Globe, Cpu, Smartphone, Database, Bot, Code2 } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  { icon: Globe, title: 'Web Development', desc: 'Modern, fast, and responsive websites built with React, TypeScript, and cutting-edge frameworks.' },
  { icon: Bot, title: 'AI Integration', desc: 'Embedding AI tools into your workflow — chatbots, automation, and smart features powered by modern APIs.' },
  { icon: Database, title: 'Backend Systems', desc: 'Scalable APIs, databases, and server-side logic built for reliability and performance.' },
  { icon: Smartphone, title: 'Mobile-Ready Apps', desc: 'Progressive web apps that work flawlessly on every screen — mobile first, always.' },
  { icon: Cpu, title: 'System Architecture', desc: 'Designing robust, maintainable software architectures that scale with your needs.' },
  { icon: Code2, title: 'Dev Consulting', desc: 'Code reviews, tech stack advice, and hands-on guidance to level up your team.' },
]

const ease = [0.22, 1, 0.36, 1]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease },
  }),
}

export default function Services() {
  return (
    <section id="services" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <p style={{ color: 'var(--blue)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>What I Do</p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>Services</h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {services.map((s, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            whileHover={{ y: -6, borderColor: 'rgba(59,130,246,0.4)', boxShadow: '0 12px 40px rgba(59,130,246,0.1)' }}
            style={{
              background: 'var(--navy-2)',
              border: '1px solid var(--border)',
              borderRadius: '16px', padding: '2rem',
              cursor: 'default',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                width: 48, height: 48,
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.25rem',
              }}
            >
              <s.icon size={22} color="var(--blue)" />
            </motion.div>
            <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>{s.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
