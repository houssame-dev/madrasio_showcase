'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';

import {
  DEFAULT_LOCALE,
  getDictionary,
  getDirection,
  isLocale,
} from '@/locales';
import type { Locale } from '@/locales';

const STORAGE_KEY = 'language';

/** Primary language subtag: "fr-FR" -> "fr", "zh_Hans" -> "zh". */
function primarySubtag(tag: string): string {
  return tag.split(/[-_]/)[0]?.toLowerCase() ?? '';
}

function lookup(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, segment) => {
    if (acc === null || acc === undefined) return undefined;
    if (Array.isArray(acc)) {
      const index = Number(segment);
      return Number.isNaN(index) ? undefined : acc[index];
    }
    if (typeof acc === 'object') {
      return (acc as Record<string, unknown>)[segment];
    }
    return undefined;
  }, obj);
}

interface LanguageContextValue {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  setLocale: (code: string) => void;
  /** Translation lookup with English fallback: t('hero.title'), t('faq.items.0.q'). */
  t: (key: string) => string;
  /** Raw lookup for arrays/objects (also English-fallback). */
  tp: <T = unknown>(key: string) => T;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LOCALE,
  dir: 'ltr',
  setLocale: () => {},
  t: (key: string) => key,
  tp: <T,>(key: string) => key as unknown as T,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  // Becomes true only after the mount effect has resolved the initial
  // locale. Rendering is intentionally NOT gated on it (the server HTML
  // and the first client render must stay identical); it gates the
  // DOM/storage writes below instead.
  const [mounted, setMounted] = useState(false);

  // Resolve the initial locale once, client-side only (effects never run
  // on the server, so the SSR HTML always matches the first client render
  // and hydration stays clean). Priority:
  //   1. stored user preference (always wins on later visits),
  //   2. device/browser default from navigator.languages[0] / navigator.language,
  //   3. 'en' fallback for anything unsupported.
  useEffect(() => {
    try {
      const savedLang = window.localStorage.getItem(STORAGE_KEY);
      if (savedLang && isLocale(savedLang)) {
        setLocaleState(savedLang);
        setMounted(true);
        return;
      }
    } catch {
      /* storage unavailable — fall through to device default */
    }
    const browserTag =
      (Array.isArray(window.navigator.languages) &&
        window.navigator.languages[0]) ||
      window.navigator.language ||
      '';
    const subtag = primarySubtag(browserTag);
    if (subtag && isLocale(subtag)) setLocaleState(subtag);
    setMounted(true);
  }, []);

  // Keep <html lang>/<html dir> in sync + persist. Guarded by `mounted`
  // so the default-locale first paint can never overwrite a saved
  // preference (or flash the wrong lang/dir) before resolution finishes.
  // Every consumer re-renders through context, so switching never needs
  // a reload.
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = getDirection(locale);
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale, mounted]);

  const setLocale = useCallback((code: string) => {
    if (isLocale(code)) setLocaleState(code);
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const dict = getDictionary(locale);
    const fallback = getDictionary(DEFAULT_LOCALE);
    const resolve = (key: string): unknown => {
      const hit = lookup(dict, key);
      if (hit !== undefined) return hit;
      const fb = lookup(fallback, key);
      return fb !== undefined ? fb : key;
    };
    return {
      locale,
      dir: getDirection(locale),
      setLocale,
      t: (key: string) => {
        const hit = resolve(key);
        return typeof hit === 'string' ? hit : key;
      },
      tp: <T,>(key: string) => resolve(key) as T,
    };
  }, [locale, setLocale]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
