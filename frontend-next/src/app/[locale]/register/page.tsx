"use client";

import { Link } from "@/components/Link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { register } from "@/generated";
import { rootRoutes } from "@/utils/routes";
import { signIn } from "next-auth/react";
import { useTranslation } from "@/i18n/useTranslation";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation("auth");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await register({
        body: {
          name,
          email,
          password,
        },
      });

      if (response.data) {
        const result = await signIn("credentials", {
          username: email,
          password: password,
          redirect: false,
        });

        if (result?.ok) {
          router.push("/");
          router.refresh();
        }
      }
    } catch (_err) {
      console.error("Registration error:", _err);
      setError(t("Something went wrong. Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-black/[.08] dark:border-white/[.145] p-8 shadow-sm">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            {t("Create an Account")}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-1.5"
              >
                {t("Name")}
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-black/[.08] dark:border-white/[.145] rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-foreground/20"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1.5"
              >
                {t("Email")}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-black/[.08] dark:border-white/[.145] rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-foreground/20"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1.5"
              >
                {t("Password")}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2 border border-black/[.08] dark:border-white/[.145] rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-foreground/20"
                placeholder="••••••••"
              />
              <p className="text-xs text-foreground/60 mt-1">
                {t("Must be at least 6 characters")}
              </p>
            </div>

            {error && (
              <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-foreground text-background py-2.5 rounded-md font-medium hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t("Creating account...") : t("Sign Up")}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-foreground/60">
              {t("Already have an account?")}{" "}
            </span>
            <Link
              href={rootRoutes.login}
              className="font-medium hover:underline"
            >
              {t("Log in")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
