import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Parallax depth shift on scroll
 * Moves an element at a different rate than scroll
 *
 * @param {number} speed - Parallax speed multiplier (negative = reverse)
 * @param {boolean} enabled
 */
export default function useParallax(speed = 0.3, enabled = true) {
  const ref = useRef(null)

  useEffect(() => {
    if (!enabled || !ref.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tween = gsap.to(ref.current, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [speed, enabled])

  return ref
}
