import { useState, useRef, useEffect, useCallback } from 'react'                                                                                                                                              
  import { motion } from 'framer-motion'                                                                                                                                                                        
  import '../styles/fun.css'                                                                                                                                                                                    
                                                                                                                                                                                                                
  /* ========== HACKER TERMINAL ========== */                                                                                                                                                                   
  const terminalResponses = {
    help: 'Commands: about, skills, secret, hack, clear, joke, matrix',
    about: 'Anuj Kumar Soni — Full Stack Developer who builds crazy 3D websites.',
    skills: '[ React, JavaScript, Three.js, CSS, Node.js, GSAP, Git ]',
    secret: '🔓 You found the secret! The meaning of life is... 42.',
    hack: '⚠️  ACCESSING MAINFRAME... just kidding. Nice try though 😎',
    joke: 'Why do programmers prefer dark mode? Because light attracts bugs 🐛',
    matrix: '01001000 01100101 01101100 01101100 01101111 — Wake up, Neo.',
    hello: 'Hey there! 👋 Welcome to my terminal.',
    sudo: '🚫 Permission denied. You are not Anuj.',
    ls: 'projects/  skills/  secret_folder/  README.md',
    whoami: 'A curious visitor exploring Anuj\'s portfolio. Welcome!',
    date: new Date().toLocaleDateString(),
    default: 'Command not found. Type "help" for available commands.',
  }

  function Terminal() {
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
        const response = terminalResponses[cmd] || terminalResponses.default
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
          {['help', 'hack', 'secret', 'joke', 'matrix', 'sudo', 'ls', 'whoami'].map((cmd) => (
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
            autoFocus
          />
        </form>
      </div>
    )
  }

  /* ========== REACTION GAME ========== */
  function ReactionGame() {
    const [state, setState] = useState('waiting')
    const [startTime, setStartTime] = useState(0)
    const [reactionTime, setReactionTime] = useState(0)
    const timeoutRef = useRef(null)

    const start = () => {
      setState('ready')
      const delay = 2000 + Math.random() * 3000
      timeoutRef.current = setTimeout(() => {
        setState('go')
        setStartTime(Date.now())
      }, delay)
    }

    const handleClick = () => {
      if (state === 'waiting') {
        start()
      } else if (state === 'ready') {
        clearTimeout(timeoutRef.current)
        setState('waiting')
      } else if (state === 'go') {
        const time = Date.now() - startTime
        setReactionTime(time)
        setState('result')
      } else if (state === 'result') {
        start()
      }
    }

    const getClass = () => {
      if (state === 'waiting') return 'reaction-waiting'
      if (state === 'ready') return 'reaction-ready'
      if (state === 'go') return 'reaction-go'
      return 'reaction-result'
    }

    return (
      <div className={`reaction-area ${getClass()} hover-target`} onClick={handleClick}>
        {state === 'waiting' && (
          <div>
            <p className="reaction-text">CLICK TO START</p>
          </div>
        )}
        {state === 'ready' && (
          <div>
            <p className="reaction-text" style={{ color: 'var(--nebula-pink)' }}>WAIT FOR GREEN...</p>
          </div>
        )}
        {state === 'go' && (
          <div>
            <p className="reaction-text" style={{ color: '#4caf50' }}>CLICK NOW!</p>
          </div>
        )}
        {state === 'result' && (
          <div>
            <p className="reaction-time">{reactionTime}</p>
            <p className="reaction-ms">milliseconds</p>
            <p className="reaction-text" style={{ marginTop: '10px', fontSize: '0.7rem', color: 'var(--gray)' }}>
              {reactionTime < 200 ? '🔥 INSANE!' : reactionTime < 300 ? '⚡ FAST!' : reactionTime < 400 ? '👍 GOOD' : '🐢 TRY AGAIN'}
            </p>
            <p className="reaction-text" style={{ marginTop: '5px', fontSize: '0.6rem' }}>CLICK TO RETRY</p>
          </div>
        )}
      </div>
    )
  }

  /* ========== GRAVITY BALLS ========== */
  function GravityBalls() {
    const canvasRef = useRef(null)
    const ballsRef = useRef([])
    const animRef = useRef(null)

    const colors = ['#4fc3f7', '#e040fb', '#ff6b35', '#4caf50', '#ffeb3b', '#ff5252']

    useEffect(() => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      const resize = () => {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
      resize()
      window.addEventListener('resize', resize)

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ballsRef.current.forEach((ball) => {
          ball.vy += 0.3
          ball.x += ball.vx
          ball.y += ball.vy

          if (ball.y + ball.r > canvas.height) {
            ball.y = canvas.height - ball.r
            ball.vy *= -0.7
          }
          if (ball.x - ball.r < 0 || ball.x + ball.r > canvas.width) {
            ball.vx *= -0.8
            ball.x = Math.max(ball.r, Math.min(canvas.width - ball.r, ball.x))
          }

          ctx.beginPath()
          ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2)
          ctx.fillStyle = ball.color
          ctx.shadowBlur = 15
          ctx.shadowColor = ball.color
          ctx.fill()
          ctx.shadowBlur = 0
        })

        if (ballsRef.current.length > 50) {
          ballsRef.current = ballsRef.current.slice(-50)
        }

        animRef.current = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener('resize', resize)
        cancelAnimationFrame(animRef.current)
      }
    }, [])

    const handleClick = (e) => {
      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      for (let i = 0; i < 5; i++) {
        ballsRef.current.push({
          x,
          y,
          r: 5 + Math.random() * 15,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8 - 3,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    return (
      <div>
        <canvas
          ref={canvasRef}
          className="gravity-canvas hover-target"
          onClick={handleClick}
        />
        <p className="gravity-hint">CLICK TO SPAWN BALLS</p>
      </div>
    )
  }

  /* ========== CLICK SPEED ========== */
  function ClickSpeed() {
    const [count, setCount] = useState(0)
    const [cps, setCps] = useState(0)
    const [timing, setTiming] = useState(false)
    const startRef = useRef(0)
    const intervalRef = useRef(null)

    const handleClick = () => {
      if (!timing) {
        setTiming(true)
        startRef.current = Date.now()
        intervalRef.current = setInterval(() => {
          const elapsed = (Date.now() - startRef.current) / 1000
          setCount(prev => {
            setCps(elapsed > 0 ? (prev / elapsed).toFixed(1) : 0)
            return prev
          })
        }, 100)
      }
      setCount(prev => prev + 1)
    }

    const handleReset = (e) => {
      e.stopPropagation()
      setCount(0)
      setCps(0)
      setTiming(false)
      clearInterval(intervalRef.current)
    }

    return (
      <div className="click-counter-area hover-target" onClick={handleClick}>
        <p className="click-count">{count}</p>
        <p className="click-label">CLICKS</p>
        <p className="click-cps">{cps} CPS</p>
        <button className="reset-btn" onClick={handleReset}>RESET</button>
      </div>
    )
  }

  /* ========== MAIN FUN PAGE ========== */
  function Fun() {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <section className="fun-page">
          <motion.div
            className="fun-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">// ARCADE ZONE</p>
            <div className="about-line" style={{ margin: '0 auto 25px' }}></div>
            <h2 className="section-title">HAVE SOME FUN</h2>
          </motion.div>

          <div className="fun-grid">
            <motion.div
              className="game-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="game-card-header">
                <span>💻</span>
                <h3>HACKER TERMINAL</h3>
              </div>
              <div className="game-card-body">
                <Terminal />
              </div>
            </motion.div>

            <motion.div
              className="game-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="game-card-header">
                <span>⚡</span>
                <h3>REACTION TIME</h3>
              </div>
              <div className="game-card-body">
                <ReactionGame />
              </div>
            </motion.div>

            <motion.div
              className="game-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="game-card-header">
                <span>🎱</span>
                <h3>GRAVITY BALLS</h3>
              </div>
              <div className="game-card-body">
                <GravityBalls />
              </div>
            </motion.div>

            <motion.div
              className="game-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="game-card-header">
                <span>🖱️ </span>
                <h3>CLICK SPEED TEST</h3>
              </div>
              <div className="game-card-body">
                <ClickSpeed />
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    )
  }

  export default Fun
