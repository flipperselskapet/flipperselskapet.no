import { and, isNotNull, isNull } from "drizzle-orm";
import type { Metadata } from "next";
import { db } from "~/db";
import { registrations } from "~/db/schema";
import { Footer, Hero, Link, Note, Page, SawBlade, Title } from "../saw";

export const metadata: Metadata = {
  title: "Registered Players - XMAS Matchplay Open 2026",
  description: "List of registered players for XMAS Matchplay Open 2026",
};

const chipClass: Record<string, string> = {
  Main: "bg-saw-blood-dark border-saw-blood-light",
  Warmup: "bg-saw-steel border-saw-ash",
  Side: "bg-saw-rust border-[#c47a52]",
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
      <Hero kicker="XMAS Matchplay Open 2026">
        <Title size="text-5xl md:text-8xl">Registered Players</Title>
        <SawBlade
          top="PLAYERS"
          big={String(players.length)}
          label={
            players.length === 1 ? "Registered player" : "Registered players"
          }
        />
      </Hero>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="max-w-2xl mx-auto mb-8">
          <Note>
            <strong>Note:</strong> Your name might not appear immediately after
            registering. All registrations are reviewed and verified before
            being added to this list.
          </Note>
        </div>

        <div className="saw-panel p-4 md:p-8 mb-10">
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
                <thead className="font-label uppercase tracking-wide text-sm bg-black/60 text-saw-blood-light border-b border-saw-blood">
                  <tr>
                    <th className="px-4 py-3">Player Name</th>
                    <th className="px-4 py-3">IFPA Number</th>
                    <th className="px-4 py-3">Tournaments</th>
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
                        className="border-b border-dashed border-saw-steel last:border-0"
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
                                className={`font-label font-bold uppercase tracking-wide text-xs px-2.5 py-0.5 rounded-sm border text-saw-bone ${chipClass[t]}`}
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

        <Footer>
          <p>
            <Link href="/xmas">← Tournament information</Link>
          </p>
        </Footer>
      </main>
    </Page>
  );
}
