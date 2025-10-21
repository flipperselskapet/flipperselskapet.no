import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),

  // Tournament selections
  mainTournament: boolean("main_tournament").notNull().default(false),
  warmupTournament: boolean("warmup_tournament").notNull().default(false),
  sideTournament: boolean("side_tournament").notNull().default(false),
  leftoversTournament: boolean("leftovers_tournament").notNull().default(false),

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
