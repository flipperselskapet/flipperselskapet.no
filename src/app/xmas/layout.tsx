import { Oswald, Shrikhand } from "next/font/google";

const display = Shrikhand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-em-display",
});

const label = Oswald({
  subsets: ["latin"],
  variable: "--font-em-label",
});

export default function XmasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${display.variable} ${label.variable}`}>{children}</div>
  );
}
