
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../../styles/navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-logo">AKS</Link>
      <ul className="nav-links">
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
  )
}

export default Navbar