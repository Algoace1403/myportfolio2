import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * TextReveal — Splits text into characters and animates them in
 * with a 3D flip-up stagger effect on scroll.
 *
 * Props:
 *   text      — string to animate
 *   tag       — HTML tag to render (default 'h2')
 *   className — CSS class
 *   delay     — base delay in seconds (default 0)
 *   once      — only animate once (default true)
 */
export default function TextReveal({
  text,
  tag: Tag = 'h2',
  className = '',
  delay = 0,
  once = true,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Just show text immediately
      const chars = containerRef.current.querySelectorAll('.tr-char')
      chars.forEach((c) => {
        c.style.opacity = '1'
        c.style.transform = 'none'
      })
      return
    }

    const chars = containerRef.current.querySelectorAll('.tr-char')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          y: 80,
          opacity: 0,
          rotateX: -60,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.03,
          duration: 0.8,
          delay,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [text, delay, once])

  // Split text into words, then characters
  const words = text.split(' ')

  return (
    <Tag
      ref={containerRef}
      className={className}
      style={{ overflow: 'hidden', perspective: '600px' }}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, ci) => (
            <span
              key={`${wi}-${ci}`}
              className="tr-char"
              style={{
                display: 'inline-block',
                willChange: 'transform, opacity',
                opacity: 0,
              }}
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && (
            <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  )
}
