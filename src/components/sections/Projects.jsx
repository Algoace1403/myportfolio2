import { motion } from 'framer-motion'
import { useRef } from 'react'
import '../../styles/projects.css'

const projects = [
  {
    title: 'Portfolio Website',
    desc: 'A 3D interactive portfolio with space theme, particle systems, and smooth animations.',
    tags: ['React', 'Three.js', 'GSAP'],
    emoji: '🚀',
    github: '#',
    live: '#',
  },
  {
    title: 'Weather App',
    desc: 'Real-time weather application with beautiful UI and location-based forecasts.',
    tags: ['JavaScript', 'API', 'CSS'],
    emoji: '🌤️ ',
    github: '#',
    live: '#',
  },
  {
    title: 'Task Manager',
    desc: 'A full-stack to-do application with drag and drop, authentication, and dark mode.',
    tags: ['React', 'Node.js', 'MongoDB'],
    emoji: '📋',
    github: '#',
    live: '#',
  },
  {
    title: 'E-Commerce Store',
    desc: 'Online store with cart, payment integration, and responsive design.',
    tags: ['React', 'Stripe', 'Firebase'],
    emoji: '🛒',
    github: '#',
    live: '#',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
  }

  return (
    <motion.div
      ref={cardRef}
      className="project-card hover-target"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
    >
      <div className="project-image">{project.emoji}</div>
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="project-links">
          <a href={project.github} className="project-link link-secondary">
            GITHUB
          </a>
          <a href={project.live} className="project-link link-primary">
            LIVE DEMO
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function Projects() {
  return (
    <section id="projects" className="projects">
      <motion.div
        className="projects-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="section-label">// PROJECTS</p>
        <div className="about-line" style={{ margin: '0 auto 25px' }}></div>
        <h2 className="section-title">MY WORK</h2>
      </motion.div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Projects
