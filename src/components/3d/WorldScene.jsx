import { Suspense, useRef, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { usePerformance } from '../../context/PerformanceContext'
import PlanetWorld from './PlanetWorld'
import CloudLayer from './CloudLayer'
import Atmosphere from './Atmosphere'
import SpaceParticles from './SpaceParticles'
import OrbitalRings from './OrbitalRings'
import DataArcs from './DataArcs'
import ContinentLabels from './ContinentLabels'
import CameraController from './CameraController'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Interactive globe — target-based damped rotation.
//
// Architecture:
//   Pointer events write to targetRotation (the "intent").
//   Every frame, actualRotation lerps toward targetRotation
//   using delta-time exponential smoothing. This decouples
//   input frequency from render frequency, giving buttery
//   smooth rotation regardless of pointer event rate.
//
// Drag velocity is an exponential moving average of recent
// deltas, not the raw last sample. On release, velocity is
// applied to the target each frame with delta-time friction.
// Idle auto-rotation also drives the target.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function InteractiveGlobe({ children }) {
  const groupRef = useRef()

  // ── Tuning constants ──
  const IDLE_SPEED = 0.05           // rad/s idle auto-rotation
  const SENSITIVITY = 0.003         // rad per pixel of drag
  const DAMPING = 12                // how fast actual follows target (higher = snappier)
  const FRICTION_RATE = 3.5         // how fast inertia decays (higher = faster stop)
  const MAX_VELOCITY = 0.06         // clamp velocity to prevent chaotic spins
  const MAX_TILT = 0.35             // max X tilt in radians
  const TILT_FACTOR = 0.35          // vertical drag → tilt conversion
  const TILT_RETURN_RATE = 2.0      // how fast tilt returns to 0 when idle
  const VELOCITY_SMOOTH = 0.3       // EMA factor for velocity smoothing (0-1, lower = smoother)

  // ── State refs (no React re-renders) ──
  const isDragging = useRef(false)
  const prevPointer = useRef({ x: 0, y: 0 })

  // Target = where we want to be (accumulated from input)
  const targetY = useRef(-Math.PI * 0.4)
  const targetX = useRef(0.05)

  // Actual = what's rendered (smoothly follows target)
  const actualY = useRef(-Math.PI * 0.4)
  const actualX = useRef(0.05)

  // Smoothed velocity for inertia
  const velY = useRef(0)
  const velX = useRef(0)

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation()
    isDragging.current = true
    prevPointer.current = { x: e.clientX, y: e.clientY }
    // Don't zero velocity — let the user "catch" a spinning globe
    e.target.setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return
    const dx = e.clientX - prevPointer.current.x
    const dy = e.clientY - prevPointer.current.y
    prevPointer.current = { x: e.clientX, y: e.clientY }

    // Accumulate into target
    const dRotY = dx * SENSITIVITY
    const dRotX = dy * SENSITIVITY * TILT_FACTOR

    targetY.current += dRotY
    targetX.current = Math.max(-MAX_TILT, Math.min(MAX_TILT, targetX.current + dRotX))

    // Exponential moving average for velocity (smooths out jittery pointer events)
    velY.current = velY.current * (1 - VELOCITY_SMOOTH) + dRotY * VELOCITY_SMOOTH
    velX.current = velX.current * (1 - VELOCITY_SMOOTH) + dRotX * VELOCITY_SMOOTH
  }, [])

  const handlePointerUp = useCallback((e) => {
    isDragging.current = false
    if (e.target.hasPointerCapture?.(e.pointerId)) {
      e.target.releasePointerCapture(e.pointerId)
    }
    // Clamp release velocity
    velY.current = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velY.current))
    velX.current = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velX.current))
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Clamp delta to prevent huge jumps on tab-switch
    const dt = Math.min(delta, 0.05)

    if (!isDragging.current) {
      const speed = Math.abs(velY.current) + Math.abs(velX.current)

      if (speed > 0.0001) {
        // ── Inertia phase: velocity drives the target, friction decays it ──
        targetY.current += velY.current
        targetX.current += velX.current * TILT_FACTOR
        targetX.current = Math.max(-MAX_TILT, Math.min(MAX_TILT, targetX.current))

        // Delta-time friction: v *= e^(-friction * dt)
        const decay = Math.exp(-FRICTION_RATE * dt)
        velY.current *= decay
        velX.current *= decay
      } else {
        // ── Idle phase: gentle auto-rotation + tilt returns to 0 ──
        velY.current = 0
        velX.current = 0
        targetY.current += IDLE_SPEED * dt

        // Smoothly return tilt toward 0
        const tiltDecay = 1 - Math.exp(-TILT_RETURN_RATE * dt)
        targetX.current *= (1 - tiltDecay)
      }
    }

    // ── Smooth actual rotation toward target (always runs, even during drag) ──
    const smoothFactor = 1 - Math.exp(-DAMPING * dt)
    actualY.current += (targetY.current - actualY.current) * smoothFactor
    actualX.current += (targetX.current - actualX.current) * smoothFactor

    // Apply to mesh
    groupRef.current.rotation.y = actualY.current
    groupRef.current.rotation.x = actualX.current
  })

  return (
    <group
      ref={groupRef}
      rotation={[0.05, -Math.PI * 0.4, 0]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {children}
    </group>
  )
}

export default function WorldScene({ labelsVisible = true, introComplete = true }) {
  const perf = usePerformance()

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
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: 4,
        toneMappingExposure: 1.0,
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#050510',
        touchAction: 'none',
      }}
      dpr={perf.dpr}
    >
      <Suspense fallback={null}>
        {/* ━━━ Lighting — cinematic sun setup ━━━ */}
        {/* Very dim ambient — just enough to prevent total blackout */}
        <ambientLight intensity={0.04} color="#4466aa" />
        {/* Main sun — warm, strong, positioned for dramatic terminator */}
        <directionalLight position={[5, 2, 3]} intensity={1.4} color="#fff5e8" />
        {/* Subtle fill from below-behind — lifts the dark side slightly */}
        <pointLight position={[-4, -2, -3]} intensity={0.08} color="#2244aa" distance={20} decay={2} />

        {/* ━━━ Interactive globe group (drag to rotate) ━━━ */}
        <InteractiveGlobe>
          <PlanetWorld />
          {perf.cloudLayer && <CloudLayer />}
          {perf.dataArcs && (
            <DataArcs visible={labelsVisible && introComplete} />
          )}
          <ContinentLabels isVisible={labelsVisible && introComplete} />
        </InteractiveGlobe>

        {/* ━━━ Fixed in world space (not affected by drag) ━━━ */}
        <Atmosphere intensity={0.5} />
        <OrbitalRings />
        <SpaceParticles count={perf.particleCount} radius={22} />

        {/* ━━━ Camera ━━━ */}
        <CameraController introComplete={introComplete} />
      </Suspense>
    </Canvas>
  )
}
