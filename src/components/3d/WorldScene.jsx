import { Suspense, useState, useCallback, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { usePerformance } from '../../context/PerformanceContext'
import PlanetWorld from './PlanetWorld'
import Atmosphere from './Atmosphere'
import SpaceParticles from './SpaceParticles'
import OrbitalRings from './OrbitalRings'
import DataArcs from './DataArcs'
import ContinentLabels from './ContinentLabels'
import CameraController from './CameraController'

export default function WorldScene({ labelsVisible = true, introComplete = true }) {
  const [hoverIntensity, setHoverIntensity] = useState(0)
  const [focusContinent, setFocusContinent] = useState(-1)
  const controlsRef = useRef()
  const perf = usePerformance()

  const handlePointerMove = useCallback(() => {
    setHoverIntensity(1)
  }, [])

  const handlePointerOut = useCallback(() => {
    setHoverIntensity(0)
  }, [])

  const handleFocusContinent = useCallback((idx) => {
    setFocusContinent(idx)
  }, [])

  return (
    <Canvas
      camera={{
        position: [0, 3.5, 10],
        fov: 45,
        near: 1,
        far: 60,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: 3,
        toneMappingExposure: 1.0,
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
      dpr={perf.dpr}
    >
      <Suspense fallback={null}>
        {/* ━━━ Lighting (simple, stable — no specular flicker) ━━━ */}
        <ambientLight intensity={0.15} color="#8899bb" />
        <directionalLight position={[5, 4, 3]} intensity={0.8} color="#4488ff" />
        <pointLight position={[-6, -3, -4]} intensity={0.3} color="#ff4488" distance={20} decay={2} />

        {/* ━━━ Planet (opaque, writes depth) ━━━ */}
        <PlanetWorld
          hoverIntensity={hoverIntensity}
          focusContinent={focusContinent}
          focusStrength={focusContinent >= 0 ? 1 : 0}
          onPointerMove={handlePointerMove}
          onPointerOut={handlePointerOut}
        />

        {/* ━━━ Atmosphere (far from surface, BackSide only) ━━━ */}
        <Atmosphere radius={3.5} intensity={0.6} />

        {/* ━━━ Data Arcs (lifted above surface) ━━━ */}
        {perf.dataArcs && (
          <DataArcs visible={labelsVisible && introComplete && focusContinent < 0} />
        )}

        {/* ━━━ Orbital Rings (well outside atmosphere) ━━━ */}
        <OrbitalRings />

        {/* ━━━ Space Particles (far background only) ━━━ */}
        <SpaceParticles count={perf.particleCount} radius={22} />

        {/* ━━━ Labels (HTML overlay, no 3D geometry on surface) ━━━ */}
        <ContinentLabels
          isVisible={labelsVisible && introComplete}
          focusContinent={focusContinent}
          onFocusContinent={handleFocusContinent}
        />

        {/* ━━━ Camera ━━━ */}
        <CameraController
          introComplete={introComplete}
          focusContinent={focusContinent}
          controlsRef={controlsRef}
        />

        {/* ━━━ Controls (no autoRotate — planet self-rotates) ━━━ */}
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          minDistance={4}
          maxDistance={9}
          autoRotate={false}
          dampingFactor={0.05}
          enableDamping
          maxPolarAngle={Math.PI * 0.78}
          minPolarAngle={Math.PI * 0.22}
          rotateSpeed={0.4}
          zoomSpeed={0.6}
        />

        {/* No post-processing — clean, stable render */}
      </Suspense>
    </Canvas>
  )
}
