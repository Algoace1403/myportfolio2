                                                                                                                                                                                                                
  import { motion } from 'framer-motion'                                                                                                                                                                        
  import Hero from '../components/sections/Hero'
  import About from '../components/sections/About'

  function Home() {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <About />
      </motion.div>
    )
  }

  export default Home