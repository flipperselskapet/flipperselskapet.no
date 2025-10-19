import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XMAS Matchplay Open 2025 - Kristiania Flipperselskap",
  description: "Årlig flippermesterskap i Oslo - XMAS Matchplay Open 2025",
};

export default function Xmas2025() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section with Flashy Title */}
      <div className="relative overflow-hidden bg-black/40 border-b-4 border-cyan-500">
        <div className="absolute inset-0 bg-[url(/wall.jpg)] opacity-20 bg-cover bg-center" />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-4 animate-pulse">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(6,182,212,0.8)]">
              XMAS MATCHPLAY
            </span>
          </h1>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(147,51,234,0.6)]">
              OPEN 2025
            </span>
          </h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl text-cyan-100 font-semibold mb-4 drop-shadow-lg">
              Velkommen til årets høydepunkt i norsk flipper!
            </p>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              Kristiania Flipperselskap inviterer til den årlige XMAS Matchplay Open -
              to dager med intense turneringer hvor Norges beste flipperspillere kjemper om ære,
              berømmelse og fantastiske premier i en atmosfære full av
              konkurranseglede.
            </p>
            <div className="bg-black/40 rounded-lg p-6 border-2 border-cyan-400/50">
              <h3 className="text-2xl font-bold text-cyan-300 mb-4">📅 Turneringsdatoer</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold min-w-[120px]">5. desember:</span>
                  <span className="text-gray-200">XMAS Matchplay Open Warmup 2025</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold min-w-[120px]">6. desember:</span>
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
            Påmelding
          </h2>
          <div className="text-gray-200 space-y-4">
            <p className="text-lg">
              <strong className="text-cyan-200">Påmeldingen åpner snart!</strong>
            </p>
            <p>
              Informasjon om påmelding, deltakergebyr og påmeldingsfrist kommer her.
            </p>
            <p className="text-sm text-gray-400">
              <em>Begrenset antall plasser - først til mølla!</em>
            </p>
          </div>
        </section>

        {/* Rules Section */}
        <section className="mb-12 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-lg border-2 border-purple-500/50 p-8 backdrop-blur-sm shadow-2xl">
          <h2 className="text-4xl font-black mb-6 text-purple-300 drop-shadow-lg flex items-center gap-3">
            <span className="text-5xl">📜</span>
            Regler
          </h2>
          <div className="text-gray-200 space-y-4">
            <p className="text-lg">
              Turneringen spilles etter <strong className="text-purple-200">IFPA Matchplay regler</strong>.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Detaljerte turneringsregler publiseres her</li>
              <li>Spilleregler og retningslinjer</li>
              <li>Poengberegning og avansement</li>
              <li>Fair play og sportsånd</li>
            </ul>
          </div>
        </section>

        {/* Practical Information Section */}
        <section className="mb-12 bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg border-2 border-blue-500/50 p-8 backdrop-blur-sm shadow-2xl">
          <h2 className="text-4xl font-black mb-6 text-blue-300 drop-shadow-lg flex items-center gap-3">
            <span className="text-5xl">ℹ️</span>
            Praktisk Informasjon
          </h2>
          <div className="text-gray-200 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-cyan-200 mb-2">📍 Sted</h3>
              <p className="font-semibold text-lg mb-1">Veitvet senter</p>
              <p className="text-gray-300 mb-1">
                <a
                  href="https://maps.google.com/?q=Veitvetveien+8,+0596+Oslo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-200 underline"
                >
                  Veitvetveien 8, 0596 Oslo
                </a>
              </p>
              <div className="space-y-2 text-sm bg-black/30 p-4 rounded border border-cyan-500/30 mt-3">
                <p><strong>Adkomst:</strong> Flipperlokalene ligger i kjelleren med inngang fra østsiden av bygget.</p>
                <p><strong>Inngang:</strong> Døren skal være ulåst i turneringstiden. Dersom døren er låst og du trenger å komme inn, ta kontakt med oss på{" "}
                  <a href="/slack" className="text-cyan-400 hover:text-cyan-200 underline font-semibold">
                    Slack
                  </a>.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-200 mb-2">🗓️ Datoer</h3>
              <div className="space-y-2">
                <p><strong className="text-cyan-300">Fredag 5. desember 2025:</strong> XMAS Matchplay Open Warmup</p>
                <p><strong className="text-purple-300">Lørdag 6. desember 2025:</strong> XMAS Matchplay Open Side & Main</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-200 mb-2">🎮 Maskiner</h3>
              <p className="mb-2">Hvilke maskiner som blir brukt i turneringen kunngjøres snart.</p>
              <p className="text-sm">
                Se vår komplette maskinliste på{" "}
                <a
                  href="/machines"
                  className="text-cyan-400 hover:text-cyan-200 underline font-semibold"
                >
                  maskinsiden
                </a>.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-200 mb-2">🍕 Mat og drikke</h3>
              <p className="mb-3">Veitvet senter har flere spisesteder og butikker hvor du kan kjøpe mat og drikke:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-cyan-300 mb-2">Restauranter:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Drabanten</li>
                    <li>Tims Mat</li>
                    <li>VV Sushi</li>
                    <li>Veitvet Sportsbar</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-cyan-300 mb-2">Butikker:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Kiwi</li>
                    <li>Rema 1000</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-gray-400 italic mt-3">
                Åpningstider finner du på{" "}
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
            Tidsplan
          </h2>
          <div className="text-gray-200 space-y-4">
            <p className="text-lg mb-4">
              Detaljert tidsplan for turneringene publiseres her nærmere turneringsdato.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-black/30 p-4 rounded border border-cyan-600/30">
                <h3 className="font-bold text-cyan-300 mb-3">📅 Fredag 5. desember</h3>
                <h4 className="text-cyan-200 font-semibold mb-2">XMAS Matchplay Open Warmup 2025</h4>
                <p className="text-sm text-gray-400 italic">Program kommer snart</p>
              </div>
              <div className="bg-black/30 p-4 rounded border border-purple-600/30">
                <h3 className="font-bold text-purple-300 mb-3">📅 Lørdag 6. desember</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-purple-200 font-semibold">XMAS Matchplay Open Side 2025</h4>
                    <p className="text-sm text-gray-400 italic">Program kommer snart</p>
                  </div>
                  <div>
                    <h4 className="text-purple-200 font-semibold">XMAS Matchplay Open Main 2025</h4>
                    <p className="text-sm text-gray-400 italic">Program kommer snart</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Call to Action */}
        <div className="text-center py-8">
          <p className="text-2xl font-bold text-cyan-300 mb-4">
            Følg med for oppdateringer!
          </p>
          <p className="text-gray-300">
            Har du spørsmål? Ta kontakt med oss på{" "}
            <a href="/slack" className="text-cyan-400 hover:text-cyan-200 underline">
              Slack
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
