import { NextResponse, type NextRequest } from "next/server";

const AUTH_COOKIE = "bizdash_session";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const isDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname === "/login";

  const session = req.cookies.get(AUTH_COOKIE)?.value;

  // 1) Not logged in -> block dashboard
  if (!session && isDashboard) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname + search);
    return NextResponse.redirect(url);
  }

  // 2) Logged in -> avoid login page
  if (session && isLogin) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
