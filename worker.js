// Cloudflare Worker to serve josh-wolfe.com from Civo Object Store
const CIVO_BASE = 'https://objectstore.nyc1.civo.com/j-cubed/josh-wolfe-com';
const DEPLOY_VERSION = '20260707-ca6ba2c';
const BREVO_CONTACTS_URL = 'https://api.brevo.com/v3/contacts';
const SUBSCRIBE_WINDOW_MS = 60 * 60 * 1000;
const SUBSCRIBE_MAX_PER_WINDOW = 5;
const subscribeAttempts = new Map();

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
};

function getContentType(path) {
  const ext = path.substring(path.lastIndexOf('.'));
  return CONTENT_TYPES[ext] || 'application/octet-stream';
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

  const apiKey = globalThis.BREVO_API_KEY;
  const listId = Number(globalThis.BREVO_LIST_ID || 2);

  if (!apiKey) {
    return jsonResponse({ message: 'Newsletter signup is not configured yet.' }, 503);
  }

  const brevoResponse = await fetch(BREVO_CONTACTS_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  if (brevoResponse.ok || brevoResponse.status === 201 || brevoResponse.status === 204) {
    return jsonResponse({ ok: true });
  }

  const data = await brevoResponse.json().catch(() => ({}));
  if (data.code === 'duplicate_parameter') {
    return jsonResponse({ ok: true });
  }

  return jsonResponse({ message: data.message || 'Could not subscribe right now' }, 502);
}

async function handleRequest(request) {
  const url = new URL(request.url);
  let path = url.pathname;

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
        const indexResponse = await fetch(CIVO_BASE + '/index.html');
        return new Response(indexResponse.body, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=300',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
      return new Response('Not Found', { status: 404 });
    }

    const contentType = getContentType(path);
    const cacheControl = path.includes('/assets/') 
      ? 'public, max-age=31536000, immutable' 
      : 'public, max-age=300';

    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    return new Response('Error fetching content', { status: 500 });
  }
}
