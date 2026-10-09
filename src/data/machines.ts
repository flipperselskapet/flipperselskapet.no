import { asc } from "drizzle-orm";
import { db } from "~/db";
import { machines as machinesTable } from "~/db/schema";

export interface Machine {
  id: number;
  name: string;
  manufacturer: string;
  year: number;
  rating: string;
  ipdbId: string;
  ipdbUrl: string;
}

// Ratings are stored as numbers out of 10; null means no community rating yet.
function formatRating(rating: string | null) {
  if (rating === null) return "TBD";
  return `${Number.parseFloat(rating)}/10`;
}

export async function getMachines(): Promise<Machine[]> {
  const rows = await db
    .select()
    .from(machinesTable)
    .orderBy(asc(machinesTable.id));

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    manufacturer: row.manufacturer,
    year: row.year,
    rating: formatRating(row.ipdbRating),
    ipdbId: row.ipdbId,
    ipdbUrl: row.ipdbUrl,
  }));
}
