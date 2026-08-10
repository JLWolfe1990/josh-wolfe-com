function escapeAttr(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function renderInline(text: string) {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, href: string) => {
      const external = /^https?:\/\//i.test(href)
      return `<a href="${escapeAttr(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`
    })
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
}
