"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { Locale } from "./config";
import { defaultLocale } from "./config";

export const useTranslation = (namespace: string = "common") => {
  const pathname = usePathname();
  const locale = (pathname.split("/")[1] || defaultLocale) as Locale;
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadTranslations() {
      try {
        const localeModule = await import(`./locales/${locale}.json`);
        setTranslations(localeModule.default[namespace] || {});
      } catch {
        const fallback = await import(`./locales/${defaultLocale}.json`);
        setTranslations(fallback.default[namespace] || {});
      }
    }
    loadTranslations();
  }, [locale, namespace]);

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return { t, locale };
};
