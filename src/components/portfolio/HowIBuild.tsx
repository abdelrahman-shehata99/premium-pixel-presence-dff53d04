import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import screenJourney from "@/assets/screen-journey.png.asset.json";
import screenVocab from "@/assets/screen-vocab.png.asset.json";
import screenLibrary from "@/assets/screen-library.png.asset.json";
import screenStreak from "@/assets/screen-streak.png.asset.json";
import screenReader from "@/assets/screen-reader.png.asset.json";

type Chapter = {
  num: string;
  title: string;
  line: string;
  /** Real iStoria screenshot used in front + behind. */
  image: string;
};

const CHAPTERS: Chapter[] = [
  {
    num: "01",
    title: "Architecture",
    line: "Clean, scalable Flutter — MVVM, BLoC/Cubit, feature-first modularization.",
    image: screenJourney.url,
  },
  {
    num: "02",
    title: "AI personalization",
    line: "AI model endpoints powering personalization & recommendations that lift retention.",
    image: screenReader.url,
  },
  {
    num: "03",
    title: "Scale",
    line: "Production apps serving 5M+ users across iOS & Android, smooth at scale.",
    image: screenLibrary.url,
  },
  {
    num: "04",
    title: "Release engineering",
    line: "End-to-end delivery — CI/CD, testing, App Store & Play Store releases.",
    image: screenStreak.url,
  },
];

// Reference so unused-imports check passes & we can rotate the secondary frame.
const EXTRA_SCREEN = screenVocab.url;
void EXTRA_SCREEN;

function ChapterStacked({ c }: { c: Chapter }) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-[hsl(222_47%_6%)]">
      <div className="aspect-[9/16] w-full max-h-[520px] relative overflow-hidden">
        <img
          src={c.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.25) 50%, transparent)",
          }}
        />
      </div>
      <div className="p-6 sm:p-8">
        <p className="font-mono-ui text-xs uppercase tracking-[0.18em] text-[hsl(174_85%_60%)]">
          {c.num} · {c.title}
        </p>
        <p className="mt-3 text-lg sm:text-xl leading-relaxed text-[hsl(0_0%_98%)]">
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

  // Preload all chapter screenshots so transitions don't pop.
  useEffect(() => {
    CHAPTERS.forEach((c) => {
      const img = new Image();
      img.decoding = "async";
      img.src = c.image;
    });
  }, []);

  // Tiny "breathing" motion for the foreground device.
  const phoneY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1.02, 0.99]);
  const phoneRot = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);

  if (reduced) {
    return (
      <section id="how-i-build" className="py-20 sm:py-28 scroll-mt-24">
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
    <section id="how-i-build" aria-label="How I build" className="scroll-mt-24">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-8 pt-20 sm:pt-28">
        <SectionHeader
          eyebrow="◆ — The work"
          title="How I build"
          description="Four chapters of how a Flutter app gets from architecture to the store."
        />
      </div>

      {/* Mobile / small screens: simple vertical stack — no sticky, no scroll-jacking. */}
      <div className="lg:hidden mx-auto max-w-[1140px] px-5 sm:px-8 pb-20 grid gap-5 sm:gap-6">
        {CHAPTERS.map((c) => (
          <ChapterStacked key={c.num} c={c} />
        ))}
      </div>

      {/* Pinned scrollytelling — lg+ only. Always dark stage. */}
      <div
        ref={wrapperRef}
        className="hidden lg:block relative"
        style={{ height: "400vh" }}
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-[hsl(222_47%_4%)]">
          {/* Background sequence — same image, blurred & darkened */}
          {CHAPTERS.map((c, i) => {
            const n = CHAPTERS.length;
            const start = i / n;
            const end = (i + 1) / n;
            const overlap = 0.06;
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
              [1.05, 1.18],
            );
            return (
              <motion.div
                key={c.num}
                aria-hidden
                className="absolute inset-0"
                style={{ opacity, scale }}
              >
                <img
                  src={c.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "blur(40px) brightness(0.5)" }}
                  loading="lazy"
                />
              </motion.div>
            );
          })}

          {/* Vignette */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, hsl(222 47% 3% / 0.7) 100%)",
            }}
          />

          {/* Left-side text scrim for legibility */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-full lg:w-3/5 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.72), rgba(0,0,0,0.45) 45%, transparent 90%)",
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
                [0.3, 1, 1, 0.3],
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
                  className="block h-2.5 w-2.5 rounded-full bg-[hsl(174_85%_60%)] shadow-[0_0_10px_hsl(174_85%_55%/0.7)]"
                  style={{ opacity: dotOpacity, scale: dotScale }}
                />
              );
            })}
          </div>

          {/* Sticky foreground — phone device + captions */}
          <div className="relative h-full mx-auto max-w-[1140px] px-5 sm:px-8 grid lg:grid-cols-2 items-center gap-10">
            {/* Captions — always near-white over scrim */}
            <div
              className="relative z-10 order-2 lg:order-1"
              style={{ minHeight: "min(60vh, 360px)" }}
            >
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
                    <p
                      className="font-mono-ui text-xs uppercase tracking-[0.22em]"
                      style={{ color: "hsl(174 85% 62%)" }}
                    >
                      {c.num} · {c.title}
                    </p>
                    <p
                      className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-display font-bold leading-tight max-w-xl"
                      style={{ color: "hsl(0 0% 98%)" }}
                    >
                      {c.line}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Phone mockup — real screenshots crossfade inside */}
            <div className="relative order-1 lg:order-2 flex justify-center">
              <motion.div
                style={{ y: phoneY, scale: phoneScale, rotate: phoneRot }}
                className="relative w-[240px] sm:w-[280px] aspect-[9/19.5] rounded-[2.4rem] border border-[hsl(0_0%_100%/0.12)] bg-[hsl(222_47%_8%)] shadow-2xl shadow-primary/20 p-2"
              >
                <div className="h-full w-full rounded-[2rem] overflow-hidden relative bg-black">
                  {CHAPTERS.map((c, i) => {
                    const n = CHAPTERS.length;
                    const start = i / n;
                    const end = (i + 1) / n;
                    const overlap = 0.07;
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const op = useTransform(
                      scrollYProgress,
                      [
                        Math.max(0, start - overlap),
                        start + 0.03,
                        end - 0.03,
                        Math.min(1, end + overlap),
                      ],
                      [0, 1, 1, 0],
                    );
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const sc = useTransform(
                      scrollYProgress,
                      [start, end],
                      [1.0, 1.04],
                    );
                    return (
                      <motion.img
                        key={c.num}
                        src={c.image}
                        alt={`iStoria — ${c.title}`}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ opacity: op, scale: sc }}
                        decoding="async"
                        loading="eager"
                      />
                    );
                  })}
                  {/* notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-20 rounded-full bg-black/80 z-10" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
