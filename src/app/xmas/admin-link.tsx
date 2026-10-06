import { checkAdminAuth } from "./admin/login-actions";

export async function AdminLink() {
  const isAuthenticated = await checkAdminAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <a
      href="/xmas/admin"
      className="text-em-blue font-semibold underline hover:text-em-red"
    >
      → Admin Panel
    </a>
  );
}
