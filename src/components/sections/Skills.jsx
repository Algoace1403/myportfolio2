import { motion } from 'framer-motion'
import '../../styles/skills.css'

const skills = [
  { name: 'HTML', icon: '🌐', level: '90%' },
  { name: 'CSS', icon: '🎨', level: '85%' },
  { name: 'JAVASCRIPT', icon: '⚡', level: '80%' },
  { name: 'REACT', icon: '⚛️ ', level: '75%' },
  { name: 'NODE.JS', icon: '🟢', level: '60%' },
  { name: 'GIT', icon: '🔀', level: '70%' },
  { name: 'THREE.JS', icon: '🎲', level: '50%' },
  { name: 'FIGMA', icon: '🖌️ ', level: '65%' },
]

function Skills() {
  return (
    <section id="skills" className="skills">
      <motion.div
        className="skills-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="section-label">// SKILLS</p>
        <div className="about-line" style={{ margin: '0 auto 25px' }}></div>
        <h2 className="section-title">TECH STACK</h2>
      </motion.div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="skill-card hover-target"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <span className="skill-icon">{skill.icon}</span>
            <p className="skill-name">{skill.name}</p>
            <div className="skill-level">
              <div
                className="skill-level-fill"
                style={{ '--level': skill.level }}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills