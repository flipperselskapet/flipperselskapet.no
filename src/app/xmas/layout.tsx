import { Rubik_Dirt, Special_Elite } from "next/font/google";

// Fonts for the Saw theme of the XMAS pages (see globals.css)
const grunge = Rubik_Dirt({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rubik-dirt",
});

const type = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
});

export default function XmasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${grunge.variable} ${type.variable}`}>{children}</div>
  );
}
