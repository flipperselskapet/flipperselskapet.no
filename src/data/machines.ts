export interface Machine {
  name: string;
  manufacturer: string;
  year: number;
  rating: string;
  ipdbId: string;
  ipdbUrl: string;
}

export const machines: Machine[] = [
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
    rating: "7.5/10",
    ipdbId: "2737",
    ipdbUrl: "https://www.ipdb.org/machine.cgi?id=2737"
  },
  {
    name: "Wrestlemania",
    manufacturer: "Stern",
    year: 2015,
    rating: "8.0/10",
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
    manufacturer: "Bally/Midway",
    year: 1994,
    rating: "8.0/10",
    ipdbId: "2811",
    ipdbUrl: "https://www.ipdb.org/machine.cgi?id=2811"
  }
];
