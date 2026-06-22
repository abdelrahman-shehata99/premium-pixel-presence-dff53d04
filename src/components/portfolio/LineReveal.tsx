import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Heading reveal: splits text by words and rises each one in
 * from a clip-mask. Use only for short headings.
 */
export function LineReveal({
  text,
  className,
  as = "h2",
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : stagger } },
  };
  const child: Variants = reduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { y: "110%" },
        show: { y: "0%", transition: { duration: 0.7, ease: EASE } },
      };

  const MotionTag = (
    as === "h1" ? motion.h1 : as === "h3" ? motion.h3 : motion.h2
  ) as typeof motion.h2;

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12%" }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pb-[0.08em]"
          aria-hidden
        >
          <motion.span className="inline-block will-change-transform" variants={child}>
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
