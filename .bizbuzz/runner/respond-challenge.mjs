import { canonicalJson, sign } from './connection-crypto.mjs';

const required = (name) => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required`);
  return value;
};

const payload = JSON.parse(Buffer.from(required('BIZBUZZ_CHALLENGE_PAYLOAD'), 'base64url').toString('utf8'));
if (payload.headSha !== required('GITHUB_SHA')) throw new Error('Challenge expected a different trusted commit');
const signature = sign(required('BIZBUZZ_CONNECTION_SECRET'), 'pairing-response', payload);
const response = await fetch(`${required('BIZBUZZ_API_URL').replace(/\/$/, '')}/api/blog-connections/challenges/respond`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: canonicalJson({ challengeId: payload.challengeId, workflowRunId: required('GITHUB_RUN_ID'), signature }),
  signal: AbortSignal.timeout(15_000),
});
if (!response.ok) throw new Error(`BizBuzz challenge callback failed (${response.status})`);
