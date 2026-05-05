import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service | Daemon",
  description: "The terms that govern your use of the Daemon website and desktop app.",
};

const UPDATED = "May 5, 2026";
const CONTACT_EMAIL = "hello@daemon.computer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="relative px-6 pt-28 pb-24">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
            Legal
          </p>
          <h1 className="mt-4 text-[clamp(2.2rem,4.5vw,3rem)] font-bold leading-[1] tracking-[-0.04em]">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated {UPDATED}</p>

          <div className="mt-10 space-y-8 text-[1rem] leading-[1.78] text-muted">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">The software</h2>
              <p>
                Daemon is open-source software licensed under MIT. Source code is available
                on GitHub. The license file in the repository is the binding legal text for
                the software itself; this page covers your use of the website and the
                hosted release artifacts.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">No financial advice</h2>
              <p>
                Daemon helps developers build, test, and deploy applications on Solana. The
                IDE includes wallet, swap, and token-launch tooling. Nothing in the app or
                on this site is financial, investment, or legal advice. You are responsible
                for your own keys, transactions, and on-chain actions.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">$DAEMON token</h2>
              <p>
                The $DAEMON token is a community token. It is not required to download or
                use the IDE. Holding $DAEMON does not entitle you to equity, dividends, or
                any claim against the project. Tokens carry risk; only buy what you can
                afford to lose.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">No warranty</h2>
              <p>
                The software and website are provided &ldquo;as is&rdquo; without warranty
                of any kind. To the maximum extent permitted by law, we are not liable for
                any loss arising from use of Daemon, including loss of funds, data, or
                business.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-foreground">Contact</h2>
              <p>
                Reach us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-foreground underline decoration-white/30 underline-offset-4 hover:decoration-foreground"
                >
                  {CONTACT_EMAIL}
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
