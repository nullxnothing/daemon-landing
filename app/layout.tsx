import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "DAEMON - AI-Native IDE",
  description:
    "The IDE built for AI-native development. Monaco editor, Claude AI integration, built-in terminal, Solana wallet, and one-click deploys. Open source.",
  icons: {
    icon: "/favicon.ico",
    apple: "/images/daemon-icon.png",
  },
  keywords: [
    "IDE",
    "AI",
    "Claude",
    "Monaco Editor",
    "Electron",
    "Developer Tools",
    "Solana",
    "Open Source",
  ],
  authors: [{ name: "nullxnothing" }],
  openGraph: {
    title: "DAEMON - AI-Native IDE",
    description:
      "The IDE built for AI-native development. Monaco editor, Claude AI integration, built-in terminal, and more.",
    type: "website",
    images: ["/images/daemon-banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAEMON - AI-Native IDE",
    description:
      "The IDE built for AI-native development. Open source, built from scratch.",
    images: ["/images/daemon-banner.png"],
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
