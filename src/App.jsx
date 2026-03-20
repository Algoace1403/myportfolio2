import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PerformanceProvider } from './context/PerformanceContext'
import Loader from './components/ui/Loader'
import Navbar from './components/ui/Navbar'
import CustomCursor from './components/ui/CustomCursor'
import StarsBackground from './components/3d/Stars'
import SmoothScroll from './components/ui/SmoothScroll'
import CommandPalette from './components/ui/CommandPalette'
import SectionIndicator from './components/ui/SectionIndicator'
import Home from './pages/Home'
import Work from './pages/Work'
import Timeline from './pages/Timeline'
import Fun from './pages/Fun'
import ContactPage from './pages/ContactPage'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/fun" element={<Fun />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <PerformanceProvider>
      <Router>
        <SmoothScroll>
          <Loader />
          <StarsBackground />
          <CustomCursor />
          <Navbar />
          <CommandPalette />
          <SectionIndicator />
          <AnimatedRoutes />
        </SmoothScroll>
      </Router>
    </PerformanceProvider>
  )
}

export default App
