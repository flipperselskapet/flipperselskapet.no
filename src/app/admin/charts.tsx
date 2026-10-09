// Small, dependency-free charts for the admin dashboard. Plain HTML/CSS (plus
// an SVG line), so text stays crisp at any width. Hovering a mark shows its
// value via the native title tooltip; peaks and end points are labelled.
import type { CSSProperties, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui";

// Rounds up to a tidy axis maximum (1, 2, 2.5, 3, 4, 5, 6, 8, 10, 20, ...).
export function niceMax(value: number) {
  if (value <= 1) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step =
    [1, 2, 2.5, 3, 4, 5, 6, 8, 10].find((s) => s * magnitude >= value) ?? 10;
  return step * magnitude;
}

const formatNumber = (value: number) => value.toLocaleString("nb-NO");

export function ChartCard({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function StatTile({
  label,
  value,
  detail,
  meter,
}: {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
  meter?: number; // 0..1
}) {
  return (
    <Card>
      <CardHeader className="gap-1">
        <CardDescription>{label}</CardDescription>
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
        {meter !== undefined && (
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-(color:--chart-ramp-1)/40">
            <div
              className="h-full rounded-full bg-(color:--chart-1)"
              style={{ width: `${Math.min(1, meter) * 100}%` }}
            />
          </div>
        )}
        {detail && (
          <p className="text-xs text-(color:--muted-foreground)">{detail}</p>
        )}
      </CardHeader>
    </Card>
  );
}

function YAxis({ max, height }: { max: number; height: number }) {
  return (
    <div
      className="relative w-8 shrink-0 text-right text-[11px] tabular-nums text-(color:--muted-foreground)"
      style={{ height }}
    >
      {[max, max / 2, 0].map((tick, i) => (
        <span
          key={tick}
          className="absolute right-2 -translate-y-1/2"
          style={{ top: `${i * 50}%` }}
        >
          {Number.isInteger(tick) ? formatNumber(tick) : ""}
        </span>
      ))}
    </div>
  );
}

function Gridlines() {
  return (
    <>
      {[0, 50].map((top) => (
        <div
          key={top}
          className="absolute inset-x-0 h-px bg-(color:--chart-grid)"
          style={{ top: `${top}%` }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-px bg-(color:--border)" />
    </>
  );
}

export type Column = {
  key: string;
  value: number;
  title: string;
  tick?: string; // axis label; omit to leave the slot unlabelled
};

export function ColumnChart({
  columns,
  height = 160,
  unit = "",
}: {
  columns: Column[];
  height?: number;
  unit?: string;
}) {
  const peak = Math.max(0, ...columns.map((c) => c.value));
  // Leave headroom so the peak label stays inside the plot.
  const max = niceMax(peak * 1.15);
  const peakIndex = columns.findIndex((c) => c.value === peak && peak > 0);

  return (
    <div className="flex">
      <YAxis max={max} height={height} />
      <div className="min-w-0 flex-1">
        <div className="relative" style={{ height }}>
          <Gridlines />
          <div className="absolute inset-0 flex items-end gap-[2px]">
            {columns.map((column, i) => (
              <div
                key={column.key}
                title={column.title}
                className="group relative flex h-full flex-1 items-end justify-center"
              >
                {column.value > 0 && (
                  <div
                    className="w-full max-w-6 rounded-t-[4px] bg-(color:--chart-1) transition-opacity group-hover:opacity-75"
                    style={{ height: `${(column.value / max) * 100}%` }}
                  />
                )}
                {i === peakIndex && (
                  <span
                    className="absolute whitespace-nowrap pb-1 text-xs font-medium tabular-nums"
                    style={{ bottom: `${(column.value / max) * 100}%` }}
                  >
                    {formatNumber(column.value)}
                    {unit}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex h-6 gap-[2px] text-[11px] text-(color:--muted-foreground)">
          {columns.map((column) => (
            <div key={column.key} className="relative flex-1">
              {column.tick && (
                <span className="absolute top-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  {column.tick}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LineChart({
  points,
  height = 160,
  min = 0,
  max: fixedMax,
  reference,
  firstTick,
  lastTick,
  endLabel,
}: {
  points: { value: number; title: string }[];
  height?: number;
  min?: number;
  max?: number;
  reference?: { value: number; label: string };
  firstTick?: string;
  lastTick?: string;
  endLabel?: string;
}) {
  const max =
    fixedMax ??
    niceMax(Math.max(reference?.value ?? 0, ...points.map((p) => p.value)));
  const x = (i: number) => (points.length > 1 ? i / (points.length - 1) : 0.5);
  const y = (value: number) => 1 - (value - min) / (max - min);
  const line = points
    .map(
      (p, i) => `${(x(i) * 100).toFixed(2)},${(y(p.value) * 100).toFixed(2)}`,
    )
    .join(" ");
  const last = points.at(-1);

  return (
    <div className="flex">
      <YAxis max={max} height={height} />
      <div className="min-w-0 flex-1">
        <div className="relative" style={{ height }}>
          <Gridlines />
          {reference && (
            <div
              className="absolute inset-x-0 border-t border-(color:--muted-foreground)/60"
              style={{ top: `${y(reference.value) * 100}%` }}
            >
              <span className="absolute right-0 -top-5 text-[11px] text-(color:--muted-foreground)">
                {reference.label}
              </span>
            </div>
          )}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <polygon
              points={`0,100 ${line} 100,100`}
              fill="var(--chart-1)"
              fillOpacity={0.1}
            />
            <polyline
              points={line}
              fill="none"
              stroke="var(--chart-1)"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {/* Invisible hover strips, one per point */}
          <div className="absolute inset-0 flex">
            {points.map((p, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: points are positional
                key={i}
                title={p.title}
                className="h-full flex-1 hover:bg-(color:--chart-1)/5"
              />
            ))}
          </div>
          {last && (
            <div
              className="pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(color:--chart-1) shadow-[0_0_0_2px_var(--card)]"
              style={{
                left: `${x(points.length - 1) * 100}%`,
                top: `${y(last.value) * 100}%`,
              }}
            >
              {endLabel && (
                <span className="absolute right-3 bottom-2 whitespace-nowrap text-xs font-medium tabular-nums">
                  {endLabel}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex h-6 justify-between pt-1.5 text-[11px] text-(color:--muted-foreground)">
          <span>{firstTick}</span>
          <span>{lastTick}</span>
        </div>
      </div>
    </div>
  );
}

export function BarList({
  rows,
  max: fixedMax,
  format = formatNumber,
}: {
  rows: { label: string; value: number; color?: string; title?: string }[];
  max?: number;
  format?: (value: number) => string;
}) {
  const max = fixedMax ?? Math.max(1, ...rows.map((r) => r.value));
  return (
    <div className="space-y-2.5">
      {rows.map((row) => (
        <div
          key={row.label}
          title={row.title ?? `${row.label}: ${format(row.value)}`}
          className="group flex items-center gap-3 text-sm"
        >
          <span className="w-32 shrink-0 truncate sm:w-40 text-(color:--muted-foreground)">
            {row.label}
          </span>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div
              className="h-4 rounded-r-[4px] transition-opacity group-hover:opacity-75"
              style={
                {
                  width: `${(row.value / max) * 100}%`,
                  minWidth: row.value > 0 ? 2 : 0,
                  background: row.color ?? "var(--chart-1)",
                } as CSSProperties
              }
            />
            <span className="shrink-0 text-xs font-medium tabular-nums">
              {format(row.value)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Legend({
  items,
}: {
  items: { label: string; color: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-(color:--muted-foreground)">
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          <span
            className="size-2.5 rounded-full"
            style={{ background: item.color }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}

// One column per year with a dot per item, stacked upwards like a beeswarm.
export function YearDots({
  firstYear,
  lastYear,
  dots,
}: {
  firstYear: number;
  lastYear: number;
  dots: { key: string | number; year: number; color: string; title: string }[];
}) {
  const years = Array.from(
    { length: lastYear - firstYear + 1 },
    (_, i) => firstYear + i,
  );
  const byYear = Map.groupBy(dots, (dot) => dot.year);
  const tallest = Math.max(1, ...[...byYear.values()].map((d) => d.length));

  return (
    <div className="overflow-x-auto pb-1">
      <div className="min-w-[640px]">
        <div
          className="relative flex items-end border-b border-(color:--border)"
          style={{ height: tallest * 13 + 8 }}
        >
          {years.map((year) => (
            <div
              key={year}
              className={`flex h-full flex-1 flex-col-reverse items-center gap-[3px] pb-[3px] ${year % 10 === 0 ? "border-l border-(color:--chart-grid)" : ""}`}
            >
              {byYear.get(year)?.map((dot) => (
                <span
                  key={dot.key}
                  title={dot.title}
                  className="size-2.5 shrink-0 rounded-full shadow-[0_0_0_2px_var(--card)] transition-transform hover:scale-150"
                  style={{ background: dot.color }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex h-6 text-[11px] text-(color:--muted-foreground)">
          {years.map((year) => (
            <div key={year} className="relative flex-1">
              {year % 10 === 0 && (
                <span className="absolute top-1.5 left-0">{year}s</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
