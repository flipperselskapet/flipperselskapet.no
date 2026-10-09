import Link from "next/link";
import type { ReactNode } from "react";
import { EVENT_STARTS_AT } from "../xmas/register/opening";
import { AdminLogin } from "./admin-login";
import {
  BarList,
  ChartCard,
  ColumnChart,
  Legend,
  LineChart,
  StatTile,
  YearDots,
} from "./charts";
import { Countdown } from "./countdown";
import { getMachineStats, getXmasStats, RATING_BANDS } from "./dashboard-data";
import { checkAdminAuth } from "./login-actions";
import { getSillyStats } from "./silly-stats";

const nok = (value: number) => `${value.toLocaleString("nb-NO")} NOK`;
const percent = (part: number, whole: number) =>
  whole ? `${Math.round((part / whole) * 100)}%` : "–";

function formatDuration(ms: number) {
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)} s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ${Math.floor(seconds % 60)} s`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `${hours} h ${minutes % 60} min`;
  return `${Math.floor(hours / 24)} days`;
}

function Section({
  title,
  href,
  linkLabel,
  description,
  children,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-(color:--muted-foreground)">
            {description}
          </p>
        </div>
        {href && (
          <Link
            href={href}
            className="text-sm text-(color:--muted-foreground) underline-offset-4 hover:text-(color:--foreground) hover:underline"
          >
            {linkLabel} →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export default async function AdminOverviewPage() {
  if (!(await checkAdminAuth())) {
    return <AdminLogin />;
  }

  const now = new Date();
  const [xmas, machines] = await Promise.all([
    getXmasStats(now),
    getMachineStats(now),
  ]);
  const silly = getSillyStats(now);

  const tickEvery = Math.ceil(xmas.days.length / 4);
  const rampColor = (band: number) => `var(--chart-ramp-${band + 1})`;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
        <p className="text-sm text-(color:--muted-foreground)">
          How things are looking at flipperselskapet.no
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Countdown
          label="Registration opens"
          target={xmas.opensAt.getTime()}
          serverNow={now.getTime()}
          doneText="Registration is open 🎉"
        />
        <Countdown
          label="XMAS Matchplay Open starts"
          target={EVENT_STARTS_AT.getTime()}
          serverNow={now.getTime()}
          doneText="Game on! 🎯"
        />
      </div>

      <Section
        title="XMAS Matchplay Open 2026"
        description="Registrations, payments and sign-up patterns"
        href="/admin/xmas"
        linkLabel="Manage registrations"
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile
            label="Registered"
            value={
              <>
                {xmas.total}
                <span className="text-base font-normal text-(color:--muted-foreground)">
                  {" "}
                  / {xmas.autoVerifyLimit}
                </span>
              </>
            }
            meter={xmas.total / xmas.autoVerifyLimit}
            detail={
              xmas.autoVerifyFilledMs !== null
                ? `Auto-verify spots filled in ${formatDuration(xmas.autoVerifyFilledMs)}`
                : `${Math.max(0, xmas.autoVerifyLimit - xmas.total)} auto-verified spots left`
            }
          />
          <StatTile
            label="Verified"
            value={xmas.verified}
            detail={`${percent(xmas.verified, xmas.total)} of registrations`}
          />
          <StatTile
            label="Paid"
            value={xmas.paid}
            meter={xmas.total ? xmas.paid / xmas.total : 0}
            detail={`${xmas.total - xmas.paid} still to pay`}
          />
          <StatTile
            label="Entry fees collected"
            value={nok(xmas.collectedRevenue)}
            meter={
              xmas.expectedRevenue
                ? xmas.collectedRevenue / xmas.expectedRevenue
                : 0
            }
            detail={`of ${nok(xmas.expectedRevenue)} expected`}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard
            title="Registrations per day"
            description="New sign-ups each day (Oslo time)"
          >
            <ColumnChart
              columns={xmas.days.map((day, i) => ({
                key: day.key,
                value: day.count,
                title: `${day.weekday} ${day.label}: ${day.count} registration${day.count === 1 ? "" : "s"}`,
                tick: i % tickEvery === 0 ? day.label : undefined,
              }))}
            />
          </ChartCard>
          <ChartCard
            title="Running total"
            description="Registrations so far against the auto-verify limit"
          >
            <LineChart
              points={xmas.days.map((day) => ({
                value: day.total,
                title: `${day.label}: ${day.total} registered`,
              }))}
              reference={{
                value: xmas.autoVerifyLimit,
                label: `Auto-verify limit · ${xmas.autoVerifyLimit}`,
              }}
              firstTick={xmas.days[0]?.label}
              lastTick={xmas.days.at(-1)?.label}
              endLabel={String(xmas.total)}
            />
          </ChartCard>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <ChartCard
            title="Tournaments"
            description={`${xmas.allThree} player${xmas.allThree === 1 ? "" : "s"} took the package deal (all three)`}
          >
            <BarList
              rows={xmas.tournaments.map((t) => ({
                label: t.label,
                value: t.count,
              }))}
              max={Math.max(1, xmas.total)}
            />
          </ChartCard>
          <ChartCard title="Player pipeline" description="From sign-up to paid">
            <BarList
              rows={[
                {
                  label: "Registered",
                  value: xmas.total,
                  color: "var(--chart-ramp-2)",
                },
                {
                  label: "Verified",
                  value: xmas.verified,
                  color: "var(--chart-ramp-3)",
                },
                {
                  label: "Paid",
                  value: xmas.paid,
                  color: "var(--chart-ramp-4)",
                },
                {
                  label: "Has IFPA number",
                  value: xmas.withIfpa,
                  color: "var(--chart-ramp-5)",
                },
              ]}
              max={Math.max(1, xmas.total)}
            />
          </ChartCard>
          <ChartCard
            title="Fastest finger"
            description="First registration after opening"
          >
            {xmas.fastestFinger ? (
              <div className="space-y-1">
                <p className="text-3xl font-semibold tracking-tight">
                  {formatDuration(xmas.fastestFinger.ms)}
                </p>
                <p className="text-sm text-(color:--muted-foreground)">
                  {xmas.fastestFinger.name} hit the button first
                </p>
              </div>
            ) : (
              <p className="text-sm text-(color:--muted-foreground)">
                Nobody yet. Who will be first when registration opens?
              </p>
            )}
          </ChartCard>
        </div>

        <ChartCard
          title="When do players sign up?"
          description="Registrations by hour of the day (Oslo time)"
        >
          <ColumnChart
            height={120}
            columns={xmas.hours.map((h) => ({
              key: String(h.hour),
              value: h.count,
              title: `${String(h.hour).padStart(2, "0")}:00–${String(h.hour).padStart(2, "0")}:59: ${h.count} registration${h.count === 1 ? "" : "s"}`,
              tick:
                h.hour % 6 === 0
                  ? `${String(h.hour).padStart(2, "0")}:00`
                  : undefined,
            }))}
          />
        </ChartCard>
      </Section>

      <Section
        title="Machines"
        description="The club's collection, according to IPDB"
        href="/admin/machines"
        linkLabel="Manage machines"
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile label="Machines" value={machines.count} />
          <StatTile
            label="Average IPDB rating"
            value={machines.averageRating?.toFixed(2) ?? "–"}
            detail="out of 10"
          />
          <StatTile
            label="Oldest machine"
            value={machines.oldest?.year ?? "–"}
            detail={machines.oldest?.name}
          />
          <StatTile
            label="Average age"
            value={
              machines.averageAge === null
                ? "–"
                : `${Math.round(machines.averageAge)} years`
            }
            detail={
              machines.newest
                ? `Newest: ${machines.newest.name} (${machines.newest.year})`
                : undefined
            }
          />
        </div>

        <ChartCard
          title="The collection through time"
          description="One dot per machine by year of manufacture, shaded by IPDB rating. Hover a dot for details."
        >
          <div className="space-y-3">
            <YearDots
              firstYear={machines.firstYear}
              lastYear={machines.lastYear}
              dots={machines.machines.map((m) => ({
                key: m.id,
                year: m.year,
                color:
                  m.band === null ? "var(--chart-empty)" : rampColor(m.band),
                title: `${m.name} (${m.manufacturer}, ${m.year}) — ${m.rating === null ? "not rated yet" : `${m.rating}/10`}`,
              }))}
            />
            <Legend
              items={[
                ...RATING_BANDS.map((band, i) => ({
                  label: band.label,
                  color: rampColor(i),
                })),
                { label: "Not rated", color: "var(--chart-empty)" },
              ]}
            />
          </div>
        </ChartCard>

        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Manufacturers" description="Machines per maker">
            <BarList
              rows={machines.manufacturers.map((m) => ({
                label: m.name,
                value: m.count,
              }))}
            />
          </ChartCard>
          <ChartCard title="Top rated" description="Highest IPDB fun rating">
            <BarList
              rows={machines.topRated.map((m) => ({
                label: m.name,
                value: m.rating ?? 0,
                title: `${m.name} (${m.manufacturer}, ${m.year}): ${m.rating}/10`,
              }))}
              max={10}
              format={(value) => `${value}/10`}
            />
          </ChartCard>
        </div>
      </Section>

      <Section
        title="Totally made-up stats"
        description="Not real data. Freshly invented every day."
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <StatTile
            label="Nudges this season"
            value={silly.nudges.toLocaleString("nb-NO")}
            detail="Gentle ones, allegedly"
          />
          <StatTile
            label="“This machine is broken”"
            value={silly.sayingBadMachine}
            detail="It was not broken"
          />
          <StatTile
            label="Extra balls forgotten"
            value={silly.extraBallsWasted}
            detail="Lit, never collected"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard
            title="Excuses after draining"
            description="Share of post-drain explanations, %"
          >
            <BarList
              rows={silly.excuses}
              max={30}
              format={(value) => `${value}%`}
            />
          </ChartCard>
          <ChartCard
            title="Where balls go to die"
            description="Cause of death, % of drained balls"
          >
            <BarList
              rows={silly.drains}
              max={45}
              format={(value) => `${value}%`}
            />
          </ChartCard>
          <ChartCard
            title="Estimated beers drunk"
            description="Cumulative, over the tournament weekend"
            className="lg:col-span-2"
          >
            <LineChart
              height={200}
              points={silly.beers}
              reference={{ value: 240, label: "Fridge capacity · 240" }}
              firstTick="Fri 17:00"
              lastTick="Sun 17:00"
              endLabel={`~${silly.beers.at(-1)?.value} 🍺`}
            />
          </ChartCard>
          <ChartCard
            title="Player mood during a three-ball game"
            description="Hope, multiball, outlane. Hover for the story."
          >
            <LineChart
              points={silly.mood}
              max={100}
              firstTick="Plunge"
              lastTick="Game over"
              endLabel="😩"
            />
          </ChartCard>
          <ChartCard
            title="Coffee on tournament Saturday"
            description="Cups per hour at the club"
          >
            <ColumnChart columns={silly.coffee} unit=" cups" />
          </ChartCard>
        </div>
      </Section>
    </div>
  );
}
