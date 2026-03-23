import { PerformanceProvider } from './context/PerformanceContext'
import Loader from './components/ui/Loader'
import Navbar from './components/ui/Navbar'
import CustomCursor from './components/ui/CustomCursor'
import StarsBackground from './components/3d/Stars'
import SmoothScroll from './components/ui/SmoothScroll'
import Home from './pages/Home'

function App() {
  return (
    <PerformanceProvider>
      <SmoothScroll>
        <Loader />
        <StarsBackground />
        <CustomCursor />
        <Navbar />
        <Home />
      </SmoothScroll>
    </PerformanceProvider>
  )
}

export default App
