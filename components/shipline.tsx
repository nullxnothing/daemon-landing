import { Sparkles, Cpu, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: Sparkles,
    label: "01 · Prompt",
    title: "Describe the program",
    body: "Type what you want. The agent writes the Anchor program, scaffolds tests, and proposes the IDL without leaving the editor.",
  },
  {
    icon: Cpu,
    label: "02 · Simulate",
    title: "See compute before you ship",
    body: "Inline CU readout, account diffs, and transaction preview render as you tweak. No more deploying to find out you blew the limit.",
  },
  {
    icon: Rocket,
    label: "03 · Ship",
    title: "Mainnet in one click",
    body: "Priority-fee-protected Jito bundle deploy. Signed in-app with the built-in wallet. From prompt to live program in under 60 seconds.",
  },
];

export function Shipline() {
  return (
    <section id="shipline" className="relative px-6 py-24 md:py-30">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 max-w-[42rem]">
          <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-accent">
            Shipline · The headline primitive
          </span>
          <h2 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] gradient-text md:text-[3.1rem]">
            Prompt to mainnet,
            <br />
            in one window.
          </h2>
          <p className="text-[17px] text-muted leading-relaxed">
            Shipline is the first deploy lane that fuses an AI program author, a live
            compute simulator, and a Jito-bundle ship button into a single workflow. No
            tabs. No glue scripts. No surprise reverts.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.label}
                className="rounded-lg border border-white/[0.055] bg-card/80 p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-md border border-accent/15 bg-accent/8">
                    <Icon className="size-4 text-accent" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {step.label}
                  </span>
                </div>
                <h3 className="mt-5 text-[1.1rem] font-semibold tracking-[-0.015em] text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.72] text-muted">{step.body}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { stat: "< 60s", label: "Prompt → live program" },
            { stat: "0 tabs", label: "Browser context switches" },
            { stat: "MEV-protected", label: "Jito bundle deploys" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-white/[0.05] bg-card/65 px-5 py-4"
            >
              <div className="font-mono text-[20px] font-semibold text-foreground">
                {item.stat}
              </div>
              <div className="mt-1 text-[13px] text-muted">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
