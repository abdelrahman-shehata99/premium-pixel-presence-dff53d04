import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Desktop only. On touch devices Lenis hijacks momentum scrolling and can
    // make the page feel laggy/stuck and desync scroll-linked animations, so we
    // leave native scrolling in place (the scroll-driven effects are desktop-only).
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      lenis = new Lenis({
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }) as unknown as { raf: (t: number) => void; destroy: () => void };
      // Expose for scrollToId helper.
      (window as unknown as { __lenis: typeof lenis }).__lenis = lenis;
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      if ((window as unknown as { __lenis?: unknown }).__lenis === lenis) {
        delete (window as unknown as { __lenis?: unknown }).__lenis;
      }
    };
  }, []);

  return null;
}
