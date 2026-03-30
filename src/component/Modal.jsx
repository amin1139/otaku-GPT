import { useEffect, useRef } from "react";

/**
 * Reusable Modal Component
 *
 * Props:
 * - isOpen       {boolean}    Whether the modal is visible
 * - onClose      {function}   Called when modal should close
 * - title        {string}     Modal header title
 * - size         {string}     'sm' | 'md' | 'lg' | 'xl' | 'full'  (default: 'md')
 * - closable     {boolean}    Show close button & allow backdrop click (default: true)
 * - children     {ReactNode}  Modal body content
 * - footer       {ReactNode}  Optional footer slot
 * - className    {string}     Extra classes for the panel
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  size = "md",
  closable = true,
  children,
  footer,
  className = "",
}) {
  const panelRef = useRef(null);

  /* ── lock body scroll while open ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ── close on Escape ── */
  useEffect(() => {
    if (!isOpen || !closable) return;
    const handler = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, closable, onClose]);

  /* ── trap focus inside panel ── */
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first)?.focus();
      }
    };
    window.addEventListener("keydown", trap);
    first?.focus();
    return () => window.removeEventListener("keydown", trap);
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeMap = {
    sm:   "max-w-sm",
    md:   "max-w-lg",
    lg:   "max-w-2xl",
    xl:   "max-w-4xl",
    full: "max-w-full mx-2",
  };
  const panelSize = sizeMap[size] ?? sizeMap.md;

  return (
    <>
    /* ── Backdrop ── */
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center px-0 sm:px-4 "
    >
      {/* dimmed overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closable ? onClose : undefined}
        aria-hidden="true"
      />

      {/* ── Panel ── */}
      <div
        ref={panelRef}
        className={[
          /* base */
          "relative z-10 w-full flex flex-col",
          /* sizing */
          panelSize,
          /* mobile: slide up sheet, desktop: centered card */
          "rounded-t-2xl sm:rounded-2xl",
          /* dark theme */
          "bg-zinc-900 border border-zinc-700/60",
          /* shadow & depth */
          "shadow-[0_-8px_60px_rgba(0,0,0,0.6)] sm:shadow-[0_8px_60px_rgba(0,0,0,0.8)]",
          /* animation */
          "animate-modal-in",
          /* max height */
          "max-h-[90dvh] sm:max-h-[85dvh]",
          className,
        ].join(" ")}
        style={{ animationFillMode: "both" }}
      >
        {/* drag handle — mobile only */}
        <div className="flex justify-center pt-3 sm:hidden">
          <span className="w-10 h-1 rounded-full bg-zinc-600" />
        </div>

        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-4 px-5 pt-4 pb-3 sm:px-6 sm:pt-5 border-b border-zinc-800">
          <h2 className="text-base font-semibold tracking-tight text-zinc-100 truncate">
            {title}
          </h2>
          {closable && (
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {/* X icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6 sm:py-5 text-sm text-zinc-300 leading-relaxed" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {children}
        </div>

        {/* ── Footer (optional slot) ── */}
        {footer && (
          <div className="px-5 py-4 sm:px-6 sm:py-4 border-t border-zinc-800 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
            {footer}
          </div>
        )}
      </div>

      {/* ── keyframe animation injected once ── */}
      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .animate-modal-in {
          animation: modal-in 0.22s cubic-bezier(0.32, 0.72, 0, 1);
        }
      `}</style>
    </div>
    </>
  );
}