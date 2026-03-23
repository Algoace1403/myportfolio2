import { useState, useRef } from 'react'

const terminalResponses = {
  help: 'Commands: about, skills, secret, hack, clear, joke, matrix, hire, coffee, sudo, ls, whoami, date, neofetch, cat, ping, rm',
  about: 'Anuj Kumar Soni — Full Stack Developer who builds crazy 3D websites.',
  skills: '[ React, JavaScript, Three.js, CSS, Node.js, GSAP, Git ]',
  secret: '> ACCESS GRANTED. The meaning of life is... 42. You are now level 2.',
  hack: '> ACCESSING MAINFRAME... [||||||||||||] 100%\n  Just kidding. Nice try though. FBI has been notified.',
  joke: () => {
    const jokes = [
      'Why do programmers prefer dark mode? Because light attracts bugs.',
      'A SQL query walks into a bar, sees two tables and asks... "Can I JOIN you?"',
      "Why do Java developers wear glasses? Because they can't C#.",
      "!false — It's funny because it's true.",
      "A programmer's wife tells him: \"Go to the store and buy a loaf of bread. If they have eggs, buy a dozen.\" He comes back with 12 loaves.",
      "There are only 10 types of people in the world: those who understand binary and those who don't.",
      "Why was the JavaScript developer sad? Because he didn't Node how to Express himself.",
      "What's a programmer's favorite hangout place? Foo Bar.",
      "Why do Python programmers have low self-esteem? They're constantly comparing themselves to others.",
      'How many programmers does it take to change a light bulb? None. That\'s a hardware problem.',
      '["hip", "hip"] — Hip Hip Array!',
      'A web developer walks into a restaurant. He immediately leaves — the tables had no border.',
      'Why did the developer go broke? Because he used up all his cache.',
      'Debugging: Being the detective in a crime movie where you are also the murderer.',
      "It works on my machine. Then we'll ship your machine.",
    ]
    return jokes[Math.floor(Math.random() * jokes.length)]
  },
  matrix: '01001000 01100101 01101100 01101100 01101111 — Wake up, Neo... The Matrix has you.',
  hello: 'Hey there! Welcome to my terminal. Try "help" for commands.',
  sudo: '> Permission denied. You are not Anuj. This incident will be reported.',
  ls: 'projects/  skills/  secret_folder/  .env  README.md  node_modules/ (do NOT open)',
  whoami: "A curious visitor exploring Anuj's portfolio. Respect +1.",
  date: new Date().toLocaleDateString(),
  hire: '> HIRE_ME.exe initiated...\n  Status: Open to opportunities!\n  Email: anuj.soni1403@gmail.com\n  Response time: < 24hrs\n  Coffee preference: Required',
  coffee: '  ( (\n   ) )\n  .......\n  |     |]\n  \\     /\n   `---`\n  COFFEE.exe — fuel level: CRITICAL',
  neofetch: '  AKS@portfolio\n  ---------------\n  OS: Web 3.0\n  Host: Vite + React\n  Shell: AKS Terminal v1.0\n  Theme: Space Dark\n  CPU: 100% passion\n  GPU: Three.js powered\n  Memory: Unlimited curiosity',
  cat: '> meow? Did you mean "cat README.md"?\n  ...just kidding. README.md: "Hi, I\'m Anuj. I build cool stuff."',
  ping: '> Pinging anuj...\n  Reply from anuj: bytes=32 time<1ms TTL=64\n  Status: ALIVE and CODING',
  rm: '> rm -rf / ? Nice try. System protected by plot armor.',
  default: 'Command not found. Type "help" for available commands.',
}

export default function Terminal() {
  const [lines, setLines] = useState([
    { type: 'response', text: 'Welcome to AKS Terminal v1.0' },
    { type: 'response', text: 'Type "help" to see available commands.' },
  ])
  const [input, setInput] = useState('')
  const bodyRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const cmd = input.trim().toLowerCase()
    const newLines = [...lines, { type: 'prompt', text: `$ ${input}` }]

    if (cmd === 'clear') {
      setLines([])
    } else {
      const raw = terminalResponses[cmd] || terminalResponses.default
      const response = typeof raw === 'function' ? raw() : raw
      newLines.push({ type: 'response', text: response })
      setLines(newLines)
    }

    setInput('')
    setTimeout(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }, 50)
  }

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <div className="terminal-dot dot-red"></div>
        <div className="terminal-dot dot-yellow"></div>
        <div className="terminal-dot dot-green"></div>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {lines.map((line, i) => (
          <div key={i} className={`terminal-line ${line.type === 'prompt' ? 'terminal-prompt' : 'terminal-response'}`}>
            {line.text}
          </div>
        ))}
      </div>
      <div className="terminal-hints">
        {['help', 'hack', 'secret', 'hire', 'coffee', 'neofetch', 'joke', 'matrix', 'ping', 'rm'].map((cmd) => (
          <button key={cmd} className="hint-btn" onClick={() => setInput(cmd)}>
            {cmd}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="terminal-input-row">
        <span>$</span>
        <input
          className="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type a command..."
          aria-label="Terminal command input"
          autoFocus
        />
      </form>
    </div>
  )
}
