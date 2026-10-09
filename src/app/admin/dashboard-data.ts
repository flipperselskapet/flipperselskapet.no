import { isNull } from "drizzle-orm";
import { db } from "~/db";
import { machines, registrations } from "~/db/schema";
import { env } from "~/env";
import { REGISTRATION_OPENS_AT } from "../xmas/register/opening";
import { registrationPrice } from "../xmas/register/prices";

const TIME_ZONE = "Europe/Oslo";
const DAY_MS = 24 * 60 * 60 * 1000;

const dayKeyFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const hourFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  hourCycle: "h23",
});
const dayLabelFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  day: "numeric",
  month: "short",
});
const weekdayFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  weekday: "long",
});

// "2026-10-10" in Oslo time
const dayKey = (date: Date) => dayKeyFormat.format(date);
const keyToUtc = (key: string) => new Date(`${key}T00:00:00Z`);

export async function getXmasStats(now = new Date()) {
  const rows = await db
    .select()
    .from(registrations)
    .where(isNull(registrations.deletedAt))
    .orderBy(registrations.createdAt);

  const verified = rows.filter((r) => r.verifiedAt);
  const paid = rows.filter((r) => r.paidAt);
  const expectedRevenue = rows.reduce(
    (sum, r) => sum + registrationPrice(r),
    0,
  );
  const collectedRevenue = paid.reduce(
    (sum, r) => sum + registrationPrice(r),
    0,
  );

  // One entry per day from opening (or the first test sign-up) until today,
  // always at least a week so an empty chart still has a shape.
  const counts = new Map<string, number>();
  for (const r of rows) {
    const key = dayKey(r.createdAt);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const firstKey = [dayKey(REGISTRATION_OPENS_AT), ...counts.keys()].sort()[0];
  const lastKey = [dayKey(now), ...counts.keys()].sort().at(-1) ?? firstKey;
  const start = keyToUtc(firstKey).getTime();
  const end = Math.max(keyToUtc(lastKey).getTime(), start + 6 * DAY_MS);
  let runningTotal = 0;
  const days: {
    key: string;
    label: string;
    weekday: string;
    count: number;
    total: number;
  }[] = [];
  for (let t = start; t <= end; t += DAY_MS) {
    const key = new Date(t).toISOString().slice(0, 10);
    const count = counts.get(key) ?? 0;
    runningTotal += count;
    days.push({
      key,
      label: dayLabelFormat.format(new Date(t)),
      weekday: weekdayFormat.format(new Date(t)),
      count,
      total: runningTotal,
    });
  }

  const hours = Array.from({ length: 24 }, (_, hour) => ({ hour, count: 0 }));
  for (const r of rows) {
    hours[Number(hourFormat.format(r.createdAt))].count++;
  }

  // Who hit the button first once registration opened, and how fast.
  const firstAfterOpening = rows.find(
    (r) => r.createdAt >= REGISTRATION_OPENS_AT,
  );
  const autoVerifyFilledAt =
    rows.length >= env.AUTO_VERIFY_LIMIT
      ? rows[env.AUTO_VERIFY_LIMIT - 1].createdAt
      : null;

  return {
    total: rows.length,
    verified: verified.length,
    paid: paid.length,
    withIfpa: rows.filter((r) => r.ifpaNumber?.trim()).length,
    expectedRevenue,
    collectedRevenue,
    autoVerifyLimit: env.AUTO_VERIFY_LIMIT,
    opensAt: REGISTRATION_OPENS_AT,
    isOpen: now >= REGISTRATION_OPENS_AT,
    now,
    days,
    hours,
    tournaments: [
      { label: "Warmup", count: rows.filter((r) => r.warmupTournament).length },
      { label: "Main", count: rows.filter((r) => r.mainTournament).length },
      { label: "Side", count: rows.filter((r) => r.sideTournament).length },
    ],
    allThree: rows.filter(
      (r) => r.warmupTournament && r.mainTournament && r.sideTournament,
    ).length,
    fastestFinger: firstAfterOpening
      ? {
          name: `${firstAfterOpening.firstName} ${firstAfterOpening.lastName}`,
          ms:
            firstAfterOpening.createdAt.getTime() -
            REGISTRATION_OPENS_AT.getTime(),
        }
      : null,
    autoVerifyFilledMs: autoVerifyFilledAt
      ? autoVerifyFilledAt.getTime() - REGISTRATION_OPENS_AT.getTime()
      : null,
  };
}

export type XmasStats = Awaited<ReturnType<typeof getXmasStats>>;

// Rating bands for the timeline dots, low to high (out of 10).
export const RATING_BANDS = [
  { label: "< 7", min: 0 },
  { label: "7–7.5", min: 7 },
  { label: "7.5–8", min: 7.5 },
  { label: "8–8.5", min: 8 },
  { label: "8.5+", min: 8.5 },
];

export async function getMachineStats(now = new Date()) {
  const rows = await db.select().from(machines).orderBy(machines.year);
  const list = rows.map((m) => {
    const rating = m.ipdbRating === null ? null : Number(m.ipdbRating);
    return {
      id: m.id,
      name: m.name,
      manufacturer: m.manufacturer,
      year: m.year,
      rating,
      band:
        rating === null
          ? null
          : RATING_BANDS.findLastIndex((band) => rating >= band.min),
    };
  });

  // "Bally/Midway" and "Bally Midway" are the same company.
  const byManufacturer = new Map<string, number>();
  for (const m of list) {
    const name = m.manufacturer.replace(/\s*\/\s*/g, " ");
    byManufacturer.set(name, (byManufacturer.get(name) ?? 0) + 1);
  }

  const rated = list.filter((m) => m.rating !== null);
  const currentYear = now.getFullYear();
  const years = list.map((m) => m.year);

  return {
    machines: list,
    count: list.length,
    averageRating: rated.length
      ? rated.reduce((sum, m) => sum + (m.rating ?? 0), 0) / rated.length
      : null,
    averageAge: list.length
      ? years.reduce((sum, y) => sum + (currentYear - y), 0) / list.length
      : null,
    oldest: list[0] ?? null,
    newest: list.at(-1) ?? null,
    firstYear: Math.floor(Math.min(...years, currentYear) / 10) * 10,
    lastYear: currentYear,
    manufacturers: [...byManufacturer]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
    topRated: rated
      .toSorted((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 5),
  };
}

export type MachineStats = Awaited<ReturnType<typeof getMachineStats>>;
