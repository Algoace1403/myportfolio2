import { motion } from 'framer-motion'

export default function SectionDivider({ accent = 'cyan' }) {
  const colors = {
    cyan: '#00ccff',
    purple: '#8800ff',
    pink: '#ff3388',
    green: '#00ff88',
    orange: '#ff6600',
  }

  const color = colors[accent] || colors.cyan

  return (
    <motion.div
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 5%',
        height: '1px',
        position: 'relative',
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div
        style={{
          width: '100%',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${color}25, transparent)`,
        }}
      />
      {/* Center dot accent */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: color,
          opacity: 0.4,
          boxShadow: `0 0 8px ${color}44`,
        }}
      />
    </motion.div>
  )
}
