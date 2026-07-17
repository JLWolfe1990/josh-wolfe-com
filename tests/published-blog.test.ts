import { describe, expect, it } from 'vitest'
import { parsePublishedBlogPost } from '../src/lib/published-blog'
import { getAllPosts } from '../src/lib/blog'

describe('parsePublishedBlogPost', () => {
  it('loads the versioned BizBuzz Markdown contract', () => {
    const post = parsePublishedBlogPost(`---
slug: "hello-world"
title: "Hello World"
date: "2026-07-16"
excerpt: "A deterministic post."
category: "AI Engineering"
readTime: "4 min read"
keywords: ["hello", "world"]
faq: [{"question":"Why?","answer":"Because."}]
sourceHash: "abc123"
---
## A heading

Body.`)

    expect(post).toMatchObject({ slug: 'hello-world', sourceHash: 'abc123' })
    expect(post.content).toContain('## A heading')
  })

  it('rejects missing publication metadata', () => {
    expect(() => parsePublishedBlogPost('---\nslug: "bad"\n---\nBody')).toThrow('missing title')
  })

  it('removes a duplicate title heading and normalizes nested headings for the site renderer', () => {
    const post = parsePublishedBlogPost(`---
slug: "heading-cleanup"
title: "Heading Cleanup for Published Posts"
date: "2026-07-17"
excerpt: "A sufficiently long excerpt for the published post parser contract."
category: "Engineering"
readTime: "3 min read"
sourceHash: "hash123"
image: "/blog/heading-cleanup/hero.webp"
imageAlt: "A meaningful hero image for the heading cleanup article"
imageWidth: 1520
imageHeight: 760
imageSchemaVersion: "blog-images/v1"
---
# Heading Cleanup for Published Posts

Intro.

### A nested heading

Body.`)

    expect(post.content).not.toContain('# Heading Cleanup for Published Posts')
    expect(post.content).toContain('## A nested heading')
    expect(post.content).not.toContain('###')
    expect(post).toMatchObject({
      image: '/blog/heading-cleanup/hero.webp',
      imageWidth: 1520,
      imageHeight: 760,
      imageSchemaVersion: 'blog-images/v1',
    })
  })

  it('keeps the retired static model-routing duplicate out of the blog index', () => {
    const slugs = getAllPosts().map((post) => post.slug)

    expect(slugs).toContain('model-routing-unlocked-how-to-pick-the-right-ai-for-every-coding-task')
    expect(slugs).not.toContain('model-routing-ai-coding-tasks')
    expect(slugs).not.toContain('model-routing-for-ai-coding-tasks')
  })
})
