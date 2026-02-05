import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";
import { verifySession } from "@/lib/session";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const isProtected = pathname.startsWith("/dashboard");
  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get(COOKIE_NAME)?.value;
  const session = token ? verifySession(token) : null;

  if (!session) {
    const next = `${pathname}${search}`;
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", next);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
