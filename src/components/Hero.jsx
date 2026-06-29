import { useRef, useEffect } from 'react'

// Web-optimized background video served from the range-request media server
const BG_VIDEO = 'http://localhost:5174/Video/Edited/NAYC Concert Cover BG.mp4'

// The concert opens with a ~15s cinematic fade-from-black — skip past it
const START_OFFSET = 15

export default function Hero({ visible }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const startPlayback = () => {
      video.currentTime = START_OFFSET
      video.play().catch(() => {})
    }

    if (visible) {
      if (video.readyState >= 1) {
        startPlayback()
      } else {
        video.addEventListener('loadedmetadata', startPlayback, { once: true })
      }
    }
  }, [visible])

  return (
    <section className="hero section">
      <video
        ref={videoRef}
        className="hero-bg"
        src={BG_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="hero-overlay" />

      <div className={`hero-content${visible ? ' hero-content--visible' : ''}`}>
        <p className="hero-eyebrow">Videographer &amp; Editor · San Francisco, CA</p>
        <div className="hero-tagline">Visual Storytelling</div>
      </div>

      <div className="hero-wordmark" aria-label="Carjum Media">
        <span className="hero-wordmark-line">CARJUM</span>
        <span className="hero-wordmark-line">MEDIA</span>
      </div>

      <button
        className="hero-scroll"
        onClick={() => {
          const el = document.getElementById('scroll-root')
          const next = document.getElementById('project-01')
          if (el && next) el.scrollTo({ top: next.offsetTop, behavior: 'smooth' })
        }}
        aria-label="Scroll to work"
      >
        <span>Selected Work</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>
    </section>
  )
}
