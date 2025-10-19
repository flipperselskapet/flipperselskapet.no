import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maskiner - Kristiania Flipperselskap",
  description: "Oversikt over flippermaskiner hos Kristiania Flipperselskap",
};

interface Machine {
  name: string;
  manufacturer: string;
  year: number;
  rating: string;
  ipdbId: string;
  ipdbUrl: string;
}

export default function Machines() {
  const machines: Machine[] = [
    {
      name: "AC/DC",
      manufacturer: "Stern",
      year: 2012,
      rating: "7.9/10",
      ipdbId: "5767",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=5767"
    },
    {
      name: "The Avengers (Pro)",
      manufacturer: "Stern",
      year: 2012,
      rating: "6.753/10",
      ipdbId: "5938",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=5938"
    },
    {
      name: "Doodle Bug",
      manufacturer: "Williams",
      year: 1971,
      rating: "7.5/10",
      ipdbId: "703",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=703"
    },
    {
      name: "Frontier",
      manufacturer: "Bally",
      year: 1980,
      rating: "7.592/10",
      ipdbId: "959",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=959"
    },
    {
      name: "GoldenEye",
      manufacturer: "Sega",
      year: 1996,
      rating: "7.8/10",
      ipdbId: "3792",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=3792"
    },
    {
      name: "Harlem Globetrotters On Tour",
      manufacturer: "Bally",
      year: 1979,
      rating: "7.50/10",
      ipdbId: "1125",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=1125"
    },
    {
      name: "Heavy Metal Meltdown",
      manufacturer: "Bally Midway",
      year: 1987,
      rating: "7.5/10",
      ipdbId: "1150",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?gid=1150"
    },
    {
      name: "Hot Tip",
      manufacturer: "Williams",
      year: 1977,
      rating: "7.5/10",
      ipdbId: "3163",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=3163"
    },
    {
      name: "KISS (Pro)",
      manufacturer: "Stern",
      year: 2015,
      rating: "7.8/10",
      ipdbId: "6265",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=6265"
    },
    {
      name: "Quicksilver",
      manufacturer: "Stern",
      year: 1980,
      rating: "7.827/10",
      ipdbId: "1895",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=1895"
    },
    {
      name: "Rick and Morty",
      manufacturer: "Spooky Pinball",
      year: 2020,
      rating: "TBD", // Need version confirmation
      ipdbId: "6640",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=6640"
    },
    {
      name: "Sea Ray",
      manufacturer: "Bally",
      year: 1967,
      rating: "7.2/10",
      ipdbId: "2085",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=2085"
    },
    {
      name: "Sky Jump",
      manufacturer: "Gottlieb",
      year: 1974,
      rating: "7.887/10",
      ipdbId: "2195",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=2195"
    },
    {
      name: "Starship Troopers",
      manufacturer: "Sega",
      year: 1997,
      rating: "7.79/10",
      ipdbId: "4341",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=4341"
    },
    {
      name: "Stranger Things (Pro)",
      manufacturer: "Stern",
      year: 2019,
      rating: "8.30/10",
      ipdbId: "6642",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=6642"
    },
    {
      name: "Street Fighter II",
      manufacturer: "Gottlieb",
      year: 1993,
      rating: "7.16/10",
      ipdbId: "2403",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=2403"
    },
    {
      name: "Viking",
      manufacturer: "Bally",
      year: 1980,
      rating: "TBD", // Need version confirmation
      ipdbId: "2737",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=2737"
    },
    {
      name: "Wrestlemania",
      manufacturer: "Stern",
      year: 2015,
      rating: "TBD", // Need version confirmation
      ipdbId: "6215",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=6215"
    },
    {
      name: "The X-Files",
      manufacturer: "Sega",
      year: 1997,
      rating: "7.9/10",
      ipdbId: "4137",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=4137"
    },
    {
      name: "Alien Poker",
      manufacturer: "Williams",
      year: 1980,
      rating: "7.625/10",
      ipdbId: "48",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=48"
    },
    {
      name: "Aztec",
      manufacturer: "Williams",
      year: 1976,
      rating: "7.8/10",
      ipdbId: "119",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=119"
    },
    {
      name: "Barracora",
      manufacturer: "Williams",
      year: 1981,
      rating: "7.5/10",
      ipdbId: "177",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=177"
    },
    {
      name: "Batman 66",
      manufacturer: "Stern",
      year: 2016,
      rating: "8.7/10",
      ipdbId: "6354",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=6354"
    },
    {
      name: "Demolition Man",
      manufacturer: "Williams",
      year: 1994,
      rating: "7.814/10",
      ipdbId: "662",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=662"
    },
    {
      name: "Eight Ball",
      manufacturer: "Bally",
      year: 1977,
      rating: "7.3/10",
      ipdbId: "760",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=760"
    },
    {
      name: "F-14 Tomcat",
      manufacturer: "Williams",
      year: 1987,
      rating: "7.648/10",
      ipdbId: "804",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=804"
    },
    {
      name: "Firepower",
      manufacturer: "Williams",
      year: 1980,
      rating: "7.816/10",
      ipdbId: "856",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=856"
    },
    {
      name: "Hardbody",
      manufacturer: "Bally Midway",
      year: 1987,
      rating: "6.6/10",
      ipdbId: "1122",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=1122"
    },
    {
      name: "High Speed 2: The Getaway",
      manufacturer: "Williams",
      year: 1992,
      rating: "8.148/10",
      ipdbId: "1000",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=1000"
    },
    {
      name: "Jurassic Park",
      manufacturer: "Stern",
      year: 2019,
      rating: "9.1/10",
      ipdbId: "6573",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=6573"
    },
    {
      name: "Metallica",
      manufacturer: "Stern",
      year: 2013,
      rating: "7.9/10",
      ipdbId: "6028",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=6028"
    },
    {
      name: "Old Chicago",
      manufacturer: "Bally",
      year: 1976,
      rating: "7.5/10",
      ipdbId: "1704",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=1704"
    },
    {
      name: "Pharaoh",
      manufacturer: "Williams",
      year: 1981,
      rating: "7.2/10",
      ipdbId: "1778",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=1778"
    },
    {
      name: "Road Show",
      manufacturer: "Williams",
      year: 1994,
      rating: "8.0/10",
      ipdbId: "1972",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=1972"
    },
    {
      name: "Roller Games",
      manufacturer: "Williams",
      year: 1990,
      rating: "7.5/10",
      ipdbId: "2006",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=2006"
    },
    {
      name: "Royal Flush",
      manufacturer: "Gottlieb",
      year: 1976,
      rating: "7.8/10",
      ipdbId: "2035",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=2035"
    },
    {
      name: "Shadow",
      manufacturer: "Bally",
      year: 1994,
      rating: "8.1/10",
      ipdbId: "2528",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=2528"
    },
    {
      name: "Space Station",
      manufacturer: "Williams",
      year: 1987,
      rating: "7.7/10",
      ipdbId: "2261",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=2261"
    },
    {
      name: "Space Time",
      manufacturer: "Bally",
      year: 1972,
      rating: "7.4/10",
      ipdbId: "2262",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=2262"
    },
    {
      name: "Star Trek: The Next Generation",
      manufacturer: "Williams",
      year: 1993,
      rating: "8.3/10",
      ipdbId: "2357",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=2357"
    },
    {
      name: "Stars",
      manufacturer: "Stern",
      year: 1978,
      rating: "7.4/10",
      ipdbId: "2366",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=2366"
    },
    {
      name: "Surf Champ",
      manufacturer: "Gottlieb",
      year: 1976,
      rating: "7.7/10",
      ipdbId: "2459",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=2459"
    },
    {
      name: "Tron",
      manufacturer: "Stern",
      year: 2011,
      rating: "7.9/10",
      ipdbId: "5682",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=5682"
    },
    {
      name: "Turtles",
      manufacturer: "Data East",
      year: 1991,
      rating: "6.8/10",
      ipdbId: "2509",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=2509"
    },
    {
      name: "Whirlwind",
      manufacturer: "Williams",
      year: 1990,
      rating: "8.201/10",
      ipdbId: "2765",
      ipdbUrl: "https://www.ipdb.org/machine.cgi?id=2765"
    },
    {
      name: "World Cup Soccer",
      manufacturer: "TBD",
      year: 0,
      rating: "TBD",
      ipdbId: "TBD",
      ipdbUrl: "#"
    }
  ];

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
            <p className="text-gray-400 italic">
              Maskinliste kommer snart...
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-cyan-500/50">
                    <th className="py-3 px-4 text-cyan-300 font-bold">Maskin</th>
                    <th className="py-3 px-4 text-cyan-300 font-bold hidden md:table-cell">Produsent</th>
                    <th className="py-3 px-4 text-cyan-300 font-bold hidden sm:table-cell">År</th>
                    <th className="py-3 px-4 text-cyan-300 font-bold hidden lg:table-cell">Rating</th>
                    <th className="py-3 px-4 text-cyan-300 font-bold">IPDB</th>
                  </tr>
                </thead>
                <tbody>
                  {machines.map((machine, index) => (
                    <tr
                      key={index}
                      className="border-b border-cyan-500/20 hover:bg-cyan-500/10 transition-colors"
                    >
                      <td className="py-3 px-4 text-gray-200 font-semibold">{machine.name}</td>
                      <td className="py-3 px-4 text-gray-300 hidden md:table-cell">{machine.manufacturer}</td>
                      <td className="py-3 px-4 text-gray-300 hidden sm:table-cell">{machine.year !== 0 ? machine.year : "TBD"}</td>
                      <td className="py-3 px-4 text-gray-300 hidden lg:table-cell">{machine.rating}</td>
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
          <a
            href="/"
            className="text-cyan-400 hover:text-cyan-200 underline"
          >
            ← Tilbake til forsiden
          </a>
        </div>
      </div>
    </div>
  );
}
