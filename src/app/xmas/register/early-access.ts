import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { checkAdminAuth } from "~/app/admin/login-actions";
import { env } from "~/env";

export const EARLY_ACCESS_COOKIE_NAME = "xmas_early_access";

// The cookie holds a hash of the key, so rotating the key revokes old links.
export function hashEarlyAccessKey(key: string) {
  return createHash("sha256").update(key).digest("hex");
}

export function isValidEarlyAccessKey(key: string | null) {
  const expected = env.PREREGISTRATION_KEY;
  if (!expected || !key) return false;
  return safeEqual(hashEarlyAccessKey(key), hashEarlyAccessKey(expected));
}

function safeEqual(a: string, b: string) {
  return (
    a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b))
  );
}

// Admins and holders of the secret early-access link may register before the
// public opening time.
export async function canRegisterEarly() {
  if (await checkAdminAuth()) return true;

  const expected = env.PREREGISTRATION_KEY;
  if (!expected) return false;

  const cookieStore = await cookies();
  const value = cookieStore.get(EARLY_ACCESS_COOKIE_NAME)?.value;
  return !!value && safeEqual(value, hashEarlyAccessKey(expected));
}
