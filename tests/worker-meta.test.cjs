const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')
const vm = require('node:vm')

const workerPath = path.resolve(__dirname, '..', 'worker.js')
const source = fs.readFileSync(workerPath, 'utf8')

function loadWorker(fetchImpl) {
  const context = {
    addEventListener() {},
    console,
    Date,
    fetch: fetchImpl,
    Map,
    Request,
    Response,
    URL,
  }

  vm.runInNewContext(
    `${source}\n;globalThis.__workerTest = { DEPLOY_VERSION, injectRouteMeta, routeMeta, handleRequest };`,
    context,
    { filename: workerPath },
  )

  return context.__workerTest
}

const baseHtml = `<!doctype html><html><head>
  <title>Josh Wolfe | AI-Native Lead Engineer</title>
  <link rel="canonical" href="https://www.josh-wolfe.com" />
  <meta name="description" content="default description" />
  <meta property="og:title" content="Josh Wolfe | AI-Native Lead Engineer" />
</head><body><div id="root"></div></body></html>`

test('injects article metadata for the model routing route', () => {
  const worker = loadWorker(async () => new Response(baseHtml))
  const html = worker.injectRouteMeta(baseHtml, '/blog/model-routing-unlocked-how-to-pick-the-right-ai-for-every-coding-task')

  assert.match(html, /<title>Model Routing Unlocked: How to Pick the Right AI for Every Coding Task \| Josh Wolfe<\/title>/)
  assert.match(html, /rel="canonical" href="https:\/\/www\.josh-wolfe\.com\/blog\/model-routing-unlocked-how-to-pick-the-right-ai-for-every-coding-task"/)
  assert.match(html, /property="og:type" content="article"/)
  assert.match(html, /property="article:published_time" content="2026-07-17T00:00:00\.000Z"/)
  assert.match(html, /property="og:image" content="https:\/\/www\.josh-wolfe\.com\/blog\/social-card\.jpg"/)
  assert.doesNotMatch(html, /content="default description"/)
})

test('injects article metadata for the open-model AI coding route', () => {
  const worker = loadWorker(async () => new Response(baseHtml))
  const html = worker.injectRouteMeta(baseHtml, '/blog/open-models-ai-coding-agents')

  assert.match(html, /<title>Open Models Are Your Hedge Against AI Coding Vendor Lock-In \| Josh Wolfe<\/title>/)
  assert.match(html, /rel="canonical" href="https:\/\/www\.josh-wolfe\.com\/blog\/open-models-ai-coding-agents"/)
  assert.match(html, /property="og:type" content="article"/)
  assert.match(html, /property="article:published_time" content="2026-07-14T00:00:00\.000Z"/)
  assert.doesNotMatch(html, /content="default description"/)
})

test('injects article metadata for the AI agent safety route', () => {
  const worker = loadWorker(async () => new Response(baseHtml))
  const html = worker.injectRouteMeta(baseHtml, '/blog/ai-agent-file-deletion-guardrails')

  assert.match(html, /<title>When AI Coding Agents Delete Files, the Problem Is the Safety Model \| Josh Wolfe<\/title>/)
  assert.match(html, /rel="canonical" href="https:\/\/www\.josh-wolfe\.com\/blog\/ai-agent-file-deletion-guardrails"/)
  assert.match(html, /property="og:type" content="article"/)
  assert.match(html, /property="article:published_time" content="2026-07-15T00:00:00\.000Z"/)
  assert.doesNotMatch(html, /content="default description"/)
})

test('serves route-specific HTML with an observable deploy-version header', async () => {
  const worker = loadWorker(async () =>
    new Response(baseHtml, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } }),
  )

  const response = await worker.handleRequest(
    new Request('https://www.josh-wolfe.com/blog/model-routing-unlocked-how-to-pick-the-right-ai-for-every-coding-task'),
  )
  const html = await response.text()

  assert.equal(response.status, 200)
  assert.equal(response.headers.get('x-josh-deploy-version'), worker.DEPLOY_VERSION)
  assert.match(html, /<title>Model Routing Unlocked: How to Pick the Right AI for Every Coding Task \| Josh Wolfe<\/title>/)
})

test('permanently redirects the retired model-routing duplicate to the BizBuzz publication', async () => {
  const worker = loadWorker(async () => new Response(baseHtml))
  const response = await worker.handleRequest(
    new Request('https://www.josh-wolfe.com/blog/model-routing-ai-coding-tasks'),
  )

  assert.equal(response.status, 308)
  assert.equal(
    response.headers.get('location'),
    'https://www.josh-wolfe.com/blog/model-routing-unlocked-how-to-pick-the-right-ai-for-every-coding-task',
  )
})

test('permanently redirects a transient BizBuzz retry slug to the canonical publication', async () => {
  const worker = loadWorker(async () => new Response(baseHtml))
  const response = await worker.handleRequest(
    new Request('https://www.josh-wolfe.com/blog/model-routing-for-ai-coding-tasks'),
  )

  assert.equal(response.status, 308)
  assert.equal(
    response.headers.get('location'),
    'https://www.josh-wolfe.com/blog/model-routing-unlocked-how-to-pick-the-right-ai-for-every-coding-task',
  )
})

test('wrangler config pins both production routes to this Worker', () => {
  const config = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '..', 'wrangler.jsonc'), 'utf8'),
  )

  assert.equal(config.name, 'josh-wolfe-com')
  assert.equal(config.main, 'worker.js')
  assert.equal(config.account_id, '55c84df414e8212cfcf7b7deef3e27ea')
  assert.equal(config.workers_dev, false)
  assert.deepEqual(
    config.routes.map((route) => route.pattern),
    ['josh-wolfe.com/*', 'www.josh-wolfe.com/*'],
  )
})
