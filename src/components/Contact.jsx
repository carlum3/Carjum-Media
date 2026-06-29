import { useState, useRef, useEffect } from 'react'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const ref = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const scrollRoot = document.getElementById('scroll-root')
    if (!scrollRoot || !ref.current) return
    const el = ref.current
    const check = () => {
      const rect = el.getBoundingClientRect()
      const rootRect = scrollRoot.getBoundingClientRect()
      const visible = rect.bottom - rootRect.top > rootRect.height * 0.15
      if (visible) { setVis(true); scrollRoot.removeEventListener('scroll', check) }
    }
    scrollRoot.addEventListener('scroll', check, { passive: true })
    check()
    return () => scrollRoot.removeEventListener('scroll', check)
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      e.target.reset()
      setTimeout(() => setStatus('idle'), 4000)
    }, 1200)
  }

  return (
    <section id="contact" className={`contact section--auto${vis ? ' contact--vis' : ''}`} ref={ref}>
      <div className="contact-inner">
        <span className="section-label section-label--light contact-reveal contact-reveal--0">
          Contact
        </span>

        <h2 className="contact-title contact-reveal contact-reveal--1">
          LET'S MAKE<br />SOMETHING.
        </h2>

        <p className="contact-sub contact-reveal contact-reveal--2">
          Concerts · Events · Worship · Commercial · SF + travel
        </p>

        <form
          className="contact-form contact-reveal contact-reveal--3"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="c-name">Name</label>
              <input id="c-name" name="name" type="text" placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="c-email">Email</label>
              <input id="c-email" name="email" type="email" placeholder="your@email.com" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="c-type">Project type</label>
            <select id="c-type" name="type" defaultValue="">
              <option value="" disabled>Select type</option>
              <option>Concert / Live Event</option>
              <option>Worship / Church</option>
              <option>Music Video</option>
              <option>Personal / Event</option>
              <option>Commercial / Promo</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="c-msg">Details</label>
            <textarea id="c-msg" name="message" rows={4} placeholder="Event date, location, what you need…" required />
          </div>
          <button type="submit" className="form-submit" disabled={status !== 'idle'}>
            {status === 'idle' && 'Send Inquiry'}
            {status === 'sending' && 'Sending…'}
            {status === 'sent' && 'Sent — thank you'}
          </button>
        </form>

        <div className="contact-footer contact-reveal contact-reveal--4">
          <a href="mailto:carjum2000@gmail.com" className="contact-email">
            carjum2000@gmail.com
          </a>
          <div className="contact-social">
            <a href="https://www.instagram.com/thatdudecarjum/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
