import {
  boolean,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),

  // Tournament selections
  mainTournament: boolean("main_tournament").notNull().default(false),
  warmupTournament: boolean("warmup_tournament").notNull().default(false),
  sideTournament: boolean("side_tournament").notNull().default(false),

  // Personal information
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  ifpaNumber: text("ifpa_number"),

  // Admin fields
  verifiedAt: timestamp("verified_at"),
  paidAt: timestamp("paid_at"),
  deletedAt: timestamp("deleted_at"),

  // Metadata
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type InsertRegistration = typeof registrations.$inferInsert;
export type SelectRegistration = typeof registrations.$inferSelect;

export const machines = pgTable("machines", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),
  manufacturer: text("manufacturer").notNull(),
  year: integer("year").notNull(),

  // Internet Pinball Database (https://www.ipdb.org)
  ipdbId: text("ipdb_id").notNull().unique(),
  ipdbUrl: text("ipdb_url").notNull(),
  // Average fun rating out of 10; null while the community hasn't rated it
  ipdbRating: numeric("ipdb_rating", { precision: 5, scale: 3 }),

  // Metadata
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type InsertMachine = typeof machines.$inferInsert;
export type SelectMachine = typeof machines.$inferSelect;
