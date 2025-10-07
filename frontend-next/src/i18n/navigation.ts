"use client";

import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  usePathname as useNextPathname,
  useRouter as useNextRouter,
} from "next/navigation";
import type { Locale } from "./config";
import { defaultLocale } from "./config";

// Get current locale from pathname
const getLocaleFromPathname = (pathname: string): Locale => {
  const locale = pathname.split("/")[1];
  return locale === "en" || locale === "ro" ? locale : defaultLocale;
};

// Custom useRouter that automatically handles locale
export const useRouter = () => {
  const router = useNextRouter();
  const pathname = useNextPathname();
  const locale = getLocaleFromPathname(pathname);

  return {
    ...router,
    push: (href: string, options?: NavigateOptions) => {
      const localizedHref =
        href.startsWith("/") && !href.startsWith(`/${locale}`)
          ? `/${locale}${href}`
          : href;
      return router.push(localizedHref, options);
    },
    replace: (href: string, options?: NavigateOptions) => {
      const localizedHref =
        href.startsWith("/") && !href.startsWith(`/${locale}`)
          ? `/${locale}${href}`
          : href;
      return router.replace(localizedHref, options);
    },
  };
};

// Custom usePathname that returns path without locale
export const usePathname = () => {
  const pathname = useNextPathname();
  const locale = getLocaleFromPathname(pathname);

  // Remove locale prefix from pathname
  return pathname.replace(`/${locale}`, "") || "/";
};

// Get current locale
export const useLocale = (): Locale => {
  const pathname = useNextPathname();
  return getLocaleFromPathname(pathname);
};
