import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5 text-[13px] text-muted-foreground">
            <span>
              Built by{" "}
              <a
                href="https://github.com/nullxnothing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
              >
                nullxnothing
              </a>
            </span>
            <span className="size-1 rounded-full bg-white/10" />
            <a
              href="/docs"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </a>
            <span className="size-1 rounded-full bg-white/10" />
            <span>MIT License</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/DaemonTerminal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="size-4" />
              @DaemonTerminal
            </a>
            <span className="size-1 rounded-full bg-white/10" />
            <a
              href="https://github.com/nullxnothing/daemon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="size-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
