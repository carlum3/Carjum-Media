import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'

export default function Menu({ open, onClose, onProjectClick }) {
  const scrollTo = id => {
    const el = document.getElementById('scroll-root')
    const target = document.getElementById(id)
    if (el && target) {
      el.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="menu-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button className="menu-close" onClick={onClose} aria-label="Close menu">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M2 2l18 18M20 2L2 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="menu-inner">
            <div className="menu-nav">
              <button onClick={() => scrollTo('about')}>About</button>
              <button onClick={() => scrollTo('contact')}>Contact</button>
            </div>

            <ul className="menu-list">
              {projects.map((p, i) => (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    className="menu-item"
                    onClick={() => scrollTo(`project-${p.id}`)}
                  >
                    <span className="menu-item-num">{p.id}</span>
                    <span className="menu-item-title">{p.title}</span>
                    <span className="menu-item-cat">{p.category}</span>
                    <span className="menu-item-year">{p.year}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
