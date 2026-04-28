import { ArrowRight, ExternalLink, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AccessStatusChecker } from "@/components/access/access-status-checker";
import { getAccessConfig } from "@/lib/access";

export const metadata = {
  title: "DAEMON Access",
  description:
    "Optional DAEMON access paths across holder status, Streamflow staking, and Pro utility tiers.",
};

export const dynamic = "force-dynamic";

export default async function AccessPage() {
  const config = await getAccessConfig();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <section className="rounded-[36px] border border-border bg-card/70 p-8 md:p-12 shadow-[0_0_80px_rgba(62,207,142,0.08)]">
            <div className="inline-flex items-center gap-3 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-accent">
              DAEMON Staking
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl md:text-6xl font-bold tracking-[-0.04em] leading-[0.95]">
              Stake DAEMON to get closer to the project.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-muted leading-relaxed">
              The base DAEMON app stays free. Streamflow staking is the optional path for
              supporters who want earlier access, stronger priority, and recognized status across
              the DAEMON ecosystem.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={config.streamflowUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-3 text-sm font-semibold hover:brightness-110 transition-all"
              >
                Open Streamflow
                <ExternalLink className="size-4" />
              </a>
              <a
                href="/docs/installation#download"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-5 py-3 text-sm text-muted hover:text-foreground hover:border-accent/30 transition-colors"
              >
                Download DAEMON
                <ArrowRight className="size-4" />
              </a>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <HeroStat
                label="Base app"
                value="Free"
                copy="No wallet requirement to use the IDE."
              />
              <HeroStat
                label="Live staking path"
                value={
                  config.tiers[0]?.threshold ?? "DAEMON staking"
                }
                copy="Stake DAEMON on Streamflow to unlock the first access tier."
              />
              <HeroStat
                label="Staking provider"
                value="Streamflow"
                copy={
                  config.poolConfigured
                    ? "Pool and on-site stake verification are configured."
                    : "Add the Streamflow pool address to turn on live stake verification."
                }
              />
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-3 mt-6">
            <UtilityCard
              icon={<ShieldCheck className="size-5" />}
              title="Early Access"
              copy="See major updates, launches, and ecosystem opportunities before they reach the public."
            />
            <UtilityCard
              icon={<Zap className="size-5" />}
              title="Priority Access"
              copy="When something limited opens, stakers go first. Beta spots, launches, private activations, and scarce opportunities."
            />
            <UtilityCard
              icon={<Sparkles className="size-5" />}
              title="Staker Status"
              copy="Carry visible supporter status as an early backer of DAEMON across community and future ecosystem surfaces."
            />
          </section>

          <section className="mt-6 rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-accent">
              What staking does
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Staking should give supporters access, not just another token dashboard.
            </h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {config.utility.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border bg-background/70 px-5 py-5 text-[15px] text-muted leading-7"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-accent">
                  Access tiers
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  One staking model. Three supporter tiers.
                </h2>
              </div>
              <div className="text-sm text-muted">
                {config.streamflowPoolAddress ? (
                  <>
                    Pool: <span className="text-foreground">{config.streamflowPoolAddress}</span>
                  </>
                ) : (
                  <>
                    Token mint: <span className="text-foreground">{config.tokenMint}</span>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {config.tiers.map((tier) => (
                <div key={tier.id} className="rounded-[24px] border border-border bg-background/70 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xl font-semibold">{tier.label}</div>
                      <div className="mt-1 text-sm text-muted">{tier.threshold}</div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.14em] ${
                        tier.status === "live"
                          ? "border border-accent/30 bg-accent/10 text-accent"
                          : "border border-yellow-300/20 bg-yellow-300/8 text-yellow-200"
                      }`}
                    >
                      {tier.status}
                    </span>
                  </div>
                  <div className="mt-5 space-y-3">
                    {tier.unlocks.map((unlock) => (
                      <div key={unlock} className="text-[14px] text-muted leading-6">
                        + {unlock}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-3 mt-6">
            <StepCard
              step="01"
              title="Stake on Streamflow"
              copy="Use Streamflow for the actual onchain lockup. DAEMON gets a clean staking path without turning the website into its own protocol."
            />
            <StepCard
              step="02"
              title="Verify access"
              copy="DAEMON Access verifies the same wallet across web and desktop so supporters can see exactly what their stake unlocks."
            />
            <StepCard
              step="03"
              title="Use what it unlocks"
              copy="From Pro access to early launches and future supporter surfaces, staking should feel like getting closer to the project."
            />
          </section>

          <div className="mt-6">
            <AccessStatusChecker />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function HeroStat({
  label,
  value,
  copy,
}: {
  label: string;
  value: string;
  copy: string;
}) {
  return (
    <div className="rounded-[24px] border border-border bg-background/70 p-5">
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted">{label}</div>
      <div className="mt-3 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-2 text-sm text-muted leading-6">{copy}</div>
    </div>
  );
}

function UtilityCard({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="rounded-[28px] border border-border bg-card/60 p-6">
      <div className="inline-flex size-11 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
        {icon}
      </div>
      <h3 className="mt-4 text-2xl font-semibold">{title}</h3>
      <p className="mt-3 text-[15px] text-muted leading-7">{copy}</p>
    </div>
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
    <div className="rounded-[28px] border border-border bg-card/60 p-6">
      <div className="text-[12px] uppercase tracking-[0.18em] text-accent">{step}</div>
      <h3 className="mt-3 text-2xl font-semibold">{title}</h3>
      <p className="mt-3 text-[15px] text-muted leading-7">{copy}</p>
    </div>
  );
}
