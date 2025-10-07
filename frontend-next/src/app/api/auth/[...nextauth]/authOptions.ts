import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { login } from "@/generated";
import { parseJwtSSR } from "@/lib/server/utils/auth";

export const getAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let data;

        try {
          console.log("Attempting to log in user:", credentials?.username);
          const response = await login({
            body: {
              email: credentials?.username || "",
              password: credentials?.password || "",
            },
          });
          data = response.data;

          const result = data;

          if (result.accessToken) {
            const accessTokenPayload = parseJwtSSR(result.accessToken);

            if (!accessTokenPayload) {
              throw new Error(
                JSON.stringify({
                  detail: {
                    global:
                      "Could not authenticate you. Token invalid. Please contact support.",
                  },
                })
              );
            }

            return {
              id: result.user.id,
              email: result.user.email,
              name: result.user.name,
              accessToken: result.accessToken,
              accessTokenExpires: accessTokenPayload.exp * 1000,
            };
          }

          return null;
        } catch (error) {
          throw new Error(
            JSON.stringify({
              detail: {
                global: `Could not authenticate you. Please contact support. Something went wrong. ${JSON.stringify(
                  error
                )}`,
              },
            })
          );
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;

        if ("accessToken" in user) {
          token.accessToken = user.accessToken;
        }
        if ("accessTokenExpires" in user) {
          token.accessTokenExpires = user.accessTokenExpires;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        const extendedUser = session.user;
        extendedUser.id = parseInt(token.id as string, 10);
        extendedUser.email = token.email as string;
        extendedUser.name = token.name as string;
        extendedUser.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
