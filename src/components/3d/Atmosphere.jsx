import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Atmosphere glow — rendered on BackSide far from planet surface.
// Uses normal alpha blending (NOT additive) for stable compositing.
// No pulsing, no animation — purely view-angle dependent.

const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const atmosphereFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uIntensity;

  void main() {
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);

    vec3 innerColor = vec3(0.08, 0.35, 0.9);
    vec3 outerColor = vec3(0.0, 0.6, 1.0);
    vec3 color = mix(innerColor, outerColor, fresnel);

    float alpha = fresnel * uIntensity * 0.45;

    gl_FragColor = vec4(color, alpha);
  }
`

export default function Atmosphere({ radius = 3.5, intensity = 0.6 }) {
  const meshRef = useRef()

  const uniforms = useMemo(() => ({
    uIntensity: { value: intensity },
  }), [intensity])

  return (
    <mesh ref={meshRef} renderOrder={3}>
      <icosahedronGeometry args={[radius, 32]} />
      <shaderMaterial
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.BackSide}
        depthWrite={false}
        depthTest={true}
      />
    </mesh>
  )
}
