import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { SectionHeader } from "./SectionHeader";

type Chapter = {
  num: string;
  title: string;
  line: string;
  /** Background scene — pure CSS so it looks good with zero assets. */
  scene: string;
};

const CHAPTERS: Chapter[] = [
  {
    num: "01",
    title: "Architecture",
    line: "Clean, scalable Flutter — MVVM, BLoC/Cubit, feature-first modularization.",
    scene:
      "radial-gradient(60% 60% at 20% 20%, hsl(174 72% 52% / 0.45), transparent 60%), radial-gradient(50% 50% at 80% 80%, hsl(174 72% 30% / 0.35), transparent 60%), linear-gradient(135deg, hsl(222 47% 7%), hsl(222 47% 10%))",
  },
  {
    num: "02",
    title: "AI personalization",
    line: "AI model endpoints powering personalization & recommendations that lift retention.",
    scene:
      "radial-gradient(55% 55% at 70% 25%, hsl(190 80% 55% / 0.45), transparent 60%), radial-gradient(60% 60% at 20% 80%, hsl(220 75% 55% / 0.40), transparent 60%), linear-gradient(135deg, hsl(222 47% 6%), hsl(222 47% 10%))",
  },
  {
    num: "03",
    title: "Scale",
    line: "Production apps serving 5M+ users across iOS & Android, smooth at scale.",
    scene:
      "radial-gradient(60% 60% at 30% 30%, hsl(245 70% 60% / 0.45), transparent 60%), radial-gradient(55% 55% at 80% 70%, hsl(265 60% 55% / 0.40), transparent 60%), linear-gradient(135deg, hsl(222 47% 6%), hsl(230 47% 10%))",
  },
  {
    num: "04",
    title: "Release engineering",
    line: "End-to-end delivery — CI/CD, testing, App Store & Play Store releases.",
    scene:
      "radial-gradient(60% 60% at 75% 30%, hsl(174 72% 52% / 0.40), transparent 60%), radial-gradient(55% 55% at 25% 75%, hsl(280 60% 55% / 0.35), transparent 60%), linear-gradient(135deg, hsl(222 47% 6%), hsl(240 47% 10%))",
  },
];

// Replace with real iStoria/app screenshots when available.
// const IMAGES: string[] = [];

function ChapterStacked({ c }: { c: Chapter }) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div
        className="aspect-[16/10] w-full"
        style={{ backgroundImage: c.scene }}
        aria-hidden
      />
      <div className="p-6 sm:p-8">
        <p className="font-mono-ui text-xs text-primary uppercase tracking-[0.18em]">
          {c.num} · {c.title}
        </p>
        <p className="mt-3 text-lg sm:text-xl text-foreground/90 leading-relaxed">
          {c.line}
        </p>
      </div>
    </div>
  );
}

export function HowIBuild() {
  const reduced = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Tiny "breathing" motion for the foreground device.
  const phoneY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1.02, 0.99]);
  const phoneRot = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);

  if (reduced) {
    return (
      <section id="how-i-build" className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1140px] px-5 sm:px-8">
          <SectionHeader
            eyebrow="◆ — The work"
            title="How I build"
            description="Four chapters of how a Flutter app gets from architecture to the store."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {CHAPTERS.map((c) => (
              <ChapterStacked key={c.num} c={c} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="how-i-build" aria-label="How I build">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8 pt-20 sm:pt-28">
        <SectionHeader
          eyebrow="◆ — The work"
          title="How I build"
          description="Four chapters of how a Flutter app gets from architecture to the store."
        />
      </div>

      {/* On very small screens, render stacked to avoid sticky quirks. */}
      <div className="sm:hidden mx-auto max-w-[1140px] px-5 pb-20 grid gap-5">
        {CHAPTERS.map((c) => (
          <ChapterStacked key={c.num} c={c} />
        ))}
      </div>

      {/* Pinned scrollytelling — sm and up. */}
      <div
        ref={wrapperRef}
        className="hidden sm:block relative"
        style={{ height: "400vh" }}
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Background sequence */}
          {CHAPTERS.map((c, i) => {
            const n = CHAPTERS.length;
            const start = i / n;
            const end = (i + 1) / n;
            const overlap = 0.06;
            // crossfade opacity
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(
              scrollYProgress,
              [
                Math.max(0, start - overlap),
                start,
                end - overlap,
                Math.min(1, end),
              ],
              i === 0
                ? [1, 1, 1, 0]
                : i === n - 1
                  ? [0, 1, 1, 1]
                  : [0, 1, 1, 0],
            );
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const scale = useTransform(
              scrollYProgress,
              [start, end],
              [1, 1.08],
            );
            return (
              <motion.div
                key={c.num}
                aria-hidden
                className="absolute inset-0"
                style={{
                  opacity,
                  scale,
                  backgroundImage: c.scene,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            );
          })}

          {/* Subtle vignette so foreground text stays readable */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 35%, hsl(222 47% 4% / 0.55) 100%)",
            }}
          />

          {/* Progress dots */}
          <div className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
            {CHAPTERS.map((_, i) => {
              const n = CHAPTERS.length;
              const start = i / n;
              const end = (i + 1) / n;
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const dotOpacity = useTransform(
                scrollYProgress,
                [Math.max(0, start - 0.02), start, end, Math.min(1, end + 0.02)],
                [0.25, 1, 1, 0.25],
              );
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const dotScale = useTransform(
                scrollYProgress,
                [Math.max(0, start - 0.02), start, end, Math.min(1, end + 0.02)],
                [0.7, 1.1, 1.1, 0.7],
              );
              return (
                <motion.span
                  key={i}
                  className="block h-2.5 w-2.5 rounded-full bg-primary"
                  style={{ opacity: dotOpacity, scale: dotScale }}
                />
              );
            })}
          </div>

          {/* Sticky foreground — phone device + captions */}
          <div className="relative h-full mx-auto max-w-[1140px] px-5 sm:px-8 grid lg:grid-cols-2 items-center gap-10">
            {/* Captions */}
            <div className="relative z-10 order-2 lg:order-1">
              {CHAPTERS.map((c, i) => {
                const n = CHAPTERS.length;
                const start = i / n;
                const end = (i + 1) / n;
                const overlap = 0.05;
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const op = useTransform(
                  scrollYProgress,
                  [
                    Math.max(0, start - overlap),
                    start + 0.02,
                    end - 0.02,
                    Math.min(1, end + overlap),
                  ],
                  [0, 1, 1, 0],
                );
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const yy = useTransform(
                  scrollYProgress,
                  [start, end],
                  [20, -20],
                );
                return (
                  <motion.div
                    key={c.num}
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{ opacity: op, y: yy }}
                  >
                    <p className="font-mono-ui text-xs text-primary uppercase tracking-[0.22em]">
                      {c.num} · {c.title}
                    </p>
                    <p className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-display font-bold leading-tight text-foreground max-w-xl">
                      {c.line}
                    </p>
                  </motion.div>
                );
              })}
              {/* Spacer so absolute children have height */}
              <div className="invisible">
                <p className="font-mono-ui text-xs">PLACEHOLDER</p>
                <p className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-display font-bold leading-tight">
                  Placeholder line that reserves enough vertical space for the
                  longest caption shown above.
                </p>
              </div>
            </div>

            {/* Phone mockup — pinned, breathing */}
            <div className="relative order-1 lg:order-2 flex justify-center">
              <motion.div
                style={{ y: phoneY, scale: phoneScale, rotate: phoneRot }}
                className="relative w-[220px] sm:w-[260px] aspect-[9/19] rounded-[2.4rem] border border-border bg-background/80 backdrop-blur shadow-2xl shadow-primary/10 p-2"
              >
                <div className="h-full w-full rounded-[2rem] overflow-hidden relative bg-gradient-to-br from-primary/30 via-card to-primary/10">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-20 rounded-full bg-foreground/80" />
                  <div className="absolute inset-0 p-5 pt-10 flex flex-col gap-3">
                    <div className="h-3 w-20 rounded-full bg-foreground/20" />
                    <div className="h-5 w-32 rounded-full bg-foreground/40" />
                    <div className="mt-4 h-24 rounded-xl bg-primary/30 border border-primary/40" />
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="h-16 rounded-lg bg-foreground/10" />
                      <div className="h-16 rounded-lg bg-foreground/10" />
                    </div>
                    <div className="h-3 w-24 rounded-full bg-foreground/20 mt-2" />
                    <div className="h-3 w-16 rounded-full bg-foreground/10" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
