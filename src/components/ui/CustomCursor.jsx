import { useEffect, useRef } from 'react'
import '../../styles/cursor.css'

function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current

    const moveCursor = (e) => {
      cursor.style.left = e.clientX - 10 + 'px'
      cursor.style.top = e.clientY - 10 + 'px'
      dot.style.left = e.clientX - 3 + 'px'
      dot.style.top = e.clientY - 3 + 'px'
    }

    const handleHoverEnter = () => cursor.classList.add('hover')
    const handleHoverLeave = () => cursor.classList.remove('hover')

    window.addEventListener('mousemove', moveCursor)

    // Magnetic buttons
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .social-link')
    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
      })
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)'
      })
    })

    const hoverElements = document.querySelectorAll('a, button, .hover-target')
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverEnter)
      el.addEventListener('mouseleave', handleHoverLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverEnter)
        el.removeEventListener('mouseleave', handleHoverLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={dotRef} className="cursor-dot"></div>
    </>
  )
}

export default CustomCursor
