import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion";
import ProfilePhoto from "../components/ProfilePhoto/ProfilePhoto";
import { profile as defaultProfile } from "../data/profile";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ ready, profile = defaultProfile }) {
  const rootRef = useRef(null);
  const linesRef = useRef([]);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const metaRef = useRef(null);
  const portraitWrapRef = useRef(null);
  const portraitImgRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ready) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (metaRef.current) {
        tl.fromTo(
          metaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 }
        );
      }

      if (linesRef.current?.length) {
        tl.fromTo(
          linesRef.current.filter(Boolean),
          { y: "110%" },
          { y: "0%", duration: 1.1, stagger: 0.08 },
          "-=0.3"
        );
      }

      if (portraitWrapRef.current) {
        tl.fromTo(
          portraitWrapRef.current,
          {
            opacity: 0,
            clipPath: "inset(8% 0% 8% 0% round 32px)",
            scale: 0.96,
            y: 24,
          },
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.7"
        );
      }

      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        );
      }

      // ── Continuous gentle float ───────────────────────────────────
      if (!reducedMotion && portraitWrapRef.current) {
        gsap.to(portraitWrapRef.current, {
          y: -10,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.2,
        });
      }

      // ── Scroll parallax on portrait ───────────────────────────────
      if (!reducedMotion && portraitWrapRef.current && rootRef.current) {
        gsap.to(portraitWrapRef.current, {
          y: 60,
          scale: 0.97,
          // opacity intentionally omitted — portrait stays fully visible at all times
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [ready, reducedMotion]);

  const lines = ["I BUILD", "INTELLIGENT", "DIGITAL PRODUCTS."];

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-5 pb-10 pt-28 md:px-10 md:pt-36"
    >
      {/* ── Meta labels ──────────────────────────────────────────────── */}
      <div
        ref={metaRef}
        className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-widest text-[var(--color-ink-soft)]"
      >
        <span>Full-Stack Engineer</span>
        <span className="h-1 w-1 rounded-full bg-[var(--color-ink-faint)]" />
        <span>AI Product Builder</span>
        <span className="h-1 w-1 rounded-full bg-[var(--color-ink-faint)]" />
        <span>Creative Technologist</span>
      </div>

      {/* ── Main composition: type + portrait ─────────────────────────── */}
      <div className="mt-8 flex flex-col gap-10 md:mt-12 md:flex-row md:items-end md:justify-between">
        {/* Left: headline + sub + CTAs */}
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-[13vw] font-medium leading-[0.95] tracking-tight md:text-[7.5vw]">
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <span
                  ref={(el) => (linesRef.current[i] = el)}
                  className="block"
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            ref={subRef}
            className="mt-8 max-w-md text-base text-[var(--color-ink-soft)] md:text-lg"
          >
            Designing and engineering products where intelligent systems meet
            thoughtful interfaces.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
            <a
              data-cursor="VIEW"
              href="#work"
              className="rounded-full bg-[var(--color-ink)] px-7 py-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-bg)] transition-transform hover:scale-[1.03]"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-[var(--color-ink)] px-7 py-4 text-xs font-semibold uppercase tracking-widest transition-transform hover:scale-[1.03]"
            >
              Let's Talk
            </a>
          </div>
        </div>

        {/* Right: portrait — editorial float */}
        <div
          ref={portraitWrapRef}
          className="relative mx-auto w-[260px] shrink-0 md:mx-0 md:w-[300px] lg:w-[340px]"
          aria-hidden="false"
        >
          {/* Name badge — top left */}
          <div className="absolute -left-3 -top-3 z-20 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-[var(--color-ink-soft)] backdrop-blur-sm">
            {profile.name}
          </div>

          <ProfilePhoto
            src={profile.photo}
            alt={`${profile.name} — ${profile.role}`}
            priority
            className="shadow-2xl"
          />

          {/* Role badge — bottom right */}
          <div className="absolute -bottom-3 -right-3 z-20 max-w-[160px] rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/90 px-4 py-2.5 text-[10px] font-medium uppercase leading-relaxed tracking-widest text-[var(--color-ink-soft)] backdrop-blur-sm">
            AI Product Builder
            <br />
            Full-Stack Engineer
          </div>
        </div>
      </div>

      {/* ── Mobile portrait (appears only below md, already in flow above) ── */}

      {/* ── Scroll prompt ───────────────────────────────────────────── */}
      <div className="flex items-center gap-2 self-center text-[10px] font-medium uppercase tracking-widest text-[var(--color-ink-faint)]">
        <ArrowDown size={12} className="animate-bounce" />
        Scroll
      </div>
    </section>
  );
}
