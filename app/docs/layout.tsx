import { DocsSidebar } from "@/components/docs-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | DAEMON Docs",
    default: "DAEMON Docs",
  },
  description:
    "Documentation for DAEMON, the Solana operator console. Installation, Shipline, AI agents, wallet, deploys, and more.",
};

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <DocsSidebar />
      <main className="lg:pl-[260px]">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          {children}
        </div>
      </main>
    </div>
  );
}
