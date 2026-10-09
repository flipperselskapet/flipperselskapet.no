"use client";

import { logoutAdmin } from "./login-actions";
import { Button } from "./ui";

export function LogoutButton() {
  async function handleLogout() {
    await logoutAdmin();
    window.location.reload();
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      Log out
    </Button>
  );
}
