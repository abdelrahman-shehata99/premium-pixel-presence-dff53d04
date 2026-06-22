import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/**
 * Cursor-following aura blobs that live behind the hero text.
 * Hover/pointer devices: blobs follow the cursor with eased spring lag.
 * Touch / no-pointer: blobs drift in a slow continuous loop.
 * Reduced motion: rendered static and centered.
 */
export function AuraCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Two springs so blob B lags further behind blob A.
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
      // Start centered.
      x.set(0);
      y.set(0);
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onMove);
        if (raf) cancelAnimationFrame(raf);
      };
    }

    // Touch / coarse pointer: gentle continuous drift.
    let raf = 0;
    let t0 = performance.now();
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
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Blob A — teal accent */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: reduced ? 0 : xA,
          y: reduced ? 0 : yA,
          width: 700,
          height: 700,
          filter: "blur(110px)",
          opacity: 0.35,
          background:
            "radial-gradient(circle at center, hsl(174 72% 52% / 0.85), transparent 60%)",
        }}
      />
      {/* Blob B — cool indigo, trails further */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: reduced ? 0 : xB,
          y: reduced ? 0 : yB,
          width: 480,
          height: 480,
          filter: "blur(120px)",
          opacity: 0.28,
          background:
            "radial-gradient(circle at center, hsl(245 70% 60% / 0.85), transparent 60%)",
        }}
      />
    </div>
  );
}
