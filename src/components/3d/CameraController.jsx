import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Camera positions designed so the globe fills the upper viewport
// with minimal empty space above it.
// The globe (radius 2, centered at origin) should appear to start
// just below the navbar (~60px from top).

const INTRO_POSITION = new THREE.Vector3(0, 3.5, 10)
const DEFAULT_POSITION = new THREE.Vector3(0, 3.5, 6)
const DEFAULT_TARGET = new THREE.Vector3(0, -0.8, 0)

const CONTINENT_CAMERAS = [
  { pos: new THREE.Vector3(-2.5, 2.5, 3.5), target: new THREE.Vector3(-1.2, 0.0, 0.8) },
  { pos: new THREE.Vector3(2.0, 2.0, 3.5), target: new THREE.Vector3(1.0, -0.2, 1.0) },
  { pos: new THREE.Vector3(0.5, 3.0, -3.5), target: new THREE.Vector3(0.1, 0.4, -1.2) },
  { pos: new THREE.Vector3(-1.2, 3.5, -2.0), target: new THREE.Vector3(-0.5, 0.8, -0.3) },
  { pos: new THREE.Vector3(2.5, 2.5, -3.0), target: new THREE.Vector3(1.0, 0.0, -0.8) },
  { pos: new THREE.Vector3(-2.8, 2.5, -2.0), target: new THREE.Vector3(-1.4, 0.0, -0.6) },
]

export default function CameraController({
  introComplete = false,
  focusContinent = -1,
  controlsRef,
}) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3().copy(INTRO_POSITION))
  const targetLookAt = useRef(new THREE.Vector3().copy(DEFAULT_TARGET))
  const smoothness = useRef(3.0)

  useEffect(() => {
    if (!introComplete) {
      targetPos.current.copy(INTRO_POSITION)
      smoothness.current = 1.5
    } else if (focusContinent >= 0 && focusContinent < CONTINENT_CAMERAS.length) {
      const cam = CONTINENT_CAMERAS[focusContinent]
      targetPos.current.copy(cam.pos)
      targetLookAt.current.copy(cam.target)
      smoothness.current = 3.0
    } else {
      targetPos.current.copy(DEFAULT_POSITION)
      targetLookAt.current.copy(DEFAULT_TARGET)
      smoothness.current = 2.5
    }
  }, [introComplete, focusContinent])

  useFrame((_, delta) => {
    const t = 1 - Math.exp(-smoothness.current * delta)

    camera.position.lerp(targetPos.current, t)

    if (controlsRef?.current) {
      controlsRef.current.target.lerp(targetLookAt.current, t)
      controlsRef.current.update()
    }
  })

  return null
}
