import { and, isNotNull, isNull } from "drizzle-orm";
import type { Metadata } from "next";
import { AdminLink } from "../admin-link";
import { db } from "~/db";
import { registrations } from "~/db/schema";

export const metadata: Metadata = {
  title: "Registered Players - XMAS Matchplay Open 2025",
  description: "List of registered players for XMAS Matchplay Open 2025",
};

export default async function PlayersPage() {
  // Fetch all verified registrations that are not deleted
  const players = await db
    .select({
      id: registrations.id,
      firstName: registrations.firstName,
      lastName: registrations.lastName,
      ifpaNumber: registrations.ifpaNumber,
      mainTournament: registrations.mainTournament,
      warmupTournament: registrations.warmupTournament,
      sideTournament: registrations.sideTournament,
      verifiedAt: registrations.verifiedAt,
    })
    .from(registrations)
    .where(
      and(isNull(registrations.deletedAt), isNotNull(registrations.verifiedAt)),
    )
    .orderBy(registrations.lastName, registrations.firstName);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="relative overflow-hidden bg-black/40 border-b-4 border-cyan-500">
        <div className="absolute inset-0 bg-[url(/wall.jpg)] opacity-20 bg-cover bg-center" />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <h1 className="neon-logo text-5xl md:text-7xl mb-4">
            REGISTERED PLAYERS
          </h1>
          <p className="text-xl text-cyan-100 font-semibold">
            XMAS Matchplay Open 2025
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg border-2 border-cyan-500/50 p-8 backdrop-blur-sm shadow-2xl">
          {/* Player Count */}
          <div className="mb-8 text-center">
            <div className="text-5xl font-bold text-cyan-300 mb-2">
              {players.length}
            </div>
            <div className="text-xl text-gray-300 mb-4">
              {players.length === 1
                ? "Registered Player"
                : "Registered Players"}
            </div>
            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm text-blue-200">
                <strong>ℹ️ Note:</strong> Your name might not appear immediately
                after registering. All registrations are reviewed and verified
                before being added to this list.
              </p>
            </div>
          </div>

          {/* Players List */}
          {players.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-xl mb-2">No players registered yet</p>
              <p className="text-sm">
                Be the first to{" "}
                <a
                  href="/xmas/register"
                  className="text-cyan-400 hover:text-cyan-200 underline"
                >
                  register
                </a>
                !
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-200">
                <thead className="text-sm uppercase bg-slate-800/50 text-cyan-300 border-b-2 border-cyan-500/50">
                  <tr>
                    <th className="px-6 py-4">Player Name</th>
                    <th className="px-6 py-4">IFPA Number</th>
                    <th className="px-6 py-4">Tournaments</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player) => {
                    const tournaments = [];
                    if (player.mainTournament) tournaments.push("Main");
                    if (player.warmupTournament) tournaments.push("Warmup");
                    if (player.sideTournament) tournaments.push("Side");

                    return (
                      <tr
                        key={player.id}
                        className="border-b border-slate-700/50 hover:bg-slate-800/30"
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-lg">
                            {player.firstName} {player.lastName}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {player.ifpaNumber ? (
                            <a
                              href={`https://www.ifpapinball.com/player.php?p=${player.ifpaNumber}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-200 underline"
                            >
                              {player.ifpaNumber}
                            </a>
                          ) : (
                            <span className="text-gray-500">TBD</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {tournaments.map((t) => (
                              <span
                                key={t}
                                className={`text-xs px-2 py-1 rounded ${
                                  t === "Main"
                                    ? "bg-purple-900/50 text-purple-200"
                                    : t === "Warmup"
                                      ? "bg-cyan-900/50 text-cyan-200"
                                      : "bg-pink-900/50 text-pink-200"
                                }`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center space-y-2">
          <div>
            <a
              href="/xmas"
              className="text-cyan-400 hover:text-cyan-200 underline"
            >
              ← Back to tournament information
            </a>
          </div>
          <div>
            <AdminLink />
          </div>
        </div>
      </div>
    </div>
  );
}
