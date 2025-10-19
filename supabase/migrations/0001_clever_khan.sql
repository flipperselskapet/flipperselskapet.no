ALTER TABLE "registrations" ADD COLUMN "verified" timestamp DEFAULT NULL;--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "paid" timestamp DEFAULT NULL;--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "deleted" timestamp DEFAULT NULL;
