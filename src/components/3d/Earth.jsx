import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

function Earth() {
  const earthRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.003
      earthRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
    if (glowRef.current) {
      glowRef.current.rotation.y += 0.002
    }
  })

  // Pre-compute dot positions + colors (single draw call instead of 200)
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(200 * 3)
    const col = new Float32Array(200 * 3)
    const cyan = new THREE.Color('#4fc3f7')
    const pink = new THREE.Color('#e040fb')

    for (let i = 0; i < 200; i++) {
      const phi = Math.acos(-1 + (2 * i) / 200)
      const theta = Math.sqrt(200 * Math.PI) * phi
      pos[i * 3] = 2 * Math.cos(theta) * Math.sin(phi)
      pos[i * 3 + 1] = 2 * Math.sin(theta) * Math.sin(phi)
      pos[i * 3 + 2] = 2 * Math.cos(phi)

      const c = i % 2 === 0 ? cyan : pink
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [])

  // Dispose resources on unmount to prevent GPU memory leaks
  useEffect(() => {
    return () => {
      if (earthRef.current) {
        earthRef.current.geometry?.dispose()
        earthRef.current.material?.dispose()
      }
    }
  }, [])

  return (
    <group>
      {/* Main Earth sphere */}
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#1a1a4e"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[2.01, 32, 32]}>
        <meshStandardMaterial
          color="#4fc3f7"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Glowing ring */}
      <mesh ref={glowRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshBasicMaterial color="#e040fb" transparent opacity={0.6} />
      </mesh>

      {/* Second ring */}
      <mesh rotation={[Math.PI / 1.8, 0.5, 0]}>
        <torusGeometry args={[3.2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#4fc3f7" transparent opacity={0.3} />
      </mesh>

      {/* Dots on surface — single draw call via Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={200} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={200} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
      </points>

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4fc3f7" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#e040fb" />
    </group>
  )
}

export default Earth
