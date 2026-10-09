/**
 * Accessibility audit (static source analysis).
 *
 * 1. Skip link: layout renders an href="#main-content" skip link that
 *    appears on focus; page.tsx exposes <main id="main-content">.
 * 2. Focus rings: every interactive element is covered by the global
 *    :focus-visible gold-ring rule in app/globals.css (backstop for any
 *    element missing a per-component focus class).
 * 3. Alt text: every <img> / <Image> must carry an alt attribute
 *    (alt="" + aria-hidden only for decorative graphics).
 * 4. Dynamic ARIA: FAQ accordion + mobile nav toggle expose synced
 *    aria-expanded (/aria-controls); Contact exposes aria-live feedback.
 * 5. Contrast: files painting bg-[#FCA311] surfaces must pair them with
 *    dark text (advisory — translucent washes are exempt by inspection).
 * 6. Touch targets: icon-sized <button>/<a> controls must guarantee a
 *    >=44px hit area via min-h/min-w or explicit sizing (advisory).
 *
 * Usage:
 *   npm run audit:a11y
 *
 * Exit code: 0 when every check passes, 1 otherwise.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const APP = path.join(ROOT, 'app');
const COMPONENTS = path.join(ROOT, 'components');

let failures = 0;
let warnings = 0;

function pass(msg) {
  console.log(`PASS  ${msg}`);
}
function fail(msg, detail) {
  failures += 1;
  console.log(`FAIL  ${msg}${detail ? `\n      ${detail}` : ''}`);
}
function warn(msg, detail) {
  warnings += 1;
  console.log(`WARN  ${msg}${detail ? `\n      ${detail}` : ''}`);
}

function read(p) {
  return fs.readFileSync(p, 'utf8');
}

function componentFiles() {
  return fs
    .readdirSync(COMPONENTS)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => path.join(COMPONENTS, f));
}

/** 1. Skip link + main target. */
function auditSkipLink() {
  console.log('\n--- Skip link ---');
  const layout = read(path.join(APP, 'layout.tsx'));
  const page = read(path.join(APP, 'page.tsx'));
  const hasSkipLink =
    /href\s*=\s*["']#main-content["']/.test(layout) &&
    /not-sr-only|focus:visible|focus:/.test(layout);
  const hasMainTarget = /<main[^>]*id\s*=\s*["']main-content["']/.test(page);
  if (hasSkipLink) pass('layout.tsx renders a focus-revealed "Skip to main content" link.');
  else fail('layout.tsx is missing the skip link to #main-content.');
  if (hasMainTarget) pass('page.tsx exposes <main id="main-content">.');
  else fail('page.tsx is missing <main id="main-content">.');
}

/** 2. Focus-ring coverage. */
function auditFocusRings() {
  console.log('\n--- Focus indicators ---');
  const css = read(path.join(APP, 'globals.css'));
  const globalRule =
    /:focus-visible/.test(css) && /ring-\[#FCA311\]|ring-2/.test(css);
  if (globalRule) {
    pass('globals.css defines a global :focus-visible gold ring for all interactive elements.');
  } else {
    // Fall back to per-element inspection.
    let uncovered = [];
    for (const file of componentFiles()) {
      const src = read(file);
      const tags = [
        ...src.matchAll(/<(a|button|input|select|textarea)(?=\s|>)[^>]*>/gs),
      ].map((m) => m[0]);
      const bare = tags.filter(
        (t) => !/focus-visible:|focus:/.test(t),
      );
      if (bare.length > 0)
        uncovered.push(`${path.basename(file)} (${bare.length})`);
    }
    if (uncovered.length === 0) {
      pass('Every interactive element carries a focus-visible/focus class.');
    } else {
      fail('Interactive elements without focus styling:', uncovered.join(', '));
    }
  }
}

/** 3. Image alt coverage. */
function auditAltText() {
  console.log('\n--- Image alt text ---');
  const missing = [];
  const files = [...componentFiles(), path.join(APP, 'page.tsx')];
  for (const file of files) {
    const src = read(file);
    const tags = [...src.matchAll(/<(img|Image)\b[^>]*>/gs)].map((m) => m[0]);
    for (const tag of tags) {
      if (!/\balt\s*=/.test(tag)) {
        missing.push(`${path.basename(file)}: ${tag.slice(0, 70)}`);
      }
    }
  }
  if (missing.length === 0) pass('Every <img>/<Image> carries an alt attribute.');
  else fail(`${missing.length} image(s) without alt:`, missing.join(' | '));
}

/** 4. Dynamic ARIA attributes. */
function auditAria() {
  console.log('\n--- Dynamic ARIA attributes ---');
  const faq = read(path.join(COMPONENTS, 'FAQ.tsx'));
  const nav = read(path.join(COMPONENTS, 'Navbar.tsx'));
  const contact = read(path.join(COMPONENTS, 'Contact.tsx'));

  if (/aria-expanded\s*=\s*\{/.test(faq)) {
    pass('FAQ accordion triggers sync aria-expanded with open state.');
  } else {
    fail('FAQ accordion is missing a state-synced aria-expanded.');
  }
  if (/aria-expanded/.test(nav) && /aria-controls\s*=\s*["']mobile-menu["']/.test(nav)) {
    pass('Mobile nav toggle exposes aria-expanded + aria-controls="mobile-menu".');
  } else {
    fail('Mobile nav toggle is missing aria-expanded/aria-controls.');
  }
  if (/aria-live\s*=\s*["']polite["']/.test(contact)) {
    pass('Contact exposes aria-live="polite" feedback for screen readers.');
  } else {
    fail('Contact is missing aria-live feedback regions.');
  }
}

/** 5. Gold-surface contrast (advisory). */
function auditContrast() {
  console.log('\n--- Gold-surface contrast (advisory) ---');
  const offenders = [];
  for (const file of componentFiles()) {
    // Ignore thin decorative bars (h-1/w-1/h-[2px] accents carry no text).
    const src = read(file)
      .split('\n')
      .filter((line) => !/\b[hw]-1\b|\b[hw]-\[2px\]/.test(line))
      .join('\n');
    // Only solid, non-hover gold surfaces count (translucent /10 washes
    // and hover states pair their own contrast handling).
    const hasSolidGold = /(?<![\w:-])bg-\[#FCA311\](?![/\w-])/.test(src);
    if (hasSolidGold && !/text-\[#14213D\]/.test(src)) {
      offenders.push(path.basename(file));
    }
  }
  if (offenders.length === 0) {
    pass('Every file painting bg-[#FCA311] surfaces pairs them with dark navy text.');
  } else {
    warn(
      'Gold backgrounds without co-located dark-navy text (verify manually):',
      offenders.join(', '),
    );
  }
}

/** 6. Touch-target sizing (advisory, 44px minimum). */
function auditTouchTargets() {
  console.log('\n--- Touch targets >=44px (advisory) ---');
  const smallRe = /(?<![\w.-])(w-10|h-10|w-9|h-9|p-1|p-2)(?![\w.-])/;
  const okRe =
    /min-h-\[44px\]|min-w-\[44px\]|\bh-1[12]\b|\bw-1[12]\b|\bp-[34]\b|px-[4-9]|py-[34]|min-h-11|min-w-11/;
  const flagged = new Set();
  for (const file of componentFiles()) {
    const src = read(file);
    const tags = [
      ...src.matchAll(/<(a|button)(?=\s|>)[^>]*>/gs),
    ].map((m) => m[0]);
    for (const tag of tags) {
      const cls = (tag.match(/className="([^"]*)"/) || [])[1] || '';
      if (smallRe.test(cls) && !okRe.test(cls)) {
        flagged.add(`${path.basename(file)}: ${cls.slice(0, 60)}`);
      }
    }
  }
  if (flagged.size === 0) {
    pass('All icon-sized controls guarantee a >=44px hit area.');
  } else {
    warn(
      `${flagged.size} control(s) may be smaller than 44px:`,
      [...flagged].join(' | '),
    );
  }
}

function main() {
  console.log('Accessibility audit (static analysis)');
  auditSkipLink();
  auditFocusRings();
  auditAltText();
  auditAria();
  auditContrast();
  auditTouchTargets();
  console.log(
    failures === 0
      ? `\nDone: ${warnings} warning(s), 0 failures.`
      : `\nDone: ${warnings} warning(s), ${failures} failure(s).`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main();
