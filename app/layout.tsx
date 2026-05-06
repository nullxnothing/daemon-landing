import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { WalletProvider } from "@/components/providers/wallet-provider";
import "./globals.css";

const productionUrl = "https://daemon-landing.vercel.app";
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  productionUrl
).replace(/\/$/, "");
const metadataBase = new URL(siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`);

export const metadata: Metadata = {
  metadataBase,
  title: "Daemon | The Solana Operator Console",
  description:
    "Daemon is the operator console for Solana developers. Agents, wallets, launches, swaps, and deploys, in one workspace. Prompt to mainnet in 60 seconds with Shipline. Free and open source.",
  alternates: {
    canonical: "/",
  },
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
    url: "/",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Daemon Solana operator console",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daemon | The Solana Operator Console",
    description:
      "The operator console for Solana developers. Prompt to mainnet in 60 seconds. Free and open source.",
    images: [
      {
        url: "/twitter-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Daemon Solana operator console",
      },
    ],
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
        <WalletProvider>{children}</WalletProvider>
        <Analytics />
      </body>
    </html>
  );
}
