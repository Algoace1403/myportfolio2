
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../../styles/navbar.css'

function Navbar() {
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
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo">AKS</Link>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="ham-line"></span>
          <span className="ham-line"></span>
          <span className="ham-line"></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link to="/work" className={location.pathname === '/work' ? 'active' : ''}>Work</Link>
          </li>
          <li>
            <Link to="/timeline" className={location.pathname === '/timeline' ? 'active' : ''}>Timeline</Link>
          </li>
          <li>
            <Link to="/fun" className={location.pathname === '/fun' ? 'active' : ''}>Fun</Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar