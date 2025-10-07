export const locales = ['en', 'ro'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];
