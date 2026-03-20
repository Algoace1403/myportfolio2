import { useState, useCallback } from 'react'
import { usePerformance } from '../context/PerformanceContext'
import WorldScene from '../components/3d/WorldScene'
import CinematicIntro from '../components/ui/CinematicIntro'
import HeroOverlay from '../components/ui/HeroOverlay'
import WebGLFallback from '../components/ui/WebGLFallback'
import AboutSection from '../components/sections/AboutSection'
import ContinentExplorer from '../components/sections/ContinentExplorer'
import FeaturedProjects from '../components/sections/FeaturedProjects'
import VisionSection from '../components/sections/VisionSection'
import ContactSection from '../components/sections/ContactSection'
import SectionDivider from '../components/ui/SectionDivider'
import Footer from '../components/ui/Footer'
import '../styles/home.css'

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)
  const perf = usePerformance()

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  const showIntro = !introComplete && !perf.isReducedMotion

  return (
    <main className="home-world" role="main">
      {/* ━━━ ACT 1: Cinematic intro ━━━ */}
      {showIntro && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* ━━━ ACT 2: 3D World + Hero ━━━ */}
      <section className="home-world__hero" aria-label="Interactive 3D portfolio world">
        {perf.webglSupported ? (
          <>
            <div className="home-world__canvas">
              <WorldScene
                labelsVisible={introComplete || perf.isReducedMotion}
                introComplete={introComplete || perf.isReducedMotion}
              />
            </div>
            <HeroOverlay isVisible={introComplete || perf.isReducedMotion} />
          </>
        ) : (
          <WebGLFallback />
        )}
        <div className="home-world__gradient-top" aria-hidden="true" />
        <div className="home-world__gradient-bottom" aria-hidden="true" />
      </section>

      {/* ━━━ ACT 3: About ━━━ */}
      <AboutSection />
      <SectionDivider accent="cyan" />

      {/* ━━━ ACT 4: Skill Continents ━━━ */}
      <ContinentExplorer />
      <SectionDivider accent="purple" />

      {/* ━━━ ACT 5: Featured Projects ━━━ */}
      <FeaturedProjects />
      <SectionDivider accent="pink" />

      {/* ━━━ ACT 6: Vision / Roadmap ━━━ */}
      <VisionSection />
      <SectionDivider accent="green" />

      {/* ━━━ ACT 7: Contact ━━━ */}
      <ContactSection />

      {/* ━━━ Footer ━━━ */}
      <Footer />
    </main>
  )
}
