import type { Metadata } from "next";
import { connection } from "next/server";
import { Backglass, Link, Page } from "~/components/em";
import { XmasFooter } from "../footer";
import { isRegistrationOpen } from "./opening";
import { RegistrationForm } from "./registration-form";

export const metadata: Metadata = {
  title: "Register - XMAS Matchplay Open 2026",
  description: "Register for XMAS Matchplay Open 2026 tournament",
};

export default async function RegisterPage() {
  await connection();
  const isOpen = isRegistrationOpen();

  return (
    <Page>
      <Backglass kicker="XMAS Matchplay Open 2026">
        <h1 className="em-title font-display text-5xl md:text-7xl leading-none">
          Registration
        </h1>
      </Backglass>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="em-panel p-6 md:p-8 mb-10">
          {isOpen ? (
            <RegistrationForm />
          ) : (
            <div className="text-center space-y-4">
              <h2 className="font-label font-bold uppercase tracking-wide text-3xl text-em-teal">
                Registration opens soon!
              </h2>
              <p className="font-display text-3xl text-em-red">
                Saturday, October 10th at 12:00
              </p>
              <p>
                Tournaments run December 4th–6th. Prices and payment details:
                TBD
              </p>
              <p className="text-sm">
                Spots are limited — come back on Saturday to secure yours.
              </p>
            </div>
          )}
        </div>

        <XmasFooter>
          <p>
            <Link href="/xmas">← Tournament information</Link>
          </p>
        </XmasFooter>
      </main>
    </Page>
  );
}
