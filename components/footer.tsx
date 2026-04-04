import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[13px] text-neutral-500">
            <span>
              Built by{" "}
              <a
                href="https://github.com/nullxnothing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-accent transition-colors"
              >
                nullxnothing
              </a>
            </span>
            <span className="text-neutral-700">|</span>
            <a
              href="/docs"
              className="text-neutral-400 hover:text-accent transition-colors"
            >
              Docs
            </a>
            <span className="text-neutral-700">|</span>
            <span>MIT License</span>
          </div>
          <a
            href="https://github.com/nullxnothing/daemon"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[13px] text-neutral-500 hover:text-accent transition-colors"
          >
            <Github className="size-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
