import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { scrollToId } from "@/lib/smooth-scroll";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

const RAIL_H = 1000;

type Size = "mobile" | "tablet" | "desktop";

function useSize(): Size {
  const [size, setSize] = useState<Size>(() => {
    if (typeof window === "undefined") return "desktop";
    const w = window.innerWidth;
    if (w < 640) return "mobile";
    if (w < 1024) return "tablet";
    return "desktop";
  });
  useEffect(() => {
    const onR = () => {
      const w = window.innerWidth;
      setSize(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  return size;
}

function buildPath(amp: number) {
  // amp is curve amplitude in viewBox units (centerline at x=50)
  const l = 50 - amp;
  const r = 50 + amp;
  return `
    M 50 0
    C ${l} ${RAIL_H * 0.08}, ${l - 2} ${RAIL_H * 0.16}, 50 ${RAIL_H * 0.22}
    C ${r} ${RAIL_H * 0.28}, ${r + 2} ${RAIL_H * 0.36}, 50 ${RAIL_H * 0.42}
    C ${l} ${RAIL_H * 0.48}, ${l - 2} ${RAIL_H * 0.56}, 50 ${RAIL_H * 0.62}
    C ${r - 2} ${RAIL_H * 0.68}, ${r} ${RAIL_H * 0.78}, 50 ${RAIL_H * 0.84}
    C ${l + 4} ${RAIL_H * 0.9}, ${l + 10} ${RAIL_H * 0.96}, 50 ${RAIL_H}
  `;
}

const TRAIL_DOTS = 6;

export function JourneySpine() {
  const reduced = useReducedMotion();
  const size = useSize();
  const pathRef = useRef<SVGPathElement | null>(null);
  const [totalLength, setTotalLength] = useState(0);
  const [active, setActive] = useState<string>("about");
  const [nodePositions, setNodePositions] = useState<
    { id: string; x: number; y: number; label: string }[]
  >([]);
  const [rippleKey, setRippleKey] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  // Size-dependent visual config
  const cfg = {
    mobile: {
      leftPx: 10,
      widthPx: 24,
      heightVh: "min(80vh, 700px)",
      amp: 8,
      stroke: 1.4,
      node: 2.4,
      activeNode: 4,
      comet: 3.2,
      showLabels: false,
      showActiveRing: true,
    },
    tablet: {
      leftPx: 14,
      widthPx: 38,
      heightVh: "min(76vh, 680px)",
      amp: 14,
      stroke: 1.8,
      node: 3,
      activeNode: 4.6,
      comet: 3.8,
      showLabels: "active" as const,
      showActiveRing: true,
    },
    desktop: {
      leftPx: 28,
      widthPx: 60,
      heightVh: "min(72vh, 640px)",
      amp: 24,
      stroke: 2,
      node: 3.2,
      activeNode: 5,
      comet: 4.2,
      showLabels: "hover" as const,
      showActiveRing: true,
    },
  }[size];

  const cometX = useMotionValue(50);
  const cometY = useMotionValue(0);
  const dashOffset = useMotionValue(1);
  const t0x = useMotionValue(50); const t0y = useMotionValue(0);
  const t1x = useMotionValue(50); const t1y = useMotionValue(0);
  const t2x = useMotionValue(50); const t2y = useMotionValue(0);
  const t3x = useMotionValue(50); const t3y = useMotionValue(0);
  const t4x = useMotionValue(50); const t4y = useMotionValue(0);
  const t5x = useMotionValue(50); const t5y = useMotionValue(0);
  const trail = [
    { x: t0x, y: t0y },
    { x: t1x, y: t1y },
    { x: t2x, y: t2y },
    { x: t3x, y: t3y },
    { x: t4x, y: t4y },
    { x: t5x, y: t5y },
  ];

  const PATH_D = buildPath(cfg.amp);

  const recompute = () => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setTotalLength(len);
    const pageH =
      document.documentElement.scrollHeight - window.innerHeight || 1;
    const positions = SECTIONS.map(({ id, label }) => {
      const el = document.getElementById(id);
      if (!el) return { id, label, x: 50, y: 0 };
      const top = el.getBoundingClientRect().top + window.scrollY;
      const center = top + el.offsetHeight / 2;
      const fraction = Math.min(
        1,
        Math.max(0, (center - window.innerHeight / 2) / pageH),
      );
      const pt = path.getPointAtLength(fraction * len);
      return { id, label, x: pt.x, y: pt.y };
    });
    setNodePositions(positions);
  };

  useLayoutEffect(() => {
    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(document.body);
    window.addEventListener("resize", recompute);
    window.addEventListener("load", recompute);
    const t = setTimeout(recompute, 600);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
      window.removeEventListener("load", recompute);
      clearTimeout(t);
    };
    // recompute whenever size changes the path
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (e): e is HTMLElement => !!e,
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
            setRippleKey(`${e.target.id}-${Date.now()}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  useMotionValueEvent(smooth, "change", (v) => {
    dashOffset.set(1 - v);
    const path = pathRef.current;
    if (!path || !totalLength) return;
    const tip = v * totalLength;
    const pt = path.getPointAtLength(tip);
    cometX.set(pt.x);
    cometY.set(pt.y);
    for (let i = 0; i < TRAIL_DOTS; i++) {
      const d = tip - (i + 1) * 14;
      const p = path.getPointAtLength(Math.max(0, d));
      trail[i].x.set(p.x);
      trail[i].y.set(p.y);
    }
  });

  // Apply small left padding to body content so the spine sits in a gutter
  // (tablet/desktop only — mobile hides the spine entirely)
  useEffect(() => {
    if (size === "mobile") {
      document.body.style.paddingLeft = "";
      return;
    }
    const pad = size === "tablet" ? "28px" : "0px";
    document.body.style.paddingLeft = pad;
    return () => {
      document.body.style.paddingLeft = "";
    };
  }, [size]);

  // Hide entirely on mobile — too much visual noise + creates overflow risk.
  if (size === "mobile") return null;

  const gradId = "spineGrad";

  return (
    <div
      aria-hidden={false}
      className="fixed z-40 pointer-events-none"
      style={{
        left: `${cfg.leftPx}px`,
        top: "50%",
        transform: "translateY(-50%)",
        height: cfg.heightVh,
        width: `${cfg.widthPx}px`,
      }}
    >
      <svg
        viewBox={`0 0 100 ${RAIL_H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2={RAIL_H} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(174 80% 55%)" />
            <stop offset="100%" stopColor="hsl(250 80% 62%)" />
          </linearGradient>
          <filter id="spineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Track */}
        <path
          d={PATH_D}
          fill="none"
          stroke="hsl(var(--foreground) / 0.16)"
          strokeWidth={cfg.stroke}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Progress with gradient + glow */}
        <motion.path
          ref={pathRef}
          d={PATH_D}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={cfg.stroke}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray={1}
          style={reduced ? undefined : { strokeDashoffset: dashOffset }}
          filter={reduced ? undefined : "url(#spineGlow)"}
        />

        {/* Section nodes */}
        {nodePositions.map((n) => {
          const isActive = active === n.id;
          return (
            <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
              {isActive && cfg.showActiveRing && (
                <circle
                  r={cfg.activeNode * 2.2}
                  fill="none"
                  stroke="hsl(174 85% 60%)"
                  strokeWidth={1}
                  opacity={0.45}
                />
              )}
              {/* Ripple one-shot */}
              {isActive && !reduced && rippleKey && (
                <motion.circle
                  key={rippleKey}
                  initial={{ r: cfg.activeNode, opacity: 0.7 }}
                  animate={{ r: cfg.activeNode * 4.5, opacity: 0 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  fill="none"
                  stroke="hsl(200 90% 70%)"
                  strokeWidth={1.2}
                />
              )}
              <circle
                r={isActive ? cfg.activeNode : cfg.node}
                fill={isActive ? `url(#${gradId})` : "hsl(174 80% 55% / 0.55)"}
                style={{
                  filter: isActive
                    ? "drop-shadow(0 0 5px hsl(174 85% 55% / 0.8))"
                    : undefined,
                  transition: "r 200ms ease-out",
                }}
              />
            </g>
          );
        })}

        {/* Trail */}
        {!reduced &&
          trail.map((t, i) => (
            <motion.circle
              key={i}
              r={cfg.comet * (1 - i / (TRAIL_DOTS + 1)) * 0.7}
              cx={t.x}
              cy={t.y}
              fill="hsl(190 95% 80%)"
              opacity={(1 - i / TRAIL_DOTS) * 0.5}
              style={{
                filter: "drop-shadow(0 0 4px hsl(180 90% 60% / 0.7))",
              }}
            />
          ))}

        {/* Comet */}
        {!reduced && (
          <motion.circle
            r={cfg.comet}
            cx={cometX}
            cy={cometY}
            fill="hsl(180 95% 92%)"
            style={{
              filter:
                "drop-shadow(0 0 8px hsl(174 90% 60% / 0.95)) drop-shadow(0 0 14px hsl(250 80% 65% / 0.6))",
            }}
          />
        )}
      </svg>

      {/* Click targets + labels */}
      <div className="absolute inset-0">
        {nodePositions.map((n) => {
          const isActive = active === n.id;
          const leftPct = (n.x / 100) * 100;
          const topPct = (n.y / RAIL_H) * 100;
          const showLabel =
            cfg.showLabels === "hover"
              ? true
              : cfg.showLabels === "active" && isActive
                ? true
                : false;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => scrollToId(n.id)}
              aria-label={`Go to ${n.label}`}
              className="group absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(174_85%_60%)] rounded-full"
              style={{ left: `${leftPct}%`, top: `${topPct}%` }}
            >
              {showLabel && (
                <AnimatePresence>
                  {(isActive || cfg.showLabels === "hover") && (
                    <motion.span
                      key={isActive ? "active" : "idle"}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: isActive ? 1 : 0, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.25 }}
                      className={`absolute left-full ml-3 whitespace-nowrap font-mono-ui text-[10px] uppercase tracking-[0.18em] flex items-center gap-2 ${
                        isActive
                          ? "text-[hsl(174_85%_60%)]"
                          : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 text-foreground/70"
                      }`}
                    >
                      <span className="h-px w-3 bg-[hsl(174_85%_60%)]" />
                      {n.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
