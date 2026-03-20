import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/command-palette.css'

const COMMANDS = [
  { id: 'home', label: 'World Overview', section: 'Navigate', action: 'navigate', path: '/', icon: '◆' },
  { id: 'about', label: 'About Me', section: 'Navigate', action: 'scroll', target: '#about', icon: '◇' },
  { id: 'skills', label: 'Explore Skills', section: 'Navigate', action: 'scroll', target: '#skills', icon: '◈' },
  { id: 'projects', label: 'View Projects', section: 'Navigate', action: 'scroll', target: '#projects', icon: '◎' },
  { id: 'vision', label: 'Vision & Roadmap', section: 'Navigate', action: 'scroll', target: '#vision', icon: '◉' },
  { id: 'work', label: 'Work Page', section: 'Pages', action: 'navigate', path: '/work', icon: '▣' },
  { id: 'timeline', label: 'Journey Timeline', section: 'Pages', action: 'navigate', path: '/timeline', icon: '▷' },
  { id: 'fun', label: 'Fun / Arcade', section: 'Pages', action: 'navigate', path: '/fun', icon: '◐' },
  { id: 'contact', label: 'Contact', section: 'Pages', action: 'navigate', path: '/contact', icon: '◈' },
  { id: 'resume', label: 'Download Resume', section: 'Actions', action: 'link', url: '/resume.pdf', icon: '↓' },
  { id: 'github', label: 'GitHub Profile', section: 'Actions', action: 'link', url: 'https://github.com/yourusername', icon: '⟡' },
]

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
        setQuery('')
        setSelectedIndex(0)
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen])

  // Auto-focus input
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Filter commands
  const filtered = query.trim()
    ? COMMANDS.filter((cmd) =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS

  // Reset selection when filter changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const executeCommand = useCallback((cmd) => {
    setIsOpen(false)
    setQuery('')

    if (cmd.action === 'navigate') {
      navigate(cmd.path)
    } else if (cmd.action === 'scroll') {
      // Navigate home first if needed, then scroll
      if (window.location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          document.querySelector(cmd.target)?.scrollIntoView({ behavior: 'smooth' })
        }, 500)
      } else {
        document.querySelector(cmd.target)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (cmd.action === 'link') {
      window.open(cmd.url, '_blank', 'noopener')
    }
  }, [navigate])

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filtered.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      executeCommand(filtered[selectedIndex])
    }
  }

  return (
    <>
      {/* Trigger hint */}
      <button
        className="cmd-trigger"
        onClick={() => { setIsOpen(true); setQuery(''); setSelectedIndex(0) }}
        aria-label="Open command palette (Ctrl+K)"
        title="Quick navigation (⌘K)"
      >
        <span className="cmd-trigger__icon">⌘</span>
        <span className="cmd-trigger__label">K</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="cmd-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Palette */}
            <motion.div
              className="cmd-palette"
              role="dialog"
              aria-label="Command palette"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Search input */}
              <div className="cmd-palette__search">
                <span className="cmd-palette__search-icon">⌘</span>
                <input
                  ref={inputRef}
                  type="text"
                  className="cmd-palette__input"
                  placeholder="Type a command or search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label="Search commands"
                />
                <kbd className="cmd-palette__esc">ESC</kbd>
              </div>

              {/* Results */}
              <div className="cmd-palette__results" role="listbox">
                {filtered.length === 0 && (
                  <div className="cmd-palette__empty">No results found</div>
                )}
                {filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    className={`cmd-palette__item ${i === selectedIndex ? 'selected' : ''}`}
                    role="option"
                    aria-selected={i === selectedIndex}
                    onClick={() => executeCommand(cmd)}
                    onMouseEnter={() => setSelectedIndex(i)}
                  >
                    <span className="cmd-palette__item-icon">{cmd.icon}</span>
                    <span className="cmd-palette__item-label">{cmd.label}</span>
                    <span className="cmd-palette__item-section">{cmd.section}</span>
                  </button>
                ))}
              </div>

              {/* Footer hints */}
              <div className="cmd-palette__footer">
                <span><kbd>↑↓</kbd> navigate</span>
                <span><kbd>↵</kbd> select</span>
                <span><kbd>esc</kbd> close</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
