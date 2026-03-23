import { useEffect, useRef, useState } from 'react'
import '../../styles/cursor.css'

function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const [isTouchDevice] = useState(
    () => window.matchMedia('(hover: none)').matches || navigator.maxTouchPoints > 0
  )

  useEffect(() => {
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const dot = dotRef.current

    // Smooth cursor following with lerp
    let cursorX = 0, cursorY = 0
    let dotX = 0, dotY = 0
    let mouseX = 0, mouseY = 0
    let rafId = null

    const animate = () => {
      // Cursor circle — smooth follow
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      cursor.style.left = cursorX + 'px'
      cursor.style.top = cursorY + 'px'

      // Dot — faster follow
      dotX += (mouseX - dotX) * 0.35
      dotY += (mouseY - dotY) * 0.35
      dot.style.left = dotX + 'px'
      dot.style.top = dotY + 'px'

      rafId = requestAnimationFrame(animate)
    }

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // State management for cursor classes
    const handleHoverEnter = () => {
      cursor.classList.add('hover')
    }
    const handleHoverLeave = () => {
      cursor.classList.remove('hover')
      cursor.classList.remove('is-project')
    }
    const handleProjectEnter = () => {
      cursor.classList.add('is-project')
      cursor.classList.remove('hover')
    }
    const handleProjectLeave = () => {
      cursor.classList.remove('is-project')
    }

    // Magnetic button handlers
    const handleMagneticMove = (e) => {
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
    }
    const handleMagneticLeave = (e) => {
      e.currentTarget.style.transform = 'translate(0, 0)'
    }

    window.addEventListener('mousemove', moveCursor)
    rafId = requestAnimationFrame(animate)

    // Magnetic buttons
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .social-link')
    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', handleMagneticMove)
      el.addEventListener('mouseleave', handleMagneticLeave)
    })

    // Hover targets — links and buttons
    const hoverElements = document.querySelectorAll('a, button, .hover-target')
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverEnter)
      el.addEventListener('mouseleave', handleHoverLeave)
    })

    // Project card targets
    const projectElements = document.querySelectorAll('.project-card')
    projectElements.forEach((el) => {
      el.addEventListener('mouseenter', handleProjectEnter)
      el.addEventListener('mouseleave', handleProjectLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      cancelAnimationFrame(rafId)
      magneticElements.forEach((el) => {
        el.removeEventListener('mousemove', handleMagneticMove)
        el.removeEventListener('mouseleave', handleMagneticLeave)
      })
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverEnter)
        el.removeEventListener('mouseleave', handleHoverLeave)
      })
      projectElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleProjectEnter)
        el.removeEventListener('mouseleave', handleProjectLeave)
      })
    }
  }, [isTouchDevice])

  if (isTouchDevice) return null

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={dotRef} className="cursor-dot"></div>
    </>
  )
}

export default CustomCursor
