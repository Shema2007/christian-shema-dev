const projects = [
  {
    title: 'Project Alpha',
    description: 'A full-stack web application built with React and Node.js, featuring real-time updates and a clean, intuitive interface.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    link: '#',
  },
  {
    title: 'Dev Dashboard',
    description: 'A developer productivity dashboard that aggregates GitHub activity, tasks, and metrics in one focused view.',
    tags: ['TypeScript', 'Vite', 'REST APIs'],
    link: '#',
  },
  {
    title: 'Open Source Tool',
    description: 'A CLI utility that automates repetitive development workflows, saving teams hours every week.',
    tags: ['Python', 'CLI', 'Automation'],
    link: '#',
  },
  {
    title: 'Mobile-First App',
    description: 'A responsive web app designed mobile-first, with smooth animations and offline support via service workers.',
    tags: ['React', 'PWA', 'CSS'],
    link: '#',
  },
]

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          My Work
        </p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em' }}>
          Selected Projects
        </h2>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        {projects.map((project, i) => (
          <a
            key={i}
            href={project.link}
            style={{
              display: 'block',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '2rem',
              transition: 'border-color 0.2s, transform 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(108,99,255,0.4)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div style={{
              width: 40,
              height: 40,
              background: 'rgba(108,99,255,0.12)',
              borderRadius: '10px',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <h3 style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              {project.title}
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {project.description}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(108,99,255,0.1)',
                  color: 'var(--accent-light)',
                  borderRadius: '99px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
