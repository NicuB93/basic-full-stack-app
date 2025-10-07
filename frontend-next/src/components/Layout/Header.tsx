"use client";

import { Locale } from "@/i18n/config";
// import { usePathname } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useTranslation } from "@/i18n/useTranslation";
import { rootRoutes } from "@/utils/routes";
import { signOut, useSession } from "next-auth/react";
import { usePathname as useDefaultPathname, useRouter } from "next/navigation";
import { Link } from "../Link";

export const Header = () => {
  const defaultRouter = useRouter();
  const pathname = usePathname();
  const defaultPathname = useDefaultPathname();
  const { data: session, status } = useSession();
  const { locale, t } = useTranslation("common");

  const switchLocale = (locale: Locale) => {
    defaultRouter.push(`/${locale}/${pathname}`);
  };

  const isActive = (path: string) => defaultPathname === `/${locale}${path}`;

  const handleLogout = async () => {
    await signOut({ callbackUrl: `/${locale}/home` });
  };

  return (
    <header className="border-b border-black/[.08] dark:border-white/[.145] bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Nav Links */}
          <div className="flex items-center gap-8">
            <Link
              href={rootRoutes.home}
              className="text-xl font-semibold hover:opacity-80 transition-opacity"
            >
              MyApp
            </Link>

            <div className="hidden sm:flex items-center gap-6">
              <Link
                href={rootRoutes.home}
                className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                  isActive("/home") ? "text-foreground" : "text-foreground/60"
                }`}
              >
                {t("Home")}
              </Link>
              <Link
                href={rootRoutes.about}
                className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                  isActive("/about") ? "text-foreground" : "text-foreground/60"
                }`}
              >
                {t("About")}
              </Link>
            </div>
          </div>

          {/* Auth Buttons & Language Switcher */}
          <div className="flex items-center gap-4">
            {/* Auth Buttons */}
            {status === "loading" ? (
              <div className="w-20 h-9 bg-black/[.05] dark:bg-white/[.06] rounded-md animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-3">
                <Link
                  href={rootRoutes.profile}
                  className="text-sm text-foreground/60 hover:text-foreground hidden sm:inline transition-colors"
                >
                  {session.user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium rounded-md border border-black/[.08] dark:border-white/[.145] hover:bg-black/[.05] dark:hover:bg-white/[.06] transition-colors"
                >
                  {t("Logout")}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href={rootRoutes.login}
                  className="px-4 py-2 text-sm font-medium rounded-md border border-black/[.08] dark:border-white/[.145] hover:bg-black/[.05] dark:hover:bg-white/[.06] transition-colors"
                >
                  {t("Login")}
                </Link>
                <Link
                  href={rootRoutes.register}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
                >
                  {t("Register")}
                </Link>
              </div>
            )}

            {/* Language Switcher */}
            <div className="flex items-center gap-1 border border-black/[.08] dark:border-white/[.145] rounded-md overflow-hidden">
              <button
                onClick={() => switchLocale("en")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${
                  locale === "en"
                    ? "bg-black/[.05] dark:bg-white/[.06]"
                    : "hover:bg-black/[.03] dark:hover:bg-white/[.03]"
                }`}
                aria-label="Switch to English"
              >
                <span className="text-base leading-none">🇬🇧</span>
                <span className="hidden sm:inline">EN</span>
              </button>
              <div className="w-px h-6 bg-black/[.08] dark:bg-white/[.145]" />
              <button
                onClick={() => switchLocale("ro")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${
                  locale === "ro"
                    ? "bg-black/[.05] dark:bg-white/[.06]"
                    : "hover:bg-black/[.03] dark:hover:bg-white/[.03]"
                }`}
                aria-label="Switch to Romanian"
              >
                <span className="text-base leading-none">🇷🇴</span>
                <span className="hidden sm:inline">RO</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex gap-4 pb-3">
          <Link
            href={rootRoutes.home}
            className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
              isActive("/home") ? "text-foreground" : "text-foreground/60"
            }`}
          >
            {t("Home")}
          </Link>
          <Link
            href={rootRoutes.about}
            className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
              isActive("/about") ? "text-foreground" : "text-foreground/60"
            }`}
          >
            {t("About")}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
