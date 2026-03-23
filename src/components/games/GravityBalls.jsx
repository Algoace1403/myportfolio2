import { useRef, useEffect } from 'react'

const COLORS = ['#4fc3f7', '#e040fb', '#ff6b35', '#4caf50', '#ffeb3b', '#ff5252']

export default function GravityBalls() {
  const canvasRef = useRef(null)
  const ballsRef = useRef([])
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

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
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="gravity-canvas hover-target"
        onClick={handleClick}
        role="img"
        aria-label="Gravity balls playground — click to spawn balls"
      />
      <p className="gravity-hint">CLICK TO SPAWN BALLS</p>
    </div>
  )
}
