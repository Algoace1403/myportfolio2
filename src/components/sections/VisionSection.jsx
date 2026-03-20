import { motion } from 'framer-motion'
import profile from '../../data/profile'
import '../../styles/vision-section.css'

export default function VisionSection() {
  const { vision } = profile

  return (
    <section className="vision-section" id="vision">
      <div className="vision-section__inner">
        <motion.span
          className="section-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          THE ROADMAP
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {vision.headline}
        </motion.h2>
        <motion.p
          className="vision-section__statement"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {vision.statement}
        </motion.p>

        {/* Roadmap timeline */}
        <div className="vision-roadmap">
          {vision.goals.map((goal, i) => (
            <motion.div
              key={goal.year}
              className="roadmap-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12 }}
            >
              <div className="roadmap-item__marker">
                <span className="roadmap-item__year">{goal.year}</span>
                <span className="roadmap-item__dot" />
                {i < vision.goals.length - 1 && <span className="roadmap-item__line" />}
              </div>
              <p className="roadmap-item__goal">{goal.goal}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
