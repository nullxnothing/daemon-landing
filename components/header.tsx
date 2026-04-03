"use client";

import { useState, useEffect } from "react";
import { Github, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Docs", href: "/docs" },
  { label: "Architecture", href: "#architecture" },
  { label: "Download", href: "#download" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/70 backdrop-blur-2xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6">
        <nav className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="size-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <span className="text-accent font-mono font-bold text-xs">D</span>
            </div>
            <span className="text-sm font-semibold tracking-wide">DAEMON</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/nullxnothing/daemon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              aria-label="GitHub repository"
            >
              <Github className="size-[18px]" />
            </a>
            <a
              href="https://github.com/nullxnothing/daemon/releases/latest"
              className="flex items-center gap-2 bg-foreground text-background px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all hover:bg-accent hover:text-accent-foreground"
            >
              Download
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted hover:text-foreground transition-colors py-2.5 px-2 rounded-lg hover:bg-card text-sm"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-3 mt-2 border-t border-border">
                <a
                  href="https://github.com/nullxnothing/daemon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-2"
                >
                  <Github className="size-5" />
                </a>
                <a
                  href="https://github.com/nullxnothing/daemon/releases/latest"
                  className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
