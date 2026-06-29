import { useRef, useState, useEffect } from 'react'

export default function About() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const scrollRoot = document.getElementById('scroll-root')
    if (!scrollRoot || !ref.current) return
    const el = ref.current
    const check = () => {
      const rect = el.getBoundingClientRect()
      const rootRect = scrollRoot.getBoundingClientRect()
      const visible = rect.bottom - rootRect.top > rootRect.height * 0.2
      if (visible) { setVis(true); scrollRoot.removeEventListener('scroll', check) }
    }
    scrollRoot.addEventListener('scroll', check, { passive: true })
    check()
    return () => scrollRoot.removeEventListener('scroll', check)
  }, [])

  return (
    <section id="about" className={`about section--auto${vis ? ' about--vis' : ''}`} ref={ref}>
      <div className="about-inner">
        <div className="about-left">
          <div className="about-img-wrap about-reveal about-reveal--0">
            <img
              src="/images/portrait.jpg"
              alt="Carlum Edward — Carjum Media"
              className="about-img"
            />
          </div>
          <p className="about-caption about-reveal about-reveal--1">
            Carlum Edward · Carjum Media
          </p>
        </div>

        <div className="about-right">
          <span className="section-label about-reveal about-reveal--0">
            About
          </span>

          <h2 className="about-title about-reveal about-reveal--1">
            A FRAME IS<br />A POINT<br />OF VIEW.
          </h2>

          <p className="about-body about-reveal about-reveal--2">
            Carjum Media is a San Francisco–based video production studio
            specializing in concerts, worship events, promos, and personal films.
            Every project is handled with the same intention:{' '}
            <em>make it worth watching.</em>
          </p>

          <p className="about-body about-reveal about-reveal--3">
            From large-scale NAYC concert coverage to intimate quinceañera films,
            Carlum brings an editorial eye to every frame — shooting, editing,
            and delivering work that holds up.
          </p>

          <div className="about-stats about-reveal about-reveal--4">
            <div className="stat">
              <p className="stat-num">13+</p>
              <p className="stat-label">Projects</p>
            </div>
            <div className="stat">
              <p className="stat-num">4+</p>
              <p className="stat-label">Genres</p>
            </div>
            <div className="stat">
              <p className="stat-num">SF</p>
              <p className="stat-label">Based</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
