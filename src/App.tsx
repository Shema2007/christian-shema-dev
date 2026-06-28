import { useState } from 'react'
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

export default function App() {
  const [activePage, setActivePage] = useState<string>('home')

  return (
    <div className="grid-bg" style={{ minHeight: '100vh' }}>
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
