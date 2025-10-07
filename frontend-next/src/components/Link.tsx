"use client";

import type { Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

// Get current locale from pathname
const getLocaleFromPathname = (pathname: string): Locale => {
  const locale = pathname.split("/")[1];
  return locale === "en" || locale === "ro" ? locale : defaultLocale;
};

// Custom Link component that automatically adds locale
export const Link = ({ href, ...props }: ComponentProps<typeof NextLink>) => {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  // Don't modify external links or anchors
  if (
    typeof href === "string" &&
    (href.startsWith("http") || href.startsWith("#"))
  ) {
    return <NextLink href={href} {...props} />;
  }

  // Add locale prefix if not already present
  const localizedHref =
    typeof href === "string"
      ? href.startsWith("/") && !href.startsWith(`/${locale}`)
        ? `/${locale}${href}`
        : href
      : href;

  return <NextLink href={localizedHref} {...props} />;
};
