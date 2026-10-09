/**
 * Mobile performance / Core Web Vitals audit.
 *
 * Inspects production build artifacts in .next/ plus source assets in public/:
 *  1. JS chunks  - flags oversized client bundles that hurt mobile TBT/LCP.
 *  2. Images     - flags heavy PNG/JPG assets; WebP/AVIF siblings preferred.
 *  3. Head hints - reports preconnect / dns-prefetch / preload usage.
 *
 * Usage:
 *   npm run build && npm run audit:perf
 *
 * Exit code: 0 when no FAIL findings, 1 otherwise (warnings don't fail).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const NEXT_DIR = path.join(ROOT, '.next');
const CHUNKS_DIR = path.join(NEXT_DIR, 'static', 'chunks');
const PUBLIC_DIR = path.join(ROOT, 'public');
const HTML_PATH = path.join(NEXT_DIR, 'server', 'app', 'index.html');

// Budgets (raw bytes — keep mobile 4G loads fast)
const JS_WARN_BYTES = 244 * 1024;
const JS_FAIL_BYTES = 512 * 1024;
const IMG_WARN_BYTES = 300 * 1024;
const IMG_FAIL_BYTES = 1024 * 1024;

function walk(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, exts, out);
    } else if (exts.some((ext) => entry.name.toLowerCase().endsWith(ext))) {
      out.push(full);
    }
  }
  return out;
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

let warnings = 0;
let failures = 0;

function warn(msg) {
  warnings += 1;
  console.log(`WARN  ${msg}`);
}

function fail(msg) {
  failures += 1;
  console.log(`FAIL  ${msg}`);
}

function pass(msg) {
  console.log(`PASS  ${msg}`);
}

function auditJsChunks() {
  console.log('\n--- JavaScript bundles (.next/static/chunks) ---');
  if (!fs.existsSync(CHUNKS_DIR)) {
    fail('No build output found. Run `npm run build` first.');
    return;
  }
  const files = walk(CHUNKS_DIR, ['.js']).filter((f) => !f.endsWith('.map'));
  if (files.length === 0) {
    fail('No JS chunks found in build output.');
    return;
  }
  let total = 0;
  let largest = { file: '', bytes: 0 };
  for (const file of files) {
    const bytes = fs.statSync(file).size;
    total += bytes;
    if (bytes > largest.bytes) largest = { file, bytes };
    const rel = path.relative(ROOT, file);
    if (bytes > JS_FAIL_BYTES) {
      fail(`${rel} is ${kb(bytes)} (budget: <${kb(JS_FAIL_BYTES)})`);
    } else if (bytes > JS_WARN_BYTES) {
      warn(`${rel} is ${kb(bytes)} (budget: <${kb(JS_WARN_BYTES)})`);
    }
  }
  console.log(
    `      ${files.length} chunks, ${kb(total)} total, largest: ${kb(largest.bytes)} (${path.relative(ROOT, largest.file)})`,
  );
  if (failures === 0 && warnings === 0) pass('All JS chunks within budget.');
}

function auditImages() {
  console.log('\n--- Static images (public/) ---');
  const files = walk(PUBLIC_DIR, ['.png', '.jpg', '.jpeg']).filter(
    (f) => !f.toLowerCase().endsWith('.ico'),
  );
  if (files.length === 0) {
    console.log('      (no raster images found)');
    return;
  }
  for (const file of files) {
    const bytes = fs.statSync(file).size;
    const rel = path.relative(ROOT, file);
    const dir = path.dirname(file);
    const base = path.basename(file, path.extname(file));
    const hasModernSibling =
      fs.existsSync(path.join(dir, `${base}.webp`)) ||
      fs.existsSync(path.join(dir, `${base}.avif`));
    if (bytes > IMG_FAIL_BYTES) {
      fail(
        `${rel} is ${kb(bytes)} — convert to WebP/AVIF or compress below ${kb(IMG_FAIL_BYTES)}.`,
      );
    } else if (bytes > IMG_WARN_BYTES && !hasModernSibling) {
      warn(
        `${rel} is ${kb(bytes)} — serve a WebP/AVIF variant (preferred) or compress below ${kb(IMG_WARN_BYTES)}.`,
      );
    } else {
      console.log(`      ok: ${rel} (${kb(bytes)})`);
    }
  }
}

function auditHeadHints() {
  console.log('\n--- Resource hints (<head>) ---');
  if (!fs.existsSync(HTML_PATH)) {
    console.log('      (prerendered HTML not found, skipping)');
    return;
  }
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const head = (html.match(/<head[\s\S]*?<\/head>/i) || [''])[0];
  const hints = ['preconnect', 'dns-prefetch', 'preload', 'prefetch', 'preconnect'];
  const found = [...new Set([...head.matchAll(/rel=["']([^"']+)["']/gi)].map((m) => m[1]))];
  const relevant = found.filter((rel) =>
    ['preconnect', 'dns-prefetch', 'preload', 'modulepreload', 'prefetch'].includes(rel),
  );
  if (relevant.length > 0) {
    console.log(`      resource hints present: ${relevant.join(', ')}`);
  } else {
    console.log(
      '      info: no preconnect/preload hints in <head> (fine while fonts are self-hosted via next/font; add a preconnect if render-blocking third-party origins are introduced, e.g. image CDNs).',
    );
  }
  void hints;
}

function main() {
  console.log('Mobile performance audit (build artifacts + static assets)');
  auditJsChunks();
  auditImages();
  auditHeadHints();
  console.log(
    failures === 0
      ? `\nDone: ${warnings} warning(s), 0 failures.`
      : `\nDone: ${warnings} warning(s), ${failures} failure(s).`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main();
