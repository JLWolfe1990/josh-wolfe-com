import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  rememberNewsletterDismissal,
  rememberNewsletterSubscription,
  shouldSuppressNewsletterModal,
} from '../src/lib/newsletter-preferences'

class MemoryStorage {
  private values = new Map<string, string>()

  getItem(key: string) {
    return this.values.get(key) ?? null
  }

  setItem(key: string, value: string) {
    this.values.set(key, value)
  }
}

describe('newsletter modal preferences', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-21T12:00:00-05:00'))
    vi.stubGlobal('window', { localStorage: new MemoryStorage() })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('allows the modal before a reader dismisses or subscribes', () => {
    expect(shouldSuppressNewsletterModal()).toBe(false)
  })

  it('suppresses the modal for 24 hours after dismissal', () => {
    rememberNewsletterDismissal()
    expect(shouldSuppressNewsletterModal()).toBe(true)

    vi.advanceTimersByTime(24 * 60 * 60 * 1000)
    expect(shouldSuppressNewsletterModal()).toBe(false)
  })

  it('suppresses the modal permanently after subscription', () => {
    rememberNewsletterSubscription()
    vi.advanceTimersByTime(365 * 24 * 60 * 60 * 1000)
    expect(shouldSuppressNewsletterModal()).toBe(true)
  })
})
