import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleField({ count = 3000 }) {
  const meshRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50

      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.31
        colors[i * 3 + 1] = 0.76
        colors[i * 3 + 2] = 0.97
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.88
        colors[i * 3 + 1] = 0.25
        colors[i * 3 + 2] = 0.98
      } else {
        colors[i * 3] = 1
        colors[i * 3 + 1] = 1
        colors[i * 3 + 2] = 1
      }
    }

    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0003
      meshRef.current.rotation.y += 0.0005

      const mouseX = state.mouse.x * 0.5
      const mouseY = state.mouse.y * 0.5
      meshRef.current.rotation.x += (mouseY - meshRef.current.rotation.x) * 0.01
      meshRef.current.rotation.y += (mouseX - meshRef.current.rotation.y) * 0.01
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default ParticleField
