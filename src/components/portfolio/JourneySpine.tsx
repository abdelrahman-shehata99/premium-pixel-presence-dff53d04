import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
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

// Organic curved spine — gentle S-curves around x=50 in a 100-wide viewBox.
// Height is a runtime value; we use a normalized path scaled via preserveAspectRatio="none".
const RAIL_H = 1000; // arbitrary internal coordinate height
const PATH_D = `
  M 50 0
  C 30 ${RAIL_H * 0.08}, 28 ${RAIL_H * 0.16}, 50 ${RAIL_H * 0.22}
  C 74 ${RAIL_H * 0.28}, 76 ${RAIL_H * 0.36}, 50 ${RAIL_H * 0.42}
  C 28 ${RAIL_H * 0.48}, 26 ${RAIL_H * 0.56}, 50 ${RAIL_H * 0.62}
  C 72 ${RAIL_H * 0.68}, 74 ${RAIL_H * 0.78}, 50 ${RAIL_H * 0.84}
  C 32 ${RAIL_H * 0.9}, 38 ${RAIL_H * 0.96}, 50 ${RAIL_H}
`;

export function JourneySpine() {
  const reduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement | null>(null);
  const [totalLength, setTotalLength] = useState(0);
  const [active, setActive] = useState<string>("about");
  const [nodePositions, setNodePositions] = useState<
    { id: string; x: number; y: number; label: string }[]
  >([]);

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  const cometX = useMotionValue(50);
  const cometY = useMotionValue(0);
  const dashOffset = useMotionValue(1);

  // Recompute path length and node positions.
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track active section via IntersectionObserver.
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (e): e is HTMLElement => !!e,
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  // Drive dashoffset + comet from smoothed progress.
  useMotionValueEvent(smooth, "change", (v) => {
    dashOffset.set(1 - v);
    const path = pathRef.current;
    if (!path || !totalLength) return;
    const pt = path.getPointAtLength(v * totalLength);
    cometX.set(pt.x);
    cometY.set(pt.y);
  });

  return (
    <div
      aria-hidden={false}
      className="hidden lg:block fixed left-7 z-40 pointer-events-none"
      style={{
        top: "50%",
        transform: "translateY(-50%)",
        height: "min(72vh, 640px)",
        width: "60px",
      }}
    >
      <svg
        viewBox={`0 0 100 ${RAIL_H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full overflow-visible"
      >
        {/* Track */}
        <path
          d={PATH_D}
          fill="none"
          stroke="hsl(var(--border-raw, 215 20% 30%) / 0.5)"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="[stroke:hsl(var(--foreground)/0.18)]"
        />
        {/* Progress */}
        <motion.path
          ref={pathRef}
          d={PATH_D}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray={1}
          style={reduced ? undefined : { strokeDashoffset: dashOffset }}
          className="[stroke:hsl(var(--primary-raw,174_72%_52%))]"
          stroke="currentColor"
          color="hsl(174 85% 55%)"
        />

        {/* Start dot */}
        <circle cx={50} cy={0} r={4} fill="hsl(174 85% 60%)" />
        {/* End dot */}
        <circle cx={50} cy={RAIL_H} r={4} fill="hsl(174 85% 60%)" />

        {/* Section nodes on the curve */}
        {nodePositions.map((n) => {
          const isActive = active === n.id;
          return (
            <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
              {isActive && (
                <circle
                  r={10}
                  fill="none"
                  stroke="hsl(174 85% 60%)"
                  strokeWidth={1.2}
                  opacity={0.5}
                />
              )}
              <circle
                r={isActive ? 5 : 3.2}
                fill={isActive ? "hsl(174 85% 60%)" : "hsl(174 85% 55% / 0.55)"}
                style={{
                  filter: isActive
                    ? "drop-shadow(0 0 6px hsl(174 85% 55% / 0.7))"
                    : undefined,
                  transition: "r 200ms ease-out",
                }}
              />
            </g>
          );
        })}

        {/* Comet */}
        {!reduced && (
          <motion.circle
            r={4.2}
            cx={cometX}
            cy={cometY}
            fill="hsl(180 95% 90%)"
            style={{
              filter:
                "drop-shadow(0 0 8px hsl(174 90% 60% / 0.95)) drop-shadow(0 0 14px hsl(174 85% 55% / 0.6))",
            }}
          />
        )}
      </svg>

      {/* Clickable buttons positioned absolutely matching node points */}
      <div className="absolute inset-0">
        {nodePositions.map((n) => {
          const isActive = active === n.id;
          // Convert from internal coords to %.
          const leftPct = (n.x / 100) * 100;
          const topPct = (n.y / RAIL_H) * 100;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => scrollToId(n.id)}
              aria-label={`Go to ${n.label}`}
              className="group absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(174_85%_60%)] rounded-full"
              style={{ left: `${leftPct}%`, top: `${topPct}%` }}
            >
              <span
                className={`absolute left-full ml-3 whitespace-nowrap font-mono-ui text-[10px] uppercase tracking-[0.18em] transition-opacity duration-200 ${
                  isActive
                    ? "opacity-100 text-[hsl(174_85%_60%)]"
                    : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 text-foreground/70"
                }`}
              >
                {n.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
