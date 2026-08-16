import { gsap } from "gsap";

export function animateTextReveal(target, opts = {}) {
  const { delay = 0, stagger = 0.08, y = 40, duration = 1 } = opts;
  return gsap.fromTo(
    target,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: "power4.out",
    }
  );
}

export function animateFadeUp(target, opts = {}) {
  const { delay = 0, y = 24, duration = 0.9 } = opts;
  return gsap.fromTo(
    target,
    { y, opacity: 0 },
    { y: 0, opacity: 1, duration, delay, ease: "power3.out" }
  );
}
