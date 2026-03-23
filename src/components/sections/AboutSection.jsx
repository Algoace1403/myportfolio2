import { motion } from 'framer-motion'
import profile from '../../data/profile'
import { achievements } from '../../data/timeline'
import TextReveal from '../ui/TextReveal'
import useScrollReveal from '../../hooks/useScrollReveal'
import '../../styles/about-section.css'

const ease = [0.25, 0.1, 0.25, 1.0]
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay, duration: 0.7, ease },
})

export default function AboutSection() {
  const statsRef = useScrollReveal({
    childSelector: '.stat-card',
    stagger: 0.1,
    y: 40,
  })

  return (
    <section className="about-section" id="about">
      <div className="about-section__inner">
        <motion.span className="section-label" {...reveal(0)}>
          WHO I AM
        </motion.span>

        <div className="about-section__content">
          <div className="about-section__bio">
            <TextReveal
              text={profile.name}
              tag="h2"
              className="about-section__name"
              delay={0.1}
            />
            <motion.p className="about-section__title" {...reveal(0.15)}>
              {profile.title}
            </motion.p>

            {profile.bio.map((paragraph, i) => (
              <motion.p
                key={i}
                className="about-section__paragraph"
                {...reveal(0.2 + i * 0.08)}
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div className="about-section__traits" {...reveal(0.5)}>
              {profile.traits.map((trait) => (
                <span key={trait} className="trait-badge">{trait}</span>
              ))}
            </motion.div>
          </div>

          <div className="about-section__stats" ref={statsRef}>
            {achievements.map((stat) => (
              <div key={stat.id} className="stat-card">
                <span className="stat-card__icon">{stat.icon}</span>
                <span className="stat-card__value">{stat.value}</span>
                <span className="stat-card__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
