import { getServerSession } from "next-auth";

import { getAuthOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import type { CreateClientConfig } from "@/generated/client.gen";

console.log("process env test", process.env.NEXT_PUBLIC_BE_URL);

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: process.env.NEXT_PUBLIC_BE_URL ?? "",
  auth: async () => {
    if (typeof window === "undefined") {
      const session = await getServerSession(getAuthOptions);
      return session?.user?.accessToken ?? "";
    }
    const { getSession } = await import("next-auth/react");
    const session = await getSession();
    return session?.user?.accessToken ?? "";
  },
});
