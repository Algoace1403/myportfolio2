import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import profile from '../../data/profile'
import { socials } from '../../data/socials'
import '../../styles/contact-section.css'

const ICON_MAP = {
  FaGithub: FaGithub,
  FaLinkedin: FaLinkedin,
  FaXTwitter: FaXTwitter,
  FaInstagram: FaInstagram,
  FaEnvelope: FaEnvelope,
}

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder — wire up to your backend/Formspree/Netlify Forms
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormState({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section className="contact-section" id="contact" aria-label="Contact">
      <div className="contact-section__inner">
        {/* Left: CTA + Socials */}
        <div className="contact-section__info">
          <motion.span
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            GET IN TOUCH
          </motion.span>

          <motion.h2
            className="contact-section__headline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Let's Build Something<br />
            <span className="contact-section__headline-accent">Together.</span>
          </motion.h2>

          <motion.p
            className="contact-section__description"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Whether you have a project idea, want to collaborate, or just want to say hi —
            I'm always open to connecting with fellow builders.
          </motion.p>

          {/* Email direct */}
          <motion.a
            href={`mailto:${profile.email}`}
            className="contact-section__email"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {profile.email}
          </motion.a>

          {/* Social links */}
          <motion.div
            className="contact-section__socials"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {socials.map((social) => {
              const Icon = ICON_MAP[social.icon]
              if (!Icon) return null
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-section__social-link"
                  aria-label={social.name}
                  title={social.name}
                  style={{ '--social-color': social.color }}
                >
                  <Icon />
                </a>
              )
            })}
          </motion.div>
        </div>

        {/* Right: Contact Form */}
        <motion.form
          ref={formRef}
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          aria-label="Contact form"
        >
          <div className="contact-form__field">
            <label htmlFor="contact-name" className="contact-form__label">Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              className="contact-form__input"
              placeholder="Your name"
              value={formState.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>

          <div className="contact-form__field">
            <label htmlFor="contact-email" className="contact-form__label">Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              className="contact-form__input"
              placeholder="you@example.com"
              value={formState.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="contact-form__field">
            <label htmlFor="contact-message" className="contact-form__label">Message</label>
            <textarea
              id="contact-message"
              name="message"
              className="contact-form__input contact-form__textarea"
              placeholder="Tell me about your project or idea..."
              value={formState.message}
              onChange={handleChange}
              required
              rows={5}
            />
          </div>

          <button
            type="submit"
            className="contact-form__submit"
            disabled={submitted}
          >
            {submitted ? 'Message Sent ✓' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
