import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const canonical = 'https://raw.githubusercontent.com/guinnessNet/dry-syrup-calculator/v1.0.0/START-HERE.md';
const required = [
  'v1.0.0',
  'BUILD-SPEC.md',
  'data/dry-syrups-v1.json',
  'tests/calculation-cases-v1.json',
  'DATA_SHA256',
];

assert.equal(read('CNAME').trim(), 'edu.maipharm.com');

const source = read('sources/dry-v1.0.0.md');
assert.equal(Buffer.byteLength(source), 10272);
assert.equal(
  createHash('sha256').update(source).digest('hex'),
  '2158f26961f9e9266fec449f39e1ed3500458f9af59a9b24d957e968602505bb',
);

const dry = read('dry/index.html');
for (const marker of required) assert.ok(dry.includes(marker), `missing ${marker}`);
assert.ok(dry.includes(canonical));
assert.ok(!dry.includes('/main/'));
assert.ok(!/<meta[^>]+http-equiv=["']refresh/i.test(dry));
assert.ok(!/<script\b/i.test(dry));

const hub = read('index.html');
assert.ok(hub.includes('href="/dry"'));
assert.ok(hub.includes('건조시럽 환산계수'));
assert.ok(read('404.html').includes('href="/"'));

console.log('site verification passed');
