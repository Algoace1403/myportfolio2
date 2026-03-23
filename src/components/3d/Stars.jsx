import { useRef, useMemo, useEffect } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'

// Background star field — completely static geometry.
// No per-frame mutations, no additive blending, no twinkle.
// Just a slowly rotating sphere of white dots.

function StarField() {
  const starsRef = useRef()
  const count = 1200

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 100
      arr[i * 3 + 1] = (Math.random() - 0.5) * 100
      arr[i * 3 + 2] = (Math.random() - 0.5) * 100
    }
    return arr
  }, [])

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.00008
    }
  })

  // Dispose geometry on unmount
  useEffect(() => {
    return () => {
      if (starsRef.current) {
        starsRef.current.geometry?.dispose()
        starsRef.current.material?.dispose()
      }
    }
  }, [])

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
        size={0.07}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
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
