import { motion } from 'framer-motion'
import TextReveal from '../ui/TextReveal'
import useScrollReveal from '../../hooks/useScrollReveal'
import '../../styles/skills.css'

const skillCategories = [
  {
    label: 'Frontend',
    color: '#00ccff',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS'],
  },
  {
    label: 'Backend',
    color: '#00ff88',
    tools: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'PostgreSQL', 'Firebase'],
  },
  {
    label: 'Creative',
    color: '#e040fb',
    tools: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'WebGL', 'GSAP', 'Canvas API'],
  },
  {
    label: 'AI / Data',
    color: '#ff6600',
    tools: ['Python', 'TensorFlow', 'Pandas', 'Prompt Engineering', 'LLM APIs'],
  },
  {
    label: 'Tools',
    color: '#ffcc00',
    tools: ['Git', 'Docker', 'Vercel', 'Figma', 'VS Code', 'Linux/CLI'],
  },
  {
    label: 'Learning',
    color: '#8800ff',
    tools: ['Rust', 'WebGPU', 'System Design'],
  },
]

function Skills() {
  const gridRef = useScrollReveal({
    childSelector: '.skill-category',
    stagger: 0.1,
    y: 30,
  })

  return (
    <section id="skills" className="skills">
      <div className="skills-header">
        <motion.p
          className="section-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          // SKILLS
        </motion.p>
        <div className="about-line" style={{ margin: '0 auto 25px' }}></div>
        <TextReveal text="TECH STACK" tag="h2" className="section-title" />
      </div>

      <div className="skills-categories" ref={gridRef}>
        {skillCategories.map((cat) => (
          <div key={cat.label} className="skill-category">
            <span
              className="skill-category__label"
              style={{ color: cat.color }}
            >
              {cat.label}
            </span>
            <div className="skill-category__tools">
              {cat.tools.map((tool) => (
                <span
                  key={tool}
                  className="skill-tag hover-target"
                  style={{ borderColor: `${cat.color}33` }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
