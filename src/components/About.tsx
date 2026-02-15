import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Heart, MapPin } from 'lucide-react'

const highlights = [
  {
    icon: Briefcase,
    label: 'Experience',
    value: '12+ Years',
    detail: 'Building enterprise software',
  },
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'M.B.A.',
    detail: 'IT Administration',
  },
  {
    icon: MapPin,
    label: 'Based in',
    value: 'Katy',
    detail: 'Texas',
  },
  {
    icon: Heart,
    label: 'Volunteer',
    value: 'HLSR',
    detail: 'IT Committee',
  },
]

const experience = [
  { company: 'ServiceMax by PTC', role: 'Senior Full-Stack Software Engineer', period: '2021 – Present' },
  { company: 'Hello Alice', role: 'Tech Lead', period: '2020 – 2021' },
  { company: 'Coupa Software', role: 'Senior Software Engineer', period: '2019 – 2020' },
  { company: 'Shop-Ware', role: 'Senior Software Engineer', period: '2016 – 2019' },
]

const skills = [
  'System Architecture', 'U/X', 'Agentic Coding', 'Generative AI',
  'Agile Expert', 'AWS DevOps', 'Ruby on Rails Expert'
]

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy-700 to-transparent" />
      
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-600/5 rounded-full blur-[150px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Story */}
          <div>
            <motion.span
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              className="inline-block text-teal-400 font-medium mb-4"
            >
              About Me
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ delay: 0.1 }}
              className="section-heading mb-6"
            >
              Building software that moves the needle
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-slate-400 leading-relaxed"
            >
              <p>
                I'm a software engineer and technical leader who's spent over a decade 
                turning complex problems into shipped products. From early-stage startups 
                to enterprise giants, I've built systems that serve millions and led teams 
                that deliver.
              </p>
              <p>
                My approach is simple: understand the business problem first, then build 
                the simplest solution that solves it. I'm not here to over-engineer. I'm 
                here to ship.
              </p>
              <p>
                When I'm not coding, you'll find me volunteering with the Houston Livestock 
                Show and Rodeo IT Committee, mentoring other developers, or exploring the 
                latest in AI and automation.
              </p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
            >
              {highlights.map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-4 bg-navy-900/50 rounded-lg border border-navy-800">
                  <div className="w-12 h-12 bg-teal-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-teal-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-semibold text-white">{item.value}</div>
                    <div className="text-sm text-slate-500">{item.detail}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Experience & Skills */}
          <div className="space-y-8">
            {/* Experience */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Recent Experience</h3>
              <div className="space-y-4">
                {experience.map((job, index) => (
                  <motion.div
                    key={job.company}
                    initial={{ opacity: 1, x: 0 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.01 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-4 p-4 bg-navy-900/30 rounded-lg border border-navy-800/50"
                  >
                    <div className="w-2 h-2 mt-2 bg-teal-400 rounded-full flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-white">{job.role}</div>
                          <div className="text-slate-400">{job.company}</div>
                        </div>
                        <div className="text-sm text-slate-500">{job.period}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-navy-800/50 border border-navy-700 rounded-full text-sm text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
