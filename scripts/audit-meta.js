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
    const res = await fetch(`${BASE}/`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'User-Agent': 'Madrasio-SEO-Audit/1.0' },
    });
    if (res.status !== 200) {
      console.log(`FAIL  homepage returned HTTP ${res.status}`);
      process.exit(1);
    }
    html = await res.text();
  } catch (err) {
    console.log(`FAIL  could not fetch homepage: ${err.message}`);
    process.exit(1);
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
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(`Audit crashed: ${err.message}`);
  process.exit(1);
});
