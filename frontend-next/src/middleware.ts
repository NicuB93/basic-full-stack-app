import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const sessionToken = req.nextauth.token;
    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    const isLoginPage = pathname.startsWith("/login");
    const isSignUpPage = pathname.startsWith("/register");

    if (sessionToken) {
      if (isLoginPage || isSignUpPage) {
        url.pathname = "/";
        return NextResponse.redirect(url, { status: 302 });
      }
      return NextResponse.next();
    }

    if (!sessionToken && !isLoginPage && !isSignUpPage) {
      url.pathname = "/login";
      return NextResponse.redirect(url, { status: 302 });
    }

    return NextResponse.next();
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
