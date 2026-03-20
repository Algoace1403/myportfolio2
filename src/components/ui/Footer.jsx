import { motion } from 'framer-motion'
import profile from '../../data/profile'
import '../../styles/footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__inner">
        {/* Divider */}
        <div className="site-footer__divider" />

        {/* Content */}
        <div className="site-footer__content">
          <div className="site-footer__left">
            <span className="site-footer__logo">{profile.aka}</span>
            <span className="site-footer__copy">
              &copy; {year} {profile.name}. Crafted with code and curiosity.
            </span>
          </div>

          <div className="site-footer__right">
            <motion.a
              href="#about"
              className="site-footer__back-top"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              whileHover={{ y: -2 }}
              aria-label="Back to top"
            >
              ↑ Back to World
            </motion.a>
          </div>
        </div>

        {/* Ambient tagline */}
        <div className="site-footer__tagline">
          {profile.tagline}
        </div>
      </div>
    </footer>
  )
}
