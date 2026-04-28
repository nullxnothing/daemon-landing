import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://daemon.computer");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DAEMON | Solana's First IDE",
  description:
    "Solana's first IDE. Built from scratch with AI agents, built-in wallet, token launches, Jupiter swaps, and one-click deploys. Free and open source.",
  icons: {
    icon: "/favicon.ico",
    apple: "/images/daemon-icon.png",
  },
  keywords: [
    "Solana IDE",
    "Solana Development",
    "IDE",
    "AI",
    "Claude",
    "Monaco Editor",
    "Electron",
    "Developer Tools",
    "Solana",
    "DeFi",
    "Token Launch",
    "Open Source",
  ],
  authors: [{ name: "nullxnothing" }],
  openGraph: {
    title: "DAEMON | Solana's First IDE",
    description:
      "Solana's first IDE. AI agents, built-in wallet, token launches, and one-click deploys, all from one desktop app.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DAEMON | Solana's First IDE",
    description:
      "Solana's first IDE. Built from scratch with AI agents, wallet, token launches, and deploys. Free and open source.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
