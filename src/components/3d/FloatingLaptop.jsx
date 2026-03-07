import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RoundedBox, Text } from '@react-three/drei'

function MacBook() {
  const groupRef = useRef()
  const screenGlowRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.2
      groupRef.current.rotation.y = -0.4 + Math.sin(state.clock.elapsedTime * 0.2) * 0.08
    }
    if (screenGlowRef.current) {
      screenGlowRef.current.intensity = 0.4 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15
    }
  })

  return (
    <group ref={groupRef} rotation={[0.15, -0.4, 0]} position={[0, -0.5, 0]}>

      {/* === BASE (Bottom half) === */}
      <RoundedBox args={[3.8, 0.08, 2.5]} radius={0.04} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2d2d2d" metalness={0.9} roughness={0.15} />
      </RoundedBox>

      {/* Keyboard area - dark inset */}
      <mesh position={[0, 0.05, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.4, 2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.8} />
      </mesh>

      {/* Keyboard keys */}
      {Array.from({ length: 50 }).map((_, i) => {
        const row = Math.floor(i / 12.5)
        const col = i % 12
        return (
          <RoundedBox
            key={i}
            args={[0.22, 0.02, 0.18]}
            radius={0.02}
            position={[-1.35 + col * 0.235, 0.06, -0.8 + row * 0.25]}
          >
            <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.6} />
          </RoundedBox>
        )
      })}

      {/* Trackpad */}
      <RoundedBox args={[1.1, 0.01, 0.7]} radius={0.04} position={[0, 0.055, 0.65]}>
        <meshStandardMaterial color="#1e1e1e" metalness={0.7} roughness={0.2} />
      </RoundedBox>

      {/* === SCREEN (Top half) === */}
      {/* Screen housing */}
      <RoundedBox args={[3.8, 2.5, 0.06]} radius={0.04} position={[0, 1.33, -1.22]}>
        <meshStandardMaterial color="#2d2d2d" metalness={0.9} roughness={0.15} />
      </RoundedBox>

      {/* Screen bezel (black border) */}
      <mesh position={[0, 1.35, -1.18]}>
        <planeGeometry args={[3.5, 2.2]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Actual screen display */}
      <mesh position={[0, 1.33, -1.17]}>
        <planeGeometry args={[3.3, 2]} />
        <meshStandardMaterial color="#0d1117" emissive="#0d1117" emissiveIntensity={0.3} />
      </mesh>

      {/* Notch */}
      <RoundedBox args={[0.4, 0.12, 0.02]} radius={0.04} position={[0, 2.4, -1.18]}>
        <meshStandardMaterial color="#000000" />
      </RoundedBox>

      {/* Camera dot in notch */}
      <mesh position={[0, 2.4, -1.16]}>
        <circleGeometry args={[0.02, 16]} />
        <meshBasicMaterial color="#1a3a1a" />
      </mesh>

      {/* === CODE ON SCREEN === */}
      <Text position={[-1.2, 2.05, -1.16]} fontSize={0.07} color="#8b949e" anchorX="left">
        {'// portfolio.js'}
      </Text>
      <Text position={[-1.2, 1.9, -1.16]} fontSize={0.07} color="#ff7b72" anchorX="left">
        {'const '}
        <meshBasicMaterial color="#ff7b72" />
      </Text>
      <Text position={[-0.82, 1.9, -1.16]} fontSize={0.07} color="#79c0ff" anchorX="left">
        developer
      </Text>
      <Text position={[-0.05, 1.9, -1.16]} fontSize={0.07} color="#c9d1d9" anchorX="left">
        {' = {'}
      </Text>
      <Text position={[-1, 1.75, -1.16]} fontSize={0.07} color="#c9d1d9" anchorX="left">
        {'name: '}
      </Text>
      <Text position={[-0.42, 1.75, -1.16]} fontSize={0.07} color="#a5d6ff" anchorX="left">
        {'"Anuj Kumar Soni"'}
      </Text>
      <Text position={[-1, 1.6, -1.16]} fontSize={0.07} color="#c9d1d9" anchorX="left">
        {'role: '}
      </Text>
      <Text position={[-0.42, 1.6, -1.16]} fontSize={0.07} color="#a5d6ff" anchorX="left">
        {'"Full Stack Dev"'}
      </Text>
      <Text position={[-1, 1.45, -1.16]} fontSize={0.07} color="#c9d1d9" anchorX="left">
        {'skills: '}
      </Text>
      <Text position={[-0.3, 1.45, -1.16]} fontSize={0.07} color="#a5d6ff" anchorX="left">
        {'["React", "JS"]'}
      </Text>
      <Text position={[-1, 1.3, -1.16]} fontSize={0.07} color="#c9d1d9" anchorX="left">
        {'passion: '}
      </Text>
      <Text position={[-0.18, 1.3, -1.16]} fontSize={0.07} color="#a5d6ff" anchorX="left">
        {'"Building cool stuff"'}
      </Text>
      <Text position={[-1.2, 1.15, -1.16]} fontSize={0.07} color="#c9d1d9" anchorX="left">
        {'}'}
      </Text>

      {/* Blinking cursor */}
      <mesh position={[-1.1, 1, -1.16]}>
        <planeGeometry args={[0.04, 0.08]} />
        <meshBasicMaterial color="#4fc3f7" />
      </mesh>

      {/* Line numbers */}
      {[2.05, 1.9, 1.75, 1.6, 1.45, 1.3, 1.15, 1].map((y, i) => (
        <Text key={i} position={[-1.45, y, -1.16]} fontSize={0.06} color="#484f58" anchorX="left">
          {i + 1}
        </Text>
      ))}

      {/* Apple logo (glowing circle on back) */}
      <mesh position={[0, 1.35, -1.26]}>
        <circleGeometry args={[0.15, 32]} />
        <meshBasicMaterial color="#4fc3f7" transparent opacity={0.4} />
      </mesh>

      {/* Screen glow light */}
      <pointLight ref={screenGlowRef} position={[0, 1.3, -0.3]} intensity={0.4} color="#4fc3f7" distance={4} />

      {/* Ambient + key lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, 2, 3]} intensity={0.3} color="#e040fb" />
    </group>
  )
}

function MacBookScene() {
  return (
    <div className="macbook-scene">
      <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }}>
        <MacBook />
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={0.5} maxPolarAngle={2} />
      </Canvas>
    </div>
  )
}

export default MacBookScene
