import crypto from 'node:crypto';

export const PROTOCOL_VERSION = 'bizbuzz-blog-connection/v1';

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => [key, stable(item)]));
  }
  return value;
}

export function canonicalJson(value) {
  return JSON.stringify(stable(value));
}

function rawSecret(secret) {
  const decoded = Buffer.from(secret, 'base64url');
  if (decoded.length !== 32) throw new Error('BIZBUZZ_CONNECTION_SECRET is invalid');
  return decoded;
}

export function derivedKey(secret, purpose) {
  return Buffer.from(crypto.hkdfSync(
    'sha256', rawSecret(secret), Buffer.from(PROTOCOL_VERSION), Buffer.from(`bizbuzz:${purpose}:v1`), 32,
  ));
}

export function sign(secret, purpose, payload) {
  return crypto.createHmac('sha256', derivedKey(secret, purpose)).update(canonicalJson(payload)).digest('base64url');
}
