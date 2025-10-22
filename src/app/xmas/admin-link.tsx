import { checkAdminAuth } from "./admin/login-actions";

export async function AdminLink() {
  const isAuthenticated = await checkAdminAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <a
      href="/xmas/admin"
      className="text-purple-400 hover:text-purple-200 underline"
    >
      → Admin Panel
    </a>
  );
}
