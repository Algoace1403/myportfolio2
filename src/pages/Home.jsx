import { useState, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { usePerformance } from '../context/PerformanceContext'
import WorldScene from '../components/3d/WorldScene'
import CinematicIntro from '../components/ui/CinematicIntro'
import HeroOverlay from '../components/ui/HeroOverlay'
import WebGLFallback from '../components/ui/WebGLFallback'
import ErrorBoundary from '../components/ui/ErrorBoundary'
import AboutSection from '../components/sections/AboutSection'
import ContinentExplorer from '../components/sections/ContinentExplorer'
import Projects from '../components/sections/Projects'
import VisionSection from '../components/sections/VisionSection'
import ContactSection from '../components/sections/ContactSection'
import SectionDivider from '../components/ui/SectionDivider'
import Footer from '../components/ui/Footer'
import TextReveal from '../components/ui/TextReveal'
import { timeline } from '../data/timeline'
import '../styles/home.css'
import '../styles/timeline.css'

function JourneySection() {
  return (
    <section id="journey" className="timeline-page" style={{ minHeight: 'auto', padding: '80px 5%' }}>
      <motion.div
        className="timeline-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="section-label">// MY JOURNEY</p>
        <div className="about-line" style={{ margin: '0 auto 25px' }} />
        <TextReveal text="SPACE LOG" tag="h2" className="section-title" />
        <p className="timeline-subtitle">Every developer has a story. Here's mine.</p>
      </motion.div>

      <div className="timeline-container">
        <div className="timeline-line" />
        {timeline.map((item, index) => (
          <motion.div
            key={item.id}
            className="timeline-item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            viewport={{ once: true }}
          >
            <div className="timeline-card hover-target">
              <span className="timeline-icon">{item.icon}</span>
              <p className="timeline-year">{item.year}</p>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-desc">{item.description?.slice(0, 120)}</p>
            </div>
            <div className="timeline-node">
              <div className="node-ring" style={{ borderColor: item.color }} />
            </div>
            <div style={{ flex: 1 }} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)
  const perf = usePerformance()

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  const showIntro = !introComplete && !perf.isReducedMotion

  return (
    <main className="home-world" role="main">
      <Helmet>
        <title>Anuj Kumar Soni — Full Stack Developer & Creative Technologist</title>
        <meta name="description" content="Interactive 3D portfolio of Anuj Kumar Soni — full-stack developer, creative technologist, and IIT Madras undergrad building at the frontier of code and art." />
      </Helmet>
      {showIntro && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* ━━━ Hero ━━━ */}
      <section id="hero" className="home-world__hero" aria-label="Interactive 3D portfolio world">
        {perf.webglSupported ? (
          <ErrorBoundary fallback={<WebGLFallback />}>
            <div className="home-world__canvas">
              <WorldScene
                labelsVisible={introComplete || perf.isReducedMotion}
                introComplete={introComplete || perf.isReducedMotion}
              />
            </div>
            <HeroOverlay isVisible={introComplete || perf.isReducedMotion} />
          </ErrorBoundary>
        ) : (
          <WebGLFallback />
        )}
        <div className="home-world__gradient-top" aria-hidden="true" />
        <div className="home-world__gradient-bottom" aria-hidden="true" />
      </section>

      {/* ━━━ About ━━━ */}
      <AboutSection />
      <SectionDivider accent="cyan" />

      {/* ━━━ Skills ━━━ */}
      <ContinentExplorer />
      <SectionDivider accent="purple" />

      {/* ━━━ Projects ━━━ */}
      <Projects />
      <SectionDivider accent="pink" />

      {/* ━━━ Journey ━━━ */}
      <JourneySection />
      <SectionDivider accent="green" />

      {/* ━━━ Vision ━━━ */}
      <VisionSection />
      <SectionDivider accent="cyan" />

      {/* ━━━ Contact ━━━ */}
      <ContactSection />

      {/* ━━━ Footer ━━━ */}
      <Footer />
    </main>
  )
}
