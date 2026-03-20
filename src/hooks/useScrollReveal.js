import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * GSAP ScrollTrigger-powered reveal animation
 * Applies a staggered entrance to child elements
 *
 * @param {object} options
 * @param {string} options.childSelector - CSS selector for children to animate
 * @param {number} options.stagger - Stagger delay between children
 * @param {number} options.y - Starting Y offset
 * @param {number} options.duration - Animation duration
 * @param {boolean} options.enabled - Whether to run animation
 */
export default function useScrollReveal({
  childSelector = '.reveal-child',
  stagger = 0.08,
  y = 30,
  duration = 0.8,
  enabled = true,
} = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!enabled || !containerRef.current) return

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const children = containerRef.current.querySelectorAll(childSelector)
    if (children.length === 0) return

    gsap.set(children, { opacity: 0, y })

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power3.out',
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [childSelector, stagger, y, duration, enabled])

  return containerRef
}
