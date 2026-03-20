import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONTINENTS } from '../3d/PlanetWorld'
import '../../styles/world-legend.css'

export default function WorldLegend({ isVisible = true }) {
  const [expanded, setExpanded] = useState(false)

  if (!isVisible) return null

  return (
    <motion.div
      className="world-legend"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      <button
        className="world-legend__toggle"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="world-legend__toggle-icon">{expanded ? '✕' : '◆'}</span>
        <span className="world-legend__toggle-label">
          {expanded ? 'CLOSE' : 'LEGEND'}
        </span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="world-legend__panel"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="world-legend__title">WORLD MAP</div>
            <div className="world-legend__subtitle">Each continent = skill domain</div>

            <div className="world-legend__items">
              {CONTINENTS.map((c) => (
                <div key={c.name} className="world-legend__item">
                  <span
                    className="world-legend__dot"
                    style={{ background: `#${c.color.getHexString()}` }}
                  />
                  <span className="world-legend__item-name">{c.name}</span>
                </div>
              ))}
            </div>

            <div className="world-legend__symbols">
              <div className="world-legend__symbol-row">
                <span className="world-legend__symbol-icon">◯</span>
                <span>Orbital rings = growth trajectory</span>
              </div>
              <div className="world-legend__symbol-row">
                <span className="world-legend__symbol-icon">⌇</span>
                <span>Data arcs = skill connections</span>
              </div>
              <div className="world-legend__symbol-row">
                <span className="world-legend__symbol-icon">◉</span>
                <span>Energy core = ambition</span>
              </div>
              <div className="world-legend__symbol-row">
                <span className="world-legend__symbol-icon">☁</span>
                <span>Clouds = always evolving</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
