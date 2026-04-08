import Image from "next/image";
import { ArrowRight, Github } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getArenaData, getArenaPrice } from "@/lib/arena";

export const metadata = {
  title: "DAEMON Arena",
  description:
    "Build Week 01 for DAEMON Pro. Submit projects in-app, get on the live board, and compete for USDC, lifetime Pro, and founding Discord access.",
};

function formatRelative(ts: number) {
  const diff = Date.now() - ts;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  if (diff < 7 * 86_400_000) return `${Math.floor(diff / 86_400_000)}d ago`;
  return new Date(ts).toLocaleDateString();
}

export default async function ArenaPage() {
  const [{ contest, submissions }, price] = await Promise.all([getArenaData(), getArenaPrice()]);
  const holderText =
    price?.holderMinAmount && price?.holderMint
      ? `Hold ${Number(price.holderMinAmount).toLocaleString()} DAEMON in a local wallet to claim Pro in-app. Everyone else can subscribe with ${price.priceUsdc} USDC via x402.`
      : "Holder access is enabled inside the app for qualified DAEMON wallets.";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <section className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="rounded-[36px] border border-border bg-card/70 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_80px_rgba(62,207,142,0.08)]">
              <div className="inline-flex items-center gap-4 mb-6">
                <Image
                  src="/images/daemon-pro-badge.png"
                  alt=""
                  width={96}
                  height={40}
                  className="h-10 w-24"
                />
                <span className="text-[12px] uppercase tracking-[0.24em] text-yellow-300/90">
                  DAEMON Arena
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] leading-[0.95] max-w-4xl">
                Build something that deserves to ship inside DAEMON.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted leading-relaxed">
                Submit your tool, agent, skill, or MCP workflow in-app. The public board
                pulls from the same live backend as the desktop app, so what gets submitted
                in DAEMON is what appears here.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#submissions"
                  className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-3 text-sm font-semibold hover:brightness-110 transition-all"
                >
                  View live board
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="/docs/daemon-pro"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-5 py-3 text-sm text-muted hover:text-foreground hover:border-accent/30 transition-colors"
                >
                  Read Pro docs
                </a>
              </div>
            </div>

            <div className="rounded-[36px] border border-border bg-card/70 p-8 md:p-10">
              <div className="text-[12px] uppercase tracking-[0.18em] text-yellow-300/90">
                {contest?.slug?.replaceAll("-", " ") ?? "Build Week 01"}
              </div>
              <h2 className="mt-3 text-3xl font-semibold leading-tight">
                {contest?.name ?? "DAEMON Arena: Build Week 01"}
              </h2>
              <div className="mt-4 text-sm text-muted leading-7">
                <div>{contest?.duration ?? "3 weeks"}.</div>
                <div>{contest?.submissionWindow ?? "Open now"}.</div>
              </div>
              <div className="mt-6 space-y-3">
                {(contest?.prizes ?? [
                  "1st place: 250 USDC + lifetime Pro + Founding Builder Discord access",
                  "2nd place: 150 USDC + lifetime Pro + Founding Builder Discord access",
                  "3rd place: 100 USDC + lifetime Pro + Founding Builder Discord access",
                ]).map((prize) => (
                  <div key={prize} className="rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-muted">
                    {prize}
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-accent/20 bg-accent/5 px-4 py-4 text-sm text-muted leading-7">
                {contest?.judging ??
                  "Community voting informs ranking. Final winners are selected by the DAEMON team."}
              </div>
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-2 mt-6">
            <div className="rounded-[28px] border border-border bg-card/60 p-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-accent">
                Live with the app
              </div>
              <h3 className="mt-3 text-2xl font-semibold">One Arena board, two surfaces.</h3>
              <p className="mt-3 text-[15px] text-muted leading-7">
                Open <strong className="text-foreground">Tools &gt; Daemon Pro &gt; Arena</strong>
                {" "}to submit directly from the desktop app. This page reads from the same live
                backend as the in-app board.
              </p>
            </div>
            <div className="rounded-[28px] border border-border bg-card/60 p-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-accent">
                Holder access
              </div>
              <h3 className="mt-3 text-2xl font-semibold">DAEMON holders can claim Pro.</h3>
              <p className="mt-3 text-[15px] text-muted leading-7">{holderText}</p>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-3 mt-12">
            <InfoCard
              title="What to submit"
              copy="Projects that make DAEMON more useful: research agents, workflows, tools, skills, MCP servers, and sharp operator layers."
            />
            <InfoCard
              title="How winners are picked"
              copy="Votes matter, but they do not decide the final outcome. The DAEMON team uses the board as signal, then picks the strongest three entries."
            />
            <InfoCard
              title="Why it matters"
              copy="Winning projects get real distribution: shipped features, public credit, lifetime Pro, and direct access to the founding builder community."
            />
          </section>

          <section className="grid gap-5 lg:grid-cols-3 mt-6">
            <StepCard
              step="01"
              title="Build in public, submit in-app"
              copy="Use the Arena tab inside DAEMON Pro to submit your project with GitHub, demo links, and social handles."
            />
            <StepCard
              step="02"
              title="Votes create signal"
              copy="The live board surfaces what the community cares about. Votes shape the board, but they do not fully decide winners."
            />
            <StepCard
              step="03"
              title="DAEMON picks what ships"
              copy="The final three winners get paid, get Pro for life, and get direct access to the founding builder community."
            />
          </section>

          <section id="submissions" className="mt-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
              <div>
                <div className="text-[12px] uppercase tracking-[0.18em] text-yellow-300/90">
                  Live board
                </div>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
                  Current submissions
                </h2>
              </div>
              <div className="text-sm text-muted">
                {contest
                  ? `${contest.name} · ${contest.duration} · ${submissions.length} live submission${submissions.length === 1 ? "" : "s"}`
                  : `${submissions.length} live submission${submissions.length === 1 ? "" : "s"}`}
              </div>
            </div>

            {submissions.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-border bg-card/40 p-10 text-center text-muted">
                No submissions yet. Be the first team on the board.
              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-2">
                {submissions.map((sub) => (
                  <article key={sub.id} className="rounded-[28px] border border-border bg-card/60 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-semibold">{sub.title}</h3>
                        {sub.pitch ? (
                          <p className="mt-2 text-[15px] text-accent leading-6">{sub.pitch}</p>
                        ) : null}
                      </div>
                      <span className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-accent">
                        {sub.status}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.12em] text-muted">
                      <MetaPill text={sub.category} />
                      {sub.themeWeek ? <MetaPill text={sub.themeWeek} /> : null}
                      <MetaPill text={`${sub.votes} votes`} />
                      <MetaPill text={formatRelative(sub.submittedAt)} />
                    </div>

                    <p className="mt-5 text-[15px] text-muted leading-7">{sub.description}</p>

                    <div className="mt-6 flex flex-wrap gap-3 text-sm">
                      <SubmissionLink href={sub.githubUrl} label="GitHub">
                        <Github className="size-4" />
                      </SubmissionLink>
                      {sub.demoUrl ? <SubmissionLink href={sub.demoUrl} label="Demo" /> : null}
                      {sub.xHandle ? (
                        <SubmissionLink
                          href={`https://x.com/${String(sub.xHandle).replace(/^@/, "")}`}
                          label={`@${String(sub.xHandle).replace(/^@/, "")}`}
                        />
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function InfoCard({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="rounded-[28px] border border-border bg-card/60 p-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-[15px] text-muted leading-7">{copy}</p>
    </article>
  );
}

function StepCard({
  step,
  title,
  copy,
}: {
  step: string;
  title: string;
  copy: string;
}) {
  return (
    <article className="rounded-[28px] border border-border bg-card/60 p-6">
      <div className="text-[11px] uppercase tracking-[0.18em] text-accent">{step}</div>
      <h3 className="mt-3 text-2xl font-semibold leading-tight">{title}</h3>
      <p className="mt-3 text-[15px] text-muted leading-7">{copy}</p>
    </article>
  );
}

function MetaPill({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-border bg-background/70 px-3 py-1">
      {text}
    </span>
  );
}

function SubmissionLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-muted hover:text-foreground hover:border-accent/40 transition-colors"
    >
      {children}
      {label}
    </a>
  );
}
