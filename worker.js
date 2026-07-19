// Cloudflare Worker to serve josh-wolfe.com from Civo Object Store
const CIVO_BASE = 'https://objectstore.nyc1.civo.com/j-cubed/josh-wolfe-com';
const DEPLOY_VERSION = '20260719-blog-pagination';
const SITE_URL = 'https://www.josh-wolfe.com';
const BIZBUZZ_SUBSCRIBE_URL = 'https://bizbuzz.app/api/subscribe/cmlmdspty0004yd01xbkspf1d';
const SUBSCRIBE_WINDOW_MS = 60 * 60 * 1000;
const SUBSCRIBE_MAX_PER_WINDOW = 5;
const subscribeAttempts = new Map();

const DEFAULT_META = {
  title: 'Josh Wolfe | AI-Native Lead Engineer',
  description:
    'Josh Wolfe is an AI-native lead full-stack engineer and forward-deployed technical partner shipping enterprise systems, production rescues, AI agents, and customer-facing platforms.',
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  type: 'website',
  keywords:
    'AI-native engineer, Forward Deployed Engineer, Lead Engineer, AI Solutions Architect, React, Rails, Kubernetes, LangGraph, MCP, RAG, Houston',
};

const BLOG_INDEX_META = {
  title: 'Field Notes on AI Software Development | Josh Wolfe',
  description:
    'Conversational technical notes on AI-assisted software development, production systems, automation, and engineering delivery from Josh Wolfe.',
  url: `${SITE_URL}/blog`,
  image: `${SITE_URL}/blog/social-card.jpg`,
  type: 'website',
  keywords: 'AI software development, production systems, engineering leadership, AI workflow automation',
};

const BLOG_POST_META = {
  'prompt-injection-defenses-runtime-revolution': {
    title: 'Prompt Injection Defenses and the Runtime Revolution | Josh Wolfe',
    description:
      'A practical guide to prompt injection defenses for AI coding agents: defensive context, scoped tools, runtime authority boundaries, validation gates, logging, and rollback.',
    image: `${SITE_URL}/blog/prompt-injection-defenses-runtime-revolution/hero-meaningful.svg`,
    date: '2026-07-19',
  },
  'ai-generated-code-maintenance-cost': {
    title: 'AI-Generated Code Is Cheap to Write and Still Expensive to Own | Josh Wolfe',
    description:
      'A practical guide to the real maintenance cost of AI-generated code: ownership, review, tests, documentation, technical debt, and when to say no.',
    image: `${SITE_URL}/blog/ai-generated-code-maintenance-cost/hero-meaningful.svg`,
    date: '2026-07-18',
  },
  'model-routing-unlocked-how-to-pick-the-right-ai-for-every-coding-task': {
    title: 'Model Routing Unlocked: How to Pick the Right AI for Every Coding Task | Josh Wolfe',
    description:
      'Discover how model routing intelligently directs requests to different LLMs based on complexity, cost, and speed, optimizing your AI-powered coding tools.',
    image: `${SITE_URL}/blog/social-card.jpg`,
    date: '2026-07-17',
  },
  'ai-agent-file-deletion-guardrails': {
    title: 'When AI Coding Agents Delete Files, the Problem Is the Safety Model | Josh Wolfe',
    description:
      'A practical guide to AI coding agent safety, file deletion risks, destructive action guardrails, scoped permissions, review gates, and recoverable workflows.',
    image: `${SITE_URL}/blog/ai-agent-file-deletion-guardrails/hero-meaningful.svg`,
    date: '2026-07-15',
  },
  'open-models-ai-coding-agents': {
    title: 'Open Models Are Your Hedge Against AI Coding Vendor Lock-In | Josh Wolfe',
    description:
      'A practical AI coding strategy for avoiding model and vendor lock-in with portable agent contracts, open model fallbacks, evaluations, and production review gates.',
    image: `${SITE_URL}/blog/open-models-ai-coding-agents/hero-meaningful.svg`,
    date: '2026-07-14',
  },
  'ai-assisted-data-workflows': {
    title: 'From Prompt to Production Data Workflow | Josh Wolfe',
    description:
      'A practical guide to AI-assisted data workflows: capture messy sources, transform with examples, validate output, and store portable production data.',
    image: `${SITE_URL}/blog/ai-assisted-data-workflows/hero-meaningful.svg`,
    date: '2026-07-13',
  },
  'ai-coding-stack-fragmentation': {
    title: 'The AI Coding Stack Is Fragmenting, and That Is Good | Josh Wolfe',
    description:
      'A practical guide to choosing between vibe coding tools, agentic coding workflows, review gates, and production controls in a layered AI coding stack.',
    image: `${SITE_URL}/blog/ai-coding-stack-fragmentation/hero-meaningful.svg`,
    date: '2026-07-10',
  },
  'agentic-workflows-ai-development-loop': {
    title: 'Agentic Workflows: How AI Is Automating the Development Loop | Josh Wolfe',
    description:
      'A practical look at how agentic workflows extend vibe coding into planning, tool use, checks, pull requests, review handoffs, and deployable software loops.',
    image: `${SITE_URL}/blog/agentic-workflows-ai-development-loop/hero-meaningful.svg`,
    date: '2026-07-09',
  },
  'business-system-not-just-website': {
    title: 'Your Business Probably Needs a System, Not Just a Website | Josh Wolfe',
    description:
      'A practical guide to turning a business website into a connected system for leads, follow-up, scheduling, fulfillment, and reporting.',
    image: `${SITE_URL}/blog/business-system-not-just-website/social.jpg`,
    date: '2026-07-07',
  },
  'ai-assisted-software-development-workflow': {
    title: 'How I Use AI to Ship Software Without Letting It Get Sloppy | Josh Wolfe',
    description:
      'A practical AI-assisted software development workflow for planning, implementation, review, testing, deployment, and production judgment.',
    image: `${SITE_URL}/blog/ai-assisted-software-workflow/social.jpg`,
    date: '2026-07-06',
  },
  'production-rescue-playbook': {
    title: 'What I Do When a Software Project Is Stuck | Josh Wolfe',
    description:
      'A practical software rescue playbook for stabilizing stuck projects, finding constraints, triaging risk, and shipping the next useful release.',
    image: `${SITE_URL}/blog/production-rescue-playbook/social.jpg`,
    date: '2026-07-07',
  },
  'ai-real-business-workflow': {
    title: 'Where AI Actually Helps in a Real Business Workflow | Josh Wolfe',
    description:
      'A grounded guide to finding useful AI workflow opportunities inside real business operations, approvals, handoffs, and repeatable decisions.',
    image: `${SITE_URL}/blog/ai-real-business-workflow/social.jpg`,
    date: '2026-07-07',
  },
  'production-readiness-checklist': {
    title: 'The Production Checklist I Want Before Anything Goes Live | Josh Wolfe',
    description:
      'A practical production readiness checklist for software launches: scope, rollback, monitoring, data safety, security, ownership, and first-watch support.',
    image: `${SITE_URL}/blog/production-readiness-checklist/social.jpg`,
    date: '2026-07-07',
  },
  'manual-workflow-internal-tool': {
    title: 'How to Turn a Manual Workflow Into an Internal Tool | Josh Wolfe',
    description:
      'A practical guide to turning repeated manual work, spreadsheets, handoffs, and status tracking into a focused internal software tool.',
    image: `${SITE_URL}/blog/manual-workflow-internal-tool/social.jpg`,
    date: '2026-07-07',
  },
  'custom-software-project-scope': {
    title: 'How I Scope a Custom Software Project Before Writing Code | Josh Wolfe',
    description:
      'A practical guide to scoping custom software projects around outcomes, workflows, risks, first-release slices, and buildable constraints.',
    image: `${SITE_URL}/blog/custom-software-project-scope/social.jpg`,
    date: '2026-07-07',
  },
  'software-handoff-checklist': {
    title: 'What a Good Software Handoff Looks Like | Josh Wolfe',
    description:
      'A practical software handoff checklist for transferring context, code, deployment knowledge, runbooks, risks, and ownership.',
    image: `${SITE_URL}/blog/software-handoff-checklist/social.jpg`,
    date: '2026-07-07',
  },
};

const PERMANENT_REDIRECTS = {
  '/blog/model-routing-ai-coding-tasks': '/blog/model-routing-unlocked-how-to-pick-the-right-ai-for-every-coding-task',
  '/blog/model-routing-for-ai-coding-tasks': '/blog/model-routing-unlocked-how-to-pick-the-right-ai-for-every-coding-task',
};

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
};

function getContentType(path) {
  const ext = path.substring(path.lastIndexOf('.'));
  return CONTENT_TYPES[ext] || 'application/octet-stream';
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function routeMeta(pathname) {
  const normalizedPath = pathname.replace(/\/$/, '') || '/';

  if (normalizedPath === '/blog') {
    return BLOG_INDEX_META;
  }

  if (normalizedPath.startsWith('/blog/')) {
    const slug = normalizedPath.replace('/blog/', '');
    const post = BLOG_POST_META[slug];

    if (post) {
      return {
        ...post,
        url: `${SITE_URL}/blog/${slug}`,
        type: 'article',
      };
    }
  }

  return DEFAULT_META;
}

function managedHead(meta) {
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<link rel="canonical" href="${escapeHtml(meta.url)}" />`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    meta.keywords ? `<meta name="keywords" content="${escapeHtml(meta.keywords)}" />` : '',
    `<meta property="og:title" content="${escapeHtml(meta.title.replace(' | Josh Wolfe', ''))}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:type" content="${escapeHtml(meta.type)}" />`,
    `<meta property="og:url" content="${escapeHtml(meta.url)}" />`,
    `<meta property="og:image" content="${escapeHtml(meta.image)}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(meta.title.replace(' | Josh Wolfe', ''))}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(meta.image)}" />`,
    '<meta name="twitter:creator" content="@_joshwolfe" />',
  ];

  if (meta.type === 'article') {
    tags.push(
      `<meta property="article:published_time" content="${escapeHtml(meta.date)}T00:00:00.000Z" />`,
      '<meta property="article:author" content="Josh Wolfe" />',
    );
  }

  return tags.filter(Boolean).join('\n    ');
}

function injectRouteMeta(html, pathname) {
  const meta = routeMeta(pathname);
  const stripped = html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="(?:description|keywords|twitter:[^"]+)"[^>]*>\s*/gi, '')
    .replace(/<meta\s+property="(?:og:[^"]+|article:[^"]+)"[^>]*>\s*/gi, '');

  return stripped.replace('</head>', `    ${managedHead(meta)}\n  </head>`);
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

function getClientKey(request) {
  return request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for') || 'unknown';
}

function isRateLimited(request) {
  const key = getClientKey(request);
  const now = Date.now();
  const current = subscribeAttempts.get(key);

  if (!current || now - current.startedAt > SUBSCRIBE_WINDOW_MS) {
    subscribeAttempts.set(key, { count: 1, startedAt: now });
    return false;
  }

  current.count += 1;
  return current.count > SUBSCRIBE_MAX_PER_WINDOW;
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

async function handleSubscribe(request) {
  if (request.method === 'OPTIONS') {
    return jsonResponse({});
  }

  if (request.method !== 'POST') {
    return jsonResponse({ message: 'Method not allowed' }, 405);
  }

  if (isRateLimited(request)) {
    return jsonResponse({ message: 'Too many subscribe attempts. Try again later.' }, 429);
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return jsonResponse({ message: 'Invalid request body' }, 400);
  }

  if (payload.website) {
    return jsonResponse({ ok: true });
  }

  const email = String(payload.email || '').trim().toLowerCase();
  if (!isValidEmail(email)) {
    return jsonResponse({ message: 'Enter a valid email address.' }, 400);
  }

  const firstName = String(payload.firstName || '').trim().slice(0, 100);
  const lastName = String(payload.lastName || '').trim().slice(0, 100);

  const subscribeResponse = await fetch(BIZBUZZ_SUBSCRIBE_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      firstName,
      lastName,
      website: '',
    }),
  });

  const data = await subscribeResponse.json().catch(() => ({}));

  if (subscribeResponse.ok && data.success !== false) {
    return jsonResponse({
      ok: true,
      success: true,
      message: data.message || "You're subscribed.",
    });
  }

  return jsonResponse(
    {
      success: false,
      error: data.error || data.message || 'Could not subscribe right now',
    },
    subscribeResponse.status >= 400 ? subscribeResponse.status : 502,
  );
}

async function handleRequest(request) {
  const url = new URL(request.url);
  const requestPath = url.pathname;
  let path = url.pathname;

  const redirectPath = PERMANENT_REDIRECTS[path.replace(/\/$/, '') || '/'];
  if (redirectPath) {
    return Response.redirect(`${SITE_URL}${redirectPath}`, 308);
  }

  if (path === '/api/subscribe') {
    return handleSubscribe(request);
  }

  // Handle root path
  if (path === '/' || path === '') {
    path = '/index.html';
  }

  // For SPA: if no file extension, serve index.html
  const hasExtension = path.includes('.') && path.lastIndexOf('.') > path.lastIndexOf('/');
  if (!hasExtension) {
    path = '/index.html';
  }

  const civoUrl = `${CIVO_BASE}${path}?v=${DEPLOY_VERSION}`;

  try {
    const response = await fetch(civoUrl, {
      cf: {
        cacheTtl: path.includes('/assets/') ? 31536000 : 300,
        cacheEverything: true,
      },
    });

    if (!response.ok) {
      // If asset not found, serve index.html for SPA routing
      if (response.status === 404 && path !== '/index.html') {
        const indexResponse = await fetch(`${CIVO_BASE}/index.html?v=${DEPLOY_VERSION}`);
        const html = injectRouteMeta(await indexResponse.text(), requestPath);
        return new Response(html, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=300',
            'Access-Control-Allow-Origin': '*',
            'X-Josh-Deploy-Version': DEPLOY_VERSION,
          },
        });
      }
      return new Response('Not Found', { status: 404 });
    }

    const contentType = getContentType(path);
    const cacheControl = path.includes('/assets/') 
      ? 'public, max-age=31536000, immutable' 
      : 'public, max-age=300';

    if (contentType.startsWith('text/html')) {
      const html = injectRouteMeta(await response.text(), requestPath);
      return new Response(html, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': cacheControl,
          'Access-Control-Allow-Origin': '*',
          'X-Content-Type-Options': 'nosniff',
          'X-Josh-Deploy-Version': DEPLOY_VERSION,
        },
      });
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff',
        'X-Josh-Deploy-Version': DEPLOY_VERSION,
      },
    });
  } catch (error) {
    return new Response('Error fetching content', { status: 500 });
  }
}
