import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Wrench, Bot, Code, Lightbulb, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Wrench,
    title: 'Embedded Expert',
    description: 'I plug into your team and solve hard problems. Architecture, performance, scaling, integrations — whatever\'s blocking you, I fix it. Boots on the ground, not in the boardroom.',
    features: ['Architecture & scaling', 'Performance optimization', 'Complex integrations', 'Technical problem-solving'],
  },
  {
    icon: Bot,
    title: 'AI Automation',
    description: 'Harness the power of AI to automate workflows, build intelligent agents, and create competitive advantages. From GPT integrations to custom agentic systems.',
    features: ['Agentic development', 'LLM integrations', 'Workflow automation', 'Custom AI solutions'],
  },
  {
    icon: Code,
    title: 'Enterprise Development',
    description: 'Full-stack development with enterprise-grade quality. Ruby on Rails, React, TypeScript — battle-tested technologies delivered at startup speed.',
    features: ['Full-stack development', 'API design', 'System architecture', 'Performance optimization'],
  },
  {
    icon: Lightbulb,
    title: 'Technical Consulting',
    description: 'Expert guidance on your toughest technical challenges. Code reviews, architecture audits, team assessments, and strategic planning.',
    features: ['Architecture review', 'Code audits', 'Process improvement', 'Technical due diligence'],
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
    transition: { duration: 0.5 },
  },
}

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            className="inline-block text-teal-400 font-medium mb-4"
          >
            What I Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ delay: 0.1 }}
            className="section-heading mb-4"
          >
            Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ delay: 0.2 }}
            className="section-subheading mx-auto"
          >
            From strategic leadership to hands-on development, I deliver solutions that work.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="card group cursor-default"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-600/10 rounded-lg flex items-center justify-center group-hover:bg-teal-600/20 transition-colors">
                  <service.icon className="w-6 h-6 text-teal-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-slate-500">
                        <ArrowRight className="w-3 h-3 mr-2 text-teal-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://cal.com/joshwolfe"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Let's Talk About Your Project
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
