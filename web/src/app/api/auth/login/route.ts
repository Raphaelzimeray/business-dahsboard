import { NextResponse, type NextRequest } from "next/server";

const AUTH_COOKIE = "bizdash_session";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");

  // Mock auth : on accepte tout tant que non vide
  if (!email || !password) {
    const url = new URL("/login", req.url);
    url.searchParams.set("error", "missing");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url);
  }

  const safeNext = next.startsWith("/") ? next : "/dashboard";
  const res = NextResponse.redirect(new URL(safeNext, req.url));

  res.cookies.set(AUTH_COOKIE, "demo", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  });

  return res;
}
