import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { continents } from '../../data/skills'
import TextReveal from '../ui/TextReveal'
import '../../styles/continent-explorer.css'

function SkillBar({ name, level, color, delay }) {
  return (
    <motion.div
      className="skill-bar"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="skill-bar__header">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__level">{level}%</span>
      </div>
      <div className="skill-bar__track">
        <motion.div
          className="skill-bar__fill"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ delay: delay + 0.15, duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 12px ${color}44`,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function ContinentExplorer() {
  const [activeContinent, setActiveContinent] = useState(null)

  return (
    <section className="continent-explorer" id="skills">
      <div className="continent-explorer__header">
        <motion.span
          className="section-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          SKILL DOMAINS
        </motion.span>
        <TextReveal text="Explore My Continents" tag="h2" className="section-title" />
      </div>

      {/* Continent selector */}
      <div className="continent-selector">
        {continents.map((continent, i) => (
          <motion.button
            key={continent.id}
            className={`continent-btn ${activeContinent?.id === continent.id ? 'active' : ''}`}
            onClick={() => setActiveContinent(
              activeContinent?.id === continent.id ? null : continent
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            style={{
              '--continent-color': continent.color,
            }}
          >
            <span className="continent-btn__icon">{continent.icon}</span>
            <span className="continent-btn__name">{continent.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Expanded continent detail */}
      <AnimatePresence mode="wait">
        {activeContinent && (
          <motion.div
            key={activeContinent.id}
            className="continent-detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="continent-detail__inner">
              <div className="continent-detail__header">
                <h3
                  className="continent-detail__title"
                  style={{ color: activeContinent.color }}
                >
                  {activeContinent.name}
                </h3>
                <p className="continent-detail__desc">
                  {activeContinent.description}
                </p>
              </div>

              <div className="continent-detail__countries">
                {activeContinent.countries.map((country) => (
                  <div key={country.name} className="country-block">
                    <h4 className="country-block__name">{country.name}</h4>
                    <div className="country-block__skills">
                      {country.cities.map((city, ci) => (
                        <SkillBar
                          key={city.name}
                          name={city.name}
                          level={city.level}
                          color={activeContinent.color}
                          delay={ci * 0.06}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
