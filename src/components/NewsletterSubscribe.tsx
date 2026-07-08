import { useState } from 'react'
import type { FormEvent } from 'react'
import { Check, Loader2 } from 'lucide-react'

type SubscribeStatus = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterSubscribe({ compact = false }: { compact?: boolean }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<SubscribeStatus>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email, firstName, lastName, website }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || data.success === false) {
        throw new Error(data.error || data.message || 'Could not subscribe right now')
      }

      setStatus('success')
      setMessage(data.message || "You're subscribed.")
      setFirstName('')
      setLastName('')
      setEmail('')
      setWebsite('')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Could not subscribe right now')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl border border-teal-400/30 bg-teal-400/10 px-5 py-4 text-teal-300">
        <Check className="h-5 w-5" />
        <span className="font-bold">{message}</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`newsletter-form ${compact ? 'newsletter-form-compact' : ''}`}>
      <div className="newsletter-name-grid">
        <label>
          <span>First name</span>
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="First name"
            autoComplete="given-name"
            required
          />
        </label>
        <label>
          <span>Last name</span>
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Last name"
            autoComplete="family-name"
            required
          />
        </label>
      </div>
      <label>
        <span>Email address</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="your@email.com"
          autoComplete="email"
          required
        />
      </label>
      <label className="hidden">
        Website
        <input
          type="text"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
      <button type="submit" disabled={status === 'loading'} className="btn-primary justify-center disabled:opacity-50">
        {status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-300">{message}</p>
      )}
    </form>
  )
}
