// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SOCIALS — External links, profiles, and contact
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const socials = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: 'FaGithub',
    label: '@yourusername',
    color: '#fff',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: 'FaLinkedin',
    label: 'Anuj Kumar Soni',
    color: '#0077b5',
  },
  {
    id: 'twitter',
    name: 'X / Twitter',
    url: 'https://x.com/yourusername',
    icon: 'FaXTwitter',
    label: '@yourusername',
    color: '#fff',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com/yourusername',
    icon: 'FaInstagram',
    label: '@yourusername',
    color: '#e4405f',
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:your@email.com',
    icon: 'FaEnvelope',
    label: 'your@email.com',
    color: '#00ccff',
  },
]

// Navigation links
const navLinks = [
  { label: 'World', path: '/', section: 'hero' },
  { label: 'About', path: '/#about', section: 'about' },
  { label: 'Projects', path: '/work', section: 'projects' },
  { label: 'Journey', path: '/timeline', section: 'timeline' },
  { label: 'Contact', path: '/contact', section: 'contact' },
]

export { socials, navLinks }
export default socials
