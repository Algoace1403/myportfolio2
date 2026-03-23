import { motion } from 'framer-motion'
import profile from '../../data/profile'
import TextReveal from '../ui/TextReveal'
import useScrollReveal from '../../hooks/useScrollReveal'
import '../../styles/vision-section.css'

export default function VisionSection() {
  const { vision } = profile

  const roadmapRef = useScrollReveal({
    childSelector: '.roadmap-item',
    stagger: 0.12,
    y: 30,
  })

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

        <TextReveal
          text={vision.headline}
          tag="h2"
          className="section-title"
        />

        <motion.p
          className="vision-section__statement"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {vision.statement}
        </motion.p>

        {/* Roadmap timeline */}
        <div className="vision-roadmap" ref={roadmapRef}>
          {vision.goals.map((goal, i) => (
            <div key={goal.year} className="roadmap-item">
              <div className="roadmap-item__marker">
                <span className="roadmap-item__year">{goal.year}</span>
                <span className="roadmap-item__dot" />
                {i < vision.goals.length - 1 && <span className="roadmap-item__line" />}
              </div>
              <p className="roadmap-item__goal">{goal.goal}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
