import { and, isNotNull, isNull } from "drizzle-orm";
import type { Metadata } from "next";
import { Backglass, Bumper, Link, Page, Plate } from "~/components/em";
import { db } from "~/db";
import { registrations } from "~/db/schema";
import { XmasFooter } from "../footer";

export const metadata: Metadata = {
  title: "Registered Players - XMAS Matchplay Open 2026",
  description: "List of registered players for XMAS Matchplay Open 2026",
};

const chipClass: Record<string, string> = {
  Main: "bg-em-blue text-em-paper",
  Warmup: "bg-em-teal text-em-paper",
  Side: "bg-em-red text-em-paper",
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
      createdAt: registrations.createdAt,
    })
    .from(registrations)
    .where(
      and(isNull(registrations.deletedAt), isNotNull(registrations.verifiedAt)),
    )
    .orderBy(registrations.createdAt);

  return (
    <Page>
      <Backglass kicker="XMAS Matchplay Open 2026">
        <h1 className="em-title font-display text-5xl md:text-7xl leading-none mb-10">
          Registered Players
        </h1>
        <Bumper
          top="PLAYERS"
          big={String(players.length)}
          label={
            players.length === 1 ? "Registered player" : "Registered players"
          }
        />
      </Backglass>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="max-w-2xl mx-auto mb-8">
          <Plate accent="yellow">
            <strong>Note:</strong> Your name might not appear immediately after
            registering. All registrations are reviewed and verified before
            being added to this list.
          </Plate>
        </div>

        <div className="em-panel p-4 md:p-6 mb-10">
          {players.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-label font-bold uppercase tracking-wide text-2xl mb-2">
                No players registered yet
              </p>
              <p className="text-sm">
                Be the first to <Link href="/xmas/register">register</Link>!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="font-label uppercase tracking-wide text-sm bg-em-ink text-em-paper">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Player Name</th>
                    <th className="px-4 py-3">IFPA Number</th>
                    <th className="px-4 py-3 rounded-r-lg">Tournaments</th>
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
                        className="border-b-2 border-dashed border-em-ink/20 last:border-0"
                      >
                        <td className="px-4 py-3 font-semibold text-lg">
                          {player.firstName} {player.lastName}
                        </td>
                        <td className="px-4 py-3">
                          {player.ifpaNumber ? (
                            <Link
                              href={`https://www.ifpapinball.com/player.php?p=${player.ifpaNumber}`}
                              external
                            >
                              {player.ifpaNumber}
                            </Link>
                          ) : (
                            <span className="opacity-50">TBD</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            {tournaments.map((t) => (
                              <span
                                key={t}
                                className={`font-label font-bold uppercase tracking-wide text-xs px-2.5 py-0.5 rounded-full border-2 border-em-ink ${chipClass[t]}`}
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

        <XmasFooter>
          <p>
            <Link href="/xmas">← Tournament information</Link>
          </p>
        </XmasFooter>
      </main>
    </Page>
  );
}
