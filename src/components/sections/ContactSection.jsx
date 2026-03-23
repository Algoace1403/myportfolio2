import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'
import profile from '../../data/profile'
import { socials } from '../../data/socials'
import '../../styles/contact-section.css'

const ICON_MAP = {
  FaGithub: FaGithub,
  FaLinkedin: FaLinkedin,
  FaInstagram: FaInstagram,
  FaEnvelope: FaEnvelope,
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FORMSPREE SETUP:
// 1. Go to https://formspree.io and sign up (free tier = 50 submissions/month)
// 2. Create a new form → you'll get an endpoint like https://formspree.io/f/xABCDEFG
// 3. Replace the URL below with your endpoint
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqynrge'

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Honeypot — bots fill this hidden field, humans don't
    const honeypot = formRef.current?.querySelector('[name="_gotcha"]')
    if (honeypot && honeypot.value) return

    setStatus('sending')

    // Timeout — don't let user wait forever if endpoint is down
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (res.ok) {
        setStatus('sent')
        setFormState({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      clearTimeout(timeoutId)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const buttonText = {
    idle: 'Send Message',
    sending: 'Sending...',
    sent: 'Message Sent ✓',
    error: 'Failed — Try Again',
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

        {/* Right: Contact Form — powered by Formspree */}
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
          {/* Honeypot field — hidden from humans, traps bots */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
            aria-hidden="true"
          />

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
            disabled={status === 'sending' || status === 'sent'}
            aria-busy={status === 'sending'}
          >
            {buttonText[status]}
          </button>

          {/* Screen reader announcement for form status */}
          <div role="status" aria-live="polite" className="sr-only">
            {status === 'sent' && 'Your message has been sent successfully.'}
            {status === 'error' && 'Failed to send message. Please try again.'}
          </div>
        </motion.form>
      </div>
    </section>
  )
}
