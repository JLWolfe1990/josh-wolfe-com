import { ArrowLeftRight, ArrowRight } from 'lucide-react'
import bizBuzzBee from '../assets/brands/bizbuzz-bee.png'
import coPalsLogo from '../assets/brands/co-pals-logo.png'

const capabilityGroups = [
  {
    title: 'Engineering',
    items: ['React 19', 'Rails APIs', 'TypeScript', 'AWS / EKS', 'Kubernetes'],
  },
  {
    title: 'AI Systems',
    items: ['RAG', 'LangGraph', 'MCP', 'Claude Code', 'Agent workflows'],
  },
  {
    title: 'Delivery',
    items: ['Discovery', 'Architecture', 'CI/CD', 'Adoption', 'Stakeholders'],
  },
  {
    title: 'Product',
    items: ['Admin UX', 'Analytics', 'Search', 'Permissions', 'Support tooling'],
  },
]

function CoPalsVisual() {
  return (
    <div className="co-pals-visual">
      <div className="co-pals-source co-pals-source--docs">DOCS</div>
      <div className="co-pals-source co-pals-source--chat">CHAT</div>
      <div className="co-pals-source co-pals-source--crm">TOOLS</div>
      <img src={coPalsLogo} alt="" className="co-pals-logo-art" />
      <div className="co-pals-answer">
        <span>AI Co-Pals</span>
        <strong>Answers with team context</strong>
      </div>
    </div>
  )
}

function SupersetExchangeVisual() {
  return (
    <div className="superset-exchange-visual">
      <div className="exchange-card exchange-card--zinc" aria-label="Zinc logo">
        <span>ZINC</span>
      </div>
      <div className="exchange-arrow" aria-hidden="true">
        <ArrowLeftRight className="h-9 w-9" strokeWidth={2.25} />
      </div>
      <div className="exchange-card exchange-card--superset" aria-label="Superset logo">
        <span className="superset-mark" aria-hidden="true">
          <span />
          <span />
        </span>
        <strong>Superset</strong>
      </div>
    </div>
  )
}

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute right-0 top-24 h-80 w-80 bg-teal-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-14">
          <p className="eyebrow mb-4">Selected Case Studies</p>
          <h2 className="section-heading max-w-3xl">
            Work that looks like systems, not slogans.
          </h2>
          <div className="case-study-heading-line" />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <a href="#projects" className="artifact-card group min-h-[25rem] overflow-hidden p-0 lg:col-span-2">
            <div className="grid h-full md:grid-cols-[0.95fr_1.05fr] md:items-stretch">
              <div className="p-5 md:p-8">
                <p className="eyebrow mb-4">Case Study</p>
                <h3 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
                  Production analytics rescue on AWS EKS.
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
                  Took a stalled Superset beta environment from fragile deployment path to a credible customer-facing analytics platform, connecting engineering execution to adoption pressure.
                </p>
                <span className="mt-8 inline-flex items-center font-mono text-xs font-bold uppercase tracking-wider text-teal-400">
                  Read the delivery story <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              <div className="card-side-art md:order-2">
                <SupersetExchangeVisual />
              </div>
            </div>
          </a>

          <div className="artifact-card overflow-hidden p-0 lg:col-span-2">
            <div className="grid h-full md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
              <div className="card-side-art md:order-1">
                <CoPalsVisual />
              </div>
              <div className="p-5 md:order-2 md:p-8">
                <p className="eyebrow mb-4">Knowledge Platform</p>
                <h3 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
                  Co-Pals turns scattered team knowledge into AI companions.
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300">
                  AI-powered knowledge management for teams: capture institutional expertise, search across documents and tools, speed up onboarding, and give people instant answers from DevPal, SalesPal, and SupportPal.
                </p>
                <span className="mt-8 inline-flex items-center font-mono text-xs font-bold uppercase tracking-wider text-teal-400">
                  View Co-Pals <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </div>
          </div>

          <div className="artifact-card overflow-hidden p-0 lg:col-span-2">
            <div className="grid h-full md:grid-cols-[0.9fr_1.1fr] md:items-stretch">
              <div className="card-side-art md:order-2">
                <div className="brand-card-outline card-feature-art min-h-72 brand-card-outline--bizbuzz md:min-h-full">
                  <img src={bizBuzzBee} alt="" className="brand-card-image brand-card-image--bee brand-card-image--bee-feature floating-brand-image" />
                </div>
              </div>
              <div className="p-5 md:order-1 md:p-8">
                <p className="eyebrow mb-4">Venture</p>
                <h3 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
                  BizBuzz AI newsletter SaaS.
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300">
                  LangGraph, GraphQL, Prisma, Postgres, scheduled jobs, Stripe billing, and Kubernetes deployment for a production SaaS workflow.
                </p>
              </div>
            </div>
          </div>

          <div className="artifact-card p-5 md:p-8 lg:col-span-2">
            <p className="eyebrow mb-5">Technical Proficiency</p>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {capabilityGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
                    {group.title}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-white">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
