import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";
import { signSession } from "@/lib/session";

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  const next = String(form.get("next") || "/dashboard");

  if (!email || !password) {
    return NextResponse.redirect(new URL(`/login?error=missing&next=${encodeURIComponent(next)}`, req.url));
  }

  const adminEmail = process.env.ADMIN_EMAIL || "";
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  const ok = email === adminEmail && password === adminPassword;

  if (!ok) {
    return NextResponse.redirect(new URL(`/login?error=invalid&next=${encodeURIComponent(next)}`, req.url));
  }

  const token = signSession({ sub: email, role: "admin" });

  const res = NextResponse.redirect(new URL(next, req.url));
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return res;
}
