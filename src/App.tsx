import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Testimonials from './components/Testimonials'
import Videos from './components/Videos'
import Contact from './components/Contact'
import Footer from './components/Footer'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: '0%',
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: 3,
        background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
        zIndex: 10000,
        boxShadow: '0 0 12px rgba(59,130,246,0.6)',
      }}
    />
  )
}

export default function App() {
  const [activePage, setActivePage] = useState<string>('home')

  return (
    <div className="grid-bg" style={{ minHeight: '100vh' }}>
      <ScrollProgress />
      <Nav activePage={activePage} setActivePage={setActivePage} />
      <main>
        {activePage === 'home' && (
          <>
            <Hero setActivePage={setActivePage} />
            <About />
            <Services />
            <TechStack />
            <Projects />
            <Blog />
            <Testimonials />
            <Videos />
            <Contact />
          </>
        )}
        {activePage === 'videos' && <Videos fullPage />}
        {activePage === 'contact' && <Contact fullPage />}
      </main>
      <Footer setActivePage={setActivePage} />
    </div>
  )
}
