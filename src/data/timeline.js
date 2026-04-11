// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TIMELINE — Journey milestones, education, achievements
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const timeline = [
  {
    id: 'start',
    year: '2024',
    title: 'The Beginning',
    subtitle: 'First line of code',
    description: 'Wrote my first HTML page and instantly fell in love with building things from nothing. The screen responded to my words — that was magic.',
    type: 'milestone',
    icon: '◆',
    color: '#00ccff',
  },
  {
    id: 'web-fundamentals',
    year: '2024',
    title: 'Web Fundamentals',
    subtitle: 'HTML, CSS, JavaScript',
    description: 'Deep-dived into the web platform. Built projects, broke things, fixed them, and started to understand how the internet actually works.',
    type: 'education',
    icon: '◇',
    color: '#00ccff',
  },
  {
    id: 'iit-madras',
    year: '2025',
    title: 'IIT Madras — UG in CSE',
    subtitle: 'Undergraduate enrollment (2025–2029)',
    description: 'Started formal Computer Science education at IIT Madras. The combination of theoretical foundations and practical skills accelerated everything.',
    type: 'education',
    icon: '◈',
    color: '#ffcc00',
  },
  {
    id: 'react-fullstack',
    year: '2025',
    title: 'React & Full Stack',
    subtitle: 'Components, APIs, databases',
    description: 'React changed how I think about UI. Then backend clicked — Node.js, MongoDB, Express, REST APIs. Suddenly I could build complete products front to back.',
    type: 'milestone',
    icon: '⚛',
    color: '#8800ff',
  },
  {
    id: '3d-web',
    year: '2025',
    title: 'Into the Third Dimension',
    subtitle: 'Three.js, shaders, WebGL',
    description: 'Discovered Three.js and React Three Fiber. Started building immersive 3D experiences and learning GLSL shaders. The web became a canvas.',
    type: 'milestone',
    icon: '◎',
    color: '#ff3388',
  },
  {
    id: 'ai-exploration',
    year: '2025',
    title: 'AI & Machine Learning',
    subtitle: 'LLMs, TensorFlow, reinforcement learning',
    description: 'Built AI-powered tools — from CI/CD healing agents to image classifiers. Explored reinforcement learning for robotics. AI became a core skill.',
    type: 'milestone',
    icon: '◉',
    color: '#ff6600',
  },
  {
    id: 'meta-hackathon',
    year: '2026',
    title: 'Meta PyTorch OpenEnv — National Finalist',
    subtitle: 'Top finalists out of 52,000+ developers',
    description: 'Built a reinforcement learning environment for AI-driven data cleaning. Cleared Round 1 and advanced to the Grand Finale in Bangalore — presenting directly to Meta engineers, competing for prizes and direct interview opportunities at Meta and Hugging Face.',
    type: 'milestone',
    icon: '◈',
    color: '#0668E1',
  },
  {
    id: 'portfolio-world',
    year: '2026',
    title: 'World Portfolio',
    subtitle: 'This site — the culmination',
    description: 'Combined everything I\'ve learned into one immersive experience. Hyper-realistic Earth, custom shaders, premium UI, and a story that matters. This is just the beginning.',
    type: 'project',
    icon: '◆',
    color: '#00ccff',
  },
]

const achievements = [
  {
    id: 'projects-built',
    label: 'Projects Built',
    value: '10+',
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
    value: '500K+',
    icon: '◎',
  },
  {
    id: 'hackathon-finalist',
    label: 'Meta Hackathon Finalist',
    value: 'Top 0.1%',
    icon: '◉',
  },
]

export { timeline, achievements }
export default timeline
