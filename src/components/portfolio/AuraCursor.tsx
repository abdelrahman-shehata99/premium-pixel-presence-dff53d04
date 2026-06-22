import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/**
 * Cursor-following aura blobs. Bolder color presence, smooth spring lag.
 * In dark mode the blobs use mix-blend-mode: screen so they glow vividly.
 * In light mode they fall back to normal blending with lower opacity.
 * Touch / no-pointer: blobs drift in a slow continuous loop.
 * Reduced motion: rendered static and centered.
 */
export function AuraCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xA = useSpring(x, { stiffness: 50, damping: 20, mass: 0.6 });
  const yA = useSpring(y, { stiffness: 50, damping: 20, mass: 0.6 });
  const xB = useSpring(x, { stiffness: 28, damping: 22, mass: 0.8 });
  const yB = useSpring(y, { stiffness: 28, damping: 22, mass: 0.8 });

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const fine =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (fine) {
      let raf = 0;
      let nx = 0;
      let ny = 0;
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        nx = e.clientX - r.left - r.width / 2;
        ny = e.clientY - r.top - r.height / 2;
        if (!raf) {
          raf = requestAnimationFrame(() => {
            x.set(nx);
            y.set(ny);
            raf = 0;
          });
        }
      };
      x.set(0);
      y.set(0);
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onMove);
        if (raf) cancelAnimationFrame(raf);
      };
    }

    let raf = 0;
    const t0 = performance.now();
    const loop = (t: number) => {
      const dt = (t - t0) / 1000;
      const rect = el.getBoundingClientRect();
      const ax = Math.min(rect.width, 600) * 0.18;
      const ay = Math.min(rect.height, 500) * 0.18;
      x.set(Math.cos(dt * 0.25) * ax);
      y.set(Math.sin(dt * 0.21) * ay);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, x, y]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden [mix-blend-mode:normal] dark:[mix-blend-mode:screen]"
    >
      {/* Blob A — vivid teal with bright core */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 dark:opacity-[0.55]"
        style={{
          x: reduced ? 0 : xA,
          y: reduced ? 0 : yA,
          width: 620,
          height: 620,
          filter: "blur(90px)",
          background:
            "radial-gradient(circle at center, hsl(180 95% 88% / 0.95) 0%, hsl(174 85% 55% / 0.9) 28%, hsl(174 85% 50% / 0.5) 55%, transparent 72%)",
        }}
      />
      {/* Blob B — stronger indigo, trails further */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 dark:opacity-[0.45]"
        style={{
          x: reduced ? 0 : xB,
          y: reduced ? 0 : yB,
          width: 460,
          height: 460,
          filter: "blur(100px)",
          background:
            "radial-gradient(circle at center, hsl(250 80% 62% / 0.95), hsl(250 80% 55% / 0.55) 50%, transparent 72%)",
        }}
      />
    </div>
  );
}
