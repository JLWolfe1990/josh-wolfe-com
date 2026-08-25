import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import { canonicalJson, PROTOCOL_VERSION, sign } from './connection-crypto.mjs';

const required = (name) => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required`);
  return value;
};

const reportPath = required('BIZBUZZ_UNSIGNED_REPORT_PATH');
const report = JSON.parse(await fs.readFile(reportPath, 'utf8'));
const expected = {
  publicationId: required('BIZBUZZ_PUBLICATION_ID'),
  attempt: Number(required('BIZBUZZ_ATTEMPT')),
  candidateRef: required('BIZBUZZ_CANDIDATE_REF'),
  candidateSha: required('BIZBUZZ_CANDIDATE_SHA'),
  candidateHash: required('BIZBUZZ_CANDIDATE_HASH'),
  sourceHash: required('BIZBUZZ_SOURCE_HASH'),
};
for (const [key, value] of Object.entries(expected)) {
  if (report[key] !== value) throw new Error(`Unsigned report ${key} mismatch`);
}
const connection = JSON.parse(required('BIZBUZZ_CONNECTION_JSON'));
const reportPayloadHash = crypto.createHash('sha256').update(canonicalJson(report)).digest('hex');
const envelope = {
  protocolVersion: PROTOCOL_VERSION,
  connectionId: connection.connectionId,
  secretVersion: connection.secretVersion,
  repositoryId: connection.repositoryId,
  ownerId: connection.ownerId,
  trustedHeadSha: required('GITHUB_SHA'),
  contractBlobSha: required('BIZBUZZ_CONTRACT_BLOB_SHA'),
  workflowBlobSha: required('BIZBUZZ_WORKFLOW_BLOB_SHA'),
  runnerHashes: JSON.parse(required('BIZBUZZ_RUNNER_HASHES_JSON')),
  publicationId: expected.publicationId,
  attempt: expected.attempt,
  workflowRunId: required('GITHUB_RUN_ID'),
  issuedAt: new Date().toISOString(),
  candidateRef: expected.candidateRef,
  candidateSha: expected.candidateSha,
  candidateHash: expected.candidateHash,
  sourceHash: expected.sourceHash,
  imageHashes: report.imageHashes,
  runnerVersion: report.runnerVersion,
  configSchemaVersion: report.configSchemaVersion,
  reportSchemaVersion: report.schemaVersion,
  reportPayloadHash,
};
const signature = sign(required('BIZBUZZ_CONNECTION_SECRET'), 'quality-report', envelope);
const response = await fetch(`${required('BIZBUZZ_API_URL').replace(/\/$/, '')}/api/blog-connections/quality-reports/respond`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: canonicalJson({ envelope, report, signature }),
  signal: AbortSignal.timeout(15_000),
});
if (!response.ok) throw new Error(`BizBuzz quality callback failed (${response.status})`);
