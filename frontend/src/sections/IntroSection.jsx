import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const words = ["AI", "FULL-STACK", "PRODUCT", "SYSTEMS", "EXPERIENCES"];

export default function IntroSection() {
  const rootRef = useRef(null);
  const headlineRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        wordsRef.current,
        { opacity: 0.2, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wordsRef.current[0],
            start: "top 85%",
            end: "top 55%",
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
      className="mx-auto max-w-5xl px-5 py-32 md:px-10 md:py-48"
    >
      <p
        ref={headlineRef}
        className="font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl"
      >
        I like turning complicated ideas into products people can actually
        use.
      </p>

      <div className="mt-16 flex flex-wrap gap-x-4 gap-y-3 text-xs font-medium uppercase tracking-widest text-[var(--color-ink-soft)] md:mt-24">
        <span className="mr-2 text-[var(--color-ink-faint)]">I work across —</span>
        {words.map((w, i) => (
          <span
            key={w}
            ref={(el) => (wordsRef.current[i] = el)}
            className="rounded-full border border-[var(--color-line)] px-4 py-2"
          >
            {w}
          </span>
        ))}
      </div>
    </section>
  );
}
