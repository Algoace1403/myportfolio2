import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '../../data/socials'
import '../../styles/navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        <Link to="/" className="nav-logo" aria-label="Home">AKS</Link>

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
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path ||
              (link.path.startsWith('/#') && location.pathname === '/')
            return (
              <li key={link.label} role="listitem">
                <Link
                  to={link.path.startsWith('/#') ? '/' : link.path}
                  className={isActive ? 'active' : ''}
                  onClick={() => {
                    if (link.path.startsWith('/#')) {
                      setTimeout(() => {
                        document.querySelector(link.path.replace('/', ''))?.scrollIntoView({ behavior: 'smooth' })
                      }, 100)
                    }
                  }}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
