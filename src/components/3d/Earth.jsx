import { useRef } from 'react'
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

      {/* Dots on surface */}
      {Array.from({ length: 200 }).map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / 200)
        const theta = Math.sqrt(200 * Math.PI) * phi
        const x = 2 * Math.cos(theta) * Math.sin(phi)
        const y = 2 * Math.sin(theta) * Math.sin(phi)
        const z = 2 * Math.cos(phi)
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial
              color={Math.random() > 0.5 ? '#4fc3f7' : '#e040fb'}
              transparent
              opacity={0.8}
            />
          </mesh>
        )
      })}

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4fc3f7" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#e040fb" />
    </group>
  )
}

export default Earth
