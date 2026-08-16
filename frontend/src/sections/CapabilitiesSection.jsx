import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { capabilities } from "../data/capabilities";

export default function CapabilitiesSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        {capabilities.map((cap, i) => {
          const active = activeIndex === i;
          return (
            <button
              type="button"
              key={cap.number}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(active ? null : i)}
              className="group flex w-full items-center justify-between gap-6 border-t border-[var(--color-line)] py-8 text-left transition-colors last:border-b md:py-10"
              style={{
                backgroundColor: active ? "var(--color-accent-soft)" : "transparent",
              }}
            >
              <div className="flex items-baseline gap-6 md:gap-10">
                <span
                  className={`font-display text-sm text-[var(--color-ink-faint)] transition-transform duration-300 ${
                    active ? "translate-x-2" : ""
                  }`}
                >
                  {cap.number}
                </span>
                <span className="font-display text-2xl font-medium tracking-tight md:text-4xl">
                  {cap.title}
                </span>
              </div>

              <div className="hidden max-w-xs text-sm text-[var(--color-ink-soft)] md:block">
                {active && cap.description}
              </div>

              <ArrowUpRight
                size={22}
                className={`shrink-0 transition-transform duration-300 ${
                  active ? "translate-x-1 -translate-y-1 opacity-100" : "opacity-30"
                }`}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
