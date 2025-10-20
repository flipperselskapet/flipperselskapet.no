import type { Metadata } from "next";
import { machines } from "~/data/machines";

export const metadata: Metadata = {
  title: "Maskiner - Kristiania Flipperselskap",
  description: "Oversikt over flippermaskiner hos Kristiania Flipperselskap",
};

export default function Machines() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="relative overflow-hidden bg-black/40 border-b-4 border-cyan-500">
        <div className="absolute inset-0 bg-[url(/wall.jpg)] opacity-20 bg-cover bg-center" />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(6,182,212,0.8)]">
              Våre Maskiner
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Oversikt over alle flippermaskiner hos Kristiania Flipperselskap
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-lg border-2 border-cyan-500/50 p-8 backdrop-blur-sm shadow-2xl">
          <h2 className="text-3xl font-black mb-6 text-cyan-300 drop-shadow-lg">
            🎮 Maskinliste
          </h2>

          {machines.length === 0 ? (
            <p className="text-gray-400 italic">Maskinliste kommer snart...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-cyan-500/50">
                    <th className="py-3 px-4 text-cyan-300 font-bold">
                      Maskin
                    </th>
                    <th className="py-3 px-4 text-cyan-300 font-bold hidden md:table-cell">
                      Produsent
                    </th>
                    <th className="py-3 px-4 text-cyan-300 font-bold hidden sm:table-cell">
                      År
                    </th>
                    <th className="py-3 px-4 text-cyan-300 font-bold hidden lg:table-cell">
                      Rating
                    </th>
                    <th className="py-3 px-4 text-cyan-300 font-bold">IPDB</th>
                  </tr>
                </thead>
                <tbody>
                  {machines.map((machine) => (
                    <tr
                      key={machine.ipdbId}
                      className="border-b border-cyan-500/20 hover:bg-cyan-500/10 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="text-gray-200 font-semibold">
                          {machine.name}
                        </div>
                        <div className="text-gray-400 text-sm mt-1 md:hidden">
                          {machine.manufacturer} • {machine.year !== 0 ? machine.year : "TBD"} • {machine.rating}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-300 hidden md:table-cell">
                        {machine.manufacturer}
                      </td>
                      <td className="py-3 px-4 text-gray-300 hidden sm:table-cell">
                        {machine.year !== 0 ? machine.year : "TBD"}
                      </td>
                      <td className="py-3 px-4 text-gray-300 hidden lg:table-cell">
                        {machine.rating}
                      </td>
                      <td className="py-3 px-4">
                        {machine.ipdbUrl !== "#" ? (
                          <a
                            href={machine.ipdbUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-200 underline text-sm"
                          >
                            →
                          </a>
                        ) : (
                          <span className="text-gray-600 text-sm">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-gray-400 text-sm mt-4 text-center">
                Total: {machines.length} maskiner
              </p>
            </div>
          )}
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <a href="/" className="text-cyan-400 hover:text-cyan-200 underline">
            ← Tilbake til forsiden
          </a>
        </div>
      </div>
    </div>
  );
}
