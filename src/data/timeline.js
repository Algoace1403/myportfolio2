// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TIMELINE — Journey milestones, education, achievements
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const timeline = [
  {
    id: 'start',
    year: '2020',
    title: 'The Beginning',
    subtitle: 'First line of code',
    description: 'Wrote my first HTML page and instantly fell in love with the power of building things from nothing. The screen responded to my words — that was magic.',
    type: 'milestone', // milestone | education | achievement | project
    icon: '◆',
    color: '#00ccff',
  },
  {
    id: 'web-fundamentals',
    year: '2021',
    title: 'Web Fundamentals',
    subtitle: 'HTML, CSS, JavaScript mastered',
    description: 'Deep-dived into the web platform. Built dozens of projects, broke things, fixed them, and started to understand how the internet actually works.',
    type: 'education',
    icon: '◇',
    color: '#00ccff',
  },
  {
    id: 'react-era',
    year: '2022',
    title: 'The React Era',
    subtitle: 'Component thinking unlocked',
    description: 'React changed how I think about UI. Started building real applications — weather apps, task managers, and anything I could imagine.',
    type: 'milestone',
    icon: '⚛',
    color: '#8800ff',
  },
  {
    id: 'btech',
    year: '2022',
    title: 'B.Tech Computer Science',
    subtitle: 'University enrollment',
    description: 'Started formal CS education while continuing to build. The combination of theoretical foundations and practical skills accelerated everything.',
    type: 'education',
    icon: '◈',
    color: '#ffcc00',
  },
  {
    id: 'fullstack',
    year: '2023',
    title: 'Full Stack Unlocked',
    subtitle: 'Node.js, databases, APIs',
    description: 'Backend clicked. Suddenly I could build complete products — front to back. MongoDB, Express, REST APIs, authentication — the MERN stack became my weapon.',
    type: 'milestone',
    icon: '▣',
    color: '#00ff88',
  },
  {
    id: '3d-web',
    year: '2024',
    title: 'Into the Third Dimension',
    subtitle: 'Three.js, shaders, WebGL',
    description: 'Discovered Three.js and React Three Fiber. Started building immersive 3D experiences. Learned GLSL shaders. The web became a canvas.',
    type: 'milestone',
    icon: '◎',
    color: '#ff3388',
  },
  {
    id: 'ai-exploration',
    year: '2024',
    title: 'AI Exploration',
    subtitle: 'LLMs, prompt engineering, Python ML',
    description: 'Started experimenting with AI — building chatbots, exploring machine learning, and understanding how large language models work under the hood.',
    type: 'milestone',
    icon: '◉',
    color: '#ff6600',
  },
  {
    id: 'portfolio-world',
    year: '2025',
    title: 'World Portfolio',
    subtitle: 'This site — the culmination',
    description: 'Combined everything I\'ve learned into one immersive experience. Custom shaders, 3D worlds, premium UI, and a story that matters. This is just the beginning.',
    type: 'project',
    icon: '◆',
    color: '#00ccff',
  },
]

const achievements = [
  {
    id: 'projects-built',
    label: 'Projects Built',
    value: '15+',
    icon: '◆',
  },
  {
    id: 'technologies',
    label: 'Technologies',
    value: '25+',
    icon: '◇',
  },
  {
    id: 'github-repos',
    label: 'GitHub Repos',
    value: '20+',
    icon: '◈',
  },
  {
    id: 'lines-of-code',
    label: 'Lines of Code',
    value: '50K+',
    icon: '◎',
  },
]

export { timeline, achievements }
export default timeline
