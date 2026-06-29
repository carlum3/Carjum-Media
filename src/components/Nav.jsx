import { useEffect, useState } from 'react'

export default function Nav({ onMenuOpen, onContactClick }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const el = document.getElementById('scroll-root')
    const handle = () => setScrolled(el.scrollTop > 60)
    el?.addEventListener('scroll', handle, { passive: true })
    return () => el?.removeEventListener('scroll', handle)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <button className="nav-contact" onClick={onContactClick}>CONTACT</button>
      <div className="nav-logo" aria-label="Carjum Media">
        <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {/* Simple crest / reel icon */}
          <circle cx="40" cy="30" r="22" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="40" cy="30" r="8" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="40" y1="8" x2="40" y2="22" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="40" y1="38" x2="40" y2="52" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="18" y1="30" x2="32" y2="30" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="48" y1="30" x2="62" y2="30" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="24" y1="14" x2="34" y2="24" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="46" y1="36" x2="56" y2="46" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="56" y1="14" x2="46" y2="24" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="34" y1="36" x2="24" y2="46" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>
      <button className="nav-menu" onClick={onMenuOpen}>MENU</button>
    </nav>
  )
}
