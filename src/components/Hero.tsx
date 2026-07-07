import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import headshot400Jpg from '../assets/photos/josh-headshot-400.jpg'
import headshot400Webp from '../assets/photos/josh-headshot-400.webp'
import headshot800Jpg from '../assets/photos/josh-headshot-800.jpg'
import headshot800Webp from '../assets/photos/josh-headshot-800.webp'

const starField = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  size: 3 + (index % 4),
  delay: (index % 12) * 0.18,
  duration: 3.4 + (index % 5) * 0.42,
}))

function FramerStarField() {
  return (
    <div className="framer-starfield" aria-hidden="true">
      {starField.map((star) => (
        <motion.span
          key={star.id}
          className="framer-star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.08, 0.72, 0.08],
            rotate: [0, 180, 360],
            scale: [0.6, 1.45, 0.6],
            x: [0, star.id % 2 === 0 ? 12 : -12, 0],
            y: [0, star.id % 3 === 0 ? -10 : 10, 0],
          }}
          transition={{
            delay: star.delay,
            duration: star.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function Hero() {
  return (
    <section className="site-shell relative min-h-screen flex items-center pt-16 overflow-hidden">
      <FramerStarField />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="eyebrow inline-block mb-5">
                Lead Engineer · FDE · AI Systems
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-[2.8rem] sm:text-6xl lg:text-[4.35rem] font-extrabold text-white leading-[0.92] tracking-tight mb-6"
            >
              I bridge customers, product, and engineering to ship software that <span className="text-teal-400">actually works.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-200 mb-8 max-w-xl leading-relaxed"
            >
              Senior full-stack and AI engineer with 12+ years taking ambiguous, customer-facing platform work from discovery to production. React, Rails, AWS/EKS, Kubernetes, RAG, LangGraph, MCP, and the delivery judgment to make it land.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="grid grid-cols-3 gap-3 max-w-xl mb-8"
            >
              {[
                ['308K', 'solo SLOC shipped'],
                ['$1.5M', 'software sold on-site'],
                ['12+', 'years in production'],
              ].map(([value, label]) => (
                <div key={value} className="border border-white/10 bg-navy-900/70 rounded-lg p-3">
                  <div className="font-display text-2xl font-extrabold text-white">{value}</div>
                  <div className="font-mono text-[0.62rem] uppercase tracking-wide text-slate-400 leading-tight">{label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#services" className="btn-primary group">
                View Work
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/blog" className="btn-secondary group">
                Read Notes
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-2 text-sm text-slate-400 mt-6"
            >
              <MapPin className="w-4 h-4 text-teal-400" />
              Katy / Houston · remote-first · 50% travel OK
            </motion.p>
          </div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 flex justify-center lg:order-2 lg:-translate-y-32"
          >
            <div className="relative mx-auto flex w-full max-w-[23rem] flex-col items-center gap-6 sm:max-w-[30rem] lg:max-w-[31rem]">
              <motion.div
                className="absolute inset-x-8 top-8 aspect-square rounded-full bg-teal-400/10 blur-3xl"
                animate={{ opacity: [0.45, 0.78, 0.45], scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="relative aspect-square w-full rounded-full bg-[radial-gradient(circle_at_50%_36%,rgba(162,255,51,0.18),rgba(29,47,21,0.54)_38%,rgba(13,16,13,0.84)_68%)] shadow-2xl shadow-black/35">
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${headshot400Webp} 400w, ${headshot800Webp} 800w`}
                      sizes="(min-width: 1024px) 31rem, (min-width: 640px) 30rem, 23rem"
                    />
                    <img
                      src={headshot800Jpg}
                      srcSet={`${headshot400Jpg} 400w, ${headshot800Jpg} 800w`}
                      sizes="(min-width: 1024px) 31rem, (min-width: 640px) 30rem, 23rem"
                      alt="Josh Wolfe"
                      width="800"
                      height="800"
                      loading="eager"
                      decoding="async"
                      className="h-full w-full scale-[1.04] object-contain object-center drop-shadow-2xl"
                    />
                  </picture>
                </div>
              </div>

              <div className="artifact-card w-full max-w-[33rem] p-4">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="eyebrow mb-2">Current Focus</p>
                    <p className="text-sm font-bold text-white">Production AI workflows, platform rebuilds, and forward-deployed delivery.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
