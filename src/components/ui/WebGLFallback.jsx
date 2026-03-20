import { motion } from 'framer-motion'
import profile from '../../data/profile'
import '../../styles/webgl-fallback.css'

export default function WebGLFallback() {
  return (
    <div className="webgl-fallback" role="img" aria-label="Portfolio hero — 3D globe visualization unavailable">
      {/* Animated gradient background as fallback */}
      <div className="webgl-fallback__bg" />

      {/* Static planet representation */}
      <motion.div
        className="webgl-fallback__planet"
        animate={{
          boxShadow: [
            '0 0 60px rgba(0,204,255,0.2), inset 0 0 40px rgba(0,204,255,0.1)',
            '0 0 80px rgba(0,204,255,0.3), inset 0 0 60px rgba(0,204,255,0.15)',
            '0 0 60px rgba(0,204,255,0.2), inset 0 0 40px rgba(0,204,255,0.1)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="webgl-fallback__ring webgl-fallback__ring--1" />
        <div className="webgl-fallback__ring webgl-fallback__ring--2" />
      </motion.div>

      {/* Content overlay */}
      <div className="webgl-fallback__content">
        <span className="webgl-fallback__label">{profile.name.toUpperCase()}</span>
        <h1 className="webgl-fallback__aka">{profile.aka}</h1>
        <p className="webgl-fallback__title">{profile.title}</p>
      </div>
    </div>
  )
}
