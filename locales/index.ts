import ar from './ar.json';
import de from './de.json';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import it from './it.json';
import ja from './ja.json';
import nl from './nl.json';
import pt from './pt.json';
import ru from './ru.json';
import tr from './tr.json';
import zh from './zh.json';

export interface LocaleMeta {
  code: string;
  /** ISO 3166-1 alpha-2 flag code (country-flag-icons/react/3x2). */
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const LOCALES: LocaleMeta[] = [
  { code: 'en', flag: 'GB', dir: 'ltr' },
  { code: 'fr', flag: 'FR', dir: 'ltr' },
  { code: 'ar', flag: 'MA', dir: 'rtl' },
  { code: 'es', flag: 'ES', dir: 'ltr' },
  { code: 'pt', flag: 'PT', dir: 'ltr' },
  { code: 'it', flag: 'IT', dir: 'ltr' },
  { code: 'de', flag: 'DE', dir: 'ltr' },
  { code: 'tr', flag: 'TR', dir: 'ltr' },
  { code: 'nl', flag: 'NL', dir: 'ltr' },
  { code: 'ru', flag: 'RU', dir: 'ltr' },
  { code: 'zh', flag: 'CN', dir: 'ltr' },
  { code: 'ja', flag: 'JP', dir: 'ltr' },
];

export type Locale = (typeof LOCALES)[number]['code'];

export const DEFAULT_LOCALE: Locale = 'en';

export const RTL_LOCALES: Locale[] = LOCALES.filter((l) => l.dir === 'rtl').map(
  (l) => l.code,
);

export const SUPPORTED_LOCALES: Locale[] = LOCALES.map((l) => l.code);

// English is the source of truth: every locale must expose the exact same
// key tree (enforced at runtime by scripts/audit-rtl.js). The 9 non-core
// dictionaries ship with English placeholders until localized copy lands.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyDict = Record<string, any>;

const dictionaries: Record<Locale, AnyDict> = {
  en,
  fr,
  ar,
  es,
  pt,
  it,
  de,
  tr,
  nl,
  ru,
  zh,
  ja,
};

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as string[]).includes(value);
}

export function getDictionary(locale: string): AnyDict {
  if (isLocale(locale)) return dictionaries[locale];
  return dictionaries[DEFAULT_LOCALE];
}

export function getDirection(code: string): 'rtl' | 'ltr' {
  return code === 'ar' ? 'rtl' : 'ltr';
}

export function getLocaleMeta(code: string): LocaleMeta {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

export type Dictionary = typeof en;
