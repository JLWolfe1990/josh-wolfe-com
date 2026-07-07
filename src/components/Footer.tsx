export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 py-8">
      <div className="absolute inset-0 bg-navy-950" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl font-extrabold text-teal-400">
            Josh Wolfe
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <a
              href="https://j3-enterprises.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-400 transition-colors"
            >
              J³ Enterprises
            </a>
            <a
              href="mailto:josh@josh-wolfe.com"
              className="text-slate-400 hover:text-teal-400 transition-colors"
            >
              Contact
            </a>
            <a
              href="/blog"
              className="text-slate-400 hover:text-teal-400 transition-colors"
            >
              Blog
            </a>
            <a
              href="https://cal.com/joshwolfe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-400 transition-colors"
            >
              Calendar
            </a>
          </div>

          <p className="text-xs text-slate-400">© {currentYear} Josh Wolfe.</p>
        </div>
      </div>
    </footer>
  )
}
