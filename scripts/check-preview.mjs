import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const host = process.env.PREVIEW_HOST || '127.0.0.1';
const port = Number(process.env.PREVIEW_PORT || 5201);
const baseUrl = `http://${host}:${port}`;
const paths = process.argv.slice(2);
const routes = paths.length ? paths : ['/', '/blog'];
const logs = [];

const preview = spawn(
  'npm',
  ['run', 'preview', '--', '--host', host, '--port', String(port), '--strictPort'],
  {
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);

preview.stdout.on('data', (chunk) => logs.push(chunk.toString()));
preview.stderr.on('data', (chunk) => logs.push(chunk.toString()));

let exited = false;
preview.on('exit', (code, signal) => {
  exited = true;
  if (code !== 0 && signal !== 'SIGTERM') {
    logs.push(`preview exited early: code=${code} signal=${signal ?? 'none'}\n`);
  }
});

async function waitForPreview() {
  const deadline = Date.now() + 20_000;

  while (Date.now() < deadline) {
    if (exited) {
      throw new Error('preview server exited before becoming ready');
    }

    try {
      const response = await fetch(baseUrl, { signal: AbortSignal.timeout(2_000) });
      if (response.ok) {
        return;
      }
    } catch {
      // Keep polling until Vite is ready or the deadline expires.
    }

    await delay(250);
  }

  throw new Error(`preview server did not become ready at ${baseUrl}`);
}

async function checkRoutes() {
  for (const route of routes) {
    const url = new URL(route, baseUrl);
    const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });

    if (!response.ok) {
      throw new Error(`${url.href} returned HTTP ${response.status}`);
    }

    console.log(`${response.status} ${url.pathname}`);
  }
}

function stopPreview() {
  if (!preview.killed) {
    try {
      process.kill(-preview.pid, 'SIGTERM');
    } catch {
      preview.kill('SIGTERM');
    }
  }
}

try {
  await waitForPreview();
  await checkRoutes();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  console.error(logs.join('').trim());
  process.exitCode = 1;
} finally {
  stopPreview();
}
