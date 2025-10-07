import { UserResponseDto } from "@/generated";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** Oauth access token */
      accessToken?: string;
    } & {
      id: UserResponseDto["id"];
      name: UserResponseDto["name"];
      email: UserResponseDto["email"];
    };
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: UserResponseDto["id"];
    name: UserResponseDto["name"];
    email: UserResponseDto["email"];
    accessToken?: string;
    accessTokenExpires?: number;
  }
}
