import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import '../styles/timeline.css'

const milestones = [
  {
    year: '2024',
    icon: '🌱',
    title: 'Started Coding',
    desc: 'Wrote my first "Hello World" in HTML. Got hooked on making things appear on screen.'
  },
  {
    year: '2024',
    icon: '🎨',
    title: 'Learned CSS',
    desc: 'Discovered flexbox, grid, and animations. Started making things look beautiful.'
  },
  {
    year: '2025',
    icon: '⚡',
    title: 'JavaScript Journey',
    desc: 'Learned variables, functions, DOM manipulation. Built my first interactive project.'
  },
  {
    year: '2025',
    icon: '⚛️ ',
    title: 'React & Components',
    desc: 'Fell in love with React. Components, state, hooks — everything clicked.'
  },
  {
    year: '2025',
    icon: '🎲',
    title: 'Three.js & 3D Web',
    desc: 'Entered the world of 3D. Built a Rubik\'s cube, particle systems, and this portfolio.'
  },
  {
    year: '2026',
    icon: '🚀',
    title: 'Full Stack Developer',
    desc: 'Building full applications. The journey is just getting started...'
  },
]

function Timeline() {
  const [rocketY, setRocketY] = useState(120)
  const lastUpdateRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      if (now - lastUpdateRef.current < 100) return
      lastUpdateRef.current = now

      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      const topLimit = 120
      const bottomLimit = window.innerHeight - 60
      const y = topLimit + scrollPercent * (bottomLimit - topLimit)
      setRocketY(y)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <section className="timeline-page">
        {/* Shooting stars */}
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>

        {/* Rocket that follows scroll */}
        <div className="timeline-rocket" style={{ top: `${rocketY}px` }}>
          🚀
          <div className="rocket-trail"></div>
        </div>

        <motion.div
          className="timeline-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">// MY JOURNEY</p>
          <div className="about-line" style={{ margin: '0 auto 25px' }}></div>
          <h2 className="section-title">SPACE LOG</h2>
          <p className="timeline-subtitle">Every developer has a story. Here's mine.</p>
        </motion.div>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {milestones.map((item, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="timeline-card hover-target">
                <span className="timeline-icon">{item.icon}</span>
                <p className="timeline-year">{item.year}</p>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-desc">{item.desc}</p>
              </div>

              <div className="timeline-node">
                <div className="node-ring"></div>
              </div>

              <div style={{ flex: 1 }}></div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}

export default Timeline
