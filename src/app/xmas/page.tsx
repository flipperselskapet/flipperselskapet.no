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
              Join us for a weekend of intense pinball action! Dates TBD. This
              page will contain all necessary information about registration,
              tournament formats, schedule, accommodation, food and transport.
            </p>
            <p className="text-base text-yellow-200 font-semibold">
              ⚠️ Limited spots available due to space and facility limitations -
              registration opens Saturday, October 10th at 12:00!
            </p>
            <div className="bg-black/40 rounded-lg p-6 border-2 border-cyan-400/50">
              <h3 className="text-2xl font-bold text-cyan-300 mb-4">
                📅 Tournament Dates
              </h3>
              <p className="text-gray-200">TBD</p>
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
                <strong>💡 Pre-tournament tip:</strong> Check out Illegal
                Pinball Club in downtown Oslo for additional pinball action
                before the weekend!
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
          <p className="text-gray-200">TBD</p>
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
                    <li>Drabanten</li>
                    <li>Tims Mat</li>
                    <li>VV Sushi</li>
                    <li>Veitvet Sportsbar</li>
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
          <p className="text-gray-200">TBD</p>
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
