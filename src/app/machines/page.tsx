import type { Metadata } from "next";
import { connection } from "next/server";
import {
  Footer,
  Hero,
  Link,
  Note,
  Page,
  Panel,
  SawBlade,
  Title,
} from "~/components/saw";
import { getMachines } from "~/data/machines";
import MachineList from "./machine-list";

export const metadata: Metadata = {
  title: "Maskiner - Kristiania Flipperselskap",
  description: "Oversikt over flippermaskiner hos Kristiania Flipperselskap",
};

export default async function Machines() {
  await connection();
  const machines = await getMachines();

  return (
    <Page>
      <Hero kicker="Kristiania Flipperselskap">
        <Title size="text-6xl md:text-8xl">Våre Maskiner</Title>
        <p className="text-lg md:text-xl text-saw-ash max-w-2xl mx-auto mb-10">
          Oversikt over alle flippermaskiner hos Kristiania Flipperselskap
        </p>
        <SawBlade top="TOTALT" big={String(machines.length)} label="Maskiner" />
      </Hero>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="max-w-3xl mx-auto mb-8">
          <Note>
            Vær oppmerksom på at ikke alle maskiner er tilgjengelige til enhver
            tid. Flippere krever vedlikehold, og maskintilstanden kan variere.
          </Note>
        </div>

        <Panel title="Maskinliste">
          <MachineList machines={machines} />
        </Panel>

        <Footer>
          <p>
            <Link href="/">← Tilbake til forsiden</Link>
          </p>
        </Footer>
      </main>
    </Page>
  );
}
