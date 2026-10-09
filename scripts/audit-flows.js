/**
 * User-flow integrity audit (static source analysis).
 *
 * Verifies across Navbar / Hero / Pricing / Contact / Footer /
 * FloatingButtons / FAQ:
 *  1. No dead CTAs: every literal <a> has an href, every literal <button>
 *     has an onClick handler.
 *  2. Lead-form integrity (Contact.tsx): every input/select/textarea has a
 *     name + id, every id is referenced by a <label htmlFor>, and the lead
 *     fields carry required / type="email" / type="tel".
 *  3. Plan plumbing: Pricing dispatches the plan-select event that Contact
 *     listens for, and Contact submits a hidden plan field.
 *  4. Mobile drawer auto-close: Navbar resets isMenuOpen on brand, link and
 *     CTA interactions.
 *
 * Usage:
 *   npm run audit:flows
 *
 * Exit code: 0 when every check passes, 1 otherwise.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const COMPONENTS = path.join(ROOT, 'components');

const CTA_FILES = [
  'Navbar.tsx',
  'Hero.tsx',
  'Pricing.tsx',
  'Contact.tsx',
  'Footer.tsx',
  'FloatingButtons.tsx',
  'FAQ.tsx',
];

const LEAD_FIELDS = ['name', 'schoolName', 'email', 'phone', 'schoolSize'];
const PLAN_EVENT = 'madrasio:select-plan';

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

function read(file) {
  return fs.readFileSync(path.join(COMPONENTS, file), 'utf8');
}

function findTags(src, tag) {
  const re = new RegExp(`<${tag}(?=\\s|>)((?:"[^"]*"|'[^']*'|[^>"'])*)>`, 'gs');
  const out = [];
  let m;
  while ((m = re.exec(src)) !== null) out.push(m[0]);
  return out;
}

/** 1. No dead CTAs. */
function auditCtas() {
  console.log('\n--- CTA integrity (href / onClick present) ---');
  for (const file of CTA_FILES) {
    const src = read(file);
    const dead = [];
    for (const tag of findTags(src, 'a')) {
      if (!/\bhref\s*=/.test(tag)) dead.push(tag.slice(0, 60));
    }
    for (const tag of findTags(src, 'button')) {
      // Native submit buttons are wired via their enclosing <form onSubmit>.
      if (/\btype\s*=\s*["']submit["']/.test(tag)) continue;
      if (!/\bonClick\s*=/.test(tag)) dead.push(tag.slice(0, 60));
    }
    if (dead.length === 0) {
      pass(`${file}: all <a>/<button> elements are wired.`);
    } else {
      fail(
        `${file}: ${dead.length} dead control(s) without href/onClick.`,
        dead.join(' | '),
      );
    }
  }
}

/** 2. Lead-form integrity. */
function auditLeadForm() {
  console.log('\n--- Lead form integrity (Contact.tsx) ---');
  const src = read('Contact.tsx');
  const fields = [
    ...findTags(src, 'input'),
    ...findTags(src, 'select'),
    ...findTags(src, 'textarea'),
  ].filter((t) => !/type\s*=\s*["']hidden["']/.test(t));

  const withoutName = fields.filter((t) => !/\bname\s*=/.test(t));
  const withoutId = fields.filter((t) => !/\bid\s*=/.test(t));
  if (withoutName.length === 0 && withoutId.length === 0) {
    pass(`All ${fields.length} visible form fields have name + id.`);
  } else {
    if (withoutName.length > 0)
      fail(`${withoutName.length} field(s) missing name=`, withoutName.join(' | '));
    if (withoutId.length > 0)
      fail(`${withoutId.length} field(s) missing id=`, withoutId.join(' | '));
  }

  const ids = [...src.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map((m) => m[1]);
  const labels = [...src.matchAll(/htmlFor\s*=\s*["']([^"']+)["']/g)].map(
    (m) => m[1],
  );
  const unlabeled = [...new Set(ids.filter((id) => !labels.includes(id)))];
  // Only form-field ids matter; decorative ids (mobile-menu, etc.) are ignored
  // by restricting to ids that appear on a form control.
  const fieldIds = new Set(
    fields.flatMap((t) => {
      const m = t.match(/\bid\s*=\s*["']([^"']+)["']/);
      return m ? [m[1]] : [];
    }),
  );
  const unlabeledFields = [...fieldIds].filter((id) => !labels.includes(id));
  if (unlabeledFields.length === 0) {
    pass('Every form field id is referenced by a <label htmlFor>.');
  } else {
    fail('Unlabeled form fields:', unlabeledFields.join(', '));
  }
  void unlabeled;

  for (const name of LEAD_FIELDS) {
    const tag = fields.find((t) =>
      new RegExp(`\\bname\\s*=\\s*["']${name}["']`).test(t),
    );
    if (!tag) {
      fail(`Lead field "${name}" not found in form.`);
      continue;
    }
    if (!/\brequired\b/.test(tag)) {
      fail(`Lead field "${name}" is missing the required attribute.`);
    } else if (name === 'email' && !/\btype\s*=\s*["']email["']/.test(tag)) {
      fail('Email field must use type="email".');
    } else if (name === 'phone' && !/\btype\s*=\s*["']tel["']/.test(tag)) {
      fail('Phone field must use type="tel".');
    } else {
      pass(`Lead field "${name}" has required (+ correct type).`);
    }
  }
}

/** 3. Plan plumbing Pricing -> Contact. */
function auditPlanPlumbing() {
  console.log('\n--- Plan pre-selection plumbing ---');
  const pricing = read('Pricing.tsx');
  const contact = read('Contact.tsx');
  if (pricing.includes(PLAN_EVENT) && /dispatchEvent/.test(pricing)) {
    pass(`Pricing dispatches "${PLAN_EVENT}".`);
  } else {
    fail('Pricing does not dispatch the plan-select event.');
  }
  if (contact.includes(PLAN_EVENT) && /addEventListener/.test(contact)) {
    pass(`Contact listens for "${PLAN_EVENT}".`);
  } else {
    fail('Contact does not listen for the plan-select event.');
  }
  if (/<input[^>]*name\s*=\s*["']plan["']/.test(contact)) {
    pass('Contact submits a hidden "plan" field.');
  } else {
    fail('Contact is missing the hidden "plan" field.');
  }
}

/** 4. Mobile drawer auto-close. */
function auditDrawerClose() {
  console.log('\n--- Mobile drawer auto-close (Navbar.tsx) ---');
  const src = read('Navbar.tsx');
  const closers = (src.match(/setIsMenuOpen\(false\)/g) || []).length;
  if (closers >= 3) {
    pass(`Drawer resets on ${closers} interactions (brand, links, CTA).`);
  } else {
    warn(
      `Only ${closers} drawer-close handler(s) found (expected brand + links + CTA).`,
    );
  }
}

function main() {
  console.log('User-flow integrity audit (static analysis)');
  auditCtas();
  auditLeadForm();
  auditPlanPlumbing();
  auditDrawerClose();
  console.log(
    failures === 0
      ? `\nDone: ${warnings} warning(s), 0 failures.`
      : `\nDone: ${warnings} warning(s), ${failures} failure(s).`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main();
