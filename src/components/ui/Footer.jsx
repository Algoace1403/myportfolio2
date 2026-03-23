import profile from '../../data/profile'
import '../../styles/footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" role="contentinfo">
      {/* Marquee CTA */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <a
              key={i}
              href={`mailto:${profile.email}`}
              className="marquee-item hover-target"
            >
              Let's Work Together <span className="marquee-dash">&mdash;</span>
            </a>
          ))}
        </div>
      </div>

      <div className="site-footer__inner">
        <div className="site-footer__divider" />

        <div className="site-footer__content">
          <div className="site-footer__left">
            <span className="site-footer__logo">{profile.aka}</span>
            <span className="site-footer__copy">
              &copy; {year} {profile.name}. Crafted with code and curiosity.
            </span>
          </div>

          <div className="site-footer__right">
            <button
              className="site-footer__back-top hover-target"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
            >
              &uarr; Back to World
            </button>
          </div>
        </div>

        <div className="site-footer__tagline">
          {profile.tagline}
        </div>
      </div>
    </footer>
  )
}
