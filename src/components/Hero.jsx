import { useRef, useEffect } from 'react'

const BG_VIDEO = import.meta.env.VITE_MEDIA_URL
  ? `${import.meta.env.VITE_MEDIA_URL}/hero-bg.mp4`
  : 'http://localhost:5174/Video/Edited/NAYC Concert Cover BG.mp4'

const START_OFFSET = 15

export default function Hero({ visible }) {
  return (
    <section className="hero section">
      <div className="hero-bg">
        <iframe
          src={`https://www.youtube.com/embed/${YT_BG_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_BG_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=15`}
          title="Hero background video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '56.25vw',
            minHeight: '100vh',
            minWidth: '177.77vh',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>
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
