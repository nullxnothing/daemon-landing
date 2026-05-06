"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Github, Menu, Send, Twitter, X } from "lucide-react";
import { DexScreenerLogo } from "@/components/dex-screener-logo";
import { ConnectButton } from "@/components/header/connect-button";
import { cn } from "@/lib/utils";

const TELEGRAM_URL = "https://t.me/daemonide";
const DISCORD_URL = "https://discord.gg/98CRP2kjG";
const X_URL = "https://x.com/DaemonTerminal";
const GITHUB_URL = "https://github.com/nullxnothing/daemon";
const DEXSCREENER_URL =
  "https://dexscreener.com/solana/7dhjuvz2xrafy1kztibhrxtliutj7vkivh9zhwm4tyq9";

const primaryNavLinks = [
  { label: "Product", href: "/#features" },
  { label: "Docs", href: "/docs" },
];

const moreNavLinks = [
  { label: "Portal", href: "/portal" },
  { label: "Factory", href: "/factory" },
  { label: "Arena", href: "/arena" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Why Daemon", href: "/#architecture" },
];

const mobileNavLinks = [...primaryNavLinks, ...moreNavLinks];

function DiscordIcon({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
    </svg>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!moreMenuRef.current?.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-2xl border-b border-border"
          : isScrolled
            ? "bg-background/70 backdrop-blur-2xl border-b border-border"
            : "bg-transparent",
      )}
    >
      <div className="w-full px-5 sm:px-7 lg:px-10">
        <nav className="mx-auto flex h-18 w-full max-w-[88rem] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/images/daemon-mark-white.png"
              alt="DAEMON"
              width={28}
              height={28}
            />
            <span className="text-sm font-semibold tracking-wide">Daemon</span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {primaryNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div
              ref={moreMenuRef}
              className="relative"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsMoreOpen(true)}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                aria-haspopup="menu"
                aria-expanded={isMoreOpen}
              >
                More
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    isMoreOpen && "rotate-180",
                  )}
                />
              </button>

              {isMoreOpen && (
                <div
                  className="absolute left-1/2 top-full w-48 -translate-x-1/2 pt-4 animate-fade-in"
                  role="menu"
                >
                  <div className="rounded-lg border border-border bg-background/95 p-1.5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
                    {moreNavLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsMoreOpen(false)}
                        className="block rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                        role="menuitem"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              aria-label="Follow on X"
            >
              <Twitter className="size-[18px]" />
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              aria-label="Join Telegram"
            >
              <Send className="size-[18px]" />
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              aria-label="Join Discord"
            >
              <DiscordIcon />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              aria-label="GitHub repository"
            >
              <Github className="size-[18px]" />
            </a>
            <a
              href={DEXSCREENER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              aria-label="View on Dex Screener"
              title="Dex Screener"
            >
              <DexScreenerLogo className="size-[18px]" />
            </a>
            <Link
              href="/docs/installation#download"
              className="ml-3 inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
            >
              Download
            </Link>
            <ConnectButton />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 pb-4 backdrop-blur-2xl animate-fade-in">
            <div className="flex flex-col gap-1 pt-3">
              {mobileNavLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted hover:text-foreground transition-colors py-2.5 px-2 rounded-lg hover:bg-card text-sm"
                >
                  {link.label}
                </a>
              ))}

              <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-border">
                <a
                  href={X_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted hover:text-foreground transition-colors py-2.5 px-2 rounded-lg hover:bg-card text-sm"
                >
                  <Twitter className="size-4" />
                  X
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted hover:text-foreground transition-colors py-2.5 px-2 rounded-lg hover:bg-card text-sm"
                >
                  <Send className="size-4" />
                  Telegram
                </a>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted hover:text-foreground transition-colors py-2.5 px-2 rounded-lg hover:bg-card text-sm"
                >
                  <DiscordIcon className="size-4" />
                  Discord
                </a>
                <a
                  href={DEXSCREENER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted hover:text-foreground transition-colors py-2.5 px-2 rounded-lg hover:bg-card text-sm"
                >
                  <DexScreenerLogo className="size-4" />
                  Dex Screener
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted hover:text-foreground transition-colors py-2.5 px-2 rounded-lg hover:bg-card text-sm"
                >
                  <Github className="size-4" />
                  GitHub
                </a>
                <Link
                  href="/docs/installation#download"
                  className="flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background"
                >
                  Download
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
