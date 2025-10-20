"use client";

import { useState } from "react";
import { verifyAdminPassword } from "./login-actions";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg border-2 border-cyan-500/50 p-8 backdrop-blur-sm shadow-2xl max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-300 mb-2">
            Admin Access
          </h1>
          <p className="text-gray-300">Enter the admin password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-900/30 border border-red-500/50 text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg shadow-lg transition-all duration-200"
          >
            {isSubmitting ? "Verifying..." : "Access Admin"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/xmas"
            className="text-cyan-400 hover:text-cyan-200 underline text-sm"
          >
            ← Back to tournament information
          </a>
        </div>
      </div>
    </div>
  );
}
