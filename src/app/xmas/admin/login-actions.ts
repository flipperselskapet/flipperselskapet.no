"use server";

import { cookies } from "next/headers";
import { env } from "~/env";

const ADMIN_COOKIE_NAME = "xmas_admin_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function verifyAdminPassword(password: string) {
  if (password === env.ADMIN_PASSWORD) {
    // Set a secure cookie
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    return { success: true };
  }

  return { success: false, error: "Invalid password" };
}

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(ADMIN_COOKIE_NAME);
  return authCookie?.value === "authenticated";
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
