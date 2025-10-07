import type { Metadata } from "next";

import { Layout } from "@/components/Layout";
import { locales } from "@/i18n/config";
import { AuthProvider } from "@/providers/AuthProvider";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Full Stack App with Translation",
  description: "A modern full-stack application",
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Layout>{children}</Layout>
    </AuthProvider>
  );
}
