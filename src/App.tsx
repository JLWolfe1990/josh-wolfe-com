import { Suspense, lazy } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { BlogIndex, BlogPost } from './components/Blog'
import { getPost } from './lib/blog'
import './App.css'

const Hero = lazy(() => import('./components/Hero').then((module) => ({ default: module.Hero })))
const Services = lazy(() => import('./components/Services').then((module) => ({ default: module.Services })))
const About = lazy(() => import('./components/About').then((module) => ({ default: module.About })))
const Projects = lazy(() => import('./components/Projects').then((module) => ({ default: module.Projects })))
const Connect = lazy(() => import('./components/Connect').then((module) => ({ default: module.Connect })))

const siteUrl = 'https://www.josh-wolfe.com'

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.content = content
}

function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = url
}

function setJsonLd(id: string, data: unknown) {
  let script = document.getElementById(id) as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

function removeJsonLd(id: string) {
  document.getElementById(id)?.remove()
}

function setDefaultMeta() {
  const title = 'Josh Wolfe | AI-Native Lead Engineer'
  const description =
    'Josh Wolfe is an AI-native lead full-stack engineer and forward-deployed technical partner shipping enterprise systems, production rescues, AI agents, and customer-facing platforms.'
  document.title = title
  upsertMeta('name', 'description', description)
  upsertMeta(
    'name',
    'keywords',
    'AI-native engineer, Forward Deployed Engineer, Lead Engineer, AI Solutions Architect, React, Rails, Kubernetes, LangGraph, MCP, RAG, Houston',
  )
  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:url', siteUrl)
  upsertMeta('property', 'og:image', `${siteUrl}/og-image.jpg`)
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', `${siteUrl}/og-image.jpg`)
  setCanonical(siteUrl)
  removeJsonLd('blog-post-schema')
  removeJsonLd('blog-faq-schema')
  removeJsonLd('blog-breadcrumb-schema')
}

function setBlogIndexMeta() {
  const title = 'Field Notes on AI Software Development | Josh Wolfe'
  const description =
    'Conversational technical notes on AI-assisted software development, production systems, automation, and engineering delivery from Josh Wolfe.'
  document.title = title
  upsertMeta('name', 'description', description)
  upsertMeta('name', 'keywords', 'AI software development, production systems, engineering leadership, AI workflow automation')
  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:url', `${siteUrl}/blog`)
  upsertMeta('property', 'og:image', `${siteUrl}/blog/social-card.jpg`)
  upsertMeta('property', 'og:image:width', '1200')
  upsertMeta('property', 'og:image:height', '630')
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', `${siteUrl}/blog/social-card.jpg`)
  setCanonical(`${siteUrl}/blog`)
  removeJsonLd('blog-post-schema')
  removeJsonLd('blog-faq-schema')
  removeJsonLd('blog-breadcrumb-schema')
}

function setBlogPostMeta(slug: string) {
  const post = getPost(slug)
  if (!post) {
    document.title = 'Post Not Found | Josh Wolfe'
    return
  }

  const url = `${siteUrl}/blog/${post.slug}`
  const image = post.sourceHash && post.image
    ? new URL(post.image, siteUrl).toString()
    : `${siteUrl}/blog/${post.slug === 'ai-assisted-software-development-workflow' ? 'ai-assisted-software-workflow' : post.slug}/social.jpg`
  const title = `${post.title} | Josh Wolfe`

  document.title = title
  upsertMeta('name', 'description', post.excerpt)
  upsertMeta('name', 'keywords', post.keywords?.join(', ') ?? post.category)
  upsertMeta('property', 'og:title', post.title)
  upsertMeta('property', 'og:description', post.excerpt)
  upsertMeta('property', 'og:type', 'article')
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:image', image)
  upsertMeta('property', 'og:image:width', '1200')
  upsertMeta('property', 'og:image:height', '630')
  upsertMeta('property', 'article:published_time', `${post.date}T00:00:00.000Z`)
  upsertMeta('property', 'article:author', 'Josh Wolfe')
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', post.title)
  upsertMeta('name', 'twitter:description', post.excerpt)
  upsertMeta('name', 'twitter:image', image)
  setCanonical(url)

  setJsonLd('blog-post-schema', {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Josh Wolfe',
      url: siteUrl,
      jobTitle: 'AI-native lead full-stack engineer',
    },
    publisher: {
      '@type': 'Person',
      name: 'Josh Wolfe',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.keywords,
    articleSection: post.category,
    timeRequired: `PT${Number.parseInt(post.readTime, 10) || 5}M`,
  })

  setJsonLd('blog-breadcrumb-schema', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Josh Wolfe',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  })

  if (post.faq?.length) {
    setJsonLd('blog-faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  } else {
    removeJsonLd('blog-faq-schema')
  }
}

function App() {
  const path = window.location.pathname

  if (path === '/blog') {
    setBlogIndexMeta()
    return <BlogIndex />
  }

  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '').replace(/\/$/, '')
    setBlogPostMeta(slug)
    return <BlogPost slug={slug} />
  }

  setDefaultMeta()

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Suspense fallback={null}>
          <Hero />
          <Services />
          <About />
          <Projects />
          <Connect />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
