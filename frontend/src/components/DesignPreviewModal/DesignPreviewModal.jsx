import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

/**
 * DesignPreviewModal
 * Premium in-page modal/lightbox for Figma and UI design showcases.
 *
 * @param {Object} props
 * @param {Object|null} props.design - The active design object ({ title, category, description, image, figmaUrl })
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Callback to close the modal
 */
export default function DesignPreviewModal({ design, isOpen, onClose }) {
  // ESC key listener & Body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !design) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="design-modal-title"
          className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 md:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[var(--color-surface)] shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[var(--color-line)] px-5 py-4 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                <span className="text-[10px] font-medium uppercase tracking-widest text-[var(--color-accent)]">
                  {design.category}
                </span>
                <span className="hidden text-[var(--color-line)] sm:inline">•</span>
                <h3
                  id="design-modal-title"
                  className="font-display text-lg font-medium tracking-tight text-[var(--color-ink)] sm:text-xl"
                >
                  {design.title}
                </h3>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close design preview"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] opacity-80 transition-all hover:scale-105 hover:opacity-100 hover:border-[var(--color-accent)] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Design Image Area */}
            <div className="relative flex max-h-[calc(90vh-140px)] w-full items-center justify-center overflow-auto bg-[var(--color-bg)]/60 p-3 sm:p-6">
              {design.image ? (
                <img
                  src={design.image}
                  alt={`${design.title} high resolution design preview`}
                  className="max-h-[68vh] w-auto max-w-[95vw] rounded-lg object-contain shadow-md"
                />
              ) : (
                <div className="flex h-64 w-full items-center justify-center text-sm text-[var(--color-ink-soft)]">
                  Preview image not available
                </div>
              )}
            </div>

            {/* Modal Footer / Actions */}
            <div className="flex flex-col gap-3 border-t border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="line-clamp-2 text-xs leading-relaxed text-[var(--color-ink-soft)] sm:line-clamp-1 sm:max-w-xl">
                {design.description}
              </p>

              {design.figmaUrl && (
                <a
                  href={design.figmaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-2 text-xs font-medium text-[var(--color-ink)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  <span>Open in Figma</span>
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
