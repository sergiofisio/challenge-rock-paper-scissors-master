import type { Metadata } from "next";
import { Barlow_Semi_Condensed } from "next/font/google";
import { asset } from "@/lib/assets";
import "./globals.css";

const barlow = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rock, Paper, Scissors game",
  description: "Rock, Paper, Scissors, Lizard, Spock — Frontend Mentor bonus",
  icons: {
    icon: asset("/assets/images/favicon-32x32.png"),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${barlow.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-barlow">{children}</body>
    </html>
  );
}
