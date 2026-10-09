/**
 * Master pre-launch verification runner.
 *
 * Executes the complete audit suite in sequence:
 *   audit:http  -> status codes + bot/crawler headers (live)
 *   audit:seo   -> robots.txt / sitemap.xml / canonical (live)
 *   audit:meta  -> title / description / OpenGraph / hreflang (live)
 *   audit:perf  -> JS budgets / image weight / head hints (local build)
 *   audit:flows -> CTA wiring / form integrity / plan plumbing (static)
 *   audit:rtl   -> dictionaries / dir logic / mirroring (static)
 *   audit:a11y  -> skip link / focus / alt / ARIA / contrast (static)
 *
 * NOTE: the http/seo/meta probes target production and will fail until the
 * current branch is deployed — that is the correct pre-launch signal.
 *
 * Usage:
 *   npm run audit:all
 *
 * Exit code: 0 when every suite passes, 1 otherwise.
 */

const { spawnSync } = require('child_process');
const path = require('path');

const SCRIPTS = [
  'audit-http.js',
  'audit-seo.js',
  'audit-meta.js',
  'audit-perf.js',
  'audit-flows.js',
  'audit-rtl.js',
  'audit-a11y.js',
];

function main() {
  console.log('Master pre-launch verification\n');
  const results = [];

  for (const script of SCRIPTS) {
    console.log('\n' + '='.repeat(60));
    console.log(`>>> node scripts/${script}\n`);
    const result = spawnSync(process.execPath, [path.join(__dirname, script)], {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
    const code = typeof result.status === 'number' ? result.status : 1;
    results.push({ script, ok: code === 0 });
  }

  console.log('\n' + '='.repeat(60));
  console.log('\nSummary:');
  for (const { script, ok } of results) {
    console.log(`  ${ok ? 'PASS' : 'FAIL'}  scripts/${script}`);
  }
  const failed = results.filter((r) => !r.ok);
  if (failed.length === 0) {
    console.log('\nAll suites passed. Ready for launch.');
  } else {
    console.log(
      `\n${failed.length} suite(s) failed. (Live suites fail until this branch is deployed.)`,
    );
  }
  process.exit(failed.length === 0 ? 0 : 1);
}

main();
