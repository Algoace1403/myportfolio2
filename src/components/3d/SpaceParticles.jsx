import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Background star field — pushed far from globe (min r=12).
// No additive blending, no opacity animation, no per-frame mutations.
// Just a slowly rotating shell of colored dots.

export default function SpaceParticles({ count = 2000, radius = 22 }) {
  const pointsRef = useRef()

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Distribute in a thick shell, minimum distance 12 from center
      const r = radius * (0.55 + Math.random() * 0.45)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      pos[i3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2] = r * Math.cos(phi)

      // Color variation — muted blues, whites, faint purples
      const colorChoice = Math.random()
      if (colorChoice < 0.5) {
        col[i3] = 0.6 + Math.random() * 0.2
        col[i3 + 1] = 0.7 + Math.random() * 0.2
        col[i3 + 2] = 1.0
      } else if (colorChoice < 0.8) {
        col[i3] = 0.85 + Math.random() * 0.15
        col[i3 + 1] = 0.85 + Math.random() * 0.15
        col[i3 + 2] = 0.95
      } else {
        col[i3] = 0.5 + Math.random() * 0.3
        col[i3 + 1] = 0.2 + Math.random() * 0.15
        col[i3 + 2] = 0.7 + Math.random() * 0.3
      }
    }

    return { positions: pos, colors: col }
  }, [count, radius])

  useFrame(() => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += 0.00015
  })

  return (
    <points ref={pointsRef} renderOrder={-10}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        depthTest={true}
      />
    </points>
  )
}
