import { and, isNotNull, isNull } from "drizzle-orm";
import type { Metadata } from "next";
import { db } from "~/db";
import { registrations } from "~/db/schema";

export const metadata: Metadata = {
  title: "XMAS Matchplay Open 2025 - Kristiania Flipperselskap",
  description: "Annual pinball championship in Oslo - XMAS Matchplay Open 2025",
};

export default async function Xmas2025() {
  // Get count of verified, non-deleted registrations
  const verifiedPlayers = await db
    .select()
    .from(registrations)
    .where(
      and(isNull(registrations.deletedAt), isNotNull(registrations.verifiedAt)),
    );

  const playerCount = verifiedPlayers.length;

  // Registration opens October 22, 2025 at 20:00 Norwegian time (CEST = UTC+2)
  const registrationOpenDate = new Date("2025-10-22T18:00:00Z"); // 20:00 CEST = 18:00 UTC
  const now = new Date();
  const isRegistrationOpen = now >= registrationOpenDate;

  // Check if registration opens tomorrow (Oct 21)
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow =
    tomorrow.getDate() === registrationOpenDate.getDate() &&
    tomorrow.getMonth() === registrationOpenDate.getMonth() &&
    tomorrow.getFullYear() === registrationOpenDate.getFullYear();
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url(/wall.jpg)] opacity-10 bg-cover bg-center" />
        <div className="relative container mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="neon-logo text-5xl md:text-7xl lg:text-8xl mb-8">
            XMAS MATCHPLAY OPEN 2025
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl md:text-3xl text-white/90 font-light mb-8 leading-relaxed">
              Join us for a weekend of pinball competition in Oslo
            </p>
            <div className="space-y-6 text-base md:text-lg text-white/80 leading-relaxed">
              <p>
                Kristiania Flipperselskap is a private pinball club located in
                Oslo, Norway. With 40+ pinball machines of different eras and in
                close proximity to shops, restaurants and pubs - only 15 minutes
                outside downtown Oslo - we are excited to host another XMAS
                annual tournament.
              </p>
              <p>
                Join us for three days of intense pinball action, December
                5th-7th, 2025! This page contains all necessary information
                about registration, tournament formats, schedule, accommodation,
                food and transport.
              </p>
            </div>
            <div className="mt-8 inline-block px-6 py-3 bg-amber-500/20 border border-amber-400/40 rounded-full">
              <p className="text-amber-200 font-medium">
                Limited spots available - register early!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tournament Dates - Standalone Section */}
      <div className="container mx-auto px-4 -mt-8 mb-16 max-w-4xl">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Tournament Dates
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 pb-4 border-b border-white/10">
              <span className="text-cyan-300 font-semibold text-lg md:min-w-[220px]">
                Friday, December 5th
              </span>
              <span className="text-white/80">
                XMAS Matchplay Open Warmup 2025
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 pb-4 border-b border-white/10">
              <span className="text-purple-300 font-semibold text-lg md:min-w-[220px]">
                Saturday, December 6th
              </span>
              <div className="space-y-2 text-white/80">
                <div>XMAS Matchplay Open Main 2025 (Qualifications)</div>
                <div>XMAS Matchplay Open Side 2025</div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
              <span className="text-pink-300 font-semibold text-lg md:min-w-[220px]">
                Sunday, December 7th
              </span>
              <div className="space-y-2 text-white/80">
                <div>XMAS Matchplay Open Main 2025 (Finals)</div>
                <div>XMAS Leftovers 2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20 max-w-5xl">
        {/* Registration Section */}
        <section className="mb-16">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              Registration
            </h2>
            <div className="space-y-6">
              {isRegistrationOpen ? (
                <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl p-6 md:p-8 border border-cyan-400/30">
                  <p className="text-xl md:text-2xl mb-6 text-white font-semibold">
                    Registration is now open!
                  </p>

                  {/* Call to Action Button */}
                  <a
                    href="/xmas/register"
                    className="inline-block w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold text-lg rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 text-center mb-6"
                  >
                    Register Now →
                  </a>

                  <p className="text-white/70 mb-3">
                    Register for the main tournament and optionally join the
                    warmup and side tournaments.
                  </p>
                  <p className="text-white/50 text-sm italic mb-6">
                    Norwegian players: Vipps on arrival. International players:
                    We'll figure something out.
                  </p>

                  {/* Registered Players Link */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <a
                      href="/xmas/players"
                      className="inline-block text-cyan-300 hover:text-cyan-200 underline font-medium transition-colors"
                    >
                      View registered players →
                    </a>
                    {playerCount > 0 && (
                      <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white font-semibold text-sm">
                        {playerCount} {playerCount === 1 ? "player" : "players"}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-6 md:p-8 border border-amber-400/30">
                  <p className="text-xl md:text-2xl mb-4 text-white font-semibold">
                    {isTomorrow
                      ? "Registration opens tomorrow at 20:00 (Norwegian time)"
                      : "Registration opens at 20:00 (Norwegian time)"}
                  </p>

                  <p className="text-white/70 mb-3">
                    Register for the main tournament and optionally join the
                    warmup and side tournaments.
                  </p>
                  <p className="text-white/50 text-sm italic">
                    Norwegian players: Vipps on arrival. International players:
                    We'll figure something out.
                  </p>
                </div>
              )}

              <div className="bg-white/5 rounded-xl p-6 md:p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Entry Fees
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-white/80">
                    <div className="flex justify-between py-2 border-b border-white/10">
                      <span>XMAS Warmup</span>
                      <span className="font-semibold text-white">250 NOK</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/10">
                      <span>XMAS Main</span>
                      <span className="font-semibold text-white">350 NOK</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/10">
                      <span>XMAS Side</span>
                      <span className="font-semibold text-white">250 NOK</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>XMAS Leftovers</span>
                      <span className="font-semibold text-white">250 NOK*</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-xl p-6 flex flex-col justify-center">
                    <p className="text-white/80 mb-3 font-medium">
                      Package Deal
                    </p>
                    <p className="text-sm text-white/70 mb-2">
                      Warmup + Main + Side
                    </p>
                    <p className="text-4xl font-bold text-white mb-2">
                      750 NOK
                    </p>
                    <p className="text-cyan-300 font-medium">Save 100 NOK!</p>
                  </div>
                </div>
                <p className="text-white/50 text-sm italic mt-6">
                  * XMAS Leftovers is free for players participating in the Main
                  tournament
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-5">
                <p className="text-white/80">
                  <strong className="text-white">Pre-tournament tip:</strong>{" "}
                  Check out Illegal Pinball Club in downtown Oslo for additional
                  pinball action before the weekend!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Format Section */}
        <section className="mb-16">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              Tournament Format
            </h2>
            <div className="bg-amber-500/10 border border-amber-400/30 rounded-xl p-4 mb-8">
              <p className="text-amber-200 font-medium text-center">
                Preliminary format - Subject to change
              </p>
            </div>
            <div className="space-y-6">
              {/* XMAS Warmup Format */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-2xl font-semibold text-cyan-300 mb-4">
                  XMAS Warmup | Death Race
                </h3>
                <p className="text-white/80 mb-4 leading-relaxed">
                  The official XMAS warmup tournament is also our Stern Army
                  Monthly tournament, with the chance to win some Stern Pinball
                  goodies!
                </p>
                <ul className="space-y-2 text-white/70 mb-4">
                  <li className="flex gap-2">
                    <span className="text-cyan-300">•</span>
                    <span>
                      <strong className="text-white">Format:</strong> Death Race
                      - Target matchplay with a target of 21 points
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-300">•</span>
                    <span>
                      <strong className="text-white">Scoring:</strong> 4-2-1-0
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-300">•</span>
                    <span>
                      Group matchplay until 10 players reach the target
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-300">•</span>
                    <span>Top 10 players advance to Amazing Race finals</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-300">•</span>
                    <span>
                      <strong className="text-cyan-300">125% TGP</strong>
                    </span>
                  </li>
                </ul>
                <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-lg p-4">
                  <p className="font-semibold text-cyan-300 mb-2">
                    Amazing Race Finals
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    First player sets a target score on game 1, then advances.
                    Following players must reach that score to advance to the
                    next machine. Lowest score is eliminated. Continues until
                    one winner remains!
                  </p>
                </div>
              </div>

              {/* XMAS Main Format */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-2xl font-semibold text-purple-300 mb-4">
                  XMAS Main | Group Matchplay
                </h3>
                <p className="text-white/80 mb-4 leading-relaxed">
                  The qualifications will consist of{" "}
                  <strong className="text-white">10 rounds</strong> with{" "}
                  <strong className="text-white">2 games in each round</strong>{" "}
                  (one modern, one classic).
                </p>
                <ul className="space-y-2 text-white/70 mb-6">
                  <li className="flex gap-2">
                    <span className="text-purple-300">•</span>
                    <span>Points: 7-5-3-1</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-300">•</span>
                    <span>First round pairing: IFPA Slaughter</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-300">•</span>
                    <span>Following rounds: Tiered Swiss</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-300">•</span>
                    <span>
                      Top 24 players advance to playoffs (if less than 48
                      players then top 16 advance)
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-300">•</span>
                    <span>
                      Tie breaks for 24th (or 16th) place on predetermined
                      machine (probably Harlem)
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-300">•</span>
                    <span>
                      <strong className="text-purple-300">200-250% TGP!</strong>
                    </span>
                  </li>
                </ul>

                <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-5 space-y-4">
                  <div>
                    <p className="font-semibold text-purple-300 text-lg mb-3">
                      Playoff Format
                    </p>
                    <p className="text-white/70 leading-relaxed">
                      Top 24 players (or top 16 if less than 48 players) from
                      Saturday's qualifying rounds will compete in three/four
                      rounds of group matchplay. Each round consists of{" "}
                      <strong className="text-white">4 games</strong> with{" "}
                      <strong className="text-white">7-5-3-1 scoring</strong>.
                      Top two in each group advance to the next round,
                      continuing until the XMAS champion of 2025 is determined!
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <p className="font-semibold text-purple-300 mb-3">
                      Quarter Finals / First Two Rounds
                    </p>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex gap-2">
                        <span className="text-purple-300">→</span>
                        <span>
                          Top seed in each group from qualification chooses game
                          bank
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-300">→</span>
                        <span>
                          Top seed chooses their starting position on game 1
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-300">→</span>
                        <span>
                          Player starting order on consecutive machines
                          determined by previous game results
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <p className="font-semibold text-purple-300 mb-3">
                      Semi Finals and Finals
                    </p>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex gap-2">
                        <span className="text-purple-300">→</span>
                        <span>
                          Top seed from QUALIFICATION in each group chooses
                          games 1 and 2
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-300">→</span>
                        <span>
                          Following seeds in each group choose one machine each
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-300">→</span>
                        <span>
                          Each game can only be chosen once during semi finals
                          and finals
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-300">→</span>
                        <span>
                          Top seed from QUALIFICATION chooses start order on
                          game 1
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-300">→</span>
                        <span>
                          Player starting order on consecutive machines
                          determined by previous game results
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* XMAS Side Format */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-2xl font-semibold text-pink-300 mb-4">
                  XMAS Side | Progressive Strikes Matchplay
                </h3>
                <p className="text-white/80 mb-4 leading-relaxed">
                  Progressive strike group matchplay tournament with{" "}
                  <strong className="text-white">11 strikes</strong>.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex gap-2">
                    <span className="text-pink-300">•</span>
                    <span>Winner: 0 strikes</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-pink-300">•</span>
                    <span>2nd place: 1 strike</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-pink-300">•</span>
                    <span>3rd place: 2 strikes</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-pink-300">•</span>
                    <span>4th place: 3 strikes</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-pink-300">•</span>
                    <span>Play continues until 8 players remain</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-pink-300">•</span>
                    <span>Top 8 advance to playoffs</span>
                  </li>
                </ul>
              </div>

              {/* XMAS Leftovers Format */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-2xl font-semibold text-orange-300 mb-4">
                  XMAS Leftovers
                </h3>
                <div className="bg-amber-500/10 border border-amber-400/30 rounded-lg p-4 mb-4">
                  <p className="text-amber-200 font-medium text-center">
                    Format TBD
                  </p>
                </div>
                <p className="text-white/70 leading-relaxed">
                  A separate tournament for players who didn't advance to the
                  Main finals. More details coming soon!
                </p>
              </div>

              <p className="text-white/50 text-sm italic mt-8">
                All tournaments played according to{" "}
                <strong className="text-white/70">IFPA Matchplay rules</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Practical Information Section */}
        <section className="mb-16">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              Practical Information
            </h2>
            <div className="space-y-8">
              {/* Location */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Location
                </h3>
                <p className="font-semibold text-lg text-white mb-2">
                  Kristiania Flipperselskap
                </p>
                <p className="text-white/70 mb-4">
                  <a
                    href="https://maps.google.com/?q=Veitvetveien+8,+0596+Oslo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-cyan-200 underline transition-colors"
                  >
                    Veitvetveien 8, 0596 Oslo
                  </a>
                </p>
                <div className="space-y-3 bg-white/5 p-5 rounded-xl border border-white/10">
                  <p className="text-white/70 leading-relaxed">
                    <strong className="text-white">Access:</strong> We are
                    located in the basement of the shopping mall. The entrance
                    is on the right side of the building (when facing Kiwi).
                    Walk around the corner on the right into the little alley,
                    and the door will be on the left side.
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    <strong className="text-white">Door:</strong> The door will
                    be open during tournament hours. If locked, contact us on{" "}
                    <a
                      href="/slack"
                      className="text-cyan-300 hover:text-cyan-200 underline transition-colors"
                    >
                      Slack
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Transport */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Transport
                </h3>
                <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-3">
                  <p className="text-white/70 leading-relaxed">
                    <strong className="text-white">Metro:</strong> Take Line 5
                    to <strong className="text-white">Veitvet station</strong>{" "}
                    (15 minutes from downtown Oslo).
                  </p>
                  <p className="text-white/60">
                    Line 5 passes through several downtown stations:
                    Nationalteateret, Stortinget, Jernbanetorget, and Grønland.
                  </p>
                </div>
              </div>

              {/* Accommodation */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Accommodation
                </h3>
                <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-3">
                  <p className="text-white/70 leading-relaxed">
                    <strong className="text-white">Nearest hotel:</strong>{" "}
                    <a
                      href="https://www.thonhotels.com/our-hotels/norway/oslo/thon-hotel-linne/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 underline transition-colors"
                    >
                      Thon Hotel Linne, Lindeberg
                    </a>{" "}
                    - 20 minutes walk or one metro stop from the venue.
                  </p>
                  <p className="text-white/60">
                    Alternatively, book a hotel in downtown Oslo near metro Line
                    5 for easy 15-minute direct access to Veitvet.
                  </p>
                </div>
              </div>

              {/* Machines */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Machines
                </h3>
                <p className="text-white/70 mb-3">
                  Tournament machines will be announced soon.
                </p>
                <p className="text-white/60">
                  View our complete machine collection on the{" "}
                  <a
                    href="/machines"
                    className="text-cyan-300 hover:text-cyan-200 underline transition-colors"
                  >
                    machines page
                  </a>
                  .
                </p>
              </div>

              {/* Food & Drinks */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Food & Drinks
                </h3>
                <p className="text-white/70 mb-4">
                  Veitvet shopping mall has several restaurants and shops:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                    <p className="font-semibold text-white mb-3">Restaurants</p>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex gap-2">
                        <span className="text-cyan-300">•</span>
                        <span>Drabanten</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-300">•</span>
                        <span>Tims Mat</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-300">•</span>
                        <span>VV Sushi</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-300">•</span>
                        <span>Veitvet Sportsbar</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                    <p className="font-semibold text-white mb-3">
                      Grocery Stores
                    </p>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex gap-2">
                        <span className="text-cyan-300">•</span>
                        <span>Kiwi</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-cyan-300">•</span>
                        <span>Rema 1000</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-white/50 text-sm italic mt-4">
                  Opening hours at{" "}
                  <a
                    href="https://veitvetsenteret.no/butikker/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-cyan-200 underline transition-colors"
                  >
                    veitvetsenteret.no/butikker
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Time Schedule Section */}
        <section className="mb-16">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              Schedule
            </h2>
            <div className="bg-amber-500/10 border border-amber-400/30 rounded-xl p-4 mb-8">
              <p className="text-amber-200 font-medium text-center">
                Preliminary schedule - Times are subject to change and not final
              </p>
            </div>
            <div className="space-y-6">
              {/* Friday Schedule */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="font-semibold text-cyan-300 mb-2 text-xl">
                  Friday, December 5th
                </h3>
                <h4 className="text-white/80 font-medium mb-6">
                  XMAS Matchplay Open Warmup 2025
                </h4>
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <span className="font-mono text-cyan-300 font-medium min-w-[100px]">
                      17:00-18:00
                    </span>
                    <span className="text-white/70">
                      Attendance and registration
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-mono text-cyan-300 font-medium min-w-[100px]">
                      18:00-22:00
                    </span>
                    <div className="text-white/70">
                      <span className="font-semibold text-white">
                        Death Race
                      </span>
                      <span className="text-white/60">
                        {" "}
                        - Group matchplay until 10 players reach 21 points
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-mono text-cyan-300 font-medium min-w-[100px]">
                      22:00-00:30
                    </span>
                    <div className="text-white/70">
                      <span className="font-semibold text-white">
                        Amazing Race Finals
                      </span>
                      <span className="text-white/60">
                        {" "}
                        - Top 10 compete until one winner remains
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Saturday Schedule - Main */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="font-semibold text-purple-300 mb-2 text-xl">
                  Saturday, December 6th - Main Tournament (Qualifications)
                </h3>
                <h4 className="text-white/80 font-medium mb-6">
                  XMAS Matchplay Open Main 2025 - Qualifying Rounds
                </h4>
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <span className="font-mono text-purple-300 font-medium min-w-[100px]">
                      09:30-10:00
                    </span>
                    <span className="text-white/70">
                      Attendance and registration
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-mono text-purple-300 font-medium min-w-[100px]">
                      10:00-10:15
                    </span>
                    <span className="text-white/70">
                      Tournament information
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-mono text-purple-300 font-medium min-w-[100px]">
                      10:15-12:45
                    </span>
                    <span className="font-semibold text-white">
                      Qualifying rounds
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-mono text-purple-300 font-medium min-w-[100px]">
                      12:45-13:30
                    </span>
                    <span className="text-white/60">Food break</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-mono text-purple-300 font-medium min-w-[100px]">
                      13:30-18:00
                    </span>
                    <span className="font-semibold text-white">
                      Qualifying rounds
                    </span>
                  </div>
                </div>
              </div>

              {/* Saturday Schedule - Side */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="font-semibold text-pink-300 mb-2 text-xl">
                  Saturday, December 6th - Side Tournament
                </h3>
                <h4 className="text-white/80 font-medium mb-6">
                  XMAS Matchplay Open Side 2025
                </h4>
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <span className="font-mono text-pink-300 font-medium min-w-[100px]">
                      18:00-22:00
                    </span>
                    <span className="text-white/70">
                      Group matchplay with progressive strikes until 8 players
                      remain
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-mono text-pink-300 font-medium min-w-[100px]">
                      22:00-23:00
                    </span>
                    <span className="text-white/70">
                      Top 8 playoffs - Two groups of four play three games. Top
                      two from each group advance to finals.
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-mono text-pink-300 font-medium min-w-[100px]">
                      23:00-00:00
                    </span>
                    <div className="text-white/70">
                      <span className="font-semibold text-white">Finals</span>
                      <span className="text-white/60">
                        {" "}
                        - Top 4 play group matchplay on 3 games
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sunday Schedule - Main Finals */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="font-semibold text-purple-300 mb-2 text-xl">
                  Sunday, December 7th - Main Tournament Finals
                </h3>
                <h4 className="text-white/80 font-medium mb-6">
                  XMAS Matchplay Open Main 2025 - Finals
                </h4>
                <div className="space-y-3 mb-6">
                  <div className="flex gap-4">
                    <span className="font-mono text-purple-300 font-medium min-w-[100px]">
                      09:30
                    </span>
                    <span className="font-semibold text-white">
                      Finals start
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-mono text-purple-300 font-medium min-w-[100px]">
                      09:30-17:00
                    </span>
                    <span className="text-white/70">
                      Playoff bracket - Three/four rounds of group matchplay
                      (depending on number of qualifiers)
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-mono text-purple-300 font-medium min-w-[100px]">
                      17:00
                    </span>
                    <span className="font-semibold text-white">
                      Finals complete
                    </span>
                  </div>
                </div>

                <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-4">
                  <p className="text-white/70 text-sm">
                    See{" "}
                    <strong className="text-white">Tournament Format</strong>{" "}
                    section above for detailed playoff format rules.
                  </p>
                </div>
              </div>

              {/* Sunday Schedule - Leftovers */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="font-semibold text-orange-300 mb-2 text-xl">
                  Sunday, December 7th - Leftovers
                </h3>
                <h4 className="text-white/80 font-medium mb-6">
                  XMAS Leftovers 2025
                </h4>
                <div className="bg-amber-500/10 border border-amber-400/30 rounded-lg p-4 mb-4">
                  <p className="text-amber-200 font-medium text-center">
                    Schedule TBD
                  </p>
                </div>
                <div className="bg-orange-500/10 border border-orange-400/30 rounded-lg p-4">
                  <p className="text-white/70 text-sm">
                    See{" "}
                    <strong className="text-white">Tournament Format</strong>{" "}
                    section above for format details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Call to Action */}
        <div className="text-center py-12">
          <p className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Stay tuned for updates!
          </p>
          <p className="text-white/70">
            Questions? Contact us on{" "}
            <a
              href="/slack"
              className="text-cyan-300 hover:text-cyan-200 underline transition-colors"
            >
              Slack
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
