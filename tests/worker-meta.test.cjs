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

test('injects article metadata for the AI-assisted data workflow route', () => {
  const worker = loadWorker(async () => new Response(baseHtml))
  const html = worker.injectRouteMeta(baseHtml, '/blog/ai-assisted-data-workflows')

  assert.match(html, /<title>From Prompt to Production Data Workflow \| Josh Wolfe<\/title>/)
  assert.match(html, /rel="canonical" href="https:\/\/www\.josh-wolfe\.com\/blog\/ai-assisted-data-workflows"/)
  assert.match(html, /property="og:type" content="article"/)
  assert.match(html, /property="article:published_time" content="2026-07-13T00:00:00\.000Z"/)
  assert.doesNotMatch(html, /content="default description"/)
})

test('serves route-specific HTML with an observable deploy-version header', async () => {
  const worker = loadWorker(async () =>
    new Response(baseHtml, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } }),
  )

  const response = await worker.handleRequest(
    new Request('https://www.josh-wolfe.com/blog/ai-assisted-data-workflows'),
  )
  const html = await response.text()

  assert.equal(response.status, 200)
  assert.equal(response.headers.get('x-worker-deploy-version'), worker.DEPLOY_VERSION)
  assert.match(html, /<title>From Prompt to Production Data Workflow \| Josh Wolfe<\/title>/)
})

test('wrangler config pins both production routes to this Worker', () => {
  const config = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '..', 'wrangler.jsonc'), 'utf8'),
  )

  assert.equal(config.name, 'josh-wolfe-com')
  assert.equal(config.main, 'worker.js')
  assert.equal(config.workers_dev, false)
  assert.deepEqual(
    config.routes.map((route) => route.pattern),
    ['josh-wolfe.com/*', 'www.josh-wolfe.com/*'],
  )
})
