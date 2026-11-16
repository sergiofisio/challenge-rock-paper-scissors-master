import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rock, Paper, Scissors game",
    description: "Rock, Paper, Scissors game",
    icons: {
      icon: "/assets/images/favicon-32x32.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={` h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
