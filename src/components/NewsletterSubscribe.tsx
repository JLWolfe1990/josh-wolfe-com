const BIZBUZZ_SUBSCRIBE_URL = 'https://bizbuzz.app/subscribe/cmlmdspty0004yd01xbkspf1d?embed=1'

export function NewsletterSubscribe({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`newsletter-embed ${compact ? 'newsletter-embed-compact' : ''}`}>
      <iframe
        src={BIZBUZZ_SUBSCRIBE_URL}
        title="Subscribe to Josh Wolfe field notes"
        width="100%"
        height="430"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}
