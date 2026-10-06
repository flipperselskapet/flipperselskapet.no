import type { ReactNode } from "react";

// Building blocks for the Saw-inspired, industrial look of the site.

export function Page({ children }: { children: ReactNode }) {
  return <div className="saw-page min-h-screen font-sans">{children}</div>;
}

export function Hero({
  kicker,
  children,
}: {
  kicker: string;
  children: ReactNode;
}) {
  return (
    <header className="saw-hero overflow-hidden border-b border-saw-steel">
      <div className="container mx-auto px-4 py-14 md:py-20 text-center">
        <p className="font-type text-saw-ash text-sm md:text-base tracking-widest mb-8">
          {kicker}
        </p>
        {children}
      </div>
    </header>
  );
}

// Distressed title framed by dashed cut marks, like the logo.
export function Title({
  children,
  size = "text-6xl md:text-8xl",
}: {
  children: ReactNode;
  size?: string;
}) {
  return (
    <div className="relative inline-block px-6 md:px-10 py-6 md:py-8 mb-10 max-w-full">
      <span aria-hidden className="saw-cut top-0 left-[12%] w-[46%]" />
      <span aria-hidden className="saw-cut top-0 right-[6%] w-[18%]" />
      <span aria-hidden className="saw-cut bottom-0 left-0 w-[38%]" />
      <span aria-hidden className="saw-cut bottom-0 right-0 w-[34%]" />
      <span aria-hidden className="saw-cut-v -top-5 h-12 left-[4%]" />
      <span aria-hidden className="saw-cut-v -top-3 -bottom-8 right-[24%]" />
      <h1 className={`saw-title font-grunge leading-none ${size}`}>
        {children}
      </h1>
    </div>
  );
}

function bladePoints(teeth: number, outer: number, inner: number) {
  const points: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const b = ((i + 0.85) / teeth) * Math.PI * 2;
    points.push(
      `${(50 + outer * Math.cos(a)).toFixed(2)},${(50 + outer * Math.sin(a)).toFixed(2)}`,
      `${(50 + inner * Math.cos(b)).toFixed(2)},${(50 + inner * Math.sin(b)).toFixed(2)}`,
    );
  }
  return points.join(" ");
}

const BLADE = bladePoints(28, 49, 42);

// Circular saw blade with text in the middle.
export function SawBlade({
  top,
  big,
  label,
}: {
  top: string;
  big: string;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-24 w-24 md:h-32 md:w-32 transition-transform duration-700 hover:rotate-45">
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full drop-shadow-[0_6px_10px_rgb(0_0_0/0.7)]"
        >
          <defs>
            <linearGradient id="saw-steel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#e4e0d8" />
              <stop offset="0.45" stopColor="#8b8680" />
              <stop offset="0.6" stopColor="#5a5652" />
              <stop offset="1" stopColor="#b9b4ab" />
            </linearGradient>
          </defs>
          <polygon
            points={BLADE}
            fill="url(#saw-steel)"
            stroke="#1a1616"
            strokeWidth="0.8"
          />
          <circle cx="50" cy="50" r="31" fill="#1b1616" stroke="#000" />
          <circle
            cx="50"
            cy="50"
            r="36"
            fill="none"
            stroke="#3a3433"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          <path
            d="M77 23 A38 38 0 0 1 87 57"
            stroke="#8f0f15"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center leading-none">
          <div>
            <div className="font-label font-bold text-[10px] md:text-xs tracking-widest text-saw-ash">
              {top}
            </div>
            <div className="font-grunge text-3xl md:text-4xl text-saw-bone">
              {big}
            </div>
          </div>
        </div>
      </div>
      {label && (
        <div className="font-label uppercase tracking-widest text-sm text-saw-bone">
          {label}
        </div>
      )}
    </div>
  );
}

export function Rivet({ className = "h-3 w-3" }: { className?: string }) {
  return <span aria-hidden className={`saw-rivet ${className}`} />;
}

export function Panel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="saw-panel p-6 md:p-10 mb-10">
      <h2 className="relative font-label font-bold uppercase tracking-[0.12em] text-3xl md:text-4xl text-saw-blood-light pb-4 mb-6">
        {title}
        <span aria-hidden className="saw-cut bottom-0 left-0 w-2/3" />
      </h2>
      {children}
    </section>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 font-label font-bold uppercase tracking-wider text-xl text-saw-bone mb-3">
      <Rivet />
      {children}
    </h3>
  );
}

export function Plate({ children }: { children: ReactNode }) {
  return <div className="saw-plate px-4 py-3">{children}</div>;
}

// Typewritten note, like the tapes and notes left behind in the films.
export function Note({ children }: { children: ReactNode }) {
  return <div className="saw-note px-5 py-4">{children}</div>;
}

export function Link({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className="text-saw-bone font-semibold underline decoration-saw-blood-light decoration-2 underline-offset-4 hover:text-saw-blood-light"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function Footer({ children }: { children: ReactNode }) {
  return (
    <footer className="relative max-w-md mx-auto mt-4 mb-12 px-8 py-8 text-center space-y-2">
      <span aria-hidden className="saw-cut top-0 left-0 w-1/2" />
      <span aria-hidden className="saw-cut top-0 right-0 w-1/3" />
      <span aria-hidden className="saw-cut bottom-0 left-[15%] w-[70%]" />
      {children}
    </footer>
  );
}
