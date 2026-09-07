import { ArrowRight, Cpu, Laptop, MonitorSmartphone, ShieldCheck, Smartphone, Tablet } from 'lucide-react'
import { motion } from 'framer-motion'

interface ElectronicsProps {
  onContact?: () => void
}

const devices = [
  {
    icon: Smartphone,
    title: 'Telephones',
    description: 'Mobile apps, system setup, performance improvements, and software support for Android and iOS devices.',
  },
  {
    icon: Laptop,
    title: 'Machines & Computers',
    description: 'Reliable desktop and laptop software, operating-system support, troubleshooting, and productivity tools.',
  },
  {
    icon: Tablet,
    title: 'Tablets',
    description: 'Responsive tablet experiences, app installation, device configuration, and software maintenance.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Other Devices',
    description: 'Software solutions for smart screens, connected devices, accessories, and other modern electronics.',
  },
]

const softwareServices = [
  'Device setup and software installation',
  'App and system troubleshooting',
  'Performance and security improvements',
  'Custom software for your device needs',
]

const ease = [0.22, 1, 0.36, 1]

export default function Electronics({ onContact }: ElectronicsProps) {
  return (
    <section id="electronics" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease }}
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(2rem, 5vw, 4rem)',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.2), rgba(15, 23, 42, 0.9) 55%, rgba(79, 70, 229, 0.14))',
          border: '1px solid rgba(96, 165, 250, 0.25)',
          boxShadow: '0 24px 80px rgba(30, 64, 175, 0.12)',
        }}
      >
        <div style={{ position: 'absolute', top: -100, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'rgba(59,130,246,0.14)', filter: 'blur(12px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(280px, 0.9fr)', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 0.75rem', borderRadius: 999, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(96,165,250,0.25)', color: '#93c5fd', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              <Cpu size={14} /> Electronics support
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 850, letterSpacing: '-0.045em', lineHeight: 1.08, marginBottom: '1.1rem' }}>
              Smart software for the devices you use every day.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 560, marginBottom: '1.75rem' }}>
              I work with telephones, machines, tablets, and other electronic devices — helping you install, improve, troubleshoot, and build the software that makes them work better.
            </p>
            <div style={{ display: 'grid', gap: '0.7rem', marginBottom: '2rem' }}>
              {softwareServices.map(service => (
                <div key={service} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--text)', fontSize: '0.88rem' }}>
                  <ShieldCheck size={17} color="#60a5fa" />
                  {service}
                </div>
              ))}
            </div>
            <motion.button
              onClick={onContact}
              whileHover={{ x: 4, boxShadow: '0 8px 24px rgba(59,130,246,0.3)' }}
              whileTap={{ scale: 0.98 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '0.8rem 1.15rem', borderRadius: 10, background: 'var(--blue)', color: 'white', fontWeight: 700, fontSize: '0.86rem' }}
            >
              Talk about your device <ArrowRight size={16} />
            </motion.button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.85rem' }}>
            {devices.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.15 + index * 0.08, ease }}
                whileHover={{ y: -4, borderColor: 'rgba(96,165,250,0.45)', background: 'rgba(59,130,246,0.12)' }}
                style={{ minHeight: 160, padding: '1.1rem', borderRadius: 14, background: 'rgba(2, 6, 23, 0.42)', border: '1px solid rgba(148,163,184,0.16)', transition: 'background 0.2s, border-color 0.2s' }}
              >
                <div style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, background: 'rgba(59,130,246,0.15)', color: '#93c5fd', marginBottom: '0.8rem' }}>
                  <Icon size={20} />
                </div>
                <h3 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.4rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: 1.55 }}>{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}