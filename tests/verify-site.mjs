import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');
const canonical = 'https://raw.githubusercontent.com/guinnessNet/dry-syrup-calculator/v1.2.0/START-HERE.md';
const required = [
  'v1.2.0',
  '11개 제품',
  '총 성분량(mg)',
  '완전 현탁액 부피',
  '정제수 적량',
  '750mg → 30mL → 23.25g',
  '파목신시럽(아목시실린수화물)',
  'BUILD-SPEC.md',
  'data/dry-syrups-v1.json',
  'tests/calculation-cases-v1.json',
  'DATA_SHA256',
];

assert.equal(read('CNAME').trim(), 'edu.maipharm.com');

assert.ok(
  existsSync(new URL('../sources/dry-v1.2.0.md', import.meta.url)),
  'missing sources/dry-v1.2.0.md',
);
const source = read('sources/dry-v1.2.0.md');

const dry = read('dry/index.html');
assert.ok(dry.includes(escapeHtml(source)), 'generated page does not embed the complete source');
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
