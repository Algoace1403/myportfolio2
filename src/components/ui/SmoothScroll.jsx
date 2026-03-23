import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Disable smooth scroll on touch devices — native scroll feels better
    const isTouchDevice = window.matchMedia('(hover: none)').matches || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      document.documentElement.style.scrollBehavior = 'smooth'
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      lerp: 0.1,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
