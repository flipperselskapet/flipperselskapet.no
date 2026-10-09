export const ADMIN_THEME_COOKIE = "admin_theme";

export type AdminTheme = "system" | "light" | "dark";

export function parseAdminTheme(value: string | undefined): AdminTheme {
  return value === "light" || value === "dark" ? value : "system";
}
