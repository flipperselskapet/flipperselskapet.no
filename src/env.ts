import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_POSTGRES_URL: z.url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    TURNSTILE_SECRET_KEY: z.string().min(1),
    AUTO_VERIFY_LIMIT: z.coerce.number().int().positive().default(50),
    ADMIN_PASSWORD: z.string().min(8),
    SLACK_WEBHOOK_URL: z.string().url().optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_POSTGRES_URL: process.env.DATABASE_POSTGRES_URL,
    NODE_ENV: process.env.NODE_ENV,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    AUTO_VERIFY_LIMIT: process.env.AUTO_VERIFY_LIMIT,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
