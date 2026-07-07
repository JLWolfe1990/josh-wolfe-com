import { motion } from 'framer-motion'

const experience = [
  { company: 'ServiceMax / PTC', role: 'Senior Full-Stack Engineer / Tech Lead', period: '2021 – Present' },
  { company: 'WFSBS / J³ Enterprises', role: 'Founder & Principal Engineer', period: '2016 – Present' },
  { company: 'Hello Alice', role: 'Tech Lead', period: '2020' },
  { company: 'Coupa / Shop-Ware / Pattern', role: 'Senior Engineer across growth-stage SaaS', period: '2016 – 2021' },
]

const skills = [
  'Claude Code', 'OpenSpec', 'MCP', 'RAG & Embeddings', 'LangGraph',
  'React 19', 'Ruby on Rails', 'AWS / EKS', 'Kubernetes', 'Playwright'
]

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#101010] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 bg-teal-500/10 blur-[130px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              className="eyebrow mb-4 inline-block"
            >
              Experience & Skills
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ delay: 0.1 }}
              className="section-heading max-w-3xl"
            >
              A decade plus of shipping products at scale.
            </motion.h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
              Enterprise platforms, founder-led ventures, AI workflow systems, and the connective work between customers, product, and engineering.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 font-mono text-xs font-bold uppercase tracking-wider">
            <span className="text-teal-400">12+ Years Experience</span>
            <span className="text-slate-300">Full-Stack</span>
            <span className="text-slate-300">AI Systems</span>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="relative">
            <div className="absolute left-5 top-10 bottom-10 z-0 hidden w-px bg-gradient-to-b from-teal-400 via-[#007bff] to-white/20 md:block" />
            <div className="space-y-5">
              {experience.map((job) => (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 1, x: 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.01 }}
                  className="relative z-10 rounded-lg border border-white/10 bg-navy-900/75 p-5 md:ml-12"
                >
                  <div className="absolute -left-12 top-5 hidden h-10 w-10 rounded-full border border-teal-400 bg-navy-950 shadow-[0_0_24px_rgba(162,255,51,0.28)] md:block" />
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-display text-lg font-extrabold text-white">{job.role}</h3>
                      <p className="text-sm text-slate-300">{job.company}</p>
                    </div>
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-teal-400">{job.period}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="artifact-card p-6">
            <p className="eyebrow mb-5">Current Stack</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[0.68rem] font-semibold uppercase tracking-wide text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="terminal-visual mt-7">
              <pre>{`role: lead engineer
mode: customer-facing
strength: ambiguous systems
output: production software`}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
