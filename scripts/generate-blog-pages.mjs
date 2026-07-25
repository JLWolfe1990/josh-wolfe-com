import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE_URL = 'https://www.josh-wolfe.com'

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function parseBlogFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---(?:\n|$)/)
  if (!match) throw new Error('Blog post is missing frontmatter')

  return Object.fromEntries(match[1].split('\n').map((line) => {
    const separator = line.indexOf(':')
    if (separator < 1) throw new Error(`Invalid frontmatter line: ${line}`)
    const key = line.slice(0, separator).trim()
    const rawValue = line.slice(separator + 1).trim()
    try {
      return [key, JSON.parse(rawValue)]
    } catch {
      return [key, rawValue]
    }
  }))
}

export function renderBlogRouteHtml(template, metadata) {
  const slug = String(metadata.slug || '')
  const title = String(metadata.title || '')
  const description = String(metadata.excerpt || '')
  const image = String(metadata.image || '')
  const date = String(metadata.date || '')
  if (!slug || !title || !description || !image || !date) {
    throw new Error(`Blog frontmatter is missing route metadata for ${slug || '(unknown slug)'}`)
  }

  const canonical = `${SITE_URL}/blog/${slug}`
  const absoluteImage = new URL(image, SITE_URL).href
  const managedHead = [
    `<title>${escapeHtml(title)} | Josh Wolfe</title>`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<link rel="preload" as="image" href="${escapeHtml(image)}" fetchpriority="high" />`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    '<meta property="og:type" content="article" />',
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(absoluteImage)}" />`,
    `<meta property="article:published_time" content="${escapeHtml(date)}T00:00:00.000Z" />`,
    '<meta property="article:author" content="Josh Wolfe" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(absoluteImage)}" />`,
    '<meta name="twitter:creator" content="@_joshwolfe" />',
  ].join('\n    ')

  const stripped = template
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="(?:description|keywords|twitter:[^"]+)"[^>]*>\s*/gi, '')
    .replace(/<meta\s+property="(?:og:[^"]+|article:[^"]+)"[^>]*>\s*/gi, '')

  return stripped.replace('</head>', `    ${managedHead}\n  </head>`)
}

export function generateBlogPages({ contentDir, distDir }) {
  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')
  const entries = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))

  for (const entry of entries) {
    const metadata = parseBlogFrontmatter(fs.readFileSync(path.join(contentDir, entry.name), 'utf8'))
    const html = renderBlogRouteHtml(template, metadata)
    const blogDir = path.join(distDir, 'blog')
    const outputDir = path.join(distDir, 'blog', String(metadata.slug))
    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(path.join(outputDir, 'index.html'), html)
    // Vite preview resolves extensionless URLs to sibling .html files. Keep this
    // form for the unpublished Lighthouse candidate URL used by BizBuzz.
    fs.writeFileSync(path.join(blogDir, `${metadata.slug}.html`), html)
  }

  return entries.length
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : ''
if (invokedPath === fileURLToPath(import.meta.url)) {
  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const count = generateBlogPages({
    contentDir: path.join(projectRoot, 'content', 'blog'),
    distDir: path.join(projectRoot, 'dist'),
  })
  console.log(`Generated ${count} static blog route pages`)
}
