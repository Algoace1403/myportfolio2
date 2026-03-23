import { useState, useRef } from 'react'

export default function ReactionGame() {
  const [state, setState] = useState('waiting')
  const [startTime, setStartTime] = useState(0)
  const [reactionTime, setReactionTime] = useState(0)
  const timeoutRef = useRef(null)

  const start = () => {
    setState('ready')
    const delay = 2000 + Math.random() * 3000
    timeoutRef.current = setTimeout(() => {
      setState('go')
      setStartTime(Date.now())
    }, delay)
  }

  const handleClick = () => {
    if (state === 'waiting') {
      start()
    } else if (state === 'ready') {
      clearTimeout(timeoutRef.current)
      setState('waiting')
    } else if (state === 'go') {
      setReactionTime(Date.now() - startTime)
      setState('result')
    } else if (state === 'result') {
      start()
    }
  }

  const getClass = () => {
    if (state === 'waiting') return 'reaction-waiting'
    if (state === 'ready') return 'reaction-ready'
    if (state === 'go') return 'reaction-go'
    return 'reaction-result'
  }

  return (
    <div className={`reaction-area ${getClass()} hover-target`} onClick={handleClick} role="button" tabIndex={0} aria-label="Reaction time game">
      {state === 'waiting' && <p className="reaction-text">CLICK TO START</p>}
      {state === 'ready' && <p className="reaction-text" style={{ color: 'var(--nebula-pink)' }}>WAIT FOR GREEN...</p>}
      {state === 'go' && <p className="reaction-text" style={{ color: '#4caf50' }}>CLICK NOW!</p>}
      {state === 'result' && (
        <div>
          <p className="reaction-time">{reactionTime}</p>
          <p className="reaction-ms">milliseconds</p>
          <p className="reaction-text" style={{ marginTop: '10px', fontSize: '0.7rem', color: 'var(--gray)' }}>
            {reactionTime < 200 ? 'INSANE!' : reactionTime < 300 ? 'FAST!' : reactionTime < 400 ? 'GOOD' : 'TRY AGAIN'}
          </p>
          <p className="reaction-text" style={{ marginTop: '5px', fontSize: '0.6rem' }}>CLICK TO RETRY</p>
        </div>
      )}
    </div>
  )
}
