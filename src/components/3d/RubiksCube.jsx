
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const INNER = '#1a1a2e'
const FACE_COLORS = {
  R: '#e040fb', L: '#ff6b35', U: '#ffffff',
  D: '#ffeb3b', F: '#4fc3f7', B: '#4caf50'
}

function createCube() {
  const cubies = []
  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++)
      for (let z = -1; z <= 1; z++)
        cubies.push({
          pos: [x, y, z],
          colors: [
            x === 1 ? FACE_COLORS.R : INNER,
            x === -1 ? FACE_COLORS.L : INNER,
            y === 1 ? FACE_COLORS.U : INNER,
            y === -1 ? FACE_COLORS.D : INNER,
            z === 1 ? FACE_COLORS.F : INNER,
            z === -1 ? FACE_COLORS.B : INNER,
          ]
        })
  return cubies
}

function rotateFace(cubies, axis, layer, cw) {
  return cubies.map(cubie => {
    const [x, y, z] = cubie.pos
    const c = [...cubie.colors]
    const val = axis === 'x' ? x : axis === 'y' ? y : z
    if (val !== layer) return cubie

    if (axis === 'x') return {
      pos: cw ? [x, -z, y] : [x, z, -y],
      colors: cw ? [c[0],c[1],c[5],c[4],c[2],c[3]] : [c[0],c[1],c[4],c[5],c[3],c[2]]
    }
    if (axis === 'y') return {
      pos: cw ? [z, y, -x] : [-z, y, x],
      colors: cw ? [c[5],c[4],c[2],c[3],c[0],c[1]] : [c[4],c[5],c[2],c[3],c[1],c[0]]
    }
    return {
      pos: cw ? [y, -x, z] : [-y, x, z],
      colors: cw ? [c[3],c[2],c[0],c[1],c[4],c[5]] : [c[2],c[3],c[1],c[0],c[4],c[5]]
    }
  })
}

function Cubie({ position, colors }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      {colors.map((color, i) => (
        <meshStandardMaterial key={i} attach={`material-${i}`} color={color} />
      ))}
    </mesh>
  )
}

function RubiksCubeScene() {
  const [cubies, setCubies] = useState(createCube)

  const move = (axis, layer, cw) => {
    setCubies(prev => rotateFace(prev, axis, layer, cw))
  }

  const scramble = () => {
    let c = createCube()
    const allMoves = [
      ['x',1,true],['x',1,false],['x',-1,false],['x',-1,true],
      ['y',1,true],['y',1,false],['y',-1,false],['y',-1,true],
      ['z',1,true],['z',1,false],['z',-1,false],['z',-1,true],
    ]
    for (let i = 0; i < 25; i++) {
      const m = allMoves[Math.floor(Math.random() * allMoves.length)]
      c = rotateFace(c, m[0], m[1], m[2])
    }
    setCubies(c)
  }

  const reset = () => setCubies(createCube())

  return (
    <div className="cube-scene">
      <div className="cube-canvas">
        <Canvas camera={{ position: [4, 3, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#4fc3f7" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#e040fb" />
          {cubies.map((cubie, i) => (
            <Cubie key={i} position={cubie.pos} colors={cubie.colors} />
          ))}
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      <div className="cube-controls">
        <div className="cube-btn-row">
          <button className="cube-btn" onClick={() => move('x', 1, true)}>R</button>
          <button className="cube-btn" onClick={() => move('x', 1, false)}>R'</button>
          <button className="cube-btn" onClick={() => move('x', -1, false)}>L</button>
          <button className="cube-btn" onClick={() => move('x', -1, true)}>L'</button>
        </div>
        <div className="cube-btn-row">
          <button className="cube-btn" onClick={() => move('y', 1, true)}>U</button>
          <button className="cube-btn" onClick={() => move('y', 1, false)}>U'</button>
          <button className="cube-btn" onClick={() => move('y', -1, false)}>D</button>
          <button className="cube-btn" onClick={() => move('y', -1, true)}>D'</button>
        </div>
        <div className="cube-btn-row">
          <button className="cube-btn" onClick={() => move('z', 1, true)}>F</button>
          <button className="cube-btn" onClick={() => move('z', 1, false)}>F'</button>
          <button className="cube-btn" onClick={() => move('z', -1, false)}>B</button>
          <button className="cube-btn" onClick={() => move('z', -1, true)}>B'</button>
        </div>
        <div className="cube-btn-row">
          <button className="cube-btn-special" onClick={scramble}>SCRAMBLE</button>
          <button className="cube-btn-special" onClick={reset}>RESET</button>
        </div>
      </div>
    </div>
  )
}

export default RubiksCubeScene