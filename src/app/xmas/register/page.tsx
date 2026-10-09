import type { Metadata } from "next";
import { connection } from "next/server";
import { Hero, Link, Page, Title } from "~/components/saw";
import { checkAdminAuth } from "../admin/login-actions";
import { XmasFooter } from "../footer";
import { isRegistrationOpen } from "./opening";
import { RegistrationForm } from "./registration-form";

export const metadata: Metadata = {
  title: "Register - XMAS Matchplay Open 2026",
  description: "Register for XMAS Matchplay Open 2026 tournament",
};

export default async function RegisterPage() {
  await connection();
  const isPublic = isRegistrationOpen();
  // Admins can use the form before registration opens to the public
  const isOpen = isPublic || (await checkAdminAuth());

  return (
    <Page>
      <Hero kicker="XMAS Matchplay Open 2026">
        <Title size="text-5xl md:text-8xl">Registration</Title>
      </Hero>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="saw-panel p-6 md:p-10 mb-10">
          {isOpen ? (
            <>
              {!isPublic && (
                <div className="saw-note px-5 py-4 mb-6">
                  <strong>Admin access:</strong> Registration is not open to the
                  public yet. Registrations submitted here are real.
                </div>
              )}
              <RegistrationForm />
            </>
          ) : (
            <div className="text-center space-y-4">
              <h2 className="font-label font-bold uppercase tracking-wide text-3xl text-saw-blood-light">
                Registration opens soon!
              </h2>
              <p className="font-grunge text-3xl text-saw-bone">
                Saturday, October 10th at 20:00
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
