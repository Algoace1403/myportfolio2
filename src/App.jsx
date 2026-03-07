import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from './components/ui/Loader'
import Navbar from './components/ui/Navbar'
import CustomCursor from './components/ui/CustomCursor'
import Home from './pages/Home'
import Work from './pages/Work'
import Timeline from './pages/Timeline'
import Fun from './pages/Fun'
import ContactPage from './pages/ContactPage'

const pageTransition = {
  initial: { opacity: 0, clipPath: 'circle(0% at 50% 50%)' },
  animate: { opacity: 1, clipPath: 'circle(150% at 50% 50%)' },
  exit: { opacity: 0, clipPath: 'circle(0% at 50% 50%)' },
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
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
    <Router>
      <Loader />
      <CustomCursor />
      <Navbar />
      <AnimatedRoutes />
    </Router>
  )
}

export default App
