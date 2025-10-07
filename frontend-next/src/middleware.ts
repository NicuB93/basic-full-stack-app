import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

import { rootRoutes } from "./utils/routes";
import { locales, defaultLocale } from "./i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

export default withAuth(
  async function middleware(req) {
    const sessionToken = req.nextauth.token;
    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    // Get saved locale from cookie
    const savedLocale = req.cookies.get(LOCALE_COOKIE)?.value;
    const isValidLocale = (locale: string | undefined): locale is 'en' | 'ro' => {
      return locale === 'en' || locale === 'ro';
    };
    const preferredLocale = isValidLocale(savedLocale) ? savedLocale : defaultLocale;

    // Check if pathname starts with a locale
    const pathnameHasLocale = locales.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    // Redirect to preferred locale if no locale in path
    if (!pathnameHasLocale) {
      url.pathname = `/${preferredLocale}${pathname}`;
      const response = NextResponse.redirect(url);
      response.cookies.set(LOCALE_COOKIE, preferredLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365 // 1 year
      });
      return response;
    }

    // Extract current locale from pathname
    const currentLocale = pathname.split('/')[1];

    // Update cookie if locale changed
    const response = NextResponse.next();
    if (isValidLocale(currentLocale) && currentLocale !== savedLocale) {
      response.cookies.set(LOCALE_COOKIE, currentLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365 // 1 year
      });
    }

    const isRegisterPage = pathname.includes(rootRoutes.register);
    const isLoginPage = pathname.includes(rootRoutes.login);
    const localePattern = new RegExp(`^/(${locales.join('|')})$`);
    const isLocaleRoot = localePattern.test(pathname);

    // redirect to /locale/home if user accesses /locale
    if (isLocaleRoot) {
      const locale = pathname.substring(1);
      url.pathname = `/${locale}${rootRoutes.home}`;
      const redirectResponse = NextResponse.redirect(url, { status: 302 });
      redirectResponse.cookies.set(LOCALE_COOKIE, locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365
      });
      return redirectResponse;
    }

    if (sessionToken) {
      // redirect to home if user is logged in and tries to access login or register page
      if (isLoginPage || isRegisterPage) {
        const locale = pathname.split('/')[1];
        url.pathname = `/${locale}${rootRoutes.home}`;
        return NextResponse.redirect(url, { status: 302 });
      }
      return response;
    }

    return response;
  },
  {
    callbacks: {
      authorized() {
        // Return true so that the middleware function above is always called.
        return true;
      },
    },
  }
);
