import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const layers = ["Client", "API", "Services", "Database", "AI / Data", "Real-Time Events"];

const stack = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Redis",
  "Socket.IO",
  "REST APIs",
  "AI APIs",
  "Docker",
  "GitHub Actions",
];

export default function EngineeringSection() {
  const rootRef = useRef(null);
  const lineRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        nodesRef.current,
        { opacity: 0.15, x: -12 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 65%",
            end: "bottom 50%",
            scrub: true,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="mx-auto max-w-4xl px-5 py-24 md:px-10 md:py-40"
    >
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-ink-faint)]">
        Systems Thinking
      </p>
      <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-5xl">
        Behind the Interface
      </h2>

      <div className="relative mt-16 pl-8">
        <div className="absolute left-0 top-0 h-full w-px bg-[var(--color-line)]" />
        <div
          ref={lineRef}
          className="absolute left-0 top-0 h-full w-px bg-[var(--color-accent)]"
        />

        <div className="space-y-8">
          {layers.map((layer, i) => (
            <div
              key={layer}
              ref={(el) => (nodesRef.current[i] = el)}
              className="relative flex items-center gap-4"
            >
              <span className="absolute -left-[41px] h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
              <span className="font-display text-lg font-medium tracking-tight md:text-2xl">
                {layer}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-wrap gap-2">
        {stack.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--color-line)] px-4 py-2 text-xs font-medium text-[var(--color-ink-soft)]"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
