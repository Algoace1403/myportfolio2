import { useRef, useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { GLOBE_RADIUS } from './globeConfig'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Hyper-realistic SOLID Earth.
// alpha = 1.0 everywhere — fully opaque.
// Night side is dark but never transparent.
// Solar System Scope 4K textures with normal mapping.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const earthVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const earthFragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  uniform sampler2D uDayMap;
  uniform sampler2D uNightMap;
  uniform sampler2D uNormalMap;
  uniform sampler2D uSpecularMap;
  uniform vec3 uSunDirection;

  void main() {
    // ── Perturb normal from normal map ──
    vec3 texNormal = texture2D(uNormalMap, vUv).rgb * 2.0 - 1.0;
    // Blend: mostly geometric normal with subtle normal map perturbation
    vec3 N = normalize(vWorldNormal + texNormal * 0.15);

    vec3 V = normalize(cameraPosition - vWorldPosition);
    vec3 L = uSunDirection;
    vec3 H = normalize(V + L);

    float NdotL = dot(N, L);
    float NdotV = max(dot(N, V), 0.0);
    float NdotH = max(dot(N, H), 0.0);

    // ── Day/night ──
    float dayFactor = smoothstep(-0.08, 0.2, NdotL);
    float diffuse = max(NdotL, 0.0) * 0.65 + 0.35;

    // ── Textures ──
    vec3 dayAlbedo = texture2D(uDayMap, vUv).rgb;
    vec3 nightLights = texture2D(uNightMap, vUv).rgb;
    float oceanMask = texture2D(uSpecularMap, vUv).r;

    // ── Day side: texture × diffuse lighting ──
    vec3 dayColor = dayAlbedo * diffuse;

    // ── Ocean specular: sharp sun glint on water only ──
    float specPower = pow(NdotH, 150.0);
    float specFresnel = 0.02 + 0.98 * pow(1.0 - max(dot(H, V), 0.0), 5.0);
    dayColor += vec3(1.0, 0.97, 0.92) * specPower * specFresnel * oceanMask * 2.0 * max(NdotL, 0.0) * dayFactor;

    // ── Night side: solid dark base + city lights ──
    float nightVis = smoothstep(0.05, -0.12, NdotL);
    // IMPORTANT: night base is a solid dark color, NOT transparent
    vec3 nightBase = vec3(0.01, 0.012, 0.03);
    vec3 lightsColor = nightLights * vec3(1.0, 0.78, 0.4) * 2.5 * nightVis;
    vec3 nightColor = nightBase + lightsColor;

    // ── Blend day/night ──
    vec3 color = mix(nightColor, dayColor, dayFactor);

    // ── Subtle atmospheric rim (just on the Earth surface, not a separate mesh) ──
    float rim = pow(1.0 - NdotV, 4.0);
    float rimSunFactor = smoothstep(-0.1, 0.3, dot(vWorldNormal, L));
    color += vec3(0.1, 0.3, 0.8) * rim * 0.12 * rimSunFactor;

    // ── Output: ALWAYS fully opaque ──
    gl_FragColor = vec4(color, 1.0);
  }
`

const CONTINENTS = [
  { name: 'Web Development', color: new THREE.Color(0.0, 0.8, 1.0) },
  { name: 'AI / Data', color: new THREE.Color(1.0, 0.4, 0.0) },
  { name: 'CS Fundamentals', color: new THREE.Color(0.53, 0.0, 1.0) },
  { name: 'Tools / Workflow', color: new THREE.Color(0.0, 1.0, 0.53) },
  { name: 'Creative', color: new THREE.Color(1.0, 0.2, 0.53) },
  { name: 'Learning Journey', color: new THREE.Color(1.0, 0.8, 0.0) },
]

export default function PlanetWorld() {
  const meshRef = useRef()

  const [dayMap, nightMap, normalMap, specularMap] = useLoader(THREE.TextureLoader, [
    '/textures/earth-day.jpg',
    '/textures/earth-night.jpg',
    '/textures/earth-normal.jpg',
    '/textures/earth-specular.png',
  ])

  useMemo(() => {
    dayMap.colorSpace = THREE.SRGBColorSpace
    dayMap.minFilter = THREE.LinearMipmapLinearFilter
    dayMap.magFilter = THREE.LinearFilter
    dayMap.anisotropy = 8

    nightMap.colorSpace = THREE.LinearSRGBColorSpace
    nightMap.minFilter = THREE.LinearMipmapLinearFilter
    nightMap.magFilter = THREE.LinearFilter
    nightMap.anisotropy = 8

    normalMap.colorSpace = THREE.LinearSRGBColorSpace
    normalMap.minFilter = THREE.LinearMipmapLinearFilter
    normalMap.magFilter = THREE.LinearFilter
    normalMap.anisotropy = 4

    specularMap.colorSpace = THREE.LinearSRGBColorSpace
    specularMap.minFilter = THREE.LinearMipmapLinearFilter
    specularMap.magFilter = THREE.LinearFilter
    specularMap.anisotropy = 4
  }, [dayMap, nightMap, normalMap, specularMap])

  const uniforms = useMemo(() => ({
    uDayMap: { value: dayMap },
    uNightMap: { value: nightMap },
    uNormalMap: { value: normalMap },
    uSpecularMap: { value: specularMap },
    uSunDirection: { value: new THREE.Vector3(1, 0.3, 0.5).normalize() },
  }), [dayMap, nightMap, normalMap, specularMap])

  return (
    <mesh ref={meshRef} renderOrder={0}>
      <sphereGeometry args={[GLOBE_RADIUS, 96, 96]} />
      <shaderMaterial
        vertexShader={earthVertexShader}
        fragmentShader={earthFragmentShader}
        uniforms={uniforms}
        depthWrite={true}
        depthTest={true}
        transparent={false}
      />
    </mesh>
  )
}

export { CONTINENTS }
