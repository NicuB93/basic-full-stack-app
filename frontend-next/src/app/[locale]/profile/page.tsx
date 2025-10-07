import { getServerSession } from "next-auth";
import { unauthorized } from "next/navigation";

import { getProfile } from "@/generated";
import type { Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/utils";
import { getAuthOptions } from "../../api/auth/[...nextauth]/authOptions";

interface ProfilePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const isAuthenticated = await getServerSession(getAuthOptions);

  const { locale } = await params;

  if (!isAuthenticated) {
    unauthorized();
  }

  const profileResponse = await getProfile();
  const profile = profileResponse.data;

  const translations = await getTranslations(locale);
  const t = (key: string) => translations.profile?.[key] || key;

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-foreground/60">
          {t("Unable to load profile data")}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t("Profile")}</h1>
        <p className="text-foreground/60">
          {t("View and manage your account information")}
        </p>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-black/[.08] dark:border-white/[.145] p-8 shadow-sm">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-black/[.08] dark:border-white/[.145]">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
            {profile.user.email?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-1">
              {profile.user.email}
            </h2>
            <p className="text-sm text-foreground/60">
              {t("User ID")}: {profile.user.id}
            </p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold mb-4">
            {t("Account Information")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/60">
                {t("User ID")}
              </label>
              <div className="text-base font-mono bg-black/[.05] dark:bg-white/[.06] px-4 py-3 rounded-md">
                {profile.user.id}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/60">
                {t("Email Address")}
              </label>
              <div className="text-base bg-black/[.05] dark:bg-white/[.06] px-4 py-3 rounded-md">
                {profile.user.email}
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <span className="font-semibold">✓</span>{" "}
              {t("Your account is active and verified")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
