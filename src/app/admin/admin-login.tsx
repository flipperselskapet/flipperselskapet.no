"use client";

import { useState } from "react";
import { verifyAdminPassword } from "./login-actions";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "./ui";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const result = await verifyAdminPassword(password);

    if (result.success) {
      // Reload the page to show admin content
      window.location.reload();
    } else {
      setError(result.error || "Invalid password");
      setPassword("");
    }

    setIsSubmitting(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Admin</CardTitle>
          <CardDescription>
            Enter the admin password to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-md border border-(color:--destructive) px-3 py-2 text-sm text-(color:--destructive)"
              >
                {error}
              </p>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Verifying..." : "Log in"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-(color:--muted-foreground) underline hover:text-(color:--foreground)"
            >
              ← Back to site
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
