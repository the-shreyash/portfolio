import { Mail } from "lucide-react";
import { profile as defaultProfile } from "../../data/profile";

function GithubGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16 0 1.56-.02 2.82-.02 3.2 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.5 12.03C23.5 5.66 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.65 4.76 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
  );
}

export default function Footer({ profile = defaultProfile }) {
  return (
    <footer className="border-t border-[var(--color-line)] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-medium tracking-tight">
            {profile.name || "Shreyash Yadav"}
          </p>
          <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
            {profile.role || "AI Product Builder / Full-Stack Engineer"}
          </p>
        </div>

        <div className="flex gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] transition-colors hover:border-[var(--color-accent)]"
          >
            <GithubGlyph className="h-[18px] w-[18px]" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] transition-colors hover:border-[var(--color-accent)]"
          >
            <LinkedinGlyph className="h-[18px] w-[18px]" />
          </a>
          <a
            href={`mailto:${profile.email || "shs140326@gmail.com"}`}
            aria-label="Email"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] transition-colors hover:border-[var(--color-accent)]"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      <p className="mx-auto mt-16 max-w-6xl text-xs text-[var(--color-ink-faint)]">
        © 2026 Shreyash Yadav
      </p>
    </footer>
  );
}
