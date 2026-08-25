import { exec as execCallback, spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const exec = promisify(execCallback);
const root = path.resolve(process.env.BIZBUZZ_CANDIDATE_ROOT || process.cwd());
const trustedRoot = path.resolve(process.env.BIZBUZZ_TRUSTED_ROOT || process.cwd());

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function replaceTokens(value, tokens) {
  return Object.entries(tokens).reduce(
    (result, [key, replacement]) => result.replaceAll(`{${key}}`, String(replacement)),
    value,
  );
}

async function run(command, timeoutMs) {
  await exec(command, { cwd: root, timeout: timeoutMs, maxBuffer: 10 * 1024 * 1024 });
}

async function waitFor(url, timeoutMs) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(5_000) });
      if (response.ok) return;
    } catch {
      // The private preview may not be listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 1_000));
  }
  throw new Error(`Preview did not become ready: ${url}`);
}

const config = JSON.parse(await fs.readFile(path.join(trustedRoot, '.bizbuzz/blog-publisher.json'), 'utf8'));
const manifest = JSON.parse(await fs.readFile(path.join(trustedRoot, '.bizbuzz/runner/manifest.json'), 'utf8'));
if (config.schemaVersion !== manifest.configSchemaVersion) {
  throw new Error(`Runner configuration schema mismatch: ${config.schemaVersion}`);
}

const publicationId = required('BIZBUZZ_PUBLICATION_ID');
const attempt = Number(required('BIZBUZZ_ATTEMPT'));
const slug = required('BIZBUZZ_SLUG');
const candidateRef = required('BIZBUZZ_CANDIDATE_REF');
const candidateSha = required('BIZBUZZ_CANDIDATE_SHA');
const candidateHash = required('BIZBUZZ_CANDIDATE_HASH');
const sourceHash = required('BIZBUZZ_SOURCE_HASH');
const imageHashes = JSON.parse(required('BIZBUZZ_IMAGE_HASHES_JSON'));
const expectedRunnerVersion = required('BIZBUZZ_EXPECTED_RUNNER_VERSION');
if (manifest.runnerVersion !== expectedRunnerVersion) {
  throw new Error(`Runner version mismatch: installed ${manifest.runnerVersion}, expected ${expectedRunnerVersion}`);
}

const timeoutMs = Number(config.timeoutMinutes || 15) * 60_000;
const tokens = { slug, port: config.previewPort };
const auditedUrl = new URL(replaceTokens(config.postUrl, tokens), `http://127.0.0.1:${config.previewPort}`).toString();

await run(config.installCommand, timeoutMs);
await run(config.buildCommand, timeoutMs);

const preview = spawn(replaceTokens(config.previewCommand, tokens), {
  cwd: root,
  shell: true,
  detached: true,
  stdio: ['ignore', 'pipe', 'pipe'],
});
preview.stdout.pipe(process.stdout);
preview.stderr.pipe(process.stderr);

try {
  await waitFor(auditedUrl, timeoutMs);
  const lighthousePath = path.join(process.env.RUNNER_TEMP || '/tmp', 'bizbuzz-lighthouse.json');
  const started = Date.now();
  await run(
    `npx --yes lighthouse@12.8.2 ${JSON.stringify(auditedUrl)} --chrome-flags=${JSON.stringify('--headless --no-sandbox --disable-dev-shm-usage')} --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=${JSON.stringify(lighthousePath)} --quiet`,
    timeoutMs,
  );
  const finished = Date.now();
  const raw = JSON.parse(await fs.readFile(lighthousePath, 'utf8'));
  const score = (id) => Math.round((raw.categories[id]?.score ?? 0) * 100);
  const failedAudits = Object.values(raw.audits)
    .filter((audit) => audit.scoreDisplayMode !== 'notApplicable' && typeof audit.score === 'number' && audit.score < 1)
    .map((audit) => ({
      id: audit.id,
      title: audit.title,
      score: audit.score,
      ...(audit.displayValue ? { displayValue: audit.displayValue } : {}),
      ...(audit.description ? { description: audit.description } : {}),
    }))
    .slice(0, 100);
  const report = {
    schemaVersion: manifest.reportSchemaVersion,
    runnerVersion: manifest.runnerVersion,
    configSchemaVersion: manifest.configSchemaVersion,
    upstreamRelease: manifest.upstreamRelease,
    upstreamCommit: manifest.upstreamCommit,
    publicationId,
    attempt,
    candidateRef,
    candidateSha,
    candidateHash,
    sourceHash,
    imageHashes,
    auditedUrl,
    scores: {
      performance: score('performance'),
      accessibility: score('accessibility'),
      bestPractices: score('best-practices'),
      seo: score('seo'),
    },
    failedAudits,
    durationMs: finished - started,
  };
  const reportPath = path.join(process.env.RUNNER_TEMP || '/tmp', 'unsigned-report.json');
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  if (process.env.GITHUB_OUTPUT) {
    await fs.appendFile(process.env.GITHUB_OUTPUT, `report_path=${path.relative(root, reportPath)}\n`);
    await fs.appendFile(process.env.GITHUB_OUTPUT, `lighthouse_path=${lighthousePath}\n`);
  }
} finally {
  if (preview.pid) {
    try {
      process.kill(-preview.pid, 'SIGTERM');
    } catch (error) {
      if (error.code !== 'ESRCH') throw error;
    }
  }
  preview.unref();
}
