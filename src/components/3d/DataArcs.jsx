import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ARC_SURFACE, ARC_PEAK } from './globeConfig'

const ARC_CONNECTIONS = [
  { from: [-1.6, 0.8, 1.2], to: [1.4, -0.3, 1.5], color: '#00ccff' },
  { from: [1.4, -0.3, 1.5], to: [0.2, 1.2, -1.7], color: '#8800ff' },
  { from: [0.2, 1.2, -1.7], to: [-0.8, 1.8, -0.5], color: '#00ff88' },
  { from: [-0.8, 1.8, -0.5], to: [1.5, 0.6, -1.2], color: '#ff3388' },
  { from: [1.5, 0.6, -1.2], to: [-1.6, 0.8, 1.2], color: '#ffcc00' },
]

function Arc({ from, to, color, index }) {
  const lineRef = useRef()

  const { points } = useMemo(() => {
    const start = new THREE.Vector3(...from).normalize().multiplyScalar(ARC_SURFACE)
    const end = new THREE.Vector3(...to).normalize().multiplyScalar(ARC_SURFACE)
    const mid = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(ARC_PEAK)
    const c = new THREE.QuadraticBezierCurve3(start, mid, end)
    return { points: c.getPoints(50) }
  }, [from, to])

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [points])

  useFrame((state) => {
    if (!lineRef.current) return
    lineRef.current.material.dashOffset = -state.clock.elapsedTime * 0.3 - index * 2
  })

  return (
    <line ref={lineRef} geometry={geometry} renderOrder={4}>
      <lineDashedMaterial
        color={color}
        transparent
        opacity={0.2}
        dashSize={0.2}
        gapSize={0.3}
        linewidth={1}
        depthWrite={false}
      />
    </line>
  )
}

function ArcParticle({ from, to, color, index }) {
  const meshRef = useRef()

  // Pre-compute 60 points along the curve (avoids per-frame curve evaluation)
  const curvePoints = useMemo(() => {
    const start = new THREE.Vector3(...from).normalize().multiplyScalar(ARC_SURFACE)
    const end = new THREE.Vector3(...to).normalize().multiplyScalar(ARC_SURFACE)
    const mid = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(ARC_PEAK)
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
    return curve.getPoints(60)
  }, [from, to])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime * 0.2 + index * 0.4
    const progress = (t % 1 + 1) % 1
    // Interpolate between cached points instead of curve.getPoint()
    const idx = progress * (curvePoints.length - 1)
    const i0 = Math.floor(idx)
    const i1 = Math.min(i0 + 1, curvePoints.length - 1)
    const alpha = idx - i0
    meshRef.current.position.lerpVectors(curvePoints[i0], curvePoints[i1], alpha)
  })

  return (
    <mesh ref={meshRef} renderOrder={4}>
      <sphereGeometry args={[0.03, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} depthWrite={false} />
    </mesh>
  )
}

export default function DataArcs({ visible = true }) {
  if (!visible) return null

  return (
    <group>
      {ARC_CONNECTIONS.map((arc, i) => (
        <group key={i}>
          <Arc from={arc.from} to={arc.to} color={arc.color} index={i} />
          <ArcParticle from={arc.from} to={arc.to} color={arc.color} index={i} />
        </group>
      ))}
    </group>
  )
}
