import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const tags = ['React', 'TypeScript', 'Node.js', 'Python', 'AI Tools', 'VS Code']

export default function About() {
  return (
    <section id="about" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>

        {/* Left: photo card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          style={{ position: 'relative' }}
        >
          <div style={{
            width: '100%', aspectRatio: '4/5',
            background: 'var(--navy-3)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '5rem', position: 'relative', overflow: 'hidden',
          }}>
            <motion.div
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, transparent 60%)',
              }}
            />
            <span>👨‍💻</span>
          </div>
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 200 }}
            animate={{ y: [0, -6, 0] }}
            style={{
              position: 'absolute', bottom: '2rem', right: '-1.5rem',
              background: 'var(--blue)', borderRadius: '12px',
              padding: '1rem 1.25rem', textAlign: 'center',
              boxShadow: '0 8px 30px rgba(59,130,246,0.4)',
            }}
          >
            <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>3+</p>
            <p style={{ fontSize: '0.7rem', opacity: 0.85 }}>Years Coding</p>
          </motion.div>
        </motion.div>

        {/* Right: text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ color: 'var(--blue)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}
          >
            About Me
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '1.5rem' }}
          >
            Passionate Developer.<br />
            <span style={{ color: 'var(--blue)' }}>Faith-driven Builder.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.25rem' }}
          >
            I'm Christian Shema — a software developer who believes technology is a gift to be used purposefully.
            I specialize in building full-stack web applications, AI-integrated tools, and systems that solve real problems.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '2rem' }}
          >
            I love sharing knowledge through video — showing how AI tools like GitHub Copilot and VS Code
            extensions can accelerate development and help others learn faster.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
          >
            {tags.map(tag => (
              <motion.span
                key={tag}
                variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300 } } }}
                whileHover={{ scale: 1.08, borderColor: 'rgba(59,130,246,0.6)', color: 'white' }}
                style={{
                  padding: '0.35rem 0.9rem',
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  borderRadius: '6px', fontSize: '0.8rem',
                  color: 'var(--blue)', fontWeight: 500, cursor: 'default',
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
