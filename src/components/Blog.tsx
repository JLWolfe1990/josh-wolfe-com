import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react'
import { Footer } from './Footer'
import { Header } from './Header'
import { NewsletterSubscribe } from './NewsletterSubscribe'
import { formatPostDate, getAllPosts, getPost } from '../lib/blog'

const categoryClasses: Record<string, string> = {
  'AI Engineering': 'border-white/12 bg-white/5 text-slate-400',
  Automation: 'border-white/12 bg-white/5 text-slate-400',
  Delivery: 'border-white/12 bg-white/5 text-slate-400',
  Leadership: 'border-white/12 bg-white/5 text-slate-400',
}

const visuals = ['dashboard', 'orbital', 'terminal', 'lines']

const imageDimensions: Record<string, { width: number; height: number }> = {
  '/blog/ai-coding-stack-fragmentation/hero-meaningful.svg': { width: 1520, height: 760 },
  '/blog/ai-coding-stack-fragmentation/stack-map.svg': { width: 1520, height: 834 },
  '/blog/ai-coding-stack-fragmentation/prompt-patterns.svg': { width: 1520, height: 834 },
  '/blog/agentic-workflows-ai-development-loop/hero-meaningful.svg': { width: 1520, height: 760 },
  '/blog/agentic-workflows-ai-development-loop/agent-loop.svg': { width: 1520, height: 834 },
  '/blog/agentic-workflows-ai-development-loop/guardrails.svg': { width: 1520, height: 834 },
  '/blog/business-system-not-just-website/hero-meaningful.webp': { width: 1520, height: 760 },
  '/blog/business-system-not-just-website/hero-background.webp': { width: 1520, height: 760 },
  '/blog/business-system-not-just-website/website-vs-system.webp': { width: 1520, height: 834 },
  '/blog/business-system-not-just-website/lead-follow-up-loop.webp': { width: 1520, height: 834 },
  '/blog/ai-real-business-workflow/hero-background.webp': { width: 1520, height: 760 },
  '/blog/ai-real-business-workflow/hero-meaningful.webp': { width: 1520, height: 760 },
  '/blog/ai-real-business-workflow/decision-points.webp': { width: 1520, height: 834 },
  '/blog/ai-real-business-workflow/fit-matrix.webp': { width: 1520, height: 834 },
  '/blog/ai-real-business-workflow/human-approval-loop.webp': { width: 1520, height: 834 },
  '/blog/production-readiness-checklist/hero-background.webp': { width: 1520, height: 760 },
  '/blog/production-readiness-checklist/hero-meaningful.webp': { width: 1520, height: 760 },
  '/blog/production-readiness-checklist/readiness-checklist.webp': { width: 1520, height: 834 },
  '/blog/production-readiness-checklist/release-gate-flow.webp': { width: 1520, height: 834 },
  '/blog/production-readiness-checklist/monitoring-loop.webp': { width: 1520, height: 834 },
  '/blog/manual-workflow-internal-tool/hero-background.webp': { width: 1520, height: 760 },
  '/blog/manual-workflow-internal-tool/hero-meaningful.webp': { width: 1520, height: 760 },
  '/blog/manual-workflow-internal-tool/workflow-map.webp': { width: 1520, height: 834 },
  '/blog/manual-workflow-internal-tool/tool-screen.webp': { width: 1520, height: 834 },
  '/blog/manual-workflow-internal-tool/adoption-loop.webp': { width: 1520, height: 834 },
  '/blog/custom-software-project-scope/hero-background.webp': { width: 1520, height: 760 },
  '/blog/custom-software-project-scope/hero-meaningful.webp': { width: 1520, height: 760 },
  '/blog/custom-software-project-scope/scoping-board.webp': { width: 1520, height: 834 },
  '/blog/custom-software-project-scope/risk-map.webp': { width: 1520, height: 834 },
  '/blog/custom-software-project-scope/release-slice.webp': { width: 1520, height: 834 },
  '/blog/software-handoff-checklist/hero-background.webp': { width: 1520, height: 760 },
  '/blog/software-handoff-checklist/hero-meaningful.webp': { width: 1520, height: 760 },
  '/blog/software-handoff-checklist/handoff-board.webp': { width: 1520, height: 834 },
  '/blog/software-handoff-checklist/deployment-map.webp': { width: 1520, height: 834 },
  '/blog/software-handoff-checklist/runbook-loop.webp': { width: 1520, height: 834 },
  '/blog/production-rescue-playbook/hero-background.webp': { width: 1520, height: 760 },
  '/blog/production-rescue-playbook/hero-meaningful.webp': { width: 1520, height: 760 },
  '/blog/production-rescue-playbook/tangled-system.webp': { width: 1520, height: 834 },
  '/blog/production-rescue-playbook/triage-board.webp': { width: 1520, height: 834 },
  '/blog/production-rescue-playbook/recovery-loop.webp': { width: 1520, height: 834 },
  '/blog/ai-assisted-software-workflow/hero.webp': { width: 760, height: 380 },
  '/blog/ai-assisted-software-workflow/delivery-loop.webp': { width: 760, height: 417 },
  '/blog/ai-assisted-software-workflow/review-checklist.webp': { width: 760, height: 417 },
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function BlogVisual({ type }: { type: string }) {
  if (type === 'dashboard') {
    return <div className="dashboard-visual relative h-full min-h-64 rounded-none border-0" />
  }

  if (type === 'orbital') {
    return <div className="orbital-visual h-full min-h-64 rounded-none" />
  }

  if (type === 'terminal') {
    return (
      <div className="terminal-visual h-full min-h-64 rounded-none border-0">
        <pre>{`trace.started
  customer: real
  risk: high
  path: scoped
  deploy: green`}</pre>
      </div>
    )
  }

  return (
    <div className="relative h-full min-h-64 overflow-hidden bg-[#111]">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(150deg,transparent_0_18px,rgba(162,255,51,0.55)_19px_22px,transparent_23px_48px)] opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(0,127,255,0.25),transparent_12rem)]" />
    </div>
  )
}

function renderInline(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
}

function endsWithTerminalPunctuation(text: string) {
  return /[?!.]["')\]]*$/.test(text.trim())
}

function looksLikeQuestion(text: string) {
  return /^(what|why|how|when|where|who|which|can|could|would|will|should|do|does|did|is|are|am|was|were|has|have|had)\b/i.test(
    text.trim(),
  )
}

function ensureQuestionMark(text: string) {
  if (!looksLikeQuestion(text) || endsWithTerminalPunctuation(text)) {
    return text
  }

  return `${text}?`
}

function escapeAttr(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function renderParagraphs(lines: string[]) {
  const paragraphs: string[][] = []
  let current: string[] = []

  lines.forEach((line) => {
    if (!line.trim()) {
      if (current.length) {
        paragraphs.push(current)
        current = []
      }
      return
    }

    current.push(line.trim())
  })

  if (current.length) {
    paragraphs.push(current)
  }

  return paragraphs
    .map((paragraph, index) => {
      const className = index === 0 ? ' class="blog-faq-summary"' : ''
      return `<p${className}>${renderInline(paragraph.join(' '))}</p>`
    })
    .join('')
}

function getTableOfContents(raw: string) {
  const lines = raw
    .trim()
    .split('\n')
    .map((line) => line.trim())

  const faqIndex = lines.findIndex((line) => line.toLowerCase().startsWith('## frequently asked questions'))
  const contentLines = faqIndex >= 0 ? lines.slice(0, faqIndex) : lines

  return contentLines
    .filter((line) => line.startsWith('## '))
    .map((line) => {
      const text = line.slice(3).trim()
      return { id: slugifyHeading(text), text }
    })
}

function renderContent(raw: string, options: { skipHeroImage?: string } = {}) {
  const lines = raw.trim().split('\n')
  const html: string[] = []
  let i = 0
  let inFaq = false

  function closeFaq() {
    if (inFaq) {
      html.push('</section>')
      inFaq = false
    }
  }

  while (i < lines.length) {
    const line = lines[i].trim()

    if (!line) {
      i += 1
      continue
    }

    if (line === '---') {
      closeFaq()
      html.push('<hr />')
      i += 1
      continue
    }

    if (line.startsWith('[STATS:')) {
      closeFaq()
      const inner = line.replace('[STATS:', '').replace(']', '').trim()
      const stats = inner.split(';').map((item) => item.trim())
      html.push(
        `<div class="blog-stats">${stats
          .map((item) => {
            const [value, label] = item.split('|').map((part) => part.trim())
            return `<div><strong>${value}</strong><span>${label}</span></div>`
          })
          .join('')}</div>`,
      )
      i += 1
      continue
    }

    if (line.startsWith('[KICKER:')) {
      closeFaq()
      const inner = line.replace('[KICKER:', '').replace(']', '').trim()
      html.push(`<p class="blog-kicker">${renderInline(inner)}</p>`)
      i += 1
      continue
    }

    if (line.startsWith('[IMAGE:')) {
      closeFaq()
      const inner = line.replace('[IMAGE:', '').replace(']', '').trim()
      const [src, alt, caption] = inner.split('|').map((part) => part.trim())
      if (options.skipHeroImage && src === options.skipHeroImage) {
        i += 1
        continue
      }
      const dimensions = imageDimensions[src]
      html.push(
        `<figure class="blog-image"><img src="${escapeAttr(src)}" alt="${escapeAttr(
          alt || '',
        )}"${dimensions ? ` width="${dimensions.width}" height="${dimensions.height}"` : ''} loading="lazy" decoding="async" /><figcaption>${renderInline(caption || alt || '')}</figcaption></figure>`,
      )
      i += 1
      continue
    }

    if (line.startsWith('## ')) {
      const text = line.slice(3).trim()
      const id = slugifyHeading(text)

      if (text.toLowerCase().startsWith('frequently asked questions')) {
        closeFaq()
        html.push(
          `<section class="blog-faq" itemscope itemtype="https://schema.org/FAQPage" aria-labelledby="${escapeAttr(
            id,
          )}"><h2 id="${escapeAttr(id)}">${renderInline(text)}</h2>`,
        )
        inFaq = true
        i += 1
        continue
      }

      if (inFaq) {
        const answer: string[] = []
        const questionText = ensureQuestionMark(text)
        i += 1
        while (
          i < lines.length &&
          !lines[i].trim().startsWith('## ') &&
          !lines[i].trim().startsWith('[STATS:') &&
          !lines[i].trim().startsWith('[KICKER:') &&
          !lines[i].trim().startsWith('[IMAGE:') &&
          lines[i].trim() !== '---'
        ) {
          answer.push(lines[i].trim())
          i += 1
        }
        html.push(
          `<article class="blog-faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"><h3 id="${escapeAttr(
            id,
          )}" itemprop="name">${renderInline(
            questionText,
          )}</h3><div class="blog-faq-answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><div itemprop="text">${renderParagraphs(
            answer,
          )}</div></div></article>`,
        )
        continue
      }

      closeFaq()
      html.push(`<h2 id="${escapeAttr(id)}">${renderInline(text)}</h2>`)
      i += 1
      continue
    }

    if (line.startsWith('- ')) {
      closeFaq()
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(`<li>${renderInline(ensureQuestionMark(lines[i].trim().slice(2)))}</li>`)
        i += 1
      }
      html.push(`<ul>${items.join('')}</ul>`)
      continue
    }

    const paragraph: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('## ') &&
      !lines[i].trim().startsWith('- ') &&
      !lines[i].trim().startsWith('[STATS:') &&
      !lines[i].trim().startsWith('[KICKER:') &&
      lines[i].trim() !== '---'
    ) {
      paragraph.push(lines[i].trim())
      i += 1
    }
    html.push(`<p>${renderInline(paragraph.join(' '))}</p>`)
  }

  closeFaq()
  return html.join('')
}

function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const currentPost = getPost(currentSlug)
  const relatedPosts = getAllPosts()
    .filter((candidate) => candidate.slug !== currentSlug)
    .sort((a, b) => {
      const categoryScore = Number(b.category === currentPost?.category) - Number(a.category === currentPost?.category)

      if (categoryScore !== 0) {
        return categoryScore
      }

      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, 3)

  if (!relatedPosts.length) {
    return null
  }

  return (
    <section className="blog-related-posts" aria-labelledby="related-posts-heading">
      <div className="blog-related-posts-header">
        <p className="blog-toc-title">Keep Reading</p>
        <h2 id="related-posts-heading">Related Posts</h2>
      </div>
      <div className="blog-related-posts-grid">
        {relatedPosts.map((relatedPost) => (
          <a key={relatedPost.slug} className="blog-related-card" href={`/blog/${relatedPost.slug}`}>
            <h3>{relatedPost.title}</h3>
            <p>{relatedPost.excerpt}</p>
            <span className="blog-related-meta">
              {formatPostDate(relatedPost.date)} · {relatedPost.readTime} · {relatedPost.category}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

export function BlogIndex() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts
  const categoryCount = new Set(posts.map((post) => post.category)).size
  const featuredImageDimensions = featured?.image ? imageDimensions[featured.image] : undefined

  return (
    <div className="site-shell min-h-screen text-slate-100">
      <Header />
      <main>
        <section className="blog-index-hero relative overflow-hidden border-b border-white/10 pt-28 md:pt-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="blog-index-heading">
              <p className="eyebrow">Field Notes</p>
              <div>
                <h1>Practical notes on software delivery, AI workflows, and production systems.</h1>
                <p>
                  A focused library of articles for teams trying to ship useful systems, recover stuck projects,
                  and put AI into real workflows without losing engineering discipline.
                </p>
              </div>
            </div>

            {featured && (
              <a href={`/blog/${featured.slug}`} className="blog-featured-post group">
                <article>
                  <div className="blog-featured-copy">
                    <p className="blog-featured-label">Featured Post</p>
                    <h2>{featured.title}</h2>
                    <p>{featured.excerpt}</p>
                    <div className="blog-index-meta">
                      <span>
                        <Calendar className="h-4 w-4" /> {formatPostDate(featured.date)}
                      </span>
                      <span>
                        <Clock className="h-4 w-4" /> {featured.readTime}
                      </span>
                      <span className={`blog-category-pill ${categoryClasses[featured.category]}`}>{featured.category}</span>
                    </div>
                    <span className="blog-index-link">
                      Read Post <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>

                  <div className="blog-featured-media" aria-hidden="true">
                    {featured.image ? (
                      <img
                        src={featured.image}
                        alt=""
                        width={featuredImageDimensions?.width}
                        height={featuredImageDimensions?.height}
                        loading="eager"
                        decoding="async"
                      />
                    ) : (
                      <BlogVisual type="dashboard" />
                    )}
                  </div>
                </article>
              </a>
            )}

            <div className="blog-index-stats" aria-label="Blog overview">
              <div>
                <strong>{posts.length}</strong>
                <span>Articles</span>
              </div>
              <div>
                <strong>{categoryCount}</strong>
                <span>Topics</span>
              </div>
              <div>
                <strong>2026</strong>
                <span>Updated</span>
              </div>
            </div>
          </div>
        </section>

        <section className="blog-index-list py-14 md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-3 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-display text-2xl font-extrabold text-white">Latest Field Notes</p>
                <p className="mt-1 max-w-2xl text-sm text-slate-300">Specific, field-tested writing for builders and business owners.</p>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">{rest.length} more posts</p>
            </div>

            <div className="blog-post-grid">
              {rest.map((post, index) => {
                const visual = visuals[index % visuals.length]
                const postImageDimensions = post.image ? imageDimensions[post.image] : undefined
                return (
                  <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="blog-index-card group"
                  >
                    <article>
                      <div className="blog-index-card-media" aria-hidden="true">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt=""
                            width={postImageDimensions?.width}
                            height={postImageDimensions?.height}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <BlogVisual type={visual} />
                        )}
                      </div>
                      <div className="blog-index-card-copy">
                        <h2>{post.title}</h2>
                        <p>{post.excerpt}</p>
                        <div className="blog-index-card-footer">
                          <span>{formatPostDate(post.date)}</span>
                          <span>{post.readTime}</span>
                          <span className={`blog-category-pill ${categoryClasses[post.category]}`}>{post.category}</span>
                        </div>
                      </div>
                    </article>
                  </a>
                )
              })}
            </div>

            <div className="blog-newsletter-block mt-16 border border-teal-400/20 bg-[radial-gradient(circle_at_50%_0%,rgba(162,255,51,0.14),transparent_22rem),#1a2119] px-6 py-14 text-center md:py-16">
              <h2 className="font-display text-4xl font-extrabold text-white md:text-5xl">
                Follow the <span className="green-underline italic text-teal-400">Field Notes</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-200">
                Monthly notes on AI delivery, production systems, and practical engineering leadership.
              </p>
              <NewsletterSubscribe compact />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export function BlogPost({ slug }: { slug: string }) {
  const post = getPost(slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-navy-950 text-slate-100">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <a href="/blog" className="inline-flex items-center text-teal-300 mb-8"><ArrowLeft className="w-4 h-4 mr-2" />Back to blog</a>
          <h1 className="font-display text-5xl text-white mb-4">Post not found</h1>
          <p className="text-slate-400">That article does not exist yet.</p>
        </main>
        <Footer />
      </div>
    )
  }

  const toc = getTableOfContents(post.content)
  const heroDimensions = post.image ? imageDimensions[post.image] : undefined

  return (
    <div className="site-shell min-h-screen text-slate-100">
      <Header />
      <main>
        <article>
          <header className="blog-post-hero relative overflow-hidden border-b border-white/10">
            {post.image && (
              <img
                className="blog-hero-background-image"
                src={post.image}
                alt={post.imageAlt || post.title}
                width={heroDimensions?.width}
                height={heroDimensions?.height}
                loading="eager"
                decoding="async"
              />
            )}
            <div className="blog-post-hero-overlay absolute inset-0" />
            <div className="blog-post-hero-back relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <a href="/blog" className="inline-flex items-center text-slate-400 transition-colors hover:text-teal-300">
                <ArrowLeft className="mr-2 h-4 w-4" />Back to blog
              </a>
            </div>
            <div className="relative mx-auto flex min-h-[min(760px,92svh)] max-w-6xl items-end px-4 pb-14 pt-32 sm:px-6 md:pb-20 lg:px-8">
              <div className="blog-post-hero-copy">
                <div>
                  <span className={`blog-category-pill ${categoryClasses[post.category]}`}>
                    {post.category}
                  </span>
                </div>
                <h1 className="mt-5 mb-6 font-display text-4xl font-extrabold leading-[1.02] text-white md:text-6xl">{post.title}</h1>
                <p className="mb-6 max-w-3xl text-xl leading-relaxed text-slate-300">{post.excerpt}</p>
                <div className="flex flex-wrap gap-5 text-sm text-slate-400">
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-teal-300" />{formatPostDate(post.date)}</span>
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-teal-300" />{post.readTime}</span>
                </div>
              </div>
            </div>
          </header>

          {toc.length > 0 && (
            <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 xl:hidden">
              <nav className="blog-toc-mobile" aria-label="Table of contents">
                <p className="blog-toc-title">In this article</p>
                <div>
                  {toc.map((item) => (
                    <a key={item.id} href={`#${item.id}`}>
                      {item.text}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          )}

          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:py-16 lg:px-8 xl:grid-cols-[minmax(0,48rem)_16rem] xl:gap-16">
            <div className="min-w-0">
              <div className="prose-josh" dangerouslySetInnerHTML={{ __html: renderContent(post.content, { skipHeroImage: post.image }) }} />
              <RelatedPosts currentSlug={post.slug} />
            </div>

            {toc.length > 0 && (
              <aside className="blog-toc hidden xl:block">
                <div className="sticky top-28">
                  <p className="blog-toc-title">In this article</p>
                  <ol>
                    {toc.map((item, index) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`}>
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
