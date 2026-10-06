import type { ReactNode } from "react";
import { AdminLink } from "./admin-link";

// Building blocks for the EM pinball look of the XMAS pages.

export type Accent = "teal" | "red" | "blue" | "yellow" | "orange";

const accentText: Record<Accent, string> = {
  teal: "text-em-teal",
  red: "text-em-red",
  blue: "text-em-blue",
  yellow: "text-em-ink",
  orange: "text-em-ink",
};

const accentFill: Record<Accent, string> = {
  teal: "bg-em-teal",
  red: "bg-em-red",
  blue: "bg-em-blue",
  yellow: "bg-em-yellow",
  orange: "bg-em-orange",
};

const accentBorder: Record<Accent, string> = {
  teal: "border-em-teal",
  red: "border-em-red",
  blue: "border-em-blue",
  yellow: "border-em-yellow",
  orange: "border-em-orange",
};

export function Page({ children }: { children: ReactNode }) {
  return <div className="em-playfield min-h-screen font-sans">{children}</div>;
}

export function Backglass({
  kicker,
  children,
}: {
  kicker: string;
  children: ReactNode;
}) {
  return (
    <header className="em-backglass border-b-4 border-em-ink">
      <div className="container mx-auto px-4 py-12 md:py-16 text-center">
        <p className="font-label uppercase tracking-[0.3em] text-em-yellow text-sm md:text-base mb-6">
          {kicker}
        </p>
        {children}
      </div>
    </header>
  );
}

export function Insert({
  accent,
  className = "h-5 w-5",
}: {
  accent: Accent;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`em-insert ${accentFill[accent]} ${className}`}
    />
  );
}

export function Panel({
  accent,
  title,
  children,
}: {
  accent: Accent;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="em-panel p-6 md:p-8 mb-10">
      <h2
        className={`flex items-center gap-3 font-label font-bold uppercase tracking-wide text-3xl md:text-4xl pb-3 mb-6 border-b-4 border-double ${accentText[accent]} ${accentBorder[accent]}`}
      >
        <Insert accent={accent} className="h-6 w-6" />
        {title}
      </h2>
      {children}
    </section>
  );
}

export function SubHeading({
  accent,
  children,
}: {
  accent: Accent;
  children: ReactNode;
}) {
  return (
    <h3 className="flex items-center gap-2 font-label font-bold uppercase tracking-wide text-xl mb-3">
      <Insert accent={accent} className="h-4 w-4" />
      {children}
    </h3>
  );
}

// A flat colored plate, like the painted lane guides on a playfield.
export function Plate({
  accent,
  children,
}: {
  accent: Accent;
  children: ReactNode;
}) {
  const light = accent === "yellow" || accent === "orange";
  return (
    <div
      className={`border-2 border-em-ink rounded-xl px-4 py-3 ${accentFill[accent]} ${light ? "text-em-ink" : "text-em-paper"}`}
    >
      {children}
    </div>
  );
}

export function Bumper({
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
      <div className="em-bumper h-24 w-24 md:h-28 md:w-28">
        <div className="text-center leading-none text-em-ink">
          <div className="font-label font-bold text-xs tracking-widest">
            {top}
          </div>
          <div className="font-display text-3xl md:text-4xl">{big}</div>
        </div>
      </div>
      {label && (
        <div className="font-label uppercase tracking-wider text-sm text-em-paper">
          {label}
        </div>
      )}
    </div>
  );
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
      className="text-em-blue font-semibold underline decoration-2 underline-offset-2 hover:text-em-red"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function Apron({ children }: { children?: ReactNode }) {
  return (
    <footer className="mt-4 mb-12 flex justify-center">
      <div className="em-apron w-full max-w-md">
        <div className="px-8 pt-6 pb-14 text-center space-y-2">
          <p className="font-label font-bold uppercase tracking-[0.2em] text-em-red">
            Questions?
          </p>
          <p>
            Contact us on <Link href="/slack">Slack</Link>
          </p>
          {children}
          <div>
            <AdminLink />
          </div>
        </div>
      </div>
    </footer>
  );
}
