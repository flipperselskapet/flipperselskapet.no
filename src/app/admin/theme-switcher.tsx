"use client";

import { useState } from "react";
import { ADMIN_THEME_COOKIE, type AdminTheme } from "./theme";
import { Button } from "./ui";

const themes: { value: AdminTheme; label: string; icon: string }[] = [
  { value: "system", label: "System", icon: "◐" },
  { value: "light", label: "Light", icon: "☀" },
  { value: "dark", label: "Dark", icon: "☾" },
];

// Cycles System → Light → Dark. The choice lives in a cookie so the server
// renders the right theme on the next visit without a flash.
export function ThemeSwitcher({ initial }: { initial: AdminTheme }) {
  const [theme, setTheme] = useState(initial);
  const index = themes.findIndex((t) => t.value === theme);
  const current = themes[index];
  const next = themes[(index + 1) % themes.length];

  function switchTheme() {
    setTheme(next.value);
    // biome-ignore lint/suspicious/noDocumentCookie: the Cookie Store API is missing in older Safari
    document.cookie = `${ADMIN_THEME_COOKIE}=${next.value}; path=/admin; max-age=31536000; samesite=lax`;
    const root = document.querySelector<HTMLElement>(".admin-theme");
    if (!root) return;
    if (next.value === "system") delete root.dataset.theme;
    else root.dataset.theme = next.value;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchTheme}
      title={`Theme: ${current.label}. Click for ${next.label.toLowerCase()}.`}
      aria-label={`Theme: ${current.label}. Switch to ${next.label}`}
    >
      <span aria-hidden="true">{current.icon}</span>
      {current.label}
    </Button>
  );
}
