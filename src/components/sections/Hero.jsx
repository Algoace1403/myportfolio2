import { Canvas } from '@react-three/fiber'                                                                                                                                                                   
import { motion } from 'framer-motion'
import ParticleField from '../3d/ParticleField'
import '../../styles/hero.css'

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-canvas">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ParticleField />
        </Canvas>
      </div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p className="hero-greeting">HELLO, I AM</p>
        <h1 className="hero-name">ANUJ KUMAR SONI</h1>
        <h2 className="hero-title">FULL STACK DEVELOPER</h2>
        <p className="hero-tagline">I build things for the web</p>

        <div className="hero-buttons">
          <a href="#projects">
            <button className="btn-primary hover-target">VIEW WORK</button>
          </a>
          <a href="#contact">
            <button className="btn-secondary hover-target">CONTACT ME</button>
          </a>
        </div>
      </motion.div>

      <div className="scroll-indicator">
        <span>SCROLL</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}

export default Hero
