import { useState, useEffect } from 'react'
import '../../styles/loader.css'

function Loader() {
  const [loaded, setLoaded] = useState(false)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 30)

    const timer = setTimeout(() => {
      setLoaded(true)
    }, 3500)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

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
