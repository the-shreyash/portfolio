export default function CurrentlyBuildingSection() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-24 md:px-10 md:py-32">
      <div className="rounded-[var(--radius-2xl)] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 md:p-14">
        <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-[var(--color-ink-faint)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
          Building
        </div>

        <h2 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-5xl">
          Currently Building
        </h2>

        <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
          {["AI", "Products", "Systems", "Experiments"].map((w) => (
            <span
              key={w}
              className="rounded-full border border-[var(--color-line)] px-4 py-2"
            >
              {w}
            </span>
          ))}
        </div>

        <p className="mt-8 max-w-xl text-sm text-[var(--color-ink-soft)]">
          Iterating on an AI-driven market intelligence layer for
          StockAssist, and prototyping small, focused AI tools that solve one
          problem well.
        </p>
      </div>
    </section>
  );
}
