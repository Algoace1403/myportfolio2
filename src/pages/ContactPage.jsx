import { motion } from 'framer-motion'
import ContactSection from '../components/sections/ContactSection'
import Footer from '../components/ui/Footer'

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <ContactSection />
      <Footer />
    </motion.div>
  )
}
