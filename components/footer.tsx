import { ExternalLink, Github, Send, Twitter } from "lucide-react";

const TELEGRAM_URL = "https://t.me/daemonide";
const DISCORD_URL = "https://discord.gg/98CRP2kjG";
const X_URL = "https://x.com/DaemonTerminal";
const GITHUB_URL = "https://github.com/nullxnothing/daemon";
const DEXSCREENER_URL =
  "https://dexscreener.com/solana/7dhjuvz2xrafy1kztibhrxtliutj7vkivh9zhwm4tyq9";

const FOOTER_LINKS = {
  Product: [
    { label: "Download", href: "/docs/installation#download" },
    { label: "Factory", href: "/factory" },
    { label: "Arena", href: "/arena" },
    { label: "Features", href: "/#features" },
    { label: "Docs", href: "/docs" },
    { label: "Roadmap", href: "/docs/roadmap" },
  ],
  Community: [
    {
      label: "GitHub",
      href: GITHUB_URL,
      external: true,
    },
    {
      label: "Discord",
      href: DISCORD_URL,
      external: true,
    },
    {
      label: "Twitter / X",
      href: X_URL,
      external: true,
    },
    {
      label: "Telegram",
      href: TELEGRAM_URL,
      external: true,
    },
    {
      label: "Dex Screener",
      href: DEXSCREENER_URL,
      external: true,
    },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Brand Kit", href: "/docs/brand-kit" },
    { label: "Contributing", href: "/docs/contributing" },
  ],
} as const;

function DiscordIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-14">
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-[13px] font-semibold text-foreground tracking-wide uppercase mb-4">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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
            <span>MIT License</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="size-4" />
              @DaemonTerminal
            </a>
            <span className="size-1 rounded-full bg-white/10" />
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <Send className="size-4" />
              Telegram
            </a>
            <span className="size-1 rounded-full bg-white/10" />
            <a
              href={DEXSCREENER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="size-4" />
              Dex Screener
            </a>
            <span className="size-1 rounded-full bg-white/10" />
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <DiscordIcon />
              Discord
            </a>
            <span className="size-1 rounded-full bg-white/10" />
            <a
              href={GITHUB_URL}
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
