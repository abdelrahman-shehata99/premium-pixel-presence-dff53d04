import { motion, useReducedMotion } from "framer-motion";

export function LineReveal({ text, className = "" }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={reduced ? { y: 0 } : { y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}
