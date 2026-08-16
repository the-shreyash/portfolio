import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateScaleOnScroll(target, container) {
  return gsap.fromTo(
    target,
    { scale: 0.9, opacity: 0.4 },
    {
      scale: 1,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    }
  );
}

export function animateParallax(target, container, distance = 80) {
  return gsap.fromTo(
    target,
    { y: distance },
    {
      y: -distance,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
}

export function animateProjectEnter(target, container) {
  return gsap.fromTo(
    target,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
      },
    }
  );
}
