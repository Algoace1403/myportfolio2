import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const INTRO_LINES = [
  { text: 'INITIALIZING WORLD...', delay: 0 },
  { text: 'MAPPING SKILL DOMAINS', delay: 800 },
  { text: 'LOADING EXPERIENCE', delay: 1600 },
]

export default function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState('text') // 'text' | 'reveal' | 'done'
  const [visibleLines, setVisibleLines] = useState(0)
  const hasCompleted = useRef(false)

  useEffect(() => {
    // Show lines sequentially
    const timers = INTRO_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay + 300)
    )

    // Start reveal after all lines
    const revealTimer = setTimeout(() => {
      setPhase('reveal')
    }, 2800)

    // Complete intro
    const completeTimer = setTimeout(() => {
      if (!hasCompleted.current) {
        hasCompleted.current = true
        setPhase('done')
        onComplete?.()
      }
    }, 4200)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(revealTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  // Allow skip on click
  const handleSkip = () => {
    if (!hasCompleted.current) {
      hasCompleted.current = true
      setPhase('done')
      onComplete?.()
    }
  }

  if (phase === 'done') return null

  return (
    <AnimatePresence>
      <motion.div
        onClick={handleSkip}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: phase === 'reveal' ? 0 : 1 }}
        transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1.0] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          background: '#050510',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        {/* Radial pulse behind text */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,150,255,0.15), transparent 70%)',
          }}
        />

        {/* Intro text lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          {INTRO_LINES.map((line, i) => (
            <motion.div
              key={line.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: i < visibleLines ? 1 : 0,
                y: i < visibleLines ? 0 : 10,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                fontFamily: "'Space Mono', 'JetBrains Mono', monospace",
                fontSize: '13px',
                letterSpacing: '4px',
                color: i === visibleLines - 1 ? '#00aaff' : '#334466',
                textTransform: 'uppercase',
              }}
            >
              {line.text}
              {i === visibleLines - 1 && (
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                >
                  _
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Skip hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            letterSpacing: '2px',
            color: '#445566',
          }}
        >
          CLICK TO SKIP
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
