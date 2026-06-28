const stack = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL', 'Redis'] },
  { category: 'AI & Tools', items: ['OpenAI API', 'GitHub Copilot', 'VS Code', 'Cursor', 'LangChain', 'Ollama'] },
  { category: 'DevOps', items: ['Git', 'Docker', 'Linux', 'Vercel', 'Replit', 'CI/CD'] },
]

export default function TechStack() {
  return (
    <section id="tech-stack" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ color: 'var(--blue)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>Expertise</p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>Tech Stack</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {stack.map(group => (
          <div key={group.category} style={{
            background: 'var(--navy-2)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '1.75rem',
          }}>
            <h3 style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--blue)',
              marginBottom: '1.25rem',
            }}>{group.category}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {group.items.map(item => (
                <span key={item} style={{
                  padding: '0.35rem 0.8rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  fontWeight: 500,
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'; e.currentTarget.style.color = 'white' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
