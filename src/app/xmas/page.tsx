import { and, isNotNull, isNull } from "drizzle-orm";
import type { Metadata } from "next";
import Image from "next/image";
import { connection } from "next/server";
import { db } from "~/db";
import { registrations } from "~/db/schema";
import { isRegistrationOpen } from "./register/opening";
import {
  Footer,
  Hero,
  Link,
  Note,
  Page,
  Panel,
  Plate,
  Rivet,
  SawBlade,
  SubHeading,
} from "./saw";

export const metadata: Metadata = {
  title: "XMAS Matchplay Open 2026 - Kristiania Flipperselskap",
  description: "Annual pinball championship in Oslo - XMAS Matchplay Open 2026",
};

const schedule = [
  {
    day: "Friday, Dec 4th",
    title: "XMAS Warmup",
    items: [
      { time: "17.00–18.00", label: "Attendance and registration" },
      { time: "00.30", label: "Tournament over" },
    ],
  },
  {
    day: "Saturday, Dec 5th",
    title: "XMAS Main qualifications & Side Tournament",
    items: [
      { time: "09.30–10.00", label: "Attendance and registration" },
      { time: "10.00–10.15", label: "Information about the day" },
      { time: "10.15", label: "Qualifications start" },
      { time: "12.45–13.30", label: "Break for food/shopping" },
      { time: "18.00", label: "Qualifications done" },
      { time: "19.45", label: "XMAS Side Tournament" },
    ],
  },
  {
    day: "Sunday, Dec 6th",
    title: "XMAS Main finals",
    items: [
      { time: "09.30", label: "Finals start" },
      { time: "17.00", label: "Finals done" },
    ],
  },
];

export default async function Xmas2026() {
  await connection();
  const isOpen = isRegistrationOpen();

  // Get count of verified, non-deleted registrations
  const verifiedPlayers = await db
    .select()
    .from(registrations)
    .where(
      and(isNull(registrations.deletedAt), isNotNull(registrations.verifiedAt)),
    );

  const playerCount = verifiedPlayers.length;

  return (
    <Page>
      <Hero kicker="Kristiania Flipperselskap presents">
        <h1 className="mb-3">
          <Image
            src="/xmas-logo.jpg"
            alt="XMAS"
            width={1672}
            height={941}
            priority
            className="saw-logo relative left-1/2 -translate-x-1/2 w-[160%] max-w-none h-auto -my-10 md:w-full md:max-w-4xl md:-mt-10 md:-mb-12"
          />
          <span className="block font-label font-bold uppercase tracking-[0.3em] text-2xl md:text-4xl text-saw-bone">
            Matchplay Open 2026
          </span>
        </h1>
        <p className="font-type text-saw-blood-light text-lg md:text-xl mb-12">
          “I want to play a game.” · Oslo · December 4th–6th
        </p>
        <div className="flex justify-center gap-6 md:gap-14">
          <SawBlade top="FRI" big="4" label="Warmup" />
          <SawBlade top="SAT" big="5" label="Main · Side" />
          <SawBlade top="SUN" big="6" label="Finals · Leftovers" />
        </div>
      </Hero>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="max-w-3xl mx-auto text-center text-lg leading-relaxed mb-12 space-y-4">
          <p>
            Kristiania Flipperselskap is a private pinball club located in Oslo,
            Norway. With 40+ pinball machines of different eras and in close
            proximity to shops, restaurants and pubs - only 15 minutes outside
            downtown Oslo - we are excited to host another XMAS annual
            tournament!
          </p>
          <p>
            Join us for a weekend of intense pinball action, December 4th–6th!
            This page will contain all necessary information about registration,
            tournament formats, schedule, accommodation, food and transport. The
            registration link will be posted closer to the registration date.
          </p>
        </div>

        <Panel title="Registration">
          <div className="space-y-5">
            {isOpen ? (
              <div className="space-y-4">
                <p className="font-label font-bold uppercase tracking-wide text-2xl text-saw-blood-light">
                  Registration is now open!
                </p>
                <a href="/xmas/register" className="saw-button text-xl">
                  Register now ▸
                </a>
                <div className="flex items-center gap-3 pt-2">
                  <Link href="/xmas/players">View registered players</Link>
                  {playerCount > 0 && (
                    <span className="font-label font-bold text-sm bg-saw-blood-dark text-saw-bone border border-saw-blood-light rounded-sm px-3 py-0.5">
                      {playerCount} {playerCount === 1 ? "player" : "players"}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <p className="font-label font-bold uppercase tracking-wide text-2xl text-saw-blood-light mb-1">
                  Registration opens Saturday, October 10th at 12:00
                </p>
                <p>Spots are limited — be ready when registration opens.</p>
              </div>
            )}

            <p>
              You can register for one or more of the Warmup (Friday), Main
              (Saturday–Sunday) and Side Tournament (Saturday). Leftovers on
              Sunday require no registration – sign up on the spot.
            </p>

            <Note>Limited spots due to space and facility limitations.</Note>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <SubHeading>Entry fees</SubHeading>
                <p>TBD</p>
              </div>
              <div>
                <SubHeading>Payment details</SubHeading>
                <p>TBD</p>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Schedule">
          <p className="font-type text-saw-ash mb-6">
            Preliminary – times may change.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {schedule.map((day) => (
              <div key={day.day}>
                <div className="bg-saw-blood-dark text-saw-bone border border-saw-blood rounded-t-sm px-4 py-2">
                  <h3 className="font-label font-bold uppercase tracking-wide text-lg">
                    {day.day}
                  </h3>
                  <p className="text-sm opacity-90">{day.title}</p>
                </div>
                <ul className="border border-t-0 border-saw-steel rounded-b-sm bg-black/40 px-4 py-4 space-y-3">
                  {day.items.map((item) => (
                    <li key={item.time + item.label} className="flex gap-3">
                      <Rivet className="h-3 w-3 mt-1.5" />
                      <div>
                        <div className="font-label font-bold tracking-wide">
                          {item.time}
                        </div>
                        <div className="text-sm text-saw-ash">{item.label}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="font-type text-sm text-saw-ash mt-4">
            The side tournament start time may change if qualifications run
            longer than planned.
          </p>
          <div className="mt-6">
            <Plate>
              <strong>Arriving early?</strong> Illegal Pinball will host a
              tournament on Thursday, December 3rd at their location in downtown
              Oslo. Link to that event to come.
            </Plate>
          </div>
        </Panel>

        <Panel title="Tournament Format">
          <p className="font-type text-saw-ash mb-6">
            Preliminary – details may change.
          </p>
          <div className="space-y-8">
            <div>
              <SubHeading>XMAS Warmup · Friday</SubHeading>
              <p>Format will be finalized ASAP.</p>
            </div>

            <div>
              <SubHeading>XMAS Main · Qualifications · Saturday</SubHeading>
              <div className="space-y-2">
                <p>
                  Group matchplay: 10 rounds with 2 games in each round. The
                  first round uses slaughter pairing, after that strict Swiss
                  pairing.
                </p>
                <p>
                  With 48 or more players, the top 24 advance to the finals.
                  With fewer than 48 players, the top 16 advance.
                </p>
              </div>
            </div>

            <div>
              <SubHeading>XMAS Main · Finals · Sunday</SubHeading>
              <div className="space-y-2">
                <p>
                  Three or four rounds of group matchplay (depending on how many
                  advance), each round consisting of 4 or 5 games. Scoring is
                  7-5-3-1, and the top two in each group advance to the next
                  round. This continues until the finals are done and the XMAS
                  champion of 2026 is determined!
                </p>
                <p>
                  <strong>Quarterfinals:</strong> The top seed from
                  qualification in each group chooses the game bank, then
                  chooses their starting position on game 1.
                </p>
                <p>
                  <strong>Semifinals and finals:</strong> The top seed from
                  qualification in each group chooses games 1 and 2, then the
                  following seeds each choose a machine. The top seed then
                  chooses starting position on game 1. Each game can only be
                  chosen once during the semifinals and finals.
                </p>
                <p>
                  In all rounds, starting order choice on subsequent games is
                  determined by the previous game's results.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <SubHeading>Side Tournament · Saturday</SubHeading>
                <p>Format TBA.</p>
              </div>
              <div>
                <SubHeading>Leftovers · Sunday</SubHeading>
                <p>
                  There will be leftover tournaments. No registration needed –
                  sign up on the spot. Details will be announced closer to the
                  tournament.
                </p>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Practical Information">
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
            <div>
              <SubHeading>Location</SubHeading>
              <p className="font-semibold">Kristiania Flipperselskap</p>
              <p className="mb-3">
                <Link
                  href="https://maps.google.com/?q=Veitvetveien+8,+0596+Oslo"
                  external
                >
                  Veitvetveien 8, 0596 Oslo
                </Link>
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Access:</strong> We are located in the basement of the
                  shopping mall. The entrance is on the right side of the
                  building (when facing Kiwi). Walk around the corner on the
                  right into the little alley, and the door will be on the left
                  side.
                </p>
                <p>
                  <strong>Door:</strong> The door will be open during tournament
                  hours. If locked, contact us on{" "}
                  <Link href="/slack">Slack</Link>.
                </p>
              </div>
            </div>

            <div>
              <SubHeading>Transport</SubHeading>
              <div className="space-y-2">
                <p>
                  <strong>Metro:</strong> Take Line 5 to{" "}
                  <strong>Veitvet station</strong> (15 minutes from downtown
                  Oslo).
                </p>
                <p className="text-sm">
                  Line 5 passes through several downtown stations:
                  Nationalteateret, Stortinget, Jernbanetorget, and Grønland.
                </p>
              </div>
            </div>

            <div>
              <SubHeading>Accommodation</SubHeading>
              <div className="space-y-2">
                <p>
                  <strong>Nearest hotel:</strong>{" "}
                  <Link
                    href="https://www.thonhotels.com/our-hotels/norway/oslo/thon-hotel-linne/"
                    external
                  >
                    Thon Hotel Linne, Lindeberg
                  </Link>{" "}
                  - 20 minutes walk or one metro stop from the venue.
                </p>
                <p className="text-sm">
                  Alternatively, book a hotel in downtown Oslo near metro Line 5
                  for easy 15-minute direct access to Veitvet.
                </p>
              </div>
            </div>

            <div>
              <SubHeading>Machines</SubHeading>
              <p className="mb-2">
                Tournament machines will be announced soon.
              </p>
              <p className="text-sm">
                View our complete machine collection on the{" "}
                <Link href="/machines">machines page</Link>.
              </p>
            </div>

            <div className="md:col-span-2">
              <SubHeading>Food & Drinks</SubHeading>
              <p className="mb-3">
                Veitvet shopping mall has several restaurants and shops:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-label font-bold uppercase tracking-wide mb-1">
                    Restaurants
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Drabanten Spiseri og Catering</li>
                    <li>Lucky Bowl</li>
                    <li>Tim's Burger</li>
                    <li>Veitvet Sportsbar & Pizza</li>
                    <li>VV Sushi</li>
                  </ul>
                </div>
                <div>
                  <p className="font-label font-bold uppercase tracking-wide mb-1">
                    Grocery stores
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Kiwi</li>
                    <li>Rema 1000</li>
                  </ul>
                </div>
              </div>
              <p className="font-type text-sm text-saw-ash mt-3">
                Opening hours at{" "}
                <Link href="https://veitvetsenteret.no/butikker/" external>
                  veitvetsenteret.no/butikker
                </Link>
              </p>
            </div>
          </div>
        </Panel>

        <Footer />
      </main>
    </Page>
  );
}
