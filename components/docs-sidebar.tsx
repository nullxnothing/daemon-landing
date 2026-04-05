"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronLeft } from "lucide-react";
import { docsConfig } from "@/lib/docs-config";
import { cn } from "@/lib/utils";

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const currentSlug = pathname.replace("/docs/", "").replace("/docs", "");

  return (
    <div className="flex flex-col h-full">
      {/* Logo / back to home */}
      <div className="px-4 py-5 border-b border-border">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors text-[13px]"
        >
          <ChevronLeft className="size-3.5" />
          <Image
            src="/images/daemon-icon.png"
            alt="DAEMON"
            width={22}
            height={22}
            className="rounded-md"
          />
          <span className="font-semibold text-foreground tracking-wide text-sm">DAEMON</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {docsConfig.map((section) => (
          <div key={section.title}>
            <p className="px-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = currentSlug === item.slug;
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/docs/${item.slug}`}
                      onClick={onNavigate}
                      className={cn(
                        "block px-3 py-1.5 rounded-lg text-[13px] transition-colors",
                        isActive
                          ? "bg-accent/10 text-accent font-medium border-l-2 border-accent"
                          : "text-muted hover:text-foreground hover:bg-card-hover"
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-border">
        <a
          href="https://github.com/nullxnothing/daemon"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-muted-foreground hover:text-foreground transition-colors"
        >
          GitHub
        </a>
        <span className="text-[12px] text-border mx-2">|</span>
        <span className="text-[12px] text-muted-foreground">MIT License</span>
      </div>
    </div>
  );
}

export function DocsSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-[18px] left-4 z-50 p-1.5 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Open docs menu"
      >
        <Menu className="size-4" />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 bottom-0 w-[260px] bg-[#0c0c0c] border-r border-border z-40 overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute top-0 left-0 bottom-0 w-[280px] bg-[#0c0c0c] border-r border-border shadow-2xl animate-fade-in">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground"
              aria-label="Close menu"
            >
              <X className="size-4" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
