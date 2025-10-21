import type { Metadata } from "next";
import { machines } from "~/data/machines";
import MachineList from "./machine-list";

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

          <MachineList machines={machines} />
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
