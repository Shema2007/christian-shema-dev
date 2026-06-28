import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'AI Website Builder',
    desc: 'A tool that uses GPT-4 to generate full React websites from plain English descriptions. Deployed and used by 100+ developers.',
    tags: ['React', 'OpenAI', 'Node.js'],
    github: '#', live: '#',
    featured: true,
  },
  {
    title: 'Dev Dashboard',
    desc: 'GitHub activity aggregator and task tracker built for developers who want everything in one focused view.',
    tags: ['TypeScript', 'GitHub API', 'Vite'],
    github: '#', live: '#',
    featured: false,
  },
  {
    title: 'Church Management System',
    desc: 'Full-stack app for managing church members, events, finances, and communications — built to serve ministries.',
    tags: ['React', 'PostgreSQL', 'Express'],
    github: '#', live: '#',
    featured: false,
  },
  {
    title: 'VS Code Extension Pack',
    desc: 'A curated VS Code extension and snippet pack for AI-assisted development workflows — 500+ installs.',
    tags: ['VS Code', 'TypeScript', 'AI Tools'],
    github: '#', live: '#',
    featured: false,
  },
]

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ color: 'var(--blue)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>My Work</p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>Projects</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {projects.map((p, i) => (
          <div key={i} style={{
            background: 'var(--navy-2)',
            border: p.featured ? '1px solid rgba(59,130,246,0.35)' : '1px solid var(--border)',
            borderRadius: '16px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            transition: 'transform 0.2s, border-color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {p.featured && (
              <span style={{
                position: 'absolute', top: '1rem', right: '1rem',
                padding: '0.2rem 0.6rem',
                background: 'rgba(59,130,246,0.15)',
                border: '1px solid rgba(59,130,246,0.3)',
                borderRadius: '99px',
                fontSize: '0.7rem',
                color: 'var(--blue)',
                fontWeight: 600,
              }}>Featured</span>
            )}
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{p.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem', flex: 1 }}>{p.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {p.tags.map(tag => (
                <span key={tag} style={{
                  padding: '0.2rem 0.65rem',
                  background: 'rgba(59,130,246,0.08)',
                  border: '1px solid rgba(59,130,246,0.15)',
                  borderRadius: '99px',
                  fontSize: '0.72rem',
                  color: 'var(--blue)',
                  fontWeight: 500,
                }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href={p.github} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.82rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              ><Github size={14} /> Code</a>
              <a href={p.live} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.82rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--blue)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              ><ExternalLink size={14} /> Live Demo</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
