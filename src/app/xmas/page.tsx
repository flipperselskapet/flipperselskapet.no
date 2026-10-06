import { and, isNotNull, isNull } from "drizzle-orm";
import type { Metadata } from "next";
import { connection } from "next/server";
import { db } from "~/db";
import { registrations } from "~/db/schema";
import { AdminLink } from "./admin-link";
import { isRegistrationOpen } from "./register/opening";

export const metadata: Metadata = {
  title: "XMAS Matchplay Open 2026 - Kristiania Flipperselskap",
  description: "Annual pinball championship in Oslo - XMAS Matchplay Open 2026",
};

const schedule = [
  {
    day: "Friday, Dec 4th",
    title: "XMAS Warmup",
    items: [
      { time: "17.00–18.00", label: "Attendance and registration" },
      { time: "00.30", label: "Tournament over" },
    ],
  },
  {
    day: "Saturday, Dec 5th",
    title: "XMAS Main qualifications & Side Tournament",
    items: [
      { time: "09.30–10.00", label: "Attendance and registration" },
      { time: "10.00–10.15", label: "Information about the day" },
      { time: "10.15", label: "Qualifications start" },
      { time: "12.45–13.30", label: "Break for food/shopping" },
      { time: "18.00", label: "Qualifications done" },
      { time: "19.45", label: "XMAS Side Tournament" },
    ],
  },
  {
    day: "Sunday, Dec 6th",
    title: "XMAS Main finals",
    items: [
      { time: "09.30", label: "Finals start" },
      { time: "17.00", label: "Finals done" },
    ],
  },
];

export default async function Xmas2026() {
  await connection();
  const isOpen = isRegistrationOpen();

  // Get count of verified, non-deleted registrations
  const verifiedPlayers = await db
    .select()
    .from(registrations)
    .where(
      and(isNull(registrations.deletedAt), isNotNull(registrations.verifiedAt)),
    );

  const playerCount = verifiedPlayers.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section with Flashy Title */}
      <div className="relative overflow-hidden bg-black/40 border-b-4 border-cyan-500">
        <div className="absolute inset-0 bg-[url(/wall.jpg)] opacity-20 bg-cover bg-center" />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="neon-logo text-6xl md:text-8xl mb-6">
            XMAS MATCHPLAY OPEN 2026
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-cyan-100 font-semibold mb-4 drop-shadow-lg">
              Join us for a weekend of pinball competition in Oslo!
            </p>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              Kristiania Flipperselskap is a private pinball club located in
              Oslo, Norway. With 40+ pinball machines of different eras and in
              close proximity to shops, restaurants and pubs - only 15 minutes
              outside downtown Oslo - we are excited to host another XMAS annual
              tournament!
            </p>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              Join us for a weekend of intense pinball action, December 4th–6th!
              This page will contain all necessary information about
              registration, tournament formats, schedule, accommodation, food
              and transport. The registration link will be posted closer to the
              registration date.
            </p>
            <p className="text-base text-yellow-200 font-semibold">
              ⚠️ Limited spots available due to space and facility limitations -
              registration opens Saturday, October 10th at 12:00!
            </p>
            <div className="bg-black/40 rounded-lg p-6 border-2 border-cyan-400/50">
              <h3 className="text-2xl font-bold text-cyan-300 mb-4">
                📅 Tournament Dates
              </h3>
              <ul className="text-gray-200 space-y-2">
                <li>
                  <strong className="text-cyan-200">
                    Thursday, December 3rd:
                  </strong>{" "}
                  Early-arrival tournament at Illegal Pinball
                </li>
                <li>
                  <strong className="text-cyan-200">
                    Friday, December 4th:
                  </strong>{" "}
                  XMAS Warmup
                </li>
                <li>
                  <strong className="text-cyan-200">
                    Saturday, December 5th:
                  </strong>{" "}
                  XMAS Main qualifications &amp; Side Tournament
                </li>
                <li>
                  <strong className="text-cyan-200">
                    Sunday, December 6th:
                  </strong>{" "}
                  XMAS Main finals &amp; leftovers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Registration Section */}
        <section className="mb-12 bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg border-2 border-cyan-500/50 p-8 backdrop-blur-sm shadow-2xl">
          <h2 className="text-4xl font-black mb-6 text-cyan-300 drop-shadow-lg flex items-center gap-3">
            <span className="text-5xl">🎯</span>
            Registration
          </h2>
          <div className="text-gray-200 space-y-6">
            <div className="bg-cyan-900/30 border-2 border-cyan-500/50 rounded-lg p-5">
              {isOpen ? (
                <>
                  <p className="text-lg mb-4">
                    <strong className="text-cyan-200">
                      Registration is now open!
                    </strong>
                  </p>

                  <a
                    href="/xmas/register"
                    className="inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-xl rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 text-center mb-4"
                  >
                    Register Now →
                  </a>

                  <div className="flex items-center gap-3 mt-4">
                    <a
                      href="/xmas/players"
                      className="inline-block text-cyan-400 hover:text-cyan-200 underline font-semibold"
                    >
                      View registered players →
                    </a>
                    {playerCount > 0 && (
                      <span className="inline-block px-3 py-1 bg-cyan-900/50 border border-cyan-500/50 rounded-full text-cyan-200 font-bold text-sm">
                        {playerCount} {playerCount === 1 ? "player" : "players"}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg mb-2">
                    <strong className="text-cyan-200">
                      Registration opens Saturday, October 10th at 12:00!
                    </strong>
                  </p>
                  <p className="text-sm text-gray-300">
                    Spots are limited — be ready when registration opens.
                  </p>
                </>
              )}
              <p className="text-sm text-gray-300 mt-4">
                You can register for one or more of the Warmup (Friday), Main
                (Saturday–Sunday) and Side Tournament (Saturday). Leftovers on
                Sunday require no registration – sign up on the spot.
              </p>
              <p className="text-xs text-gray-400 mt-4">
                <em>Payment details: TBD</em>
              </p>
            </div>

            <div className="bg-slate-900/50 border-2 border-cyan-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-cyan-300 mb-4">
                💰 Entry Fees
              </h3>
              <p className="text-gray-200">TBD</p>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <p className="text-sm text-blue-200">
                <strong>💡 Arriving early?</strong> Illegal Pinball will host a
                tournament on Thursday at their location in downtown Oslo. Link
                to that event to come.
              </p>
            </div>
          </div>
        </section>

        {/* Format Section */}
        <section className="mb-12 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-lg border-2 border-purple-500/50 p-8 backdrop-blur-sm shadow-2xl">
          <h2 className="text-4xl font-black mb-6 text-purple-300 drop-shadow-lg flex items-center gap-3">
            <span className="text-5xl">📜</span>
            Tournament Format
          </h2>
          <p className="text-sm text-yellow-200 italic mb-6">
            Preliminary – details may change.
          </p>
          <div className="text-gray-200 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-purple-200 mb-2">
                🔥 XMAS Warmup (Friday)
              </h3>
              <p>Format will be finalized ASAP.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-purple-200 mb-2">
                🏆 XMAS Main – Qualifications (Saturday)
              </h3>
              <div className="bg-black/30 p-4 rounded border border-purple-500/30 space-y-2 text-sm">
                <p>
                  Group matchplay: 10 rounds with 2 games in each round. The
                  first round uses slaughter pairing, after that strict Swiss
                  pairing.
                </p>
                <p>
                  With 48 or more players, the top 24 advance to the finals.
                  With fewer than 48 players, the top 16 advance.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-purple-200 mb-2">
                🏆 XMAS Main – Finals (Sunday)
              </h3>
              <div className="bg-black/30 p-4 rounded border border-purple-500/30 space-y-2 text-sm">
                <p>
                  Three or four rounds of group matchplay (depending on how many
                  advance), each round consisting of 4 or 5 games. Scoring is
                  7-5-3-1, and the top two in each group advance to the next
                  round. This continues until the finals are done and the XMAS
                  champion of 2026 is determined!
                </p>
                <p>
                  <strong>Quarterfinals:</strong> The top seed from
                  qualification in each group chooses the game bank, then
                  chooses their starting position on game 1.
                </p>
                <p>
                  <strong>Semifinals and finals:</strong> The top seed from
                  qualification in each group chooses games 1 and 2, then the
                  following seeds each choose a machine. The top seed then
                  chooses starting position on game 1. Each game can only be
                  chosen once during the semifinals and finals.
                </p>
                <p>
                  In all rounds, starting order choice on subsequent games is
                  determined by the previous game's results.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-purple-200 mb-2">
                🎲 XMAS Side Tournament (Saturday)
              </h3>
              <p>Format TBA.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-purple-200 mb-2">
                🍽️ Leftovers (Sunday)
              </h3>
              <p>
                There will be leftover tournaments. No registration needed –
                sign up on the spot. Details will be announced closer to the
                tournament.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Information Section */}
        <section className="mb-12 bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg border-2 border-blue-500/50 p-8 backdrop-blur-sm shadow-2xl">
          <h2 className="text-4xl font-black mb-6 text-blue-300 drop-shadow-lg flex items-center gap-3">
            <span className="text-5xl">ℹ️</span>
            Practical Information
          </h2>
          <div className="text-gray-200 space-y-6">
            {/* Location */}
            <div>
              <h3 className="text-xl font-bold text-cyan-200 mb-3">
                📍 Location
              </h3>
              <p className="font-semibold text-lg mb-1">
                Kristiania Flipperselskap
              </p>
              <p className="text-gray-300 mb-3">
                <a
                  href="https://maps.google.com/?q=Veitvetveien+8,+0596+Oslo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-200 underline"
                >
                  Veitvetveien 8, 0596 Oslo
                </a>
              </p>
              <div className="space-y-3 text-sm bg-black/30 p-4 rounded border border-cyan-500/30">
                <p>
                  <strong>Access:</strong> We are located in the basement of the
                  shopping mall. The entrance is on the right side of the
                  building (when facing Kiwi). Walk around the corner on the
                  right into the little alley, and the door will be on the left
                  side.
                </p>
                <p>
                  <strong>Door:</strong> The door will be open during tournament
                  hours. If locked, contact us on{" "}
                  <a
                    href="/slack"
                    className="text-cyan-400 hover:text-cyan-200 underline font-semibold"
                  >
                    Slack
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Transport */}
            <div>
              <h3 className="text-xl font-bold text-cyan-200 mb-3">
                🚇 Transport
              </h3>
              <div className="bg-black/30 p-4 rounded border border-cyan-500/30 space-y-2 text-sm">
                <p>
                  <strong>Metro:</strong> Take Line 5 to{" "}
                  <strong>Veitvet station</strong> (15 minutes from downtown
                  Oslo).
                </p>
                <p>
                  Line 5 passes through several downtown stations:
                  Nationalteateret, Stortinget, Jernbanetorget, and Grønland.
                </p>
              </div>
            </div>

            {/* Accommodation */}
            <div>
              <h3 className="text-xl font-bold text-cyan-200 mb-3">
                🏨 Accommodation
              </h3>
              <div className="bg-black/30 p-4 rounded border border-cyan-500/30 space-y-3 text-sm">
                <p>
                  <strong>Nearest hotel:</strong>{" "}
                  <a
                    href="https://www.thonhotels.com/our-hotels/norway/oslo/thon-hotel-linne/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-200 underline"
                  >
                    Thon Hotel Linne, Lindeberg
                  </a>{" "}
                  - 20 minutes walk or one metro stop from the venue.
                </p>
                <p>
                  Alternatively, book a hotel in downtown Oslo near metro Line 5
                  for easy 15-minute direct access to Veitvet.
                </p>
              </div>
            </div>

            {/* Machines */}
            <div>
              <h3 className="text-xl font-bold text-cyan-200 mb-2">
                🎮 Machines
              </h3>
              <p className="mb-2">
                Tournament machines will be announced soon.
              </p>
              <p className="text-sm">
                View our complete machine collection on the{" "}
                <a
                  href="/machines"
                  className="text-cyan-400 hover:text-cyan-200 underline font-semibold"
                >
                  machines page
                </a>
                .
              </p>
            </div>

            {/* Food & Drinks */}
            <div>
              <h3 className="text-xl font-bold text-cyan-200 mb-2">
                🍕 Food & Drinks
              </h3>
              <p className="mb-3">
                Veitvet shopping mall has several restaurants and shops:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-cyan-300 mb-2">
                    Restaurants:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                    <li>Drabanten Spiseri og Catering</li>
                    <li>Lucky Bowl</li>
                    <li>Tim's Burger</li>
                    <li>Veitvet Sportsbar & Pizza</li>
                    <li>VV Sushi</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-cyan-300 mb-2">
                    Grocery Stores:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                    <li>Kiwi</li>
                    <li>Rema 1000</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-gray-400 italic mt-3">
                Opening hours at{" "}
                <a
                  href="https://veitvetsenteret.no/butikker/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-200 underline"
                >
                  veitvetsenteret.no/butikker
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Time Schedule Section */}
        <section className="mb-12 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-lg border-2 border-pink-500/50 p-8 backdrop-blur-sm shadow-2xl">
          <h2 className="text-4xl font-black mb-6 text-pink-300 drop-shadow-lg flex items-center gap-3">
            <span className="text-5xl">⏰</span>
            Schedule
          </h2>
          <p className="text-sm text-yellow-200 italic mb-6">
            Preliminary – times may change.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-gray-200">
            {schedule.map((day) => (
              <div
                key={day.day}
                className="bg-black/30 p-4 rounded border border-pink-500/30"
              >
                <h3 className="text-lg font-bold text-pink-200">{day.day}</h3>
                <p className="text-sm text-pink-300/80 mb-3">{day.title}</p>
                <ul className="space-y-2 text-sm">
                  {day.items.map((item) => (
                    <li key={item.time + item.label} className="flex gap-3">
                      <span className="font-mono text-cyan-300 shrink-0 w-24">
                        {item.time}
                      </span>
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 italic mt-4">
            The side tournament start time may change if qualifications run
            longer than planned.
          </p>
        </section>

        {/* Footer Call to Action */}
        <div className="text-center py-8">
          <p className="text-2xl font-bold text-cyan-300 mb-4">
            Stay tuned for updates!
          </p>
          <p className="text-gray-300">
            Questions? Contact us on{" "}
            <a
              href="/slack"
              className="text-cyan-400 hover:text-cyan-200 underline"
            >
              Slack
            </a>
          </p>
          <div className="mt-4">
            <AdminLink />
          </div>
        </div>
      </div>
    </div>
  );
}
