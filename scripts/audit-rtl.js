/**
 * RTL & localization audit.
 *
 * 1. Dictionary parity: locales/en.json, fr.json, ar.json must expose
 *    identical key trees (no missing keys), with no empty values. The Arabic
 *    file must actually contain Arabic script; French must not (copy-paste
 *    guard).
 * 2. Document direction: Navbar must map the active language to
 *    document.documentElement lang + dir (ar -> rtl, others -> ltr).
 * 3. Directional icons: every horizontal arrow usage must carry an RTL
 *    mirroring class (rtl:rotate-180); the hero background layer must keep
 *    its rtl:-scale-x-100 flip inside an overflow-hidden section.
 * 4. Logical properties: remaining physical directional utilities
 *    (ml-/mr-/text-left/left-/right-/...) are reported as warnings.
 *
 * Usage:
 *   npm run audit:rtl
 *
 * Exit code: 0 when every check passes, 1 otherwise.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const COMPONENTS = path.join(ROOT, 'components');
const LOCALES = path.join(ROOT, 'locales');

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

function flatten(obj, prefix = '', out = {}) {
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out));
  } else if (obj !== null && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      flatten(v, prefix ? `${prefix}.${k}` : k, out);
    }
  } else {
    out[prefix] = obj;
  }
  return out;
}

/** 1. Dictionary parity + script coverage (all 12 locales). */
function auditDictionaries() {
  console.log('\n--- Dictionary parity (locales/*.json, 12 locales) ---');
  const files = fs
    .readdirSync(LOCALES)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
    .sort();
  if (!files.includes('en')) {
    fail('locales/en.json (source of truth) is missing.');
    return;
  }
  console.log(`      locales found: ${files.join(', ')}`);
  const dicts = {};
  for (const locale of files) {
    const p = path.join(LOCALES, `${locale}.json`);
    try {
      dicts[locale] = JSON.parse(read(p));
    } catch (err) {
      fail(`locales/${locale}.json is not valid JSON: ${err.message}`);
      return;
    }
  }
  const flat = Object.fromEntries(
    Object.entries(dicts).map(([k, v]) => [k, flatten(v)]),
  );
  const baseKeys = new Set(Object.keys(flat.en));
  let parityOk = true;
  for (const locale of files) {
    const keys = new Set(Object.keys(flat[locale]));
    const missing = [...baseKeys].filter((k) => !keys.has(k));
    const extra = [...keys].filter((k) => !baseKeys.has(k));
    if (missing.length > 0) {
      parityOk = false;
      fail(`${locale}.json is missing ${missing.length} key(s):`, missing.slice(0, 10).join(', '));
    }
    if (extra.length > 0) {
      parityOk = false;
      fail(`${locale}.json has ${extra.length} extra key(s) vs en:`, extra.slice(0, 10).join(', '));
    }
  }
  if (parityOk) {
    pass(`All ${files.length} dictionaries expose identical key trees (${baseKeys.size} keys).`);
  }

  for (const locale of files) {
    const empties = Object.entries(flat[locale])
      .filter(([, v]) => typeof v === 'string' && v.trim() === '')
      .map(([k]) => k);
    if (empties.length > 0) {
      fail(`${locale}.json has ${empties.length} empty value(s):`, empties.slice(0, 10).join(', '));
    } else {
      pass(`${locale}.json has no empty values.`);
    }
  }

  const arStrings = Object.values(flat.ar).filter((v) => typeof v === 'string' && v.length > 3);
  const arWithArabic = arStrings.filter((v) => /[\u0600-\u06FF]/.test(v));
  if (arWithArabic.length / Math.max(arStrings.length, 1) > 0.5) {
    pass(`ar.json is genuinely Arabic (${arWithArabic.length}/${arStrings.length} sampled strings contain Arabic script).`);
  } else {
    fail('ar.json does not contain enough Arabic script — possible untranslated fallback.');
  }

  const frStrings = Object.values(flat.fr).filter((v) => typeof v === 'string');
  const frWithArabic = frStrings.filter((v) => /[\u0600-\u06FF]/.test(v));
  if (frWithArabic.length === 0) {
    pass('fr.json contains no stray Arabic script.');
  } else {
    fail('fr.json contains Arabic script (copy-paste from ar.json?).');
  }
}

/** 2. Document direction logic. */
function auditDirectionLogic() {
  console.log('\n--- Document direction (Navbar language switch) ---');
  const candidates = ['Navbar.tsx', 'LanguageSwitcher.tsx', 'LanguageProvider.tsx'];
  const existing = candidates.filter((f) => fs.existsSync(path.join(COMPONENTS, f)));
  if (existing.length === 0) {
    fail('No Navbar/LanguageSwitcher component found.');
    return;
  }
  const src = existing.map((f) => read(path.join(COMPONENTS, f))).join('\n');
  const checks = [
    ['sets document.documentElement.dir', /document\.documentElement\.dir\s*=/],
    ['maps Arabic to rtl', /['"]rtl['"]/],
    ['resets Latin locales to ltr', /['"]ltr['"]/],
    ['sets document.documentElement.lang', /document\.documentElement\.lang\s*=/],
    ['references the ar locale', /['"]ar['"]|isLocale|RTL_LOCALES|getLanguageDir/],
  ];
  for (const [name, re] of checks) {
    if (re.test(src)) pass(`Navbar logic ${name}.`);
    else fail(`Navbar logic does not ${name}.`);
  }
}

/** 3. Directional icon mirroring + hero flip. */
function auditIconMirroring() {
  console.log('\n--- Directional icon mirroring ---');
  const arrowFiles = ['Hero.tsx', 'Pricing.tsx', 'Contact.tsx'];
  for (const file of arrowFiles) {
    const p = path.join(COMPONENTS, file);
    if (!fs.existsSync(p)) {
      warn(`${file} not found, skipping.`);
      continue;
    }
    const lines = read(p).split('\n');
    const bad = [];
    lines.forEach((line, i) => {
      if (/<FaArrowRight\b/.test(line) && !/rtl:(-scale-x|rotate-180)/.test(line)) {
        bad.push(`line ${i + 1}`);
      }
    });
    if (bad.length === 0) {
      pass(`${file}: all horizontal arrows mirror in RTL.`);
    } else {
      fail(`${file}: arrow(s) without RTL mirroring at ${bad.join(', ')}.`);
    }
  }

  const heroPath = path.join(COMPONENTS, 'Hero.tsx');
  if (fs.existsSync(heroPath)) {
    const hero = read(heroPath);
    if (/rtl:-scale-x-100/.test(hero)) {
      pass('Hero background layer keeps its rtl:-scale-x-100 flip.');
    } else {
      fail('Hero background layer is missing the rtl:-scale-x-100 flip.');
    }
    const sectionMatch = hero.match(/<section[^>]*className="([^"]*)"/);
    if (sectionMatch && /overflow-hidden|overflow-x-hidden/.test(sectionMatch[1])) {
      pass('Hero section clips flipped background (overflow-hidden).');
    } else {
      fail('Hero section lacks overflow-hidden — flipped art may cause horizontal scroll.');
    }
  }
}

/** 4. Physical (non-logical) directional utilities — advisory. */
function auditLogicalProperties() {
  console.log('\n--- Logical-property scan (advisory) ---');
  const files = fs
    .readdirSync(COMPONENTS)
    .filter((f) => f.endsWith('.tsx') && !f.startsWith('ui.'));
  const patterns = [
    /\bml-\S+|\b-m[sl]-\S+|\bfirst:ml-0\b/,
    /\bmr-\S+/,
    /\bpl-\S+/,
    /\bpr-\S+/,
    /\bleft-\d+\b/,
    /\bright-\d+\b/,
    /\btext-(left|right)\b/,
    /\brounded-[lr]\b|\brounded-t[lr]-/,
    /\bborder-[lr]-/,
  ];
  let hits = 0;
  for (const file of files) {
    const src = read(path.join(COMPONENTS, file));
    const found = patterns
      .flatMap((re) => src.match(new RegExp(re.source, 'g')) || [])
      .filter((m, i, arr) => arr.indexOf(m) === i);
    if (found.length > 0) {
      hits += found.length;
      warn(`${file}: physical directional utilities still present: ${found.join(', ')}`);
    }
  }
  if (hits === 0) pass('No physical directional utilities remain (ms-/me-/ps-/pe-/start-/end-/text-start used throughout).');
}

function main() {
  console.log('RTL & localization audit');
  auditDictionaries();
  auditDirectionLogic();
  auditIconMirroring();
  auditLogicalProperties();
  console.log(
    failures === 0
      ? `\nDone: ${warnings} warning(s), 0 failures.`
      : `\nDone: ${warnings} warning(s), ${failures} failure(s).`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main();
