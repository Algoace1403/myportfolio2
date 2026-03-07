
import { motion } from 'framer-motion'
import RubiksCubeScene from '../components/3d/RubiksCube'
import MacBookScene from '../components/3d/FloatingLaptop'
import Skills from '../components/sections/Skills'
import Projects from '../components/sections/Projects'
import '../styles/work.css'

function Work() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <section className="work-3d-section">
        <div className="work-3d-container">
          <div className="work-3d-item">
            <RubiksCubeScene />
            <p className="work-3d-label">SOLVE THE CUBE</p>
          </div>
          <div className="work-3d-item">
            <MacBookScene />
            <p className="work-3d-label">MY WORKSPACE</p>
          </div>
        </div>
      </section>
      <Skills />
      <Projects />
    </motion.div>
  )
}

export default Work
