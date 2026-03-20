import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { RING_INNER, RING_OUTER } from './globeConfig'

function OrbitalRing({ radius, tilt, speed, color, opacity = 0.15 }) {
  const ringRef = useRef()

  const geometry = useMemo(() => {
    const points = []
    const segments = 128
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
    }
    return new THREE.BufferGeometry().setFromPoints(points)
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
