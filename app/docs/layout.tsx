import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting Started - DAEMON",
  description:
    "Everything you need to start building with AI agents and Solana tools in DAEMON.",
};

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="pt-14">{children}</main>
      <Footer />
    </>
  );
}
