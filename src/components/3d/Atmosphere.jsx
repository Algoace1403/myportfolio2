import { useMemo } from 'react'
import * as THREE from 'three'
import { ATMOSPHERE_RADIUS } from './globeConfig'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Atmosphere — razor-thin blue rim at the Earth's edge.
// Barely larger than the planet. Rendered on BackSide so
// it only shows as a thin glow at the silhouette.
// Very low opacity — enhances realism without creating
// a visible transparent shell.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const vertShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldNormal;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldNormal;

  uniform float uIntensity;
  uniform vec3 uSunDirection;

  void main() {
    vec3 viewDir = normalize(-vPosition);
    float NdotV = max(dot(vNormal, viewDir), 0.0);

    // Fresnel — visible atmospheric rim at the edge
    float fresnel = pow(1.0 - NdotV, 3.5);

    // Sun-aware color
    float sunDot = dot(vWorldNormal, uSunDirection);
    vec3 rimColor = mix(
      vec3(0.05, 0.15, 0.5),  // dark blue on night side
      vec3(0.3, 0.6, 1.0),     // bright blue on day side
      smoothstep(-0.2, 0.3, sunDot)
    );

    // Very low alpha — just a hint of atmospheric glow
    float alpha = fresnel * uIntensity * smoothstep(-0.3, 0.1, sunDot) * 0.3;

    gl_FragColor = vec4(rimColor, alpha);
  }
`

export default function Atmosphere({ intensity = 0.5 }) {
  const uniforms = useMemo(() => ({
    uIntensity: { value: intensity },
    uSunDirection: { value: new THREE.Vector3(1, 0.3, 0.5).normalize() },
  }), [intensity])

  return (
    <mesh renderOrder={3}>
      <icosahedronGeometry args={[ATMOSPHERE_RADIUS, 32]} />
      <shaderMaterial
        vertexShader={vertShader}
        fragmentShader={fragShader}
        uniforms={uniforms}
        transparent
        side={THREE.BackSide}
        depthWrite={false}
        depthTest={true}
      />
    </mesh>
  )
}
