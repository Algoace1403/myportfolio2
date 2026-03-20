import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { CLOUD_RADIUS } from './globeConfig'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Realistic cloud layer — Solar System Scope 2K texture.
// Sun-responsive: bright white on sunlit side, dark on shadow side.
// The cloud texture is a JPEG (white clouds on black background),
// so we use the luminance as both color and alpha.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const cloudVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;

  void main() {
    vUv = uv;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const cloudFragmentShader = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;

  uniform sampler2D uCloudMap;
  uniform vec3 uSunDirection;

  void main() {
    float cloud = texture2D(uCloudMap, vUv).r;

    // Sun-responsive brightness
    float sunDot = dot(vWorldNormal, uSunDirection);
    float brightness = smoothstep(-0.3, 0.5, sunDot) * 0.75 + 0.25;

    // Sunlit clouds are white, shadow clouds are blue-grey
    vec3 sunlit = vec3(1.0, 0.99, 0.97);
    vec3 shadow = vec3(0.1, 0.12, 0.2);
    vec3 color = mix(shadow, sunlit, brightness);

    // Alpha from cloud density — only show where there are clouds
    float alpha = cloud * 0.45 * brightness;
    // Soften thin clouds
    alpha *= smoothstep(0.02, 0.15, cloud);

    gl_FragColor = vec4(color, alpha);
  }
`

export default function CloudLayer() {
  const meshRef = useRef()

  const cloudMap = useLoader(THREE.TextureLoader, '/textures/earth-clouds.jpg')

  useMemo(() => {
    cloudMap.colorSpace = THREE.LinearSRGBColorSpace
    cloudMap.minFilter = THREE.LinearMipmapLinearFilter
    cloudMap.magFilter = THREE.LinearFilter
    cloudMap.anisotropy = 4
  }, [cloudMap])

  const uniforms = useMemo(() => ({
    uCloudMap: { value: cloudMap },
    uSunDirection: { value: new THREE.Vector3(1, 0.3, 0.5).normalize() },
  }), [cloudMap])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005 * delta
    }
  })

  return (
    <mesh ref={meshRef} renderOrder={1}>
      <sphereGeometry args={[CLOUD_RADIUS, 64, 64]} />
      <shaderMaterial
        vertexShader={cloudVertexShader}
        fragmentShader={cloudFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={true}
        side={THREE.FrontSide}
      />
    </mesh>
  )
}
