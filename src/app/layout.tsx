import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Oswald,
  Rubik_Dirt,
  Special_Elite,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Saw theme fonts (see globals.css)
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const rubikDirt = Rubik_Dirt({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rubik-dirt",
});

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
});

export const metadata: Metadata = {
  title: "Kristiania Flipperselskap",
  description: "Kristiania Flipperselskap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} ${rubikDirt.variable} ${specialElite.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
