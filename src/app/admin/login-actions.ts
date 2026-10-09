"use server";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { env } from "~/env";

const ADMIN_COOKIE_NAME = "xmas_admin_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// The session cookie holds an HMAC keyed with the admin password, so it can't
// be forged without knowing the password. Changing the password logs everyone
// out.
function sessionToken() {
  return createHmac("sha256", env.ADMIN_PASSWORD)
    .update("admin-session")
    .digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function verifyAdminPassword(password: string) {
  if (safeEqual(password, env.ADMIN_PASSWORD)) {
    // Set a secure cookie
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, sessionToken(), {
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
  return !!authCookie && safeEqual(authCookie.value, sessionToken());
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
