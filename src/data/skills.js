// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SKILLS — Organized as continents > countries > cities
// Each continent = skill domain on the 3D planet
// Each country = skill category
// Each city = specific technology/tool
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const continents = [
  {
    id: 'web-dev',
    name: 'Web Development',
    icon: '◆',
    color: '#00ccff',
    description: 'The foundation — from pixel-perfect frontends to robust backends.',
    // 3D position on planet (longitude angle range in radians)
    planetAngle: [-Math.PI, -1.2],
    countries: [
      {
        name: 'Frontend',
        cities: [
          { name: 'React', level: 90, icon: '⚛' },
          { name: 'Next.js', level: 75, icon: '▲' },
          { name: 'TypeScript', level: 70, icon: 'TS' },
          { name: 'HTML/CSS', level: 95, icon: '◇' },
          { name: 'Tailwind CSS', level: 85, icon: '◎' },
          { name: 'Framer Motion', level: 80, icon: '◈' },
        ],
      },
      {
        name: 'Backend',
        cities: [
          { name: 'Node.js', level: 80, icon: '⬡' },
          { name: 'Express', level: 75, icon: '▷' },
          { name: 'REST APIs', level: 85, icon: '⟡' },
          { name: 'MongoDB', level: 70, icon: '◉' },
          { name: 'PostgreSQL', level: 65, icon: '▣' },
          { name: 'Firebase', level: 70, icon: '◐' },
        ],
      },
    ],
  },
  {
    id: 'ai-data',
    name: 'AI / Data / Analytics',
    icon: '◈',
    color: '#ff6600',
    description: 'Where intelligence meets data — models, analysis, and insight.',
    planetAngle: [1.2, Math.PI],
    countries: [
      {
        name: 'Machine Learning',
        cities: [
          { name: 'Python', level: 80, icon: '🐍' },
          { name: 'TensorFlow', level: 55, icon: '◎' },
          { name: 'Pandas', level: 70, icon: '◆' },
          { name: 'NumPy', level: 70, icon: '▦' },
          { name: 'Jupyter', level: 75, icon: '◉' },
        ],
      },
      {
        name: 'AI Tools',
        cities: [
          { name: 'Prompt Engineering', level: 80, icon: '◇' },
          { name: 'LLM APIs', level: 75, icon: '⟡' },
          { name: 'Data Viz', level: 70, icon: '◐' },
        ],
      },
    ],
  },
  {
    id: 'cs-fundamentals',
    name: 'Programming / CS',
    icon: '▣',
    color: '#8800ff',
    description: 'The bedrock — algorithms, systems thinking, and problem solving.',
    planetAngle: [-1.2, 0],
    countries: [
      {
        name: 'Languages',
        cities: [
          { name: 'JavaScript', level: 90, icon: 'JS' },
          { name: 'Python', level: 80, icon: '🐍' },
          { name: 'C/C++', level: 60, icon: '◆' },
          { name: 'Java', level: 55, icon: '◈' },
        ],
      },
      {
        name: 'Concepts',
        cities: [
          { name: 'DSA', level: 70, icon: '◎' },
          { name: 'OOP', level: 80, icon: '▣' },
          { name: 'System Design', level: 60, icon: '◉' },
          { name: 'Git & Version Control', level: 85, icon: '⟡' },
        ],
      },
    ],
  },
  {
    id: 'tools-workflow',
    name: 'Tools / Workflow',
    icon: '◎',
    color: '#00ff88',
    description: 'Speed and precision — the systems that make everything else faster.',
    planetAngle: [0, 1.2],
    countries: [
      {
        name: 'DevOps & Cloud',
        cities: [
          { name: 'Docker', level: 55, icon: '◆' },
          { name: 'Vercel', level: 80, icon: '▲' },
          { name: 'Netlify', level: 75, icon: '◇' },
          { name: 'CI/CD', level: 60, icon: '◈' },
          { name: 'Linux/CLI', level: 70, icon: '◉' },
        ],
      },
      {
        name: 'Design & Productivity',
        cities: [
          { name: 'Figma', level: 75, icon: '◐' },
          { name: 'VS Code', level: 90, icon: '◎' },
          { name: 'Notion', level: 80, icon: '▣' },
        ],
      },
    ],
  },
  {
    id: 'creative',
    name: 'Experiments / Creative',
    icon: '◇',
    color: '#ff3388',
    description: 'The playground — where wild ideas become interactive realities.',
    planetAngle: [0.6, 2.0],
    countries: [
      {
        name: '3D & Graphics',
        cities: [
          { name: 'Three.js', level: 75, icon: '◆' },
          { name: 'React Three Fiber', level: 70, icon: '⚛' },
          { name: 'GLSL Shaders', level: 55, icon: '◈' },
          { name: 'WebGL', level: 60, icon: '◎' },
          { name: 'GSAP', level: 70, icon: '◉' },
        ],
      },
      {
        name: 'Creative Coding',
        cities: [
          { name: 'Canvas API', level: 70, icon: '◇' },
          { name: 'Generative Art', level: 50, icon: '◐' },
          { name: 'Audio Viz', level: 45, icon: '◎' },
        ],
      },
    ],
  },
  {
    id: 'journey',
    name: 'Learning Journey',
    icon: '◉',
    color: '#ffcc00',
    description: 'The path so far — milestones, certifications, and growth.',
    planetAngle: [-2.5, -1.5],
    countries: [
      {
        name: 'Education',
        cities: [
          { name: 'B.Tech CS', level: 100, icon: '◆' },
          { name: 'Self-Taught Web', level: 100, icon: '◇' },
        ],
      },
      {
        name: 'Certifications',
        cities: [
          { name: 'Add your certs here', level: 100, icon: '◈' },
        ],
      },
    ],
  },
]

// Flatten all cities for search/filter
const allSkills = continents.flatMap((continent) =>
  continent.countries.flatMap((country) =>
    country.cities.map((city) => ({
      ...city,
      country: country.name,
      continent: continent.name,
      continentId: continent.id,
      color: continent.color,
    }))
  )
)

export { continents, allSkills }
export default continents
