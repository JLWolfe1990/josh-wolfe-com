import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#services', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  {
    href: '/Josh-Wolfe-Forward-Deployed-Engineer-Resume.pdf',
    label: 'FDE Resume',
    download: true,
  },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-950/92 backdrop-blur-md border-b border-white/10'
          : 'bg-navy-950/75 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <span className="font-display text-base md:text-lg font-extrabold text-teal-400 tracking-tight">
              Josh Wolfe, M.B.A.
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href.startsWith('#') && window.location.pathname !== '/' ? `/${link.href}` : link.href}
                download={link.download ? 'Josh-Wolfe-Forward-Deployed-Engineer-Resume.pdf' : undefined}
                className="relative text-xs font-semibold text-slate-200 hover:text-teal-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href={window.location.pathname !== '/' ? '/#connect' : '#connect'}
              className="btn-primary !px-5 !py-2 !text-xs"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-14 overflow-hidden border-b border-white/10 bg-navy-950/95 backdrop-blur-lg md:hidden">
            <div className="space-y-4 px-4 py-4 sm:px-6 lg:px-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href.startsWith('#') && window.location.pathname !== '/' ? `/${link.href}` : link.href}
                  download={link.download ? 'Josh-Wolfe-Forward-Deployed-Engineer-Resume.pdf' : undefined}
                  className="block py-2 font-medium text-slate-300 transition-colors duration-200 hover:text-teal-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={window.location.pathname !== '/' ? '/#connect' : '#connect'}
                className="btn-primary w-full justify-center text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
