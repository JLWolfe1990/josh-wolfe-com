import { describe, expect, it } from 'vitest'
import { parsePublishedBlogPost } from '../src/lib/published-blog'

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
})
