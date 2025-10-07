import type { Locale } from "./config";
import { defaultLocale } from "./config";

type Translations = {
  [key: string]: Record<string, string>;
};

const translationsCache: Record<Locale, Translations> = {} as Record<
  Locale,
  Translations
>;

export const getTranslations = async (
  locale: Locale
): Promise<Translations> => {
  if (translationsCache[locale]) {
    return translationsCache[locale];
  }

  try {
    const translations = await import(`./locales/${locale}.json`);
    translationsCache[locale] = translations.default;
    return translations.default;
  } catch {
    const fallback = await import(`./locales/${defaultLocale}.json`);
    return fallback.default;
  }
};
