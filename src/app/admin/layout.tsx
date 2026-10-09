import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminLogin } from "./admin-login";
import { AdminNav } from "./admin-nav";
import "./admin-theme.css";
import { checkAdminAuth } from "./login-actions";
import { ADMIN_THEME_COOKIE, parseAdminTheme } from "./theme";

export const metadata: Metadata = {
  title: { default: "Admin - Flipperselskapet", template: "%s - Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await checkAdminAuth();
  const theme = parseAdminTheme(
    (await cookies()).get(ADMIN_THEME_COOKIE)?.value,
  );

  return (
    <div
      className="admin-theme font-sans antialiased"
      data-theme={theme === "system" ? undefined : theme}
    >
      {isAuthenticated ? (
        <>
          <AdminNav theme={theme} />
          <main className="mx-auto max-w-6xl px-4 py-8 md:py-10">
            {children}
          </main>
        </>
      ) : (
        <AdminLogin />
      )}
    </div>
  );
}
