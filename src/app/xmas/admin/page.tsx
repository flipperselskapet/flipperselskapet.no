import type { Metadata } from "next";
import { db } from "~/db";
import { registrations } from "~/db/schema";
import { isNull } from "drizzle-orm";
import { AdminRegistrationRow } from "./registration-row";
import { checkAdminAuth } from "./login-actions";
import { AdminLogin } from "./admin-login";
import { LogoutButton } from "./logout-button";

export const metadata: Metadata = {
  title: "Admin - XMAS Matchplay Open 2025",
  description: "Manage tournament registrations",
};

export default async function AdminPage() {
  // Check if user is authenticated
  const isAuthenticated = await checkAdminAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // Fetch all registrations (excluding soft-deleted ones)
  const allRegistrations = await db
    .select()
    .from(registrations)
    .where(isNull(registrations.deletedAt))
    .orderBy(registrations.createdAt);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="relative overflow-hidden bg-black/40 border-b-4 border-cyan-500">
        <div className="absolute inset-0 bg-[url(/wall.jpg)] opacity-20 bg-cover bg-center" />
        <div className="relative container mx-auto px-4 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-cyan-300 mb-2">
                Tournament Admin
              </h1>
              <p className="text-xl text-cyan-100">
                XMAS Matchplay Open 2025 - Registrations
              </p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg border-2 border-cyan-500/50 p-6 backdrop-blur-sm shadow-2xl">
          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-cyan-900/30 border border-cyan-500/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-cyan-300">
                {allRegistrations.length}
              </div>
              <div className="text-sm text-gray-300">Total</div>
            </div>
            <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-300">
                {allRegistrations.filter((r) => r.verifiedAt).length}
              </div>
              <div className="text-sm text-gray-300">Verified</div>
            </div>
            <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-purple-300">
                {allRegistrations.filter((r) => r.paidAt).length}
              </div>
              <div className="text-sm text-gray-300">Paid</div>
            </div>
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-yellow-300">
                {
                  allRegistrations.filter((r) => !r.verifiedAt || !r.paidAt)
                    .length
                }
              </div>
              <div className="text-sm text-gray-300">Pending</div>
            </div>
          </div>

          {/* Registrations Table */}
          {allRegistrations.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-xl mb-2">No registrations yet</p>
              <p className="text-sm">
                Registrations will appear here once players sign up
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-200">
                <thead className="text-xs uppercase bg-slate-800/50 text-cyan-300 border-b-2 border-cyan-500/50">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">IFPA</th>
                    <th className="px-4 py-3">Tournaments</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allRegistrations.map((registration) => (
                    <AdminRegistrationRow
                      key={registration.id}
                      registration={registration}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <a
            href="/xmas"
            className="text-cyan-400 hover:text-cyan-200 underline"
          >
            ← Back to tournament information
          </a>
        </div>
      </div>
    </div>
  );
}
