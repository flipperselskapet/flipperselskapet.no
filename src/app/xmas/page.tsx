import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XMAS Matchplay Open 2025 - Kristiania Flipperselskap",
  description: "Annual pinball championship in Oslo - XMAS Matchplay Open 2025",
};

export default function Xmas2025() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section with Flashy Title */}
      <div className="relative overflow-hidden bg-black/40 border-b-4 border-cyan-500">
        <div className="absolute inset-0 bg-[url(/wall.jpg)] opacity-20 bg-cover bg-center" />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="neon-logo text-6xl md:text-8xl mb-6">
            XMAS MATCHPLAY OPEN 2025
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-cyan-100 font-semibold mb-4 drop-shadow-lg">
              Welcome to Norway's premier pinball event!
            </p>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              Kristiania Flipperselskap is a private pinball club located in Oslo, Norway. With 30+ pinball machines of different eras,
              arcade machines and in close proximity to shops, restaurants and pubs - only 15 minutes outside downtown Oslo -
              we are excited to host another XMAS annual tournament!
            </p>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              Join us for two days of intense pinball action, December 5th-6th, 2025! This page contains all necessary information
              about registration, tournament formats, schedule, accommodation, food and transport.
            </p>
            <p className="text-base text-yellow-200 font-semibold">
              ⚠️ Limited spots available due to space and facility limitations - register early!
            </p>
            <div className="bg-black/40 rounded-lg p-6 border-2 border-cyan-400/50">
              <h3 className="text-2xl font-bold text-cyan-300 mb-4">📅 Tournament Dates</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold min-w-[140px]">December 5th:</span>
                  <span className="text-gray-200">XMAS Matchplay Open Warmup 2025</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold min-w-[140px]">December 6th:</span>
                  <div className="space-y-1">
                    <div className="text-gray-200">XMAS Matchplay Open Side 2025</div>
                    <div className="text-gray-200">XMAS Matchplay Open Main 2025</div>
                  </div>
                </div>
              </div>
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
              <p className="text-lg mb-4">
                <strong className="text-cyan-200">Registration is now open!</strong>
              </p>

              {/* Call to Action Button */}
              <a
                href="/xmas/register"
                className="inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-xl rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 text-center mb-4"
              >
                Register Now →
              </a>

              <p className="text-sm text-gray-300 mb-3 mt-4">
                Register for the main tournament and optionally join the warmup and side tournaments.
              </p>
              <p className="text-xs text-gray-400">
                <em>Norwegian players will pay with VIPPS at arrival. International players - we'll figure out payment together.</em>
              </p>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <p className="text-sm text-blue-200">
                <strong>💡 Pre-tournament tip:</strong> Check out Illegal Pinball Club in downtown Oslo for additional pinball action before the weekend!
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
          <div className="bg-yellow-900/30 border-2 border-yellow-500/50 rounded-lg p-4 mb-6">
            <p className="text-yellow-200 font-bold text-center">
              ⚠️ PRELIMINARY FORMAT - Subject to change
            </p>
          </div>
          <div className="text-gray-200 space-y-6">

            {/* XMAS Warmup Format */}
            <div className="bg-black/30 p-4 rounded border border-cyan-500/30">
              <h3 className="text-xl font-bold text-cyan-200 mb-3">XMAS Warmup | Death Race</h3>
              <p className="mb-3">
                The official XMAS warmup tournament is also our Stern Army Monthly tournament, with the chance to win some Stern Pinball goodies!
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-3">
                <li><strong>Format:</strong> Death Race - Target matchplay with a target of 21 points</li>
                <li><strong>Scoring:</strong> 4-2-1-0</li>
                <li>Group matchplay until 10 players reach the target</li>
                <li>Top 10 players advance to Amazing Race finals</li>
                <li><strong className="text-cyan-300">125% TGP</strong></li>
              </ul>
              <div className="bg-cyan-900/20 border border-cyan-500/20 rounded p-3 text-sm">
                <p className="font-semibold text-cyan-200 mb-2">Amazing Race Finals:</p>
                <p>
                  First player sets a target score on game 1, then advances. Following players must reach that score to advance to the next machine.
                  Lowest score is eliminated. Continues until one winner remains!
                </p>
              </div>
            </div>

            {/* XMAS Main Format */}
            <div className="bg-black/30 p-4 rounded border border-purple-500/30">
              <h3 className="text-xl font-bold text-purple-200 mb-3">XMAS Main | Group Matchplay</h3>
              <p className="mb-3">
                The qualifications will consist of <strong>6 rounds</strong>, with <strong>3 games in each round</strong>,
                one from each era (EM, SS/semi-modern and modern).
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Points: 7-5-3-1</li>
                <li>First round pairing: IFPA Slaughter</li>
                <li>Following rounds: Tiered Swiss</li>
                <li>Top 16 players advance to playoffs</li>
                <li>Tie breaks for 16th place on predetermined machine (probably Harlem)</li>
                <li><strong className="text-purple-300">200% TGP!</strong></li>
              </ul>
            </div>

            {/* XMAS Side Format */}
            <div className="bg-black/30 p-4 rounded border border-pink-500/30">
              <h3 className="text-xl font-bold text-pink-200 mb-3">XMAS Side | Progressive Strikes Matchplay</h3>
              <p className="mb-3">
                Progressive strike group matchplay tournament with <strong>11 strikes</strong>.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Winner: 0 strikes</li>
                <li>2nd place: 1 strike</li>
                <li>3rd place: 2 strikes</li>
                <li>4th place: 3 strikes</li>
                <li>Play continues until 8 players remain</li>
                <li>Top 8 advance to playoffs</li>
              </ul>
            </div>

            <p className="text-sm text-gray-400 italic">
              All tournaments played according to <strong>IFPA Matchplay rules</strong>
            </p>
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
              <h3 className="text-xl font-bold text-cyan-200 mb-3">📍 Location</h3>
              <p className="font-semibold text-lg mb-1">Kristiania Flipperselskap</p>
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
                  <strong>Access:</strong> We are located in the basement of the shopping mall. The entrance is on the right side of the building
                  (when facing Kiwi). Walk around the corner on the right into the little alley, and the door will be on the left side.
                </p>
                <p>
                  <strong>Door:</strong> The door will be open during tournament hours. If locked, contact us on{" "}
                  <a href="/slack" className="text-cyan-400 hover:text-cyan-200 underline font-semibold">
                    Slack
                  </a>.
                </p>
              </div>
            </div>

            {/* Transport */}
            <div>
              <h3 className="text-xl font-bold text-cyan-200 mb-3">🚇 Transport</h3>
              <div className="bg-black/30 p-4 rounded border border-cyan-500/30 space-y-2 text-sm">
                <p>
                  <strong>Metro:</strong> Take Line 5 to <strong>Veitvet station</strong> (15 minutes from downtown Oslo).
                </p>
                <p>
                  Line 5 passes through several downtown stations: Nationalteateret, Stortinget, Jernbanetorget, and Grønland.
                </p>
              </div>
            </div>

            {/* Accommodation */}
            <div>
              <h3 className="text-xl font-bold text-cyan-200 mb-3">🏨 Accommodation</h3>
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
                  </a> - 20 minutes walk or one metro stop from the venue.
                </p>
                <p>
                  Alternatively, book a hotel in downtown Oslo near metro Line 5 for easy 15-minute direct access to Veitvet.
                </p>
              </div>
            </div>

            {/* Machines */}
            <div>
              <h3 className="text-xl font-bold text-cyan-200 mb-2">🎮 Machines</h3>
              <p className="mb-2">Tournament machines will be announced soon.</p>
              <p className="text-sm">
                View our complete machine collection on the{" "}
                <a
                  href="/machines"
                  className="text-cyan-400 hover:text-cyan-200 underline font-semibold"
                >
                  machines page
                </a>.
              </p>
            </div>

            {/* Food & Drinks */}
            <div>
              <h3 className="text-xl font-bold text-cyan-200 mb-2">🍕 Food & Drinks</h3>
              <p className="mb-3">Veitvet shopping mall has several restaurants and shops:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-cyan-300 mb-2">Restaurants:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                    <li>Drabanten</li>
                    <li>Tims Mat</li>
                    <li>VV Sushi</li>
                    <li>Veitvet Sportsbar</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-cyan-300 mb-2">Grocery Stores:</p>
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
          <div className="bg-yellow-900/30 border-2 border-yellow-500/50 rounded-lg p-4 mb-6">
            <p className="text-yellow-200 font-bold text-center">
              ⚠️ PRELIMINARY SCHEDULE - Times are subject to change and not final
            </p>
          </div>
          <div className="text-gray-200 space-y-6">

            {/* Friday Schedule */}
            <div className="bg-black/30 p-5 rounded border border-cyan-600/30">
              <h3 className="font-bold text-cyan-300 mb-4 text-2xl">📅 Friday, December 5th</h3>
              <h4 className="text-cyan-200 font-semibold mb-4 text-lg">XMAS Matchplay Open Warmup 2025</h4>
              <div className="space-y-2 text-sm">
                <div className="flex gap-3">
                  <span className="font-mono text-cyan-300 min-w-[80px]">17:00-18:00</span>
                  <span>Attendance and registration</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-cyan-300 min-w-[80px]">18:00-22:00</span>
                  <span className="font-semibold">Death Race</span> <span className="text-gray-400">- Group matchplay until 10 players reach 21 points</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-cyan-300 min-w-[80px]">22:00-00:30</span>
                  <span className="font-semibold">Amazing Race Finals</span> <span className="text-gray-400">- Top 10 compete until one winner remains</span>
                </div>
              </div>
            </div>

            {/* Saturday Schedule - Main */}
            <div className="bg-black/30 p-5 rounded border border-purple-600/30">
              <h3 className="font-bold text-purple-300 mb-4 text-2xl">📅 Saturday, December 6th - Main Tournament</h3>
              <h4 className="text-purple-200 font-semibold mb-4 text-lg">XMAS Matchplay Open Main 2025</h4>
              <div className="space-y-2 text-sm">
                <div className="flex gap-3">
                  <span className="font-mono text-purple-300 min-w-[80px]">09:30-10:00</span>
                  <span>Attendance and registration</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-purple-300 min-w-[80px]">10:00-10:30</span>
                  <span>Tournament information + Prize ceremony from Friday</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-purple-300 min-w-[80px]">10:30-11:20</span>
                  <span className="font-semibold">Round 1</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-purple-300 min-w-[80px]">11:20-12:10</span>
                  <span className="font-semibold">Round 2</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-purple-300 min-w-[80px]">12:10-12:40</span>
                  <span className="text-gray-400">Break for food/shopping</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-purple-300 min-w-[80px]">12:40-13:30</span>
                  <span className="font-semibold">Round 3</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-purple-300 min-w-[80px]">13:30-14:20</span>
                  <span className="font-semibold">Round 4</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-purple-300 min-w-[80px]">14:20-15:10</span>
                  <span className="font-semibold">Round 5</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-purple-300 min-w-[80px]">15:10-16:00</span>
                  <span className="font-semibold">Round 6</span> <span className="text-gray-400">(final qualification round)</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-purple-300 min-w-[80px]">16:00-18:00</span>
                  <span className="text-gray-400">Food break</span>
                </div>
              </div>
            </div>

            {/* Saturday Schedule - Side */}
            <div className="bg-black/30 p-5 rounded border border-pink-600/30">
              <h3 className="font-bold text-pink-300 mb-4 text-2xl">📅 Saturday, December 6th - Side Tournament</h3>
              <h4 className="text-pink-200 font-semibold mb-4 text-lg">XMAS Matchplay Open Side 2025</h4>
              <div className="space-y-2 text-sm">
                <div className="flex gap-3">
                  <span className="font-mono text-pink-300 min-w-[80px]">18:00-22:00</span>
                  <span>Group matchplay with progressive strikes until 8 players remain</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-pink-300 min-w-[80px]">22:00-23:00</span>
                  <span>Top 8 playoffs - Two groups of four play three games. Top two from each group advance to finals.</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-pink-300 min-w-[80px]">23:00-00:00</span>
                  <span className="font-semibold">Finals</span> <span className="text-gray-400">- Top 4 play group matchplay on 3 games</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Footer Call to Action */}
        <div className="text-center py-8">
          <p className="text-2xl font-bold text-cyan-300 mb-4">
            Stay tuned for updates!
          </p>
          <p className="text-gray-300">
            Questions? Contact us on{" "}
            <a href="/slack" className="text-cyan-400 hover:text-cyan-200 underline">
              Slack
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
