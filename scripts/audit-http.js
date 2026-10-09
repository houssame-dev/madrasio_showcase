/**
 * Homepage HTTP + edge-header audit for https://www.madrasio.com/
 *
 * What it checks per User-Agent:
 *  1. Final HTTP status is 200 OK (no 403/503, no redirect loops).
 *  2. No bot-blocking response headers (X-Robots-Tag: noindex/nofollow/none,
 *     google-extended opt-out).
 *  3. Content-Type is text/html with utf-8 charset.
 *
 * Usage:
 *   node scripts/audit-http.js [url]
 *
 * Exit code: 0 when every probe passes, 1 otherwise.
 */

const TARGET = process.argv[2] || 'https://www.madrasio.com/';
const MAX_HOPS = 10;
const TIMEOUT_MS = 20000;

const USER_AGENTS = [
  {
    name: 'Chrome Desktop',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  },
  {
    name: 'Chrome Mobile',
    ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
  },
  {
    name: 'Googlebot',
    ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  },
  {
    name: 'Bingbot',
    ua: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  },
  {
    name: 'Twitterbot',
    ua: 'Twitterbot/1.0',
  },
  {
    name: 'WhatsApp',
    ua: 'WhatsApp/2.24.10.78 A',
  },
  {
    name: 'FacebookExternalHit',
    ua: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
  },
];

/** Follow redirects manually so loops are visible instead of hidden by fetch. */
async function fetchWithTrace(startUrl, userAgent) {
  const hops = [];
  let url = startUrl;
  const seen = new Set();

  for (let i = 0; i < MAX_HOPS; i++) {
    if (seen.has(url)) {
      return {
        hops,
        error: `Redirect loop detected (revisited ${url})`,
      };
    }
    seen.add(url);

    let res;
    try {
      res = await fetch(url, {
        method: 'GET',
        redirect: 'manual',
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { 'User-Agent': userAgent, Accept: 'text/html' },
      });
    } catch (err) {
      return { hops, error: `Request failed: ${err.message}` };
    }

    const hop = {
      url,
      status: res.status,
      location: res.headers.get('location'),
    };
    hops.push(hop);
    // Drain the body so sockets are released.
    try {
      await res.arrayBuffer();
    } catch {
      /* ignore body errors once headers are captured */
    }

    if ([301, 302, 303, 307, 308].includes(res.status)) {
      if (!hop.location) {
        return { hops, error: 'Redirect without Location header' };
      }
      url = new URL(hop.location, url).toString();
      continue;
    }

    return { hops, finalHeaders: res.headers, finalStatus: res.status };
  }

  return { hops, error: `Too many redirects (>${MAX_HOPS} hops)` };
}

function auditHeaders(headers) {
  const findings = [];

  const robotsTag = headers.get('x-robots-tag');
  if (robotsTag && /noindex|nofollow|none/i.test(robotsTag)) {
    findings.push(`Blocking X-Robots-Tag header: "${robotsTag}"`);
  }

  const googleExtended = headers.get('google-extended');
  if (googleExtended && /opt-out/i.test(googleExtended)) {
    findings.push(`Blocking google-extended header: "${googleExtended}"`);
  }

  const contentType = headers.get('content-type') || '';
  const [mime, ...params] = contentType.split(';').map((s) => s.trim());
  if (mime.toLowerCase() !== 'text/html') {
    findings.push(`Unexpected Content-Type: "${contentType}"`);
  } else if (!params.some((p) => p.toLowerCase().replace(/\s/g, '') === 'charset=utf-8')) {
    findings.push(`Content-Type missing utf-8 charset: "${contentType}"`);
  }

  return { findings, robotsTag, googleExtended, contentType };
}

async function main() {
  console.log(`Auditing ${TARGET} with ${USER_AGENTS.length} User-Agent probes\n`);

  let failures = 0;

  for (const { name, ua } of USER_AGENTS) {
    const { hops, finalHeaders, finalStatus, error } = await fetchWithTrace(
      TARGET,
      ua,
    );
    const chain = hops.map((h) => h.status).join(' -> ') || '(no response)';
    const issues = [];

    if (error) {
      issues.push(error);
    } else {
      if (finalStatus !== 200) {
        issues.push(`Expected HTTP 200, got ${finalStatus}`);
      }
      if ([403, 503].includes(finalStatus)) {
        issues.push(`Bot-blocking status ${finalStatus}`);
      }
      const headerAudit = auditHeaders(finalHeaders);
      issues.push(...headerAudit.findings);
      var details = headerAudit;
    }

    const ok = issues.length === 0;
    if (!ok) failures += 1;

    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
    console.log(`      chain: ${chain}`);
    if (!error && details) {
      console.log(`      content-type: ${details.contentType || '(missing)'}`);
      console.log(`      x-robots-tag: ${details.robotsTag || '(absent)'}`);
      console.log(`      google-extended: ${details.googleExtended || '(absent)'}`);
    }
    for (const issue of issues) console.log(`      !! ${issue}`);
    console.log('');
  }

  console.log(
    failures === 0
      ? `All ${USER_AGENTS.length} probes passed.`
      : `${failures}/${USER_AGENTS.length} probes FAILED.`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(`Audit crashed: ${err.message}`);
  process.exit(1);
});
