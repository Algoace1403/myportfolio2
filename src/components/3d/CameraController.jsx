import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Camera controller: intro zoom → fixed position.
// Camera stays fixed. The globe group rotates via drag, not the camera.

const INTRO_POSITION = new THREE.Vector3(0, 3.5, 10)
const DEFAULT_POSITION = new THREE.Vector3(0, 3.5, 6)
const LOOK_AT = new THREE.Vector3(0, -0.8, 0)

export default function CameraController({ introComplete = false }) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3().copy(INTRO_POSITION))
  const smoothness = useRef(1.5)

  useEffect(() => {
    if (introComplete) {
      targetPos.current.copy(DEFAULT_POSITION)
      smoothness.current = 2.5
    } else {
      targetPos.current.copy(INTRO_POSITION)
      smoothness.current = 1.5
    }
  }, [introComplete])

  useFrame((_, delta) => {
    const t = 1 - Math.exp(-smoothness.current * delta)
    camera.position.lerp(targetPos.current, t)
    camera.lookAt(LOOK_AT)
  })

  return null
}
