import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function PageLoader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete?.();
      },
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
      .to(textRef.current, { opacity: 1, duration: 0.5 })
      .to(rootRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.1,
      });

    return () => tl.kill();
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-bg)]"
      aria-hidden="true"
    >
      <div ref={textRef} className="flex items-baseline gap-3 font-display">
        <span className="text-2xl md:text-3xl font-medium tracking-tight text-[var(--color-ink)]">
          SHREYASH
        </span>
        <span className="text-2xl md:text-3xl text-[var(--color-ink-faint)]">/</span>
        <span className="text-2xl md:text-3xl text-[var(--color-ink-faint)]">2026</span>
      </div>
    </div>
  );
}
