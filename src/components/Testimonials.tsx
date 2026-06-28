import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Startup Founder',
    quote: 'Christian built our entire product from scratch — clean code, on time, and genuinely cared about making it work well. Exceptional.',
    stars: 5,
  },
  {
    name: 'Pastor James K.',
    role: 'Church Leader',
    quote: 'The church management system he built transformed how we operate. He understood our mission and built something that truly serves us.',
    stars: 5,
  },
  {
    name: 'David R.',
    role: 'Tech Lead',
    quote: 'Brought him in for a consulting session and walked away with a clear architecture plan and actionable steps. Highly recommend.',
    stars: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ color: 'var(--blue)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>Social Proof</p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>Testimonials</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{
            background: 'var(--navy-2)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '2rem',
            transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-blue)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.25rem' }}>
              {Array.from({ length: t.stars }).map((_, j) => (
                <Star key={j} size={14} fill="var(--blue)" color="var(--blue)" />
              ))}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.5rem', fontStyle: 'italic' }}>
              "{t.quote}"
            </p>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</p>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
