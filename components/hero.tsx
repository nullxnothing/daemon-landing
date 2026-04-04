"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { Monitor, Apple } from "lucide-react";

const WINDOWS_URL =
  "https://pub-1996550623c84fbeb15c66144b09e41e.r2.dev/DAEMON-1.0.0-setup.exe";
const MAC_URL =
  "https://github.com/nullxnothing/daemon/releases/latest";

// Matrix rain canvas component
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters - mix of katakana, numbers, and symbols
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]|/\\";
    const charArray = chars.split("");

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drops at random positions
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Track character brightness for trailing effect
    const trails: { char: string; opacity: number; y: number }[][] = [];
    for (let i = 0; i < columns; i++) {
      trails[i] = [];
    }

    let animationId: number;

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading character (brightest - white/green)
        ctx.fillStyle = "#ffffff";
        ctx.fillText(char, x, y);

        // Add glow effect for leading character
        ctx.shadowColor = "#3ecf8e";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#3ecf8e";
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        // Draw trail with fading opacity
        for (let j = 1; j < 20; j++) {
          const trailY = y - j * fontSize;
          if (trailY < 0) continue;
          
          const opacity = Math.max(0, 1 - j * 0.08);
          const green = Math.floor(207 - j * 8);
          ctx.fillStyle = `rgba(62, ${green}, 142, ${opacity * 0.6})`;
          const trailChar = charArray[Math.floor(Math.random() * charArray.length)];
          ctx.fillText(trailChar, x, trailY);
        }

        // Reset drop when it goes off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i] += 0.5;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-40"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

function TerminalMockup() {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Glow behind the terminal */}
      <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-3xl animate-glow-pulse" />

      {/* Terminal window */}
      <div className="relative rounded-2xl border border-accent/20 bg-[#0a0a0a]/90 overflow-hidden shadow-2xl shadow-accent/5 backdrop-blur-sm">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-accent/10 bg-[#0a0a0a]">
          <div className="flex items-center gap-1.5">
            <div className="size-2.5 rounded-full bg-[#ff5f57]" />
            <div className="size-2.5 rounded-full bg-[#febc2e]" />
            <div className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-[11px] text-muted-foreground font-mono">
              daemon ~/projects/my-app
            </span>
          </div>
        </div>

        {/* Terminal content */}
        <div className="p-5 font-mono text-[13px] leading-relaxed space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-accent">~</span>
            <span className="text-muted">grind-mode --agents 4</span>
          </div>
          <div className="text-muted-foreground mt-3 space-y-0.5">
            <p>
              <span className="text-accent">agent-1</span> scaffolding anchor
              program...
            </p>
            <p>
              <span className="text-accent">agent-2</span> wiring Jupiter swap
              integration
            </p>
            <p>
              <span className="text-accent">agent-3</span> writing token launch
              tests
            </p>
            <p>
              <span className="text-accent">agent-4</span> building the frontend
            </p>
            <p className="mt-2">
              <span className="text-accent">agent-1</span>{" "}
              <span className="text-foreground">
                created programs/vault/lib.rs
              </span>
            </p>
            <p>
              <span className="text-accent">agent-2</span>{" "}
              <span className="text-foreground">
                created src/hooks/useSwap.ts
              </span>
            </p>
            <p>
              <span className="text-accent">agent-3</span>{" "}
              <span className="text-accent">12 tests passed</span>
            </p>
            <p>
              <span className="text-accent">agent-4</span>{" "}
              <span className="text-foreground">
                deployed to vercel — live
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-accent">~</span>
            <span className="text-muted-foreground">|</span>
            <span
              className="inline-block w-[7px] h-[15px] bg-accent/70"
              style={{ animation: "cursor-blink 1.2s step-end infinite" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-14 overflow-hidden bg-black">
      {/* Matrix rain background */}
      <MatrixRain />

      {/* Overlay gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(62,207,142,0.08),transparent)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl w-full">
        {/* Logo */}
        <div className="animate-fade-up mb-6">
          <Image
            src="/images/daemon-icon.png"
            alt="DAEMON"
            width={72}
            height={72}
            className="mx-auto rounded-2xl shadow-lg shadow-accent/20"
            priority
          />
        </div>

        {/* Version badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-[13px] text-accent mb-8 backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-accent animate-pulse" />
          v1.3.0 — Grind Mode is live
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.9]"
          style={{ animationDelay: "100ms" }}
        >
          <span className="text-white">Four agents.</span>
          <br />
          <span className="text-white">One IDE.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up mt-6 text-lg md:text-xl text-neutral-400 max-w-xl mx-auto leading-relaxed"
          style={{ animationDelay: "200ms" }}
        >
          The AI-native IDE for solo Solana builders. 4 parallel agents,
          built-in wallet, token launches — all from one desktop app.
          <br className="hidden sm:block" />
          Not a fork. Built from scratch.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{ animationDelay: "300ms" }}
        >
          <a
            href={WINDOWS_URL}
            download
            onClick={() => track("Download", { os: "windows", location: "hero" })}
            className="group flex items-center gap-2.5 bg-accent text-black px-7 py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-200 hover:bg-accent/90 hover:shadow-[0_0_40px_rgba(62,207,142,0.3)] hover:scale-[1.02]"
          >
            <Monitor className="size-[18px]" />
            Download for Windows
          </a>
          <a
            href={MAC_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("Download", { os: "mac", location: "hero" })}
            className="group flex items-center gap-2.5 border border-neutral-800 bg-neutral-900/50 px-7 py-3.5 rounded-xl font-medium text-[15px] text-neutral-300 transition-all duration-200 hover:border-neutral-700 hover:text-white hover:bg-neutral-900 backdrop-blur-sm"
          >
            <Apple className="size-[18px]" />
            Install for Mac
          </a>
        </div>

        {/* Terminal mockup */}
        <div
          className="animate-fade-up mt-16 sm:mt-20"
          style={{ animationDelay: "450ms" }}
        >
          <TerminalMockup />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
