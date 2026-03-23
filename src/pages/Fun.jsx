import { motion } from 'framer-motion'
import Terminal from '../components/games/Terminal'
import ReactionGame from '../components/games/ReactionGame'
import GravityBalls from '../components/games/GravityBalls'
import ClickSpeed from '../components/games/ClickSpeed'
import TextReveal from '../components/ui/TextReveal'
import '../styles/fun.css'

function Fun() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <section className="fun-page">
        <motion.div
          className="fun-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">// ARCADE ZONE</p>
          <div className="about-line" style={{ margin: '0 auto 25px' }}></div>
          <TextReveal text="HAVE SOME FUN" tag="h2" className="section-title" />
        </motion.div>

        <div className="fun-grid">
          <motion.div
            className="game-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="game-card-header">
              <span>💻</span>
              <h3>HACKER TERMINAL</h3>
            </div>
            <div className="game-card-body">
              <Terminal />
            </div>
          </motion.div>

          <motion.div
            className="game-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="game-card-header">
              <span>⚡</span>
              <h3>REACTION TIME</h3>
            </div>
            <div className="game-card-body">
              <ReactionGame />
            </div>
          </motion.div>

          <motion.div
            className="game-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="game-card-header">
              <span>🎱</span>
              <h3>GRAVITY BALLS</h3>
            </div>
            <div className="game-card-body">
              <GravityBalls />
            </div>
          </motion.div>

          <motion.div
            className="game-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="game-card-header">
              <span>🖱️</span>
              <h3>CLICK SPEED</h3>
            </div>
            <div className="game-card-body">
              <ClickSpeed />
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Fun
