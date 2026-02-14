import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-8 border-t border-navy-800">
      <div className="absolute inset-0 bg-navy-950" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-1 text-slate-500 text-sm"
          >
            © {currentYear} Josh Wolfe. Built with
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            in Katy, TX.
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 text-sm"
          >
            <a
              href="https://j3-enterprises.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-teal-400 transition-colors"
            >
              J³ Enterprises
            </a>
            <a
              href="mailto:josh@j3-enterprises.com"
              className="text-slate-500 hover:text-teal-400 transition-colors"
            >
              Contact
            </a>
            <a
              href="https://cal.com/joshwolfe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-teal-400 transition-colors"
            >
              Book a Call
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
