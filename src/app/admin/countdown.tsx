"use client";

import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader } from "./ui";

const UNITS = [
  { label: "days", ms: 86_400_000 },
  { label: "hrs", ms: 3_600_000 },
  { label: "min", ms: 60_000 },
  { label: "sec", ms: 1_000 },
];

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Oslo",
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

// Ticks every second. Starts from the server's clock so the first client
// render matches the server HTML.
export function Countdown({
  label,
  target,
  serverNow,
  doneText,
}: {
  label: string;
  target: number;
  serverNow: number;
  doneText: string;
}) {
  const [now, setNow] = useState(serverNow);

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  let remaining = Math.max(0, target - now);
  const parts = UNITS.map((unit) => {
    const value = Math.floor(remaining / unit.ms);
    remaining -= value * unit.ms;
    return { ...unit, value };
  });

  return (
    <Card>
      <CardHeader className="gap-3">
        <CardDescription>
          {label} · {dateFormat.format(target)}
        </CardDescription>
        {now >= target ? (
          <p className="text-3xl font-semibold tracking-tight">{doneText}</p>
        ) : (
          <div className="flex gap-2" role="timer" aria-live="off">
            {parts.map((part) => (
              <div
                key={part.label}
                className="min-w-14 rounded-lg bg-(color:--muted) px-2 py-1.5 text-center"
              >
                <p className="text-2xl font-semibold tabular-nums">
                  {String(part.value).padStart(2, "0")}
                </p>
                <p className="text-[11px] text-(color:--muted-foreground)">
                  {part.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardHeader>
    </Card>
  );
}
