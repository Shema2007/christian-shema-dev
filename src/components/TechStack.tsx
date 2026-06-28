import { motion } from 'framer-motion'

const stack = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL', 'Redis'] },
  { category: 'AI & Tools', items: ['OpenAI API', 'GitHub Copilot', 'VS Code', 'Cursor', 'LangChain', 'Ollama'] },
  { category: 'DevOps', items: ['Git', 'Docker', 'Linux', 'Vercel', 'Replit', 'CI/CD'] },
]

const ease = [0.22, 1, 0.36, 1]

export default function TechStack() {
  return (
    <section id="tech-stack" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <p style={{ color: 'var(--blue)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>Expertise</p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>Tech Stack</h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {stack.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: gi * 0.1, ease }}
            whileHover={{ borderColor: 'rgba(59,130,246,0.3)' }}
            style={{
              background: 'var(--navy-2)',
              border: '1px solid var(--border)',
              borderRadius: '16px', padding: '1.75rem',
            }}
          >
            <h3 style={{
              fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--blue)', marginBottom: '1.25rem',
            }}>{group.category}</h3>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: gi * 0.1 } } }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
            >
              {group.items.map(item => (
                <motion.span
                  key={item}
                  variants={{
                    hidden: { opacity: 0, scale: 0.85 },
                    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 280 } },
                  }}
                  whileHover={{ scale: 1.08, borderColor: 'rgba(59,130,246,0.5)', color: 'white', background: 'rgba(59,130,246,0.08)' }}
                  style={{
                    padding: '0.35rem 0.8rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '6px', fontSize: '0.82rem',
                    color: 'var(--text-muted)', fontWeight: 500, cursor: 'default',
                  }}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
