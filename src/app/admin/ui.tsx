// Minimal, dependency-free versions of shadcn/ui components (Card, Badge,
// Button, Input, Table) for the admin sample. Same class recipes as shadcn.
import type { ComponentProps } from "react";

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border border-(color:--border) bg-(color:--card) text-(color:--foreground) shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
  );
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("text-sm text-(color:--muted-foreground)", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

const badgeVariants = {
  default:
    "border-transparent bg-(color:--primary) text-(color:--primary-foreground)",
  secondary:
    "border-transparent bg-(color:--secondary) text-(color:--secondary-foreground)",
  outline: "text-(color:--foreground)",
  destructive: "border-transparent bg-(color:--destructive) text-white",
};

export function Badge({
  variant = "default",
  className,
  ...props
}: ComponentProps<"span"> & { variant?: keyof typeof badgeVariants }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}

const buttonVariants = {
  default:
    "bg-(color:--primary) text-(color:--primary-foreground) hover:opacity-90",
  outline:
    "border border-(color:--input) bg-(color:--background) hover:bg-(color:--muted)",
  secondary:
    "bg-(color:--secondary) text-(color:--secondary-foreground) hover:opacity-80",
  ghost: "hover:bg-(color:--muted)",
  destructive: "text-(color:--destructive) hover:bg-(color:--muted)",
};

const buttonSizes = {
  default: "h-9 px-4",
  sm: "h-8 px-3 text-xs",
  icon: "h-8 w-8 text-xs",
};

type ButtonStyleProps = {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  className?: string;
};

// Exported so links (next/link) can look like buttons.
export function buttonStyles({
  variant = "default",
  size = "default",
  className,
}: ButtonStyleProps = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-(color:--ring) disabled:pointer-events-none disabled:opacity-50",
    buttonSizes[size],
    buttonVariants[variant],
    className,
  );
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & ButtonStyleProps) {
  return (
    <button
      type="button"
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-md border border-(color:--input) bg-transparent px-3 text-sm shadow-xs outline-none placeholder:text-(color:--muted-foreground) focus-visible:ring-2 focus-visible:ring-(color:--ring)",
        className,
      )}
      {...props}
    />
  );
}

export function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <div className="relative w-full overflow-x-auto">
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader(props: ComponentProps<"thead">) {
  return <thead className="[&_tr]:border-b" {...props} />;
}

export function TableBody(props: ComponentProps<"tbody">) {
  return <tbody className="[&_tr:last-child]:border-0" {...props} />;
}

export function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "border-b border-(color:--border) transition-colors hover:bg-(color:--muted)/50",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "h-10 px-4 text-left align-middle text-xs font-medium whitespace-nowrap text-(color:--muted-foreground)",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
  return <td className={cn("p-4 align-middle", className)} {...props} />;
}
