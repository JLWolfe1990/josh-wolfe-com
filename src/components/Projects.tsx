import { ArrowUpRight } from 'lucide-react'
import allwinLogo from '../assets/brands/allwin-logo.png'
import bizBuzzBee from '../assets/brands/bizbuzz-bee.png'
import j3Logo from '../assets/brands/j3-logo.webp'

const projects = [
  {
    name: 'J³ Enterprises',
    label: 'Venture Studio',
    description: 'AI product ventures and technical partnership work for production systems, automation, and customer-facing platforms.',
    url: 'https://j3-enterprises.com',
    visual: 'j3',
  },
  {
    name: 'Allwin Windows',
    label: 'Embedded Delivery',
    description: 'SEO/AEO platform, Cloudflare edge pipeline, OpenClaw agents, and Google Workspace migration for a real operating business.',
    url: 'https://allwinwindows.com',
    visual: 'allwin',
  },
  {
    name: 'BizBuzz',
    label: 'AI Newsletter SaaS',
    description: 'Newsletter automation for relationship-led businesses, with AI-assisted review, scheduling, and customer-safe delivery.',
    url: 'https://bizbuzzapp.com/',
    visual: 'bizbuzz',
  },
]

function ProjectVisual({ type }: { type: string }) {
  if (type === 'allwin') {
    return (
      <div className="brand-card-outline project-card-art brand-card-outline--allwin">
        <img src={allwinLogo} alt="" className="brand-card-image brand-card-image--wide" />
      </div>
    )
  }

  if (type === 'bizbuzz') {
    return (
      <div className="brand-card-outline project-card-art brand-card-outline--bizbuzz">
        <img src={bizBuzzBee} alt="" className="brand-card-image brand-card-image--bee floating-brand-image" />
      </div>
    )
  }

  return (
    <div className="brand-card-outline project-card-art brand-card-outline--j3">
      <img src={j3Logo} alt="" className="brand-card-image brand-card-image--mark" />
    </div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute left-0 top-20 h-80 w-80 bg-[#007bff]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="eyebrow mb-4">Portfolio</p>
          <h2 className="section-heading">Owned ventures and client systems.</h2>
          <p className="section-subheading mt-4">
            The work spans enterprise delivery, product ownership, marketing infrastructure, AI workflows, and production operations.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="artifact-card group flex min-h-[29rem] flex-col p-5"
            >
              <ProjectVisual type={project.visual} />
              <div className="mt-6 flex flex-1 flex-col">
                <p className="eyebrow mb-3">{project.label}</p>
                <h3 className="font-display text-2xl font-extrabold text-white group-hover:text-teal-400">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>
                <span className="mt-auto inline-flex items-center whitespace-nowrap pt-6 font-mono text-xs font-bold uppercase tracking-wider text-teal-400">
                  View company website <ArrowUpRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
