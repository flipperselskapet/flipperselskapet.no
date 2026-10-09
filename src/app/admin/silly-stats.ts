// Completely made-up pinball "statistics" to liven up the dashboard. Seeded
// by the date, so the numbers stay put during a day and shuffle overnight.

function seededRandom(seed: number) {
  // mulberry32
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getSillyStats(now = new Date()) {
  const random = seededRandom(Math.floor(now.getTime() / 86_400_000));
  const between = (min: number, max: number) =>
    Math.round(min + random() * (max - min));

  const excuses = [
    { label: "Bad bounce", value: between(18, 30) },
    { label: "Machine is broken", value: between(15, 28) },
    { label: "Glare on the glass", value: between(6, 14) },
    { label: "Someone talked to me", value: between(5, 12) },
    { label: "Tilt is too tight", value: between(4, 10) },
    { label: "Skill issue", value: between(0, 2) },
  ].sort((a, b) => b.value - a.value);

  const drains = [
    { label: "Left outlane", value: between(30, 45) },
    { label: "Right outlane", value: between(25, 40) },
    { label: "Down the middle", value: between(10, 25) },
    { label: "Tilt", value: between(3, 9) },
    { label: "Lost in the machine", value: between(1, 3) },
  ];

  // A three ball game: hope, a multiball high, the inevitable drains.
  const story = [
    50, 55, 60, 52, 30, 45, 58, 70, 95, 100, 88, 40, 35, 48, 62, 66, 20, 12,
  ];
  const events: Record<number, string> = {
    4: "Ball 1 drains",
    9: "MULTIBALL!",
    11: "Multiball ends",
    16: "Ball 3 drains (outlane)",
    17: "Game over",
  };
  const mood = story.map((base, i) => {
    const value = Math.max(0, Math.min(100, base + between(-6, 6)));
    return {
      value,
      title: `${events[i] ?? `Minute ${i + 1}`}: mood ${value}/100`,
    };
  });

  // Cups of coffee per hour on tournament Saturday, 09:00 to 23:00.
  const coffee = Array.from({ length: 15 }, (_, i) => {
    const hour = 9 + i;
    const rush =
      hour === 9 ? 3 : hour === 13 ? 2 : hour === 18 || hour === 19 ? 1.6 : 1;
    const value = Math.round(between(4, 9) * rush);
    return {
      key: String(hour),
      value,
      title: `${hour}:00 — ${value} cups`,
      tick: hour % 3 === 0 ? `${hour}:00` : undefined,
    };
  });

  // Estimated beers drunk (cumulative) from Friday 17:00 to Sunday 17:00.
  const beerDays = ["Fri", "Sat", "Sun"];
  let beerTotal = 0;
  const beers = Array.from({ length: 25 }, (_, i) => {
    const hours = i * 2;
    const clock = 17 + hours;
    const label = `${beerDays[Math.floor(clock / 24)]} ${String(clock % 24).padStart(2, "0")}:00`;
    const estimate = 3 * (Math.exp(0.11 * hours) - 1) * (0.9 + random() * 0.2);
    beerTotal = Math.max(beerTotal, Math.round(estimate));
    return { value: beerTotal, title: `${label}: ~${beerTotal} beers` };
  });

  return {
    beers,
    excuses,
    drains,
    mood,
    coffee,
    nudges: between(1800, 4200),
    sayingBadMachine: between(40, 120),
    extraBallsWasted: between(2, 9),
  };
}
