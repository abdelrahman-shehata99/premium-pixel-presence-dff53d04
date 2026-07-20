import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LineReveal } from "./LineReveal";
import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const eyebrowY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <div ref={ref} className="mb-12 sm:mb-16">
      <motion.p
        className="font-mono-ui text-xs uppercase tracking-[0.18em] text-primary"
        style={reduced ? undefined : { y: eyebrowY }}
      >
        {eyebrow}
      </motion.p>
      <LineReveal text={title} className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight" />
      {description && (
        <Reveal delay={0.05}>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
