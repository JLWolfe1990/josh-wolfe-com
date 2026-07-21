const DISMISSED_UNTIL_KEY = 'josh-newsletter-dismissed-until'
const SUBSCRIBED_KEY = 'josh-newsletter-subscribed'
const DISMISSAL_DURATION_MS = 24 * 60 * 60 * 1000

function getStoredValue(key: string) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function setStoredValue(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Storage may be disabled; signup and dismissal still work for the page view.
  }
}

export function shouldSuppressNewsletterModal() {
  if (getStoredValue(SUBSCRIBED_KEY) === 'true') return true

  const dismissedUntil = Number(getStoredValue(DISMISSED_UNTIL_KEY))
  return Number.isFinite(dismissedUntil) && dismissedUntil > Date.now()
}

export function rememberNewsletterDismissal() {
  setStoredValue(DISMISSED_UNTIL_KEY, String(Date.now() + DISMISSAL_DURATION_MS))
}

export function rememberNewsletterSubscription() {
  setStoredValue(SUBSCRIBED_KEY, 'true')
}
