import ar from './ar.json';
import en from './en.json';
import fr from './fr.json';

// English is the source of truth: every locale must expose the exact same
// key tree (enforced at runtime by scripts/audit-rtl.js).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyDict = Record<string, any>;

export type Locale = 'en' | 'fr' | 'ar';

export const DEFAULT_LOCALE: Locale = 'en';

export const RTL_LOCALES: Locale[] = ['ar'];

export const SUPPORTED_LOCALES: Locale[] = ['en', 'fr', 'ar'];

const dictionaries: Record<Locale, AnyDict> = { en, fr, ar };

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as string[]).includes(value);
}

export function getDictionary(locale: string): AnyDict {
  if (isLocale(locale)) return dictionaries[locale];
  return dictionaries[DEFAULT_LOCALE];
}

export function getDirection(locale: string): 'rtl' | 'ltr' {
  return RTL_LOCALES.includes(locale as Locale) ? 'rtl' : 'ltr';
}

export type Dictionary = typeof en;
