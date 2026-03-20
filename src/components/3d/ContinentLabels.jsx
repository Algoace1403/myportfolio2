import { useState } from 'react'
import { Html } from '@react-three/drei'
import { CONTINENTS } from './PlanetWorld'

// Labels are positioned well above the planet surface (r≈2.7-3.0).
// No 3D line connectors (caused z-fighting).
// No floating Y animation (caused clipping).
// Pure HTML overlay via drei's <Html> — stable, readable, no depth issues.

const LABEL_POSITIONS = [
  { pos: [-1.6, 1.1, 1.2], domain: 'Web Development', tools: ['React', 'Node.js', 'CSS', 'Next.js'], continentIdx: 0 },
  { pos: [1.4, 0.0, 1.5], domain: 'AI / Data', tools: ['Python', 'TensorFlow', 'LLMs', 'Pandas'], continentIdx: 1 },
  { pos: [0.2, 1.5, -1.7], domain: 'CS Fundamentals', tools: ['DSA', 'OOP', 'System Design', 'Git'], continentIdx: 2 },
  { pos: [-0.8, 2.1, -0.5], domain: 'Tools / Workflow', tools: ['Docker', 'CI/CD', 'Figma', 'VS Code'], continentIdx: 3 },
  { pos: [1.5, 0.9, -1.2], domain: 'Creative', tools: ['Three.js', 'GLSL', 'GSAP', 'Canvas'], continentIdx: 4 },
  { pos: [-1.8, 0.6, -1.0], domain: 'Journey', tools: ['B.Tech CS', 'Self-taught', 'Open Source'], continentIdx: 5 },
]

function FloatingLabel({ position, domain, tools, color, isVisible, isFocused, onFocus }) {
  const [hovered, setHovered] = useState(false)

  const cssColor = `#${color.getHexString()}`
  const isActive = hovered || isFocused

  return (
    <group position={position}>
      <Html
        center
        distanceFactor={6}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease',
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        <div
          className="hud-label"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => onFocus?.()}
          style={{
            background: isActive
              ? `linear-gradient(135deg, ${cssColor}15, ${cssColor}30)`
              : 'linear-gradient(135deg, rgba(8,8,24,0.88), rgba(8,8,24,0.6))',
            border: `1px solid ${isActive ? cssColor + '88' : cssColor + '44'}`,
            borderRadius: '10px',
            padding: isActive ? '14px 20px' : '8px 16px',
            color: '#fff',
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            backdropFilter: 'blur(16px)',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isActive ? 'scale(1.1)' : 'scale(1)',
            boxShadow: isActive
              ? `0 0 30px ${cssColor}33, 0 0 60px ${cssColor}15, inset 0 0 20px ${cssColor}08`
              : `0 0 12px ${cssColor}15`,
            whiteSpace: 'nowrap',
            userSelect: 'none',
            position: 'relative',
          }}
        >
          {/* HUD corner accents */}
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: '8px', height: '8px',
            borderTop: `1px solid ${cssColor}`,
            borderLeft: `1px solid ${cssColor}`,
            borderRadius: '2px 0 0 0',
            opacity: isActive ? 0.8 : 0.3,
            transition: 'opacity 0.3s',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: '8px', height: '8px',
            borderBottom: `1px solid ${cssColor}`,
            borderRight: `1px solid ${cssColor}`,
            borderRadius: '0 0 2px 0',
            opacity: isActive ? 0.8 : 0.3,
            transition: 'opacity 0.3s',
          }} />

          {/* Domain name */}
          <div style={{
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: cssColor,
            marginBottom: isActive ? '8px' : '0',
            transition: 'margin 0.3s',
          }}>
            {domain}
          </div>

          {/* Expanded tools */}
          {isActive && (
            <div style={{
              display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '4px',
            }}>
              {tools.map((tool) => (
                <span key={tool} style={{
                  fontSize: '9px',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  background: `${cssColor}18`,
                  border: `1px solid ${cssColor}33`,
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.5px',
                  fontFamily: "'Space Mono', monospace",
                }}>
                  {tool}
                </span>
              ))}
            </div>
          )}

          {/* Click hint */}
          {hovered && !isFocused && (
            <div style={{
              fontSize: '8px',
              color: `${cssColor}99`,
              marginTop: '6px',
              letterSpacing: '1.5px',
              fontFamily: "'Space Mono', monospace",
            }}>
              CLICK TO FOCUS
            </div>
          )}
        </div>
      </Html>
    </group>
  )
}

export default function ContinentLabels({ isVisible = true, focusContinent = -1, onFocusContinent }) {
  return (
    <group>
      {LABEL_POSITIONS.map((label, i) => (
        <FloatingLabel
          key={label.domain}
          position={label.pos}
          domain={label.domain}
          tools={label.tools}
          color={CONTINENTS[i].color}
          isVisible={isVisible}
          isFocused={focusContinent === i}
          onFocus={() => onFocusContinent?.(focusContinent === i ? -1 : i)}
        />
      ))}
    </group>
  )
}

export { LABEL_POSITIONS }
