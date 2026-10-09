"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./logout-button";
import type { AdminTheme } from "./theme";
import { ThemeSwitcher } from "./theme-switcher";
import { buttonStyles } from "./ui";

const links = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/xmas", label: "XMAS registrations" },
  { href: "/admin/machines", label: "Machines" },
];

export function AdminNav({ theme }: { theme: AdminTheme }) {
  const pathname = usePathname();

  return (
    <header className="border-b border-(color:--border) bg-(color:--card)">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <span className="font-semibold tracking-tight">Admin</span>
        <nav className="flex flex-wrap gap-1">
          {links.map((link) => {
            const active = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={buttonStyles({
                  variant: active ? "secondary" : "ghost",
                  size: "sm",
                })}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeSwitcher initial={theme} />
          <Link
            href="/"
            className={buttonStyles({ variant: "ghost", size: "sm" })}
          >
            ← Back to site
          </Link>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
