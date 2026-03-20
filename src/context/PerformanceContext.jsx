import { createContext, useContext, useState, useEffect, useMemo } from 'react'

const PerformanceContext = createContext({
  tier: 'high',        // 'high' | 'medium' | 'low'
  isMobile: false,
  isReducedMotion: false,
  webglSupported: true,
  particleCount: 3500,
  postProcessing: true,
  cloudLayer: true,
  dataArcs: true,
  dpr: [1, 1.5],
})

function detectGPUTier() {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return 'low'

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()
      // Known low-end GPUs
      if (renderer.includes('intel') && !renderer.includes('iris')) return 'low'
      if (renderer.includes('mali-4') || renderer.includes('adreno 3')) return 'low'
      if (renderer.includes('swiftshader') || renderer.includes('llvmpipe')) return 'low'
      // Medium tier
      if (renderer.includes('mali') || renderer.includes('adreno 5')) return 'medium'
      if (renderer.includes('intel iris') || renderer.includes('intel uhd')) return 'medium'
    }

    // Check max texture size as a rough capability indicator
    const maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE)
    if (maxTexture < 4096) return 'low'
    if (maxTexture < 8192) return 'medium'

    return 'high'
  } catch {
    return 'medium'
  }
}

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

export function PerformanceProvider({ children }) {
  const [tier, setTier] = useState('high')
  const [isMobile, setIsMobile] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    // GPU detection
    setTier(detectGPUTier())

    // WebGL support
    setWebglSupported(detectWebGL())

    // Mobile detection
    const mobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent)
    setIsMobile(mobile)

    // Reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(motionQuery.matches)
    const handler = (e) => setIsReducedMotion(e.matches)
    motionQuery.addEventListener('change', handler)

    // Resize handler for mobile detection
    const resizeHandler = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', resizeHandler)

    return () => {
      motionQuery.removeEventListener('change', handler)
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  // Downgrade tier on mobile
  const effectiveTier = isMobile ? (tier === 'high' ? 'medium' : 'low') : tier

  const value = useMemo(() => ({
    tier: effectiveTier,
    isMobile,
    isReducedMotion,
    webglSupported,
    particleCount: effectiveTier === 'high' ? 3500 : effectiveTier === 'medium' ? 1500 : 500,
    postProcessing: effectiveTier !== 'low',
    cloudLayer: effectiveTier !== 'low',
    dataArcs: effectiveTier !== 'low',
    dpr: effectiveTier === 'high' ? [1, 1.5] : effectiveTier === 'medium' ? [1, 1.2] : [1, 1],
  }), [effectiveTier, isMobile, isReducedMotion, webglSupported])

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  )
}

export function usePerformance() {
  return useContext(PerformanceContext)
}

export default PerformanceContext
