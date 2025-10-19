CREATE TABLE "registrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"main_tournament" boolean DEFAULT false NOT NULL,
	"warmup_tournament" boolean DEFAULT false NOT NULL,
	"side_tournament" boolean DEFAULT false NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"ifpa_number" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
