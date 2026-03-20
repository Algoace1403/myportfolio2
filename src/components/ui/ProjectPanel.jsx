import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'
import '../../styles/project-panel.css'

export default function ProjectPanel({ project, onClose }) {
  if (!project) return null

  const statusColors = {
    live: '#00ff88',
    'in-progress': '#ffcc00',
    ongoing: '#00ccff',
    archived: '#666',
  }

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="panel-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="project-panel"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 35, stiffness: 200, mass: 0.8 }}
          >
            {/* Close button */}
            <button className="panel-close" onClick={onClose}>
              <FaTimes />
            </button>

            {/* Header */}
            <div className="panel-header">
              <div className="panel-status" style={{ color: statusColors[project.status] }}>
                <span className="panel-status-dot" style={{ background: statusColors[project.status] }} />
                {project.status}
              </div>
              <h2 className="panel-title">{project.name}</h2>
              <p className="panel-tagline">{project.tagline}</p>
            </div>

            {/* Thumbnail */}
            {project.thumbnail && (
              <div className="panel-thumbnail">
                <img src={project.thumbnail} alt={project.name} />
              </div>
            )}

            {/* Description */}
            <div className="panel-section">
              <p className="panel-description">{project.description}</p>
            </div>

            {/* Role */}
            <div className="panel-section">
              <h3 className="panel-section-label">Role</h3>
              <p className="panel-role">{project.role}</p>
            </div>

            {/* Stack */}
            <div className="panel-section">
              <h3 className="panel-section-label">Tech Stack</h3>
              <div className="panel-tags">
                {project.stack.map((tech) => (
                  <span key={tech} className="panel-tag">{tech}</span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="panel-section">
              <h3 className="panel-section-label">Key Features</h3>
              <ul className="panel-features">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Impact & Lessons */}
            <div className="panel-section">
              <h3 className="panel-section-label">Impact</h3>
              <p className="panel-text">{project.impact}</p>
            </div>

            <div className="panel-section">
              <h3 className="panel-section-label">Lessons Learned</h3>
              <p className="panel-text">{project.lessons}</p>
            </div>

            {/* Links */}
            <div className="panel-links">
              {project.links.github && project.links.github !== '#' && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel-link"
                >
                  <FaGithub /> Source Code
                </a>
              )}
              {project.links.live && project.links.live !== '#' && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel-link panel-link--primary"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
