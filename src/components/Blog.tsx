import { ArrowRight, Calendar } from 'lucide-react'

const posts = [
  {
    title: 'How I Use GitHub Copilot to Build Faster Without Losing Control',
    date: 'June 15, 2025',
    excerpt: 'AI coding assistants are powerful — but only if you use them intentionally. Here\'s my workflow for staying in the driver\'s seat.',
    tag: 'AI Tools',
  },
  {
    title: 'VS Code Setup for Full-Stack Development in 2025',
    date: 'May 28, 2025',
    excerpt: 'My complete VS Code configuration — extensions, keybindings, and snippets that make me significantly more productive every day.',
    tag: 'Productivity',
  },
  {
    title: 'Building a Church Management System with React + PostgreSQL',
    date: 'May 10, 2025',
    excerpt: 'A deep dive into architecting a real-world app that serves a ministry — from requirements gathering to deployment.',
    tag: 'Projects',
  },
]

export default function Blog() {
  return (
    <section id="blog" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p style={{ color: 'var(--blue)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>Thoughts</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>Blog</h2>
        </div>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--blue)', fontSize: '0.875rem', fontWeight: 600 }}>
          All Posts <ArrowRight size={14} />
        </a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {posts.map((post, i) => (
          <article key={i} style={{
            background: 'var(--navy-2)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '2rem',
            cursor: 'pointer',
            transition: 'border-color 0.2s, transform 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-blue)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <span style={{
              display: 'inline-block',
              padding: '0.2rem 0.65rem',
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: '99px',
              fontSize: '0.7rem',
              color: 'var(--blue)',
              fontWeight: 600,
              marginBottom: '1rem',
            }}>{post.tag}</span>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.4, marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{post.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{post.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.78rem' }}>
              <Calendar size={12} /> {post.date}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
