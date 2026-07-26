import assert from 'node:assert/strict'
import test from 'node:test'
import { parseBlogFrontmatter, renderBlogRouteHtml } from '../scripts/generate-blog-pages.mjs'

const template = '<!doctype html><html><head><title>Default</title><meta name="description" content="default"></head><body><div id="root"></div></body></html>'

test('renders the hero preload and article metadata into initial route HTML', () => {
  const html = renderBlogRouteHtml(template, {
    slug: 'fast-post',
    title: 'A Fast Blog Post',
    excerpt: 'The route should expose its LCP image before React starts.',
    image: '/blog/fast-post/hero.webp',
    date: '2026-07-25',
  })

  assert.match(html, /<link rel="preload" as="image" href="\/blog\/fast-post\/hero\.webp" fetchpriority="high" \/>/)
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.josh-wolfe\.com\/blog\/fast-post" \/>/)
  assert.match(html, /<meta property="og:image" content="https:\/\/www\.josh-wolfe\.com\/blog\/fast-post\/hero\.webp" \/>/)
  assert.match(html, /<div id="root"><div class="site-shell/)
  assert.match(html, /<h1[^>]*>A Fast Blog Post<\/h1>/)
  assert.doesNotMatch(html, /content="default"/)
})

test('preloads and renders responsive v2 hero variants', () => {
  const html = renderBlogRouteHtml(template, {
    slug: 'responsive-post',
    title: 'A Responsive Blog Post',
    excerpt: 'The narrow viewport should not download the full source image.',
    image: '/blog/responsive-post/hero.webp',
    imageAlt: 'Responsive technical illustration',
    imageWidth: 1520,
    imageHeight: 760,
    imageSchemaVersion: 'blog-images/v2',
    date: '2026-07-25',
  })

  assert.match(html, /href="\/blog\/responsive-post\/hero-480\.webp"/)
  assert.match(html, /imagesrcset="[^"]*hero-480\.webp 480w, [^"]*hero-960\.webp 960w, [^"]*hero\.webp 1520w"/)
  assert.match(html, /srcset="[^"]*hero-480\.webp 480w, [^"]*hero-960\.webp 960w, [^"]*hero\.webp 1520w"/)
  assert.match(html, /sizes="100vw"/)
})

test('parses JSON and plain frontmatter values used by published posts', () => {
  const metadata = parseBlogFrontmatter(`---
slug: "fast-post"
title: "A Fast Blog Post"
date: 2026-07-25
imageWidth: 1520
---
Body`)

  assert.deepEqual(metadata, {
    slug: 'fast-post',
    title: 'A Fast Blog Post',
    date: '2026-07-25',
    imageWidth: 1520,
  })
})
