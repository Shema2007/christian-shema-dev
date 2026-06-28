export default function About() {
  return (
    <section id="about" style={{ padding: '6rem 2rem', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <p style={{ color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            About Me
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Turning ideas into <span style={{ color: 'var(--accent-light)' }}>reality</span>
          </h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
            I'm a software developer who loves the intersection of elegant engineering and
            intentional design. I build web applications that are fast, accessible,
            and genuinely useful.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
            When I'm not coding, I'm exploring new technologies, contributing to
            open source, or thinking about how software can better serve the people who use it.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[
            { label: 'Years Experience', value: '3+' },
            { label: 'Projects Shipped', value: '20+' },
            { label: 'Technologies', value: '15+' },
            { label: 'Happy Clients', value: '10+' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-light)', letterSpacing: '-0.03em' }}>
                {stat.value}
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
