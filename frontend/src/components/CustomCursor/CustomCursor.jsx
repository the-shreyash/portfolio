import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { usePrefersReducedMotion } from "../../hooks/useReducedMotion";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (isMobile || reducedMotion) return undefined;

    const dot = dotRef.current;
    let x = 0;
    let y = 0;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`;
    };

    const onEnter = (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el) {
        setActive(true);
        setLabel(el.getAttribute("data-cursor") || "");
      }
    };
    const onLeave = (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el) {
        setActive(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [isMobile, reducedMotion]);

  if (isMobile || reducedMotion) return null;

  return (
    <div
      ref={dotRef}
      className={`pointer-events-none fixed left-0 top-0 z-[200] flex items-center justify-center rounded-full border border-[var(--color-ink)] mix-blend-difference transition-[width,height] duration-300 ease-out ${
        active ? "h-16 w-16" : "h-6 w-6"
      }`}
      style={{ willChange: "transform" }}
      aria-hidden="true"
    >
      {active && label && (
        <span className="text-[10px] font-medium uppercase tracking-wide text-white">
          {label}
        </span>
      )}
    </div>
  );
}
