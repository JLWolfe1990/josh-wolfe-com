import { motion } from 'framer-motion'
import { ExternalLink, Building2, Gamepad2, Users, Briefcase, Sparkles } from 'lucide-react'

const projects = [
  {
    name: 'J³ Enterprises',
    description: 'My software consultancy. Enterprise solutions, AI automation, and technical leadership.',
    url: 'https://j3-enterprises.com',
    icon: Building2,
    color: 'from-blue-600/20 to-blue-400/10',
    borderColor: 'border-blue-600/30',
  },
  {
    name: 'Cards After Dark',
    description: 'A party card game bringing friends together through laughter and unforgettable moments.',
    url: 'https://cards-after-dark.com',
    icon: Gamepad2,
    color: 'from-purple-600/20 to-purple-400/10',
    borderColor: 'border-purple-600/30',
  },
  {
    name: 'Co-Pals',
    description: 'Building stronger workplace connections through intelligent matching and engagement tools.',
    url: 'https://co-pals.com',
    icon: Users,
    color: 'from-green-600/20 to-green-400/10',
    borderColor: 'border-green-600/30',
  },
  {
    name: 'BizBuzz',
    description: 'Streamlining business operations with smart automation and workflow optimization.',
    url: 'https://bizbuzzapp.com',
    icon: Briefcase,
    color: 'from-amber-600/20 to-amber-400/10',
    borderColor: 'border-amber-600/30',
  },
  {
    name: 'Jamie Wolfe',
    description: 'My wife\'s professional site. Because family comes first, and good design matters.',
    url: 'https://jamie-wolfe.com',
    icon: Sparkles,
    color: 'from-pink-600/20 to-pink-400/10',
    borderColor: 'border-pink-600/30',
  },
]

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy-700 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            className="inline-block text-teal-400 font-medium mb-4"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ delay: 0.1 }}
            className="section-heading mb-4"
          >
            Things I've Built
          </motion.h2>
          <motion.p
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ delay: 0.2 }}
            className="section-subheading mx-auto"
          >
            From my consultancy to side projects, here's what I've been working on.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.01 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-xl border ${project.borderColor} bg-gradient-to-br ${project.color} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-navy-950/50`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-navy-800/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <project.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors">
                    {project.name}
                  </h3>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors flex-shrink-0" />
              </div>
              <p className="text-slate-400 leading-relaxed">
                {project.description}
              </p>
              
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/0 to-teal-600/0 group-hover:from-teal-600/5 group-hover:to-transparent transition-all duration-300" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
