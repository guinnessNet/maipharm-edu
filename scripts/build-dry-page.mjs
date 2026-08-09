import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const source = readFileSync(new URL('../sources/dry-v1.2.0.md', import.meta.url), 'utf8');
const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');
const canonical = 'https://raw.githubusercontent.com/guinnessNet/dry-syrup-calculator/v1.2.0/START-HERE.md';
const html = `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>건조시럽 계산기 제작 지침 v1.2.0 | 마이팜 교육자료</title>
  <link rel="canonical" href="${canonical}">
  <style>
    :root{color-scheme:light;--ink:#19352e;--accent:#0f6b50;--line:#d8e5df;--paper:#f5f8f6}
    *{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:system-ui,-apple-system,"Noto Sans KR",sans-serif;line-height:1.65}
    main{width:min(920px,calc(100% - 32px));margin:40px auto;background:#fff;border:1px solid var(--line);border-radius:18px;padding:clamp(22px,5vw,48px)}
    h1{margin-top:0;font-size:clamp(1.6rem,4vw,2.25rem)}.meta{padding:14px 16px;background:#edf6f2;border-left:4px solid var(--accent)}
    pre{white-space:pre-wrap;overflow-wrap:anywhere;font:inherit;margin-top:28px}a{color:var(--accent)}
  </style>
</head>
<body><main>
  <p><a href="/">마이팜 교육자료</a></p>
  <h1>건조시럽 계산기 제작 지침</h1>
  <div class="meta"><strong>고정 버전 v1.2.0 · 기본 11제품 · mg→mL→g 연쇄 계산</strong><br>실제 조제 전 최신 허가사항과 제품 표시를 다시 확인하십시오.<br><a href="${canonical}">고정 원본 보기</a></div>
  <pre id="instructions">${escapeHtml(source)}</pre>
</main></body></html>`;

mkdirSync(new URL('../dry', import.meta.url), { recursive: true });
writeFileSync(new URL('../dry/index.html', import.meta.url), html);
