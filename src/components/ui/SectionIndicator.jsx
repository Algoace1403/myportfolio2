import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import '../../styles/section-indicator.css'

const SECTIONS = [
  { id: 'hero', label: 'World', selector: '.home-world__hero' },
  { id: 'about', label: 'About', selector: '#about' },
  { id: 'skills', label: 'Skills', selector: '#skills' },
  { id: 'projects', label: 'Projects', selector: '#projects' },
  { id: 'vision', label: 'Vision', selector: '#vision' },
  { id: 'contact', label: 'Contact', selector: '#contact' },
]

export default function SectionIndicator() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          const el = visible[0].target
          const section = SECTIONS.find(
            (s) => el.matches(s.selector) || el.id === s.id
          )
          if (section) setActiveSection(section.id)
        }
      },
      { threshold: [0.2, 0.5], rootMargin: '-10% 0px -10% 0px' }
    )

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      SECTIONS.forEach((section) => {
        const el = document.querySelector(section.selector)
        if (el) observer.observe(el)
      })
    }, 1000)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (selector) => {
    const el = document.querySelector(selector)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="section-indicator" aria-label="Page sections">
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id
        return (
          <button
            key={section.id}
            className={`section-indicator__dot ${isActive ? 'active' : ''}`}
            onClick={() => scrollToSection(section.selector)}
            aria-label={`Navigate to ${section.label}`}
            aria-current={isActive ? 'true' : undefined}
            title={section.label}
          >
            <span className="section-indicator__pip" />
            {isActive && (
              <motion.span
                className="section-indicator__label"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
              >
                {section.label}
              </motion.span>
            )}
          </button>
        )
      })}
    </nav>
  )
}
