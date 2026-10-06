import type { Metadata } from "next";
import {
  Apron,
  Backglass,
  Bumper,
  Link,
  Page,
  Panel,
  Plate,
} from "~/components/em";
import { machines } from "~/data/machines";
import MachineList from "./machine-list";

export const metadata: Metadata = {
  title: "Maskiner - Kristiania Flipperselskap",
  description: "Oversikt over flippermaskiner hos Kristiania Flipperselskap",
};

export default function Machines() {
  return (
    <Page>
      <Backglass kicker="Kristiania Flipperselskap">
        <h1 className="em-title font-display text-6xl md:text-8xl leading-none mb-6">
          Våre Maskiner
        </h1>
        <p className="text-lg md:text-xl text-em-paper max-w-2xl mx-auto mb-10">
          Oversikt over alle flippermaskiner hos Kristiania Flipperselskap
        </p>
        <Bumper top="TOTALT" big={String(machines.length)} label="Maskiner" />
      </Backglass>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="max-w-3xl mx-auto mb-8">
          <Plate accent="yellow">
            Vær oppmerksom på at ikke alle maskiner er tilgjengelige til enhver
            tid. Flippere krever vedlikehold, og maskintilstanden kan variere.
          </Plate>
        </div>

        <Panel accent="teal" title="Maskinliste">
          <MachineList machines={machines} />
        </Panel>

        <Apron>
          <p>
            <Link href="/">← Tilbake til forsiden</Link>
          </p>
        </Apron>
      </main>
    </Page>
  );
}
