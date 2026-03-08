import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

function StarField() {
  const starsRef = useRef()
  const count = 1500

  const { positions } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
      sizes[i] = Math.random() * 0.15 + 0.02
    }

    return { positions, sizes }
  }, [])

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001
      starsRef.current.rotation.x += 0.00005

      // Twinkle effect
      const posArray = starsRef.current.geometry.attributes.position.array
      for (let i = 0; i < count; i++) {
        posArray[i * 3 + 2] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001
      }
      starsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#ffffff"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function StarsBackground() {
  return (
    <div className="stars-background">
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
        <StarField />
      </Canvas>
    </div>
  )
}

export default StarsBackground
