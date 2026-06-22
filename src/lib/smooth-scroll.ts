// Global Lenis smooth-scroll helper.
// Lenis drives the real window scroll, so framer-motion's useScroll reads it.

type LenisLike = {
  scrollTo: (
    target: string | number | HTMLElement,
    opts?: { offset?: number; duration?: number; immediate?: boolean },
  ) => void;
  raf: (time: number) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: light)") &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Smoothly scroll to a hash target, accounting for the fixed navbar. */
export function scrollToId(id: string, offset = -80) {
  if (typeof window === "undefined") return;
  const clean = id.startsWith("#") ? id.slice(1) : id;
  const el = document.getElementById(clean);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
