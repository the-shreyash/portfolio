/**
 * ProfilePhoto — reusable portrait component.
 *
 * Props:
 *  src       — image path (use profile.photo from data/profile.js)
 *  alt       — descriptive alt text
 *  priority  — if true, adds fetchpriority="high" (use in hero, above fold)
 *  className — additional Tailwind / CSS classes for the wrapper
 *  imgRef    — forwarded ref for GSAP animations on the <img> element
 */
export default function ProfilePhoto({
  src,
  alt,
  priority = false,
  className = "",
  imgRef,
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-2xl)] ${className}`}
      style={{
        // Reserve space to avoid layout shift
        aspectRatio: "3 / 4",
      }}
    >
      {/* Subtle inner border for editorial depth */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[var(--radius-2xl)] ring-1 ring-inset ring-[var(--color-line)]"
        aria-hidden="true"
      />

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="h-full w-full object-cover object-top"
        style={{ display: "block" }}
      />
    </div>
  );
}
