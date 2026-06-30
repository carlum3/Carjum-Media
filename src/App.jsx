import { useState, useCallback } from 'react'
import Intro from './components/Intro'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ProjectSection from './components/ProjectSection'
import About from './components/About'
import Contact from './components/Contact'
import Lightbox from './components/Lightbox'
import Menu from './components/Menu'
import { projects } from './data/projects'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleIntroComplete = useCallback(() => setIntroDone(true), [])

  const scrollToContact = () => {
    const el = document.getElementById('scroll-root')
    const target = document.getElementById('contact')
    if (el && target) el.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
  }

  return (
    <>
      <div className="grain" aria-hidden="true" />
      {!introDone && <Intro onComplete={handleIntroComplete} />}

      <Nav
        onMenuOpen={() => setMenuOpen(true)}
        onContactClick={scrollToContact}
      />

      <div id="scroll-root" className="scroll-root">
        <Hero visible={introDone} />

        {projects.map(p => (
          <ProjectSection
            key={p.id}
            project={p}
            onPlay={setActiveProject}
          />
        ))}

        <About />
        <Contact />

        <footer className="footer">
          <p>© 2026 Carjum Media · San Francisco, CA</p>
        </footer>
      </div>

      <Lightbox
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

      <Menu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onProjectClick={setActiveProject}
      />
    </>
  )
}
