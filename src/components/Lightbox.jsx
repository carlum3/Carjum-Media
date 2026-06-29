import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Lightbox({ project, onClose }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (project && video) {
      video.play().catch(() => {})
    } else if (!project && video) {
      video.pause()
    }
    const handleKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [project, onClose])

  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={e => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            className="lightbox-inner"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="lightbox-close" onClick={onClose} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 2l16 16M18 2L2 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <video
              ref={videoRef}
              className="lightbox-video"
              src={project.src}
              controls
              playsInline
            />
            <div className="lightbox-meta">
              <span className="lightbox-cat">{project.category}</span>
              <span className="lightbox-title">{project.title}</span>
              {project.subtitle && <span className="lightbox-sub">{project.subtitle}</span>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
