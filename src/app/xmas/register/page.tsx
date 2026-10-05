import type { Metadata } from "next";
import { connection } from "next/server";
import { isRegistrationOpen } from "./opening";
import { RegistrationForm } from "./registration-form";

export const metadata: Metadata = {
  title: "Register - XMAS Matchplay Open 2026",
  description: "Register for XMAS Matchplay Open 2026 tournament",
};

export default async function RegisterPage() {
  await connection();
  const isOpen = isRegistrationOpen();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black/40 border-b-4 border-cyan-500">
        <div className="absolute inset-0 bg-[url(/wall.jpg)] opacity-20 bg-cover bg-center" />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <h1 className="neon-logo text-5xl md:text-7xl mb-4">
            TOURNAMENT REGISTRATION
          </h1>
          <p className="text-xl text-cyan-100 font-semibold">
            XMAS Matchplay Open 2026
          </p>
        </div>
      </div>

      {/* Registration Form Section */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg border-2 border-cyan-500/50 p-8 backdrop-blur-sm shadow-2xl">
          {isOpen ? (
            <RegistrationForm />
          ) : (
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-cyan-300">
                Registration opens soon!
              </h2>
              <p className="text-2xl font-semibold text-purple-200">
                Saturday, October 10th at 12:00
              </p>
              <p className="text-gray-300">
                Dates, tournament formats and prices: TBD
              </p>
              <p className="text-gray-400 text-sm">
                Spots are limited — come back on Saturday to secure yours.
              </p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p className="mb-2">
            Questions? Contact us on{" "}
            <a
              href="/slack"
              className="text-cyan-400 hover:text-cyan-200 underline"
            >
              Slack
            </a>
          </p>
          <p>
            <a
              href="/xmas"
              className="text-cyan-400 hover:text-cyan-200 underline"
            >
              ← Back to tournament information
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
