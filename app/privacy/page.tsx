import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Daemon",
  description: "How Daemon handles your data on the marketing site and in the desktop app.",
};

const UPDATED = "May 5, 2026";
const CONTACT_EMAIL = "hello@daemon.computer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="relative px-6 pt-28 pb-24">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
            Legal
          </p>
          <h1 className="mt-4 text-[clamp(2.2rem,4.5vw,3rem)] font-bold leading-[1] tracking-[-0.04em]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated {UPDATED}</p>

          <div className="mt-10 space-y-8 text-[1rem] leading-[1.78] text-muted">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">Summary</h2>
              <p>
                Daemon is an open-source desktop IDE. We try to collect as little data as
                possible. This page explains what is collected on this website and inside
                the desktop app, and what is not.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">Website analytics</h2>
              <p>
                This site uses Vercel Analytics for aggregate page-view metrics. Vercel
                Analytics does not use cookies and does not track individual users across
                sites. No personally identifiable information is sent to us from this site.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">Desktop app</h2>
              <p>
                The Daemon desktop app runs locally on your machine. Wallet keys, code, and
                project files stay on your device. Network requests are made only to the
                third-party services you choose to use (Solana RPC providers, Helius,
                Jupiter, AI model providers, etc.) using credentials you supply.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">What we do not do</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>We do not sell your data.</li>
                <li>We do not upload your code, keys, or project files to our servers.</li>
                <li>We do not track you across other websites.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">Contact</h2>
              <p>
                Questions about this policy? Email{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-foreground underline decoration-white/30 underline-offset-4 hover:decoration-foreground"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                or open an issue on{" "}
                <a
                  href="https://github.com/nullxnothing/daemon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline decoration-white/30 underline-offset-4 hover:decoration-foreground"
                >
                  GitHub
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
