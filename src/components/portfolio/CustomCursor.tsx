import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only custom cursor: a rounded-square outline that follows the
 * pointer with subtle smoothing (lerp). Hidden on touch/coarse-pointer
 * devices and respects prefers-reduced-motion (no lag — snaps instantly).
 * Always pointer-events:none and high z-index so it never blocks clicks
 * or text selection.
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener?.("change", update);
    return () => fine.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("cursor-none-root");
      return;
    }
    document.documentElement.classList.add("cursor-none-root");
    return () => document.documentElement.classList.remove("cursor-none-root");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest(
        "a, button, [role='button'], input, select, textarea, label, summary, [data-cursor-hover]",
      );
      setHovering(interactive);
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const loop = () => {
      if (reduced) {
        x = targetX;
        y = targetY;
      } else {
        x += (targetX - x) * 0.22;
        y += (targetY - y) * 0.22;
      }
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="custom-cursor"
      data-hover={hovering ? "true" : "false"}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 24,
        height: 24,
        borderRadius: 7,
        border: "1.5px solid hsl(174 80% 55%)",
        boxShadow:
          "0 0 12px hsl(174 80% 55% / 0.45), inset 0 0 6px hsl(174 80% 55% / 0.15)",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        transition:
          "width 180ms ease, height 180ms ease, border-radius 180ms ease, background-color 180ms ease, border-color 180ms ease",
        willChange: "transform",
        mixBlendMode: "difference",
      }}
    />
  );
}
