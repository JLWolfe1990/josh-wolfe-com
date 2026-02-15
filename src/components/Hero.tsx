import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import headshotWebp from '../assets/photos/josh-headshot-800.webp'
import headshotJpg from '../assets/photos/josh-headshot-800.jpg'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950" />
      
      {/* Subtle grid pattern - lighter on mobile */}
      <div 
        className="absolute inset-0 opacity-[0.015] md:opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Glow effect */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-teal-600/5 rounded-full blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 bg-teal-600/10 border border-teal-600/20 rounded-full text-teal-400 text-sm font-medium mb-6">
                Full-Stack Expert · AI Automation · Problem Solver
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Enterprise Grade.{' '}
              <span className="text-teal-400">Startup Speed.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-400 mb-8 max-w-lg"
            >
              12+ years building, leading, and shipping software at scale. 
              I help companies deliver results faster.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="https://cal.com/joshwolfe"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Free Consultation
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#services" className="btn-secondary">
                View Services
              </a>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-teal-600/20 to-transparent rounded-full blur-sm" />
              
              <picture>
                <source srcSet={headshotWebp} type="image/webp" />
                <img
                  src={headshotJpg}
                  alt="Josh Wolfe"
                  className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl shadow-navy-950/50"
                />
              </picture>
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-4 -left-4 bg-navy-800 border border-navy-700 rounded-lg px-4 py-2 shadow-lg"
              >
                <div className="text-sm text-slate-400">M.B.A., IT Administration</div>
                <div className="text-sm font-medium text-white">12+ Years Experience</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
