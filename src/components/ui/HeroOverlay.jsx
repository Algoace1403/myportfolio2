import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import profile from '../../data/profile'
import WorldLegend from './WorldLegend'

export default function HeroOverlay({ isVisible = true }) {
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (!isVisible) return

    const titles = profile.heroTitles
    const currentTitle = titles[titleIndex]
    let charIndex = 0
    let deleting = false
    let timeout

    const tick = () => {
      if (!deleting) {
        setDisplayText(currentTitle.slice(0, charIndex + 1))
        charIndex++
        if (charIndex >= currentTitle.length) {
          timeout = setTimeout(() => {
            deleting = true
            setIsTyping(false)
            tick()
          }, 2000)
          return
        }
        timeout = setTimeout(tick, 60 + Math.random() * 40)
      } else {
        setDisplayText(currentTitle.slice(0, charIndex))
        charIndex--
        if (charIndex < 0) {
          setIsTyping(true)
          setTitleIndex((prev) => (prev + 1) % titles.length)
          return
        }
        timeout = setTimeout(tick, 30)
      }
    }

    timeout = setTimeout(tick, 500)
    return () => clearTimeout(timeout)
  }, [titleIndex, isVisible])

  if (!isVisible) return null

  return (
    <div className="hero-overlay">
      {/* ━━━ Top-left: Name ━━━ */}
      <motion.div
        className="hero-overlay__name"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
      >
        <span className="hero-overlay__name-label">{profile.name.toUpperCase()}</span>
        <span className="hero-overlay__name-aka">{profile.aka}</span>
      </motion.div>

      {/* ━━━ Bottom-left: Typewriter + tagline ━━━ */}
      <motion.div
        className="hero-overlay__center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
      >
        <div className="hero-overlay__title-wrapper">
          <span className="hero-overlay__title">{displayText}</span>
          <span className={`hero-overlay__cursor ${isTyping ? 'typing' : ''}`}>|</span>
        </div>
        <p className="hero-overlay__tagline">{profile.tagline}</p>
      </motion.div>

      {/* ━━━ Bottom center: Scroll hint ━━━ */}
      <motion.div
        className="hero-overlay__cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.0, ease: 'easeOut' }}
      >
        <div className="hero-overlay__scroll-mouse">
          <div className="hero-overlay__scroll-wheel" />
        </div>
        <span className="hero-overlay__scroll-hint">
          EXPLORE MY WORLD
        </span>
      </motion.div>

      {/* ━━━ Bottom-right: Coordinates ━━━ */}
      <motion.div
        className="hero-overlay__coords"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <span>LAT {profile.coordinates.lat}</span>
        <span>LNG {profile.coordinates.lng}</span>
        <span>ALT ∞</span>
      </motion.div>

      {/* ━━━ Top-right: World Legend ━━━ */}
      <WorldLegend isVisible={isVisible} />

      {/* ━━━ HUD decorative elements ━━━ */}
      <motion.div
        className="hero-overlay__hud-line hero-overlay__hud-line--left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
      />
      <motion.div
        className="hero-overlay__hud-line hero-overlay__hud-line--right"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1.0, ease: 'easeOut' }}
      />
    </div>
  )
}
