import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Award } from "lucide-react";
import ProfilePhoto from "../components/ProfilePhoto/ProfilePhoto";
import { profile as defaultProfile } from "../data/profile";
import { certificates as defaultCertificates } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection({
  profile = defaultProfile,
  certificates = defaultCertificates,
}) {
  const rootRef = useRef(null);
  const portraitRef = useRef(null);
  const portraitWrapRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Portrait: scale + clip-path reveal on scroll enter ──────────
      if (portraitWrapRef.current) {
        gsap.fromTo(
          portraitWrapRef.current,
          {
            scale: 1.06,
            opacity: 0,
            clipPath: "inset(10% 0% 10% 0% round 48px)",
          },
          {
            scale: 1,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0% round 48px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 72%",
            },
          }
        );
      }

      // ── Text block children stagger in ──────────────────────────────
      if (textRef.current) {
        gsap.fromTo(
          [...textRef.current.children],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 68%",
            },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      className="mx-auto max-w-5xl px-5 py-24 md:px-10 md:py-32"
    >
      {/* ── Section label ────────────────────────────────────────────── */}
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-ink-faint)]">
        About
      </p>

      {/* ── Editorial layout: portrait + text side-by-side on md ─────── */}
      <div className="mt-10 flex flex-col gap-12 md:flex-row md:items-start md:gap-16">
        {/* Portrait — large, editorial */}
        <div ref={portraitWrapRef} className="mx-auto w-[260px] shrink-0 md:mx-0 md:w-[300px]">
          <ProfilePhoto
            src={profile.photo}
            alt={`${profile.name} — ${profile.role}`}
            imgRef={portraitRef}
            className="shadow-xl"
          />
        </div>

        {/* Text content */}
        <div ref={textRef} className="flex-1">
          <p className="font-display text-2xl font-medium leading-snug tracking-tight md:text-4xl">
            I'm a computer science student and builder focused on AI,
            full-stack engineering and products that solve real problems.
          </p>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-[var(--color-ink-soft)]">
            <span>Based in India</span>
            <span className="text-[var(--color-ink-faint)]">/</span>
            <span>AI / Full Stack</span>
            <span className="text-[var(--color-ink-faint)]">/</span>
            <span>Open to interesting collaborations</span>
          </div>

          {/* Domain tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["AI", "Full-Stack", "Product", "Systems"].map((w) => (
              <span
                key={w}
                className="rounded-full border border-[var(--color-line)] px-4 py-1.5 text-xs font-medium tracking-widest text-[var(--color-ink-soft)] uppercase"
              >
                {w}
              </span>
            ))}
          </div>

          {/* Social Links */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-4 py-2 text-xs font-medium uppercase tracking-widest text-[var(--color-ink-soft)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
            >
              GitHub
              <ExternalLink size={11} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-4 py-2 text-xs font-medium uppercase tracking-widest text-[var(--color-ink-soft)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]"
            >
              LinkedIn
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Certificates & Recognition ───────────────────────────────── */}
      <div className="mt-20">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-ink-faint)]">
          Credentials
        </p>
        <h3 className="mt-3 font-display text-2xl font-medium tracking-tight md:text-3xl">
          Certificates & Recognition
        </h3>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {certificates.map((cert) => (
            <a
              key={cert.id}
              href={cert.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-4 rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 transition-all hover:border-[var(--color-accent)]"
            >
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-bg)] transition-colors group-hover:border-[var(--color-accent)]">
                <Award size={15} className="text-[var(--color-accent)]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-widest text-[var(--color-accent)]">
                  {cert.type}
                </p>
                <p className="mt-1 font-display text-base font-medium tracking-tight">
                  {cert.title}
                </p>
                <p className="mt-0.5 text-xs text-[var(--color-ink-soft)]">
                  {cert.issuer}
                </p>
              </div>
              <ExternalLink
                size={14}
                className="mt-1 shrink-0 opacity-30 transition-opacity group-hover:opacity-100"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
