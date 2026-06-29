import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Intro({ onComplete }) {
  const [phase, setPhase] = useState('logo') // logo → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('exit'), 2200)
    const t2 = setTimeout(() => onComplete(), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="intro"
          initial={{ opacity: 1 }}
          animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => { if (phase === 'exit') setPhase('done') }}
        >
          <motion.div
            className="intro-wordmark"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            CARJUM
          </motion.div>
          <motion.div
            className="intro-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            MEDIA
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
