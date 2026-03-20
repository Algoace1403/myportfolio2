import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VERTEX SHADER — Procedural terrain with noise
// No vertex displacement — keeps the sphere perfectly smooth
// to prevent z-fighting with any outer layer.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const planetVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying float vElevation;

  // Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    // Multi-octave noise for continent elevation (used for color only, NOT displacement)
    float n1 = snoise(position * 1.2 + 0.3) * 0.5;
    float n2 = snoise(position * 2.4 + 10.0) * 0.25;
    float n3 = snoise(position * 4.8 + 20.0) * 0.125;
    vElevation = n1 + n2 + n3;

    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FRAGMENT SHADER — Stable, no shimmer
// All hard boundaries replaced with wide smoothstep.
// No high-frequency noise. No aggressive pulsing.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const planetFragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying float vElevation;

  uniform float uTime;
  uniform vec3 uContinentColors[6];
  uniform float uHoverIntensity;
  uniform int uFocusContinent;
  uniform float uFocusStrength;

  int getContinentIndex(vec3 pos) {
    float angle = atan(pos.z, pos.x);
    float lat = asin(clamp(pos.y / length(pos), -1.0, 1.0));

    if (angle < -1.8) return 0;
    else if (angle < -0.6) return 5;
    else if (angle < 0.3) return 1;
    else if (angle < 1.2) return 2;
    else if (lat > 0.3) return 3;
    else return 4;
  }

  void main() {
    // ── Land/ocean boundary: wide smoothstep, NO hard step ──
    float isLand = smoothstep(-0.02, 0.12, vElevation);
    int continentIdx = getContinentIndex(vPosition);

    // ── Ocean (simple, no grid lines, no fast waves) ──
    vec3 oceanDeep = vec3(0.01, 0.025, 0.07);
    vec3 oceanMid = vec3(0.015, 0.05, 0.12);
    float oceanVar = sin(vPosition.x * 3.0 + uTime * 0.15) * sin(vPosition.z * 2.5 + uTime * 0.1);
    float oceanBlend = oceanVar * 0.15 + 0.5;
    vec3 oceanColor = mix(oceanDeep, oceanMid, oceanBlend);

    // ── Continent coloring (smooth height gradient, no high-freq noise) ──
    vec3 continentColor = uContinentColors[continentIdx];
    float heightFactor = smoothstep(0.0, 0.5, vElevation);
    vec3 landBase = continentColor * 0.3;
    vec3 landPeak = continentColor * 1.0;
    vec3 landColor = mix(landBase, landPeak, heightFactor);

    // ── Coastline glow (very wide falloff) ──
    float coastDist = abs(vElevation - 0.05);
    float coastGlow = smoothstep(0.15, 0.02, coastDist);
    vec3 coastColor = continentColor * 1.5;

    // ── Combine land/ocean with smooth blend ──
    vec3 finalColor = mix(oceanColor, landColor, isLand);
    finalColor += coastColor * coastGlow * 0.3 * isLand;

    // ── Fresnel rim (gentle, low power) ──
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);
    finalColor += vec3(0.05, 0.2, 0.5) * fresnel * 0.3;

    // ── City lights on dark hemisphere (stable grid, no per-pixel hash) ──
    float sunDot = dot(vNormal, normalize(vec3(1.0, 0.5, 0.5)));
    float darkSide = smoothstep(0.05, -0.4, sunDot);
    // Use coarse grid for city positions — stable across rotations
    vec2 cityGrid = floor(vPosition.xz * 6.0);
    float cityHash = fract(sin(dot(cityGrid, vec2(12.9898, 78.233))) * 43758.5453);
    float cityLights = smoothstep(0.7, 0.85, cityHash);
    finalColor += vec3(1.0, 0.85, 0.5) * cityLights * darkSide * isLand * 0.15;

    // ── Focus highlight (no pulsing, just brightness shift) ──
    if (uFocusContinent >= 0) {
      bool isFocused = (continentIdx == uFocusContinent);
      if (isFocused) {
        finalColor = mix(finalColor, continentColor * 1.1, uFocusStrength * 0.4 * isLand);
      } else {
        finalColor *= mix(1.0, 0.3, uFocusStrength);
      }
    }

    // ── Hover: simple brightness, no pulsing ──
    finalColor += continentColor * uHoverIntensity * 0.06 * isLand;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`

// Continent data — 6 regions matching skills.js
const CONTINENTS = [
  { name: 'Web Development', color: new THREE.Color(0.0, 0.8, 1.0) },
  { name: 'AI / Data', color: new THREE.Color(1.0, 0.4, 0.0) },
  { name: 'CS Fundamentals', color: new THREE.Color(0.53, 0.0, 1.0) },
  { name: 'Tools / Workflow', color: new THREE.Color(0.0, 1.0, 0.53) },
  { name: 'Creative', color: new THREE.Color(1.0, 0.2, 0.53) },
  { name: 'Learning Journey', color: new THREE.Color(1.0, 0.8, 0.0) },
]

export default function PlanetWorld({
  hoverIntensity = 0,
  focusContinent = -1,
  focusStrength = 0,
  onPointerMove,
  onPointerOut,
  onClick,
}) {
  const meshRef = useRef()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uContinentColors: { value: CONTINENTS.map((c) => c.color) },
    uHoverIntensity: { value: 0 },
    uFocusContinent: { value: -1 },
    uFocusStrength: { value: 0 },
  }), [])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    uniforms.uTime.value = state.clock.elapsedTime

    // Smooth interpolation for hover/focus
    const hoverT = 1 - Math.exp(-3.0 * delta)
    const focusT = 1 - Math.exp(-2.5 * delta)

    uniforms.uHoverIntensity.value = THREE.MathUtils.lerp(
      uniforms.uHoverIntensity.value, hoverIntensity, hoverT
    )
    uniforms.uFocusContinent.value = focusContinent
    uniforms.uFocusStrength.value = THREE.MathUtils.lerp(
      uniforms.uFocusStrength.value, focusStrength, focusT
    )

    // Single source of rotation — very slow, delta-time based
    meshRef.current.rotation.y += 0.04 * delta
  })

  return (
    <mesh
      ref={meshRef}
      renderOrder={0}
      onPointerMove={onPointerMove}
      onPointerOut={onPointerOut}
      onClick={onClick}
    >
      <icosahedronGeometry args={[2, 64]} />
      <shaderMaterial
        vertexShader={planetVertexShader}
        fragmentShader={planetFragmentShader}
        uniforms={uniforms}
        depthWrite={true}
        depthTest={true}
      />
    </mesh>
  )
}

export { CONTINENTS }
