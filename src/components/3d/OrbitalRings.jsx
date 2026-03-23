import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { RING_INNER, RING_OUTER } from './globeConfig'

function OrbitalRing({ radius, tilt, speed, color, opacity = 0.15 }) {
  const ringRef = useRef()

  const geometry = useMemo(() => {
    const segments = 128
    const positions = new Float32Array((segments + 1) * 3)
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = 0
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [radius])

  useFrame(() => {
    if (ringRef.current) ringRef.current.rotation.y += speed
  })

  return (
    <group ref={ringRef} rotation={[tilt[0], 0, tilt[1]]}>
      <line geometry={geometry} renderOrder={5}>
        <lineDashedMaterial
          color={color} transparent opacity={opacity}
          dashSize={0.25} gapSize={0.15} linewidth={1} depthWrite={false}
        />
      </line>
    </group>
  )
}

function OrbitingNode({ radius, tilt, speed, color, size = 0.04 }) {
  const nodeRef = useRef()
  const angle = useRef(Math.random() * Math.PI * 2)

  useFrame(() => {
    if (!nodeRef.current) return
    angle.current += speed * 2
    nodeRef.current.position.set(Math.cos(angle.current) * radius, 0, Math.sin(angle.current) * radius)
  })

  return (
    <group rotation={[tilt[0], 0, tilt[1]]}>
      <mesh ref={nodeRef} renderOrder={5}>
        <sphereGeometry args={[size, 8, 8]} />
        <meshBasicMaterial color={color} depthWrite={false} />
      </mesh>
    </group>
  )
}

export default function OrbitalRings() {
  const rings = [
    { radius: RING_INNER, tilt: [0.3, 0.1], speed: 0.001, color: '#00ccff', opacity: 0.15 },
    { radius: RING_OUTER, tilt: [-0.2, 0.4], speed: -0.0008, color: '#8800ff', opacity: 0.1 },
  ]

  return (
    <group>
      {rings.map((ring, i) => (
        <group key={i}>
          <OrbitalRing {...ring} />
          <OrbitingNode radius={ring.radius} tilt={ring.tilt} speed={ring.speed} color={ring.color} size={0.035} />
        </group>
      ))}
    </group>
  )
}
