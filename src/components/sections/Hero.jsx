import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import ParticleField from '../3d/ParticleField'
import '../../styles/hero.css'

const roles = [
  'Full Stack Developer',
  '3D Web Enthusiast',
  'Problem Solver',
  'Creative Coder',
  'UI/UX Lover',
]

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 50, pause = 1500) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, text.length + 1))
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pause)
        }
      } else {
        setText(currentWord.slice(0, text.length - 1))
        if (text.length === 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause])

  return text
}

function Hero() {
  const typedRole = useTypewriter(roles)

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
        <h2 className="hero-title">
          <span className="typed-text">{typedRole}</span>
          <span className="typed-cursor">|</span>
        </h2>
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
