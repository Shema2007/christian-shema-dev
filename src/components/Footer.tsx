interface FooterProps {
  setActivePage: (page: string) => void
}

export default function Footer({ setActivePage }: FooterProps) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '3rem 2rem',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{
              width: 28, height: 28,
              background: 'var(--blue)',
              borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '0.75rem',
            }}>CS</div>
            <span style={{ fontWeight: 700 }}>Christian Shema</span>
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>Code with Purpose. Build for His Glory.</p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { label: 'About', action: () => scrollTo('about') },
            { label: 'Projects', action: () => scrollTo('projects') },
            { label: 'Videos', action: () => setActivePage('videos') },
            { label: 'Contact', action: () => scrollTo('contact') },
          ].map(link => (
            <button key={link.label} onClick={link.action} style={{
              color: 'var(--text-muted)', fontSize: '0.85rem',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >{link.label}</button>
          ))}
        </div>

        <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Christian Shema. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
