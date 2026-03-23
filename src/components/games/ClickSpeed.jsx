import { useState, useRef, useEffect } from 'react'

export default function ClickSpeed() {
  const [count, setCount] = useState(0)
  const [cps, setCps] = useState(0)
  const [timing, setTiming] = useState(false)
  const startRef = useRef(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  const handleClick = () => {
    if (!timing) {
      setTiming(true)
      startRef.current = Date.now()
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startRef.current) / 1000
        setCount((prev) => {
          setCps(elapsed > 0 ? (prev / elapsed).toFixed(1) : 0)
          return prev
        })
      }, 100)
    }
    setCount((prev) => prev + 1)
  }

  const handleReset = (e) => {
    e.stopPropagation()
    setCount(0)
    setCps(0)
    setTiming(false)
    clearInterval(intervalRef.current)
  }

  return (
    <div className="click-counter-area hover-target" onClick={handleClick}>
      <p className="click-count">{count}</p>
      <p className="click-label">CLICKS</p>
      <p className="click-cps">{cps} CPS</p>
      <button className="reset-btn" onClick={handleReset}>RESET</button>
    </div>
  )
}
