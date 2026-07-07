import { useState } from 'react'
import type { FormEvent } from 'react'
import { Check, Loader2 } from 'lucide-react'

type SubscribeStatus = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterSubscribe({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<SubscribeStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email, website }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Could not subscribe right now')
      }

      setStatus('success')
      setEmail('')
      setWebsite('')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Could not subscribe right now')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-5 py-3 text-teal-400">
        <Check className="h-5 w-5" />
        <span className="font-bold">You're subscribed.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-3 sm:flex-row ${compact ? 'mx-auto mt-8 max-w-md' : ''}`}>
      <label className="sr-only" htmlFor={compact ? 'blog-newsletter-email' : 'newsletter-email'}>
        Email address
      </label>
      <input
        id={compact ? 'blog-newsletter-email' : 'newsletter-email'}
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="your@email.com"
        autoComplete="email"
        required
        className="min-w-0 flex-1 rounded-full border border-white/10 bg-navy-950 px-5 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-teal-400"
      />
      <label className="hidden" htmlFor={compact ? 'blog-newsletter-website' : 'newsletter-website'}>
        Website
      </label>
      <input
        id={compact ? 'blog-newsletter-website' : 'newsletter-website'}
        type="text"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />
      <button type="submit" disabled={status === 'loading'} className="btn-primary disabled:opacity-50">
        {status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-300 sm:basis-full">{errorMessage}</p>
      )}
    </form>
  )
}
