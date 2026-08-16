import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 md:px-10 md:py-6">
        <a
          href="#top"
          className="font-display text-sm font-semibold tracking-widest text-[var(--color-ink)]"
        >
          SHREYASH
        </a>

        {/* Desktop Navigation Pill + Theme Toggle */}
        <div className="hidden items-center gap-4 md:flex">
          <nav className="flex items-center gap-8 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/75 px-6 py-3 shadow-sm backdrop-blur-md">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-xs font-medium uppercase tracking-widest text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <span className="flex items-center gap-2 border-l border-[var(--color-line)] pl-6 text-[10px] font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
              Available for select projects
            </span>
          </nav>

          <ThemeToggle showLabel={false} className="py-2.5 px-3.5 shadow-sm" />
        </div>

        {/* Mobile menu trigger & mobile theme toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle showLabel={false} className="h-10 w-10 justify-center p-0" />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/75 text-[var(--color-ink)] backdrop-blur-md"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-[var(--color-bg)] transition-opacity duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)]"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X size={18} />
        </button>

        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="font-display text-3xl font-medium tracking-tight text-[var(--color-ink)]"
          >
            {l.label}
          </a>
        ))}

        <div className="mt-4 flex flex-col items-center gap-4">
          <ThemeToggle showLabel={true} className="px-5 py-2.5" />
          <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
            Available for select projects
          </span>
        </div>
      </div>
    </>
  );
}
