import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? scrollTop / height : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed right-3 top-0 z-50 hidden h-screen w-[2px] md:block"
      aria-hidden="true"
    >
      <div className="relative h-full w-full bg-[var(--color-line)]">
        <div
          className="absolute left-0 top-0 w-full bg-[var(--color-accent)] transition-[height] duration-100"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
