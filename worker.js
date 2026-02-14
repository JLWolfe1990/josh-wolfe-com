// Cloudflare Worker to serve josh-wolfe.com from Civo Object Store
const CIVO_BASE = 'https://objectstore.nyc1.civo.com/j-cubed/josh-wolfe-com';

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

async function handleRequest(request) {
  const url = new URL(request.url);
  let path = url.pathname;

  // Handle root path
  if (path === '/' || path === '') {
    path = '/index.html';
  }

  // For SPA: if no file extension, serve index.html
  const hasExtension = path.includes('.') && path.lastIndexOf('.') > path.lastIndexOf('/');
  if (!hasExtension) {
    path = '/index.html';
  }

  const civoUrl = CIVO_BASE + path;

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
