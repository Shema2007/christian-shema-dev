const skillGroups = [
  {
    category: 'Frontend',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Vite', 'Framer Motion'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'Tools & Workflow',
    skills: ['Git', 'Docker', 'Linux', 'VS Code', 'Figma', 'CI/CD'],
  },
]

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '6rem 2rem', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Expertise
        </p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em' }}>
          Technical Skills
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
        {skillGroups.map(group => (
          <div key={group.category} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '2rem',
          }}>
            <h3 style={{ fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.25rem' }}>
              {group.category}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {group.skills.map(skill => (
                <span key={skill} style={{
                  padding: '0.4rem 0.9rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  color: 'var(--text)',
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
