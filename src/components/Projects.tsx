import { ArrowRight, ExternalLink } from 'lucide-react'

const projects = [
  {
    id: 1,
    badge: 'Live',
    title: 'Kapo Kitchenware',
    desc: 'A production e-commerce site built for Kapo Kitchenware — a local brand selling premium kitchen tools. Features clean product browsing, a responsive mobile-first layout, and a smooth checkout experience built for new customers.',
    tags: ['React', 'Node.js', 'Tailwind', 'E-Commerce'],
    link: '#',
    gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    visual: 'ecommerce',
  },
  {
    id: 2,
    badge: 'Live',
    title: 'SaaS Dashboard',
    desc: 'A full-stack SaaS dashboard for processing large datasets in real time. Built for teams that need live metrics, dynamic charting, and a robust multi-tenant auth layer.',
    tags: ['React', 'Node.js', 'MongoDB', 'WebSocket'],
    link: '#',
    gradient: 'linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #0a3055 100%)',
    visual: 'dashboard',
  },
  {
    id: 3,
    badge: 'Live',
    title: 'API Gateway System',
    desc: 'A production-grade API gateway built on a microservices architecture. Designed for high throughput, low latency, and fault tolerance across distributed services.',
    tags: ['Express', 'Docker', 'AWS', 'GraphQL'],
    link: '#',
    gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    visual: 'api',
  },
  {
    id: 4,
    badge: 'Live',
    title: 'Mobile-First Web App',
    desc: 'A mobile-first progressive web application designed to work seamlessly in low-connectivity environments. Built with service workers, background sync, and smooth native-feeling transitions.',
    tags: ['TypeScript', 'React', 'Tailwind', 'PWA'],
    link: '#',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    visual: 'mobile',
  },
  {
    id: 5,
    badge: 'Live',
    title: 'Corporate Hub',
    desc: 'A high-performance corporate website and intranet portal with a headless CMS backend. Heavily optimised for SEO and designed to load fast globally via edge delivery.',
    tags: ['Next.js', 'Vercel', 'Sanity CMS', 'SEO'],
    link: '#',
    gradient: 'linear-gradient(135deg, #0a0e27 0%, #12162e 50%, #1a1f3a 100%)',
    visual: 'corporate',
  },
  {
    id: 6,
    badge: 'Live',
    title: 'Portfolio CMS',
    desc: 'A custom-built CMS and showcase platform tailored for photographers and designers. It features a drag-and-drop gallery editor, custom asset delivery pipeline, and client-facing proofing.',
    tags: ['React', 'PostgreSQL', 'AWS S3', 'Lambda'],
    link: '#',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #11998e 100%)',
    visual: 'cms',
  },
]

function ProjectVisual({ type, gradient }: { type: string; gradient: string }) {
  const visuals: Record<string, React.ReactNode> = {
    ecommerce: (
      <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.85 }}>
        <rect x="30" y="20" width="80" height="80" rx="8" fill="none" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5"/>
        <rect x="40" y="30" width="60" height="45" rx="4" fill="rgba(59,130,246,0.15)"/>
        <circle cx="70" cy="52" r="12" fill="rgba(99,179,237,0.4)"/>
        <rect x="40" y="82" width="60" height="8" rx="4" fill="rgba(59,130,246,0.3)"/>
        <rect x="130" y="20" width="140" height="30" rx="6" fill="rgba(255,255,255,0.06)"/>
        <rect x="130" y="58" width="100" height="8" rx="4" fill="rgba(255,255,255,0.08)"/>
        <rect x="130" y="74" width="80" height="8" rx="4" fill="rgba(255,255,255,0.05)"/>
        <rect x="130" y="100" width="60" height="24" rx="6" fill="rgba(59,130,246,0.5)"/>
        <rect x="30" y="120" width="240" height="1" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        <circle cx="50" cy="150" r="10" fill="rgba(59,130,246,0.2)" stroke="rgba(59,130,246,0.4)" strokeWidth="1"/>
        <circle cx="90" cy="150" r="10" fill="rgba(59,130,246,0.2)" stroke="rgba(59,130,246,0.4)" strokeWidth="1"/>
        <rect x="115" y="140" width="120" height="20" rx="5" fill="rgba(255,255,255,0.04)"/>
      </svg>
    ),
    dashboard: (
      <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.85 }}>
        <rect x="20" y="20" width="80" height="45" rx="6" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.25)" strokeWidth="1"/>
        <rect x="30" y="40" width="20" height="15" rx="2" fill="rgba(99,179,237,0.5)"/>
        <rect x="58" y="33" width="20" height="22" rx="2" fill="rgba(59,130,246,0.6)"/>
        <rect x="86" y="28" width="6" height="27" rx="2" fill="rgba(99,179,237,0.3)"/>
        <rect x="110" y="20" width="170" height="45" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
        <polyline points="120,55 145,35 165,45 185,28 210,38 245,25 270,35" fill="none" stroke="rgba(59,130,246,0.7)" strokeWidth="2"/>
        <rect x="20" y="75" width="260" height="90" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        <rect x="30" y="85" width="50" height="6" rx="3" fill="rgba(255,255,255,0.1)"/>
        <rect x="30" y="100" width="240" height="55" rx="4" fill="rgba(255,255,255,0.02)"/>
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={30} y={105 + i * 10} width={200 - i * 20} height="6" rx="3" fill={`rgba(59,130,246,${0.15 - i * 0.02})`}/>
        ))}
      </svg>
    ),
    api: (
      <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.85 }}>
        <circle cx="150" cy="90" r="30" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5"/>
        <text x="150" y="95" textAnchor="middle" fill="rgba(59,130,246,0.9)" fontSize="10" fontWeight="700">API</text>
        {[
          { x: 50, y: 40 }, { x: 50, y: 90 }, { x: 50, y: 140 },
          { x: 250, y: 40 }, { x: 250, y: 90 }, { x: 250, y: 140 },
        ].map((n, i) => (
          <g key={i}>
            <rect x={n.x - 20} y={n.y - 12} width="40" height="24" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
            <line x1={n.x > 150 ? n.x - 20 : n.x + 20} y1={n.y} x2={n.x > 150 ? 182 : 118} y2={n.y > 90 ? 105 : n.y < 90 ? 75 : 90} stroke="rgba(59,130,246,0.3)" strokeWidth="1" strokeDasharray="3,3"/>
          </g>
        ))}
        <circle cx="150" cy="90" r="50" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1" strokeDasharray="4,4"/>
        <circle cx="150" cy="90" r="70" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="1" strokeDasharray="4,8"/>
      </svg>
    ),
    mobile: (
      <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.85 }}>
        <rect x="100" y="15" width="100" height="160" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
        <rect x="130" y="20" width="40" height="5" rx="3" fill="rgba(255,255,255,0.1)"/>
        <rect x="110" y="32" width="80" height="50" rx="4" fill="rgba(59,130,246,0.15)"/>
        <rect x="110" y="90" width="80" height="8" rx="4" fill="rgba(255,255,255,0.06)"/>
        <rect x="110" y="105" width="60" height="6" rx="3" fill="rgba(255,255,255,0.04)"/>
        <rect x="110" y="120" width="80" height="28" rx="6" fill="rgba(59,130,246,0.25)"/>
        <rect x="30" y="50" width="60" height="90" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
        <rect x="210" y="50" width="60" height="90" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
        <rect x="38" y="62" width="44" height="30" rx="4" fill="rgba(59,130,246,0.1)"/>
        <rect x="218" y="62" width="44" height="30" rx="4" fill="rgba(59,130,246,0.1)"/>
      </svg>
    ),
    corporate: (
      <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.85 }}>
        <rect x="20" y="15" width="260" height="30" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <rect x="30" y="24" width="40" height="12" rx="3" fill="rgba(59,130,246,0.4)"/>
        <rect x="180" y="24" width="20" height="12" rx="3" fill="rgba(255,255,255,0.06)"/>
        <rect x="208" y="24" width="20" height="12" rx="3" fill="rgba(255,255,255,0.06)"/>
        <rect x="236" y="24" width="34" height="12" rx="3" fill="rgba(59,130,246,0.5)"/>
        <rect x="20" y="55" width="260" height="70" rx="6" fill="rgba(59,130,246,0.06)"/>
        <rect x="40" y="70" width="120" height="16" rx="4" fill="rgba(255,255,255,0.1)"/>
        <rect x="40" y="93" width="80" height="8" rx="4" fill="rgba(255,255,255,0.05)"/>
        <rect x="40" y="107" width="60" height="10" rx="4" fill="rgba(59,130,246,0.4)"/>
        {[0,1,2].map(i => (
          <rect key={i} x={20 + i * 90} y={135} width="80" height="40" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        ))}
      </svg>
    ),
    cms: (
      <svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.85 }}>
        {[
          { x: 20, y: 20, w: 80, h: 55 },
          { x: 108, y: 20, w: 80, h: 55 },
          { x: 196, y: 20, w: 84, h: 55 },
          { x: 20, y: 83, w: 80, h: 55 },
          { x: 108, y: 83, w: 80, h: 55 },
          { x: 196, y: 83, w: 84, h: 55 },
        ].map((r, i) => (
          <g key={i}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
            <rect x={r.x + 6} y={r.y + 6} width={r.w - 12} height={r.h - 22} rx="3" fill={`rgba(59,130,246,${0.08 + (i % 3) * 0.05})`}/>
          </g>
        ))}
        <rect x="20" y="148" width="260" height="20" rx="6" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.3)" strokeWidth="1"/>
        <rect x="30" y="154" width="40" height="8" rx="4" fill="rgba(59,130,246,0.5)"/>
        <rect x="200" y="154" width="70" height="8" rx="4" fill="rgba(255,255,255,0.06)"/>
      </svg>
    ),
  }

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: gradient,
      overflow: 'hidden',
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />
      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)',
      }} />
      {visuals[type]}
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p style={{ color: 'var(--blue)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.6rem' }}>Portfolio</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>Featured Projects</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: 260, lineHeight: 1.6, marginTop: '0.25rem' }}>
          A curated selection of real projects — shipped, live, and built for results.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
        gap: '1.5rem',
      }}>
        {projects.map(project => (
          <div key={project.id} style={{
            background: 'var(--navy-2)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            overflow: 'hidden',
            transition: 'border-color 0.25s, transform 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'; e.currentTarget.style.transform = 'translateY(-5px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {/* Image area */}
            <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
              <ProjectVisual type={project.visual} gradient={project.gradient} />

              {/* Badge */}
              <div style={{
                position: 'absolute', top: '0.85rem', left: '0.85rem',
                padding: '0.2rem 0.6rem',
                background: 'rgba(59,130,246,0.25)',
                border: '1px solid rgba(59,130,246,0.45)',
                borderRadius: '99px',
                fontSize: '0.65rem',
                fontWeight: 700,
                color: '#93c5fd',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                backdropFilter: 'blur(6px)',
              }}>{project.badge}</div>

              {/* External link icon */}
              <a href={project.link} style={{
                position: 'absolute', top: '0.75rem', right: '0.75rem',
                width: 30, height: 30,
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(6px)',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.5)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
              >
                <ExternalLink size={13} color="white" />
              </a>
            </div>

            {/* Content */}
            <div style={{ padding: '1.4rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>
                {project.title}
              </h3>
              <p style={{
                color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.7,
                marginBottom: '1.1rem',
                display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {project.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '0.2rem 0.6rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '5px',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    fontWeight: 500,
                  }}>{tag}</span>
                ))}
              </div>

              {/* View Case Study */}
              <a href={project.link} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                color: 'var(--blue)',
                fontSize: '0.82rem',
                fontWeight: 600,
                transition: 'gap 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.gap = '0.55rem' }}
                onMouseLeave={e => { e.currentTarget.style.gap = '0.35rem' }}
              >
                View Case Study <ArrowRight size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
