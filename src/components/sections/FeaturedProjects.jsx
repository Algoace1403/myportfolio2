import { useState } from 'react'
import { motion } from 'framer-motion'
import { featuredProjects } from '../../data/projects'
import { continents } from '../../data/skills'
import ProjectPanel from '../ui/ProjectPanel'
import '../../styles/featured-projects.css'

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState(null)

  const getContinentColor = (continentId) => {
    const continent = continents.find((c) => c.id === continentId)
    return continent?.color || '#00ccff'
  }

  return (
    <section className="featured-projects" id="projects">
      <div className="featured-projects__inner">
        <motion.span
          className="section-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          FEATURED WORK
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Project Landmarks
        </motion.h2>
        <motion.p
          className="featured-projects__subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Each project is a city on my world — click to explore.
        </motion.p>

        <div className="project-grid">
          {featuredProjects.map((project, i) => {
            const color = getContinentColor(project.continent)
            return (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedProject(project)}
                style={{ '--card-color': color }}
              >
                {/* Status indicator */}
                <div className="project-card__status">
                  <span
                    className="project-card__status-dot"
                    style={{ background: project.status === 'live' ? '#00ff88' : '#ffcc00' }}
                  />
                  <span>{project.status}</span>
                </div>

                {/* Content */}
                <h3 className="project-card__name">{project.name}</h3>
                <p className="project-card__tagline">{project.tagline}</p>

                {/* Stack preview */}
                <div className="project-card__stack">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span key={tech} className="project-card__tech">{tech}</span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="project-card__tech">+{project.stack.length - 4}</span>
                  )}
                </div>

                {/* Explore prompt */}
                <div className="project-card__explore">
                  <span>Explore</span>
                  <span className="project-card__arrow">→</span>
                </div>

                {/* Decorative corner accent */}
                <div className="project-card__accent" style={{ background: color }} />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Detail panel */}
      <ProjectPanel
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
