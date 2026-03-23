import { useState, useEffect, useRef, useCallback } from 'react'
import '../../styles/loader.css'

const MIN_DISPLAY_MS = 2500
const LERP_SPEED = 0.08

function lerp(current, target, t) {
  return current + (target - current) * t
}

function Loader() {
  const [loaded, setLoaded] = useState(false)
  const [percent, setPercent] = useState(0)
  const displayRef = useRef(0)
  const realProgressRef = useRef(0)
  const minTimeElapsedRef = useRef(false)
  const assetsReadyRef = useRef(false)
  const startTimeRef = useRef(Date.now())
  const frameRef = useRef(null)

  const checkDone = useCallback(() => {
    if (minTimeElapsedRef.current && assetsReadyRef.current) {
      realProgressRef.current = 100
    }
  }, [])

  useEffect(() => {
    const startTime = startTimeRef.current

    const markAssetsReady = () => {
      assetsReadyRef.current = true
      checkDone()
    }

    const checkAssets = () => {
      if (document.readyState === 'complete') {
        document.fonts.ready.then(markAssetsReady)
      }
    }

    if (document.readyState === 'complete') {
      document.fonts.ready.then(markAssetsReady)
    } else {
      window.addEventListener('load', checkAssets)
    }

    const minTimer = setTimeout(() => {
      minTimeElapsedRef.current = true
      checkDone()
    }, MIN_DISPLAY_MS)

    const animate = () => {
      const elapsed = Date.now() - startTime
      const timerProgress = Math.min((elapsed / MIN_DISPLAY_MS) * 90, 90)

      if (!assetsReadyRef.current || !minTimeElapsedRef.current) {
        realProgressRef.current = Math.min(timerProgress, 90)
      }

      displayRef.current = lerp(displayRef.current, realProgressRef.current, LERP_SPEED)

      if (realProgressRef.current === 100 && displayRef.current > 99.5) {
        displayRef.current = 100
      }

      const rounded = Math.round(displayRef.current)
      setPercent(rounded)

      if (rounded >= 100) {
        setLoaded(true)
        return
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      clearTimeout(minTimer)
      window.removeEventListener('load', checkAssets)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [checkDone])

  return (
    <div className={`loader ${loaded ? 'loaded' : ''}`}>
      <div className="loader-grid"></div>
      <div className="loader-scan"></div>

      <div className="loader-corner corner-tl"></div>
      <div className="loader-corner corner-tr"></div>
      <div className="loader-corner corner-bl"></div>
      <div className="loader-corner corner-br"></div>

      {[...Array(8)].map((_, i) => (
        <div key={i} className="loader-particle"></div>
      ))}

      <div className="loader-center">
        <p className="loader-hello">WELCOME TO</p>
        <h1 className="loader-name">
          <span>A</span><span>K</span><span>S</span>
        </h1>
        <p className="loader-tagline">CREATIVE DEVELOPER</p>

        <div className="loader-progress">
          <div className="loader-bar-track">
            <div className="loader-bar-fill"></div>
          </div>
          <div className="loader-status">
            <span className="loader-status-text">INITIALIZING</span>
            <span className="loader-percent">{percent}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader
