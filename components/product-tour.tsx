"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";

const SLIDE_COUNT = 10;

export function ProductTour() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !slidesRef.current) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const slides = gsap.utils.toArray<HTMLElement>(
        slidesRef.current!.querySelectorAll(".tour-slide")
      );

      // First slide visible, rest hidden
      slides.forEach((slide, i) => {
        gsap.set(slide, { opacity: i === 0 ? 1 : 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (SLIDE_COUNT - 1) * 1.5}`,
          pin: true,
          scrub: 1,
          anticipatePin: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // Build crossfade transitions
      for (let i = 0; i < SLIDE_COUNT - 1; i++) {
        tl.to(slides[i], { opacity: 0, duration: 0.5, ease: "none" }, i)
          .fromTo(
            slides[i + 1],
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: "none", immediateRender: false },
            i
          );

        if (i < SLIDE_COUNT - 2) {
          tl.to({}, { duration: 0.5 });
        }
      }

      // Progress bar and dots
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (SLIDE_COUNT - 1) * 1.5}`,
        scrub: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }

          const activeIndex = Math.min(
            Math.round(self.progress * (SLIDE_COUNT - 1)),
            SLIDE_COUNT - 1
          );

          dotsRef.current.forEach((dot, i) => {
            if (!dot) return;
            dot.style.width = i === activeIndex ? "24px" : "6px";
            dot.style.backgroundColor =
              i === activeIndex ? "var(--color-accent, #3ecf8e)" : "rgba(255,255,255,0.2)";
          });
        },
      });

      cleanup = () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    })();

    return () => cleanup?.();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-accent text-[13px] font-medium tracking-wider uppercase mb-3">
            Product Tour
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight gradient-text text-balance">
            Inside DAEMON
          </h2>
          <p className="mt-5 text-muted leading-relaxed">
            A walkthrough of every layer, from the editor to the wallet.
          </p>
        </div>

        <div className="relative">
          <div
            ref={slidesRef}
            className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-2xl shadow-black/40 aspect-video"
          >
            {Array.from({ length: SLIDE_COUNT }, (_, i) => (
              <div key={i} className="tour-slide absolute inset-0">
                <Image
                  src={`/slides/${i + 1}.webp`}
                  alt={`DAEMON product tour slide ${i + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 1152px"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-6">
            {Array.from({ length: SLIDE_COUNT }, (_, i) => (
              <div
                key={i}
                ref={(el) => { dotsRef.current[i] = el; }}
                className="rounded-full h-1.5 transition-[width,background-color] duration-300"
                style={{
                  width: i === 0 ? "24px" : "6px",
                  backgroundColor: i === 0 ? "var(--color-accent, #3ecf8e)" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          <div className="mt-3 mx-auto max-w-xs h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-accent/40 rounded-full"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
