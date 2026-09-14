import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Electronics from './components/Electronics'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Testimonials from './components/Testimonials'
import Videos from './components/Videos'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import HireMe from './components/HireMe'
import AskAI from './components/AskAI'

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
  const [loaded, setLoaded] = useState(false)
  const [hireMeOpen, setHireMeOpen] = useState(false)

  const goToContact = () => {
    setActivePage('home')
    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 80)
  }

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <HireMe
        open={hireMeOpen}
        onClose={() => setHireMeOpen(false)}
        onContact={() => { setHireMeOpen(false); goToContact() }}
      />

      <div
        className="grid-bg"
        style={{
          minHeight: '100vh',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <ScrollProgress />
        <Nav
          activePage={activePage}
          setActivePage={setActivePage}
          onHireMe={() => setHireMeOpen(true)}
        />
        <main>
          {activePage === 'home' && (
            <>
              <Hero setActivePage={setActivePage} />
              <About />
              <Services />
              <Electronics onContact={goToContact} />
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
        <Footer setActivePage={setActivePage} onHireMe={() => setHireMeOpen(true)} />
        <AskAI />
      </div>
    </>
  )
}
