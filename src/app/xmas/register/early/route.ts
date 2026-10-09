import { type NextRequest, NextResponse } from "next/server";
import {
  EARLY_ACCESS_COOKIE_NAME,
  hashEarlyAccessKey,
  isValidEarlyAccessKey,
} from "../early-access";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 3; // 3 days

export function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  const response = NextResponse.redirect(
    new URL("/xmas/register", request.url),
  );

  if (key && isValidEarlyAccessKey(key)) {
    response.cookies.set(EARLY_ACCESS_COOKIE_NAME, hashEarlyAccessKey(key), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  }

  return response;
}
