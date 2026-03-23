import { motion } from 'framer-motion'
import { useRef } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import TextReveal from '../ui/TextReveal'
import useScrollReveal from '../../hooks/useScrollReveal'
import '../../styles/projects.css'

const projects = [
  {
    title: 'DebugIt',
    subtitle: 'CI/CD Healing Agent',
    desc: 'An autonomous AI agent that clones repos, detects test failures, classifies bugs, generates fixes using Claude AI, and monitors CI/CD — iterating until all tests pass. Built with LangGraph state machine architecture.',
    challenge: 'CI/CD failures waste hours of developer time. Manual debugging is slow and repetitive.',
    result: 'Hackathon winner — autonomous agent fixes bugs in minutes, not hours.',
    tags: ['Python', 'FastAPI', 'LangGraph', 'Claude AI', 'React', 'WebSocket'],
    highlight: 'AI-Powered',
    highlightDesc: 'Hackathon winner — recruiter magnet showcasing AI engineering skills',
    github: 'https://github.com/Algoace1403/debugit',
    live: 'https://frontend-psi-five-60.vercel.app',
    gradient: 'debugit',
    icon: (
      <svg className="project-svg" viewBox="0 0 120 120" fill="none">
        <rect x="15" y="20" width="90" height="65" rx="8" stroke="#4fc3f7" strokeWidth="2" fill="rgba(79,195,247,0.05)" />
        <rect x="25" y="30" width="50" height="4" rx="2" fill="#ff7b72" opacity="0.8" />
        <rect x="25" y="40" width="35" height="4" rx="2" fill="#4fc3f7" opacity="0.6" />
        <rect x="25" y="50" width="60" height="4" rx="2" fill="#a5d6ff" opacity="0.5" />
        <rect x="25" y="60" width="40" height="4" rx="2" fill="#4caf50" opacity="0.7" />
        <rect x="25" y="70" width="55" height="4" rx="2" fill="#e040fb" opacity="0.4" />
        <circle cx="90" cy="45" r="12" stroke="#4caf50" strokeWidth="2" fill="rgba(76,175,80,0.1)" />
        <path d="M85 45L88 48L95 41" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40 95L50 85L60 92L70 82L80 88" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="40" cy="95" r="2.5" fill="#4fc3f7" />
        <circle cx="50" cy="85" r="2.5" fill="#e040fb" />
        <circle cx="60" cy="92" r="2.5" fill="#4fc3f7" />
        <circle cx="70" cy="82" r="2.5" fill="#e040fb" />
        <circle cx="80" cy="88" r="2.5" fill="#4fc3f7" />
      </svg>
    ),
  },
  {
    title: 'OneDrive Clone',
    subtitle: 'Cloud Storage Platform',
    desc: 'Full-stack cloud storage app with file management, sharing, real-time collaboration, version control, comments, search, and admin dashboard. Deployed on Vercel with Supabase backend.',
    challenge: 'Build a production-grade cloud storage platform from scratch with real-time collaboration.',
    result: '560K+ lines of TypeScript — fully deployed, live users, admin dashboard.',
    tags: ['Next.js', 'TypeScript', 'Express', 'Supabase', 'Socket.io', 'Tailwind'],
    highlight: 'Full-Stack',
    highlightDesc: '560K+ lines of TypeScript — production-grade with live deployment',
    github: 'https://github.com/Algoace1403/OneDrive-clone',
    live: 'https://onedrive-frontend.vercel.app',
    gradient: 'onedrive',
    icon: (
      <svg className="project-svg" viewBox="0 0 120 120" fill="none">
        <path d="M30 75C30 75 25 55 45 50C45 50 48 35 65 35C82 35 88 48 88 48C88 48 105 50 100 70C95 85 30 85 30 75Z" stroke="#4fc3f7" strokeWidth="2" fill="rgba(79,195,247,0.08)" />
        <path d="M50 55C50 55 52 45 62 45C72 45 75 52 75 52" stroke="#e040fb" strokeWidth="1.5" opacity="0.6" fill="none" />
        <rect x="52" y="68" width="16" height="3" rx="1.5" fill="#4fc3f7" opacity="0.6" />
        <path d="M58 62V78" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round" />
        <path d="M53 67L58 62L63 67" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="20" y="90" width="80" height="8" rx="4" fill="rgba(79,195,247,0.1)" stroke="rgba(79,195,247,0.2)" strokeWidth="1" />
        <rect x="22" y="92" width="52" height="4" rx="2" fill="rgba(79,195,247,0.4)" />
        <text x="96" y="97" fill="#4fc3f7" fontSize="6" fontFamily="monospace" textAnchor="end">65%</text>
      </svg>
    ),
  },
  {
    title: 'Go2 Locomotion',
    subtitle: 'Robot RL Training',
    desc: 'Reinforcement Learning training for Unitree Go2 quadruped robot using Genesis simulator. Teaches walking, running, jumping, spinning, and dancing using PPO algorithm with 4096 parallel environments.',
    challenge: 'Train a real quadruped robot to walk, run, and dance using only reinforcement learning.',
    result: '4096 parallel environments — robot learns complex locomotion in hours, not days.',
    tags: ['Python', 'PyTorch', 'RL/PPO', 'Genesis Sim', 'Robotics'],
    highlight: 'Robotics + RL',
    highlightDesc: 'Unique project — nobody else has a robot that learned to dance',
    github: 'https://github.com/Algoace1403/Go2-Locomotion-Hackathon',
    live: null,
    gradient: 'robot',
    icon: (
      <svg className="project-svg" viewBox="0 0 120 120" fill="none">
        <rect x="40" y="25" width="40" height="30" rx="6" stroke="#e040fb" strokeWidth="2" fill="rgba(224,64,251,0.05)" />
        <circle cx="52" cy="40" r="4" fill="#4fc3f7" opacity="0.8" />
        <circle cx="68" cy="40" r="4" fill="#4fc3f7" opacity="0.8" />
        <rect x="55" y="48" width="10" height="3" rx="1.5" fill="#e040fb" opacity="0.5" />
        <rect x="48" y="55" width="24" height="15" rx="4" stroke="#e040fb" strokeWidth="1.5" fill="rgba(224,64,251,0.05)" />
        <line x1="48" y1="62" x2="35" y2="75" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round" />
        <line x1="72" y1="62" x2="85" y2="75" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round" />
        <line x1="53" y1="70" x2="45" y2="90" stroke="#e040fb" strokeWidth="2" strokeLinecap="round" />
        <line x1="67" y1="70" x2="75" y2="90" stroke="#e040fb" strokeWidth="2" strokeLinecap="round" />
        <circle cx="45" cy="92" r="3" fill="rgba(224,64,251,0.4)" stroke="#e040fb" strokeWidth="1" />
        <circle cx="75" cy="92" r="3" fill="rgba(224,64,251,0.4)" stroke="#e040fb" strokeWidth="1" />
        <circle cx="35" cy="77" r="2.5" fill="rgba(79,195,247,0.4)" stroke="#4fc3f7" strokeWidth="1" />
        <circle cx="85" cy="77" r="2.5" fill="rgba(79,195,247,0.4)" stroke="#4fc3f7" strokeWidth="1" />
        <line x1="56" y1="22" x2="56" y2="15" stroke="#4fc3f7" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="56" cy="13" r="2" fill="#4fc3f7" opacity="0.6" />
        <line x1="64" y1="22" x2="64" y2="15" stroke="#e040fb" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="64" cy="13" r="2" fill="#e040fb" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: 'SocialSphere',
    subtitle: 'Social Media Platform',
    desc: 'A fully interactive social media app built with pure vanilla JavaScript. Features posts, 6 reaction types, comments, follows, user profiles, hashtags, and localStorage persistence — no frameworks used.',
    challenge: 'Build a full social media platform without React, Vue, or any framework — pure DOM manipulation.',
    result: '143K lines of vanilla JavaScript — proves deep language mastery beyond frameworks.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'LocalStorage', 'DOM API'],
    highlight: 'Pure JS',
    highlightDesc: '143K lines of vanilla JavaScript — deep DOM mastery, zero frameworks',
    github: 'https://github.com/Algoace1403/socialsphere-app',
    live: 'https://algoace1403.github.io/socialsphere-app/',
    gradient: 'social',
    icon: (
      <svg className="project-svg" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="40" r="15" stroke="#e040fb" strokeWidth="2" fill="rgba(224,64,251,0.05)" />
        <circle cx="60" cy="35" r="6" fill="rgba(79,195,247,0.3)" stroke="#4fc3f7" strokeWidth="1.5" />
        <path d="M50 48C50 48 53 55 60 55C67 55 70 48 70 48" stroke="#4fc3f7" strokeWidth="1.5" fill="none" />
        <circle cx="30" cy="65" r="10" stroke="#4fc3f7" strokeWidth="1.5" fill="rgba(79,195,247,0.05)" />
        <circle cx="30" cy="62" r="4" fill="rgba(79,195,247,0.2)" stroke="#4fc3f7" strokeWidth="1" />
        <circle cx="90" cy="65" r="10" stroke="#4fc3f7" strokeWidth="1.5" fill="rgba(79,195,247,0.05)" />
        <circle cx="90" cy="62" r="4" fill="rgba(79,195,247,0.2)" stroke="#4fc3f7" strokeWidth="1" />
        <line x1="45" y1="50" x2="38" y2="58" stroke="rgba(224,64,251,0.4)" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="75" y1="50" x2="82" y2="58" stroke="rgba(224,64,251,0.4)" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="40" y1="68" x2="80" y2="68" stroke="rgba(79,195,247,0.3)" strokeWidth="1" strokeDasharray="3 2" />
        <rect x="35" y="82" width="50" height="22" rx="6" stroke="rgba(79,195,247,0.3)" strokeWidth="1.5" fill="rgba(79,195,247,0.03)" />
        <rect x="42" y="88" width="20" height="3" rx="1.5" fill="#4fc3f7" opacity="0.4" />
        <rect x="42" y="94" width="30" height="3" rx="1.5" fill="#e040fb" opacity="0.3" />
        <circle cx="76" cy="91" r="4" fill="none" stroke="#ff5252" strokeWidth="1.5" />
        <path d="M74 91L76 89L78 91L76 93Z" fill="#ff5252" opacity="0.6" />
      </svg>
    ),
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    const glow = glowRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    if (glow) {
      glow.style.opacity = '1'
      glow.style.left = `${x}px`
      glow.style.top = `${y}px`
    }
  }

  const handleMouseLeave = () => {
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }

  return (
    <motion.div
      ref={cardRef}
      className={`project-card project-${project.gradient} hover-target`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
    >
      <div ref={glowRef} className="project-glow" />
      <div className={`project-image project-img-${project.gradient}`}>
        <div className="project-highlight-badge">
          <span className="highlight-dot" />
          {project.highlight}
        </div>
        <div className="project-visual">
          {project.icon}
        </div>
        <div className="project-image-overlay" />
      </div>
      <div className="project-info">
        <div className="project-title-row">
          <div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-subtitle">{project.subtitle}</p>
          </div>
          <div className="project-number">0{index + 1}</div>
        </div>
        <div className="project-why">
          <span className="why-label">WHY THIS?</span>
          <span className="why-text">{project.highlightDesc}</span>
        </div>
        <p className="project-desc">{project.desc}</p>
        {project.challenge && (
          <div className="project-case-study">
            <div className="case-item">
              <span className="case-label">CHALLENGE</span>
              <span className="case-text">{project.challenge}</span>
            </div>
            <div className="case-item">
              <span className="case-label">RESULT</span>
              <span className="case-text">{project.result}</span>
            </div>
          </div>
        )}
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="project-links">
          <a href={project.github} target="_blank" rel="noreferrer" className="project-link link-secondary hover-target">
            <FaGithub style={{ marginRight: 6 }} />
            SOURCE CODE
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="project-link link-primary hover-target">
              <FaExternalLinkAlt style={{ marginRight: 6, fontSize: '0.65rem' }} />
              LIVE DEMO
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function Projects() {
  const gridRef = useScrollReveal({
    childSelector: '.project-card',
    stagger: 0.15,
    y: 50,
  })

  return (
    <section id="projects" className="projects">
      <div className="projects-header">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          // PROJECTS
        </motion.p>
        <div className="about-line" style={{ margin: '0 auto 25px' }}></div>
        <TextReveal text="FEATURED WORK" tag="h2" className="section-title" />
        <motion.p
          className="projects-subtitle"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Real projects. Real code. Real impact.
        </motion.p>
      </div>

      <div className="projects-grid" ref={gridRef}>
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Projects
