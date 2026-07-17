import type { BlogPost } from './blog'

type FrontmatterValue = string | string[] | { question: string; answer: string }[]

function parseValue(raw: string): FrontmatterValue {
  const value = raw.trim()
  if (value.startsWith('[')) {
    return JSON.parse(value) as string[] | { question: string; answer: string }[]
  }
  return JSON.parse(value) as string
}

function normalizePublishedContent(raw: string, title: string): string {
  return raw
    .split('\n')
    .flatMap((line) => {
      const heading = line.match(/^(#{1,6})\s+(.+)$/)
      if (!heading) return [line]

      const text = heading[2].trim()
      if (heading[1] === '#' && text === title.trim()) return []
      return [`## ${text}`]
    })
    .join('\n')
    .trim()
}

export function parsePublishedBlogPost(raw: string): BlogPost {
  const normalized = raw.replace(/\r\n/g, '\n')
  if (!normalized.startsWith('---\n')) throw new Error('Published blog post is missing frontmatter')

  const end = normalized.indexOf('\n---\n', 4)
  if (end < 0) throw new Error('Published blog post frontmatter is not closed')

  const metadata = Object.fromEntries(
    normalized
      .slice(4, end)
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const separator = line.indexOf(':')
        if (separator < 1) throw new Error(`Invalid frontmatter line: ${line}`)
        return [line.slice(0, separator).trim(), parseValue(line.slice(separator + 1))]
      }),
  ) as Record<string, FrontmatterValue>

  const required = ['slug', 'title', 'date', 'excerpt', 'category', 'readTime', 'sourceHash']
  for (const key of required) {
    if (typeof metadata[key] !== 'string' || !metadata[key]) {
      throw new Error(`Published blog post is missing ${key}`)
    }
  }

  return {
    slug: metadata.slug as string,
    title: metadata.title as string,
    date: metadata.date as string,
    excerpt: metadata.excerpt as string,
    category: metadata.category as string,
    readTime: metadata.readTime as string,
    keywords: metadata.keywords as string[] | undefined,
    image: metadata.image as string | undefined,
    imageAlt: metadata.imageAlt as string | undefined,
    faq: metadata.faq as { question: string; answer: string }[] | undefined,
    sourceHash: metadata.sourceHash as string,
    content: normalizePublishedContent(normalized.slice(end + 5), metadata.title as string),
  }
}

const modules = import.meta.glob('../../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export const publishedPosts = Object.entries(modules).map(([path, raw]) => {
  try {
    return parsePublishedBlogPost(raw)
  } catch (error) {
    throw new Error(`Invalid published blog post ${path}: ${error instanceof Error ? error.message : String(error)}`)
  }
})
