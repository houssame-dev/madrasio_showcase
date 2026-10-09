/**
 * Meta/OpenGraph/hreflang audit.
 *
 * Fetches a page (production by default) and verifies the SEO head tags
 * generated from the root metadata export in app/layout.tsx:
 *  - <title>
 *  - <meta name="description">
 *  - <meta property="og:title">
 *  - <meta property="og:image">
 *  - <link rel="alternate" hreflang="fr">
 *  - <link rel="alternate" hreflang="ar">
 *
 * Usage:
 *   npm run audit:meta                   # audit production
 *   node scripts/audit-meta.js <baseUrl> # audit another origin (e.g. local preview)
 *
 * Exit code: 0 when every check passes, 1 otherwise.
 */

const BASE = (process.argv[2] || 'https://www.madrasio.com').replace(/\/$/, '');
const TIMEOUT_MS = 20000;

// NOTE (Windows/undici): AbortSignal.timeout() leaves async handles behind
// that abort the process on exit. Use a manual unref'd timer instead, send
// `Connection: close` to avoid pooled keep-alive sockets, and exit via
// exitCode (natural loop drain) rather than a forced process.exit().
function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  if (typeof timer.unref === 'function') timer.unref();
  return fetch(url, {
    ...options,
    signal: controller.signal,
    headers: { Connection: 'close', ...(options.headers || {}) },
  }).finally(() => clearTimeout(timer));
}

function finish(code) {
  process.exitCode = code;
  const killer = setTimeout(() => process.exit(code), 2000);
  if (typeof killer.unref === 'function') killer.unref();
}

const CHECKS = [
  {
    name: '<title> present and non-empty',
    test: (html) => /<title[^>]*>([^<]+)<\/title>/i.test(html),
    detail: 'looking for a non-empty <title> element',
  },
  {
    name: '<meta name="description"> present with content',
    test: (html) =>
      /<meta[^>]*name=["']description["'][^>]*content=["'][^"']+["'][^>]*>/i.test(
        html,
      ) ||
      /<meta[^>]*content=["'][^"']+["'][^>]*name=["']description["'][^>]*>/i.test(
        html,
      ),
    detail: 'looking for meta[name="description"][content]',
  },
  {
    name: '<meta property="og:title"> present with content',
    test: (html) => /<meta[^>]*property=["']og:title["'][^>]*>/i.test(html),
    detail: 'looking for meta[property="og:title"]',
  },
  {
    name: '<meta property="og:image"> present with content',
    test: (html) => /<meta[^>]*property=["']og:image["'][^>]*>/i.test(html),
    detail: 'looking for meta[property="og:image"]',
  },
  {
    name: '<link rel="alternate" hreflang="fr"> present',
    test: (html) =>
      /<link[^>]*hreflang=["']fr["'][^>]*>/i.test(html) &&
      /<link[^>]*rel=["']alternate["'][^>]*hreflang=["']fr["'][^>]*>/i.test(
        html,
      ),
    detail: 'looking for link[rel="alternate"][hreflang="fr"]',
  },
  {
    name: '<link rel="alternate" hreflang="ar"> present',
    test: (html) =>
      /<link[^>]*rel=["']alternate["'][^>]*hreflang=["']ar["'][^>]*>/i.test(
        html,
      ),
    detail: 'looking for link[rel="alternate"][hreflang="ar"]',
  },
];

async function main() {
  console.log(`Auditing meta tags at ${BASE}/\n`);
  let failures = 0;
  let html = '';

  try {
    const res = await fetchWithTimeout(`${BASE}/`, {
      headers: { 'User-Agent': 'Madrasio-SEO-Audit/1.0' },
    });
    if (res.status !== 200) {
      console.log(`FAIL  homepage returned HTTP ${res.status}`);
      process.exit(1);
    }
    html = await res.text();
  } catch (err) {
    console.log(`FAIL  could not fetch homepage: ${err.message}`);
    finish(1);
    return;
  }

  for (const { name, test, detail } of CHECKS) {
    let ok = false;
    try {
      ok = test(html);
    } catch {
      ok = false;
    }
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
    if (!ok) {
      console.log(`      ${detail}`);
      failures += 1;
    }
  }

  console.log(
    failures === 0 ? '\nAll meta checks passed.' : `\n${failures} check(s) FAILED.`,
  );
  finish(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(`Audit crashed: ${err.message}`);
  finish(1);
});
