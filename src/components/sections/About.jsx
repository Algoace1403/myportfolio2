import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import Earth from '../3d/Earth'
import '../../styles/about.css'

function About() {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <motion.div
          className="about-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="section-label">// ABOUT ME</p>
          <div className="about-line"></div>
          <h2 className="section-title">WHO AM I?</h2>
          <p className="about-text">
            Hi, I'm Anuj Kumar Soni — a passionate Full Stack Developer who loves
            building interactive web experiences. I enjoy turning complex problems
            into simple, beautiful, and intuitive solutions.
          </p>
          <p className="about-text">
            I'm constantly learning new technologies and pushing the boundaries of
            what's possible on the web. From 3D animations to responsive layouts,
            I love making the web feel alive.
          </p>

          <div className="about-stats">
            <div className="stat">
              <div className="stat-number">5+</div>
              <div className="stat-label">PROJECTS</div>
            </div>
            <div className="stat">
              <div className="stat-number">4+</div>
              <div className="stat-label">TECHNOLOGIES</div>
            </div>
            <div className="stat">
              <div className="stat-number">1+</div>
              <div className="stat-label">YEARS CODING</div>
            </div>
          </div>
        </motion.div>

        <div className="about-right">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <Earth />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>
      </div>
    </section>
  )
}

export default About
