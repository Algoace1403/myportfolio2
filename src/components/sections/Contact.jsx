import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import ParticleField from '../3d/ParticleField'
import '../../styles/contact.css'

function Contact() {
  return (
    <section id="contact" className="contact">
      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="section-label">// CONTACT</p>
        <div className="about-line" style={{ margin: '0 auto 25px' }}></div>
        <h2 className="section-title">GET IN TOUCH</h2>
      </motion.div>

      <div className="contact-container">
        <motion.div
          className="contact-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="contact-text">
            I'm currently open to new opportunities and collaborations.
            Whether you have a project in mind or just want to say hi,
            feel free to reach out!
          </p>
          <a href="mailto:your@email.com" className="contact-email hover-target">
            your@email.com
          </a>

          <div className="contact-socials">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link hover-target">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link hover-target">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link hover-target">
              <FaTwitter />
            </a>
          </div>
        </motion.div>

        <div className="contact-right">
          <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
            <ParticleField count={1000} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        </div>
      </div>

      <div className="footer">
        <p>Built with <span>♥</span> by Anuj Kumar Soni © 2026</p>
      </div>
    </section>
  )
}

export default Contact