import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import ProjectVisual from "./ProjectVisual";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCase({ project, index }) {
  const rootRef = useRef(null);
  const visualRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        visualRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
          },
        }
      );
      gsap.fromTo(
        infoRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const reversed = index % 2 === 1;

  return (
    <article
      ref={rootRef}
      id={project.id}
      className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-14 md:px-10 md:py-32"
    >
      <div
        ref={visualRef}
        className={`${reversed ? "md:order-2" : "md:order-1"}`}
      >
        <ProjectVisual theme={project.theme} projectId={project.id} image={project.image} />

      </div>

      <div ref={infoRef} className={`${reversed ? "md:order-1" : "md:order-2"}`}>
        <span className="font-display text-sm text-[var(--color-ink-faint)]">
          {project.number}
        </span>
        <p className="mt-3 text-xs font-medium uppercase tracking-widest text-[var(--color-accent)]">
          {project.category}
        </p>
        <h3 className="mt-3 font-display text-4xl font-medium tracking-tight md:text-5xl">
          {project.title}
        </h3>
        <p className="mt-5 max-w-md text-[var(--color-ink-soft)]">
          {project.description}
        </p>

        <ul className="mt-6 space-y-2">
          {project.capabilities.map((c) => (
            <li
              key={c}
              className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)]"
            >
              <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
              {c}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-[var(--color-ink-soft)]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {project.demoUrl && (
            <a
              data-cursor="VIEW"
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-bg)] transition-transform hover:scale-[1.03]"
            >
              Live Demo
              <ArrowUpRight size={14} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ink)] px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-transform hover:scale-[1.03]"
            >
              GitHub
              <ArrowUpRight size={14} />
            </a>
          )}
          {!project.demoUrl && !project.githubUrl && (
            <a
              data-cursor="VIEW"
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest"
            >
              Coming Soon
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
