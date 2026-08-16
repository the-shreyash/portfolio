import { useState } from "react";
import { ArrowUpRight, ExternalLink, Award } from "lucide-react";
import ProjectCase from "../components/ProjectCard/ProjectCase";
import DesignPreviewModal from "../components/DesignPreviewModal/DesignPreviewModal";
import {
  featuredProjects as defaultFeaturedProjects,
  otherProjects as defaultOtherProjects,
  figmaDesigns as defaultFigmaDesigns,
} from "../data/projects";

export default function WorkSection({
  featuredProjects = defaultFeaturedProjects,
  otherProjects = defaultOtherProjects,
  figmaDesigns = defaultFigmaDesigns,
}) {
  const [selectedDesign, setSelectedDesign] = useState(null);

  return (
    <section id="work" className="py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-ink-faint)]">
          Selected Work
        </p>
      </div>

      {featuredProjects.map((project, i) => (
        <ProjectCase key={project.id} project={project} index={i} />
      ))}

      {/* ── Other Projects ── */}
      <div className="mx-auto mt-10 max-w-6xl px-5 md:px-10">
        <p className="mb-6 text-xs font-medium uppercase tracking-widest text-[var(--color-ink-faint)]">
          Other Projects
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {otherProjects.map((p) => (
            <div
              key={p.id}
              className="group rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-accent)]"
            >
              <div className="flex items-start justify-between">
                <h4 className="font-display text-xl font-medium tracking-tight">
                  {p.title}
                </h4>
                <a
                  href={p.demoUrl || p.githubUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${p.title}`}
                  className="opacity-30 transition-opacity group-hover:opacity-100"
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-[var(--color-ink-faint)]">
                {p.category}
              </p>
              <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
                {p.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[var(--color-bg)] px-2.5 py-1 text-[10px] text-[var(--color-ink-soft)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Figma / UI Designs ── */}
      <div className="mx-auto mt-24 max-w-6xl px-5 md:px-10">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-ink-faint)]">
          UI / Design
        </p>
        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-4xl">
          Figma Designs
        </h2>
        <p className="mt-3 max-w-lg text-sm text-[var(--color-ink-soft)]">
          A collection of product UI concepts and prototypes crafted in Figma —
          from EV landing pages to gaming stores and health dashboards.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {figmaDesigns.map((design) => (
            <button
              type="button"
              key={design.id}
              onClick={() => setSelectedDesign(design)}
              data-cursor="PREVIEW"
              className="group relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[var(--color-surface)] text-left transition-all hover:border-[var(--color-accent)] hover:shadow-lg cursor-pointer"
            >
              {/* Screenshot preview area */}
              <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg)]">
                {/* Real screenshot */}
                {design.image && (
                  <img
                    src={design.image}
                    alt={`${design.title} Figma design preview`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                )}
                {/* Placeholder icon — shown when no image */}
                {!design.image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-bg)] opacity-60 transition-opacity group-hover:opacity-100">
                      <ExternalLink size={14} className="text-[var(--color-accent)]" />
                    </div>
                  </div>
                )}
                {/* Bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent" />
                {/* Category tag */}
                <div className="absolute left-3 top-3">
                  <span className="rounded-full border border-[var(--color-line)] bg-[var(--color-bg)]/80 px-2.5 py-1 text-[9px] font-medium uppercase tracking-widest text-[var(--color-ink-faint)] backdrop-blur-sm">
                    {design.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between">
                  <h4 className="font-display text-lg font-medium tracking-tight">
                    {design.title}
                  </h4>
                  <ArrowUpRight
                    size={16}
                    className="mt-1 shrink-0 opacity-30 transition-opacity group-hover:opacity-100"
                  />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                  {design.description}
                </p>
                <p className="mt-4 text-[10px] font-medium uppercase tracking-widest text-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100">
                  Preview Design →
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── In-Page Design Lightbox Modal ── */}
      <DesignPreviewModal
        design={selectedDesign}
        isOpen={Boolean(selectedDesign)}
        onClose={() => setSelectedDesign(null)}
      />
    </section>
  );
}
