import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Mail, Send, Linkedin, Twitter, BookOpen, MessageCircle, Check, Loader2 } from 'lucide-react'

const socials = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/joshua-l-wolfe/',
    icon: Linkedin,
    handle: '/in/joshua-l-wolfe',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/_joshwolfe',
    icon: Twitter,
    handle: '@_joshwolfe',
  },
  {
    name: 'Medium',
    url: 'https://josh-wolfe.medium.com/',
    icon: BookOpen,
    handle: '@josh-wolfe',
  },
  {
    name: 'Reddit',
    url: 'https://www.reddit.com/user/JLWolfe1990',
    icon: MessageCircle,
    handle: 'u/JLWolfe1990',
  },
]

export function Connect() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': import.meta.env.VITE_BREVO_API_KEY || '',
        },
        body: JSON.stringify({
          email: email,
          listIds: [2], // Default list ID - update as needed
          updateEnabled: true,
        }),
      })

      if (response.ok || response.status === 201 || response.status === 204) {
        setStatus('success')
        setEmail('')
      } else {
        const data = await response.json().catch(() => ({}))
        if (data.code === 'duplicate_parameter') {
          setStatus('success') // Already subscribed is still a success
        } else {
          throw new Error(data.message || 'Failed to subscribe')
        }
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  return (
    <section id="connect" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy-700 to-transparent" />
      
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-600/10 rounded-full blur-[150px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            className="inline-block text-teal-400 font-medium mb-4"
          >
            Get in Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ delay: 0.1 }}
            className="section-heading mb-4"
          >
            Let's Connect
          </motion.h2>
          <motion.p
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ delay: 0.2 }}
            className="section-subheading mx-auto"
          >
            Ready to work together? Book a call, subscribe to my newsletter, or find me on social.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {/* Book a Call */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ delay: 0.1 }}
            className="card text-center flex flex-col h-full"
          >
            <div className="w-14 h-14 bg-teal-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-7 h-7 text-teal-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Book a Call</h3>
            <p className="text-slate-400 mb-6">
              Got a tough problem? Let's talk. Free 30-minute call to dig into what you're facing.
            </p>
            <div className="mt-auto">
              <a
                href="https://cal.com/joshwolfe"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                Schedule Now
              </a>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ delay: 0.2 }}
            className="card text-center flex flex-col h-full"
          >
            <div className="w-14 h-14 bg-teal-600/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-teal-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Newsletter</h3>
            <p className="text-slate-400 mb-6">
              Insights on AI, development, and building products. No spam, unsubscribe anytime.
            </p>
            
            <div className="mt-auto">
            {status === 'success' ? (
              <div className="flex items-center justify-center gap-2 py-3 text-teal-400">
                <Check className="w-5 h-5" />
                <span>You're subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 bg-navy-900 border border-navy-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-600 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
                {status === 'error' && (
                  <p className="text-red-400 text-sm">{errorMessage}</p>
                )}
              </form>
            )}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ delay: 0.3 }}
            className="card md:col-span-2 lg:col-span-1"
          >
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Follow Along</h3>
            <div className="space-y-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-navy-700/50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-navy-700/50 rounded-lg flex items-center justify-center group-hover:bg-teal-600/20 transition-colors">
                    <social.icon className="w-5 h-5 text-slate-400 group-hover:text-teal-400 transition-colors" />
                  </div>
                  <div>
                    <div className="font-medium text-white group-hover:text-teal-400 transition-colors">
                      {social.name}
                    </div>
                    <div className="text-sm text-slate-500">{social.handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Direct Contact */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 pt-12 border-t border-navy-800"
        >
          <p className="text-slate-400">
            Prefer email?{' '}
            <a
              href="mailto:josh@j3-enterprises.com"
              className="text-teal-400 hover:text-teal-300 transition-colors"
            >
              josh@j3-enterprises.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
