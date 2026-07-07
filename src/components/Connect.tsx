import { Calendar, Mail } from 'lucide-react'
import { NewsletterSubscribe } from './NewsletterSubscribe'

export function Connect() {
  return (
    <section id="connect" className="relative overflow-hidden bg-[#101010] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 bg-teal-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl font-extrabold leading-[1.02] text-white md:text-6xl">
            The work is the <span className="green-underline text-teal-400">signal.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-300">
            This site is a living portfolio of production systems, field notes, and the operating judgment behind them. For context, collaborations, or a deeper conversation, reach out directly.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://cal.com/joshwolfe"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule a Conversation
            </a>
            <a href="mailto:josh@josh-wolfe.com" className="btn-secondary">
              <Mail className="mr-2 h-4 w-4" />
              Email Josh
            </a>
          </div>
        </div>

        <div className="artifact-card mt-16 p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[0.85fr_1.35fr] md:items-center">
            <div>
              <p className="eyebrow mb-3">Field Notes</p>
              <h3 className="font-display text-2xl font-extrabold text-white">Get the engineering notes.</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Short writing on AI delivery, production systems, and the hard parts of shipping.
              </p>
            </div>

            <NewsletterSubscribe />
          </div>
        </div>
      </div>
    </section>
  )
}
