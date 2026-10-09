import type { Metadata } from "next";
import { AdminLogin } from "./admin-login";
import { AdminNav } from "./admin-nav";
import "./admin-theme.css";
import { checkAdminAuth } from "./login-actions";

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

  return (
    <div className="admin-theme font-sans antialiased">
      {isAuthenticated ? (
        <>
          <AdminNav />
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
