import { useEffect, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Check, X } from 'lucide-react'
import { NewsletterSubscribe } from './NewsletterSubscribe'
import {
  rememberNewsletterDismissal,
  shouldSuppressNewsletterModal,
} from '../lib/newsletter-preferences'

const MINIMUM_READING_TIME_MS = 35_000
const MINIMUM_SCROLL_PROGRESS = 0.4

export function BlogNewsletterModal() {
  const [open, setOpen] = useState(false)
  const [hasReadLongEnough, setHasReadLongEnough] = useState(false)
  const [hasScrolledFarEnough, setHasScrolledFarEnough] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const resolvedForPageView = useRef(false)

  useEffect(() => {
    if (shouldSuppressNewsletterModal()) {
      resolvedForPageView.current = true
      return
    }

    const readingTimer = window.setTimeout(() => {
      setHasReadLongEnough(true)
    }, MINIMUM_READING_TIME_MS)

    const checkScrollProgress = () => {
      const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight
      if (scrollableDistance <= 0) return

      const progress = window.scrollY / scrollableDistance
      if (progress >= MINIMUM_SCROLL_PROGRESS) {
        setHasScrolledFarEnough(true)
        window.removeEventListener('scroll', checkScrollProgress)
      }
    }

    window.addEventListener('scroll', checkScrollProgress, { passive: true })
    checkScrollProgress()

    return () => {
      window.clearTimeout(readingTimer)
      window.removeEventListener('scroll', checkScrollProgress)
    }
  }, [])

  useEffect(() => {
    if (hasReadLongEnough && hasScrolledFarEnough && !resolvedForPageView.current) {
      setOpen(true)
    }
  }, [hasReadLongEnough, hasScrolledFarEnough])

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)

    if (!nextOpen && !subscribed) {
      resolvedForPageView.current = true
      rememberNewsletterDismissal()
    }
  }

  const handleSuccess = () => {
    setSubscribed(true)
    resolvedForPageView.current = true
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="newsletter-modal-overlay" />
        <Dialog.Content className="newsletter-modal-content" aria-describedby="newsletter-modal-description">
          <Dialog.Close className="newsletter-modal-close" aria-label="Close newsletter signup">
            <X aria-hidden="true" />
          </Dialog.Close>

          {subscribed ? (
            <div className="newsletter-modal-success" role="status">
              <span><Check aria-hidden="true" /></span>
              <Dialog.Title>Welcome to the Field Notes.</Dialog.Title>
              <Dialog.Description id="newsletter-modal-description">
                You’re all set—the subscription is confirmed. Thanks for reading.
              </Dialog.Description>
              <Dialog.Close className="btn-primary justify-center">Keep reading</Dialog.Close>
            </div>
          ) : (
            <>
              <p className="newsletter-modal-eyebrow">Enjoying the article?</p>
              <Dialog.Title>Get the next Field Note.</Dialog.Title>
              <Dialog.Description id="newsletter-modal-description">
                Monthly, practical notes on AI delivery, production systems, and engineering leadership. No noise.
              </Dialog.Description>
              <NewsletterSubscribe onSuccess={handleSuccess} />
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
