export default function About() {
  return (
    <section id="about" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
        {/* Left: photo placeholder */}
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '100%',
            aspectRatio: '4/5',
            background: 'var(--navy-3)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '5rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, transparent 60%)',
            }} />
            <span>👨‍💻</span>
          </div>
          {/* Floating badge */}
          <div style={{
            position: 'absolute',
            bottom: '2rem', right: '-1.5rem',
            background: 'var(--blue)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>3+</p>
            <p style={{ fontSize: '0.7rem', opacity: 0.85 }}>Years Coding</p>
          </div>
        </div>

        {/* Right: text */}
        <div>
          <p style={{ color: 'var(--blue)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>
            About Me
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Passionate Developer.<br />
            <span style={{ color: 'var(--blue)' }}>Faith-driven Builder.</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
            I'm Christian Shema — a software developer who believes technology is a gift to be used purposefully.
            I specialize in building full-stack web applications, AI-integrated tools, and systems that solve real problems.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '2rem' }}>
            I love sharing knowledge through video — showing how AI tools like GitHub Copilot and VS Code
            extensions can accelerate development and help others learn faster.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['React', 'TypeScript', 'Node.js', 'Python', 'AI Tools', 'VS Code'].map(tag => (
              <span key={tag} style={{
                padding: '0.35rem 0.9rem',
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: '6px',
                fontSize: '0.8rem',
                color: 'var(--blue)',
                fontWeight: 500,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
