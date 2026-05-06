import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://daemon.computer");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Daemon | The Solana Operator Console",
  description:
    "Daemon is the operator console for Solana developers. Agents, wallets, launches, swaps, and deploys, in one workspace. Prompt to mainnet in 60 seconds with Shipline. Free and open source.",
  icons: {
    icon: "/images/daemon-mark-white.png",
    apple: "/images/daemon-mark-white.png",
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
    title: "Daemon | The Solana Operator Console",
    description:
      "Agents, wallets, launches, swaps, and deploys, in one workspace. Prompt to mainnet in 60 seconds with Shipline.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daemon | The Solana Operator Console",
    description:
      "The operator console for Solana developers. Prompt to mainnet in 60 seconds. Free and open source.",
  },
};

export const viewport: Viewport = {
  themeColor: "#121413",
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
