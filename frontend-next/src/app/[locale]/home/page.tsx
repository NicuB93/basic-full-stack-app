"use client";

import { Link } from "@/components/Link";
import { useTranslation } from "@/i18n/useTranslation";
import { rootRoutes } from "@/utils/routes";

export default function Home() {
  const { t } = useTranslation("home");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">{t("Welcome to MyApp")}</h1>
        <p className="text-xl text-foreground/60 mb-8">
          {t(
            "A modern full-stack application with authentication and multilingual support"
          )}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href={rootRoutes.register}
            className="px-6 py-3 bg-foreground text-background rounded-md font-medium hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
          >
            {t("Get Started")}
          </Link>
          <Link
            href={rootRoutes.about}
            className="px-6 py-3 border border-black/[.08] dark:border-white/[.145] rounded-md font-medium hover:bg-black/[.05] dark:hover:bg-white/[.06] transition-colors"
          >
            {t("Learn More")}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 bg-white dark:bg-[#1a1a1a] rounded-lg border border-black/[.08] dark:border-white/[.145]">
          <div className="text-3xl mb-3">🔐</div>
          <h3 className="text-lg font-semibold mb-2">
            {t("Secure Authentication")}
          </h3>
          <p className="text-sm text-foreground/60">
            {t(
              "Built-in user authentication with NextAuth.js for secure login and registration"
            )}
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-[#1a1a1a] rounded-lg border border-black/[.08] dark:border-white/[.145]">
          <div className="text-3xl mb-3">🌍</div>
          <h3 className="text-lg font-semibold mb-2">
            {t("Multilingual Support")}
          </h3>
          <p className="text-sm text-foreground/60">
            {t(
              "Switch between English and Romanian languages with a single click"
            )}
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-[#1a1a1a] rounded-lg border border-black/[.08] dark:border-white/[.145]">
          <div className="text-3xl mb-3">🎨</div>
          <h3 className="text-lg font-semibold mb-2">{t("Modern Design")}</h3>
          <p className="text-sm text-foreground/60">
            {t(
              "Clean interface with Tailwind CSS and automatic dark mode support"
            )}
          </p>
        </div>
      </div>

      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-12 border border-blue-200 dark:border-blue-800">
        <h2 className="text-3xl font-bold mb-4">
          {t("Ready to get started?")}
        </h2>
        <p className="text-foreground/60 mb-6">
          {t("Create your account today and explore all features")}
        </p>
        <Link
          href={rootRoutes.register}
          className="inline-block px-8 py-3 bg-foreground text-background rounded-md font-medium hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
        >
          {t("Sign Up Now")}
        </Link>
      </div>
    </div>
  );
}
