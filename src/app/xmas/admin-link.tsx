import { checkAdminAuth } from "./admin/login-actions";

export async function AdminLink() {
  const isAuthenticated = await checkAdminAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <a
      href="/xmas/admin"
      className="text-saw-ash font-semibold underline hover:text-saw-blood-light"
    >
      → Admin Panel
    </a>
  );
}
