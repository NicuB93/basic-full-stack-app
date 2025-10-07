"use client";

import { useTranslation } from "@/i18n/useTranslation";

export default function AboutPage() {
  const { t } = useTranslation("about");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-6">{t("About Us")}</h1>

      <div className="space-y-4 text-foreground/80">
        <p>
          {t("Welcome to our application! This is a modern full-stack application built with Next.js, featuring authentication, beautiful UI, and multilingual support.")}
        </p>

        <p>
          {t("We're committed to providing the best user experience possible, with a clean interface and powerful features.")}
        </p>

        <div className="mt-8 p-6 bg-black/[.05] dark:bg-white/[.06] rounded-lg">
          <h2 className="text-xl font-semibold mb-3">{t("Technologies Used")}</h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Next.js 15 with App Router</li>
            <li>React 19</li>
            <li>NextAuth.js for authentication</li>
            <li>Tailwind CSS for styling</li>
            <li>TypeScript for type safety</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
