import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 pt-28 pb-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(88,200,138,0.05),transparent_40%)]" />
      <div className="relative mx-auto max-w-xl text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
          Error 404
        </p>
        <h1 className="mt-5 text-balance text-[clamp(2.4rem,5vw,3.6rem)] font-bold leading-[0.95] tracking-[-0.045em]">
          That page slipped the leash.
        </h1>
        <p className="mt-5 text-[1.02rem] leading-[1.7] text-muted">
          The link is broken or the page has moved. Try one of these instead.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-accent px-6 py-3 text-[15px] font-semibold text-accent-foreground transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_32px_rgba(88,200,138,0.24)]"
          >
            Back home
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-6 py-3 text-[15px] font-semibold text-foreground transition-all duration-200 hover:border-white/20 hover:bg-white/[0.05]"
          >
            Read the docs
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[12px] text-muted-foreground">
          <Link href="/roadmap" className="transition-colors hover:text-foreground">
            Roadmap
          </Link>
          <a
            href="https://discord.gg/uyCJtcEBxA"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Discord
          </a>
          <a
            href="https://github.com/nullxnothing/daemon"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
