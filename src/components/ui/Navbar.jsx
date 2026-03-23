import { useState, useEffect } from 'react'
import { navLinks } from '../../data/socials'
import '../../styles/navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(progress)

      // Determine active section based on scroll position
      const sections = navLinks.map((l) => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <a
          href="#hero"
          className="nav-logo"
          aria-label="Home"
          onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
        >
          AKS
        </a>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="ham-line" aria-hidden="true" />
          <span className="ham-line" aria-hidden="true" />
          <span className="ham-line" aria-hidden="true" />
        </button>

        <ul className={`nav-links ${menuOpen ? 'nav-open' : ''}`} role="list">
          {navLinks.map((link) => (
            <li key={link.label} role="listitem">
              <a
                href={link.href}
                className={activeSection === link.href.replace('#', '') ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
