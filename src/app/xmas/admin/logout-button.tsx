"use client";

import { logoutAdmin } from "./login-actions";

export function LogoutButton() {
  async function handleLogout() {
    await logoutAdmin();
    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-sm px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors"
    >
      Logout
    </button>
  );
}
