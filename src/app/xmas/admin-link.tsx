import { checkAdminAuth } from "~/app/admin/login-actions";

export async function AdminLink() {
  const isAuthenticated = await checkAdminAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <a
      href="/admin"
      className="text-saw-ash font-semibold underline hover:text-saw-blood-light"
    >
      → Admin Panel
    </a>
  );
}
