import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function ProjectSection({ project, onPlay }) {
  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [magnet, setMagnet] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const scrollRoot = document.getElementById('scroll-root')
    if (!scrollRoot || !sectionRef.current) return
    const el = sectionRef.current
    const check = () => {
      const rect = el.getBoundingClientRect()
      const rootRect = scrollRoot.getBoundingClientRect()
      const overlapHeight = Math.min(rect.bottom, rootRect.bottom) - Math.max(rect.top, rootRect.top)
      const isIn = overlapHeight / rect.height >= 0.5
      setVisible(isIn)
      if (!isIn && videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
    scrollRoot.addEventListener('scroll', check, { passive: true })
    check()
    return () => scrollRoot.removeEventListener('scroll', check)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (visible && hovered) {
      if (!video.src) video.src = project.src
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [visible, hovered, project.src])

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.width / 2
    const cy = rect.height / 2
    const dx = e.clientX - rect.left - cx
    const dy = e.clientY - rect.top - cy
    setMagnet({ x: (dx / cx) * 22, y: (dy / cy) * 22 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    setMagnet({ x: 0, y: 0 })
  }, [])

  return (
    <section
      id={`project-${project.id}`}
      ref={sectionRef}
      className="project-section section"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={() => onPlay(project)}
      role="button"
      tabIndex={0}
      aria-label={`Play ${project.title}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(project) } }}
    >
      <video
        ref={videoRef}
        className="project-bg"
        muted
        loop
        playsInline
        preload="none"
        poster={project.poster}
      />
      <div className="project-overlay" />

      <motion.div
        className="project-meta"
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="project-category">{project.category}</span>
        <span className="project-id">{project.id}</span>
      </motion.div>

      <motion.div
        className="project-wordmark"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={visible ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        <span className="project-title">{project.title}</span>
      </motion.div>

      <motion.div
        className={`project-play-hint${hovered ? ' visible' : ''}`}
        aria-hidden="true"
        animate={hovered
          ? { x: magnet.x, y: magnet.y, opacity: 1, scale: 1 }
          : { x: 0, y: 0, opacity: 0, scale: 0.85 }
        }
        transition={{ type: 'spring', stiffness: 200, damping: 22, mass: 0.6 }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="31" stroke="white" strokeWidth="0.75"/>
          <path d="M26 20l18 12-18 12V20z" fill="white"/>
        </svg>
      </motion.div>
    </section>
  )
}
