import { Globe, Cpu, Smartphone, Database, Bot, Code2 } from 'lucide-react'

const services = [
  { icon: Globe, title: 'Web Development', desc: 'Modern, fast, and responsive websites built with React, TypeScript, and cutting-edge frameworks.' },
  { icon: Bot, title: 'AI Integration', desc: 'Embedding AI tools into your workflow — chatbots, automation, and smart features powered by modern APIs.' },
  { icon: Database, title: 'Backend Systems', desc: 'Scalable APIs, databases, and server-side logic built for reliability and performance.' },
  { icon: Smartphone, title: 'Mobile-Ready Apps', desc: 'Progressive web apps that work flawlessly on every screen — mobile first, always.' },
  { icon: Cpu, title: 'System Architecture', desc: 'Designing robust, maintainable software architectures that scale with your needs.' },
  { icon: Code2, title: 'Dev Consulting', desc: 'Code reviews, tech stack advice, and hands-on guidance to level up your team.' },
]

export default function Services() {
  return (
    <section id="services" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ color: 'var(--blue)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>What I Do</p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>Services</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {services.map((s, i) => (
          <div key={i} style={{
            background: 'var(--navy-2)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '2rem',
            transition: 'border-color 0.2s, transform 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-blue)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{
              width: 48, height: 48,
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.25rem',
            }}>
              <s.icon size={22} color="var(--blue)" />
            </div>
            <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>{s.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
